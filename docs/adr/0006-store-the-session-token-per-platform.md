# Store the session token per platform

One session-store module, two implementations selected by platform extension. On native it wraps `expo-secure-store`, which keeps the token in the iOS Keychain or in Android's Keystore-encrypted `SharedPreferences`. On web it wraps `localStorage`. Callers import one module and never branch on platform.

This is forced by ADR-0004: `expo-secure-store` supports Android, iOS and tvOS only, and `isAvailableAsync()` resolves `true` on Android and iOS alone. Web has no equivalent, so the choice is not *which* secure store but what to accept in its absence.

## Considered options

- **In-memory only on web** — the token never reaches disk in the browser, so there is nothing in storage for an XSS to exfiltrate. Rejected because the session would not survive a refresh, a new tab, or a restored browser session. For a campus app people open between lectures, that is a login every time.
- **An httpOnly cookie issued by the its-tps API** — the only option that is genuinely secure on web, since JavaScript cannot read the token at all. Rejected because `CONTEXT.md` records the its-tps API as fixed and the source of truth; adding a cookie-session mode and the matching CORS credentials config is not this repo's to make. Worth reopening if the API ever gains one.

## Consequences

**Web security is weaker than native, and this ADR says so rather than implying parity.** Any cross-site scripting flaw in the web build can read the session token out of `localStorage`. Native keeps hardware-backed storage. Nothing beyond the session token goes through this module — it is not a general-purpose store, and adding a second secret to it is a decision to revisit, not a detail.

`expo-secure-store` must be reinstalled and added to `app.json`'s plugin list. For App Store submission, set `ios.config.usesNonExemptEncryption` to `false`; the Legacy App carried the equivalent as `ITSAppUsesNonExemptEncryption` in its `infoPlist`.

`SecureStore` values persist across uninstall on iOS but not on Android. Sign-out must delete the token explicitly rather than relying on the app being removed.

This unblocks the auth work in #170 — session, route guards and the `isLoggedIn = false` currently hardcoded in `src/app/_layout.tsx` — but does not decide where session *state* lives at runtime. Whether that is React Query, context, or a store remains open, and is tangled with whether `zustand` returns at all.
