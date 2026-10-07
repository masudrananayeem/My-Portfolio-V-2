# Nayeem Portfolio — npm setup

## Structure
- `apps/web` — public portfolio
- `apps/admin` — Firebase admin CMS
- `../Backend` — Cloudflare Worker API for GitHub data
- `packages/*` — shared UI, Firebase, types, utilities

## Install
From `Frontend/`:
```bash
npm install
```

Backend:
```bash
cd ../Backend
npm install
```

## Run
Public web:
```bash
npm run dev:web
```
Admin:
```bash
npm run dev:admin
```
Backend:
```bash
npm run dev:backend
```

For the public portfolio to receive live GitHub data locally, set:
`apps/web/.env.local`
```env
VITE_WORKER_API_URL=http://localhost:8787
```

## Production build
```bash
npm run build
```

The GitHub token remains server-side in the Cloudflare Worker. Never put `GITHUB_TOKEN` in the frontend.
