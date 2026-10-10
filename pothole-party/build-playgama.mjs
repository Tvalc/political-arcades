#!/usr/bin/env node
// Builds the Playgama upload for Pothole Party.
//
//   node pothole-party/build-playgama.mjs
//
// Output: pothole-party/dist/pothole-party-playgama.zip (and the staged folder
// next to it). The archive is self-contained: index.html at the root, every
// font, map, atlas and soundtrack file the page loads copied inside with
// Latin-only names, no Google tag, no analytics, no outbound links, no domain
// checks. Only the Bridge SDK comes from the Playgama CDN. The ad flags become
// { enabled: true, stub: false, google: false }, so every ad goes through the
// Bridge and the Google loader is unreachable. No dependencies beyond Node.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, "..");
const dist = path.join(here, "dist");
const stage = path.join(dist, "playgama");
const zipPath = path.join(dist, "pothole-party-playgama.zip");
const LIMIT = 300 * 1024 * 1024;

function fail(message) { console.error(`build failed: ${message}`); process.exit(1); }
function once(text, from, to, label) {
  const n = typeof from === "string" ? text.split(from).length - 1 : (text.match(new RegExp(from.source, "g")) || []).length;
  if (n !== 1) fail(`${label}: expected one match, found ${n}`);
  return text.replace(from, () => to);
}

// ------------------------------------------------------------------ page
let html = fs.readFileSync(path.join(here, "index.html"), "utf8");

// Flags: real ads, no stub rewards, never Google.
html = once(html, /window\.A2A_ADS\s*=\s*\{[^}]*\}/, "window.A2A_ADS={enabled:true,stub:false,google:false}", "ad flags");

// Head metadata that points at our domain.
html = html.replace(/<link rel="canonical"[^>]*>/g, "");
html = html.replace(/<meta property="og:(?:url|image)"[^>]*>/g, "");

// Site chrome with outbound links. The game, its pickers, the complaint
// department, the rules copy and the soundtrack player all stay.
html = once(html, /<nav aria-label="Arcade navigation">[\s\S]*?<\/nav>/, "", "arcade nav");
const brand = html.match(/<a class="brand" href="\/">([\s\S]*?)<\/a>/);
if (!brand) fail("brand link: not found");
html = html.replace(brand[0], () => `<span class="brand">${brand[1]}</span>`);
html = once(html, '<a href="/community-pot/">See where the money goes →</a>', "", "community pot link");
html = once(html, '<a href="/#listen">All twenty-seven songs →</a>', "", "soundtrack link");
html = once(html, /<div class="support-links">[\s\S]*?<\/div>/, "", "support links");
html = once(html, /<nav class="more-machines"[\s\S]*?<\/nav>/, "", "more machines");
html = once(html, /<footer class="site-foot"><p>[\s\S]*?<\/p>/, '<footer class="site-foot"><p>Political Arcades · Free to play</p>', "footer links");

// Provenance links inside the embedded cast manifest (metadata, never loaded).
html = html.replace(/,"sourceUrl":"https?:[^"]*"/g, "");

// Layout: Playgama wants no browser page scrollbar. The page scrolls inside
// its own root instead, and the viewport never scrolls.
html = once(html, "</style></head><body>",
  "html,body{height:100%;overflow:hidden}#pg-root{height:100%;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}\n</style></head><body><div id=\"pg-root\">", "page root open");
html = once(html, "</script></body></html>", "</script></div></body></html>", "page root close");

// Assets: absolute site paths become folders inside the archive.
const files = new Map(); // archive path -> source path
function add(archivePath, source) {
  if (!fs.existsSync(source)) fail(`missing asset ${source}`);
  if (!/^[A-Za-z0-9._/-]+$/.test(archivePath)) fail(`non-Latin archive name ${archivePath}`);
  files.set(archivePath, source);
}
html = html.replace(/\?rev=\d+/g, "");
html = html.split("/fonts/").join("fonts/");
for (const [, name] of html.matchAll(/fonts\/([A-Za-z0-9._-]+\.woff2)/g)) add(`fonts/${name}`, path.join(site, "fonts", name));
html = html.split("/art/pothole-party/").join("art/");
for (const name of fs.readdirSync(path.join(site, "art", "pothole-party"))) {
  if (name.endsWith(".webp")) add(`art/${name}`, path.join(site, "art", "pothole-party", name));
}
for (const [, name] of html.matchAll(/art\/([A-Za-z0-9._-]+\.webp)/g)) if (!files.has(`art/${name}`)) fail(`art reference without file: ${name}`);
html = html.split("/horse/assets/music/").join("music/");
const trackSelect = html.match(/<select id="track">([\s\S]*?)<\/select>/);
if (!trackSelect) fail("track select not found");
for (const [, value] of trackSelect[1].matchAll(/<option value="([^"]+)">/g)) add(`music/${value}.mp3`, path.join(site, "horse", "assets", "music", `${value}.mp3`));
for (const [, name] of html.matchAll(/music\/([A-Za-z0-9._-]+\.mp3)/g)) if (!files.has(`music/${name}`)) fail(`music reference without file: ${name}`);

// The ad module ships without the Google loader.
let ads = fs.readFileSync(path.join(here, "ads", "a2a-ads.js"), "utf8");
ads = once(ads, /const GOOGLE_SRC = "https:\/\/pagead2\.googlesyndication\.com\/[^"]+";/, 'const GOOGLE_SRC = ""; // Playgama build: Google is never loaded', "google src");
ads = once(ads, /client: "ca-pub-[0-9]+",/, 'client: "",', "google client");
// The whole Google section becomes a stub that can never load anything.
ads = once(ads, /\/\/ -+ google\n[\s\S]*?(?=\/\/ -+ one at a time)/,
  "// Google: removed from the Playgama build.\n  const google = { failed: true };\n  function loadGoogle() {}\n  function useGoogleAds() { return false; }\n\n  ", "google section");
ads = ads.split("(adsbygoogle / adBreak)").join("(disabled in this build)").split("references adsbygoogle or bridge").join("references the ad tag or bridge");


// ------------------------------------------------------------------ checks
const texts = { "index.html": html, "ads/a2a-ads.js": ads };
for (const [name, text] of Object.entries(texts)) {
  if (/googlesyndication|adsbygoogle|googletagmanager|google-analytics|gtag\(/.test(text)) fail(`${name} still references Google`);
  for (const [url] of text.matchAll(/https?:\/\/[^\s"'<>)]+/g)) {
    if (!url.startsWith("https://bridge.playgama.com/")) fail(`${name} keeps an external URL: ${url}`);
  }
  if (/location\.(host|hostname|origin|href)|document\.domain/.test(text)) fail(`${name} checks the domain`);
}
if (/href="(\/|https?:)/.test(html) || /target="_blank"/.test(html.replace(/source\.target='_blank'/, ""))) fail("index.html keeps an outbound link");

// ------------------------------------------------------------------ stage
fs.rmSync(stage, { recursive: true, force: true });
fs.mkdirSync(stage, { recursive: true });
const entries = [];
function stageText(archivePath, text) {
  const target = path.join(stage, archivePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, text);
  entries.push({ name: archivePath, data: Buffer.from(text, "utf8") });
}
stageText("index.html", html);
stageText("ads/a2a-ads.js", ads);
stageText("ads/sponsors.json", fs.readFileSync(path.join(here, "ads", "sponsors.json"), "utf8"));
stageText("playgama-bridge-config.json", fs.readFileSync(path.join(here, "playgama-bridge-config.json"), "utf8"));
for (const [archivePath, source] of [...files].sort()) {
  const target = path.join(stage, archivePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  entries.push({ name: archivePath, data: fs.readFileSync(source) });
}

// ------------------------------------------------------------------ zip
// A plain zip writer (deflate or store per entry) so the build needs no tools.
const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1, DOS_TIME = 0;
const parts = [], central = [];
let offset = 0;
for (const entry of entries) {
  const name = Buffer.from(entry.name, "utf8");
  const deflated = zlib.deflateRawSync(entry.data, { level: 9 });
  const method = deflated.length < entry.data.length ? 8 : 0;
  const body = method === 8 ? deflated : entry.data;
  const crc = crc32(entry.data);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0, 6); local.writeUInt16LE(method, 8);
  local.writeUInt16LE(DOS_TIME, 10); local.writeUInt16LE(DOS_DATE, 12); local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(body.length, 18); local.writeUInt32LE(entry.data.length, 22); local.writeUInt16LE(name.length, 26); local.writeUInt16LE(0, 28);
  const dir = Buffer.alloc(46);
  dir.writeUInt32LE(0x02014b50, 0); dir.writeUInt16LE(20, 4); dir.writeUInt16LE(20, 6); dir.writeUInt16LE(0, 8); dir.writeUInt16LE(method, 10);
  dir.writeUInt16LE(DOS_TIME, 12); dir.writeUInt16LE(DOS_DATE, 14); dir.writeUInt32LE(crc, 16); dir.writeUInt32LE(body.length, 20);
  dir.writeUInt32LE(entry.data.length, 24); dir.writeUInt16LE(name.length, 28); dir.writeUInt16LE(0, 30); dir.writeUInt16LE(0, 32);
  dir.writeUInt16LE(0, 34); dir.writeUInt16LE(0, 36); dir.writeUInt32LE(0, 38); dir.writeUInt32LE(offset, 42);
  parts.push(local, name, body);
  central.push(dir, name);
  offset += local.length + name.length + body.length;
}
const centralBuf = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(0, 4); end.writeUInt16LE(0, 6); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10);
end.writeUInt32LE(centralBuf.length, 12); end.writeUInt32LE(offset, 16); end.writeUInt16LE(0, 20);
const zip = Buffer.concat([...parts, centralBuf, end]);
if (zip.length > LIMIT) fail(`archive is ${zip.length} bytes, over the 300 MB limit`);
fs.writeFileSync(zipPath, zip);

const mb = n => (n / 1024 / 1024).toFixed(2) + " MB";
console.log(`${entries.length} files, ${mb(entries.reduce((n, e) => n + e.data.length, 0))} unpacked`);
for (const entry of entries) console.log(`  ${entry.name}  ${mb(entry.data.length)}`);
console.log(`zip: ${zipPath}  ${mb(zip.length)} (${zip.length} bytes)`);
