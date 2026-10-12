import { Language } from '@/types/heritage';

export interface TranslationDict {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

export const translations: TranslationDict = {
  // App Header & Branding
  appTitle: {
    en: 'Hybrid Heritage Guardian',
    hi: 'हाइब्रिड हेरिटेज गार्डियन',
    mr: 'हायब्रिड हेरिटेज गार्डियन'
  },
  tagline: {
    en: 'Preserving Culture Through Innovation & AI',
    hi: 'नवाचार और एआई द्वारा भारतीय संस्कृति का संरक्षण',
    mr: 'नवकल्पना व एआय द्वारे भारतीय संस्कृतीचे जतन'
  },
  badgeGIProtected: {
    en: 'GI Tag Authenticated',
    hi: 'जीआई टैग प्रमाणित',
    mr: 'जीआय टॅग प्रमाणित'
  },
  
  // Navigation Tabs
  navHome: {
    en: 'Heritage Hub',
    hi: 'विरासत केंद्र',
    mr: 'वारसा केंद्र'
  },
  navLearn: {
    en: 'AR Studio',
    hi: 'एआर स्टूडियो',
    mr: 'एआर स्टुडिओ'
  },
  navQuests: {
    en: 'Quests & Games',
    hi: 'खोज और खेल',
    mr: 'शोध आणि खेळ'
  },
  navMuseums: {
    en: 'IoT Guardian',
    hi: 'आईओटी संरक्षक',
    mr: 'आयओटी संरक्षक'
  },
  navMarketplace: {
    en: 'Artisan Boli',
    hi: 'कारीगर बाज़ार',
    mr: 'कारागीर बाजार'
  },
  navCommunity: {
    en: 'Oral Histories',
    hi: 'लोक गाथाएं',
    mr: 'लोककथा'
  },
  navUpload: {
    en: 'Artisan Forge',
    hi: 'कारीगर शाला',
    mr: 'कला दालन'
  },
  navProfile: {
    en: 'Passport',
    hi: 'पासपोर्ट',
    mr: 'वारसा पासपोर्ट'
  },

  // Roles
  roleExplorer: {
    en: 'Heritage Explorer',
    hi: 'विरासत खोजी',
    mr: 'वारसा संशोधक'
  },
  roleArtisan: {
    en: 'Master Artisan',
    hi: 'मास्टर कारीगर',
    mr: 'मास्टर कारागीर'
  },
  roleExplorerDesc: {
    en: 'Learn centuries-old crafts, complete preservation quests, unlock NFT certificates and support artisan guilds.',
    hi: 'शताब्दियों पुराने पारंपरिक शिल्प सीखें, खोज पूरी करें, प्रमाण पत्र पाएं और कारीगरों का समर्थन करें।',
    mr: 'शतकानुशतके जुन्या पारंपरिक कला शिका, शोध पूर्ण करा, प्रमाणपत्रे मिळवा आणि कारागिरांना पाठबळ द्या.'
  },
  roleArtisanDesc: {
    en: 'Mint verifiable cryptographic GI certificates, publish masterclasses, preserve oral lore, and receive direct patronage.',
    hi: 'प्रमाणित क्रिप्टोग्राफिक जीआई प्रमाणपत्र बनाएं, ट्यूटोरियल प्रकाशित करें और सीधी सहायता प्राप्त करें।',
    mr: 'प्रमाणित क्रिप्टोग्राफिक जीआय प्रमाणपत्रे तयार करा, ट्यूटोरियल्स प्रसिद्ध करा आणि थेट मदत मिळवा.'
  },

  // Splash & Onboarding
  enterPortal: {
    en: 'Enter Sanctuary',
    hi: 'प्रवेश करें',
    mr: 'प्रवेश करा'
  },
  selectRoleTitle: {
    en: 'Choose Your Sacred Path',
    hi: 'अपनी भूमिका चुनें',
    mr: 'तुमची भूमिका निवडा'
  },
  continueBtn: {
    en: 'Continue Journey',
    hi: 'यात्रा जारी रखें',
    mr: 'प्रवास सुरू ठेवा'
  },

  // AR Masterclass
  arCameraTitle: {
    en: 'Interactive AR Craft Masterclass',
    hi: 'इंटरएक्टिव एआर शिल्प मास्टरक्लास',
    mr: 'परस्परसंवादी एआर कला मास्टरक्लास'
  },
  startARSession: {
    en: 'Launch AR Lens',
    hi: 'एआर लेंस शुरू करें',
    mr: 'एआर लेन्स सुरू करा'
  },
  voiceGuideBtn: {
    en: 'Voice Guide (Narration)',
    hi: 'ऑडियो गाइड (आवाज)',
    mr: 'ध्वनी मार्गदर्शक (आवाज)'
  },
  stopVoiceBtn: {
    en: 'Stop Voice',
    hi: 'आवाज रोकें',
    mr: 'आवाज थांबवा'
  },
  switchCamera: {
    en: 'Toggle Camera',
    hi: 'कैमरा बदलें',
    mr: 'कॅमेरा बदला'
  },
  takeSnapshot: {
    en: 'Capture Work',
    hi: 'तस्वीर लें',
    mr: 'फोटो काढा'
  },
  openCanvasStudio: {
    en: 'Open Virtual Canvas Sandbox',
    hi: 'वर्चुअल कैनवास सैंडबॉक्स खोलें',
    mr: 'व्हर्च्युअल कॅनव्हास स्टुडिओ उघडा'
  },
  askHeritageAI: {
    en: 'Ask AI Heritage Guru',
    hi: 'एआई विरासत गुरु से पूछें',
    mr: 'एआय वारसा गुरूंना विचारा'
  },

  // IoT Guardian
  iotHeaderTitle: {
    en: 'Live IoT Telemetry & Climate Guardian',
    hi: 'लाइव आईओटी टेलीमेट्री व पर्यावरण संरक्षण',
    mr: 'थेट आयओटी सेन्सर व पर्यावरण रक्षक'
  },
  iotHeaderSubtitle: {
    en: 'Sub-second sensor surveillance across National Museums safeguarding priceless antiquities',
    hi: 'अमूल्य प्राचीन धरोहरों की सुरक्षा हेतु राष्ट्रीय संग्रहालयों में लाइव सेंसर निगरानी',
    mr: 'अमूल्य प्राचीन वारशाचे रक्षण करण्यासाठी राष्ट्रीय संग्रहालयांमध्ये थेट सेन्सर देखरेख'
  },
  safeState: {
    en: 'Optimal & Conserved',
    hi: 'सुरक्षित व अनुकूल',
    mr: 'सुरक्षित व अनुकूल'
  },
  warningState: {
    en: 'Climate Deviation Alert',
    hi: 'पर्यावरण विचलन चेतावनी',
    mr: 'हवामान बदल धोक्याची सूचना'
  },
  criticalState: {
    en: 'Immediate Action Required',
    hi: 'तत्काल कार्रवाई आवश्यक',
    mr: 'तातडीने कारवाई आवश्यक'
  },
  tempLabel: {
    en: 'Ambient Temperature',
    hi: 'परिवेश तापमान',
    mr: 'वातावरणातील तापमान'
  },
  humidityLabel: {
    en: 'Relative Humidity',
    hi: 'सापेक्ष आर्द्रता',
    mr: 'सापेक्ष आर्द्रता'
  },
  lightLabel: {
    en: 'Lux Exposure',
    hi: 'प्रकाश एक्सपोजर (लक्स)',
    mr: 'प्रकाश तीव्रता (लक्स)'
  },
  vibrationLabel: {
    en: 'Micro-Vibration Sensor',
    hi: 'सूक्ष्म-कंपन संवेदक',
    mr: 'सूक्ष्म कंपन सेन्सर'
  },
  triggerDehumidifier: {
    en: 'Engage Automated Climate Buffer',
    hi: 'स्वचालित जलवायु बफर सक्रिय करें',
    mr: 'स्वयंचलित हवामान बफर सुरू करा'
  },

  // Games & Quests
  gamesHubTitle: {
    en: 'Cultural Quests & Heritage Arena',
    hi: 'सांस्कृतिक खोज एवं क्रीड़ा केंद्र',
    mr: 'सांस्कृतिक शोध आणि क्रीडांगण'
  },
  matchGameTitle: {
    en: 'Craft-to-Origin Matcher',
    hi: 'शिल्प-भूगोल मिलान खेल',
    mr: 'कला-प्रदेश जुळवणी खेळ'
  },
  memoryGameTitle: {
    en: 'Sacred Motif Memory Challenge',
    hi: 'पवित्र रूपांकन स्मृति चुनौती',
    mr: 'पवित्र नक्षी स्मृती आव्हान'
  },
  quizGameTitle: {
    en: 'Heritage Scholar Trivia',
    hi: 'विरासत विद्वान प्रश्नोत्तरी',
    mr: 'वारसा विद्वान प्रश्नमंजुषा'
  },
  canvasGameTitle: {
    en: 'Folk Art Canvas Sandbox',
    hi: 'पारंपरिक कला कैनवास सैंडबॉक्स',
    mr: 'लोककला कॅनव्हास स्टुडिओ'
  },
  scoreLabel: {
    en: 'Score',
    hi: 'अंक',
    mr: 'गुण'
  },
  streakLabel: {
    en: 'Streak',
    hi: 'श्रृंखला',
    mr: 'सलग विजय'
  },
  movesLabel: {
    en: 'Moves',
    hi: 'चालें',
    mr: 'चाली'
  },
  playAgainBtn: {
    en: 'Play Again',
    hi: 'पुनः खेलें',
    mr: 'पुन्हा खेळा'
  },

  // Marketplace & Certificates
  marketplaceTitle: {
    en: 'Artisan Patronage & Authenticity Vault',
    hi: 'कारीगर संरक्षण एवं प्रामाणिकता कोष',
    mr: 'कारागीर राजाश्रय आणि सत्यता दालन'
  },
  buyWithUPI: {
    en: 'Purchase & Mint Certificate (UPI)',
    hi: 'खरीदें व प्रमाणपत्र बनाएं (UPI)',
    mr: 'खरेदी करा व प्रमाणपत्र मिळवा (UPI)'
  },
  redeemWithPoints: {
    en: 'Redeem with Heritage Points',
    hi: 'विरासत अंकों से भुनाएं',
    mr: 'वारसा गुणांसह मिळवा'
  },
  viewCertificate: {
    en: 'Verify Blockchain GI Tag',
    hi: 'ब्लॉकचेन जीआई टैग सत्यापित करें',
    mr: 'ब्लॉकचेन जीआय टॅग तपासा'
  },

  // Artisan Studio
  forgeTitle: {
    en: 'Master Artisan Studio & GI Minting',
    hi: 'मास्टर कारीगर स्टूडियो व जीआई मिंटिंग',
    mr: 'मास्टर कारागीर स्टुडिओ व जीआय मिंटिंग'
  },
  recordStory: {
    en: 'Record Oral Lore (Microphone)',
    hi: 'मौखिक गाथा रिकॉर्ड करें',
    mr: 'मौखिक कथा रेकॉर्ड करा'
  },
  mintCertificateBtn: {
    en: 'Generate Cryptographic Seal',
    hi: 'क्रिप्टोग्राफिक मुहर बनाएं',
    mr: 'क्रिप्टोग्राफिक शिक्का तयार करा'
  },

  // General Actions
  cancel: {
    en: 'Cancel',
    hi: 'रद्द करें',
    mr: 'रद्द करा'
  },
  close: {
    en: 'Close',
    hi: 'बंद करें',
    mr: 'बंद करा'
  },
  downloadBadge: {
    en: 'Download Certificate',
    hi: 'प्रमाणपत्र डाउनलोड करें',
    mr: 'प्रमाणपत्र डाउनलोड करा'
  },
  searchPlaceholder: {
    en: 'Search by craft, region, GI tag, or museum...',
    hi: 'शिल्प, क्षेत्र, जीआई टैग या संग्रहालय से खोजें...',
    mr: 'कला, प्रदेश, जीआय टॅग किंवा संग्रहालयानुसार शोधा...'
  }
};

export const getTranslation = (key: string, lang: Language): string => {
  return translations[key]?.[lang] || translations[key]?.en || key;
};
