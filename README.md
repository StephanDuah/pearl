# Merry Tasker

Next.js 14 (App Router) + TypeScript + Tailwind port of the Merry Tasker cleaning-task PWA.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `app/` — root layout, global styles, and the single page (SPA-style screen switching, matching the original's `showScreen()` behavior)
- `components/` — LoginScreen, HomeScreen, ChecklistScreen, ProfileScreen, CompleteModal, Toast
- `lib/data.ts` — static profiles, jobs, history, and room/task templates (swap for API calls later)
- `lib/types.ts` — shared TypeScript types
- `lib/AppContext.tsx` — React Context replacing the original's global mutable state; persists checklist progress to `localStorage` exactly like the original
- `lib/usePWAInstall.ts` — `beforeinstallprompt` handling + service worker registration
- `public/manifest.json`, `public/sw.js`, `public/icon.svg` — PWA assets (previously base64-inlined in the HTML `<head>`)

## Notes / things to revisit

- Login is still a fake client-side "any 4-digit PIN" gate, same as the original — replace with real auth (e.g. NextAuth) when you're ready to hook this up to Mongo like your other projects.
- Data currently lives in `lib/data.ts`. To make jobs/tasks dynamic, swap the reads in `AppContext` for fetches to your API/Mongoose models.
- Tailwind config in `tailwind.config.ts` maps your original CSS custom properties (navy/gold palette) to named colors (`navy`, `gold`, `gold-pale`, etc.) so class names stay close to the source.
- Fonts are loaded via a `<link>` tag in `app/layout.tsx` rather than `next/font`, so the build doesn't require network access to Google Fonts at build time — works the same in the browser either way.
