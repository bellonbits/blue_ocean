import { useEffect, useState } from 'react';
import OnboardingFlow from './OnboardingFlow';
import { hasCompletedOnboarding, markOnboardingComplete, prepareNativeChrome, hideSplash, isNative } from '../lib/native';

// Gates first render behind the onboarding carousel on a fresh native
// install. The native splash screen (launchAutoHide: false in
// capacitor.config.json) stays up the whole time this component is
// deciding what to show, so there's never a flash of the bare app
// underneath the splash or the onboarding.
export default function NativeAppGate({ children }) {
  const [status, setStatus] = useState('checking'); // checking | onboarding | ready

  useEffect(() => {
    // Lets CSS (the mobile tab bar, chat widget offset, bottom page
    // padding) key off `.is-native-app` without prop-drilling native
    // status through every component that needs it.
    if (isNative()) document.documentElement.classList.add('is-native-app');

    let cancelled = false;
    (async () => {
      await prepareNativeChrome();
      const seen = await hasCompletedOnboarding();
      if (cancelled) return;
      setStatus(seen ? 'ready' : 'onboarding');
      await hideSplash();
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleComplete = async () => {
    await markOnboardingComplete();
    setStatus('ready');
  };

  if (status === 'checking') return null;
  if (status === 'onboarding') return <OnboardingFlow onComplete={handleComplete} />;
  return children;
}
