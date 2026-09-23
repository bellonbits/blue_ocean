// Thin wrapper around the Capacitor runtime. Every function here is safe to
// call on the web build too — Capacitor's web implementations no-op or fall
// back to localStorage, so this file never needs an `isNativePlatform` guard
// at the call site.

import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Preferences } from '@capacitor/preferences';

const ONBOARDING_KEY = 'blue_ocean_onboarding_complete';

export const isNative = () => Capacitor.isNativePlatform();

export async function hasCompletedOnboarding() {
  if (!isNative()) return true;
  const { value } = await Preferences.get({ key: ONBOARDING_KEY });
  return value === 'true';
}

export async function markOnboardingComplete() {
  await Preferences.set({ key: ONBOARDING_KEY, value: 'true' });
}

export async function prepareNativeChrome() {
  if (!isNative()) return;
  try {
    await StatusBar.setOverlaysWebView({ overlay: false });
  } catch {
    // StatusBar plugin can be unavailable on some devices — non-fatal.
  }
}

// Keeps the status bar's icon/text color and background in sync with the
// app's own light/dark theme toggle — previously it was set once at launch
// to Style.Dark and never touched again, so switching to the light theme
// left barely-legible status bar icons.
//
// Capacitor's Style names describe the ICON color, not the app theme:
// Style.Dark = dark icons (for a light background), Style.Light = light
// icons (for a dark background) — the inverse of what you'd guess.
//
// Neither call does anything on iOS unless Info.plist's
// UIViewControllerBasedStatusBarAppearance is set to false (ios/App/App/
// Info.plist) — with it true (Capacitor's template default), iOS ignores
// the whole StatusBar plugin API silently, no error, nothing visibly
// changes. Verified working on both platforms via a real simulator run
// once that key was flipped.
export async function syncStatusBarWithTheme(isDark) {
  if (!isNative()) return;
  try {
    await StatusBar.setStyle({ style: isDark ? Style.Light : Style.Dark });
    await StatusBar.setBackgroundColor({ color: isDark ? '#06141C' : '#F5FAFC' });
  } catch {
    // StatusBar plugin can be unavailable on some devices — non-fatal.
  }
}

export async function hideSplash() {
  if (!isNative()) return;
  try {
    await SplashScreen.hide();
  } catch {
    // no-op
  }
}
