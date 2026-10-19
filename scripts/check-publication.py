"""Check published routes and their local dependencies without downloading media."""
import json
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.refs = []
        self.styles = []
        self.scripts = []
        self.meta = {}
        self.base = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "base":
            self.base = a.get("href")
        if tag == "meta":
            self.meta[a.get("name", "")] = a.get("content", "")
        for key in ("src", "href"):
            if a.get(key):
                self.refs.append(a[key])
        if tag == "script" and a.get("src"):
            self.scripts.append(a["src"])
        if tag == "link" and a.get("rel") == "stylesheet":
            self.styles.append(a.get("href", ""))


def local_file(ref, owner):
    u = urlsplit(ref)
    if u.scheme or u.netloc or not u.path:
        return None
    return (ROOT / unquote(u.path.lstrip("/")) if u.path.startswith("/")
            else owner.parent / unquote(u.path)).resolve()


errors, modules, visited = [], [], set()
urls = [n.text for n in ET.parse(ROOT / "sitemap.xml").iter() if n.tag.endswith("loc")]
for url in urls:
    path = ROOT / urlsplit(url).path.lstrip("/")
    path = path / "index.html" if path.is_dir() else path
    if not path.is_file():
        errors.append(f"Missing published page: {url}")
        continue
    page = Page(path.read_text(encoding="utf-8"))
    owner = path
    if page.base:
        base = local_file(page.base, path)
        if base:
            owner = base / "index.html" if page.base.endswith("/") else base
    if not page.meta.get("description"):
        errors.append(f"Missing page description: {url}")
    for ref in page.refs:
        target = local_file(ref, owner)
        if target and not target.exists():
            errors.append(f"{path.relative_to(ROOT)} -> missing {ref}")
    if any(ref.startswith("/mockups/") for ref in page.styles):
        errors.append(f"Crawl-blocked production stylesheet: {url}")
    modules.extend(local_file(ref, owner) for ref in page.scripts)

# Resolve the actual module graph used by public pages, including promoted games.
while modules:
    path = modules.pop()
    if not path or path in visited or not path.is_file() or path.suffix not in (".js", ".mjs"):
        continue
    visited.add(path)
    text = path.read_text(encoding="utf-8")
    for ref in re.findall(r'''(?:from\s*|import\s*|import\(\s*)['"]([^'"]+)''', text):
        if not ref.startswith((".", "/")):
            continue
        target = local_file(ref, path)
        if target and not target.exists():
            errors.append(f"{path.relative_to(ROOT)} -> missing module {ref}")
        modules.append(target)

clips = json.loads((ROOT / "greatest-hits/clips.json").read_text(encoding="utf-8"))
ids = [c["id"] for c in clips]
if len(ids) != len(set(ids)):
    errors.append("Duplicate clip identifiers")
static = (ROOT / "greatest-hits/index.html").read_text(encoding="utf-8")
for c in clips:
    if c.get("platform") not in ("youtube", "tiktok") or c.get("media"):
        errors.append(f"Unexpected third-party delivery: {c['id']}")
    if not all(c.get("editorial", {}).get(k) for k in ("reading", "question")):
        errors.append(f"Missing editorial notes: {c['id']}")
    if f'id="moment-{c["id"]}"' not in static:
        errors.append(f"Missing initial-HTML clip: {c['id']}")

home = Page((ROOT / "index.html").read_text(encoding="utf-8"))
account = home.meta.get("google-adsense-account", "").removeprefix("ca-")
if not account or account not in (ROOT / "ads.txt").read_text(encoding="utf-8"):
    errors.append("AdSense verification metadata and ads.txt disagree")

if errors:
    print("\n".join(errors))
    sys.exit(1)
print(f"PASS: {len(urls)} published pages, {len(visited)} module dependencies, "
      f"{len(clips)} editorial entries, and matching publisher verification.")
