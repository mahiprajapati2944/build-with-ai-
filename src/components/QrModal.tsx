import React, { useState } from 'react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendeeUrl: string;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose, attendeeUrl }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://${attendeeUrl}`);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-xs shadow-2xl flex flex-col items-center text-center space-y-4 border border-[#eaedff] animate-in fade-in zoom-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-base sm:text-lg text-[#131b2e]">
            Attendee Kiosk QR
          </span>
          <button
            onClick={onClose}
            aria-label="Close QR Modal"
            className="w-7 h-7 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#444652] hover:text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* High contrast QR simulated SVG */}
        <div className="p-3 bg-white rounded-lg shadow-sm border border-[#eaedff]">
          <svg className="w-44 h-44 text-[#131b2e]" viewBox="0 0 100 100" fill="currentColor">
            <rect x="0" y="0" width="30" height="30" rx="3" fill="#283044" />
            <rect x="6" y="6" width="18" height="18" fill="#ffffff" />
            <rect x="10" y="10" width="10" height="10" fill="#283044" />

            <rect x="70" y="0" width="30" height="30" rx="3" fill="#283044" />
            <rect x="76" y="6" width="18" height="18" fill="#ffffff" />
            <rect x="80" y="10" width="10" height="10" fill="#283044" />

            <rect x="0" y="70" width="30" height="30" rx="3" fill="#283044" />
            <rect x="6" y="76" width="18" height="18" fill="#ffffff" />
            <rect x="10" y="80" width="10" height="10" fill="#283044" />

            {/* Pattern Dots */}
            <rect x="36" y="8" width="6" height="6" fill="#4a66c2" />
            <rect x="48" y="8" width="8" height="6" fill="#283044" />
            <rect x="38" y="24" width="8" height="8" fill="#283044" />
            <rect x="52" y="24" width="8" height="6" fill="#4a66c2" />

            <rect x="8" y="44" width="8" height="6" fill="#283044" />
            <rect x="24" y="48" width="6" height="12" fill="#283044" />

            {/* Center Logo Pulse Emblem */}
            <rect x="40" y="42" width="20" height="16" rx="2" fill="#283044" />
            <rect x="44" y="46" width="12" height="8" fill="#ebedff" />

            <rect x="68" y="44" width="8" height="8" fill="#4a66c2" />
            <rect x="84" y="42" width="10" height="12" fill="#283044" />

            <rect x="38" y="72" width="12" height="6" fill="#283044" />
            <rect x="56" y="78" width="8" height="14" fill="#283044" />
            <rect x="72" y="72" width="8" height="6" fill="#4a66c2" />
            <rect x="86" y="76" width="8" height="16" fill="#283044" />
          </svg>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-xs sm:text-sm text-[#131b2e]">
            Scan to Launch Mobile Studio
          </p>
          <p className="text-[11px] text-[#757683]">
            Badge ribbons, lanyard cards &amp; slide projection
          </p>
          <p className="font-mono text-[11px] text-[#2f4da8] bg-[#f2f3ff] py-1 px-2 rounded truncate max-w-[240px] mx-auto">
            {attendeeUrl}
          </p>
        </div>

        <div className="w-full space-y-2 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2 rounded-lg bg-[#2f4da8] text-white text-xs sm:text-sm font-medium hover:bg-[#4a66c2] transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'URL Copied!' : 'Copy Kiosk Link'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-xs sm:text-sm font-medium hover:bg-[#e2e7ff] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
