"use client";

import React, { useState, useEffect } from 'react';
import { Language, UserRole, Craft, BlockchainCertificate } from '@/types/heritage';
import { Header } from '@/components/common/Header';
import { BottomNav } from '@/components/common/BottomNav';
import { SplashScreen } from '@/components/screens/SplashScreen';
import { RoleSelectionModal } from '@/components/screens/RoleSelectionModal';
import { BlockchainVerificationModal } from '@/components/common/BlockchainVerificationModal';
import { HeritageHubHome } from '@/components/home/HeritageHubHome';
import { ARLearningZone } from '@/components/ar/ARLearningZone';
import { HeritageGamesHub } from '@/components/games/HeritageGamesHub';
import { IoTDashboard } from '@/components/museums/IoTDashboard';
import { ArtisanMarketplace } from '@/components/marketplace/ArtisanMarketplace';
import { ArtisanUploadStudio } from '@/components/artisan/ArtisanUploadStudio';
import { CommunityHub } from '@/components/community/CommunityHub';
import { UserProfile } from '@/components/profile/UserProfile';
import { soundManager } from '@/lib/soundEffects';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userPoints, setUserPoints] = useState<number>(350);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);

  // Modals state
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [activeInspectCert, setActiveInspectCert] = useState<BlockchainCertificate | null>(null);

  // User earned/minted certificates
  const [userCertificates, setUserCertificates] = useState<BlockchainCertificate[]>([
    {
      certificateId: 'HHG-GI-BAGRU-019',
      artifactName: 'Bagru Mud-Resist Indigo Stole',
      craftType: 'Mud-Resist Hand-Block Printing',
      artisanName: 'Ustad Ramkishan Chippa (Padma Shri)',
      originRegion: 'Bagru, Rajasthan',
      timestamp: '2026-06-12 10:14:00 UTC',
      blockNumber: 19820491,
      txHash: '0x3a4b9c1d8e7f2a5b6c0d9e8f7a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
      ipfsHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
      sha256Digest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      materialsUsed: ['Bagru Clay', 'Natural Indigo', 'Organic Cotton'],
      geographicalIndicationTag: 'GI-APPL-NO-178'
    }
  ]);

  // Load persistence from localStorage on client mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('hhg_lang') as Language;
      const savedRole = localStorage.getItem('hhg_role') as UserRole;
      const savedPoints = localStorage.getItem('hhg_points');
      const savedLevel = localStorage.getItem('hhg_level');
      const savedCerts = localStorage.getItem('hhg_certs');
      const savedEntered = localStorage.getItem('hhg_entered');

      if (savedLang) setCurrentLanguage(savedLang);
      if (savedRole) setUserRole(savedRole);
      if (savedPoints) setUserPoints(parseInt(savedPoints));
      if (savedLevel) setUserLevel(parseInt(savedLevel));
      if (savedCerts) setUserCertificates(JSON.parse(savedCerts));
      if (savedEntered === 'true') setHasEntered(true);
    } catch (err) {
      console.warn('LocalStorage load notification:', err);
    }
  }, []);

  // Save changes to localStorage
  const persistState = (updates: {
    lang?: Language;
    role?: UserRole;
    points?: number;
    level?: number;
    certs?: BlockchainCertificate[];
    entered?: boolean;
  }) => {
    try {
      if (updates.lang) localStorage.setItem('hhg_lang', updates.lang);
      if (updates.role) localStorage.setItem('hhg_role', updates.role);
      if (updates.points !== undefined) localStorage.setItem('hhg_points', updates.points.toString());
      if (updates.level !== undefined) localStorage.setItem('hhg_level', updates.level.toString());
      if (updates.certs) localStorage.setItem('hhg_certs', JSON.stringify(updates.certs));
      if (updates.entered !== undefined) localStorage.setItem('hhg_entered', updates.entered ? 'true' : 'false');
    } catch (err) {
      console.warn('LocalStorage write notification:', err);
    }
  };

  const handleEnterApp = (lang: Language, role: UserRole) => {
    setCurrentLanguage(lang);
    setUserRole(role);
    setHasEntered(true);
    persistState({ lang, role, entered: true });
  };

  const handleEarnPoints = (points: number, reason: string) => {
    setUserPoints((prevPoints) => {
      const newPoints = prevPoints + points;
      const newLevel = Math.max(1, Math.floor(newPoints / 200) + 1);

      if (newLevel > userLevel) {
        setUserLevel(newLevel);
        soundManager.playSuccess();
        toast.success(`🎉 Level Up! You advanced to Level ${newLevel} Scholar!`, {
          description: `+${points} XP from ${reason}`
        });
        persistState({ points: newPoints, level: newLevel });
      } else {
        persistState({ points: newPoints });
      }
      return newPoints;
    });
  };

  const handleDeductPoints = (points: number): boolean => {
    if (userPoints < points) return false;
    const remaining = userPoints - points;
    setUserPoints(remaining);
    persistState({ points: remaining });
    return true;
  };

  const handleMintCertificate = (newCert: BlockchainCertificate) => {
    const updated = [newCert, ...userCertificates];
    setUserCertificates(updated);
    persistState({ certs: updated });
    handleEarnPoints(100, `Minted Certificate #${newCert.certificateId}`);
  };

  const handlePublishCraft = (newCraft: Craft, cert: BlockchainCertificate) => {
    handleMintCertificate(cert);
    handleEarnPoints(150, `Published Masterpiece: ${newCraft.name}`);
    setActiveTab('learn');
  };

  const handleToggleSound = () => {
    const next = !isSoundEnabled;
    setIsSoundEnabled(next);
    soundManager.setSoundEnabled(next);
    if (next) soundManager.playClick();
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    persistState({ lang });
  };

  const handleRoleToggle = () => {
    setShowRoleModal(true);
  };

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);
    persistState({ role });
    toast.success(`Role switched to ${role === 'artisan' ? 'Master Artisan' : 'Heritage Explorer'}`);
  };

  const handleOpenVerifyModalWithCert = (cert: BlockchainCertificate) => {
    setActiveInspectCert(cert);
    setShowVerifyModal(true);
  };

  // If user hasn't entered the app, display majestic splash screen
  if (!hasEntered) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <SplashScreen
          onEnterApp={handleEnterApp}
          initialLanguage={currentLanguage}
          initialRole={userRole}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col font-sans selection:bg-[#E65100] selection:text-white pb-24">
      <Toaster position="top-center" richColors />

      {/* Top Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        userRole={userRole}
        onRoleToggle={handleRoleToggle}
        userPoints={userPoints}
        userLevel={userLevel}
        isSoundEnabled={isSoundEnabled}
        onSoundToggle={handleToggleSound}
        onOpenVerifyModal={() => {
          setActiveInspectCert(null);
          setShowVerifyModal(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        {activeTab === 'home' && (
          <HeritageHubHome
            currentLanguage={currentLanguage}
            userRole={userRole}
            onNavigateTab={setActiveTab}
            onEarnPoints={handleEarnPoints}
          />
        )}

        {activeTab === 'learn' && (
          <ARLearningZone
            currentLanguage={currentLanguage}
            onEarnPoints={handleEarnPoints}
          />
        )}

        {activeTab === 'quests' && (
          <HeritageGamesHub
            currentLanguage={currentLanguage}
            onEarnPoints={handleEarnPoints}
          />
        )}

        {activeTab === 'museums' && (
          <IoTDashboard
            currentLanguage={currentLanguage}
            onEarnPoints={handleEarnPoints}
          />
        )}

        {activeTab === 'marketplace' && (
          <ArtisanMarketplace
            currentLanguage={currentLanguage}
            userPoints={userPoints}
            onDeductPoints={handleDeductPoints}
            onMintCertificate={handleMintCertificate}
            onOpenVerifyModalWithCert={handleOpenVerifyModalWithCert}
          />
        )}

        {activeTab === 'community' && (
          <CommunityHub
            currentLanguage={currentLanguage}
            onEarnPoints={handleEarnPoints}
          />
        )}

        {activeTab === 'upload' && userRole === 'artisan' && (
          <ArtisanUploadStudio
            currentLanguage={currentLanguage}
            onPublishCraft={handlePublishCraft}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfile
            currentLanguage={currentLanguage}
            userRole={userRole}
            onRoleToggle={handleRoleToggle}
            userPoints={userPoints}
            userLevel={userLevel}
            certificates={userCertificates}
            onOpenVerifyModalWithCert={handleOpenVerifyModalWithCert}
          />
        )}
      </main>

      {/* Navigation Dock */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userRole={userRole}
        currentLanguage={currentLanguage}
      />

      {/* Global Modals */}
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        currentRole={userRole}
        onSelectRole={handleSelectRole}
        currentLanguage={currentLanguage}
      />

      <BlockchainVerificationModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        certificate={activeInspectCert}
      />
    </div>
  );
}
