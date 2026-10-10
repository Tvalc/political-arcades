#!/usr/bin/env node
// Builds the self-contained Playgama upload for VOTE.
//   node horse/build-playgama.js            -> horse/dist/vote-playgama.zip
// Everything the game loads is copied inside (court art, sprites, UI, music,
// fonts, the site button sheet). No Google Fonts, no AdSense tag, no analytics,
// no outbound links, index.html at the archive root, Latin-only names.
// Only the Playgama Bridge SDK itself loads from the network, as their rules allow.
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const HORSE = __dirname;
const SITE = path.resolve(HORSE, "..");
const DIST = path.join(HORSE, "dist");
const STAGE = path.join(DIST, "playgama");
const ZIP = path.join(DIST, "vote-playgama.zip");
const LIMIT_MB = 300;

function rm(p) { fs.rmSync(p, { recursive: true, force: true }); }
function mkdir(p) { fs.mkdirSync(p, { recursive: true }); }
function copy(src, dest) { mkdir(path.dirname(dest)); fs.cpSync(src, dest, { recursive: true }); }
function read(p) { return fs.readFileSync(p, "utf8"); }
function write(p, s) { mkdir(path.dirname(p)); fs.writeFileSync(p, s); }
function must(cond, msg) { if (!cond) { console.error("build failed: " + msg); process.exit(1); } }

rm(STAGE); mkdir(STAGE);

// 1. index.html: local fonts, local button sheet, no outbound links, no meta
//    pointing at the live site, Playgama ad flags, single-screen stylesheet.
let html = read(path.join(HORSE, "index.html"));
const before = html;
html = html
  .replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.g[^>]*>\s*/g, "\n  ")
  .replace(/\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/, '\n  <link rel="stylesheet" href="fonts.css" />')
  .replace(/\s*<link rel="canonical"[^>]*>/, "")
  .replace(/\s*<meta (?:property="og:|name="twitter:)[^>]*>/g, "")
  .replace(/href="\.\.\/chibi-ui\.css[^"]*"/, 'href="chibi-ui.css"')
  .replace(/<link rel="stylesheet" href="court-layout\.css[^"]*">/, m => m + '\n<link rel="stylesheet" href="playgama.css">')
  .replace(/<a class="brand" href="\.\/">(.*?)<\/a>/, '<span class="brand">$1</span>')
  .replace(/\s*<a class="brand-side" href="\.\.\/">Political Arcades<\/a>/, "")
  .replace(/<a href="\.\.\/">Political Arcades<\/a>/g, "Political Arcades")
  .replace(/window\.A2A_ADS = \{[^}]*\};/, "window.A2A_ADS = { enabled: true, stub: false, google: false };");
must(html !== before, "index.html did not change; check the patterns above");
must(!/googleapis|gstatic|chibi-ui\.css\?|href="\.\.\//.test(html), "index.html still references the live site");
must(/google: false/.test(html), "A2A_ADS flags were not rewritten");
write(path.join(STAGE, "index.html"), html);

// 2. Fonts from the site's own woff2 files.
const fonts = [["Bungee", "bungee-400.woff2"], ["Share Tech Mono", "share-tech-mono-400.woff2"]];
let fontCss = "";
for (const [family, file] of fonts) {
  const src = path.join(SITE, "fonts", file);
  must(fs.existsSync(src), `missing font ${src}`);
  copy(src, path.join(STAGE, "fonts", file));
  fontCss += `@font-face{font-family:"${family}";font-style:normal;font-weight:400;font-display:swap;src:url("fonts/${file}") format("woff2")}\n`;
}
write(path.join(STAGE, "fonts.css"), fontCss);

// 3. Stylesheets and scripts. court-layout.css reaches ../art for the gold
//    button sheet, so that sheet is copied to art/chibi inside the archive and
//    the path rewritten; chibi-ui.css (site-wide button skin) already uses art/chibi.
copy(path.join(HORSE, "styles.css"), path.join(STAGE, "styles.css"));
copy(path.join(HORSE, "touch.css"), path.join(STAGE, "touch.css"));
copy(path.join(HORSE, "playgama.css"), path.join(STAGE, "playgama.css"));
write(path.join(STAGE, "court-layout.css"), read(path.join(HORSE, "court-layout.css")).replace(/\.\.\/art\//g, "art/"));
copy(path.join(SITE, "chibi-ui.css"), path.join(STAGE, "chibi-ui.css"));
for (const sheet of ["button-gold.webp", "button-teal.webp", "panel.webp", "rally.webp"]) {
  const src = path.join(SITE, "art", "chibi", sheet);
  if (fs.existsSync(src)) copy(src, path.join(STAGE, "art", "chibi", sheet));
}
copy(path.join(HORSE, "touch.js"), path.join(STAGE, "touch.js"));
copy(path.join(HORSE, "src"), path.join(STAGE, "src"));
copy(path.join(HORSE, "ads", "a2a-ads.js"), path.join(STAGE, "ads", "a2a-ads.js"));
copy(path.join(HORSE, "playgama-bridge-config.json"), path.join(STAGE, "playgama-bridge-config.json"));

// 4. Sponsors: house creatives stay, links go (no outbound links in the build).
const sponsors = JSON.parse(read(path.join(HORSE, "ads", "sponsors.json")));
for (const row of sponsors) {
  row.href = null;
  must(!/^(\.\.\/|https?:)/.test(row.src), `sponsor creative outside horse/: ${row.src}`);
}
write(path.join(STAGE, "ads", "sponsors.json"), JSON.stringify(sponsors, null, 2));

// 5. Every asset the game loads: court art, sprites, UI, music.
copy(path.join(HORSE, "assets"), path.join(STAGE, "assets"));

// 6. Checks: Latin-only names, no live-site or analytics references in text files, size.
const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    must(/^[A-Za-z0-9._-]+$/.test(entry.name), `non-Latin or unsafe file name: ${p}`);
    if (entry.isDirectory()) walk(p); else files.push(p);
  }
})(STAGE);
let bytes = 0;
const banned = /politicalarcades\.com|googleapis|gstatic|google-analytics|googletagmanager|gtag\(|adsbygoogle\.js\?client/;
for (const f of files) {
  bytes += fs.statSync(f).size;
  if (/\.(html|css|js|json)$/.test(f) && !f.endsWith(path.join("ads", "a2a-ads.js"))) {
    must(!banned.test(read(f)), `live-site, font or analytics reference in ${path.relative(STAGE, f)}`);
  }
}
const musicCount = fs.readdirSync(path.join(STAGE, "assets", "music")).filter(f => f.endsWith(".mp3")).length;
must(musicCount >= 28, `expected 28 music files, found ${musicCount}`);
must(fs.existsSync(path.join(STAGE, "index.html")), "index.html missing at archive root");

// 7. Zip. bsdtar (Windows 10+, macOS) writes zip with -a (relative paths, so a
//    drive letter is not read as a remote host); fall back to zip(1), then PowerShell.
rm(ZIP);
// Top-level entries are named explicitly so index.html sits at the archive root, not under "./".
const topLevel = fs.readdirSync(STAGE);
const tarArgs = ["-a", "-c", "-f", path.basename(ZIP), "-C", path.basename(STAGE), ...topLevel];
const zippers = [
  // Windows' own bsdtar first: a GNU tar on PATH (Git for Windows) ignores -a for .zip and writes a plain tar.
  () => process.platform === "win32" && execFileSync(path.join(process.env.SystemRoot || "C:\\Windows", "System32", "tar.exe"), tarArgs, { cwd: DIST, stdio: "inherit" }),
  () => execFileSync("tar", tarArgs, { cwd: DIST, stdio: "inherit" }),
  () => execFileSync("zip", ["-r", "-q", ZIP, "."], { cwd: STAGE, stdio: "inherit" }),
  () => execFileSync("powershell", ["-NoProfile", "-Command", `Compress-Archive -Path '${STAGE}\\*' -DestinationPath '${ZIP}' -Force`], { stdio: "inherit" }),
];
function isZip(p) {
  if (!fs.existsSync(p)) return false;
  const head = Buffer.alloc(4); const fd = fs.openSync(p, "r"); fs.readSync(fd, head, 0, 4, 0); fs.closeSync(fd);
  return head[0] === 0x50 && head[1] === 0x4b && head[2] === 0x03 && head[3] === 0x04;
}
let zipped = false;
for (const run of zippers) { rm(ZIP); try { run(); } catch (_) { /* try the next tool */ } if (isZip(ZIP)) { zipped = true; break; } }
must(zipped, "could not create a zip archive (needs bsdtar, zip or PowerShell)");
const zipMb = fs.statSync(ZIP).size / 1048576;
must(zipMb < LIMIT_MB, `archive is ${zipMb.toFixed(1)} MB, over the ${LIMIT_MB} MB limit`);
console.log(`built ${ZIP}`);
console.log(`${files.length} files, ${(bytes / 1048576).toFixed(1)} MB unpacked, ${zipMb.toFixed(1)} MB zipped (limit ${LIMIT_MB} MB)`);
