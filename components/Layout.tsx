import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useStore } from '../store';
import { motion } from 'framer-motion';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { theme } = useStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#F8F9FA]'}`}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-mesh-dark opacity-80' : 'bg-mesh-light opacity-60'}`} />
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-screen ${theme === 'dark' ? 'bg-ssfi-navy/30' : 'bg-blue-200/40'}`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] mix-blend-screen ${theme === 'dark' ? 'bg-ssfi-gold/10' : 'bg-yellow-200/30'}`} />
      </div>

      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 pt-24 pb-12"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;