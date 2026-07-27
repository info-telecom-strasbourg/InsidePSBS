# Support web as a target

The rewrite ships iOS, Android **and** web. `app.json` already sets `web.output: "static"`, and that is a supported target rather than leftover scaffolding: the app should be reachable from a browser, not only from a store install. The native-first direction of ADR-0002 is unchanged — screens are still built on `@expo/ui` and native primitives — but every screen must also render on web, and the parts of the SDK that are native-only now need a deliberate web answer instead of an omission.

## Considered options

- **Native only** — drop `react-dom` and `react-native-web`, delete `web.output` and the web tab layout. Much the cheapest option, and it removes three constraints at once: all three `@expo/ui` namespaces become available, `expo-secure-store` covers token storage with no per-platform split, and no screen carries a responsive-layout obligation. Rejected because it puts the app behind a store install for a community that is largely on laptops during the day.
- **Take the `NativeTabs` web fallback** — Expo renders native tabs on web as "a basic implementation, loosely based on iPad design". Nothing to write, and web keeps working as tabs are added. Rejected because a bottom tab bar is the wrong shape in a desktop browser, and the fallback's appearance is neither documented nor ours to control.

## Consequences

Only the **universal** `@expo/ui` namespace is available to shared code — `@expo/ui/swift-ui` and `@expo/ui/jetpack-compose` do not run on web, which amends ADR-0003. Reaching for either means writing a `.web.tsx` alongside it.

Native-only modules need a per-platform answer rather than a reinstall. `expo-secure-store` is Android and iOS only, which is what ADR-0006 resolves. `@expo/ui`'s universal `Icon` does not render on web, which is what ADR-0005 resolves. `expo-glass-effect`, already a dependency, is iOS and tvOS only.

The tab trigger list now exists twice — `application-tabs.native.tsx` for native, `application-tabs.tsx` for web using the headless `Tabs`, `TabSlot`, `TabList` and `TabTrigger` from `expo-router/ui`. The two must stay in sync as tabs are added; there is no shared source for them. This split is Expo's own recommended structure for this case, so the duplication is expected rather than a smell.

Every screen issue under #170 carries a web layout obligation. Feature parity now means parity on three platforms, and a screen is not done when it only works on a phone.
