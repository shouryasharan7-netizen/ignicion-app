"use client";

import React, { useState } from 'react';
import { Craft, Language, UserRole } from '@/types/heritage';
import { initialCrafts, initialMuseums } from '@/data/heritageData';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  Camera, 
  Activity, 
  Gamepad2, 
  ShoppingBag, 
  Radio, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Clock, 
  Flame,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface HeritageHubHomeProps {
  currentLanguage: Language;
  userRole: UserRole;
  onNavigateTab: (tab: string) => void;
  onEarnPoints: (points: number, reason: string) => void;
}

export const HeritageHubHome: React.FC<HeritageHubHomeProps> = ({
  currentLanguage,
  userRole,
  onNavigateTab,
  onEarnPoints
}) => {
  const [dailyFactClaimed, setDailyFactClaimed] = useState(false);

  const handleClaimDailyWisdom = () => {
    if (dailyFactClaimed) return;
    soundManager.playCoin();
    setDailyFactClaimed(true);
    toast.success('Daily Cultural Lore claimed! +30 Heritage XP');
    onEarnPoints(30, 'Read Daily Sacred Cultural Lore');
  };

  return (
    <div className="space-y-8">
      {/* Majestic Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#31102A] text-white p-6 sm:p-10 shadow-2xl border-2 border-amber-400/40">
        {/* Sacred geometric background highlights */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#E65100]/30 to-[#D4AF37]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-[#1A237E]/40 to-[#004D40]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preserving 5,000 Years of Indian Craft & Antiquity</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-orange-100 to-amber-300">
            Sacred Heritage, <br className="hidden sm:inline" />
            Protected by AI & Innovation.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Step inside India&apos;s living cultural sanctuary. Experience interactive AR masterclasses with real voice guidance, monitor live IoT sensors safeguarding national museum antiquities, and acquire verified artisan masterworks with blockchain GI certificates.
          </p>

          <div className="flex flex-wrap gap-3 pt-3">
            <Button
              onClick={() => {
                soundManager.playClick();
                onNavigateTab('learn');
              }}
              className="bg-gradient-to-r from-[#E65100] via-[#FF8A00] to-[#E65100] hover:opacity-90 text-white font-semibold px-6 py-6 rounded-xl shadow-lg shadow-orange-950/40 text-sm"
            >
              <Camera className="w-5 h-5 mr-2" />
              Launch AR Masterclass
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                soundManager.playClick();
                onNavigateTab('museums');
              }}
              className="bg-white/10 hover:bg-white/20 text-white border-white/25 px-5 py-6 rounded-xl backdrop-blur-md text-sm"
            >
              <Activity className="w-5 h-5 mr-2 text-emerald-400" />
              Live Museum Telemetry
            </Button>
          </div>
        </div>
      </div>

      {/* Daily Cultural Lore Card (Interactive Claimable) */}
      <Card className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-amber-300/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center text-2xl flex-shrink-0">
            🦚
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
              Daily Cultural Lore · +30 XP
            </span>
            <h4 className="font-serif font-bold text-slate-900 text-base mt-0.5">
              Why Pattachitra Scroll Paint Survives 800 Tropical Monsoons
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Artisans grind boiled tamarind seeds into an organic waterproof starch glue, burnished with river stones to a glass finish.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          disabled={dailyFactClaimed}
          onClick={handleClaimDailyWisdom}
          className={`flex-shrink-0 text-xs ${
            dailyFactClaimed
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-gradient-to-r from-[#E65100] to-[#FF8A00] text-white shadow-xs'
          }`}
        >
          {dailyFactClaimed ? 'Claimed (+30 XP) ✓' : 'Claim Daily Lore'}
        </Button>
      </Card>

      {/* 4 Core Gateways Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Interactive Sanctuaries
            </h2>
            <p className="text-xs text-slate-500">Choose your gateway into living heritage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Gateway 1: AR Studio */}
          <Card
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('learn');
            }}
            className="p-5 rounded-2xl bg-white border-amber-200/80 hover:border-[#E65100] hover:shadow-lg cursor-pointer transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#E65100] to-[#FF8A00] text-white flex items-center justify-center shadow-md mb-3 group-hover:rotate-6 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base flex items-center justify-between">
              AR Masterclass
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#E65100] transition-colors" />
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Optical lens alignment, Web Speech multilingual narration & canvas craft studio.
            </p>
          </Card>

          {/* Gateway 2: Quests & Games */}
          <Card
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('quests');
            }}
            className="p-5 rounded-2xl bg-white border-amber-200/80 hover:border-purple-600 hover:shadow-lg cursor-pointer transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center shadow-md mb-3 group-hover:rotate-6 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base flex items-center justify-between">
              Heritage Games
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Craft Matcher, Sacred Motif Memory Challenge, and Scholar Trivia arena.
            </p>
          </Card>

          {/* Gateway 3: IoT Guardian */}
          <Card
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('museums');
            }}
            className="p-5 rounded-2xl bg-white border-amber-200/80 hover:border-emerald-600 hover:shadow-lg cursor-pointer transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-600 text-white flex items-center justify-center shadow-md mb-3 group-hover:rotate-6 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base flex items-center justify-between">
              IoT Sensor Guardian
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Sub-second environmental telemetry surveillance across national museums.
            </p>
          </Card>

          {/* Gateway 4: Artisan Boli */}
          <Card
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('marketplace');
            }}
            className="p-5 rounded-2xl bg-white border-amber-200/80 hover:border-amber-600 hover:shadow-lg cursor-pointer transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-[#D4AF37] text-white flex items-center justify-center shadow-md mb-3 group-hover:rotate-6 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-base flex items-center justify-between">
              Artisan Boli & GI Tags
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Direct masterwork patronage with instant blockchain provenance certificates.
            </p>
          </Card>
        </div>
      </div>

      {/* Featured Master Crafts Spotlight */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Living Cultural Heirlooms
            </h2>
            <p className="text-xs text-slate-500">GI-certified traditional masterworks</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              soundManager.playClick();
              onNavigateTab('learn');
            }}
            className="text-xs text-[#E65100] hover:text-[#D64A00]"
          >
            View All ({initialCrafts.length}) <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialCrafts.slice(0, 4).map((craft) => (
            <Card
              key={craft.id}
              onClick={() => {
                soundManager.playClick();
                onNavigateTab('learn');
              }}
              className="rounded-2xl overflow-hidden bg-white border-amber-200/80 hover:border-[#E65100] hover:shadow-md cursor-pointer transition-all group"
            >
              <div className="aspect-4/3 overflow-hidden relative bg-slate-100">
                <img
                  src={craft.image}
                  alt={craft.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5">
                  <Badge className="bg-black/70 text-amber-300 backdrop-blur-md border border-white/20 text-[10px]">
                    {craft.state}
                  </Badge>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-serif font-bold text-sm text-slate-900 line-clamp-1">
                  {craft.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {craft.originEra}
                </p>
                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-[#E65100] font-semibold flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" /> AR Masterclass
                  </span>
                  <span className="font-bold text-slate-800">★ {craft.rating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
