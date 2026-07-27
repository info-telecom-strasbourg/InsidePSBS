# Rewrite for feature parity, not visual fidelity

The Legacy App (tag `legacy-app`) styled its feature modules with NativeWind and leaned on a large set of UI libraries. The rewrite tracked by #170 rebuilds the interface native-first on `@expo/ui`, NativeTabs and SDK 57 primitives. Every capability the Legacy App had must exist in the new app; reproducing how it looked is explicitly not a goal.

## Considered options

- **Faithful port** — reproduce the Legacy App's look and behaviour, just on SDK 57 and Zod v4. Screens port fast because their markup survives, but it means restoring NativeWind and most of the dropped dependency set, contradicting the native direction the base branch has already taken with `@expo/ui` and NativeTabs.
- **Redesign with deliberate cuts** — treat parity as a non-goal and drop some Legacy App features on purpose. The smallest scope and the most honest about a student org's capacity, but #170 could then no longer claim to cover every aspect of the Legacy App, which is the point of it being the hub.

## Consequences

Sub-issues specify Legacy App *behaviour* to preserve, never screenshots to match; the Legacy App is consulted read-only via `git worktree add ../old-app legacy-app`. Dropping the old UI stack left eight capabilities with no replacement — rich text for **Post** bodies, **Media** picking and video playback, the **Calendar** UI, forms, secure token storage, virtualized lists, global state, and icons. Each needs its own decision before the screen depending on it is built, and each is a line in #170's inventory rather than something a screen issue improvises.
