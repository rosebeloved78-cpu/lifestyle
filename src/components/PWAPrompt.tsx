import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

type BeforeInstallPromptEvent = {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: Event;
  }
}

export function PWAPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as any as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Listen for installation
    const appInstalledHandler = () => {
      setIsInstalled(true);
      setShowPrompt(false);
    };

    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      setShowPrompt(false);
    } catch (error) {
      console.error('Installation failed:', error);
    }
  };

  if (!showPrompt || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-4 z-40 max-w-sm mx-auto">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Download className="text-rose-500" size={32} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 mb-1">Install Zimbabwe Hearts</h3>
          <p className="text-sm text-gray-600 mb-4">
            Add our app to your home screen for quick access and offline support.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="flex-1 px-4 py-2 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition text-sm"
            >
              Install
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
