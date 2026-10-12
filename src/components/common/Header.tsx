"use client";

import React from 'react';
import { Language, UserRole } from '@/types/heritage';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  User, 
  Compass, 
  Hammer,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  userRole: UserRole;
  onRoleToggle: () => void;
  userPoints: number;
  userLevel: number;
  isSoundEnabled: boolean;
  onSoundToggle: () => void;
  onOpenVerifyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  userRole,
  onRoleToggle,
  userPoints,
  userLevel,
  isSoundEnabled,
  onSoundToggle,
  onOpenVerifyModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 border-b border-amber-200/50 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#E65100] via-[#FF8A00] to-[#D4AF37] p-0.5 shadow-md transform group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Hybrid Heritage Guardian Logo" 
                  className="w-9 h-9 object-contain"
                  onError={(e) => {
                    // Fallback to stylized SVG emblem if image fails
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-slate-900 bg-gradient-to-r from-[#1A237E] via-[#8E24AA] to-[#E65100] bg-clip-text text-transparent">
                {getTranslation('appTitle', currentLanguage)}
              </span>
              <Badge variant="outline" className="hidden sm:inline-flex text-[10px] border-amber-500/40 text-amber-800 bg-amber-50/60 font-medium">
                GI·AI Shield
              </Badge>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              {getTranslation('tagline', currentLanguage)}
            </p>
          </div>
        </div>

        {/* Status, Language, Audio & User controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Blockchain Verifier Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              soundManager.playClick();
              onOpenVerifyModal();
            }}
            className="hidden lg:flex items-center gap-1.5 border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/70 text-emerald-800 text-xs px-2.5 h-8 rounded-lg"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verify GI Tag</span>
          </Button>

          {/* Points & Level Capsule */}
          <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl px-2.5 py-1 shadow-2xs">
            <div className="flex items-center gap-1.5 pr-2 border-r border-amber-200">
              <Award className="w-4 h-4 text-[#E65100]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-amber-700 uppercase font-semibold leading-none">LVL {userLevel}</span>
                <span className="text-xs font-bold text-slate-800">{userPoints} pts</span>
              </div>
            </div>
            <div className="pl-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          {/* Role Toggle Switcher */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              soundManager.playClick();
              onRoleToggle();
            }}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-slate-200 hover:border-amber-300 text-xs font-medium bg-slate-50/80 hover:bg-amber-50 text-slate-700"
            title="Click to switch role"
          >
            {userRole === 'artisan' ? (
              <>
                <Hammer className="w-3.5 h-3.5 text-[#E65100]" />
                <span className="hidden sm:inline">Master Artisan</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5 text-[#1A237E]" />
                <span className="hidden sm:inline">Explorer</span>
              </>
            )}
          </Button>

          {/* Sound Mute/Unmute */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onSoundToggle();
            }}
            className="w-8 h-8 rounded-lg border border-slate-200 hover:border-amber-300 text-slate-600 hover:text-amber-800"
            title={isSoundEnabled ? "Mute audio FX" : "Enable audio FX"}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </Button>

          {/* Language Selector Dropdown */}
          <div className="flex items-center bg-slate-100/80 p-0.5 rounded-lg border border-slate-200 text-xs">
            {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  soundManager.playClick();
                  onLanguageChange(lang);
                }}
                className={`px-2 py-1 rounded-md font-medium transition-all ${
                  currentLanguage === lang
                    ? 'bg-gradient-to-r from-[#E65100] to-[#FF8A00] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिं' : 'मरा'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
