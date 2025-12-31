import React, { useState } from 'react';
import { useStore } from '../store';
import { UserRole } from '../types';
import { ROLE_CONFIG } from '../constants';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { GlassCard, Button } from '../components/UI';
import { ShieldCheck, ArrowLeft, Lock, User, ChevronRight, Zap } from 'lucide-react';

const Login = () => {
  const { login } = useStore();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('form');
  };

  const handleBack = () => {
    setStep('role');
    setSelectedRole(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay for effect
    setTimeout(() => {
      if (selectedRole) {
        login(selectedRole);
      }
    }, 1500);
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const formVariant: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: "spring" } },
    exit: { opacity: 0, x: 50 }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-ssfi-navy font-sans">
      {/* High Energy Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-ssfi-navy/80 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-ssfi-navy via-transparent to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=2574&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-60"
          alt="Speed Skating Action" 
        />
        {/* Animated Glow Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] mix-blend-screen z-10" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-ssfi-gold/20 rounded-full blur-[150px] mix-blend-screen z-10" 
        />
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header - Always visible but animates slightly */}
        <motion.div 
          layout
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-4">
             <div className="p-2 bg-ssfi-gold rounded flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.5)]">
               <Zap size={20} className="text-ssfi-navy fill-current" />
             </div>
             <span className="text-ssfi-gold font-bold tracking-widest uppercase text-xs">Secure Access Portal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-lg">
            SSFI Login
          </h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'role' ? (
            <motion.div 
              key="role-selection"
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full"
            >
               <p className="text-center text-blue-200/60 font-light text-lg mb-8">Select your operational tier to proceed</p>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {Object.entries(ROLE_CONFIG).map(([key, config]) => {
                  const Icon = config.icon;
                  const colorClass = config.color.split('-')[1]; // Extract color name like 'blue', 'green'
                  
                  return (
                    <motion.div variants={item} key={key} layoutId={key}>
                      <button 
                        onClick={() => handleRoleSelect(key as UserRole)}
                        className="w-full text-left group relative h-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl border border-white/20" />
                        <GlassCard className="h-full hover:border-ssfi-gold/50 transition-colors duration-300 relative overflow-hidden !p-0">
                           {/* Card Background gradient based on role color */}
                           <div className={`absolute inset-0 bg-gradient-to-br from-black/60 to-black/20 opacity-80`} />
                           <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${colorClass}-500/20 rounded-full blur-[50px] group-hover:bg-${colorClass}-500/40 transition-all duration-500`} />
                           
                           <div className="relative z-10 p-6 flex flex-col h-full">
                              <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 text-${colorClass}-400 group-hover:text-white group-hover:bg-${colorClass}-500 transition-colors duration-300 shadow-lg`}>
                                  <Icon size={28} />
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <ChevronRight className="text-white/50" />
                                </div>
                              </div>
                              
                              <div className="mt-auto">
                                <h3 className="text-2xl font-display font-bold italic text-white mb-1 group-hover:text-ssfi-gold transition-colors">{config.label}</h3>
                                <p className="text-xs font-mono text-white/40 uppercase tracking-widest">{config.permissions}</p>
                              </div>
                           </div>
                           
                           {/* Bottom accent line */}
                           <div className={`absolute bottom-0 left-0 w-full h-1 bg-${colorClass}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                        </GlassCard>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              variants={formVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md"
            >
              <GlassCard className="relative overflow-hidden !p-0 border-t border-l border-white/20 border-b-4 border-b-ssfi-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ssfi-gold to-transparent opacity-50" />
                 
                 <div className="p-8">
                    <button 
                      onClick={handleBack}
                      className="flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6 transition-colors group"
                    >
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      Back to Roles
                    </button>

                    <div className="flex items-center gap-4 mb-8">
                       <div className="p-4 bg-ssfi-gold/10 border border-ssfi-gold/30 rounded-2xl text-ssfi-gold shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                          {selectedRole && React.createElement(ROLE_CONFIG[selectedRole].icon, { size: 32 })}
                       </div>
                       <div>
                          <h2 className="text-2xl font-display font-bold text-white italic">
                            {ROLE_CONFIG[selectedRole!].label}
                          </h2>
                          <p className="text-white/50 text-sm">Please enter your credentials</p>
                       </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-blue-200/70 ml-1">SSFI ID / Email</label>
                          <div className="relative group">
                             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-ssfi-gold transition-colors" size={18} />
                             <input 
                                type="text" 
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-ssfi-gold focus:ring-1 focus:ring-ssfi-gold/50 transition-all duration-300 font-medium"
                                placeholder="Enter ID"
                                required
                             />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-blue-200/70 ml-1">Password</label>
                          <div className="relative group">
                             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-ssfi-gold transition-colors" size={18} />
                             <input 
                                type="password" 
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-ssfi-gold focus:ring-1 focus:ring-ssfi-gold/50 transition-all duration-300 font-medium font-mono"
                                placeholder="••••••••"
                                required
                             />
                          </div>
                       </div>

                       <Button 
                          className="w-full !py-4 text-lg shadow-[0_0_20px_rgba(26,35,126,0.4)] hover:shadow-[0_0_30px_rgba(26,35,126,0.6)] relative overflow-hidden" 
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Authenticating...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                               Enter Dashboard <ChevronRight size={18} />
                            </span>
                          )}
                       </Button>
                    </form>
                 </div>
                 
                 <div className="bg-white/5 p-4 text-center border-t border-white/5">
                    <p className="text-xs text-white/30">
                       Protected by SSFI Digital • <a href="#" className="hover:text-white underline">Forgot Password?</a>
                    </p>
                 </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;