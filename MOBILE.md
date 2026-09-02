# Blue Ocean — Mobile (iOS & Android)

The site is wrapped for native iOS and Android with [Capacitor](https://capacitorjs.com).
Same React app, same backend — the native shell adds a splash screen, a first-launch
onboarding flow, and native chrome (status bar, safe areas).

- **App ID:** `so.blueocean.app`
- **App name:** Blue Ocean

## Everyday workflow

```bash
npm run cap:ios      # build web app, sync, open Xcode
npm run cap:android  # build web app, sync, open Android Studio
```

Whenever `src/` changes, re-sync before testing natively:

```bash
npm run cap:sync
```

## First-time setup

- **iOS:** Xcode with a simulator, that's it — Capacitor 8 uses Swift Package Manager,
  no CocoaPods/Podfile involved.
- **Android:** Android SDK + a JDK the bundled Gradle wrapper supports (17 or 21 — not 25).
  `android/local.properties` (gitignored) must point `sdk.dir` at your SDK. If building from
  the command line rather than Android Studio, set `JAVA_HOME` to a compatible JDK first:
  ```bash
  export JAVA_HOME="$(/usr/libexec/java_home -v 21)"
  cd android && ./gradlew assembleDebug
  ```
  Android Studio manages its own bundled JDK and doesn't need this.

## Onboarding

`src/onboarding/` — a 5-slide swipeable carousel (`OnboardingFlow.jsx`) shown once on first
launch, gated by `NativeAppGate.jsx` in `App.jsx`. Completion is persisted via
`@capacitor/preferences` (`src/lib/native.js`), so it only ever shows once per install.
Edit the slides in `onboardingSlides.js`.

It only runs on native (`Capacitor.isNativePlatform()`) — the marketing site itself never
shows it.

## Icon & splash

Source art lives in `resources/` (`icon.png` 1024×1024, `splash.png` 2732×2732 — the wave
mark on the site's ocean gradient, matching `public/favicon.svg`). Regenerate every
platform size from those two files with:

```bash
npm run cap:assets
```

This overwrites the generated icon/splash assets under `ios/` and `android/` — safe to
re-run any time the source art changes.

## Verified

Both platforms build clean (`xcodebuild` for iOS Simulator, `./gradlew assembleDebug` for
Android) and the full flow — native splash → onboarding → real app, plus the
"already onboarded" path skipping straight to the app — was confirmed in the iOS Simulator.
