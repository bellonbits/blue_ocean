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
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setOverlaysWebView({ overlay: false });
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
