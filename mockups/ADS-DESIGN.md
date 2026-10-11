# Ads to Aid · in-game ad design · draft 1 · 2026-10-09

Working doc for the ad system inside Capitol Crashers and VOTE. Written so another editor (GPT, Cursor, a person) can keep changing game code without breaking ads. Moves into each game repo with the integration PR as `ads/CONTRACT.md`.

## 1. Three kinds of ad, three sets of rules

| Kind | Who serves it | Where it can appear | Who decides the creative |
|---|---|---|---|
| **Google (AdSense + H5 Games Ads)** | Google, via `adBreak()` and display units | Full-screen overlays at natural stops; DOM display units ≥150px from the canvas; anchor at screen bottom; vignettes between pages | Google. Cannot be drawn into the canvas, framed as game art, or placed over controls |
| **Intrinsic in-game network** | Anzu through Playgama's Bridge SDK (JavaScript supported since Nov 2025, beta, apply through Playgama support); Frameplay claims engine-agnostic but no web specifics published | Textures inside the world: billboards, plane banners, courtside boards, jumbotrons; image and video (IAB intrinsic formats) | The network, within our surface rules; likely needs traffic before approval |
| **Direct-sold and house** | Us, from `ads/sponsors.json` | Any surface we define | Us. Unions, co-ops, local businesses, the aid recipients themselves (free), and house ads for Patreon, Dispatch, songs, comic, "Statement #N is up" |

Google rule that shapes everything: ads must look like ads. The plane cannot carry a Google creative. It can carry a sponsor or network creative, or it can be the character that *announces* a Google ad break.

## 2. Preroll

- One per page load, via `adBreak({type:'preroll'})`, before the title screen. Google renders it. Skippable video (TrueView) skips after 5 s; bumpers are 6 s unskippable; display interstitials have a close. We cannot set the skip time ourselves, but we can request video and keep the break short.
- Our frame around it, shown in the game's own UI before `adBreak` fires and again on `adBreakDone`: factual, never an ask. Allowed: "Ads pay for this arcade. Half the profit goes to community programs. Statement #0: $0.00." Not allowed by AdSense policy: "support us", "watch the ad", "help the cause", or any wording that asks for a view or click. The only place "watch an ad to…" is legal is a rewarded ad the player chose.
- Sound: mute and pause the game in `beforeAd`, restore in `afterAd`. Sound starts muted anyway.

## 3. Breaks during play (Google)

- `adBreak({type:'next'})` at match end in Crashers and court end in VOTE, paced by `data-ad-frequency-hint="180s"`. Never mid-wave, never mid-shot, never after a letter is taken (that is a loss moment, not a transition).
- `adBreak({type:'pause'})` when the player opens the pause menu, display beside the canvas in the DOM, 150px clear.
- Rewarded, player-initiated only: revive once per session (Crashers), redo the shot once per match (VOTE), unlock the next court a win early, unlock a challenge song. Rewards diminish (100 / 50 / 25). A rewarded button that does nothing is a policy violation, so the stub must grant the reward in test mode.

## 4. In-world surfaces (sponsor, network, house)

Keep ads on commercial surfaces only. Never on the candidates, never on protest signs, never on the witness or the neighbors. Those are the people; the ads are the city around them.

**Capitol Crashers**
- Plane banner tow: a plane crosses the top of the street between waves, slows at center, holds the banner for about 6 s (long enough for a 6-s video), then exits. Banner ratio 5:1. Sponsor or network creative. Also the "ad break" announcer: the plane holds a "Round paid for by the ads" banner while the Google overlay plays, then exits with "Back to the block".
- Street billboards and storefront signs: static image slots on the parallax layer; three per street.
- Bus side panels: a bus passes behind the fight every ~90 s; 4:1 panel.
- Cable studio stage: the on-set screen behind the host shows video; a lower-third chyron "Brought to you by" during the boss intro. The most natural video surface in the game.
- Capitol approach: no commercial surfaces. Keep it clean; it is the finale.
- Round scoreboard: a sponsor card beside the score, before the Google `next` break fires.

**VOTE**
- Courtside LED boards: rotating creatives, image or video, between shots.
- Jumbotron: video between shots and at court end.
- Center-court logo: "This court sponsored by…" per court; the aid recipients get courts free.
- Court unlock screen: sponsor card plus the rewarded "unlock early" button.
- Jerseys: no. Logos on the candidates read as endorsement.

**Both**
- Pause menu "Sponsors" list: the only place in-world creatives are clickable, so taps during play never leave the game.
- Empty slots show house ads from day one, so the surfaces are never blank and the sales deck has live examples.

## 5. Integration contract (so other editors can keep working)

One module, `ads/a2a-ads.js`, owns every ad call. Game code makes five calls and never touches `adsbygoogle` or any network SDK directly.

```js
A2A.ads.init({ game: 'crashers', flags })          // once, on load; reads window.A2A_ADS (enabled, stub, networks)
A2A.ads.preroll(startGame)                           // before the title screen; calls startGame either way
A2A.ads.break('match_end' | 'court_end' | 'pause', resume)
A2A.ads.reward('revive' | 'redo_shot' | 'unlock_court' | 'unlock_song', onGranted, onDismissed)
A2A.ads.surface('plane' | 'billboard_1' | 'bus' | 'studio_screen' | 'led' | 'jumbotron' | 'center_court')
  // returns { kind: 'image' | 'video' | 'none', src, label } from sponsors.json or the network; game draws it
```

- `beforeAd` and `afterAd` are inside the module and call two game-provided functions passed at init: `pause()` and `resume()`. GPT can rename anything inside the game as long as those two still exist.
- `window.A2A_ADS = { enabled: false, stub: true }` until AdSense says Ready. In stub mode every call resolves instantly, rewards are granted, and surfaces return house creatives, so the game is fully playable offline and in tests.
- `ads/sponsors.json`: `{ surface, kind, src, href, label, sponsor, start, end }` rows. Adding a sponsor is a JSON edit, no game code.
- Events out: the module emits `a2a:ad` events (`{type, surface, outcome}`) for Google Analytics and for the ledger's impression count.
- Shipped as its own small PR per game repo, touching the module, the manifest, the CONTRACT file, and the five call sites. No combat, sprite, or balance changes.

## 6. Decisions (2026-10-09)

- No direct-sold sponsorships until the site shows traction. House ads fill empty surfaces meanwhile.
- Off-limits surfaces confirmed: the candidates, protest signs, the witness and neighbors, the Capitol finale.
- The plane and every in-world surface serve Playgama/Anzu intrinsic ads only. No Google "announcer" plane.

## 7. Playgama / Anzu application (the "intrinsic ads without distribution" path)

1. Tony creates the account at https://developer.playgama.com/ (email magic link, or Continue with Google). Use the politicalarcades@gmail.com address or tony@makko.ai; whichever will own payouts.
2. Open https://developer.playgama.com/support, question type "Intrinsic ads monetization (beta)", and paste:

> We run two live HTML5 games we host ourselves and want to add Anzu intrinsic ads without distributing through Playgama.
> Games: https://capitolcrashers.com/play/ (belt-scrolling brawler, canvas, keyboard + touch) and https://politicalarcades.com/horse/ (shot-matching basketball, canvas, touch).
> Planned placements, all on in-world commercial surfaces, never on characters:
> Capitol Crashers: a banner-tow plane that crosses the top of the street between waves and holds center for ~6 s (5:1, image or video); three street billboards per stage on the parallax layer (static); a bus side panel (4:1) passing behind the fight; the on-set screen in the cable-studio stage (16:9 video) with a lower-third chyron.
> VOTE: courtside LED boards rotating between shots (image or video); a jumbotron above the court (16:9 video between shots and at court end); center-court floor logo per court.
> Engine: plain JavaScript canvas, no framework. We will integrate Bridge SDK JS Core plus the Anzu package. Please send game IDs and the JavaScript intrinsic-ads guide (only the Unity page is public).

3. Wait for game IDs and the JS guide, then the integration PR adds Bridge SDK JS Core + Anzu package behind `A2A.ads.surface()`; game code does not change beyond the surface calls already in the contract.
4. Update the live games. Monetization starts once their review passes; expect a traffic threshold before real fill, house ads until then.


1. Direct-sold sponsorships: yes, and who sells? Even a page "Sponsor a court" with a form is enough to start.
2. Apply to Playgama/Anzu intrinsic beta now, or wait for traffic?
3. Confirm the off-limits surfaces: candidates, protest signs, witness and neighbors, the Capitol finale.
4. Plane as the Google ad-break announcer: keep, or only use the plane for sponsor creatives?
