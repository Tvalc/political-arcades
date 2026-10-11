# Ads to Aid hero · usability and ad-funded-site audit · 2026-10-08

Three research passes (ad-funded game hubs; cause-funded sites with public money; published usability evidence) were run against the first Ads to Aid mockup. Each finding below names the change made to `mockups/adstoaid.html`.

## Changes made

| # | Finding (source) | Change |
|---|---|---|
| 1 | Auto-scrolling content is read as an ad and ignored; a ticker without a pause control fails WCAG 2.2.2 (NN/g "Auto-Forwarding Carousels"; WCAG F16) | Marquee ticker removed. The deal is stated once, as a static three-step equation. |
| 2 | A right rail of colorful cards sits in the banner-blindness zone and gets skipped (NN/g "Banner Blindness Revisited" 2018) | Rail of chibi cards replaced by two plain-text cards: a dated ledger statement and "Who makes this". Fight Night and Daily Court became tabs inside the cabinet. |
| 3 | Fabricated activity counters are a named dark pattern and an FTC exposure under the 2024 fake-reviews rule; no major game hub shows a "playing now" counter (Mathur et al.; FTC 16 CFR 465; Poki/CrazyGames/Coolmath teardown) | "312 playing now", "48,912 neighbors helped", streak and shot counts all removed. Only verifiable facts remain (2 games, 32 courts, 28 songs). |
| 4 | A "$0 raised" counter reads as unpopular, not neutral; at day zero the credible move is an exact, dated statement with the rule and the payment lag (NN/g "Social Proof"; Tab for a Cause Q3 2011 statement of $112.91; Ecosia's conservative-count rule) | Pot counter became "Statement #0 · Oct 8, 2026 · $0.00", with Google's payment lag, when the first statement posts, and that the number is always the conservative one. |
| 5 | Leaders put the game at the top and require gameplay within one click; conversion is measured as staying one minute (CrazyGames requirements; Poki best practices) | Cabinet moved up; sub paragraph moved below it; headline shrunk so Tap to Play is above the fold at 1280×800 and 390×844. |
| 6 | Specific mechanism beats a vague pledge; big money figures alone raise suspicion, so pair the number with the rule (Cryder & Loewenstein 2013; Fennell et al. 2020; NN/g donation usability: only 4% of charity sites say how money is used) | Equation chips carry the mechanism; "The rules" panel added: profit basis with every bill listed (Tony's correction 2026-10-08: the split is on profit after costs, not gross), counted when paid, split never changes quietly, programs not politicians, corrections log. |
| 7 | Quietly changing a split produced the most hostile coverage in the set (Humble Bundle 2021) | Rule added: any change to the split is posted first, with the date. |
| 8 | Credibility rises with a named real person, easy contact, recent-update stamp, and verifiable claims (Stanford Web Credibility; Baymard trust list) | "Who makes this" card, Write to us, Corrections link, and a "Last updated" stamp in the footer. |
| 9 | Sticky header plus sticky bottom bar on a phone costs viewport and can trip Google's intrusive-interstitial signal when content is pushed down (NN/g "Sticky Headers"; Google Search Central) | Bottom sticky Play bar removed. Top bar kept, compact, with a 44px Play button. |
| 10 | Touch targets 44×44 CSS px enhanced minimum (WCAG 2.5.5; Apple/Google) | Tabs 46px tall, chips 44px, topbar Play 44px. |
| 11 | Small text needs 4.5:1; the dim fine-print color measured 4.22:1 on panels and was set at 11px (WCAG 1.4.3; NN/g "Low-Contrast Text") | Fine print moved to the footer at 14px in the muted color (8.8:1). Mono micro-labels raised to 12–13px. |
| 12 | Animation should respect prefers-reduced-motion (web.dev) | Tap to Play pulse only runs under `prefers-reduced-motion: no-preference`. |
| 13 | LCP ≤2.5s on mobile; never lazy-load the LCP image; serve images at display size; preload WOFF2 (web.dev LCP and font guidance; Think with Google: 53% leave after 3s) | Cabinet screenshot gets `fetchpriority="high"` and dimensions. 40px tab thumbnails now load 160px files instead of 800px. Below-fold tiles lazy-load 600px files instead of 1600px. Bungee and body font preloaded. First viewport dropped from ~0.50 MB to ~0.37 MB. |
| 14 | AdSense game-page rules: content ad units ≥150px from the canvas, Play buttons not surrounded by ads, no ads over the game interface; H5 Games Ads forbid interstitials during continuous play (AdSense policy 2768340; H5 policy 11975916) | One labeled display slot placed 150px below the cabinet on phones, never beside the canvas. In-game breaks will use the Ad Placement API at match end and court end only, rewarded ads opt-in only. |
| 15 | Text over imagery needs a floor fade (NN/g "Text Over Images") | Tiles got a bottom gradient under their labels. |

## Kept on purpose

- Dark neon look. NN/g prefers light mode for general audiences, but the brand is an arcade and the games are dark; contrast was fixed instead.
- Tony's headline. The key noun is not in the first two words (NN/g "First 2 Words"), but the line is the mandated message and the equation beneath it carries the literal value proposition within the 5-second window.
- All-caps display type for short lines only; body copy is sentence case.

## Still to build (not mockup work)

- Real "Daily court" and "Fight night" rotation, deterministic by date, so the tabs are truthful on day one.
- Per-player progress saved silently in localStorage before any account ask (CrazyGames complaint pattern: lost progress).
- Ledger JSON updated when Google pays; statement number increments; corrections log page.
- Ratings or play counts as social proof once real data exists (the pattern every hub uses instead of live counters).
