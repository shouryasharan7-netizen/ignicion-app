"use client";

import React from 'react';
import { UserRole, BlockchainCertificate, Language } from '@/types/heritage';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  FileCheck, 
  Compass, 
  Hammer, 
  Leaf, 
  HeartHandshake, 
  Flame,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface UserProfileProps {
  currentLanguage: Language;
  userRole: UserRole;
  onRoleToggle: () => void;
  userPoints: number;
  userLevel: number;
  certificates: BlockchainCertificate[];
  onOpenVerifyModalWithCert: (cert: BlockchainCertificate) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  currentLanguage,
  userRole,
  onRoleToggle,
  userPoints,
  userLevel,
  certificates,
  onOpenVerifyModalWithCert
}) => {
  const badges = [
    { id: '1', name: 'Dabu Master Guild', icon: '🧵', desc: 'Mastered natural mud-resist geometry' },
    { id: '2', name: 'Museum Aegis Guardian', icon: '🏛️', desc: 'Engaged emergency IoT climate stabilization' },
    { id: '3', name: 'Sahyadri Storyteller', icon: '🎨', desc: 'Preserved ancient Warli folklore' },
    { id: '4', name: 'Patron of Antiquity', icon: '💎', desc: 'Supported direct GI certified artisan families' }
  ];

  const nextLevelPoints = userLevel * 200;
  const currentLevelProgress = Math.min(100, Math.round(((userPoints % 200) / 200) * 100));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Digital Passport Card */}
      <Card className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A237E] via-[#283593] to-[#0D47A1] text-white shadow-2xl border-2 border-amber-300/40 relative overflow-hidden">
        {/* Subtle decorative background circle */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border-4 border-amber-400/20 pointer-events-none" />
        <div className="absolute right-12 bottom-6 opacity-10 pointer-events-none">
          <span className="font-serif text-9xl font-bold">HHG</span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#E65100] to-[#D4AF37] p-1 shadow-lg flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-3xl">
                {userRole === 'artisan' ? '👨‍🎨' : '🧭'}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  Heritage Scholar Passport
                </h2>
                <Badge className="bg-amber-400 text-slate-950 font-bold text-[10px]">
                  VERIFIED CITIZEN
                </Badge>
              </div>
              <p className="text-xs text-amber-200">
                Identity: <span className="font-semibold text-white">Shourya Sharan</span> · Sovereign Heritage ID #HHG-8092
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Badge variant="outline" className="border-amber-300/60 text-amber-200 text-xs">
                  {userRole === 'artisan' ? 'Role: Master Artisan' : 'Role: Heritage Explorer'}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    soundManager.playClick();
                    onRoleToggle();
                  }}
                  className="h-6 text-[10px] text-amber-300 hover:text-white hover:bg-white/10 px-2"
                >
                  Switch Role
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[160px] space-y-1">
            <span className="text-[10px] text-amber-300 uppercase font-bold tracking-wider">
              Level {userLevel} Scholar
            </span>
            <div className="font-mono text-3xl font-bold text-white">
              {userPoints} <span className="text-xs font-normal text-slate-300">XP</span>
            </div>
            <div className="w-full space-y-1 pt-1">
              <div className="flex justify-between text-[10px] text-slate-300">
                <span>Progress to LVL {userLevel + 1}</span>
                <span>{currentLevelProgress}%</span>
              </div>
              <Progress value={currentLevelProgress} className="h-1.5 bg-white/20" />
            </div>
          </div>
        </div>
      </Card>

      {/* Impact Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 rounded-2xl bg-white border-amber-200 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500">Artisan Guilds Supported</span>
            <p className="font-serif text-lg font-bold text-slate-900">4 Hereditary Clans</p>
          </div>
        </Card>

        <Card className="p-4 rounded-2xl bg-white border-amber-200 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500">Ecological Organic Dye Footprint</span>
            <p className="font-serif text-lg font-bold text-slate-900">100% Zero-Chemical</p>
          </div>
        </Card>

        <Card className="p-4 rounded-2xl bg-white border-amber-200 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500">On-Chain Proofs Anchored</span>
            <p className="font-serif text-lg font-bold text-slate-900">{certificates.length} Cryptographic GI Tags</p>
          </div>
        </Card>
      </div>

      {/* Soulbound Badges Showcase */}
      <Card className="p-6 rounded-2xl bg-white border-amber-200/80 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#E65100]" />
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Soulbound Preservation Badges
            </h3>
          </div>
          <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-xs">
            4 Unlocked
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-xl bg-gradient-to-tr from-amber-50/50 to-orange-50/50 border border-amber-200 text-center space-y-2 hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-white mx-auto flex items-center justify-center text-2xl shadow-2xs border border-amber-200">
                {b.icon}
              </div>
              <h4 className="font-serif font-bold text-sm text-slate-900">{b.name}</h4>
              <p className="text-[11px] text-slate-600 leading-snug">{b.desc}</p>
              <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50 text-[10px]">
                Active on Ledger
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Blockchain Certificates Vault */}
      <Card className="p-6 rounded-2xl bg-white border-amber-200/80 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Cryptographic GI Certificate Vault
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {certificates.length} Artifact Certificates
          </span>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No certificates minted yet. Complete masterclasses or purchase handcrafted items to unlock on-chain GI certificates.
          </div>
        ) : (
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.certificateId}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-amber-300 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#E65100]">
                      {cert.certificateId}
                    </span>
                    <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50 text-[10px]">
                      BLOCK #{cert.blockNumber}
                    </Badge>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    {cert.artifactName}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {cert.craftType} · {cert.artisanName}
                  </p>
                </div>

                <Button
                  size="sm"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenVerifyModalWithCert(cert);
                  }}
                  className="bg-gradient-to-r from-[#1A237E] to-[#283593] hover:from-[#101758] hover:to-[#1A237E] text-white text-xs shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Inspect Provenance
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
