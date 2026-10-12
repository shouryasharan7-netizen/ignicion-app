"use client";

import React, { useState } from 'react';
import { Language, UserRole } from '@/types/heritage';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Compass, 
  Hammer, 
  Globe 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SplashScreenProps {
  onEnterApp: (lang: Language, role: UserRole) => void;
  initialLanguage: Language;
  initialRole: UserRole;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onEnterApp,
  initialLanguage,
  initialRole
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(initialLanguage);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);

  const handleEnter = () => {
    soundManager.playSuccess();
    onEnterApp(selectedLanguage, selectedRole);
  };

  return (
    <div className="min-h-screen bg-radial from-[#1E1B4B] via-[#0F172A] to-[#050811] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Sacred mandala animated background rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
        <div className="w-[600px] h-[600px] rounded-full border border-amber-400/30 animate-spin" style={{ animationDuration: '60s' }} />
        <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-orange-400/40 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-amber-300/30 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-8 animate-fade-in">
        {/* Emblem & Logo (Zero raw comments, pristine rendering) */}
        <div className="space-y-4">
          <div className="relative inline-block group">
            <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-gradient-to-tr from-[#E65100] via-[#FF8A00] to-[#D4AF37] p-1.5 shadow-2xl shadow-orange-950/60 transform group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#0B0F19] rounded-[20px] p-3 flex items-center justify-center overflow-hidden border border-white/10">
                <img
                  src="/logo.png"
                  alt="Hybrid Heritage Guardian Logo"
                  className="w-full h-full object-contain filter drop-shadow-md"
                  onError={(e) => {
                    // Fallback
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Pulsing Indian heritage gem badges */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/50 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#E65100] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-[#00796B] animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-100 via-orange-100 to-amber-300 bg-clip-text text-transparent">
              {getTranslation('appTitle', selectedLanguage)}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-sm mx-auto leading-relaxed">
              {getTranslation('tagline', selectedLanguage)}
            </p>
          </div>
        </div>

        {/* Language Picker Selector */}
        <div className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-2">
          <span className="text-[11px] uppercase font-bold text-amber-300 tracking-wider flex items-center justify-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> Select Language / भाषा चुनें
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'en', label: 'English', sub: 'English' },
              { id: 'hi', label: 'हिन्दी', sub: 'Hindi' },
              { id: 'mr', label: 'मराठी', sub: 'Marathi' }
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedLanguage(lang.id as Language);
                }}
                className={`p-2 rounded-xl text-center transition-all border ${
                  selectedLanguage === lang.id
                    ? 'bg-gradient-to-r from-[#E65100] to-[#FF8A00] text-white border-transparent shadow-md scale-102 font-semibold'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="text-sm">{lang.label}</div>
                <div className="text-[10px] opacity-70">{lang.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Role Choice Chips */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSelectedRole('user');
            }}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedRole === 'user'
                ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg ring-1 ring-indigo-400'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Compass className="w-5 h-5 text-indigo-400 mb-1" />
            <div className="text-xs font-bold text-white">Heritage Explorer</div>
            <div className="text-[10px] text-slate-400">Learn AR & play quests</div>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSelectedRole('artisan');
            }}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedRole === 'artisan'
                ? 'bg-orange-600/30 border-orange-400 text-white shadow-lg ring-1 ring-orange-400'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Hammer className="w-5 h-5 text-orange-400 mb-1" />
            <div className="text-xs font-bold text-white">Master Artisan</div>
            <div className="text-[10px] text-slate-400">Creator forge & GI minting</div>
          </button>
        </div>

        {/* Enter Sanctuary Button */}
        <div className="space-y-3">
          <Button
            onClick={handleEnter}
            className="w-full bg-gradient-to-r from-[#E65100] via-[#FF8A00] to-[#E65100] hover:opacity-90 text-white font-bold py-6 rounded-2xl shadow-xl shadow-orange-950/60 text-base transform hover:scale-102 transition-all flex items-center justify-center gap-2"
          >
            <span>{getTranslation('enterPortal', selectedLanguage)}</span>
            <ChevronRight className="w-5 h-5" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cryptographically Verified Cultural Heritage Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
