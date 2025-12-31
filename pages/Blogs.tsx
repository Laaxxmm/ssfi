import React from 'react';
import { useStore } from '../store';
import { GlassCard, Badge } from '../components/UI';
import { Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Blogs = () => {
   const { blogPosts } = useStore();

   return (
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-12">
         <div className="text-center py-10">
            <h1 className="text-4xl font-display font-bold text-ssfi-navy dark:text-white">Federation Blog</h1>
            <p className="text-ssfi-navy/60 dark:text-white/50 mt-2">Insights, training tips, and news from the experts</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {blogPosts.map((post, i) => (
               <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
               >
                  <GlassCard className="flex flex-col md:flex-row gap-6 p-0 overflow-hidden bg-white/40 dark:bg-white/5 h-full hover:border-ssfi-gold/30 transition-colors cursor-pointer">
                     <div className="md:w-2/5 h-48 md:h-auto relative">
                        <img
                           src={post.imageUrl}
                           alt={post.title}
                           className="w-full h-full object-cover"
                        />
                     </div>
                     <div className="flex-1 p-6 flex flex-col">
                        <div className="flex gap-2 mb-3">
                           {post.tags.map(tag => <Badge key={tag} color="blue">{tag}</Badge>)}
                        </div>
                        <h2 className="text-xl font-bold text-ssfi-navy dark:text-white mb-2 line-clamp-2">{post.title}</h2>
                        <p className="text-sm text-ssfi-navy/70 dark:text-white/60 mb-4 flex-1 line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between text-xs text-ssfi-navy/50 dark:text-white/40 pt-4 border-t border-ssfi-navy/10 dark:border-white/10">
                           <div className="flex items-center gap-1">
                              <User size={12} /> {post.author}
                           </div>
                           <div className="flex items-center gap-1">
                              <Clock size={12} /> {post.date}
                           </div>
                        </div>
                     </div>
                  </GlassCard>
               </motion.div>
            ))}
         </div>
      </div>
   );
};

export default Blogs;