# BitMan: bitman.ch

## What
Single-page landing for IT-Support targeting Swiss manufacturing SME owners ("Patron" persona).
Static HTML, hosted on Vercel.

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
