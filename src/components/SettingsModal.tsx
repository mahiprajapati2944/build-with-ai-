import React, { useState } from 'react';
import { EventProfile } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: EventProfile;
  onUpdateUser: (updated: Partial<EventProfile>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [headline, setHeadline] = useState(user.headline);
  const [company, setCompany] = useState(user.company);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateUser({
      name,
      headline,
      company,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-md shadow-2xl flex flex-col space-y-4 border border-[#eaedff] animate-in fade-in zoom-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2f4da8] text-[22px]">manage_accounts</span>
            <h3 className="font-semibold text-lg text-[#131b2e]">Attendee Profile Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#444652] hover:text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#444652]">
          This metadata is used to simulate authentic LinkedIn feed card previews.
        </p>

        <div className="flex items-center gap-3 p-3 bg-[#f2f3ff] rounded-lg">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border border-slate-300"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#131b2e]">{name}</p>
            <p className="text-xs text-[#444652] truncate">{headline}</p>
            <span className="inline-block mt-1 text-[10px] text-emerald-700 bg-[#6ffbbe]/50 px-2 py-0.5 rounded font-medium">
              Verified Attendee
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#131b2e]">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f2f3ff] rounded-lg px-3 py-2 text-sm text-[#131b2e] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4a66c2]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#131b2e]">Professional Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full bg-[#f2f3ff] rounded-lg px-3 py-2 text-sm text-[#131b2e] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4a66c2]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#131b2e]">Company / Affiliation</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-[#f2f3ff] rounded-lg px-3 py-2 text-sm text-[#131b2e] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#4a66c2]"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-[#eaedff]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-[#444652] hover:bg-[#f2f3ff]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-[#2f4da8] hover:bg-[#4a66c2] text-white transition-colors"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
