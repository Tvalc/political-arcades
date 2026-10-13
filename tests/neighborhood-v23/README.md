# Living neighborhood, first playable release

Run `node --test tests/neighborhood-v23/engine.test.mjs` from the repository root.
Serve the repository and open `/tests/neighborhood-v23/` for a disposable sandbox. It uses an in-memory city and has no cloud-save connection. `/city/` exercises real browser saving.

## Play loop

- Each block has two crews and at least eight persistent households. Starting a project recruits an available matching leader; the player can change assignments and put both crews on one project.
- Three programs compete for crew time: supper, an after-school club, and a league. A first project takes 90 crew-seconds. Later chapters take 30 minutes, two hours, and four hours before bonuses. The first chapter is free; later chapters spend community effort.
- Homes produce effort, gardens learning kits, courts team practices, clinics care packs, kitchens meals, and plazas volunteer contacts. Production runs every 15 minutes. The matching project supply, care and contacts can each boost a crew for the next shift. Storage caps at 99 per type.
- Matching ambitions and venues improve work speed. Leaders gain an experience bonus after 30 minutes of actual work. Completed projects fulfill the assigned leaders' matching ambitions and offer two story choices with different supply rewards.
- Arcade deliveries accelerate one selected project, while the actual supplies remain available for building. Matching resources give 30 seconds per unit; other games give 15 seconds. Delivery preparation is capped at 75% of the project's work. Crews finish it.
- Every block advances by elapsed time, with an eight-hour away cap. Completed projects wait for a decision instead of auto-repeating. Buildings and saves do not decay.

## Compatibility and scope

Existing buildings, stockpiles, animations, opening-day sequences and saved identities remain. The additional state lives inside the existing life save and travels in file/cloud backup packets. Web Locks give one current city tab ownership of the simulation. Existing arcade reward event IDs and fractional VOTE rewards are unchanged.

This is an initial management loop, not a complete commercial simulation. Timings need playtesting. Stories currently have three scenarios and six immediate outcomes; later chapters reuse those scenarios. The simulation uses the device clock and is not appropriate for competitive leaderboards. There is no new art download requirement.

## Verification

Twelve engine tests cover migration, persistent identity, assignment limits, completion/choice rewards, insufficient effort, away caps, repeated timestamps, clock rollback, six building roles, fractional and duplicate deliveries, unviewed blocks, backup round trips, malformed restored stores, and foreground/away equivalence across experience boundaries.

Browser checks: starter supplies and home construction, project creation, automatic and manual crew assignment, completion and story choice, paid next chapter, reload persistence, leaving the document and returning, duplicate-tab lock and handoff, desktop layout, 390px phone layout, and no horizontal overflow from new controls.

The existing `tests/city-launch/state.test.mjs` reaches its stale homepage assertions after the city-state checks. It currently tries to parse the homepage JSON-LD as JavaScript and fails. That unrelated test was left unchanged.

Consent-controlled PostHog events: `city_project_started`, `city_project_completed`, `city_crew_assigned`, `city_story_chosen`, `city_delivery_selected`, and `city_meaningful_return`. No resident or city names are sent.
