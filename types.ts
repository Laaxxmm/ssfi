export enum UserRole {
  NATIONAL_ADMIN = 'NATIONAL_ADMIN',
  STATE_ADMIN = 'STATE_ADMIN',
  DISTRICT_ADMIN = 'DISTRICT_ADMIN',
  CLUB_ADMIN = 'CLUB_ADMIN',
  COACH = 'COACH',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  avatar?: string;
  region?: string; // State or District or Club Name
  ssfiId?: string; // Read-only for student
  aadhar?: string; // Read-only for student
}

export interface Stat {
  label: string;
  value: string | number;
  trend?: number; // percentage
  icon?: any;
}

export interface SkaterData {
  id: string;
  name: string;
  ageGroup: string;
  club: string;
  bestTime500m: string;
  points: number;
}

// CMS Types
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export interface PublicEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'National' | 'State' | 'District' | 'Club';
  imageUrl: string;
  registrationLink?: string;
  // New Fields for Enhanced Event System
  cost?: string;
  deadline?: string;
  time?: string;
  description?: string;
  state?: string;
  district?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category: 'National' | 'State' | 'District' | 'Club' | 'Event';
  coverImage: string;
  imageCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  tags: string[];
}