"use client";

import React from 'react';
import { UserRole, Language } from '@/types/heritage';
import { getTranslation } from '@/lib/translations';
import { soundManager } from '@/lib/soundEffects';
import { 
  Compass, 
  Hammer, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  currentLanguage: Language;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
  currentLanguage
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-[#FFFDF8] border-2 border-amber-300 rounded-3xl shadow-2xl p-6 sm:p-8">
        <DialogHeader className="text-center space-y-2 border-b border-amber-200/60 pb-4">
          <Badge className="bg-amber-100 text-amber-900 border-amber-300 mx-auto text-xs font-semibold">
            IDENTITY & PURPOSE
          </Badge>
          <DialogTitle className="font-serif text-2xl font-bold text-slate-900">
            {getTranslation('selectRoleTitle', currentLanguage)}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-600 max-w-md mx-auto">
            Choose how you want to experience and preserve India&apos;s 5,000-year living cultural heritage.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Option 1: Heritage Explorer */}
          <div
            onClick={() => {
              soundManager.playClick();
              onSelectRole('user');
              onClose();
            }}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-4 hover:shadow-md ${
              currentRole === 'user'
                ? 'border-[#1A237E] bg-indigo-50/50 ring-2 ring-indigo-200 shadow-sm'
                : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1A237E] to-[#283593] text-white flex items-center justify-center shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-base">
                  {getTranslation('roleExplorer', currentLanguage)}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {getTranslation('roleExplorerDesc', currentLanguage)}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Interactive AR Camera Tutorials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live IoT Sensor Conservation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Play Games & Earn Soulbound XP</span>
              </div>
            </div>

            <Button
              size="sm"
              className={`w-full text-xs ${
                currentRole === 'user'
                  ? 'bg-[#1A237E] hover:bg-[#101758] text-white'
                  : 'border border-indigo-200 text-indigo-900 hover:bg-indigo-50'
              }`}
            >
              {currentRole === 'user' ? 'Active Role ✓' : 'Select Explorer'}
            </Button>
          </div>

          {/* Option 2: Master Artisan */}
          <div
            onClick={() => {
              soundManager.playClick();
              onSelectRole('artisan');
              onClose();
            }}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-4 hover:shadow-md ${
              currentRole === 'artisan'
                ? 'border-[#E65100] bg-orange-50/50 ring-2 ring-orange-200 shadow-sm'
                : 'border-slate-200 bg-white hover:border-orange-300 hover:bg-slate-50'
            }`}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#E65100] to-[#FF8A00] text-white flex items-center justify-center shadow-md">
                <Hammer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-base">
                  {getTranslation('roleArtisan', currentLanguage)}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {getTranslation('roleArtisanDesc', currentLanguage)}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Creator Forge & GI Token Minting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Oral History Microphone Recording</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct Patronage Marketplace</span>
              </div>
            </div>

            <Button
              size="sm"
              className={`w-full text-xs ${
                currentRole === 'artisan'
                  ? 'bg-gradient-to-r from-[#E65100] to-[#FF8A00] text-white'
                  : 'border border-orange-200 text-orange-900 hover:bg-orange-50'
              }`}
            >
              {currentRole === 'artisan' ? 'Active Role ✓' : 'Select Master Artisan'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
