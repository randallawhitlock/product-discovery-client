// src\types\user.ts
export interface UserProfile {
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface User {
  _id: string;
  email: string;
  role: 'user' | 'admin';
  wishlist: string[];
  profile: UserProfile;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}