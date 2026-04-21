// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessName?: string;
  role: "entrepreneur" | "mentor" | "admin";
  profileImage?: string;
  bio?: string;
  region?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Grant Types
export interface Grant {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  region: string;
  deadline: Date;
  requirements: string[];
  status: "active" | "closed" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export interface GrantApplication {
  id: string;
  userId: string;
  grantId: string;
  status: "submitted" | "reviewing" | "approved" | "rejected";
  submittedAt: Date;
  reviewedAt?: Date;
  feedback?: string;
}

// Marketplace Types
export interface MarketplaceItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  region: string;
  status: "active" | "sold" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

// Mentorship Types
export interface Mentor {
  id: string;
  userId: string;
  expertise: string[];
  hourlyRate: number;
  bio: string;
  availability: string;
  rating: number;
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  entrepreneurId: string;
  scheduledAt: Date;
  duration: number; // in minutes
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

// Regional Map Types
export interface RegionalPoint {
  id: string;
  name: string;
  region: string;
  type: "grant" | "mentor" | "business" | "facility";
  latitude: number;
  longitude: number;
  description?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  firstName: string;
  lastName: string;
  businessName?: string;
  role: "entrepreneur" | "mentor";
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  user: User;
}
