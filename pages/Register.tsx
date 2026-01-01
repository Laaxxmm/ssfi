import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, UserPlus, Trophy, Users, Shield, Award, MapPin } from 'lucide-react';
import { GlassCard } from '../components/UI';
import { StudentForm, CoachForm, ClubForm, DistrictForm, StateForm } from '../components/RegistrationForms';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [registrationType, setRegistrationType] = useState('student');

    const renderForm = () => {
        switch (registrationType) {
            case 'student': return <StudentForm />;
            case 'coach': return <CoachForm />;
            case 'club': return <ClubForm />;
            case 'district': return <DistrictForm />;
            case 'state': return <StateForm />;
            default: return <StudentForm />;
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-[#0f172a] overflow-hidden p-4">
            {/* Background Effects (reused from Login) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-ssfi-navy/30 rounded-full blur-[100px]" />
            </div>

            <div className="absolute top-6 left-6 z-20">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <ChevronLeft size={20} /> Back to Home
                </button>
            </div>

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-start">

                {/* Left Side: Info / Branding */}
                <div className="hidden lg:flex flex-col justify-center h-full space-y-10 py-10 sticky top-10">
                    <div>
                        <h1 className="text-5xl font-display font-bold text-white mb-4">Join the Federation</h1>
                        <p className="text-white/60 text-xl leading-relaxed">Become part of India's premier speed skating ecosystem today.</p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0">
                                <UserPlus size={28} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl mb-1">Easy Registration</h3>
                                <p className="text-white/50 text-base">Streamlined process for athletes, coaches, and officials.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shrink-0">
                                <Trophy size={28} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl mb-1">Track Progress</h3>
                                <p className="text-white/50 text-base">Access your competition history and official rankings.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20 shrink-0">
                                <Shield size={28} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl mb-1">Official Recognition</h3>
                                <p className="text-white/50 text-base">Get verified ID cards and certificates.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full"
                >
                    <GlassCard className="!p-0 border-t-4 border-t-ssfi-gold overflow-hidden flex flex-col max-h-[85vh]">
                        <div className="p-8 pb-4 bg-white/5 border-b border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4">Register as</h2>
                            <div className="flex flex-wrap gap-3">
                                {['student', 'coach', 'club', 'district', 'state'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setRegistrationType(type)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all border ${registrationType === type ? 'bg-ssfi-gold border-ssfi-gold text-ssfi-navy scale-105 shadow-lg' : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            {renderForm()}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <p className="text-sm text-white/50">
                                Already have an account? <span onClick={() => navigate('/login')} className="text-ssfi-gold hover:underline cursor-pointer font-bold">Log In</span>
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
