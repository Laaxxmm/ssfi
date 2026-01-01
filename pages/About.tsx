import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, Button, Badge } from '../components/UI';
import { Trophy, Target, Users, TrendingUp, Zap, Shield, Award, Crown, Star, Activity, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    const sponsors = [
        { name: 'SpeedWheels', icon: Zap, color: 'text-yellow-400', desc: 'Official Equipment Partner' },
        { name: 'GlidePro', icon: Activity, color: 'text-blue-400', desc: 'Performance Wear' },
        { name: 'SkateMaster', icon: Crown, color: 'text-purple-400', desc: 'Training Academies' },
        { name: 'UrbanRoll', icon: Target, color: 'text-red-400', desc: 'Street Gear' },
        { name: 'HydraSport', icon: Heart, color: 'text-cyan-400', desc: 'Hydration Partners' },
        { name: 'SafeGuard', icon: Shield, color: 'text-green-400', desc: 'Safety Equipment' },
    ];

    return (
        <div className="min-h-screen pt-20 pb-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ssfi-gold/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 max-w-4xl mx-auto"
                >
                    <Badge color="blue">Who We Are</Badge>
                    <h1 className="text-5xl md:text-7xl font-display font-black text-ssfi-navy dark:text-white mt-6 mb-6">
                        Rolling Towards <span className="text-transparent bg-clip-text bg-gradient-to-r from-ssfi-gold to-yellow-300">Excellence</span>
                    </h1>
                </motion.div>

                {/* Mission Statement Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className="p-8 md:p-12 relative overflow-hidden group bg-ssfi-navy dark:bg-white/5">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Trophy size={100} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold font-display text-white mb-6">Welcome to SSFI</h3>
                            <div className="space-y-6 text-white/80 leading-relaxed text-lg">
                                <p>
                                    We are thrilled to welcome you to the official platform of the <strong className="text-ssfi-gold">Skating Federation of India (SSFI)</strong> — the national governing body committed to promoting, nurturing, and empowering the sport of skating across the country.
                                </p>
                                <p>
                                    At SSFI, we believe in the power of sport to transform lives. Our mission is to create a structured, inclusive, and accessible ecosystem that supports skaters at every level — from grassroots to national championships.
                                </p>
                                <p>
                                    Through certified coaching, district and state-level development programs, and national-level competitions, we strive to build a strong foundation for skating in India.
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl h-[400px]">
                            <img
                                src="/images/hero_national.jpg"
                                className="w-full h-full object-cover"
                                alt="Skaters in action"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ssfi-navy via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-0 left-0 p-8">
                                <h4 className="text-white font-bold text-xl">The Power of Skating</h4>
                                <p className="text-white/60 text-sm mt-2">Transforming lives through structured development.</p>
                            </div>
                        </div>

                        <GlassCard className="p-8 bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10">
                            <p className="text-ssfi-navy/80 dark:text-white/80 italic border-l-4 border-ssfi-gold pl-6 font-medium">
                                "Whether you’re an aspiring athlete, a passionate coach, a parent, or a supporter of the sport, SSFI welcomes you to be part of this growing movement."
                            </p>
                        </GlassCard>
                    </motion.div>
                </div>

                {/* Vision Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {[
                        { icon: Target, title: "Our Mission", text: "To create a structured, inclusive, and accessible ecosystem for skaters of all levels." },
                        { icon: Users, title: "Our Community", text: "Building a supportive network of athletes, coaches, and parents across the nation." },
                        { icon: TrendingUp, title: "Our Vision", text: "To discover hidden talent and take Indian skating to the global stage." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="h-full bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-ssfi-gold/50 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon className="text-ssfi-gold" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-ssfi-navy dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-600 dark:text-white/60">{item.text}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mb-24">
                    <h2 className="text-3xl font-bold text-ssfi-navy dark:text-white mb-6">Join us on this exciting journey</h2>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" onClick={() => navigate('/login')}>Join SSFI Today</Button>
                        <Button size="lg" variant="outline" className="border-ssfi-navy/20 dark:border-white/20 text-ssfi-navy dark:text-white hover:bg-gray-100 dark:hover:bg-white/10" onClick={() => navigate('/events')}>Explore Events</Button>
                    </div>
                    <div className="mt-8 flex gap-3 justify-center text-ssfi-gold text-sm font-mono tracking-widest font-bold">
                        <span>#SkateIndia</span>
                        <span>•</span>
                        <span>#SSFI</span>
                        <span>•</span>
                        <span>#PowerOfSkating</span>
                    </div>
                </div>

                {/* Sponsors Section */}
                <div className="border-t border-gray-200 dark:border-white/10 pt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-ssfi-navy dark:text-white mb-2">Our Partners & Sponsors</h2>
                        <p className="text-gray-500 dark:text-white/40">Powering the future of Indian Skating</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {sponsors.map((s, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl flex flex-col items-center justify-center text-center gap-4 hover:border-gray-300 dark:hover:border-white/10 transition-colors group cursor-pointer"
                            >
                                <s.icon size={32} className={`${s.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-white text-sm tracking-wide">{s.name}</div>
                                    <div className="text-[10px] text-gray-500 dark:text-white/30 uppercase mt-1">{s.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
