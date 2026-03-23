import { useState, useEffect, useCallback } from 'react';

/**
 * The BeforeInstallPromptEvent interface.
 * This event is fired by Chromium-based browsers when the PWA install criteria are met.
 */
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

// Augment the global WindowEventMap so addEventListener/removeEventListener
// correctly type the `beforeinstallprompt` event.
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const onBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the default mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later via button click
      setPromptEvent(e);
    };

    const onAppInstalled = () => {
      setIsInstalled(true);
      setPromptEvent(null);
      console.log('🎉 CareerSoulmate was installed successfully!');
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!promptEvent) return;

    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;

    if (outcome === 'accepted') {
      console.log('✅ User accepted the install prompt');
      setIsInstalled(true);
    } else {
      console.log('❌ User dismissed the install prompt');
    }

    // The prompt can only be used once
    setPromptEvent(null);
  }, [promptEvent]);

  return {
    isInstallable: !!promptEvent && !isInstalled,
    isInstalled,
    promptInstall,
  };
}
