import { UserRole } from './types';
import { 
  Trophy, 
  Users, 
  Map, 
  Building2, 
  Timer, 
  UserCircle 
} from 'lucide-react';

export const ROLE_CONFIG = {
  [UserRole.NATIONAL_ADMIN]: {
    label: 'National Admin',
    color: 'text-ssfi-gold',
    icon: Trophy,
    permissions: 'Full Control'
  },
  [UserRole.STATE_ADMIN]: {
    label: 'State Admin',
    color: 'text-blue-400',
    icon: Map,
    permissions: 'State Level CRUD'
  },
  [UserRole.DISTRICT_ADMIN]: {
    label: 'District Admin',
    color: 'text-green-400',
    icon: Building2,
    permissions: 'District Level CRUD'
  },
  [UserRole.CLUB_ADMIN]: {
    label: 'Club Admin',
    color: 'text-purple-400',
    icon: Users,
    permissions: 'Club Level CRUD'
  },
  [UserRole.COACH]: {
    label: 'Coach',
    color: 'text-orange-400',
    icon: Timer,
    permissions: 'Training Data & Student Mgmt'
  },
  [UserRole.STUDENT]: {
    label: 'Student / Parent',
    color: 'text-white',
    icon: UserCircle,
    permissions: 'View Profile & Analytics'
  }
};