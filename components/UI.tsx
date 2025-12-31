import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard: React.FC<{ children?: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.01, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
    className={`glass-panel rounded-2xl p-6 text-white border border-white/10 ${className}`}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

export const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', disabled = false }: { children?: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'outline'; size?: 'sm' | 'md' | 'lg'; className?: string; disabled?: boolean }) => {
  const baseStyles = "rounded-lg font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };

  const variants = {
    primary: "bg-ssfi-navy hover:bg-blue-800 text-white shadow-lg border border-blue-500/30",
    secondary: "bg-ssfi-gold hover:bg-yellow-400 text-ssfi-navy shadow-lg shadow-yellow-500/20",
    outline: "border border-white/30 hover:bg-white/10 text-white"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
};

export const Badge: React.FC<{ children?: React.ReactNode; color?: string }> = ({ children, color = 'blue' }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${color}-500/20 text-${color}-300 border border-${color}-500/30`}>
    {children}
  </span>
);