# Rename API terms at the boundary

The its-tps API is fixed and names some fields by literal translation from French — `sector` for a student's specialisation, `admission_year` for the year they started. We call these **Track** and **Intake Year** in the app, and the rename happens in the Zod schemas at the API boundary, which parse the raw payload and transform it to app-named types. Past that layer the API's words do not exist: `user.track` is the only spelling, and `user.sector` will not compile.

## Considered options

- **Rename in the UI layer only** — data keeps API names throughout, and only labels say "Track". Cheaper, and debugging matches the network tab exactly, but both words then circulate in the codebase and `CONTEXT.md` is false of most of it.
- **Don't rename in code at all** — treat Track and Intake Year as user-facing copy in translation strings. Honest and simple, but the glossary would describe the UI rather than the model.

## Consequences

A developer reading a network response sees `sector` where the code says `track`; `CONTEXT.md` records the mapping on the affected terms under `_API_:`. Every schema covering a renamed field needs a transform, so the renames must stay few — this is not licence to re-spell the whole API.
