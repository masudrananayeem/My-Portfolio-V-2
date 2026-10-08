# Nayeem Portfolio — Frontend Monorepo

Public portfolio (`apps/web`) + Admin dashboard (`apps/admin`), sharing a
design system and Firebase/Firestore data layer. The backend (Cloudflare
Worker — GitHub API proxy, etc.) lives in a **separate repo**.

## Structure

```
apps/
  web/      → public portfolio (React + Vite + TS + Tailwind)
  admin/    → admin dashboard (React + Vite + TS + Tailwind, Firebase Auth)
packages/
  ui/       → shared components (Button, GlowCard, Marquee, ...)
  types/    → shared TypeScript types (Project, Skill, ...) — the source of
              truth for every Firestore document shape
  utils/    → cn(), slugify(), formatDateRange(), cloudinaryUrl(), debounce()
  firebase/ → Firebase client init + typed Firestore CRUD helpers
  config/   → shared Tailwind preset (colors/fonts/animations) + base tsconfig
firestore.rules            → Firestore Security Rules (deploy via Firebase CLI)
firestore.indexes.json
firebase.json
```

## Status — what's built vs. scaffolded

This is a **working skeleton**, built and typechecked, not the full 58-feature
spec in one pass — that's genuinely multiple weeks of work for a solo dev.
Built and functional right now:

- Full routing for both apps, dark futuristic design system, responsive layout
- Firebase client + typed Firestore hooks (`useProjects`, `useSkills`, etc.)
- Admin auth (Firebase email/password) + protected routes
- **Full CRUD** on the Projects admin page (`apps/admin/src/pages/Projects.tsx`)
  — use this as the reference pattern for every other collection
- Contact form (writes to Firestore `messages`), Messages admin inbox
- Hero, tech marquee, GitHub activity preview, project cards, custom cursor,
  loading screen, Lenis smooth scroll + GSAP ScrollTrigger wiring

Scaffolded (UI shell exists, needs the same CRUD pattern as Projects wired in):

- Profile / About / Skills / TechStack / Experience / Research / Services /
  GitHub Settings / Media / Resume / Settings admin pages
- Hero 3D background (Three.js) — not yet added
- GitHub contribution heatmap — currently renders a static placeholder grid;
  real data comes from the backend Worker's `/api/github` endpoint
- Cloudinary media upload widget in the admin (image URLs are plain text
  fields for now)
- Page transitions, magnetic buttons, custom cursor polish

## Local development

```bash
pnpm install
cp apps/web/.env.example apps/web/.env
cp apps/admin/.env.example apps/admin/.env
# fill in Firebase config in both .env files (same Firebase project)

pnpm dev:web     # http://localhost:5173
pnpm dev:admin   # http://localhost:5174
```

## Firebase setup

1. Create a Firebase project → enable **Firestore** and **Authentication
   (Email/Password)**.
2. Create your admin user in Firebase Auth, then add a matching document at
   `admins/{uid}` in Firestore (see `firestore.rules` — this doc is what
   grants write access; it's never writable from the client).
3. Deploy rules: `firebase deploy --only firestore:rules,firestore:indexes`
   (requires `firebase-tools`: `npm i -g firebase-tools && firebase login`).
4. Copy your Firebase web config into both apps' `.env`.

## Cloudinary

Create a free account, then an **unsigned upload preset** (Settings → Upload)
so the admin app can upload images directly from the browser without
exposing your API secret. Put the cloud name + preset in `apps/admin/.env`.

## Deployment — Cloudflare Pages

Two separate Cloudflare Pages projects (or one with two build configs):

**Web**
- Build command: `pnpm --filter web build`
- Output directory: `apps/web/dist`
- Environment variables: same as `apps/web/.env`, plus `VITE_WORKER_API_URL`
  pointing at your deployed backend Worker.

**Admin**
- Build command: `pnpm --filter admin build`
- Output directory: `apps/admin/dist`
- Environment variables: same as `apps/admin/.env`
- Recommended: password-protect via Cloudflare Access, or restrict to your
  IP, as a second layer on top of Firebase Auth.

## Next steps (suggested order)

1. Seed initial Firestore content (profile, a few projects, skills) — either
   by hand in the Firebase console or by finishing the admin CRUD pages.
2. Wire the remaining admin CRUD pages using `pages/Projects.tsx` as the
   template.
3. Build the backend Worker repo (`/api/github`, `/api/contact` if you want
   server-side email notifications too) and point `VITE_WORKER_API_URL` at it.
4. Add the Hero 3D scene and the real GitHub contribution heatmap.
5. Deploy.

## Admin management

All admin-only tooling is inside `apps/admin`.

```bash
cd apps/admin
npm run admin:create
```

Place the Firebase Admin SDK service-account JSON at `apps/admin/serviceAccountKey.json` and keep it private. Copy `apps/admin/.env.admin.example` to `apps/admin/.env.admin` if you want to configure the service-account path or credentials.

Run the admin app with:

```bash
cd apps/admin
npm run dev
```
