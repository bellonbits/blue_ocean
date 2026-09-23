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
// to Style.Dark (light icons) and never touched again, so switching to the
// light theme left light-on-light, barely legible status bar icons.
// setBackgroundColor is a no-op on iOS (Capacitor only supports it on
// Android); iOS instead takes its status bar color from the page background
// showing through, which is why overlaysWebView stays false above.
export async function syncStatusBarWithTheme(isDark) {
  if (!isNative()) return;
  try {
    await StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light });
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
