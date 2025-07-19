export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  location?: string;
  bio?: string;
  verified: boolean;
  createdAt: string;
}

export type UserRole = 'farmer' | 'investor' | 'buyer' | 'admin';

export interface Project {
  id: string;
  title: string;
  description: string;
  farmerId: string;
  farmerName: string;
  location: string;
  culture: string;
  targetAmount: number;
  currentAmount: number;
  duration: number;
  expectedReturn: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  images: string[];
  investors: Investor[];
  updates: ProjectUpdate[];
  createdAt: string;
}

export interface Investor {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  investedAt: string;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  farmerId: string;
  farmerName: string;
  images: string[];
  stock: number;
  organic: boolean;
  local: boolean;
  rating: number;
  reviews: number;
  location: string;
}

export interface Order {
  id: string;
  buyerId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  farmerId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  videos: CourseVideo[];
  quiz: Quiz[];
  certification: boolean;
  enrolledUsers: number;
  rating: number;
}

export interface CourseVideo {
  id: string;
  title: string;
  duration: number;
  url: string;
  completed?: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface SoilAnalysis {
  id: string;
  userId: string;
  location: string;
  soilType: string;
  ph: number;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  recommendations: CropRecommendation[];
  traditionalKnowledge: TraditionalKnowledge[];
  createdAt: string;
}

export interface CropRecommendation {
  crop: string;
  suitability: number;
  expectedYield: number;
  marketDemand: number;
  plantingPeriod: string;
  harvestPeriod: string;
  tips: string[];
}

export interface TraditionalKnowledge {
  id: string;
  title: string;
  description: string;
  region: string;
  crop: string;
  technique: string;
  benefits: string[];
  source: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Interfaces pour le Networking Hub
export interface Entrepreneur {
  id: string;
  name: string;
  company: string;
  type: string;
  location: string;
  avatar: string;
  description: string;
  needs: string[];
  volume: string;
  budget: string;
  rating: number;
  verified: boolean;
  contact: {
    phone: string;
    email: string;
  };
}

export interface BulkBuyer {
  id: string;
  name: string;
  type: string;
  location: string;
  avatar: string;
  description: string;
  needs: string[];
  volume: string;
  budget: string;
  rating: number;
  verified: boolean;
  contact: {
    phone: string;
    email: string;
  };
}

export interface IndividualBuyer {
  id: string;
  name: string;
  type: string;
  location: string;
  avatar: string;
  description: string;
  needs: string[];
  volume: string;
  budget: string;
  rating: number;
  verified: boolean;
  contact: {
    phone: string;
    email: string;
  };
}

// Interface pour les conversations de messagerie
export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  role: string;
}

// Interface pour l'assistant AI
export interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

// Interfaces pour les props des composants
export interface LandingPageProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export interface PublicAcademyProps {
  onLogin: () => void;
}

export interface PublicInvestmentsProps {
  onLogin: () => void;
}

export interface PublicMarketplaceProps {
  onLogin: () => void;
}

export interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export interface AIAssistantProps {
  onClose: () => void;
}

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: 'increase' | 'decrease';
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface LoginFormProps {
  onToggleMode: () => void;
}

export interface RegisterFormProps {
  onToggleMode: () => void;
}

// Interface pour les données d'enregistrement
export interface RegisterData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
  location?: string;
}

// Interface pour le contexte d'authentification
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  loading: boolean;
}

// Interfaces pour les filtres et recherche
export interface FilterOptions {
  category?: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  organic?: boolean;
  local?: boolean;
  rating?: number;
}

export interface SearchFilters {
  term: string;
  filters: FilterOptions;
  sortBy?: 'price' | 'rating' | 'date' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Interface pour les statistiques du dashboard
export interface DashboardStats {
  totalProjects: number;
  totalInvestments: number;
  totalRevenue: number;
  activeProjects: number;
  completedProjects: number;
  pendingProjects: number;
  monthlyGrowth: number;
}

// Interface pour les transactions
export interface Transaction {
  id: string;
  userId: string;
  type: 'investment' | 'purchase' | 'sale' | 'withdrawal';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  relatedId?: string; // ID du projet ou produit lié
  createdAt: string;
  updatedAt: string;
}

// Interface pour les avis et commentaires
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId?: string;
  projectId?: string;
  courseId?: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  createdAt: string;
}

// Interface pour les événements et formations
export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'workshop' | 'conference' | 'field-visit';
  location: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolledUsers: number;
  price: number;
  organizer: string;
  organizerAvatar?: string;
  tags: string[];
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// Interface pour les rapports et analyses
export interface Report {
  id: string;
  title: string;
  type: 'financial' | 'performance' | 'market' | 'soil';
  userId: string;
  content: string;
  data: any; // Données structurées du rapport
  generatedAt: string;
  period: {
    start: string;
    end: string;
  };
  status: 'draft' | 'published' | 'archived';
}

// Interface pour les paramètres utilisateur
export interface UserSettings {
  userId: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    projectUpdates: boolean;
    marketAlerts: boolean;
    newMessages: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'connections';
    showLocation: boolean;
    showContactInfo: boolean;
  };
  preferences: {
    language: string;
    currency: string;
    timezone: string;
    theme: 'light' | 'dark' | 'auto';
  };
}

// Interface pour les documents et fichiers
export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'document';
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  relatedTo?: {
    type: 'project' | 'product' | 'course' | 'user';
    id: string;
  };
  tags: string[];
}

// Interface pour les alertes et notifications système
export interface SystemAlert {
  id: string;
  type: 'maintenance' | 'update' | 'security' | 'announcement';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate?: string;
  targetAudience?: UserRole[];
  active: boolean;
}

// Interfaces pour les Popups et Modales
export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Interface pour les détails de projet
export interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  farmerId: string;
  farmerName: string;
  farmerAvatar?: string;
  farmerBio?: string;
  location: string;
  culture: string;
  targetAmount: number;
  currentAmount: number;
  duration: number;
  expectedReturn: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  images: string[];
  investors: Investor[];
  updates: ProjectUpdate[];
  createdAt: string;
  // Détails supplémentaires
  financialPlan: {
    budgetBreakdown: {
      category: string;
      amount: number;
      percentage: number;
    }[];
    revenueProjections: {
      month: string;
      projectedRevenue: number;
      actualRevenue?: number;
    }[];
  };
  technicalDetails: {
    soilType: string;
    irrigationSystem: string;
    farmingTechniques: string[];
    equipment: string[];
    certifications: string[];
  };
  marketAnalysis: {
    targetMarket: string;
    competition: string;
    pricingStrategy: string;
    distributionChannels: string[];
  };
  risks: {
    risk: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    mitigation: string;
  }[];
  documents: Document[];
}

// Interface pour les détails de produit
export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  farmerId: string;
  farmerName: string;
  farmerAvatar?: string;
  images: string[];
  stock: number;
  organic: boolean;
  local: boolean;
  rating: number;
  reviews: Review[];
  location: string;
  // Détails supplémentaires
  specifications: {
    weight: string;
    dimensions: string;
    packaging: string;
    shelfLife: string;
    storageConditions: string;
  };
  nutritionalInfo: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    vitamins?: string[];
    minerals?: string[];
  };
  farmingDetails: {
    farmingMethod: string;
    harvestDate: string;
    pesticides: string[];
    fertilizers: string[];
    irrigation: string;
  };
  certifications: {
    name: string;
    issuer: string;
    validUntil: string;
    logo?: string;
  }[];
  shipping: {
    methods: {
      name: string;
      price: number;
      duration: string;
    }[];
    freeShippingThreshold: number;
    returnPolicy: string;
  };
  wholesale: {
    minQuantity: number;
    price: number;
    bulkDiscounts: {
      quantity: number;
      discount: number;
    }[];
  };
}

// Interface pour les détails de cours
export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar?: string;
  instructorBio?: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  videos: CourseVideo[];
  quiz: Quiz[];
  certification: boolean;
  enrolledUsers: number;
  rating: number;
  // Détails supplémentaires
  curriculum: {
    section: string;
    lessons: {
      title: string;
      duration: number;
      type: 'video' | 'text' | 'quiz' | 'assignment';
      completed?: boolean;
    }[];
  }[];
  learningObjectives: string[];
  prerequisites: string[];
  materials: {
    name: string;
    type: 'pdf' | 'video' | 'link' | 'download';
    url: string;
    required: boolean;
  }[];
  reviews: Review[];
  certificates: {
    name: string;
    description: string;
    requirements: string[];
  }[];
  pricing: {
    originalPrice?: number;
    currentPrice: number;
    currency: string;
    paymentPlans?: {
      name: string;
      price: number;
      installments: number;
    }[];
  };
  schedule: {
    startDate: string;
    endDate: string;
    sessions: {
      day: string;
      time: string;
      duration: number;
    }[];
  };
}

// Interface pour les détails de contact
export interface ContactDetails {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company?: string;
  location: string;
  description: string;
  // Informations de contact
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
    website?: string;
  };
  // Réseaux sociaux
  socialMedia: {
    platform: string;
    url: string;
    username: string;
  }[];
  // Statistiques
  stats: {
    projectsCompleted: number;
    totalInvestments: number;
    rating: number;
    responseTime: string;
  };
  // Disponibilité
  availability: {
    status: 'online' | 'offline' | 'busy';
    nextAvailable: string;
    timezone: string;
  };
  // Spécialités
  specialties: string[];
  // Langues parlées
  languages: string[];
  // Documents de vérification
  verification: {
    identityVerified: boolean;
    businessVerified: boolean;
    documents: Document[];
  };
}

// Interface pour les détails de transaction
export interface TransactionDetails {
  id: string;
  userId: string;
  type: 'investment' | 'purchase' | 'sale' | 'withdrawal';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  relatedId?: string;
  createdAt: string;
  updatedAt: string;
  // Détails supplémentaires
  paymentMethod: {
    type: 'card' | 'bank_transfer' | 'mobile_money' | 'crypto';
    details: string;
    maskedNumber?: string;
  };
  fees: {
    amount: number;
    description: string;
  };
  timeline: {
    step: string;
    timestamp: string;
    status: 'completed' | 'pending' | 'failed';
    details?: string;
  }[];
  relatedItems: {
    type: 'product' | 'project' | 'course';
    id: string;
    name: string;
    quantity?: number;
    price?: number;
  }[];
  refund?: {
    amount: number;
    reason: string;
    processedAt: string;
  };
}

// Interface pour les détails de rapport
export interface ReportDetails {
  id: string;
  title: string;
  type: 'financial' | 'performance' | 'market' | 'soil';
  userId: string;
  content: string;
  data: any;
  generatedAt: string;
  period: {
    start: string;
    end: string;
  };
  status: 'draft' | 'published' | 'archived';
  // Détails supplémentaires
  sections: {
    title: string;
    content: string;
    charts?: {
      type: 'line' | 'bar' | 'pie' | 'table';
      data: any;
      options?: any;
    }[];
  }[];
  recommendations: {
    category: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    implementation: string;
  }[];
  attachments: Document[];
  sharing: {
    sharedWith: string[];
    permissions: 'view' | 'edit' | 'admin';
    publicLink?: string;
  };
  version: {
    number: string;
    changes: string[];
    updatedAt: string;
  };
}

// Interface pour les détails d'événement
export interface EventDetails {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'workshop' | 'conference' | 'field-visit';
  location: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolledUsers: number;
  price: number;
  organizer: string;
  organizerAvatar?: string;
  tags: string[];
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  // Détails supplémentaires
  agenda: {
    time: string;
    title: string;
    speaker?: string;
    description: string;
    duration: number;
  }[];
  speakers: {
    name: string;
    avatar?: string;
    bio: string;
    expertise: string[];
    sessions: string[];
  }[];
  materials: {
    name: string;
    type: 'presentation' | 'document' | 'video' | 'link';
    url: string;
    availableAfter: string;
  }[];
  networking: {
    sessions: {
      title: string;
      description: string;
      participants: number;
      maxParticipants: number;
    }[];
  };
  venue: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    facilities: string[];
    parking: boolean;
    accessibility: boolean;
  };
  virtual: {
    platform: string;
    meetingLink?: string;
    recordingAvailable: boolean;
    technicalRequirements: string[];
  };
  sponsors: {
    name: string;
    logo: string;
    website: string;
    contribution: string;
  }[];
  feedback: {
    rating: number;
    comment: string;
    userId: string;
    userName: string;
    createdAt: string;
  }[];
}