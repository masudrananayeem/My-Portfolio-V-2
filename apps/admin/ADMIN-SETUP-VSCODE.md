# Admin Creator — VS Code

All admin-only tooling lives inside `apps/admin`.

## 1. One-time Firebase service account

Download a Firebase Admin SDK service-account JSON from:
Firebase Console → Project settings → Service accounts → Generate new private key.

Save it as:

`apps/admin/serviceAccountKey.json`

This file is ignored by Git and must never be committed.

## 2. Admin credentials

Copy:

`apps/admin/.env.admin.example` → `apps/admin/.env.admin`

You can optionally put these values there:

```env
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
# ADMIN_EMAIL=admin@example.com
# ADMIN_PASSWORD=your-password
# ADMIN_NAME=Masud Rana Nayeem
```

If `ADMIN_EMAIL` / `ADMIN_PASSWORD` are omitted, the script asks for them interactively.

## 3. Create/update an admin from VS Code

From `Frontend/apps/admin`:

```bash
npm install
npm run admin:create
```

Or from the `Frontend` monorepo root:

```bash
npm run admin:create
```

The script creates or updates the Firebase Authentication user, sets the `admin: true` custom claim, and creates/updates `admins/{UID}` in Firestore.

## 4. Run Admin

From `Frontend/apps/admin`:

```bash
npm run dev
```

Or from the `Frontend` root:

```bash
npm run dev:admin
```

## Important

Never commit `serviceAccountKey.json` or `.env.admin`.
