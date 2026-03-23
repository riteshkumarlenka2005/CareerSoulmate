import React, { useState } from 'react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

interface InstallAppButtonProps {
  className?: string;
  alwaysShow?: boolean;
}

const InstallAppButton: React.FC<InstallAppButtonProps> = ({ className = '', alwaysShow = false }) => {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = async () => {
    if (isInstallable) {
      await promptInstall();
      // Brief success flash if install was accepted
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      // Fallback: If prompt is not available but button is clicked, tell them how
      alert('To install the app, tap the Share icon (iOS) or Menu (Android) and select "Add to Home Screen".');
    }
  };

  // Skip the hide logic if alwaysShow is true
  if (!alwaysShow && !isInstallable && !showSuccess) return null;

  // Briefly show a success badge after install
  if (isInstalled || showSuccess) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest ${className}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        Installed!
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2
        px-4 py-2
        bg-gradient-to-r from-blue-600 to-cyan-600
        hover:from-blue-500 hover:to-cyan-500
        text-white text-xs font-bold uppercase tracking-widest
        rounded-lg
        shadow-lg shadow-blue-500/25
        transition-all duration-200
        hover:shadow-xl hover:shadow-blue-500/30
        hover:scale-[1.03]
        active:scale-95
        ${className}
      `}
    >
      {/* Download / Install icon */}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
      </svg>
      Install App
    </button>
  );
};

export default InstallAppButton;
