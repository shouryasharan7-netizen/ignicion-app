"use client";

import React, { useState } from 'react';
// ... rest of imports
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// Change the line that causes the error to this:
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
// Change this line:
import { CraftMatchGame, PatternGame, MemoryGame } from '../components/CulturalGames';
import { 
  Home, 
  BookOpen, 
  Upload, 
  Trophy, 
  User, 
  Users,
  Search, 
  Camera, 
  Mic, 
  Heart, 
  MessageCircle, 
  Share2,
  ChevronRight,
  Palette,
  Medal,
  Building2,
  Thermometer,
  Droplet,
  Sun,
  Volume2,
  Video,
  HelpCircle,
  Check,
  ShoppingBag,
  Gift,
  Star,
  Award,
  Sparkles,
  Globe,
  MapPin,
  Clock,
  Target,
  Zap,
  Shield,
  Activity,
  X,
  RotateCcw,
  Play,
  CheckCircle2,
  UserCircle2,
  Brush,
  ChevronLeft
} from 'lucide-react';

type Language = 'en' | 'hi' | 'mr';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

const translations: Translations = {
  // Splash Screen
  appTitle: {
    en: 'Hybrid Heritage Guardian',
    hi: 'हाइब्रिड हेरिटेज गार्डियन',
    mr: 'हायब्रिड हेरिटेज गार्डियन'
  },
  tagline: {
    en: 'Preserving Culture Through Innovation',
    hi: 'नवाचार के माध्यम से संस्कृति का संरक्षण',
    mr: 'नवकल्पनेद्वारे संस्कृती जतन'
  },
  chooseLanguage: {
    en: 'Choose Your Language',
    hi: 'अपनी भाषा चुनें',
    mr: 'तुमची भाषा निवडा'
  },
  enterApp: {
    en: 'Enter App',
    hi: 'ऐप में प्रवेश करें',
    mr: 'अॅपमध्ये प्रवेश करा'
  },
  // User Type Selection
  selectUserType: {
    en: 'Select Your Role',
    hi: 'अपनी भूमिका चुनें',
    mr: 'तुमची भूमिका निवडा'
  },
  userTypeDescription: {
    en: 'Choose how you want to experience India\'s cultural heritage',
    hi: 'चुनें कि आप भारत की सांस्कृतिक विरासत का अनुभव कैसे करना चाहते हैं',
    mr: 'भारताच्या सांस्कृतिक वारशाचा अनुभव कसा घ्यायचा ते निवडा'
  },
  normalUser: {
    en: 'Heritage Explorer',
    hi: 'विरासत खोजकर्ता',
    mr: 'वारसा शोधक'
  },
  normalUserDesc: {
    en: 'Learn traditional crafts, explore heritage sites, and earn rewards',
    hi: 'पारंपरिक शिल्प सीखें, विरासत स्थलों का अन्वेषण करें और पुरस्कार अर्जित करें',
    mr: 'पारंपरिक कला शिका, वारसा स्थळे शोधा आणि बक्षिसे मिळवा'
  },
  artisan: {
    en: 'Master Artisan',
    hi: 'मास्टर कारीगर',
    mr: 'मास्टर कारागीर'
  },
  artisanDesc: {
    en: 'Showcase your craft, teach others, and preserve traditional arts',
    hi: 'अपनी कला प्रदर्शित करें, दूसरों को सिखाएं और पारंपरिक कलाओं का संरक्षण करें',
    mr: 'तुमची कला दाखवा, इतरांना शिकवा आणि पारंपरिक कलांचे रक्षण करा'
  },
  continueAs: {
    en: 'Continue',
    hi: 'जारी रखें',
    mr: 'सुरू ठेवा'
  },
  // Navigation
  home: {
    en: 'Home',
    hi: 'होम',
    mr: 'होम'
  },
  learn: {
    en: 'Learn',
    hi: 'सीखें',
    mr: 'शिका'
  },
  upload: {
    en: 'Upload',
    hi: 'अपलोड',
    mr: 'अपलोड'
  },
  rewards: {
    en: 'Rewards',
    hi: 'पुरस्कार',
    mr: 'बक्षिसे'
  },
  profile: {
    en: 'Profile',
    hi: 'प्रोफ़ाइल',
    mr: 'प्रोफाइल'
  },
  quests: {
    en: 'Quests',
    hi: 'खोज',
    mr: 'शोध'
  },
  museums: {
    en: 'Museums',
    hi: 'संग्रहालय',
    mr: 'संग्रहालय'
  },
  community: {
    en: 'Community',
    hi: 'समुदाय',
    mr: 'समुदाय'
  },
  // Dashboard
  exploreHeritage: {
    en: 'Explore Heritage',
    hi: 'विरासत का अन्वेषण करें',
    mr: 'वारसा शोधा'
  },
  culturalQuests: {
    en: 'Cultural Quests',
    hi: 'सांस्कृतिक खोज',
    mr: 'सांस्कृतिक शोध'
  },
  museumsNearby: {
    en: 'Museums Nearby',
    hi: 'आस-पास के संग्रहालय',
    mr: 'जवळचे संग्रहालय'
  },
  rewardStore: {
    en: 'Reward Store',
    hi: 'पुरस्कार स्टोर',
    mr: 'बक्षीस स्टोअर'
  },
  communityHub: {
    en: 'Community Hub',
    hi: 'सामुदायिक केंद्र',
    mr: 'समुदाय केंद्र'
  },
  // Search
  searchPlaceholder: {
    en: 'Search by region, craft, or language...',
    hi: 'क्षेत्र, शिल्प या भाषा से खोजें...',
    mr: 'प्रदेश, कला किंवा भाषेनुसार शोधा...'
  },
  // Craft Cards
  dabuPrinting: {
    en: 'Dabu Printing',
    hi: 'दाबू प्रिंटिंग',
    mr: 'दाबू प्रिंटिंग'
  },
  rajasthan: {
    en: 'Rajasthan',
    hi: 'राजस्थान',
    mr: 'राजस्थान'
  },
  warliArt: {
    en: 'Warli Art',
    hi: 'वारली कला',
    mr: 'वारली कला'
  },
  maharashtra: {
    en: 'Maharashtra',
    hi: 'महाराष्ट्र',
    mr: 'महाराष्ट्र'
  },
  chhauMasks: {
    en: 'Chhau Masks',
    hi: 'छऊ मुखौटे',
    mr: 'छाऊ मुखवटे'
  },
  pattachitra: {
    en: 'Pattachitra',
    hi: 'पट्टचित्र',
    mr: 'पट्टचित्र'
  },
  odisha: {
    en: 'Odisha',
    hi: 'ओडिशा',
    mr: 'ओडिशा'
  },
  startAR: {
    en: 'Start AR Tutorial',
    hi: 'AR ट्यूटोरियल शुरू करें',
    mr: 'AR ट्यूटोरियल सुरू करा'
  },
  viewDetails: {
    en: 'View Details',
    hi: 'विवरण देखें',
    mr: 'तपशील पहा'
  },
  // AR Learning
  arLearningZone: {
    en: 'AR Learning Zone',
    hi: 'AR लर्निंग ज़ोन',
    mr: 'AR शिक्षण क्षेत्र'
  },
  step1: {
    en: 'Step 1: Align your camera with the block pattern.',
    hi: 'चरण 1: अपने कैमरे को ब्लॉक पैटर्न के साथ संरेखित करें।',
    mr: 'पायरी 1: तुमचा कॅमेरा ब्लॉक पॅटर्नशी संरेखित करा.'
  },
  step2: {
    en: 'Step 2: Apply natural dye gently.',
    hi: 'चरण 2: प्राकृतिक रंग धीरे से लगाएं।',
    mr: 'पायरी 2: नैसर्गिक रंग हलक्या हाताने लावा.'
  },
  voiceGuide: {
    en: 'Voice Guide',
    hi: 'ध्वनि गाइड',
    mr: 'आवाज मार्गदर्शक'
  },
  recordProgress: {
    en: 'Record Progress',
    hi: 'प्रगति रिकॉर्ड करें',
    mr: 'प्रगती रेकॉर्ड करा'
  },
  askExpert: {
    en: 'Ask Expert',
    hi: 'विशेषज्ञ से पूछें',
    mr: 'तज्ञांना विचारा'
  },
  // Upload
  shareYourCraft: {
    en: 'Share Your Craft with the World',
    hi: 'अपनी कला को दुनिया के साथ साझा करें',
    mr: 'तुमची कला जगासोबत सामायिक करा'
  },
  uploadMedia: {
    en: 'Upload Image or Video',
    hi: 'छवि या वीडियो अपलोड करें',
    mr: 'प्रतिमा किंवा व्हिडिओ अपलोड करा'
  },
  recordVoice: {
    en: 'Record Voice Story',
    hi: 'आवाज कहानी रिकॉर्ड करें',
    mr: 'आवाज कथा रेकॉर्ड करा'
  },
  selectCraft: {
    en: 'Select Craft Type',
    hi: 'शिल्प प्रकार चुनें',
    mr: 'कला प्रकार निवडा'
  },
  enableBlockchain: {
    en: 'Enable Blockchain Certificate',
    hi: 'ब्लॉकचेन प्रमाणपत्र सक्षम करें',
    mr: 'ब्लॉकचेन प्रमाणपत्र सक्षम करा'
  },
  uploadSuccess: {
    en: 'Your craft has been successfully uploaded!',
    hi: 'आपकी कला सफलतापूर्वक अपलोड हो गई है!',
    mr: 'तुमची कला यशस्वीरित्या अपलोड झाली आहे!'
  },
  // Rewards
  heritageHero: {
    en: 'Heritage Hero',
    hi: 'विरासत नायक',
    mr: 'वारसा नायक'
  },
  craftCreator: {
    en: 'Craft Creator',
    hi: 'शिल्प निर्माता',
    mr: 'कला निर्माता'
  },
  questChampion: {
    en: 'Cultural Quest Champion',
    hi: 'सांस्कृतिक खोज चैंपियन',
    mr: 'सांस्कृतिक शोध विजेता'
  },
  yourProgress: {
    en: 'Your Progress',
    hi: 'आपकी प्रगति',
    mr: 'तुमची प्रगती'
  },
  level: {
    en: 'Level',
    hi: 'स्तर',
    mr: 'स्तर'
  },
  points: {
    en: 'Points',
    hi: 'अंक',
    mr: 'गुण'
  },
  leaderboard: {
    en: 'Leaderboard',
    hi: 'लीडरबोर्ड',
    mr: 'लीडरबोर्ड'
  },
  // Community
  featureOfMonth: {
    en: 'Feature of the Month',
    hi: 'इस महीने की विशेषता',
    mr: 'महिन्याची वैशिष्ट्ये'
  },
  like: {
    en: 'Like',
    hi: 'पसंद',
    mr: 'आवडले'
  },
  comment: {
    en: 'Comment',
    hi: 'ट���प्पणी',
    mr: 'टिप्पणी'
  },
  share: {
    en: 'Share',
    hi: 'साझा करें',
    mr: 'सामायिक करा'
  },
  joinCircle: {
    en: 'Join Craft Circle',
    hi: 'क्राफ्ट सर्कल में शामिल हों',
    mr: 'क्राफ्ट सर्कलमध्ये सामील व्हा'
  },
  // Payment
  unlockFullAccess: {
    en: 'Unlock Full Access',
    hi: 'पूर्ण एक्सेस अनलॉक करें',
    mr: 'पूर्ण प्रवेश अनलॉक करा'
  },
  choosePlan: {
    en: 'Choose Your Plan',
    hi: 'अपनी योजना चुनें',
    mr: 'तुमची योजना निवडा'
  },
  monthlyPlan: {
    en: 'Monthly Plan',
    hi: 'मासिक योजना',
    mr: 'मासिक योजना'
  },
  yearlyPlan: {
    en: 'Yearly Plan',
    hi: 'वार्षिक योजना',
    mr: 'वार्षिक योजना'
  },
  subscribe: {
    en: 'Subscribe Now',
    hi: 'अभी सदस्यता लें',
    mr: 'आता सदस्यता घ्या'
  },
  accessAllCrafts: {
    en: 'Access all craft tutorials',
    hi: 'सभी शिल्प ट्यूटोरियल तक पहुंच',
    mr: 'सर्व कला ट्यूटोरियलमध्ये प्रवेश'
  },
  unlimitedAR: {
    en: 'Unlimited AR learning sessions',
    hi: 'असीमित AR सीखने के सत्र',
    mr: 'अमर्यादित AR शिक्षण सत्रे'
  },
  expertSupport: {
    en: 'Direct expert support',
    hi: 'प्रत्यक्ष विशेषज्ञ सहायता',
    mr: 'थेट तज्ञ समर्थन'
  },
  certificateAccess: {
    en: 'Blockchain certificates',
    hi: 'ब्लॉकचेन प्रमाणपत्र',
    mr: 'ब्लॉकचेन प्रमाणपत्रे'
  },
  // IoT Dashboard
  artifactHealth: {
    en: 'Artifact Health Monitoring',
    hi: 'कलाकृति स्वास्थ्य निगरानी',
    mr: 'कलाकृती आरोग्य निरीक्षण'
  },
  temperature: {
    en: 'Temperature',
    hi: 'तापमान',
    mr: 'तापमान'
  },
  humidity: {
    en: 'Humidity',
    hi: 'आर्द्रता',
    mr: 'आर्द्रता'
  },
  lightExposure: {
    en: 'Light Exposure',
    hi: 'प्रकाश जोखिम',
    mr: 'प्रकाश एक्सपोजर'
  },
  safe: {
    en: 'Safe',
    hi: 'सुरक्षित',
    mr: 'सुरक्षित'
  },
  warning: {
    en: 'Warning',
    hi: 'चेतावनी',
    mr: 'चेतावणी'
  },
  // Quests
  activeQuests: {
    en: 'Active Quests',
    hi: 'सक्रिय खोज',
    mr: 'सक्रिय शोध'
  },
  completedQuests: {
    en: 'Completed',
    hi: 'पूर्ण',
    mr: 'पूर्ण'
  },
  startQuest: {
    en: 'Start Quest',
    hi: 'खोज शुरू करें',
    mr: 'शोध सुरू करा'
  },
  // Museums
  iotSensors: {
    en: 'IoT Sensors Protecting Heritage',
    hi: 'IoT सेंसर विरासत की रक्षा कर रहे हैं',
    mr: 'IoT सेन्सर वारसा संरक्षण करत आहेत'
  }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'userTypeSelection' | 'login' | 'language' | 'payment' | 'dashboard'>('splash');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState('home');
  const [isPaid, setIsPaid] = useState(false);
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState<string | null>(null);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(0);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [blockchainEnabled, setBlockchainEnabled] = useState(false);
  const [userType, setUserType] = useState<'user' | 'artisan' | null>(null);
  
  // Login states
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Payment states
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedCraftForPurchase, setSelectedCraftForPurchase] = useState<typeof crafts[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  
  // Game states
  const [gameScore, setGameScore] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  // Craft Match game states
  const [selectedCraftItem, setSelectedCraftItem] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{craft: number, region: number}[]>([]);
  
  // Memory game states
  const [memoryCards, setMemoryCards] = useState<number[]>([]);
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<number[]>([]);
  const [memoryFirstCard, setMemoryFirstCard] = useState<number | null>(null);
  
  // Pattern game states
  const [targetPattern, setTargetPattern] = useState<number[]>([]);
  const [patternSelected, setPatternSelected] = useState<number[]>([]);

  const t = (key: string): string => {
    return translations[key]?.[selectedLanguage] || key;
  };

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setShowLanguageSelect(false);
    setIsPaid(true);
    setCurrentScreen('dashboard');
  };

  const handleSplashContinue = () => {
    setCurrentScreen('userTypeSelection');
  };

  const handleUserTypeSelection = (type: 'user' | 'artisan') => {
    setUserType(type);
    setCurrentScreen('login');
  };

  const handleLanguageContinue = () => {
    setIsPaid(true);
    setCurrentScreen('dashboard');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && email && password) {
      toast.success(`Welcome, ${userName}!`);
      setShowLanguageSelect(false);
      setCurrentScreen('language');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const handleEnterApp = () => {
    setShowLanguageSelect(false);
    setIsPaid(true);
    setCurrentScreen('dashboard');
  };

  // Calculate level based on points
  const calculateLevel = (points: number) => {
    if (points < 750) return 0;
    if (points < 1750) return 1;
    if (points < 3000) return 2;
    if (points < 4500) return 3;
    if (points < 6250) return 4;
    return Math.floor(5 + (points - 6250) / 2000);
  };

  // Calculate points needed for next level
  const getNextLevelPoints = (level: number) => {
    if (level === 0) return 750;
    if (level === 1) return 1750;
    if (level === 2) return 3000;
    if (level === 3) return 4500;
    if (level === 4) return 6250;
    return 6250 + (level - 4) * 2000;
  };

  // Calculate progress percentage to next level
  const getProgressToNextLevel = (points: number, level: number) => {
    const nextLevelPoints = getNextLevelPoints(level);
    const prevLevelPoints = level === 0 ? 0 : getNextLevelPoints(level - 1);
    const pointsInLevel = points - prevLevelPoints;
    const pointsNeeded = nextLevelPoints - prevLevelPoints;
    return Math.min(100, (pointsInLevel / pointsNeeded) * 100);
  };

  // Award points and update level
  const awardPoints = (points: number, activity: string) => {
    const newPoints = userPoints + points;
    const newLevel = calculateLevel(newPoints);
    setUserPoints(newPoints);
    
    if (newLevel > userLevel) {
      setUserLevel(newLevel);
      toast.success(`🎉 Level Up! You're now Level ${newLevel}!`, {
        description: `You earned ${points} points from ${activity}`
      });
    } else {
      toast.success(`+${points} points earned!`, {
        description: activity
      });
    }
  };

  const crafts = [
    { 
      id: 1, 
      name: t('dabuPrinting'), 
      region: t('rajasthan'), 
      image: 'https://images.unsplash.com/photo-1741275272775-67855601faed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9jayUyMHByaW50aW5nJTIwZmFicmljJTIwaW5kaWF8ZW58MXx8fHwxNzYyNTI5NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: 150,
      description: 'Learn traditional mud-resist block printing techniques'
    },
    { 
      id: 2, 
      name: t('warliArt'), 
      region: t('maharashtra'), 
      image: 'https://images.unsplash.com/photo-1759674883972-213895149db0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJsaSUyMGFydCUyMHBhaW50aW5nfGVufDF8fHx8MTc2MTM4MjcyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      price: 120,
      description: 'Master tribal art depicting village life and traditions'
    },
    { 
      id: 3, 
      name: t('chhauMasks'), 
      region: t('odisha'), 
      image: 'https://images.unsplash.com/photo-1759532044923-a63bba41da2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMG1hc2slMjBhcnR8ZW58MXx8fHwxNzYxMzgyNzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 180,
      description: 'Create traditional dance masks with expert guidance'
    },
    { 
      id: 4, 
      name: t('pattachitra'), 
      region: t('odisha'), 
      image: 'https://images.unsplash.com/photo-1575550828602-aff2b22342a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXR0YWNoaXRyYSUyMHBhaW50aW5nJTIwaW5kaWF8ZW58MXx8fHwxNzYxMzgyNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 160,
      description: 'Learn ancient scroll painting techniques from Odisha'
    },
    { 
      id: 5, 
      name: 'Kalamkari Art', 
      region: 'Andhra Pradesh', 
      image: 'https://images.unsplash.com/photo-1689413182146-14b0a9b972b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWxhbWthcmklMjBmYWJyaWMlMjBhcnR8ZW58MXx8fHwxNzYxNjU5ODgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 140,
      description: 'Explore hand-painted textile art with natural dyes'
    },
    { 
      id: 6, 
      name: 'Gond Painting', 
      region: 'Madhya Pradesh', 
      image: 'https://images.unsplash.com/photo-1739997699581-6c0f4eccb257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb25kJTIwdHJpYmFsJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzYxNjU5ODgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 135,
      description: 'Learn vibrant tribal art forms depicting nature'
    },
    { 
      id: 7, 
      name: 'Tanjore Painting', 
      region: 'Tamil Nadu', 
      image: 'https://images.unsplash.com/photo-1713986719312-74472fffde9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW5qb3JlJTIwcGFpbnRpbmclMjBpbmRpYW58ZW58MXx8fHwxNzYxNjU5ODgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 195,
      description: 'Master gold leaf painting techniques from South India'
    },
    { 
      id: 8, 
      name: 'Phulkari Embroidery', 
      region: 'Punjab', 
      image: 'https://images.unsplash.com/photo-1670493871596-de4abf8b5f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVsa2FyaSUyMGVtYnJvaWRlcnklMjBwdW5qYWJ8ZW58MXx8fHwxNzYxNjU5ODgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 125,
      description: 'Traditional floral embroidery from Punjab'
    }
  ];

  const rewards = [
    { id: 1, name: t('heritageHero'), icon: '🥇', earned: true },
    { id: 2, name: t('craftCreator'), icon: '🧵', earned: true },
    { id: 3, name: t('questChampion'), icon: '🎮', earned: false }
  ];

  const storeItems = [
    { id: 1, name: 'Museum Pass', cost: 1500, icon: '🏛️' },
    { id: 2, name: 'Expert Session', cost: 2500, icon: '👨‍🏫' },
    { id: 3, name: 'Craft Kit', cost: 750, icon: '🎨' },
    { id: 4, name: 'Premium Tutorial', cost: 5000, icon: '📚' }
  ];

  const quests = [
    { 
      id: 1, 
      title: 'Master Dabu Printing', 
      description: 'Complete 3 AR tutorials on block printing',
      progress: 66,
      reward: 100,
      completed: false
    },
    { 
      id: 2, 
      title: 'Heritage Explorer', 
      description: 'Visit 5 virtual museum exhibits',
      progress: 80,
      reward: 150,
      completed: false
    },
    { 
      id: 3, 
      title: 'Community Artisan', 
      description: 'Upload your first craft and get 10 likes',
      progress: 30,
      reward: 200,
      completed: false
    }
  ];

  const museums = [
    {
      id: 1,
      name: 'National Crafts Museum',
      location: 'New Delhi',
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1579824517787-acd1c2e520b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtdXNldW0lMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjEzODI3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      iotEnabled: true,
      sensors: { temp: 22, humidity: 45, light: 300 }
    },
    {
      id: 2,
      name: 'Raja Dinkar Kelkar Museum',
      location: 'Pune',
      distance: '5.8 km',
      image: 'https://images.unsplash.com/photo-1615133005831-ef94ee2ceb16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcmNoaXRlY3R1cmUlMjBpbmRpYXxlbnwxfHx8fDE3NjEzODMxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      iotEnabled: true,
      sensors: { temp: 23, humidity: 48, light: 850 }
    }
  ];

  const communityPosts = [
    {
      id: 1,
      author: 'Meera Sharma',
      avatar: '👩‍🎨',
      craft: 'Madhubani Painting',
      image: 'https://images.unsplash.com/photo-1756413696559-db19e7104c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNyYWZ0c21hbiUyMGFydGlzYW58ZW58MXx8fHwxNzYxMzgyNzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'My latest Madhubani painting inspired by nature',
      likes: 234,
      comments: 45,
      time: '2 hours ago'
    },
    {
      id: 2,
      author: 'Rajesh Kumar',
      avatar: '👨‍🎨',
      craft: 'Warli Art',
      image: 'https://images.unsplash.com/photo-1759674883972-213895149db0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJsaSUyMGFydCUyMHBhaW50aW5nfGVufDF8fHx8MTc2MTM4MjcyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Traditional Warli art depicting village life',
      likes: 189,
      comments: 32,
      time: '5 hours ago'
    }
  ];

  const quizQuestions = [
    { question: 'Which state is famous for Warli Art?', options: ['Rajasthan', 'Maharashtra', 'Gujarat', 'Kerala'], correct: 1 },
    { question: 'What is Dabu Printing known for?', options: ['Mud-resist technique', 'Gold embroidery', 'Stone carving', 'Wood painting'], correct: 0 },
    { question: 'Pattachitra originated in which state?', options: ['Karnataka', 'Tamil Nadu', 'Odisha', 'West Bengal'], correct: 2 },
  ];

  // Splash Screen
  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-[#E65100] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full border-4 border-[#283593] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rotate-45 border-4 border-[#00796B] animate-spin" style={{ animationDuration: '10s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-[#F9A825] to-[#6A1B9A] animate-bounce" style={{ animationDuration: '3s' }}></div>
        </div>

        <div className="text-center z-10 space-y-8 animate-fade-in">
          {/* Enhanced Logo */}
          <div className="mb-8">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-2xl animate-pulse bg-black p-4">
              // Find your logo component/img tag and update the src
<img 
  src="/logo.png" 
  alt="Hybrid Heritage Guardian Logo" 
  className="w-full h-full object-contain"
/>
            </div>
            <div className="mt-4 flex gap-2 justify-center">
              <div className="w-3 h-3 rounded-full bg-[#E65100] animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-[#283593] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 rounded-full bg-[#00796B] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1>{t('appTitle')}</h1>
            <p>{t('tagline')}</p>
          </div>

          {/* Get Started Button */}
          {!showLanguageSelect ? (
            <Button
              onClick={handleSplashContinue}
              className="bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white px-10 py-7 shadow-lg transform hover:scale-105 transition-all"
              style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
            >
              Get Started <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 shadow-lg max-w-md w-full space-y-4 border border-[#E65100]/20" style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
              <p className="mb-4">
                {t('chooseLanguage')} / अपनी भाषा चुनें
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => handleLanguageSelect('en')}
                  className="w-full bg-white hover:bg-[#FFF4E1] border-2 border-[#283593] py-7 transform hover:scale-105 transition-all shadow-sm"
                  variant="outline"
                  style={{ borderRadius: '8px' }}
                >
                  <span className="text-2xl mr-2">🇬🇧</span> English
                </Button>
                <Button
                  onClick={() => handleLanguageSelect('hi')}
                  className="w-full bg-white hover:bg-[#FFF4E1] border-2 border-[#283593] py-7 transform hover:scale-105 transition-all shadow-sm"
                  variant="outline"
                  style={{ borderRadius: '8px' }}
                >
                  <span className="text-2xl mr-2">🇮🇳</span> हिन्दी
                </Button>
                <Button
                  onClick={() => handleLanguageSelect('mr')}
                  className="w-full bg-white hover:bg-[#FFF4E1] border-2 border-[#283593] py-7 transform hover:scale-105 transition-all shadow-sm"
                  variant="outline"
                  style={{ borderRadius: '8px' }}
                >
                  <span className="text-2xl mr-2">🇮🇳</span> मराठी
                </Button>
              </div>
              <Button
                onClick={handleLanguageContinue}
                className="w-full bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white py-7 mt-4 shadow-lg transform hover:scale-105 transition-all"
                style={{ borderRadius: '8px' }}
              >
                Continue <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // User Type Selection Screen
  if (currentScreen === 'userTypeSelection') {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-[#E65100] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full border-4 border-[#283593] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rotate-45 border-4 border-[#00796B] animate-spin" style={{ animationDuration: '10s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-[#F9A825] to-[#6A1B9A] animate-bounce" style={{ animationDuration: '3s' }}></div>
        </div>

        {/* Back Button */}
        <Button
          onClick={() => setCurrentScreen('splash')}
          variant="ghost"
          className="absolute top-6 left-6 z-20 text-[#283593] hover:text-[#E65100] hover:bg-[#FFF4E1]"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </Button>

        <div className="text-center z-10 w-full max-w-2xl space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg bg-black p-3" style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
              <img 
  src="/logo.png" 
  alt="Hybrid Heritage Guardian Logo" 
  className="w-full h-full object-contain"
/>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="mb-3">
              {t('selectUserType')}
            </h1>
            <p className="text-[#6A1B9A]">
              {t('userTypeDescription')}
            </p>
          </div>

          {/* User Type Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Heritage Explorer Card */}
            <Card 
              className={`p-8 cursor-pointer transition-all hover:scale-105 border-2 ${
                userType === 'user' 
                  ? 'border-[#E65100] bg-gradient-to-br from-[#FFF4E1] to-[#FFE8CC] shadow-xl' 
                  : 'border-[#E65100]/30 bg-white hover:border-[#E65100]/50'
              }`}
              onClick={() => setUserType('user')}
              style={{ borderRadius: '8px', boxShadow: userType === 'user' ? '0 4px 12px rgba(230, 81, 0, 0.2)' : '0 2px 6px rgba(0, 0, 0, 0.08)' }}
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#E65100] to-[#FF8A00] rounded-full flex items-center justify-center shadow-lg">
                  <UserCircle2 className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-[#283593] mb-2">{t('normalUser')}</h3>
                  <p className="text-sm text-[#6A1B9A]">
                    {t('normalUserDesc')}
                  </p>
                </div>
                {userType === 'user' && (
                  <div className="flex items-center justify-center gap-2 text-[#E65100]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm">Selected</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  <Badge className="bg-[#00796B] text-white text-xs">Learn</Badge>
                  <Badge className="bg-[#F9A825] text-white text-xs">Explore</Badge>
                  <Badge className="bg-[#6A1B9A] text-white text-xs">Rewards</Badge>
                </div>
              </div>
            </Card>

            {/* Master Artisan Card */}
            <Card 
              className={`p-8 cursor-pointer transition-all hover:scale-105 border-2 ${
                userType === 'artisan' 
                  ? 'border-[#283593] bg-gradient-to-br from-[#E8EAF6] to-[#C5CAE9] shadow-xl' 
                  : 'border-[#283593]/30 bg-white hover:border-[#283593]/50'
              }`}
              onClick={() => setUserType('artisan')}
              style={{ borderRadius: '8px', boxShadow: userType === 'artisan' ? '0 4px 12px rgba(40, 53, 147, 0.2)' : '0 2px 6px rgba(0, 0, 0, 0.08)' }}
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#283593] to-[#3F51B5] rounded-full flex items-center justify-center shadow-lg">
                  <Brush className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-[#283593] mb-2">{t('artisan')}</h3>
                  <p className="text-sm text-[#6A1B9A]">
                    {t('artisanDesc')}
                  </p>
                </div>
                {userType === 'artisan' && (
                  <div className="flex items-center justify-center gap-2 text-[#283593]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm">Selected</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  <Badge className="bg-[#E65100] text-white text-xs">Teach</Badge>
                  <Badge className="bg-[#00796B] text-white text-xs">Create</Badge>
                  <Badge className="bg-[#F9A825] text-white text-xs">Preserve</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="mt-8">
            <Button
              onClick={() => userType && handleUserTypeSelection(userType)}
              disabled={!userType}
              className={`px-12 py-7 shadow-lg transform transition-all ${
                userType 
                  ? 'bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white hover:scale-105' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{ borderRadius: '8px' }}
            >
              {t('continueAs')} <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
        <Toaster />
      </div>
    );
  }

  // Login Screen
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-[#E65100] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full border-4 border-[#283593] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rotate-45 border-4 border-[#00796B] animate-spin" style={{ animationDuration: '10s' }}></div>
        </div>

        <div className="text-center z-10 w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg bg-black p-3" style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
              <img 
  src="/logo.png" 
  alt="Hybrid Heritage Guardian Logo" 
  className="w-full h-full object-contain"
/>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-6">
            <h1 className="mb-2">
              Welcome {userType === 'artisan' ? 'Master Artisan' : 'Heritage Explorer'}
            </h1>
            <p>Login to continue your heritage journey</p>
            {userType && (
              <Badge className={`mt-3 ${
                userType === 'artisan' 
                  ? 'bg-gradient-to-r from-[#283593] to-[#3F51B5]' 
                  : 'bg-gradient-to-r from-[#E65100] to-[#FF8A00]'
              } text-white`}>
                {userType === 'artisan' ? '🎨 Artisan Account' : '🏛️ Explorer Account'}
              </Badge>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="bg-[#FFF4E1] backdrop-blur-md p-8 shadow-lg space-y-6 border border-[#E65100]/20" style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border-2 border-[#E65100]/30 focus:border-[#E65100] py-6"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-[#E65100]/30 focus:border-[#E65100] py-6"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-[#E65100]/30 focus:border-[#E65100] py-6"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[#E65100]/30" />
                Remember me
              </label>
              <a href="#" className="text-[#E65100] hover:text-[#D64A00]">Forgot password?</a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white py-7 shadow-lg transform hover:scale-105 transition-all"
              style={{ borderRadius: '8px' }}
            >
              Login <ChevronRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="text-center text-sm">
              Don't have an account? <a href="#" className="text-[#E65100] hover:underline">Sign up</a>
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    );
  }

  // Language Selection Screen
  if (currentScreen === 'language') {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-[#E65100] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full border-4 border-[#283593] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rotate-45 border-4 border-[#00796B] animate-spin" style={{ animationDuration: '10s' }}></div>
        </div>

        <div className="text-center z-10 space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg bg-black p-3" style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
              <img 
  src="/logo.png" 
  alt="Hybrid Heritage Guardian Logo" 
  className="w-full h-full object-contain"
/>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-6">
            <h1 className="mb-2">
              Welcome, {userName}!
            </h1>
            <p>Choose your preferred language</p>
          </div>

          {/* Language Selection */}
          <div className="bg-[#FFF4E1] backdrop-blur-md p-8 shadow-lg max-w-md w-full space-y-4 border border-[#E65100]/20" style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
            <p className="mb-4">
              {t('chooseLanguage')} / अपनी भाषा चुनें
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => handleLanguageSelect('en')}
                className="w-full bg-white hover:bg-[#FFF4E1] border-2 border-[#283593] py-7 transform hover:scale-105 transition-all shadow-sm"
                variant="outline"
                style={{ borderRadius: '8px' }}
              >
                <span className="text-2xl mr-2">🇬🇧</span> English
              </Button>
              <Button
                onClick={() => handleLanguageSelect('hi')}
                className="w-full bg-white hover:bg-[#FFF4E1] border-2 border-[#283593] py-7 transform hover:scale-105 transition-all shadow-sm"
                variant="outline"
                style={{ borderRadius: '8px' }}
              >
                <span className="text-2xl mr-2">🇮🇳</span> हिन्दी
              </Button>
              <Button
                onClick={() => handleLanguageSelect('mr')}
                className="w-full bg-white hover:bg-[#FFF4E1] border-2 border-[#283593] py-7 transform hover:scale-105 transition-all shadow-sm"
                variant="outline"
                style={{ borderRadius: '8px' }}
              >
                <span className="text-2xl mr-2">🇮🇳</span> मराठी
              </Button>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-[#FFFDF8]">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-[#E65100]/20 sticky top-0 z-50 shadow-sm" style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm bg-black p-2">
              <img 
  src="/logo.png" 
  alt="Hybrid Heritage Guardian Logo" 
  className="w-full h-full object-contain"
/>
            </div>
          </div>
          <Select value={selectedLanguage} onValueChange={(val) => setSelectedLanguage(val as Language)}>
            <SelectTrigger className="w-36 border-2 border-[#283593]/30 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="hi">🇮🇳 हिन्दी</SelectItem>
              <SelectItem value="mr">🇮🇳 मराठी</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Feature Tiles with enhanced design */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
                <Card
                  onClick={() => setActiveTab('learn')}
                  className="bg-[#FFF4E1] border border-[#E65100]/30 p-6 hover:shadow-lg cursor-pointer transition-all hover:scale-105 transform"
                  style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#E65100] to-[#FF8A00] flex items-center justify-center shadow-sm transform hover:rotate-12 transition-transform" style={{ borderRadius: '8px' }}>
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <p>{t('exploreHeritage')}</p>
                  </div>
                </Card>

                <Card
                  onClick={() => setActiveTab('quests')}
                  className="bg-[#FFF4E1] border border-[#F9A825]/30 p-6 hover:shadow-lg cursor-pointer transition-all hover:scale-105 transform"
                  style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#F9A825] to-[#FFB84D] flex items-center justify-center shadow-sm transform hover:rotate-12 transition-transform" style={{ borderRadius: '8px' }}>
                      <Medal className="w-8 h-8 text-white" />
                    </div>
                    <p>{t('culturalQuests')}</p>
                  </div>
                </Card>

                <Card
                  onClick={() => setActiveTab('museums')}
                  className="bg-[#FFF4E1] border border-[#283593]/30 p-6 hover:shadow-lg cursor-pointer transition-all hover:scale-105 transform"
                  style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#283593] to-[#3F51B5] flex items-center justify-center shadow-sm transform hover:rotate-12 transition-transform" style={{ borderRadius: '8px' }}>
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <p>{t('museumsNearby')}</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Additional Quick Access Tiles */}
            <div className="grid grid-cols-2 gap-4">
              <Card
                onClick={() => setActiveTab('rewards')}
                className="bg-gradient-to-r from-[#E65100] to-[#FF8A00] border-none p-6 hover:shadow-lg cursor-pointer transition-all hover:scale-105 transform"
                style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-sm" style={{ borderRadius: '8px' }}>
                    <ShoppingBag className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-white flex-1">
                    <p className="opacity-90 text-sm">{t('rewardStore')}</p>
                    <p className="text-xs opacity-75">{userPoints} {t('points')}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white" />
                </div>
              </Card>

              <Card
                onClick={() => setActiveTab('community')}
                className="bg-gradient-to-r from-[#00796B] to-[#26A69A] border-none p-6 hover:shadow-lg cursor-pointer transition-all hover:scale-105 transform"
                style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-sm" style={{ borderRadius: '8px' }}>
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-white flex-1">
                    <p className="opacity-90 text-sm">{t('communityHub')}</p>
                    <p className="text-xs opacity-75">Join discussions</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white" />
                </div>
              </Card>
            </div>

            {/* For Artisans Section - Only visible for Master Artisans */}
            {userType === 'artisan' && (
              <Card className="bg-gradient-to-br from-[#E8EAF6] to-[#F3E5F5] border-2 border-[#283593]/30 p-6 shadow-lg" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(40, 53, 147, 0.15)' }}>
                <div className="flex items-center gap-2 mb-6">
                  <Brush className="w-7 h-7 text-[#283593]" />
                  <h2 className="text-[#283593]">For Artisans</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Upload Your Work */}
                  <Card 
                    className="bg-white border-2 border-[#283593]/20 p-5 hover:shadow-lg cursor-pointer transition-all hover:scale-105 transform"
                    onClick={() => setActiveTab('upload')}
                    style={{ borderRadius: '8px' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#283593] to-[#3F51B5] rounded-lg flex items-center justify-center shadow-md">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#283593] mb-1">Share Your Craft</h4>
                        <p className="text-sm text-[#6A1B9A]">Upload your work with blockchain certificate</p>
                      </div>
                    </div>
                  </Card>

                  {/* Teaching Dashboard */}
                  <Card 
                    className="bg-white border-2 border-[#283593]/20 p-5 hover:shadow-lg cursor-pointer transition-all hover:scale-105 transform"
                    style={{ borderRadius: '8px' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#6A1B9A] to-[#8E24AA] rounded-lg flex items-center justify-center shadow-md">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#283593] mb-1">Teaching Dashboard</h4>
                        <p className="text-sm text-[#6A1B9A]">Manage your tutorials & students</p>
                      </div>
                    </div>
                  </Card>

                  {/* Your Followers */}
                  <Card 
                    className="bg-white border-2 border-[#283593]/20 p-5 hover:shadow-lg cursor-pointer transition-all hover:scale-105 transform"
                    style={{ borderRadius: '8px' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00796B] to-[#26A69A] rounded-lg flex items-center justify-center shadow-md">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#283593] mb-1">Your Followers</h4>
                        <p className="text-sm text-[#6A1B9A]">1,247 heritage enthusiasts</p>
                      </div>
                    </div>
                  </Card>

                  {/* Blockchain Certificates */}
                  <Card 
                    className="bg-white border-2 border-[#283593]/20 p-5 hover:shadow-lg cursor-pointer transition-all hover:scale-105 transform"
                    style={{ borderRadius: '8px' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#F9A825] to-[#FFB300] rounded-lg flex items-center justify-center shadow-md">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#283593] mb-1">Certificates</h4>
                        <p className="text-sm text-[#6A1B9A]">23 blockchain-protected works</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Artisan Stats */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-[#283593]/20" style={{ borderRadius: '8px' }}>
                    <div className="text-2xl text-[#283593] mb-1">156</div>
                    <p className="text-xs text-[#6A1B9A]">Works Uploaded</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-[#283593]/20" style={{ borderRadius: '8px' }}>
                    <div className="text-2xl text-[#283593] mb-1">3.2k</div>
                    <p className="text-xs text-[#6A1B9A]">Students Taught</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-[#283593]/20" style={{ borderRadius: '8px' }}>
                    <div className="text-2xl text-[#283593] mb-1">4.8★</div>
                    <p className="text-xs text-[#6A1B9A]">Average Rating</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Featured Craft with enhanced design - For all users */}
            <Card className="bg-[#FFF4E1] border border-[#E65100]/20 p-6 shadow-lg" style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-[#E65100] animate-pulse" />
                <h3>{t('featureOfMonth')}</h3>
              </div>
              <div className="aspect-video mb-4 overflow-hidden group" style={{ borderRadius: '8px', backgroundColor: '#FFF4E1' }}>
                <ImageWithFallback 
                  src={crafts[0].image} 
                  alt={t('dabuPrinting')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="mb-2">{t('dabuPrinting')}</p>
              <p className="text-sm mb-4">Traditional mud-resist block printing from {t('rajasthan')}</p>
              <Button className="w-full bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white shadow-sm transform hover:scale-105 transition-all" style={{ borderRadius: '8px' }}>
                <Play className="w-4 h-4 mr-2" />
                {t('startAR')}
              </Button>
            </Card>
          </div>
        )}

        {/* Learn/Explore Tab - Enhanced */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#E65100] w-5 h-5" />
              <Input
                placeholder={t('searchPlaceholder')}
                className="pl-12 py-7 bg-white border-2 border-[#E65100]/30 shadow-sm"
                style={{ borderRadius: '8px' }}
              />
            </div>

            {/* Crafts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {crafts.map((craft) => (
                <Card
                  key={craft.id}
                  className="bg-[#FFF4E1] border border-[#E65100]/20 overflow-hidden hover:shadow-lg transition-all transform hover:scale-105"
                  style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="aspect-video overflow-hidden group relative" style={{ backgroundColor: '#FFF4E1' }}>
                    <ImageWithFallback 
                      src={craft.image} 
                      alt={craft.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-[#00796B] to-[#26A69A] text-white shadow-sm px-3 py-1.5 text-lg">
                        ₹{craft.price}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="mb-1">{craft.name}</h3>
                      <p className="text-sm mb-2">{craft.region}</p>
                      <p className="text-xs">{craft.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedCraft(craft.name)}
                        className="flex-1 bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white shadow-sm transform hover:scale-105 transition-all"
                        style={{ borderRadius: '8px' }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        onClick={() => {
                          setSelectedCraftForPurchase(craft);
                          setShowPaymentDialog(true);
                        }}
                        className="flex-1 bg-gradient-to-r from-[#00796B] to-[#26A69A] hover:from-[#006B5F] hover:to-[#00796B] text-white shadow-sm transform hover:scale-105 transition-all"
                        style={{ borderRadius: '8px' }}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Purchase
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* AR Learning Modal */}
            {selectedCraft && (
              <Dialog open={!!selectedCraft} onOpenChange={() => setSelectedCraft(null)}>
                <DialogContent className="max-w-2xl bg-[#FFF4E1] border border-[#E65100]/20" style={{ borderRadius: '8px' }}>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Camera className="w-6 h-6" />
                      {t('arLearningZone')}
                    </DialogTitle>
                    <DialogDescription>{selectedCraft}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* AR Camera View */}
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden shadow-sm" style={{ borderRadius: '8px' }}>
                      <Camera className="w-16 h-16 text-white/30 animate-pulse" />
                      <div className="absolute inset-0 border-4 border-[#E65100]/50 m-8 animate-pulse" style={{ borderRadius: '8px' }}></div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-white backdrop-blur-sm p-5 space-y-3 border border-[#E65100]/20 shadow-sm" style={{ borderRadius: '8px' }}>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#E65100] to-[#FF8A00] flex items-center justify-center text-white flex-shrink-0 shadow-sm" style={{ borderRadius: '8px' }}>
                          1
                        </div>
                        <p className="text-sm">{t('step1')}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#E65100] to-[#FF8A00] flex items-center justify-center text-white flex-shrink-0 shadow-sm" style={{ borderRadius: '8px' }}>
                          2
                        </div>
                        <p className="text-sm">{t('step2')}</p>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-[#E65100] to-[#FF8A00] hover:from-[#D64A00] hover:to-[#E65100] text-white shadow-sm transform hover:scale-105 transition-all" style={{ borderRadius: '8px' }}>
                        <Volume2 className="w-4 h-4 mr-2" />
                        {t('voiceGuide')}
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-[#F9A825] to-[#FFB84D] hover:from-[#E8970D] hover:to-[#F9A825] text-white shadow-sm transform hover:scale-105 transition-all" style={{ borderRadius: '8px' }}>
                        <Video className="w-4 h-4 mr-2" />
                        {t('recordProgress')}
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-[#00796B] to-[#26A69A] hover:from-[#006B5F] hover:to-[#00796B] text-white shadow-sm transform hover:scale-105 transition-all" style={{ borderRadius: '8px' }}>
                        <HelpCircle className="w-4 h-4 mr-2" />
                        {t('askExpert')}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}

        {/* Cultural Quests Tab - Enhanced Interactive Games */}
        {activeTab === 'quests' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-[#6A1B9A] to-[#9C27B0] border-none p-6 text-white shadow-lg" style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-sm animate-pulse" style={{ borderRadius: '8px' }}>
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="mb-1">{t('culturalQuests')}</h2>
                  <p className="opacity-90 text-sm">Complete quests and play games to earn rewards!</p>
                </div>
              </div>
            </Card>

            {/* Interactive Games Section - Enhanced */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E65100]" />
                Interactive Games
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card 
                  onClick={() => {
                    setSelectedGame('match');
                    setGameScore(0);
                    setMatchedPairs([]);
                  }}
                  className="bg-[#FFF4E1] border border-[#E65100]/30 p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 transform"
                  style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#E65100] to-[#FF8A00] flex items-center justify-center shadow-sm transform hover:rotate-12 transition-transform" style={{ borderRadius: '8px' }}>
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">Craft Match Game</h3>
                      <p className="text-sm">Match crafts with their regions</p>
                      <Badge className="mt-2 bg-gradient-to-r from-[#E65100] to-[#FF8A00] text-white shadow-sm">
                        <Star className="w-3 h-3 mr-1" />
                        +50 points
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card 
                  onClick={() => {
                    setSelectedGame('quiz');
                    setQuizQuestion(0);
                    setGameScore(0);
                    setSelectedAnswer(null);
                  }}
                  className="bg-[#FFF4E1] border border-[#283593]/30 p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 transform"
                  style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#283593] to-[#3F51B5] flex items-center justify-center shadow-sm transform hover:rotate-12 transition-transform" style={{ borderRadius: '8px' }}>
                      <HelpCircle className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">Heritage Quiz</h3>
                      <p className="text-sm">Test your cultural knowledge</p>
                      <Badge className="mt-2 bg-gradient-to-r from-[#283593] to-[#3F51B5] text-white shadow-sm">
                        <Star className="w-3 h-3 mr-1" />
                        +75 points
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card 
                  onClick={() => {
                    setSelectedGame('pattern');
                    setPatternSelected([]);
                    setGameScore(0);
                    // Generate random target pattern
                    const pattern = [];
                    for (let i = 0; i < 8; i++) {
                      pattern.push(Math.floor(Math.random() * 16));
                    }
                    setTargetPattern(pattern);
                  }}
                  className="bg-[#FFF4E1] border border-[#00796B]/30 p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 transform"
                  style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#00796B] to-[#26A69A] flex items-center justify-center shadow-sm transform hover:rotate-12 transition-transform" style={{ borderRadius: '8px' }}>
                      <Palette className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">Pattern Master</h3>
                      <p className="text-sm">Recreate traditional patterns</p>
                      <Badge className="mt-2 bg-gradient-to-r from-[#00796B] to-[#26A69A] text-white shadow-sm">
                        <Star className="w-3 h-3 mr-1" />
                        +100 points
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card 
                  onClick={() => {
                    setSelectedGame('memory');
                    setMemoryFlipped([]);
                    setMemoryMatched([]);
                    setMemoryFirstCard(null);
                    setGameScore(0);
                    // Create pairs of cards (8 pairs = 16 cards)
                    const cards = [...Array(8)].flatMap((_, i) => [i, i]);
                    // Shuffle cards
                    setMemoryCards(cards.sort(() => Math.random() - 0.5));
                  }}
                  className="bg-[#FFF4E1] border border-[#F9A825]/30 p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 transform"
                  style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#F9A825] to-[#FFB84D] flex items-center justify-center shadow-sm transform hover:rotate-12 transition-transform" style={{ borderRadius: '8px' }}>
                      <Star className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">Memory Challenge</h3>
                      <p className="text-sm">Remember craft details</p>
                      <Badge className="mt-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md">
                        <Star className="w-3 h-3 mr-1" />
                        +60 points
                      </Badge>
                    </div>
                  </div>
                </Card>

              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-amber-900">{t('activeQuests')}</h3>
              {quests.map((quest) => (
                <Card key={quest.id} className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-amber-900 mb-1">{quest.title}</h3>
                        <p className="text-amber-600 text-sm">{quest.description}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-amber-700">Progress</span>
                          <span className="text-amber-900">{quest.progress}%</span>
                        </div>
                        <Progress value={quest.progress} className="h-3 shadow-inner" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md">
                          <Gift className="w-3 h-3 mr-1" />
                          +{quest.reward} points
                        </Badge>
                        <Button size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg transform hover:scale-105 transition-all">
                          {quest.progress < 100 ? t('startQuest') : t('completedQuests')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Enhanced Game Modals */}
            {selectedGame && (
              <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
                <DialogContent className="max-w-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
                  <DialogHeader>
                    <DialogTitle className="text-amber-900 flex items-center gap-2">
                      {selectedGame === 'match' && <><Target className="w-6 h-6" /> Craft Match Game</>}
                      {selectedGame === 'quiz' && <><HelpCircle className="w-6 h-6" /> Heritage Quiz</>}
                      {selectedGame === 'pattern' && <><Palette className="w-6 h-6" /> Pattern Master</>}
                      {selectedGame === 'memory' && <><Star className="w-6 h-6" /> Memory Challenge</>}
                    </DialogTitle>
                    <DialogDescription className="text-amber-700">
                      Test your knowledge and earn rewards!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Match Game */}
                    {selectedGame === 'match' && (
                      <CraftMatchGame
                        selectedCraftItem={selectedCraftItem}
                        setSelectedCraftItem={setSelectedCraftItem}
                        matchedPairs={matchedPairs}
                        setMatchedPairs={setMatchedPairs}
                        gameScore={gameScore}
                        setGameScore={setGameScore}
                        onComplete={() => {
                          awardPoints(50, 'Craft Match Game');
                          setSelectedGame(null);
                          setMatchedPairs([]);
                          setGameScore(0);
                          setSelectedCraftItem(null);
                        }}
                      />
                    )}

                    {/* Quiz Game */}
                    {selectedGame === 'quiz' && quizQuestion < quizQuestions.length && (
                      <div className="space-y-4">
                        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-lg">
                          <div className="flex justify-between items-center mb-4">
                            <Badge className="bg-amber-100 text-amber-900">Question {quizQuestion + 1} of {quizQuestions.length}</Badge>
                            <span className="text-sm text-amber-600">Score: {gameScore}</span>
                          </div>
                          <p className="text-amber-900 mb-4">{quizQuestions[quizQuestion].question}</p>
                          <div className="space-y-3">
                            {quizQuestions[quizQuestion].options.map((option, i) => (
                              <Button
                                key={i}
                                onClick={() => setSelectedAnswer(i)}
                                variant="outline"
                                className={`w-full justify-start border-2 transition-all transform hover:scale-105 ${
                                  selectedAnswer === i
                                    ? i === quizQuestions[quizQuestion].correct
                                      ? 'border-green-500 bg-green-50'
                                      : 'border-red-500 bg-red-50'
                                    : 'border-amber-300 hover:bg-amber-50'
                                }`}
                              >
                                {String.fromCharCode(65 + i)}) {option}
                                {selectedAnswer === i && i === quizQuestions[quizQuestion].correct && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                                )}
                                {selectedAnswer === i && i !== quizQuestions[quizQuestion].correct && (
                                  <X className="w-5 h-5 text-red-600 ml-auto" />
                                )}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button
                            onClick={() => {
                              setQuizQuestion(0);
                              setGameScore(0);
                              setSelectedAnswer(null);
                            }}
                            variant="outline"
                            className="border-2 border-amber-300"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restart
                          </Button>
                          <Button
                            onClick={() => {
                              if (selectedAnswer === quizQuestions[quizQuestion].correct) {
                                setGameScore(gameScore + 25);
                              }
                              if (quizQuestion < quizQuestions.length - 1) {
                                setQuizQuestion(quizQuestion + 1);
                                setSelectedAnswer(null);
                              } else {
                                const finalScore = selectedAnswer === quizQuestions[quizQuestion].correct ? gameScore + 25 : gameScore;
                                awardPoints(75, 'Heritage Quiz');
                                setSelectedGame(null);
                                setQuizQuestion(0);
                                setGameScore(0);
                                setSelectedAnswer(null);
                              }
                            }}
                            disabled={selectedAnswer === null}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg transform hover:scale-105 transition-all"
                          >
                            {quizQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Pattern Game */}
                    {selectedGame === 'pattern' && (
                      <PatternGame
                        targetPattern={targetPattern}
                        patternSelected={patternSelected}
                        setPatternSelected={setPatternSelected}
                        onComplete={() => {
                          awardPoints(100, 'Pattern Master');
                          setSelectedGame(null);
                          setPatternSelected([]);
                        }}
                        onReset={() => {
                          setPatternSelected([]);
                        }}
                      />
                    )}

                    {/* Memory Game */}
                    {selectedGame === 'memory' && (
                      <MemoryGame
                        memoryCards={memoryCards}
                        memoryFlipped={memoryFlipped}
                        setMemoryFlipped={setMemoryFlipped}
                        memoryMatched={memoryMatched}
                        setMemoryMatched={setMemoryMatched}
                        memoryFirstCard={memoryFirstCard}
                        setMemoryFirstCard={setMemoryFirstCard}
                        gameScore={gameScore}
                        setGameScore={setGameScore}
                        onComplete={() => {
                          awardPoints(60, 'Memory Challenge');
                          setSelectedGame(null);
                          setMemoryFlipped([]);
                          setMemoryMatched([]);
                          setMemoryFirstCard(null);
                          setGameScore(0);
                        }}
                        onReset={() => {
                          setMemoryFlipped([]);
                          setMemoryMatched([]);
                          setMemoryFirstCard(null);
                          setGameScore(0);
                          const cards = [...Array(8)].flatMap((_, i) => [i, i]);
                          setMemoryCards(cards.sort(() => Math.random() - 0.5));
                        }}
                      />
                    )}

                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}

        {/* Museums Tab - same as before but with enhanced styling */}
        {activeTab === 'museums' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 border-2 border-purple-700 p-6 text-white shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="mb-1">{t('museumsNearby')}</h2>
                  <p className="opacity-90 text-sm">{t('iotSensors')}</p>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              {museums.map((museum) => (
                <Card key={museum.id} className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 overflow-hidden shadow-xl">
                  <div className="aspect-video bg-gradient-to-br from-purple-200 to-indigo-200 overflow-hidden group">
                    <ImageWithFallback 
                      src={museum.image} 
                      alt={museum.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-amber-900 mb-2">{museum.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-amber-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{museum.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{museum.distance}</span>
                        </div>
                      </div>
                    </div>

                    {museum.iotEnabled && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Activity className="w-5 h-5 text-purple-600" />
                          <span className="text-purple-900">{t('artifactHealth')}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className={`${museum.sensors.temp > 24 ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-300' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'} border-2 rounded-xl p-3 shadow-lg`}>
                            <div className="flex items-center gap-2 mb-1">
                              <Thermometer className={`w-4 h-4 ${museum.sensors.temp > 24 ? 'text-red-600' : 'text-green-600'}`} />
                              <span className={`text-xs ${museum.sensors.temp > 24 ? 'text-red-900' : 'text-green-900'}`}>{t('temperature')}</span>
                            </div>
                            <p className={`${museum.sensors.temp > 24 ? 'text-red-900' : 'text-green-900'}`}>{museum.sensors.temp}°C</p>
                            <Badge className={`mt-2 ${museum.sensors.temp > 24 ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-green-600 to-green-700'} text-white text-xs shadow-md`}>
                              {museum.sensors.temp > 24 ? t('warning') : t('safe')}
                            </Badge>
                          </div>
                          <div className={`${museum.sensors.humidity > 50 ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-300' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'} border-2 rounded-xl p-3 shadow-lg`}>
                            <div className="flex items-center gap-2 mb-1">
                              <Droplet className={`w-4 h-4 ${museum.sensors.humidity > 50 ? 'text-red-600' : 'text-green-600'}`} />
                              <span className={`text-xs ${museum.sensors.humidity > 50 ? 'text-red-900' : 'text-green-900'}`}>{t('humidity')}</span>
                            </div>
                            <p className={`${museum.sensors.humidity > 50 ? 'text-red-900' : 'text-green-900'}`}>{museum.sensors.humidity}%</p>
                            <Badge className={`mt-2 ${museum.sensors.humidity > 50 ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-green-600 to-green-700'} text-white text-xs shadow-md`}>
                              {museum.sensors.humidity > 50 ? t('warning') : t('safe')}
                            </Badge>
                          </div>
                          <div className={`${museum.sensors.light > 500 ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-300' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'} border-2 rounded-xl p-3 shadow-lg`}>
                            <div className="flex items-center gap-2 mb-1">
                              <Sun className={`w-4 h-4 ${museum.sensors.light > 500 ? 'text-red-600' : 'text-green-600'}`} />
                              <span className={`text-xs ${museum.sensors.light > 500 ? 'text-red-900' : 'text-green-900'}`}>{t('lightExposure')}</span>
                            </div>
                            <p className={`${museum.sensors.light > 500 ? 'text-red-900' : 'text-green-900'}`}>{museum.sensors.light} lux</p>
                            <Badge className={`mt-2 ${museum.sensors.light > 500 ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-green-600 to-green-700'} text-white text-xs shadow-md`}>
                              {museum.sensors.light > 500 ? t('warning') : t('safe')}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl shadow-lg">
                          <div className="flex items-start gap-2">
                            <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-purple-900">
                              <p className="mb-1">How IoT Sensors Help:</p>
                              <ul className="space-y-1 text-xs opacity-90">
                                <li className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Real-time monitoring of artifact conditions
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Automatic alerts for unsafe environments
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Prevention of damage from heat, humidity & light
                                </li>
                                <li className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Historical data tracking for preservation
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white shadow-lg transform hover:scale-105 transition-all">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Community Hub Tab */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 border-2 border-teal-700 p-6 text-white shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="mb-1">{t('communityHub')}</h2>
                  <p className="opacity-90 text-sm">Connect with artisans and learners</p>
                </div>
              </div>
            </Card>

            {/* Featured Banner */}
            <Card className="bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 border-2 border-amber-300 p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-amber-600 animate-pulse" />
                <h3 className="text-amber-900">{t('featureOfMonth')}</h3>
              </div>
              <p className="text-amber-700 text-sm mb-4">
                Exploring the intricate Warli art tradition from Maharashtra
              </p>
              <Button className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white shadow-lg transform hover:scale-105 transition-all">
                <Users className="w-4 h-4 mr-2" />
                {t('joinCircle')}
              </Button>
            </Card>

            {/* Community Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 overflow-hidden shadow-xl">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-amber-900">{post.author}</h3>
                        <p className="text-amber-600 text-sm">{post.time}</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md">{post.craft}</Badge>
                    </div>

                    <p className="text-amber-800">{post.description}</p>

                    <div className="aspect-video bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl overflow-hidden group">
                      <ImageWithFallback 
                        src={post.image} 
                        alt={post.craft}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <Button variant="ghost" className="text-amber-900 hover:text-red-600 hover:bg-red-50 transform hover:scale-110 transition-all">
                        <Heart className="w-5 h-5 mr-2" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" className="text-amber-900 hover:text-blue-600 hover:bg-blue-50 transform hover:scale-110 transition-all">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" className="text-amber-900 hover:text-green-600 hover:bg-green-50 transform hover:scale-110 transition-all">
                        <Share2 className="w-5 h-5 mr-2" />
                        {t('share')}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upload Tab - Only for Artisans */}
        {activeTab === 'upload' && userType === 'artisan' && (
          <div className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-[#283593]/30 p-8 shadow-xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Brush className="w-8 h-8 text-[#283593]" />
                <h2 className="text-[#283593] text-center">{t('shareYourCraft')}</h2>
              </div>

              <div className="space-y-6">
                {/* Upload Buttons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-32 bg-gradient-to-br from-[#E8EAF6] to-[#C5CAE9] hover:from-[#C5CAE9] hover:to-[#9FA8DA] text-[#283593] border-2 border-[#283593]/30 flex flex-col gap-2 shadow-lg transform hover:scale-105 transition-all">
                    <Camera className="w-10 h-10" />
                    <span>{t('uploadMedia')}</span>
                  </Button>
                  <Button className="h-32 bg-gradient-to-br from-[#F3E5F5] to-[#E1BEE7] hover:from-[#E1BEE7] hover:to-[#CE93D8] text-[#6A1B9A] border-2 border-[#6A1B9A]/30 flex flex-col gap-2 shadow-lg transform hover:scale-105 transition-all">
                    <Mic className="w-10 h-10" />
                    <span>{t('recordVoice')}</span>
                  </Button>
                </div>

                {/* Craft Type Selector */}
                <div className="space-y-2">
                  <label className="text-[#283593]">{t('selectCraft')}</label>
                  <Select>
                    <SelectTrigger className="border-2 border-[#283593]/30 shadow-md">
                      <SelectValue placeholder={t('selectCraft')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dabu">{t('dabuPrinting')}</SelectItem>
                      <SelectItem value="warli">{t('warliArt')}</SelectItem>
                      <SelectItem value="chhau">{t('chhauMasks')}</SelectItem>
                      <SelectItem value="patta">{t('pattachitra')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Craft Description */}
                <div className="space-y-2">
                  <label className="text-[#283593]">Description</label>
                  <Textarea
                    placeholder="Tell us about your craft..."
                    className="border-2 border-[#283593]/30 min-h-32 shadow-md"
                  />
                </div>

                {/* Blockchain Certificate */}
                <div className="bg-gradient-to-r from-[#E8EAF6] via-[#F3E5F5] to-[#FCE4EC] border-2 border-[#283593]/30 rounded-2xl p-4 flex items-center gap-4 shadow-lg">
                  <input type="checkbox" className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="text-[#283593]">{t('enableBlockchain')}</p>
                    <p className="text-[#6A1B9A] text-sm">Protect your intellectual property</p>
                  </div>
                  <Shield className="w-6 h-6 text-[#283593]" />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={() => setShowUploadSuccess(true)}
                  className="w-full bg-gradient-to-r from-[#283593] to-[#6A1B9A] hover:from-[#1A237E] hover:to-[#4A148C] text-white py-7 shadow-xl transform hover:scale-105 transition-all"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {t('upload')}
                </Button>
              </div>
            </Card>

            {/* Success Dialog */}
            <Dialog open={showUploadSuccess} onOpenChange={setShowUploadSuccess}>
              <DialogContent className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
                <DialogHeader>
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-xl animate-pulse">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  <DialogTitle className="text-green-900 text-center">{t('uploadSuccess')}</DialogTitle>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            {/* User Stats */}
            <Card className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 border-2 border-amber-700 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white">
                  <p className="opacity-90 text-sm">{t('yourProgress')}</p>
                  <h2 className="mb-1">{t('level')} {userLevel}</h2>
                  <p className="opacity-90">{userPoints} {t('points')}</p>
                </div>
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
              </div>
              <Progress value={getProgressToNextLevel(userPoints, userLevel)} className="bg-white/20 h-4 shadow-inner" />
              <p className="text-white/80 text-sm mt-2">{getNextLevelPoints(userLevel) - userPoints} points to Level {userLevel + 1}</p>
            </Card>

            {/* Badges */}
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 p-6 shadow-xl">
              <h3 className="text-amber-900 mb-4">Your Badges</h3>
              <div className="grid grid-cols-3 gap-4">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`p-5 rounded-2xl text-center transform transition-all ${
                      reward.earned
                        ? 'bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 hover:scale-110 shadow-lg'
                        : 'bg-gray-100 border-2 border-gray-300 opacity-50'
                    }`}
                  >
                    <div className="text-5xl mb-2">{reward.icon}</div>
                    <p className="text-amber-900 text-sm">{reward.name}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reward Store */}
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-6 h-6 text-amber-600" />
                <h3 className="text-amber-900">{t('rewardStore')}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {storeItems.map((item) => (
                  <Card key={item.id} className="border-2 border-amber-200 p-4 hover:shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{item.icon}</div>
                      <div className="flex-1">
                        <p className="text-amber-900">{item.name}</p>
                        <p className="text-amber-600 text-sm">{item.cost} {t('points')}</p>
                      </div>
                      <Button
                        size="sm"
                        disabled={userPoints < item.cost}
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white disabled:opacity-50 shadow-md transform hover:scale-110 transition-all"
                      >
                        <Gift className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Leaderboard */}
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 p-6 shadow-xl">
              <h3 className="text-amber-900 mb-4">{t('leaderboard')}</h3>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Priya S.', points: 1250, avatar: '👑' },
                  { rank: 2, name: 'Rahul K.', points: 980, avatar: '🥈' },
                  { rank: 3, name: 'Anita M.', points: 850, avatar: '🥉' },
                  { rank: 4, name: 'Vikram D.', points: 720, avatar: '🌟' }
                ].map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all bg-gray-50"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-amber-900">{user.name}</p>
                      <p className="text-amber-600 text-sm">{user.points} points</p>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md">
                      #{user.rank}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Profile Tab - Enhanced with Blockchain Settings */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 p-6 shadow-xl">
              <div className="text-center space-y-4">
                <div className="w-28 h-28 mx-auto bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                  <User className="w-14 h-14 text-white" />
                </div>
                <div>
                  <h2 className="text-amber-900">{userName || 'Guest User'}</h2>
                  <p className="text-amber-600">Beginner • Heritage Enthusiast</p>
                </div>
                <div className="flex justify-center gap-8 pt-4">
                  <div>
                    <p className="text-amber-900">0</p>
                    <p className="text-amber-600 text-sm">{t('level')}</p>
                  </div>
                  <div>
                    <p className="text-amber-900">0</p>
                    <p className="text-amber-600 text-sm">{t('points')}</p>
                  </div>
                  <div>
                    <p className="text-amber-900">0</p>
                    <p className="text-amber-600 text-sm">Crafts</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Blockchain Certificate Settings - Only for Master Artisan */}
            {userType === 'artisan' && (
              <Card className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-2 border-amber-300 p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-amber-600" />
                  <h3 className="text-amber-900">Blockchain Certificates</h3>
                </div>
                <p className="text-amber-700 text-sm mb-4">
                  Enable blockchain-verified certificates for all your craft uploads and achievements
                </p>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-amber-200 shadow-md">
                  <div className="flex-1">
                    <Label htmlFor="blockchain" className="text-amber-900">
                      {t('enableBlockchain')}
                    </Label>
                    <p className="text-sm text-amber-600 mt-1">
                      Protect your intellectual property with blockchain verification
                    </p>
                  </div>
                  <Switch
                    id="blockchain"
                    checked={blockchainEnabled}
                    onCheckedChange={setBlockchainEnabled}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-600 data-[state=checked]:to-orange-600"
                  />
                </div>
                {blockchainEnabled && (
                  <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-xl animate-fade-in">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <p className="text-green-900">Blockchain certificates enabled!</p>
                    </div>
                    <p className="text-sm text-green-700 mt-2">
                      All your uploads and achievements will now be verified on the blockchain
                    </p>
                  </div>
                )}
              </Card>
            )}

            <Card className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 p-6 shadow-xl">
              <h3 className="text-amber-900 mb-4">Settings</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-2 border-amber-200 text-amber-900 hover:bg-amber-50 transform hover:scale-105 transition-all">
                  <User className="w-5 h-5 mr-3" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start border-2 border-amber-200 text-amber-900 hover:bg-amber-50 transform hover:scale-105 transition-all">
                  <Globe className="w-5 h-5 mr-3" />
                  Language: {selectedLanguage === 'en' ? '🇬🇧 English' : selectedLanguage === 'hi' ? '🇮🇳 हिन्दी' : '🇮🇳 मराठी'}
                </Button>
                <Button variant="outline" className="w-full justify-start border-2 border-amber-200 text-amber-900 hover:bg-amber-50 transform hover:scale-105 transition-all">
                  <Shield className="w-5 h-5 mr-3" />
                  Privacy Settings
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Payment Dialog */}
      {showPaymentDialog && selectedCraftForPurchase && (
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-md bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
            <DialogHeader>
              <DialogTitle className="text-amber-900 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Complete Your Purchase
              </DialogTitle>
              <DialogDescription className="text-amber-700">
                Unlock full access to {selectedCraftForPurchase.name} tutorial
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Craft Summary */}
              <Card className="bg-white/95 border-2 border-amber-200 p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback 
                      src={selectedCraftForPurchase.image} 
                      alt={selectedCraftForPurchase.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-amber-900 mb-1">{selectedCraftForPurchase.name}</h4>
                    <p className="text-amber-600 text-sm mb-2">{selectedCraftForPurchase.region}</p>
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                      ₹{selectedCraftForPurchase.price}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label className="text-amber-900">Select Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <Card 
                    className={`p-4 cursor-pointer transition-all ${
                      paymentMethod === 'upi' 
                        ? 'border-2 border-green-600 bg-green-50' 
                        : 'border-2 border-amber-200 hover:bg-amber-50'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <div className="flex-1">
                        <Label htmlFor="upi" className="cursor-pointer text-amber-900 flex items-center gap-2">
                          <span className="text-xl">📱</span>
                          <div>
                            <p>UPI Payment</p>
                            <p className="text-xs text-amber-600">Google Pay, PhonePe, Paytm</p>
                          </div>
                        </Label>
                      </div>
                      {paymentMethod === 'upi' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    </div>
                  </Card>

                  <Card 
                    className={`p-4 cursor-pointer transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-2 border-green-600 bg-green-50' 
                        : 'border-2 border-amber-200 hover:bg-amber-50'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex-1">
                        <Label htmlFor="card" className="cursor-pointer text-amber-900 flex items-center gap-2">
                          <span className="text-xl">💳</span>
                          <div>
                            <p>Credit/Debit Card</p>
                            <p className="text-xs text-amber-600">Visa, Mastercard, RuPay</p>
                          </div>
                        </Label>
                      </div>
                      {paymentMethod === 'card' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    </div>
                  </Card>

                  <Card 
                    className={`p-4 cursor-pointer transition-all ${
                      paymentMethod === 'wallet' 
                        ? 'border-2 border-green-600 bg-green-50' 
                        : 'border-2 border-amber-200 hover:bg-amber-50'
                    }`}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <div className="flex-1">
                        <Label htmlFor="wallet" className="cursor-pointer text-amber-900 flex items-center gap-2">
                          <span className="text-xl">👛</span>
                          <div>
                            <p>Digital Wallet</p>
                            <p className="text-xs text-amber-600">Paytm, Amazon Pay, MobiKwik</p>
                          </div>
                        </Label>
                      </div>
                      {paymentMethod === 'wallet' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    </div>
                  </Card>

                  <Card 
                    className={`p-4 cursor-pointer transition-all ${
                      paymentMethod === 'netbanking' 
                        ? 'border-2 border-green-600 bg-green-50' 
                        : 'border-2 border-amber-200 hover:bg-amber-50'
                    }`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <div className="flex-1">
                        <Label htmlFor="netbanking" className="cursor-pointer text-amber-900 flex items-center gap-2">
                          <span className="text-xl">🏦</span>
                          <div>
                            <p>Net Banking</p>
                            <p className="text-xs text-amber-600">All major banks</p>
                          </div>
                        </Label>
                      </div>
                      {paymentMethod === 'netbanking' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    </div>
                  </Card>
                </RadioGroup>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPaymentDialog(false);
                    setPaymentMethod('');
                  }}
                  className="flex-1 border-2 border-amber-300 text-amber-900 hover:bg-amber-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (paymentMethod) {
                      setShowPaymentDialog(false);
                      setShowPaymentSuccess(true);
                      setPaymentMethod('');
                      toast.success('Payment completed successfully!', {
                        description: `You now have access to ${selectedCraftForPurchase.name}`,
                      });
                      setTimeout(() => setShowPaymentSuccess(false), 4000);
                    }
                  }}
                  disabled={!paymentMethod}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pay ₹{selectedCraftForPurchase.price}
                </Button>
              </div>

              {/* Secure Payment Notice */}
              <div className="flex items-center justify-center gap-2 text-amber-600 text-xs">
                <Shield className="w-4 h-4" />
                <span>Secure Payment • 100% Safe & Encrypted</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Payment Success Dialog */}
      {showPaymentSuccess && (
        <Dialog open={showPaymentSuccess} onOpenChange={setShowPaymentSuccess}>
          <DialogContent className="max-w-md bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
            <DialogHeader>
              <DialogTitle className="text-green-900 flex items-center gap-2 justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                Payment Successful!
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <Check className="w-12 h-12 text-white" />
              </div>
              
              <div>
                <p className="text-green-900 mb-2">
                  You now have full access to<br />
                  <span className="font-semibold">{selectedCraftForPurchase?.name}</span>
                </p>
                <p className="text-green-700 text-sm">
                  Start your learning journey now!
                </p>
              </div>

              <div className="bg-white/90 border-2 border-green-200 rounded-xl p-4">
                <p className="text-green-900 text-sm mb-1">Transaction ID</p>
                <p className="text-green-600 text-xs font-mono">
                  HHG{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>

              <Button
                onClick={() => {
                  setShowPaymentSuccess(false);
                  setSelectedCraft(selectedCraftForPurchase?.name || null);
                }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Learning Now
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Enhanced Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-amber-200 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all transform ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 text-amber-900 scale-110 shadow-lg'
                  : 'text-amber-600 hover:bg-amber-50'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs">{t('home')}</span>
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all transform ${
                activeTab === 'learn'
                  ? 'bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 text-amber-900 scale-110 shadow-lg'
                  : 'text-amber-600 hover:bg-amber-50'
              }`}
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">{t('learn')}</span>
            </button>
            
            {/* Upload Tab - Only visible for Artisans */}
            {userType === 'artisan' && (
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all transform ${
                  activeTab === 'upload'
                    ? 'bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 text-amber-900 scale-110 shadow-lg'
                    : 'text-amber-600 hover:bg-amber-50'
                }`}
              >
                <Upload className="w-6 h-6" />
                <span className="text-xs">{t('upload')}</span>
              </button>
            )}
            
            <button
              onClick={() => setActiveTab('rewards')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all transform ${
                activeTab === 'rewards'
                  ? 'bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 text-amber-900 scale-110 shadow-lg'
                  : 'text-amber-600 hover:bg-amber-50'
              }`}
            >
              <Trophy className="w-6 h-6" />
              <span className="text-xs">{t('rewards')}</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all transform ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 text-amber-900 scale-110 shadow-lg'
                  : 'text-amber-600 hover:bg-amber-50'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs">{t('profile')}</span>
            </button>
          </div>
        </div>
      </nav>
      
      <Toaster richColors position="top-center" />
    </div>
  );
}
