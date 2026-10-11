# Pothole Party ad contract (Ads to Aid)

One module, `pothole-party/ads/a2a-ads.js`, owns every ad call and every
Playgama Bridge call. Game code makes five calls on `window.A2A.ads` (and two on
`window.A2A.store` for progress) and never touches a network SDK. Anyone editing
the game (GPT, Cursor, a person) can rename or rewrite anything in the game's
`<script type="module">` as long as the call sites below keep working and the
two hook functions keep existing. The API is the same as VOTE's
(`horse/ads/CONTRACT.md`) and Capitol Crashers' (`play/ads/CONTRACT.md`).

## The five calls

```js
A2A.ads.init({ game: 'pothole-party', pause: adPause, resume: adResume, flags })
  // once, on load, before anything else. pause() and resume() are game
  // functions (see "Hooks"). flags (optional) overrides keys of window.A2A_ADS.

A2A.ads.preroll(openTitle)
  // once, before the title screen. Calls openTitle either way, then tells
  // Playgama the game is ready. The game shows the frame text around it.

A2A.ads.break('shift_end' | 'pause', resume)
  // full-screen break at a natural stop. resume() runs either way.
  // shift_end: when the end-of-shift report is on screen (the crew crashed).
  // pause: when the player opens the pause menu themselves (not on blur).
  // Never mid-shift and never on a repair, a pickup or an unlock.

A2A.ads.reward('extra_shift', onGranted, onDismissed)
  // player-initiated only, from the shift-report button that says an ad is
  // coming and what it gives. Exactly one of the callbacks runs. Offered once
  // per shift; granted, it regroups the same crew, score and neighborhood.

A2A.ads.surface(name)
  // returns { kind: 'image' | 'video' | 'none', src, href, label, sponsor }
  // for a commercial surface the street already draws. Pothole Party draws
  // none today (maps are static art, props are construction sprites), so
  // there are no surface() call sites and sponsors.json has no rows.
```

Every call is safe to make when ads are dark: it resolves at once and the game
continues. Calls never throw into game code.

## Progress: `A2A.store`

Playgama requires progress to go through Bridge storage, never `localStorage`.
The module wraps it:

```js
A2A.store.load(['a2a-potholes-work-best', 'a2a-potholes-unlocked'])  // -> Promise<[best, unlocked]>, null for a missing key
A2A.store.save(['a2a-potholes-work-best', 'a2a-potholes-unlocked'], [String(best), String(unlocked)])
```

Both keys go in one call (the checklist wants one array-keyed call). On a real
platform values live in Bridge storage (cloud saves where offered); on our own
site Bridge runs its mock platform and the same keys land in the browser's own
storage, with a one-time read of the pre-module keys so nobody loses a best
score. A slow or failed Bridge falls back after 5 s. The game coalesces writes
(`saveProgress()`, 1.5 s) and flushes on the shift report and on `pagehide`.

## Hooks the game must keep exporting

The game's module script defines `adPause()` and `adResume()` and passes them
to `init`. The module calls them around every full-screen ad, when the
Playgama platform pauses or mutes the game (tab switch, platform overlay), and
on a hidden tab on a real platform.

- `adPause()` must freeze the simulation and input and silence all sound
  (the soundtrack `<audio>` and the WebAudio FX context). It can be called on
  the title screen or during the player's own pause.
- `adResume()` must undo exactly that and restore the sound state the player
  had before (music that was playing resumes, muted stays muted). FX start
  off in Pothole Party and the module never unmutes anything.

Both must be idempotent (`adHold` flag). Keep their names or update the `init` call.

## Flags: `window.A2A_ADS`

Set in `index.html` before `ads/a2a-ads.js` loads. That line is the one switch.

| key | default | meaning |
|---|---|---|
| `enabled` | `false` | Real ads may run. On a real Playgama platform they go through Bridge; anywhere else the AdSense H5 tag (`ca-pub-4762698707947194`, `data-ad-frequency-hint="180s"`) is loaded into the page and `adBreak()` is used. |
| `stub` | `true` | When no real ad ran (dark, blocked by an ad blocker, no fill, local), calls resolve instantly and rewards are granted so the game is fully playable offline and in tests. `stub:false` denies a reward that no ad paid for. |
| `google` | `true` | `false` never loads the Google tag, whatever Bridge reports. The Playgama build sets it. |
| `client` | the publisher id | AdSense client. |
| `frequencyHint` | `'180s'` | Minimum gap between breaks, for Google and Bridge alike. |
| `sponsors` | `'ads/sponsors.json'` | Where the creatives live. |
| `bridge` | `true` | Load and initialise the Playgama Bridge SDK. `false` skips it (offline tests; the store then uses the browser's own storage). |

Modes:

- Dark (today, in review): `{ enabled: false, stub: true }`. Nothing loads from Google.
- Production on politicalarcades.com / adstoaid.com: `{ enabled: true, stub: false }`.
- Playgama build (`build-playgama.mjs` sets it): `{ enabled: true, stub: false, google: false }`.
  Bridge reports a real platform, so ads go through Bridge and the Google loader is unreachable.

## Events out

The module dispatches `a2a:ad` CustomEvents on `window` with
`detail = { type, surface, outcome }`:

- `type`: `init`, `preroll`, `break`, `reward`, `surface`, `store`
- `surface`: the kind or surface name (`shift_end`, `pause`, `extra_shift`, ...),
  the subsystem for `init` (`bridge`, `google`, `sponsors`), or `load` / `save` for `store`
- `outcome`: `stub`, `viewed`, `dismissed`, `unfilled`, `blocked`, `timeout`,
  `busy`, `error`, a Google `breakStatus`, `granted`, `denied:<reason>`,
  `house`, `sponsor`, `none`, `local`, `migrated`, or for `init` the platform id / load result.

Analytics and the ledger's impression count subscribe to this event; nothing
else needs to.

## Adding a sponsor

Edit `pothole-party/ads/sponsors.json`. One row per creative:

```json
{ "surface": "bus_shelter", "kind": "image", "src": "ads/sponsors/union-local-3.webp",
  "href": "https://example.org", "label": "Local 3 backs the block",
  "sponsor": "Union Local 3", "start": "2026-11-01", "end": "2026-12-31" }
```

- A surface needs a drawn frame first. The NYC bus shelter, once it gets a poster
  panel in the sprite, is the natural first one; until then `surface()` has no caller.
- `kind`: `image` or `video`. `src` is relative to `pothole-party/` and must live
  inside `pothole-party/` so the Playgama build stays self-contained.
- `start` and `end` are optional ISO dates; outside them the row is skipped.
- `sponsor: "house"` marks our own creatives. Rows rotate every 20 seconds per surface.

Creatives go on commercial surfaces only: never on the heroes, the workers,
the neighbors, the complaint department or their signs.

## Playgama Bridge

The module loads the Bridge SDK JS Core from
`https://bridge.playgama.com/v2/stable/playgama-bridge.js` (2.3.x) in every
mode (it is the platform SDK, not an ad creative; `bridge: false` in the flags
skips it). `pothole-party/playgama-bridge-config.json` sits next to
`index.html` (placements `preroll`, `shift_end`; rewarded `extra_shift`; 180 s
between interstitials). The module initialises Bridge first, subscribes to its
pause and audio events (one universal handler for platform pause, platform
mute and every ad overlay), checks `isAudioEnabled` at start, and sends
`in_game_loading_started`, `in_game_loading_stopped` and `game_ready` once the
title screen is up after the preroll. Locally Bridge runs its mock platform and
the game plays exactly as before; the mock is never asked for an ad (it would
pop a failure dialog). On a real platform `preroll` and `shift_end` are Bridge
interstitials, `extra_shift` is a Bridge rewarded ad granted only on the
`rewarded` state, and `pause` is skipped because Bridge paces interstitials itself.

## The Playgama build

`node pothole-party/build-playgama.mjs` writes
`pothole-party/dist/pothole-party-playgama.zip` (gitignored). It copies the
fonts, the art folder, the four soundtrack files the player lists and the
module, rewrites the absolute site paths to folders inside the archive, blanks
the Google loader, strips the arcade navigation, Community Pot, Patreon and
other-machine links and the canonical / Open Graph URLs, and wraps the page in a
root that scrolls so the browser page never shows a scrollbar. It fails if any
external URL other than the Bridge, any Google reference, any outbound link or
any domain check survives, or if the archive passes 300 MB.

## The rule

No file other than `pothole-party/ads/a2a-ads.js` may reference `adsbygoogle`,
`adBreak`, `adConfig`, `window.bridge`, `localStorage` or any Playgama API. The
only exceptions are the `window.A2A_ADS` flags line in `index.html`,
`playgama-bridge-config.json` and the build script's text replacements. If a
change needs a new ad behaviour, add it to the module and keep the five-call surface.

## Call sites in `index.html` (grep `CONTRACT.md`)

- `init` once, right after the DOM handles are taken, with `adPause` / `adResume`.
- `preroll` from `bootShift()` after the store load and one drawn frame. The
  title overlay shows the frame text ("Ads pay for this arcade. Half the profit
  goes to community programs.") from load until the first shift starts.
- `break('shift_end', ...)` in the frame loop's loss branch, right after `shiftReport()`.
- `break('pause', ...)` from `userPause()`, used by the Pause button, Space and Esc.
- `reward('extra_shift', ...)` from the `#extra-shift` button on the shift report.
  `extraShift()` puts the whole crew back on the start line with the same score,
  neighborhood and jobs; `extraShiftUsed` resets in `start()`.
- `A2A.store.load` in `bootShift()`; `A2A.store.save` through `saveProgress()`
  from `unlockLevel()`, the repair event and `shiftReport()`.
- No `surface()` call sites (see above).
