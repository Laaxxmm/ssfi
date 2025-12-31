import React, { useState } from 'react';
import { useStore } from '../store';
import { GlassCard } from '../components/UI';
import { Image as ImageIcon, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const { galleryAlbums } = useStore();
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'National', 'State', 'District', 'Club', 'Event'];

  const filteredAlbums = filter === 'All'
    ? galleryAlbums
    : galleryAlbums.filter(album => album.category === filter);

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-12">
      <div className="text-center py-10">
        <h1 className="text-4xl font-display font-bold text-ssfi-navy dark:text-white">Media Gallery</h1>
        <p className="text-ssfi-navy/60 dark:text-white/50 mt-2">Capturing moments of speed and glory</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat
              ? 'bg-ssfi-gold text-ssfi-navy shadow-lg'
              : 'bg-white/10 text-ssfi-navy/60 dark:text-white/60 hover:bg-white/20'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAlbums.map((album, i) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            layout
          >
            <div className="group cursor-pointer">
              <div className="aspect-square rounded-2xl overflow-hidden relative mb-3 shadow-lg">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <ImageIcon size={24} />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                  <ImageIcon size={10} /> {album.imageCount}
                </div>
              </div>
              <h3 className="font-bold text-lg text-ssfi-navy dark:text-white leading-tight group-hover:text-ssfi-gold transition-colors">{album.title}</h3>
              <p className="text-xs text-ssfi-navy/50 dark:text-white/50 uppercase tracking-wider mt-1">{album.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;