import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { GlassCard, Button, Badge } from '../components/UI';
import { Calendar, MapPin, ExternalLink, Filter, ChevronDown, ListFilter, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';

const STATES = ['Maharashtra', 'Karnataka', 'Delhi', 'Haryana', 'Tamil Nadu'];
const DISTRICTS: Record<string, string[]> = {
  Maharashtra: ['Pune', 'Mumbai', 'Nashik', 'Nagpur', 'Thane'],
  Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
  Delhi: ['New Delhi', 'North Delhi', 'South Delhi'],
  Haryana: ['Gurugram', 'Faridabad'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai']
};

const Events = () => {
  const { publicEvents } = useStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [category, setCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  // Sync with URL params on mount
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);

    const st = searchParams.get('state');
    if (st && STATES.includes(st)) setSelectedState(st);

    const dist = searchParams.get('district');
    if (dist) setSelectedDistrict(dist);
  }, []);

  // Update URL function
  const updateFilters = (newCat?: string, newState?: string, newDist?: string) => {
    const c = newCat !== undefined ? newCat : category;
    const s = newState !== undefined ? newState : selectedState;
    const d = newDist !== undefined ? newDist : selectedDistrict;

    setCategory(c);
    if (newState !== undefined) setSelectedState(newState); // Reset district if state changes? handled below
    if (newDist !== undefined) setSelectedDistrict(newDist);

    const params: any = {};
    if (c && c !== 'All') params.category = c;
    if (s) params.state = s;
    if (d) params.district = d;
    setSearchParams(params);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters(undefined, e.target.value, ''); // Clear district on state change
  };

  const filteredEvents = publicEvents.filter(event => {
    // 1. Category Filter
    if (category !== 'All' && event.category !== category) return false;

    // 2. State Filter (only applies if state is selected AND (category is State or District OR category is All))
    // Actually strictly, if state is selected, we should filter by it regardless, unless event has no state (National might).
    if (selectedState && event.state && event.state !== selectedState) return false;

    // 3. District Filter
    if (selectedDistrict && event.district && event.district !== selectedDistrict) return false;

    return true;
  });

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-12">
      <div className="text-center py-10">
        <h1 className="text-4xl font-display font-bold text-ssfi-navy dark:text-white">Official Event Calendar</h1>
        <p className="text-ssfi-navy/60 dark:text-white/50 mt-2">Find competitions, trials, and seminars near you.</p>
      </div>

      {/* Filter Bar */}
      <GlassCard className="p-4 flex flex-col md:flex-row flex-wrap gap-4 items-center justify-between sticky top-20 z-20 backdrop-blur-xl bg-black/40 border-ssfi-gold/20">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
          {['All', 'National', 'State', 'District', 'Club'].map(cat => (
            <button
              key={cat}
              onClick={() => updateFilters(cat, cat === 'National' ? '' : undefined, cat === 'National' || cat === 'State' ? '' : undefined)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${category === cat ? 'bg-ssfi-gold text-ssfi-navy box-shadow-glow' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
            >
              {cat} Events
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          {/* State Dropdown - Show for All, State, District, Club */}
          {(category === 'All' || category === 'State' || category === 'District' || category === 'Club') && (
            <div className="relative group">
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="appearance-none bg-black/20 border border-white/10 rounded-lg pl-4 pr-10 py-2 text-white text-sm focus:outline-none focus:border-ssfi-gold/50 cursor-pointer min-w-[160px]"
              >
                <option value="">Select State</option>
                {STATES.map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
            </div>
          )}

          {/* District Dropdown - Show for All, District, Club */}
          {(category === 'All' || category === 'District' || category === 'Club') && selectedState && (
            <div className="relative group">
              <select
                value={selectedDistrict}
                onChange={(e) => updateFilters(undefined, undefined, e.target.value)}
                className="appearance-none bg-black/20 border border-white/10 rounded-lg pl-4 pr-10 py-2 text-white text-sm focus:outline-none focus:border-ssfi-gold/50 cursor-pointer min-w-[160px]"
              >
                <option value="">Select District</option>
                {DISTRICTS[selectedState]?.map(d => <option key={d} value={d} className="bg-slate-800">{d}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
            </div>
          )}

          <button onClick={() => updateFilters('All', '', '')} className="p-2 text-white/40 hover:text-white" title="Reset Filters">
            <Filter size={18} />
          </button>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, i) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="h-full flex flex-col group bg-white/40 dark:bg-white/5 hover:border-ssfi-gold/30">
                  <div className="aspect-video rounded-xl overflow-hidden relative mb-4">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      {event.category === 'National' && <Badge color="yellow">National</Badge>}
                      {event.category === 'State' && <Badge color="blue">State</Badge>}
                      {event.category === 'District' && <Badge color="green">District</Badge>}
                      {event.category === 'Club' && <Badge color="gray">Club</Badge>}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 text-ssfi-gold font-bold text-sm">
                        <Calendar size={14} />
                        <span>{event.date}</span>
                      </div>
                      {event.cost && <Badge color="purple" >{event.cost}</Badge>}
                    </div>

                    <h3 className="text-xl font-bold text-ssfi-navy dark:text-white leading-tight">{event.title}</h3>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-ssfi-navy/60 dark:text-white/50">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                      {event.district && (
                        <div className="flex items-center gap-2 text-xs text-ssfi-navy/40 dark:text-white/30 ml-5">
                          <span>• {event.district}, {event.state}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ssfi-navy/10 dark:border-white/10">
                    <Button onClick={() => navigate(`/events/${event.id}`)} className="w-full gap-2 group-hover:bg-ssfi-gold group-hover:text-ssfi-navy transition-colors">
                      View Details <ArrowRight size={16} />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-white/40">
              <ListFilter size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No events found matching your filters.</p>
              <button onClick={() => updateFilters('All', '', '')} className="text-ssfi-gold mt-2 hover:underline">Clear Filters</button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;