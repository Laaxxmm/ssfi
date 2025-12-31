import React from 'react';
import { useStore } from '../store';
import { UserRole } from '../types';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  Trophy,
  FileText,
  Activity,
  Layout,
  DollarSign,
  Globe,
  RefreshCw,
  Home
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const { currentUser, logout } = useStore();

  const getMenuItems = (role: UserRole) => {
    // Common items for all users
    const common = [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard }, // Default home view
    ];

    switch (role) {
      case UserRole.NATIONAL_ADMIN:
        return [
          { id: 'overview', label: 'Master Control', icon: LayoutDashboard },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'payments', label: 'Payments', icon: DollarSign },
          { id: 'results', label: 'Results', icon: Trophy },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'renewals', label: 'Renewal Report', icon: RefreshCw },
          { id: 'roles', label: 'Role Management', icon: Users },
          { id: 'settings', label: 'Settings', icon: Settings },
          { id: 'cms', label: 'Front End Settings', icon: Globe },
        ];
      case UserRole.STATE_ADMIN:
        return [
          ...common,
          { id: 'districts', label: 'District Units', icon: Users },
          { id: 'analytics', label: 'State Stats', icon: Activity },
          { id: 'events', label: 'My Events', icon: Calendar },
        ];
      // ... keep other roles as is for now or update if needed
      case UserRole.CLUB_ADMIN:
      case UserRole.COACH:
        return [
          ...common,
          { id: 'athletes', label: 'My Athletes', icon: Users },
          { id: 'events', label: 'Events', icon: Calendar },
        ];
      case UserRole.STUDENT:
        return [
          ...common,
          { id: 'profile', label: 'My Profile', icon: Users },
          { id: 'events', label: 'My Events', icon: Calendar },
        ];
      default:
        return common;
    }
  };

  const menuItems = currentUser ? getMenuItems(currentUser.role) : [];

  return (
    <div className="h-full w-64 glass-panel-heavy fixed left-0 top-0 flex flex-col z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-ssfi-navy to-blue-500 flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(26,35,126,0.5)]">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg tracking-wider">SSFI</h1>
          <p className="text-[10px] text-white/50 tracking-widest uppercase">Digital Ecosystem</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            whileHover={{ x: 4 }}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
              ? 'bg-gradient-to-r from-ssfi-navy to-blue-900 border border-blue-400/30 text-white shadow-lg shadow-blue-900/40'
              : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-ssfi-gold' : ''} />
            <span className="font-medium text-sm">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          onClick={() => window.location.href = '/'}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all group"
        >
          <Home size={20} className="group-hover:text-ssfi-gold transition-colors" />
          <span className="font-medium text-sm">Back to Website</span>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;