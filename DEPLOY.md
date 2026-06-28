# Deployment

This is a **static** Next.js app — `next.config.ts` sets `output: "export"`, so the
build emits a fully static site to `out/`. There are no server routes or Pages
Functions; every route is prerendered at build time.

It is hosted on **Cloudflare Pages** with the build running under **Bun**.

## Cloudflare Pages build settings

Set these in the Pages project → **Settings → Build**:

| Setting                | Value                                            |
| ---------------------- | ------------------------------------------------ |
| Build command          | `bun install --frozen-lockfile && bun run build` |
| Build output directory | `out`                                            |
| Root directory         | `/`                                              |

### Build environment variables (set for **Production** and **Preview**)

| Variable                  | Value    | Purpose                                                            |
| ------------------------- | -------- | ----------------------------------------------------------------- |
| `BUN_VERSION`             | `1.3.14` | Pin Bun to match local; the build runs under Bun.                 |
| `SKIP_DEPENDENCY_INSTALL` | `true`   | Skip CF's default npm install so the build command's `bun install` runs instead. |
| `NODE_VERSION`            | `22`     | Next 16 needs Node ≥ 20.9; safety net for tools that shell out to Node. |

Ensure **Build system version** is the latest (v2/v3) — the legacy v1 image does
not honor `BUN_VERSION`.

Bun is auto-detected from `bun.lock` (and `package-lock.json` has been removed), but
the explicit `bun install` above is the reliable path for the text-based `bun.lock`.

## Why not `@cloudflare/next-on-pages`

`@cloudflare/next-on-pages` turns an SSR/edge Next.js app into Pages *Functions*.
This app is `output: "export"` (100% static), so there is nothing for it to build —
and it is deprecated and does not track Next.js 16. Its replacement is
`@opennextjs/cloudflare`. Neither is needed here: just publish `out/`.

If server features (SSR, API routes, ISR, middleware) are ever added, remove
`output: "export"` and migrate to `@opennextjs/cloudflare` (Workers Node.js runtime).

## Two deployments, one repo

| Deployment               | Builds from branch | Daily-rebuild secret  |
| ------------------------ | ------------------ | --------------------- |
| Bacii countdown          | `main`             | `DEPLOY_HOOK_URL`     |
| Khmer New Year countdown | `kny`              | `KNY_DEPLOY_HOOK_URL` |

`.github/workflows/daily-og-rebuild.yml` runs at 17:00 UTC (00:00 Asia/Phnom_Penh)
and POSTs the Cloudflare Pages deploy hook(s) so the date-baked countdown / OG image
rebuilds when the local day rolls over. Hook URLs are stored as repository secrets.

## `wrangler.jsonc`

`wrangler.jsonc` records `pages_build_output_dir` (config-as-code for the output dir)
and enables direct uploads via `bunx wrangler pages deploy out`. The `name` field must
match the Cloudflare Pages project. Git-integrated builds + deploy hooks do not require
this file, but it keeps the output dir versioned alongside the code.
