# Interfaces TypeScript - TerraNobis

Ce document décrit toutes les interfaces TypeScript utilisées dans le projet TerraNobis.

## Interfaces Principales

### User & Authentication

#### `User`
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  location?: string;
  bio?: string;
  verified: boolean;
  createdAt: string;
}
```

#### `UserRole`
```typescript
type UserRole = 'farmer' | 'investor' | 'buyer' | 'admin';
```

#### `AuthContextType`
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  loading: boolean;
}
```

#### `RegisterData`
```typescript
interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  location?: string;
}
```

### Projets & Investissements

#### `Project`
```typescript
interface Project {
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
```

#### `Investor`
```typescript
interface Investor {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  investedAt: string;
}
```

#### `ProjectUpdate`
```typescript
interface ProjectUpdate {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
}
```

### Marketplace

#### `Product`
```typescript
interface Product {
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
```

#### `Order`
```typescript
interface Order {
  id: string;
  buyerId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  createdAt: string;
}
```

#### `OrderItem`
```typescript
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  farmerId: string;
}
```

### Académie & Formation

#### `Course`
```typescript
interface Course {
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
```

#### `CourseVideo`
```typescript
interface CourseVideo {
  id: string;
  title: string;
  duration: number;
  url: string;
  completed?: boolean;
}
```

#### `Quiz`
```typescript
interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
```

### Analyse de Sol & IA

#### `SoilAnalysis`
```typescript
interface SoilAnalysis {
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
```

#### `CropRecommendation`
```typescript
interface CropRecommendation {
  crop: string;
  suitability: number;
  expectedYield: number;
  marketDemand: number;
  plantingPeriod: string;
  harvestPeriod: string;
  tips: string[];
}
```

#### `TraditionalKnowledge`
```typescript
interface TraditionalKnowledge {
  id: string;
  title: string;
  description: string;
  region: string;
  crop: string;
  technique: string;
  benefits: string[];
  source: string;
}
```

#### `AIMessage`
```typescript
interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}
```

### Networking & Communication

#### `Entrepreneur`
```typescript
interface Entrepreneur {
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
```

#### `BulkBuyer`
```typescript
interface BulkBuyer {
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
```

#### `IndividualBuyer`
```typescript
interface IndividualBuyer {
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
```

#### `Conversation`
```typescript
interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  role: string;
}
```

#### `Message`
```typescript
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}
```

### Notifications & Système

#### `Notification`
```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
```

#### `SystemAlert`
```typescript
interface SystemAlert {
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
```

### Interfaces pour les Props des Composants

#### `LandingPageProps`
```typescript
interface LandingPageProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}
```

#### `NavigationProps`
```typescript
interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}
```

#### `AIAssistantProps`
```typescript
interface AIAssistantProps {
  onClose: () => void;
}
```

#### `StatCardProps`
```typescript
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: 'increase' | 'decrease';
  className?: string;
}
```

#### `LoadingSpinnerProps`
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

#### `LoginFormProps`
```typescript
interface LoginFormProps {
  onToggleMode: () => void;
}
```

#### `RegisterFormProps`
```typescript
interface RegisterFormProps {
  onToggleMode: () => void;
}
```

### Interfaces pour les Pages Publiques

#### `PublicAcademyProps`
```typescript
interface PublicAcademyProps {
  onLogin: () => void;
}
```

#### `PublicInvestmentsProps`
```typescript
interface PublicInvestmentsProps {
  onLogin: () => void;
}
```

#### `PublicMarketplaceProps`
```typescript
interface PublicMarketplaceProps {
  onLogin: () => void;
}
```

### Interfaces Avancées

#### `FilterOptions`
```typescript
interface FilterOptions {
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
```

#### `SearchFilters`
```typescript
interface SearchFilters {
  term: string;
  filters: FilterOptions;
  sortBy?: 'price' | 'rating' | 'date' | 'name';
  sortOrder?: 'asc' | 'desc';
}
```

#### `DashboardStats`
```typescript
interface DashboardStats {
  totalProjects: number;
  totalInvestments: number;
  totalRevenue: number;
  activeProjects: number;
  completedProjects: number;
  pendingProjects: number;
  monthlyGrowth: number;
}
```

#### `Transaction`
```typescript
interface Transaction {
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
}
```

#### `Review`
```typescript
interface Review {
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
```

#### `Event`
```typescript
interface Event {
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
```

#### `Report`
```typescript
interface Report {
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
}
```

#### `UserSettings`
```typescript
interface UserSettings {
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
```

#### `Document`
```typescript
interface Document {
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
```

## Utilisation

Toutes ces interfaces sont exportées depuis `src/types/index.ts` et peuvent être importées dans n'importe quel composant :

```typescript
import { User, Project, Product, Course } from '../types';
```

## Avantages

1. **Type Safety** : Vérification des types au moment de la compilation
2. **Documentation** : Les interfaces servent de documentation du code
3. **IntelliSense** : Autocomplétion et suggestions dans l'IDE
4. **Maintenabilité** : Facilite la maintenance et l'évolution du code
5. **Réutilisabilité** : Interfaces partagées entre les composants 