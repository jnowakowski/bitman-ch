# BitMan: bitman.ch

## What
Multilingual technology services website for small and medium businesses.
One offer: consulting, software/websites, integration/automation, setup, backup and security.
Businesses focus on their product; Janusz turns their needs into working technology.
Wineries are one example application, not a separate offer or brand specialization.
Static HTML, hosted on Vercel. German at `/`, French at `/fr/`, English at `/en/`.
Shared styles: `style.css`; shared imagery: `assets/`. Existing sector/region pages are retained.
Keep all three language pages in sync. No universal fixed starting price or fear-based positioning.

## Content and imagery
Workshop photo is an AI-generated illustration, explicitly labelled. Portrait is user-supplied.
Google, Roche, Hilti and BIS refer to prior professional experience, not BitMan client references.
Preserve canonical/hreflang metadata, existing OG logo and localized contact links.

## SEO Cross-Linking
This site is part of a 3-property SEO network. See `/Users/orion/_lab/SEO-CROSS-LINKING.md` for the full link map.

Key links from this site:
- **Footer**: "CloudIndustry" links to cloudindustry.ch
- **Footer**: "Firmenverzeichnis Schweizer Maschinenbau" links to cloudindustry.ch/karte/
- GTM: `GTM-TLLQVV7Z` (shared container, delivers GA4 G-16TNFTJZJJ + Matomo Site ID 2)

## Repo
`github.com:jnowakowski/bitman-ch.git`
Branch: `main`

## Deploy
Hosted on Vercel. Auto-deploys on push to `main`.

```bash
# Push to production (Vercel builds automatically)
git add index.html && git commit -m "description" && git push origin main

# Manual deploy (if needed)
vercel --prod

# Preview deploy (without pushing to prod)
vercel
```

## Local dev
```bash
python3 -m http.server 8080 -d /Users/orion/_lab/bitman/website
# or use .claude/launch.json: preview_start bitman-site
```
