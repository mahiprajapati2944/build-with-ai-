import React from 'react';
import { ASSETS } from '../data/mockData';
import { EventProfile } from '../types';

interface HeaderProps {
  currentView: 'attendee' | 'organizer';
  onViewChange: (view: 'attendee' | 'organizer') => void;
  user: EventProfile;
  onOpenSettings: () => void;
  activeNavTab: 'create' | 'templates' | 'analytics' | 'account';
  onNavTabChange: (tab: 'create' | 'templates' | 'analytics' | 'account') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  user,
  onOpenSettings,
  activeNavTab,
  onNavTabChange,
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-surface/95 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar row */}
        <div className="h-16 flex items-center justify-between">
          {/* Logo & Brand Zone */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img
                src={ASSETS.logo}
                alt="EventPulse Logo"
                className="h-7 sm:h-8 w-auto object-contain"
                onError={(e) => {
                  // Fallback logo if blocked
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-lg sm:text-xl tracking-tight text-[#131b2e] leading-none">
                    Event<span className="text-[#2f4da8]">Pulse</span>
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-[#444652] leading-tight">
                  Generator Workbench
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavTabChange('create')}
              className={`text-sm font-medium transition-colors ${
                activeNavTab === 'create'
                  ? 'text-[#2f4da8] border-b-2 border-[#2f4da8] pb-1'
                  : 'text-[#444652] hover:text-[#131b2e]'
              }`}
            >
              Workbench
            </button>
            <button
              onClick={() => onNavTabChange('templates')}
              className={`text-sm font-medium transition-colors ${
                activeNavTab === 'templates'
                  ? 'text-[#2f4da8] border-b-2 border-[#2f4da8] pb-1'
                  : 'text-[#444652] hover:text-[#131b2e]'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => onNavTabChange('analytics')}
              className={`text-sm font-medium transition-colors ${
                activeNavTab === 'analytics'
                  ? 'text-[#2f4da8] border-b-2 border-[#2f4da8] pb-1'
                  : 'text-[#444652] hover:text-[#131b2e]'
              }`}
            >
              Analytics
            </button>
          </nav>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSettings}
              aria-label="Post Settings"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-[#444652] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
              title="Configure Profile & Post Preferences"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">tune</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="relative rounded-full ring-2 ring-[#eaedff] hover:ring-[#4a66c2] transition-all"
              title={`${user.name} - ${user.headline}`}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = ASSETS.sarahAvatar;
                }}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </div>

        {/* View Switcher Bar (Organizer vs Attendee View) */}
        <div className="pb-3 pt-1">
          <div className="max-w-md mx-auto sm:max-w-sm bg-[#e2e7ff] p-1 rounded-lg flex items-center">
            <button
              type="button"
              onClick={() => onViewChange('organizer')}
              className={`flex-1 h-8 sm:h-8 flex items-center justify-center rounded-md text-xs sm:text-sm font-medium transition-all ${
                currentView === 'organizer'
                  ? 'bg-white text-[#2f4da8] shadow-sm font-semibold'
                  : 'text-[#444652] hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] mr-1.5">campaign</span>
              Organizer
            </button>
            <button
              type="button"
              onClick={() => onViewChange('attendee')}
              className={`flex-1 h-8 sm:h-8 flex items-center justify-center rounded-md text-xs sm:text-sm font-medium transition-all ${
                currentView === 'attendee'
                  ? 'bg-white text-[#2f4da8] shadow-sm font-semibold'
                  : 'text-[#444652] hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] mr-1.5">badge</span>
              Attendee View
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
