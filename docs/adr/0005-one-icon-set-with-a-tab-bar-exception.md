# One icon set, with a tab bar exception

Icons come from `@react-native-vector-icons/material-design-icons` everywhere — inside screens and in the web tab bar — with one icon name per site, rendering on all three platforms. The single exception is the five native tab triggers, which keep their `sf` prop alongside `src`, because `NativeTabs.Trigger.Icon` performs the platform switch itself and SF Symbols cost nothing there.

Native icons on each platform means two icon sets by definition: SF Symbols exists only on Apple platforms, Material Symbols is Google's. There is no name that renders as a real SF Symbol on iOS and a real Material Symbol on Android. Choosing one set is choosing to spend that nativeness once, in the tab bar, rather than everywhere.

## Considered options

- **Per-platform icons app-wide, via `@expo/ui`'s universal `Icon`** — the most native option on iOS, and the direction `Icon.select({ ios, android })` is designed for. Rejected on two counts. `Icon` does not render on web: its own docs say so, and the package ships `index.tsx`, `index.ios.tsx` and `index.android.tsx` with no web file, so a web target would need a shim for the app's most-used primitive. And the Legacy App used 45 distinct icons, each of which would need an SF Symbol name *and* a Material Symbols name chosen by hand — several with no counterpart worth defending (`Nfc` for the **Card**, `Utensils` for the **Menu**, `Megaphone`, `LibraryBig`).
- **One SVG set — `lucide-react-native` with `react-native-svg`** — the Legacy App's approach. One name, identical rendering on all three platforms, colour straight from the tokens module, and the 45 existing icon names port over unchanged. Rejected because it re-adds two dependencies the rewrite dropped and is non-native on both iOS and Android, which is the opposite of ADR-0002's direction.

## Consequences

iOS screens show Material iconography beside SwiftUI controls rendered by `@expo/ui`. This is accepted deliberately: the tab bar is where Apple's conventions are strongest and most noticed, and it is the one place the native set survives.

`getImageSourceSync` requires a development build, so icons will not render in Expo Go. `@react-native-vector-icons/material-design-icons` is already a dependency and already registered as a config plugin in `app.json`.

Two fixes fall out of this in `application-tabs.native.tsx`. The calendar trigger uses `md="calendar_today"`, and the built-in `md` prop renders only outlined Material Symbols — so unlike the other four tabs it cannot do the outlined-to-filled swap on selection. It should move to `src` with `getImageSourceSync`, like its siblings. Separately, `getImageSourceSync(..., "black")` bakes the colour in at module load; this is Expo's own documented pattern and only affects Android, since `sf` takes precedence on iOS, but it needs checking against dark mode on an Android device.

Icon colour in screens comes from the tokens module of ADR-0003, not from per-call literals.
