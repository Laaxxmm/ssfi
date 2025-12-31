import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button, GlassCard, Badge } from '../components/UI';
import { ChevronRight, ChevronLeft, MapPin, ArrowRight, TrendingUp, Users, Medal, Trophy, Star, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

const Landing = () => {
   const navigate = useNavigate();
   const { heroSlides, publicEvents, blogPosts } = useStore();
   const [currentSlide, setCurrentSlide] = useState(0);

   // Auto-play carousel
   useEffect(() => {
      if (!heroSlides?.length) return;
      const timer = setInterval(() => {
         setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 6000); // 6 seconds for better viewing
      return () => clearInterval(timer);
   }, [heroSlides?.length]);

   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % (heroSlides?.length || 1));
   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + (heroSlides?.length || 1)) % (heroSlides?.length || 1));

   // Safety check for empty arrays
   const safeHeroSlides = heroSlides || [];
   const safePublicEvents = publicEvents || [];
   const safeBlogPosts = blogPosts || [];

   if (!safeHeroSlides.length) {
      return <div className="min-h-screen flex items-center justify-center text-white">Loading content...</div>;
   }

   return (
      <div className="flex flex-col gap-24 pb-20">
         {/* Full Screen Hero Carousel (1920x1200 style) */}
         <section className="relative h-screen w-full overflow-hidden -mt-24">
            <AnimatePresence mode="wait">
               <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 z-0"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                  {/* Image Styling: object-cover for full-width hero display */}
                  <img
                     src={safeHeroSlides[currentSlide]?.imageUrl}
                     alt={safeHeroSlides[currentSlide]?.title}
                     className="w-full h-full object-cover object-center"
                  />
               </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 z-20 flex items-center">
               <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2">
                  <div className="space-y-6 lg:pl-8">
                     <motion.div
                        key={`text-${currentSlide}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                     >
                        <div className="flex items-center gap-3 mb-6">
                           <span className="w-12 h-1 bg-ssfi-gold rounded-full" />
                           <span className="text-ssfi-gold font-bold tracking-widest uppercase text-sm">
                              Official SSFI Platform
                           </span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-display font-extrabold text-white leading-tight drop-shadow-2xl">
                           {safeHeroSlides[currentSlide]?.title}
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-lg font-light leading-relaxed">
                           {safeHeroSlides[currentSlide]?.subtitle}
                        </p>
                        <div className="mt-10 flex gap-4">
                           {/* Fixed visibility by using secondary variant (Gold bg, Navy text) explicitly */}
                           <Button
                              variant="secondary"
                              onClick={() => navigate(safeHeroSlides[currentSlide]?.ctaLink)}
                              className="!px-10 !py-5 text-lg font-bold tracking-wide shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-all duration-300"
                           >
                              {safeHeroSlides[currentSlide]?.ctaText} <ChevronRight className="w-5 h-5 ml-2" />
                           </Button>
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4 items-center p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
               <button onClick={prevSlide} className="p-2 rounded-full hover:bg-white/20 text-white transition-all">
                  <ChevronLeft size={20} />
               </button>
               <div className="flex gap-3">
                  {safeHeroSlides.map((_, idx) => (
                     <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-12 bg-ssfi-gold' : 'w-2 bg-white/40 hover:bg-white/80'}`}
                     />
                  ))}
               </div>
               <button onClick={nextSlide} className="p-2 rounded-full hover:bg-white/20 text-white transition-all">
                  <ChevronRight size={20} />
               </button>
            </div>
         </section>

         {/* COMPETITION TIERS (District, State, National) - Highlighting Skating Structure */}
         <section className="max-w-7xl mx-auto px-4 w-full -mt-20 relative z-30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

               {/* District Level */}
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="group relative h-[600px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10"
                  onClick={() => navigate('/events')}
               >
                  {/* Background Image - Skating Specific (Kids/Grassroots) */}
                  <div className="absolute inset-0 z-0">
                     <img
                        src="/images/hero_kids.jpg"
                        className="w-full h-full object-cover transition-all duration-700 opacity-100 group-hover:scale-110"
                        alt="District Skating"
                     />
                     {/* Emerald Overlay - Reduced opacity for visibility */}
                     <div className="absolute inset-0 bg-emerald-900/60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60" />
                  </div>

                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 text-center items-center">
                     <div className="w-20 h-20 rounded-full bg-green-500/20 backdrop-blur-md flex items-center justify-center border border-green-500/50 mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                        <Target size={36} className="text-green-300 group-hover:text-white" />
                     </div>
                     <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-green-300 mb-2">Grassroots</h3>
                     <h2 className="text-4xl font-display font-black text-white uppercase leading-none mb-4">District<br />Events</h2>
                     <p className="text-white/70 text-sm mb-8 leading-relaxed line-clamp-2">Start your journey here. Local qualifiers and inter-club speed skating competitions.</p>

                     {/* Fixed visibility: forced text-white and specific background */}
                     <Button className="w-full !bg-green-600 hover:!bg-green-500 !text-white border-0 shadow-lg shadow-green-900/50 font-bold">
                        View District Calendar
                     </Button>
                  </div>
               </motion.div>

               {/* State Level */}
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  whileHover={{ y: -15 }}
                  className="group relative h-[600px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10"
                  onClick={() => navigate('/events')}
               >
                  {/* Background Image - Skating Specific (Racing) */}
                  <div className="absolute inset-0 z-0">
                     <img
                        src="/images/hero_speed.jpg"
                        className="w-full h-full object-cover transition-all duration-700 opacity-100 group-hover:scale-110"
                        alt="State Skating"
                     />
                     {/* Blue Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#172554] via-[#172554]/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 text-center items-center">
                     <div className="w-20 h-20 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center border border-blue-500/50 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                        <Star size={36} className="text-blue-300 group-hover:text-white" />
                     </div>
                     <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-blue-300 mb-2">Regional</h3>
                     <h2 className="text-4xl font-display font-black text-white uppercase leading-none mb-4">State<br />Championships</h2>
                     <p className="text-white/70 text-sm mb-8 leading-relaxed line-clamp-2">Prove your mettle against the best in your state. Qualify for nationals.</p>

                     <Button
                        onClick={() => navigate('/events?category=State')}
                        className="w-full !bg-blue-600 hover:!bg-blue-500 !text-white border-0 shadow-lg shadow-blue-900/50 font-bold"
                     >
                        View State Calendar
                     </Button>
                  </div>
               </motion.div>

               {/* National Level */}
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  whileHover={{ y: -15 }}
                  className="group relative h-[600px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10"
                  onClick={() => navigate('/events')}
               >
                  {/* Background Image - Skating Specific (Elite) */}
                  <div className="absolute inset-0 z-0">
                     <img
                        src="/images/hero_national.jpg"
                        className="w-full h-full object-cover transition-all duration-700 opacity-100 group-hover:scale-110"
                        alt="National Skating"
                     />
                     {/* Amber Overlay - Reduced opacity */}
                     <div className="absolute inset-0 bg-amber-900/60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60" />
                  </div>

                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 text-center items-center">
                     <div className="w-20 h-20 rounded-full bg-amber-500/20 backdrop-blur-md flex items-center justify-center border border-amber-500/50 mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                        <Trophy size={36} className="text-amber-300 group-hover:text-white" />
                     </div>
                     <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-amber-300 mb-2">Elite</h3>
                     <h2 className="text-4xl font-display font-black text-white uppercase leading-none mb-4">National<br />Federation Cup</h2>
                     <p className="text-white/70 text-sm mb-8 leading-relaxed line-clamp-2">The ultimate glory. Represent your state and compete for the national title.</p>

                     <Button
                        onClick={() => navigate('/events?category=National')}
                        className="w-full !bg-amber-600 hover:!bg-amber-500 !text-white border-0 shadow-lg shadow-amber-900/50 font-bold"
                     >
                        See National Rankings
                     </Button>
                  </div>
               </motion.div>

            </div>
         </section>

         {/* Upcoming Events - Horizontal Scroll */}
         <section className="max-w-7xl mx-auto px-4 w-full pt-10">
            <div className="flex justify-between items-end mb-8">
               <div>
                  <h2 className="text-3xl font-display font-bold text-ssfi-navy dark:text-white mb-2">Race Calendar</h2>
                  <p className="text-ssfi-navy/60 dark:text-white/50">Upcoming district and national meets</p>
               </div>
               <Button variant="outline" onClick={() => navigate('/events')} className="text-sm">View All Events</Button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
               {safePublicEvents.map((event) => (
                  <motion.div
                     key={event.id}
                     className="min-w-[300px] md:min-w-[350px] snap-center"
                     whileHover={{ y: -5 }}
                  >
                     <GlassCard className="h-full group hover:border-ssfi-gold/30 transition-colors bg-white/40 dark:bg-white/5">
                        <div className="aspect-[2/1] bg-white/5 rounded-xl mb-4 overflow-hidden relative">
                           <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                           />
                           <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-center">
                              <span className="block text-xs text-white/70 uppercase">{event.date.split(' ')[0]}</span>
                              <span className="block text-xl font-bold font-display text-white">{event.date.split(' ')[1].replace(',', '')}</span>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <Badge color="blue">{event.category} Level</Badge>
                           <h3 className="text-xl font-bold text-ssfi-navy dark:text-white">{event.title}</h3>
                           <div className="flex items-center text-sm text-ssfi-navy/60 dark:text-white/50 gap-2">
                              <MapPin size={14} />
                              <span>{event.location}</span>
                           </div>
                           <Button className="w-full mt-4">Register Now</Button>
                        </div>
                     </GlassCard>
                  </motion.div>
               ))}
            </div>
         </section>

         {/* Coach CTA Section */}
         <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-ssfi-navy" />
            <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-ssfi-navy via-ssfi-navy/90 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="max-w-2xl space-y-6">
                  <h2 className="text-4xl font-display font-bold text-white">Shape the Future of Indian Skating</h2>
                  <p className="text-lg text-blue-200/70 leading-relaxed">
                     Are you a certified coach? Join the SSFI digital ecosystem to manage athletes, track performance analytics, and get recognized on a national platform.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                        <TrendingUp className="text-green-400" size={18} />
                        <span>Analytics Tools</span>
                     </div>
                     <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                        <Users className="text-blue-400" size={18} />
                        <span>Club Management</span>
                     </div>
                  </div>
                  <Button onClick={() => navigate('/login')} variant="secondary" className="!px-8 !py-4 mt-4">Apply as Coach</Button>
               </div>

               <div className="hidden md:block relative">
                  <div className="w-64 h-64 rounded-full bg-ssfi-gold/20 blur-[60px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <img
                     src="/images/hero_elite_champions.png"
                     alt="Coach"
                     className="relative z-10 w-80 h-96 object-cover rounded-2xl rotate-3 border border-white/20 shadow-2xl"
                  />
               </div>
            </div>
         </section>

         {/* Bento Grid - Blogs & Gallery */}
         <section className="max-w-7xl mx-auto px-4 w-full">
            <h2 className="text-3xl font-display font-bold text-ssfi-navy dark:text-white mb-8">Latest Updates</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-rows-2 h-auto md:h-[600px]">

               {/* Main Feature Blog */}
               {safeBlogPosts.length > 0 && (
                  <div onClick={() => navigate('/blogs')} className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl cursor-pointer shadow-lg">
                     <img
                        src={safeBlogPosts[0].imageUrl}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt="Feature"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                        <div className="flex gap-2 mb-2">
                           {(safeBlogPosts[0].tags || []).map(t => <Badge key={t} color="green">{t}</Badge>)}
                        </div>
                        <h3 className="text-2xl font-bold text-white mt-3 mb-2">{safeBlogPosts[0].title}</h3>
                        <p className="text-white/70 line-clamp-2">{safeBlogPosts[0].excerpt}</p>
                     </div>
                  </div>
               )}

               {/* Gallery Preview */}
               <div onClick={() => navigate('/gallery')} className="md:col-span-1 md:row-span-1 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-3xl p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-lg cursor-pointer">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-lg text-ssfi-navy dark:text-white">Media Gallery</h3>
                     <ArrowRight size={18} className="text-ssfi-navy/50 dark:text-white/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 h-[140px]">
                     <img src="https://images.unsplash.com/photo-1520697966380-60b21950d24c?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
                     <img src="https://images.unsplash.com/photo-1533560796336-d24ebf4c6e94?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex gap-2 mt-4">
                     <span className="text-[10px] px-2 py-1 rounded bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300">#Nationals2024</span>
                     <span className="text-[10px] px-2 py-1 rounded bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-300">#Training</span>
                  </div>
               </div>

               {/* Side Blog 1 */}
               {safeBlogPosts.length > 1 && (
                  <div onClick={() => navigate('/blogs')} className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-3xl group cursor-pointer shadow-lg">
                     <img
                        src={safeBlogPosts[1].imageUrl}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/50 hover:bg-black/40 transition-colors p-6 flex flex-col justify-end">
                        <h4 className="font-bold text-lg leading-tight text-white">{safeBlogPosts[1].title}</h4>
                        <span className="text-xs text-white/60 mt-2">{safeBlogPosts[1].date}</span>
                     </div>
                  </div>
               )}

               {/* Announcement Box */}
               <div className="md:col-span-2 md:row-span-1 bg-ssfi-navy border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 p-20 bg-blue-500/10 rounded-full blur-[50px]" />
                  <div className="relative z-10 flex flex-col h-full justify-between">
                     <div>
                        <Badge color="purple">Announcement</Badge>
                        <h3 className="text-xl font-bold mt-3 text-white">SSFI Annual General Meeting 2024</h3>
                     </div>
                     <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-white/50">New Delhi Headquarters</p>
                        <Button variant="outline" className="!py-2 !px-4 text-xs border-white/20 text-white">Read Minutes</Button>
                     </div>
                  </div>
               </div>

            </div>
         </section>
      </div>
   );
};

export default Landing;