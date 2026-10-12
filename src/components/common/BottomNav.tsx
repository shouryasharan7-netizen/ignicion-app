"use client";

import React from 'react';
import { Language, UserRole } from '@/types/heritage';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  Home, 
  Camera, 
  Gamepad2, 
  Activity, 
  ShoppingBag, 
  Radio, 
  Sparkles, 
  UserCircle 
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: UserRole;
  currentLanguage: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  userRole,
  currentLanguage
}) => {
  const tabs = [
    { id: 'home', labelKey: 'navHome', icon: Home },
    { id: 'learn', labelKey: 'navLearn', icon: Camera },
    { id: 'quests', labelKey: 'navQuests', icon: Gamepad2 },
    { id: 'museums', labelKey: 'navMuseums', icon: Activity },
    { id: 'marketplace', labelKey: 'navMarketplace', icon: ShoppingBag },
    { id: 'community', labelKey: 'navCommunity', icon: Radio },
    ...(userRole === 'artisan' ? [{ id: 'upload', labelKey: 'navUpload', icon: Sparkles }] : []),
    { id: 'profile', labelKey: 'navProfile', icon: UserCircle }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-amber-200/60 shadow-lg px-2 py-1.5 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const label = getTranslation(tab.labelKey, currentLanguage);

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                onTabChange(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 sm:px-3 rounded-xl transition-all relative group ${
                isActive
                  ? 'text-[#E65100] font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-6 h-1 rounded-full bg-gradient-to-r from-[#E65100] to-[#FF8A00] shadow-xs" />
              )}
              <div
                className={`p-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-amber-100/70 text-[#E65100] scale-110 shadow-2xs'
                    : 'group-hover:bg-slate-100/70'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] sm:text-xs tracking-tight line-clamp-1 mt-0.5">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
