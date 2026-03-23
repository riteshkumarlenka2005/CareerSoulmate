import React, { useState } from 'react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

interface InstallAppButtonProps {
  className?: string;
  alwaysShow?: boolean;
}

const InstallAppButton: React.FC<InstallAppButtonProps> = ({ className = '', alwaysShow = false }) => {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [showSuccess, setShowSuccess] = useState(false);

  const [showFallbackModal, setShowFallbackModal] = useState(false);

  const handleClick = async () => {
    if (isInstallable) {
      await promptInstall();
      // Brief success flash if install was accepted
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      // Fallback: If prompt is not available but button is clicked, show custom modal
      setShowFallbackModal(true);
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
    <>
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

      {/* Custom Fallback Modal */}
      {showFallbackModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowFallbackModal(false)}>
          <div 
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 mx-auto border border-blue-500/20">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-white text-center mb-2">
              Install CareerSoulmate
            </h3>
            
            <p className="text-sm text-gray-300 text-center mb-6 leading-relaxed">
              To install this app on your device, tap the <strong className="text-white">Share</strong> icon (iOS) or <strong className="text-white">Menu</strong> icon (Android) in your browser and select <strong className="text-blue-400">"Add to Home Screen"</strong>.
            </p>
            
            <button
              onClick={() => setShowFallbackModal(false)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white uppercase tracking-widest transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallAppButton;
