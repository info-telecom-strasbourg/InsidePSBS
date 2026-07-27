# Style with StyleSheet and a shared tokens module

`@expo/ui` renders real SwiftUI and Jetpack Compose, and its components take native modifiers rather than a `className` prop. Everything outside an `@expo/ui` tree is styled with `StyleSheet.create`, reading colours, spacing and type from one shared tokens module. The app carries no CSS-in-React-Native framework, even though the Legacy App was built entirely on NativeWind.

## Considered options

- **NativeWind v5 / react-native-css** — the Legacy App's authoring style, already in the team's muscle memory, and by far the fastest way to port existing class strings. Rejected because it cannot style `@expo/ui` trees: the app would run two styling systems side by side and every new component would start with a choice about which world it belongs to.
- **Bare `StyleSheet`, no tokens** — nothing to install or decide, theming through `useColorScheme` as the scaffold already does. Rejected because colours and spacing then get copy-pasted across 40-odd screens with no single place to change them.

## Consequences

Porting a Legacy App screen means rewriting its class strings rather than copying them, so each screen costs more than a faithful port would. The tokens module is a foundation, not a screen's incidental output: it lands on the rewrite's base branch before any screen issue starts. Dark mode is expressed once in the tokens rather than as per-screen conditionals.
