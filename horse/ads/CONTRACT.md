# VOTE ad contract (Ads to Aid)

One module, `horse/ads/a2a-ads.js`, owns every ad call. Game code makes five
calls on `window.A2A.ads` and never touches a network SDK. Anyone editing the
game (GPT, Cursor, a person) can rename or rewrite anything in `src/` as long
as the call sites below keep working and the two hook functions keep existing.

## The five calls

```js
A2A.ads.init({ game: 'vote', pause: adPause, resume: adResume, flags })
  // once, on load. pause() and resume() are game functions (see "Hooks").
  // flags (optional) overrides keys of window.A2A_ADS for this page.

A2A.ads.preroll(startTitle)
  // once, before the title screen. Calls startTitle either way, then tells
  // Playgama the game is ready. The game shows the frame text around it.

A2A.ads.break('court_end' | 'pause', resume)
  // full-screen break at a natural stop. resume() runs either way.
  // court_end: when the player leaves a finished match (win or loss).
  // pause: when the player opens the pause menu themselves (not on blur).
  // Never mid-shot and never right after a letter is taken.

A2A.ads.reward('redo_shot' | 'unlock_court', onGranted, onDismissed)
  // player-initiated only, from a button that says an ad is coming and what
  // it gives. Exactly one of the callbacks runs. redo_shot is offered once
  // per match, unlock_court only when the next court is one win away.

A2A.ads.surface('led' | 'jumbotron' | 'center_court')
  // returns { kind: 'image' | 'video' | 'none', src, href, label, sponsor }
  // for a commercial surface the court scene already draws. VOTE's courts
  // are static backgrounds today, so there are no surface() call sites yet.
```

Every call is safe to make when ads are dark: it resolves at once and the game
continues. Calls never throw into game code.

## Hooks the game must keep exporting

`src/main.js` defines `adPause()` and `adResume()` and passes them to `init`.
The module calls them around every full-screen ad and when the Playgama
platform pauses the game (tab switch, platform overlay).

- `adPause()` must freeze the simulation and input and silence all sound
  (music and the WebAudio context). It can be called when no match is running.
- `adResume()` must undo exactly that and restore the sound state the player
  had before (muted stays muted). Sound starts muted in VOTE and the module
  never unmutes anything.

Both must be idempotent. Keep their names or update the `init` call.

## Flags: `window.A2A_ADS`

Set in `index.html` before `ads/a2a-ads.js` loads.

| key | default | meaning |
|---|---|---|
| `enabled` | `false` | Real ads may run. On a real Playgama platform they go through Bridge; anywhere else the AdSense H5 tag (`ca-pub-4762698707947194`, `data-ad-frequency-hint="180s"`) is loaded into the page and `adBreak()` is used. |
| `stub` | `true` | When no real ad ran (dark, blocked by an ad blocker, no fill, local), calls resolve instantly and rewards are granted so the game is fully playable offline and in tests. `stub:false` denies a reward that no ad paid for. |
| `client` | the publisher id | AdSense client. |
| `frequencyHint` | `'180s'` | Minimum gap between breaks, for Google and Bridge alike. |
| `sponsors` | `'ads/sponsors.json'` | Where the creatives live. |
| `bridge` | `true` | Load and initialise the Playgama Bridge SDK. `false` skips it (offline tests). |

Modes:

- Dark (today, in review): `{ enabled: false, stub: true }`. Nothing loads from Google.
- Production on politicalarcades.com: `{ enabled: true, stub: false }`.
- Playgama build: `{ enabled: true, stub: false }`. Bridge reports a real
  platform, so ads go through Bridge and the Google tag is never loaded.

## Events out

The module dispatches `a2a:ad` CustomEvents on `window` with
`detail = { type, surface, outcome }`:

- `type`: `init`, `preroll`, `break`, `reward`, `surface`
- `surface`: the kind or surface name (`court_end`, `pause`, `redo_shot`,
  `unlock_court`, `led`, ...) or the subsystem for `init` (`bridge`, `google`, `sponsors`)
- `outcome`: `stub`, `viewed`, `dismissed`, `unfilled`, `blocked`, `timeout`,
  `busy`, `error`, a Google `breakStatus`, `granted`, `denied:<reason>`,
  `house`, `sponsor`, `none`, or for `init` the platform id / load result.

Analytics and the ledger's impression count subscribe to this event; nothing
else needs to.

## Adding a sponsor

Edit `horse/ads/sponsors.json`. One row per creative:

```json
{ "surface": "led", "kind": "image", "src": "assets/sponsors/union-local-3.webp",
  "href": "https://example.org", "label": "Local 3 backs the block",
  "sponsor": "Union Local 3", "start": "2026-11-01", "end": "2026-12-31" }
```

- `surface`: `led`, `jumbotron` or `center_court`.
- `kind`: `image` or `video`. `src` is relative to `horse/` and must live
  inside `horse/` so the Playgama build stays self-contained.
- `start` and `end` are optional ISO dates; outside them the row is skipped.
- `sponsor: "house"` marks our own creatives. Empty surfaces fall back to house rows, so never delete the last house row for a surface.
- No game code changes. Rows rotate every 20 seconds per surface.

Creatives go on commercial surfaces only: never on the candidates, never on
their jerseys, never on protest signs.

## Playgama Bridge

The module loads the Bridge SDK JS Core from
`https://bridge.playgama.com/v2/stable/playgama-bridge.js` (2.3.x) in every
mode (it is the platform SDK, not an ad creative; `bridge: false` in the flags
skips it). `horse/playgama-bridge-config.json` sits next to `index.html`. The
module initialises Bridge, subscribes to its pause and audio events, and sends
`in_game_loading_started`, `in_game_loading_stopped` and `game_ready`. Locally
Bridge runs its mock platform and the game plays exactly as before. On a real
platform `court_end` is a Bridge interstitial, rewards are Bridge rewarded ads
granted only on the `rewarded` state, and `pause` is skipped because Bridge
paces interstitials itself.

## The rule

No file other than `horse/ads/a2a-ads.js` may reference `adsbygoogle`,
`adBreak`, `adConfig`, `window.bridge` or any Playgama API. The only
exceptions are the `window.A2A_ADS` flags line in `index.html` and
`playgama-bridge-config.json`. If a change needs a new ad behaviour, add it to
the module and keep the five-call surface.

## Call sites in `src/main.js` (grep `CONTRACT.md`)

- `init` once at load, with `adPause` / `adResume`.
- `preroll` once when assets are ready, from the frame loop, with the frame text in the loading panel before and on the title screen after.
- `break('court_end', ...)` from `leaveCourt()`, used by RUN IT BACK, CHOOSE COURT and Enter on the result screen.
- `break('pause', ...)` from `userPause()`, used by the Pause button and Esc.
- `reward('redo_shot', ...)` from the redo panel after a copy miss that would take a letter.
- `reward('unlock_court', ...)` from the court-select unlock button.
