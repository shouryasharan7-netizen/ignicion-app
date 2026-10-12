export type Language = 'en' | 'hi' | 'mr';
export type UserRole = 'user' | 'artisan';

export interface Craft {
  id: number;
  name: string;
  nameKey: string;
  region: string;
  regionKey: string;
  state: string;
  category: 'textiles' | 'painting' | 'sculpture' | 'masks' | 'pottery';
  image: string;
  price: number;
  description: string;
  descriptionKey: string;
  originEra: string;
  materials: string[];
  masterArtisan: string;
  rating: number;
  reviewsCount: number;
  steps: {
    stepNumber: number;
    title: string;
    instructions: string;
    audioText: {
      en: string;
      hi: string;
      mr: string;
    };
    tip: string;
  }[];
}

export interface Quest {
  id: number;
  title: string;
  category: string;
  description: string;
  rewardPoints: number;
  progress: number;
  completed: boolean;
  badgeReward: string;
  icon: string;
}

export interface IoTSensorData {
  temp: number; // Celsius
  humidity: number; // %
  light: number; // Lux
  vibration: number; // mm/s
  airQualityAQI: number;
  lastUpdated: string;
  status: 'safe' | 'warning' | 'critical';
}

export interface Museum {
  id: number;
  name: string;
  city: string;
  state: string;
  distance: string;
  image: string;
  curator: string;
  iotEnabled: boolean;
  artifactsCount: number;
  keyArtifact: string;
  sensors: IoTSensorData;
  historicalReadings: {
    time: string;
    temp: number;
    humidity: number;
  }[];
}

export interface CommunityPost {
  id: number;
  author: string;
  avatar: string;
  role: string;
  region: string;
  craft: string;
  image: string;
  title: string;
  description: string;
  likes: number;
  hasLiked?: boolean;
  comments: {
    id: number;
    author: string;
    text: string;
    time: string;
  }[];
  audioStory?: {
    title: string;
    duration: string;
    narrator: string;
    summary: string;
  };
  time: string;
}

export interface StoreItem {
  id: number;
  name: string;
  category: string;
  costPoints: number;
  cashEquivalent: number;
  icon: string;
  image: string;
  description: string;
  stock: number;
  artisanName: string;
}

export interface BlockchainCertificate {
  certificateId: string;
  artifactName: string;
  craftType: string;
  artisanName: string;
  originRegion: string;
  timestamp: string;
  blockNumber: number;
  txHash: string;
  ipfsHash: string;
  sha256Digest: string;
  materialsUsed: string[];
  geographicalIndicationTag: string;
}

export interface UserProfileData {
  name: string;
  email: string;
  role: UserRole;
  language: Language;
  points: number;
  level: number;
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlockedAt: string;
  }[];
  certificates: BlockchainCertificate[];
  completedQuests: number[];
  bookmarks: number[];
}
