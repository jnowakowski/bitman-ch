from pathlib import Path
import shutil

root = Path(__file__).resolve().parents[1]
out = root / "dist"
# Only this generated directory is replaced; source files remain intact.
if out.exists():
    shutil.rmtree(out)
out.mkdir()
files = ["index.html", "style.css", "favicon.svg", "robots.txt", "sitemap.xml", "_redirects"]
folders = ["assets", "img", "en", "fr", "it-fuer-produktion", "ueber-mich", "region", "it-beratung-kmu", "integration-automatisierung"]
for name in files:
    shutil.copy2(root / name, out / name)
for name in folders:
    shutil.copytree(root / name, out / name)
print(f"Built {sum(p.is_file() for p in out.rglob('*'))} public files in {out}")
