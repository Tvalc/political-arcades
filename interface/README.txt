Political Arcades interface

React islands using upstream shadcn/ui new-york-v4 components (MIT; see SHADCN-LICENSE.md), Radix, Tailwind 4, and Vite. Registry sources: https://ui.shadcn.com/r/styles/new-york-v4/{button,sheet,slider,tabs,badge,input}.json. Components are owned source; Slider additionally labels its interactive thumb.

Build: npm ci --prefix interface && npm run build --prefix interface
Generated JS/CSS under shared/interface are committed because the current site serves static files. CI verifies the generated bundle stays in sync. No server framework or game-engine migration.

Home and Watch pages mount only where existing HTML/data is present. The original links and native audio remain available if JavaScript fails. Film and track data live in the page's application/json tags. Media sources, detail URLs, credits and analytics consent are unchanged. Do not invent clips or expose unavailable assets in the catalogue.

Theme is in src/style.css. Tailwind preflight is intentionally omitted so it does not reset existing game/site styles. Modal portals have their own pa-ui scope. Mobile and desktop navigation expose the same destinations. Audio never starts on page load. Starting another audible media element pauses the previous one.

Manual QA: desktop and 390px mobile; search, filter, empty state, drawer Escape/focus restoration, queue track selection, playback, seek, volume, and no automatic audio. The sparse checkout omits production media and game directories, so local publication-integrity checks report those missing files; the existing full-checkout CI remains authoritative for all site routes.
