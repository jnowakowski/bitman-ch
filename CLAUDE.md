# BitMan: bitman.ch

## What
Multilingual technology services website for small and medium businesses.
One offer: consulting, software/websites, integration/automation, setup, backup and security.
Businesses focus on their product; Janusz turns their needs into working technology.
Wineries are one example application, not a separate offer or brand specialization.
Static HTML, hosted on Cloudflare Workers Static Assets. German at `/`, French at `/fr/`, English at `/en/`.
Shared styles: `style.css`; shared imagery: `assets/`. Existing sector/region pages are retained.
Keep all three language pages in sync. No universal fixed starting price or fear-based positioning.

## Content and imagery
Hero photograph (`assets/team.jpg`) and portrait are user-supplied. The hero shows a discussion in an office; do not describe the pictured people as BitMan employees or clients without confirmation.
Google, Roche, Hilti and BIS refer to prior professional experience, not BitMan client references.
Preserve canonical/hreflang metadata, existing OG logo and localized contact links.

## SEO Cross-Linking
This site is part of a 3-property SEO network. See `/Users/orion/_lab/_CloudIndustry/SEO-CROSS-LINKING.md` for the full link map.

Key links from this site:
- **Footer**: "CloudIndustry" links to cloudindustry.ch
- **Footer**: "Firmenverzeichnis Schweizer Maschinenbau" links to cloudindustry.ch/karte/
- GTM: `GTM-TLLQVV7Z` (shared container, delivers GA4 G-16TNFTJZJJ + Matomo Site ID 2)

## Repo
`github.com:jnowakowski/bitman-ch.git`
Branch: `main`

## Deploy
Cloudflare account: jnowakowski@gmail.com (`e6f898d21e749f4e559f72825c4444d4`).
Worker: `bitman-ch`. Do not deploy to GRAFTD.
Static assets only; no server runtime or package dependencies.
The account is pinned in `wrangler.jsonc`; Wrangler CLI v4 and Python 3 are required locally.

```bash
# Validate the static build
wrangler deploy --dry-run
# Publish to the configured Cloudflare account and domains
wrangler deploy
```

`git push` stores source only; deployment is explicit through Wrangler.
The build copies an explicit allowlist into ignored `dist/`, excluding credentials and source tooling.
Redirects live in `_redirects`. Preserve existing sector/region routes.
Cloudflare routes `bitman.ch/*` and `www.bitman.ch/*` serve all static assets directly.
DNS: proxied apex A `192.0.2.0` (reserved placeholder; no origin server), proxied www CNAME `bitman.ch`.
Do not remove these Worker routes without replacing the site routing.
Mail MX/TXT records are independent and must be preserved.

## Local dev
```bash
python3 scripts/build-static.py
python3 -m http.server 8080 -d dist
# or use .claude/launch.json: preview_start bitman-site
```
