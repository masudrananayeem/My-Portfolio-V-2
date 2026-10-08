#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import admin from 'firebase-admin';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// The script and all admin-only credentials live inside apps/admin.
// This keeps the frontend monorepo self-contained and avoids root-level admin tooling.

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(ROOT, '.env.admin'));

function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON.');
    }
  }

  const configuredPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json';
  const absolutePath = path.resolve(ROOT, configuredPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(
      `Firebase service account not found at ${absolutePath}. Put the downloaded service-account JSON there or set FIREBASE_SERVICE_ACCOUNT_PATH in .env.admin.`
    );
  }
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

const serviceAccount = getServiceAccount();
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const auth = admin.auth();
const db = admin.firestore();
const rl = readline.createInterface({ input, output });

try {
  console.log('\nMRN Portfolio — Admin Creator\n');
  const email = (process.env.ADMIN_EMAIL || await rl.question('Admin email: ')).trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || await rl.question('Admin password (16+ chars recommended): ');
  const displayName = (process.env.ADMIN_NAME || await rl.question('Admin name [Masud Rana Nayeem]: ')).trim() || 'Masud Rana Nayeem';

  if (!email || !email.includes('@')) throw new Error('Please provide a valid email address.');
  if (!password || password.length < 6) throw new Error('Firebase requires a password of at least 6 characters.');

  let user;
  try {
    user = await auth.getUserByEmail(email);
    user = await auth.updateUser(user.uid, { password, displayName, disabled: false });
    console.log(`Existing Firebase Auth user updated: ${user.uid}`);
  } catch (error) {
    if (error?.code !== 'auth/user-not-found') throw error;
    user = await auth.createUser({ email, password, displayName, emailVerified: false, disabled: false });
    console.log(`Created Firebase Auth user: ${user.uid}`);
  }

  await auth.setCustomUserClaims(user.uid, { ...(user.customClaims || {}), admin: true });
  await db.collection('admins').doc(user.uid).set({
    role: 'admin',
    email,
    displayName,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });

  console.log('\n✓ Admin account is ready.');
  console.log(`  Email: ${email}`);
  console.log(`  UID:   ${user.uid}`);
  console.log('  Firestore: admins/' + user.uid);
  console.log('\nYou can now run: npm run dev:admin');
} finally {
  rl.close();
  await admin.app().delete();
}
