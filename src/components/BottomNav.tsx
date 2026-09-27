import React from 'react';

interface BottomNavProps {
  activeTab: 'create' | 'templates' | 'analytics' | 'account';
  onTabChange: (tab: 'create' | 'templates' | 'analytics' | 'account') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-1px_8px_rgba(0,0,0,0.04)] md:hidden">
      <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => onTabChange('create')}
          aria-current={activeTab === 'create' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'create'
              ? 'text-[#2f4da8] font-semibold'
              : 'text-[#444652] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'create' ? "'FILL' 1" : "'FILL' 0" }}
          >
            edit_note
          </span>
          <span className="text-[11px] mt-0.5">Create</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('templates')}
          aria-current={activeTab === 'templates' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'templates'
              ? 'text-[#2f4da8] font-semibold'
              : 'text-[#444652] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'templates' ? "'FILL' 1" : "'FILL' 0" }}
          >
            dataset
          </span>
          <span className="text-[11px] mt-0.5">Templates</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('analytics')}
          aria-current={activeTab === 'analytics' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'analytics'
              ? 'text-[#2f4da8] font-semibold'
              : 'text-[#444652] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'analytics' ? "'FILL' 1" : "'FILL' 0" }}
          >
            monitoring
          </span>
          <span className="text-[11px] mt-0.5">Analytics</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('account')}
          aria-current={activeTab === 'account' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'account'
              ? 'text-[#2f4da8] font-semibold'
              : 'text-[#444652] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'account' ? "'FILL' 1" : "'FILL' 0" }}
          >
            account_circle
          </span>
          <span className="text-[11px] mt-0.5">Account</span>
        </button>
      </div>
    </nav>
  );
};
