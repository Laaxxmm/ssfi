import React, { useState } from 'react';
import { useStore } from '../store';
import Sidebar from '../components/Sidebar';
import { GlassCard, Button, Badge } from '../components/UI';
import { UserRole } from '../types';
import { initializePayment } from '../services/paymentService';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Layout,
   Users,
   Calendar,
   Settings,
   LogOut,
   Plus,
   Trash2,
   Edit2,
   Save,
   X,
   Search,
   Filter,
   ChevronRight,
   Upload,
   Image as ImageIcon,
   BarChart3,
   FileText,
   MapPin,
   Clock,
   DollarSign,
   AlertCircle,
   CheckCircle,
   Target,
   Award,
   Briefcase,
   Sparkles,
   Brain,
   TrendingUp,
   MoreHorizontal,
   BrainCircuit,
   Lock,
   Eye,
   Info,
   Mail,
   Phone,
   Fingerprint,
   Medal,
   GraduationCap,
   ShieldCheck,
   Camera,
   Link as LinkIcon,
   Globe,
   RefreshCw,
   FileSpreadsheet,
   Settings as SettingsIcon,
   ToggleLeft,
   ToggleRight,
   Download,
   User,
   Map,
   Trophy,
   Activity,
   Menu
} from 'lucide-react';
import { generatePerformanceReport } from '../services/geminiService';
import { StudentForm, CoachForm, ClubForm, DistrictForm, StateForm } from '../components/RegistrationForms';

// --- Shared Components ---

const StatBox = ({ label, value, icon: Icon, color, subtext }: any) => (
   <GlassCard className="flex flex-col items-center justify-center p-6 text-center group hover:bg-white/10 transition-colors cursor-default h-full">
      <div className={`p-4 rounded-full bg-${color}-500/10 text-${color}-400 mb-3 group-hover:scale-110 transition-transform duration-300 ring-1 ring-${color}-500/20`}>
         <Icon size={24} />
      </div>
      <h3 className="text-3xl font-display font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-white/50 font-medium uppercase tracking-wide">{label}</p>
      {subtext && <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><TrendingUp size={10} /> {subtext}</p>}
   </GlassCard>
);

const ReadOnlyField = ({ label, value, icon: Icon, isId = false, masked = false }: any) => (
   <div className={`p-3 rounded-lg border transition-colors group ${isId ? 'bg-ssfi-gold/10 border-ssfi-gold/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
      <div className="flex justify-between items-start mb-1">
         <p className={`text-[10px] uppercase font-bold tracking-wider ${isId ? 'text-ssfi-gold' : 'text-white/40'}`}>{label}</p>
         {!isId && <Lock size={10} className="text-white/20 group-hover:text-white/40 transition-colors" />}
      </div>
      <div className="flex items-center gap-2">
         {Icon && <Icon size={14} className={`${isId ? 'text-ssfi-gold' : 'text-white/50'}`} />}
         <p className={`font-mono text-sm font-medium truncate ${masked ? 'blur-[3px] group-hover:blur-none transition-all cursor-pointer' : ''} ${isId ? 'text-white' : 'text-white/80'}`}>
            {value || 'N/A'}
         </p>
      </div>
   </div>
);

// --- Forms ---
const EventForm = ({ onSubmit, defaultCategory, defaultState, defaultDistrict, role }: any) => {
   const [formData, setFormData] = useState({
      title: '', date: '', location: '', time: '',
      cost: '', deadline: '', description: '',
      imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
      registrationLink: '',
      category: defaultCategory || 'District',
      state: defaultState || '',
      district: defaultDistrict || ''
   });

   const handleSubmit = () => {
      onSubmit({ id: Date.now().toString(), ...formData });
      alert("Event Published Successfully!");
      setFormData({ ...formData, title: '', date: '', location: '', time: '', cost: '', deadline: '', description: '' });
   };

   return (
      <GlassCard>
         <h3 className="font-bold text-lg mb-4">Create New Event</h3>
         <div className="space-y-4">
            <input placeholder="Event Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />

            <div className="grid grid-cols-2 gap-4">
               <input placeholder="Date (e.g. Oct 12, 2024)" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />
               <input placeholder="Time (e.g. 9 AM - 5 PM)" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <input placeholder="Location (Venue)" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />
               <input placeholder="Cost (e.g. ₹500)" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <input placeholder="Reg Deadline" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />
               <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  disabled={role !== 'NATIONAL_ADMIN'}
                  className="w-full bg-black/20 border border-white/10 rounded p-3 text-white"
               >
                  <option value="National">National</option>
                  <option value="State">State</option>
                  <option value="District">District</option>
                  <option value="Club">Club</option>
               </select>
            </div>

            <textarea placeholder="Event Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded p-3 text-white h-24" />

            <div className="grid grid-cols-2 gap-4">
               {/* Show State/District inputs logic could be dynamic here, simplified for now */}
               {!defaultState && <input placeholder="State" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />}
               {!defaultDistrict && <input placeholder="District" value={formData.district} onChange={e => setFormData({ ...formData, district: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />}
            </div>

            <Button variant="secondary" onClick={handleSubmit} className="w-full">Publish Event</Button>
         </div>
      </GlassCard>
   );
};

// --- Role Specific Views ---

const StudentView = ({ currentUser }: { currentUser: any }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [profileData, setProfileData] = useState({
      name: currentUser.name,
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
   });

   const mockHistory = [
      { event: 'National Sprint Championship', date: 'Oct 15, 2023', category: '500m', result: 'Gold', time: '44.2s' },
      { event: 'State Qualifiers', date: 'Sep 02, 2023', category: '1000m', result: 'Silver', time: '1:32.5' },
      { event: 'District Meet', date: 'Aug 10, 2023', category: '300m', result: 'Gold', time: '28.1s' },
   ];

   return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Profile Column */}
         <div className="lg:col-span-4 space-y-6">
            <GlassCard className="relative overflow-hidden">
               <div className="absolute top-4 right-4 z-10">
                  <button onClick={() => setIsEditing(!isEditing)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                     {isEditing ? <Save size={18} className="text-green-400" /> : <Edit2 size={18} className="text-white/70" />}
                  </button>
               </div>
               <div className="flex flex-col items-center text-center">
                  <div className="relative group w-32 h-32 mb-4">
                     <img
                        src={profileData.photoUrl}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-4 border-ssfi-navy shadow-xl"
                     />
                     {isEditing && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer">
                           <Camera size={24} className="text-white" />
                        </div>
                     )}
                  </div>

                  {isEditing ? (
                     <input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-white/10 border border-white/20 rounded px-2 py-1 text-center font-bold text-xl mb-1 text-white"
                     />
                  ) : (
                     <h2 className="text-2xl font-bold text-white mb-1">{profileData.name}</h2>
                  )}
                  <Badge color="blue">Student Athlete</Badge>
               </div>

               <div className="mt-8 space-y-3">
                  <ReadOnlyField label="SSFI Unique ID" value={currentUser.ssfiId} icon={Fingerprint} isId />
                  <ReadOnlyField label="Linked Club" value="Speedsters Club, Pune" icon={Users} />
                  <div className="grid grid-cols-2 gap-3">
                     <ReadOnlyField label="State" value={currentUser.region} icon={MapPin} />
                     <ReadOnlyField label="District" value="Pune" icon={Map} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <ReadOnlyField label="Age Group" value="U-14" icon={User} />
                     <ReadOnlyField label="Date of Birth" value="12 Aug 2010" icon={Calendar} masked />
                  </div>
                  <ReadOnlyField label="Aadhar Number" value={currentUser.aadhar} icon={ShieldCheck} masked />
                  <ReadOnlyField label="Email" value={currentUser.email} icon={Mail} />
                  <ReadOnlyField label="Phone" value={currentUser.phone} icon={Phone} />
               </div>

               <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                  <div>
                     <p className="text-[10px] uppercase text-white/40 mb-1">Registration Date</p>
                     <p className="font-mono text-sm">01 Jan 2024</p>
                  </div>
                  <div>
                     <p className="text-[10px] uppercase text-white/40 mb-1">Renewal Due</p>
                     <p className="font-mono text-sm text-yellow-400">01 Jan 2025</p>
                  </div>
               </div>
            </GlassCard>
         </div>

         {/* Stats & History Column */}
         <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <StatBox label="Total Races" value="34" icon={Users} color="blue" subtext="+2 this month" />
               <StatBox label="Gold Medals" value="8" icon={Award} color="yellow" subtext="24% Win Rate" />
               <StatBox label="Best 500m" value="44.2s" icon={Clock} color="green" subtext="New PB!" />
            </div>

            <GlassCard>
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Trophy className="text-ssfi-gold" size={20} /> Event Results & History
               </h3>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="text-xs uppercase text-white/40 border-b border-white/10">
                        <tr>
                           <th className="pb-3 pl-2">Event Name</th>
                           <th className="pb-3">Date</th>
                           <th className="pb-3">Category</th>
                           <th className="pb-3">Time</th>
                           <th className="pb-3">Result</th>
                        </tr>
                     </thead>
                     <tbody className="text-sm">
                        {mockHistory.map((row, i) => (
                           <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="py-4 pl-2 font-medium">{row.event}</td>
                              <td className="py-4 text-white/60">{row.date}</td>
                              <td className="py-4 text-white/60">{row.category}</td>
                              <td className="py-4 font-mono">{row.time}</td>
                              <td className="py-4">
                                 <Badge color={row.result === 'Gold' ? 'yellow' : 'gray'}>{row.result}</Badge>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </GlassCard>
         </div>
      </div>
   );
};

const CoachView = ({ currentUser }: { currentUser: any }) => {
   const handlePayment = () => {
      initializePayment(
         4999,
         { name: currentUser.name, email: currentUser.email, phone: currentUser.phone || '9999999999' },
         "Level 2 Advanced Seminar"
      ).then((res) => console.log("Success", res)).catch(e => console.error(e));
   };

   return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Profile Card */}
         <div className="lg:col-span-1 space-y-6">
            <GlassCard>
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                     <Users size={32} className="text-blue-400" />
                  </div>
                  <div>
                     <h2 className="text-xl font-bold">{currentUser.name}</h2>
                     <p className="text-sm text-white/50">ID: {currentUser.ssfiId}</p>
                  </div>
               </div>
               <div className="space-y-3">
                  <ReadOnlyField label="Affiliated Club" value="Speedsters Club, Pune" icon={Users} />
                  <ReadOnlyField label="Certification Level" value="Level 1 Certified" icon={Award} />
                  <ReadOnlyField label="License Expiry" value="31 Dec 2025" icon={Calendar} />
               </div>
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-ssfi-navy to-blue-900 border-blue-500/30">
               <h3 className="font-bold mb-2">Membership Status</h3>
               <div className="flex items-center gap-2 text-green-400 mb-4">
                  <CheckCircle size={16} /> <span>Active</span>
               </div>
               <Button variant="outline" className="w-full text-xs">Download Digital ID</Button>
            </GlassCard>
         </div>

         {/* Seminar System */}
         <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-display font-bold">Coach Education & Seminars</h2>

            {/* Level 1 - Completed */}
            <GlassCard className="flex flex-col md:flex-row gap-6 items-center opacity-70">
               <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                  <CheckCircle size={32} className="text-green-500" />
               </div>
               <div className="flex-1">
                  <h3 className="text-lg font-bold text-green-400">Level 1: Fundamentals of Speed Skating</h3>
                  <p className="text-sm text-white/60">Completed on June 15, 2023</p>
               </div>
               <Button variant="outline" disabled className="text-green-400 border-green-500/30">Certified</Button>
            </GlassCard>

            {/* Level 2 - Active */}
            <GlassCard className="flex flex-col md:flex-row gap-6 items-center border-ssfi-gold/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-ssfi-gold text-ssfi-navy text-xs font-bold px-3 py-1">OPEN FOR REGISTRATION</div>
               <div className="p-4 bg-ssfi-gold/10 rounded-xl border border-ssfi-gold/30">
                  <GraduationCap size={32} className="text-ssfi-gold" />
               </div>
               <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">Level 2: Advanced Biomechanics & Strategy</h3>
                  <p className="text-sm text-white/60 mb-2">Upcoming Seminar: New Delhi • Oct 20-22, 2024</p>
                  <div className="flex gap-2 text-xs text-white/40">
                     <span>• 3 Days Intensive</span>
                     <span>• International Faculty</span>
                  </div>
               </div>
               <div className="flex flex-col gap-2 min-w-[140px]">
                  <div className="text-center">
                     <span className="text-xl font-bold">₹4,999</span>
                  </div>
                  <Button variant="secondary" onClick={handlePayment}>Register Now</Button>
               </div>
            </GlassCard>
         </div>
      </div>
   );
};

const ClubAdminView = ({ currentUser }: { currentUser: any }) => {
   const [activeTab, setActiveTab] = useState('members');
   const [clubSettings, setClubSettings] = useState({
      address: "123, Sports Complex, Pune",
      logoUrl: ""
   });

   const members = [
      { name: "Aryan Singh", role: "Student", achievements: ["Gold - District", "Silver - State"] },
      { name: "Rohan Das", role: "Student", achievements: ["Gold - National"] },
      { name: "Vikram Rathore", role: "Coach", achievements: ["Level 1 Coach"] },
      { name: "Sarah Lee", role: "Student", achievements: [] },
   ];

   const champions = members.filter(m => m.achievements.some(a => a.includes('Gold')));

   return (
      <div className="space-y-6">
         <div className="flex gap-4 border-b border-white/10 pb-4">
            {['members', 'champions', 'settings'].map(tab => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-ssfi-gold text-ssfi-navy' : 'text-white/60 hover:bg-white/5'}`}
               >
                  {tab}
               </button>
            ))}
         </div>

         {activeTab === 'members' && (
            <GlassCard>
               <h3 className="text-xl font-bold mb-4">Club Members</h3>
               <table className="w-full text-left text-sm">
                  <thead className="text-white/40 uppercase text-xs border-b border-white/10"><tr><th className="pb-3">Name</th><th className="pb-3">Role</th><th className="pb-3">Achievements</th></tr></thead>
                  <tbody>
                     {members.map((m, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                           <td className="py-3">{m.name}</td>
                           <td className="py-3"><Badge color={m.role === 'Coach' ? 'orange' : 'blue'}>{m.role}</Badge></td>
                           <td className="py-3 text-white/60">{m.achievements.join(', ') || '-'}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </GlassCard>
         )}

         {activeTab === 'champions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {champions.map((champ, i) => (
                  <GlassCard key={i} className="flex items-center gap-4 bg-gradient-to-br from-white/10 to-ssfi-gold/5 border-ssfi-gold/30">
                     <div className="p-3 bg-ssfi-gold/20 rounded-full text-ssfi-gold"><Trophy size={24} /></div>
                     <div>
                        <h4 className="font-bold">{champ.name}</h4>
                        <p className="text-xs text-ssfi-gold">{champ.achievements.find(a => a.includes('Gold'))}</p>
                     </div>
                  </GlassCard>
               ))}
            </div>
         )}

         {activeTab === 'settings' && (
            <GlassCard className="max-w-2xl">
               <h3 className="text-xl font-bold mb-6">Club Settings</h3>
               <div className="space-y-4">
                  <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">Club Address</label>
                     <input
                        value={clubSettings.address}
                        onChange={(e) => setClubSettings({ ...clubSettings, address: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded p-3 text-white"
                     />
                  </div>
                  <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">Club Logo URL</label>
                     <div className="flex gap-2">
                        <input
                           value={clubSettings.logoUrl}
                           onChange={(e) => setClubSettings({ ...clubSettings, logoUrl: e.target.value })}
                           placeholder="https://..."
                           className="flex-1 bg-black/20 border border-white/10 rounded p-3 text-white"
                        />
                        <Button variant="secondary">Update</Button>
                     </div>
                  </div>
               </div>
            </GlassCard>
         )}
      </div>
   );
};

const DistrictAdminView = ({ addEvent }: { addEvent: any }) => {
   const [activeTab, setActiveTab] = useState('clubs');
   const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', regLink: '' });

   const clubs = [
      { name: "Speedsters Club", members: 120, location: "Pune City" },
      { name: "Wheels Academy", members: 85, location: "PCMC" },
   ];

   const handleCreateEvent = () => {
      addEvent({
         id: Date.now().toString(),
         title: newEvent.title || "New District Meet",
         date: newEvent.date || "TBD",
         location: newEvent.location || "District Stadium",
         category: "District",
         imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
         registrationLink: newEvent.regLink
      });
      alert("Event Created Successfully!");
      setNewEvent({ title: '', date: '', location: '', regLink: '' });
   };

   return (
      <div className="space-y-6">
         <div className="flex gap-4 border-b border-white/10 pb-4">
            <button onClick={() => setActiveTab('clubs')} className={`px-4 py-2 rounded-lg font-bold ${activeTab === 'clubs' ? 'bg-ssfi-gold text-ssfi-navy' : 'text-white/60'}`}>District Clubs</button>
            <button onClick={() => setActiveTab('events')} className={`px-4 py-2 rounded-lg font-bold ${activeTab === 'events' ? 'bg-ssfi-gold text-ssfi-navy' : 'text-white/60'}`}>Manage Events</button>
         </div>

         {activeTab === 'clubs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {clubs.map((club, i) => (
                  <GlassCard key={i} className="flex justify-between items-center">
                     <div>
                        <h4 className="font-bold text-lg">{club.name}</h4>
                        <p className="text-sm text-white/50">{club.location}</p>
                     </div>
                     <div className="text-right">
                        <span className="text-2xl font-bold">{club.members}</span>
                        <p className="text-xs text-white/40 uppercase">Members</p>
                     </div>
                  </GlassCard>
               ))}
            </div>
         )}

         {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <EventForm
                  onSubmit={addEvent}
                  defaultCategory="District"
                  defaultDistrict="Pune"
                  defaultState="Maharashtra"
                  role="DISTRICT_ADMIN"
               />

               <GlassCard>
                  <h3 className="font-bold text-lg mb-4">Event Gallery Manager</h3>
                  <div className="p-8 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all cursor-pointer">
                     <Upload size={32} className="mb-2" />
                     <p className="text-sm">Select an event to upload images</p>
                  </div>
               </GlassCard>
            </div>
         )}
      </div>
   );
};

// --- Master Control View (KPI & Search) ---
const MasterControlView = () => (
   <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search Bar */}
      <div className="relative">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
         <input
            type="text"
            placeholder="Search for skaters, clubs, or events..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-ssfi-gold/50 transition-colors shadow-lg"
         />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {/* KPI Cards matching legacy colored style */}
         <GlassCard className="p-6 relative overflow-hidden group cursor-pointer border-l-4 border-l-blue-500">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider">Total Clubs</p>
                  <h3 className="text-4xl font-display font-bold text-white mt-1">124</h3>
               </div>
               <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Users size={24} />
               </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-300">
               <TrendingUp size={14} /> <span>12 New this month</span>
            </div>
         </GlassCard>

         <GlassCard className="p-6 relative overflow-hidden group cursor-pointer border-l-4 border-l-green-500">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider">Active Skaters</p>
                  <h3 className="text-4xl font-display font-bold text-white mt-1">8.5k</h3>
               </div>
               <div className="p-3 bg-green-500/10 rounded-lg text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <Activity size={24} />
               </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-300">
               <TrendingUp size={14} /> <span>85% Renewal Rate</span>
            </div>
         </GlassCard>

         <GlassCard className="p-6 relative overflow-hidden group cursor-pointer border-l-4 border-l-purple-500">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider">Dist. Secretaries</p>
                  <h3 className="text-4xl font-display font-bold text-white mt-1">45</h3>
               </div>
               <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Briefcase size={24} />
               </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-purple-300">
               <CheckCircle size={14} /> <span>All Verified</span>
            </div>
         </GlassCard>

         <GlassCard className="p-6 relative overflow-hidden group cursor-pointer border-l-4 border-l-orange-500">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider">State Secretaries</p>
                  <h3 className="text-4xl font-display font-bold text-white mt-1">28</h3>
               </div>
               <div className="p-3 bg-orange-500/10 rounded-lg text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Globe size={24} />
               </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-orange-300">
               <AlertCircle size={14} /> <span>2 Pending Action</span>
            </div>
         </GlassCard>
      </div>

      {/* Events Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <GlassCard className="h-full">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-lg flex items-center gap-2"><Trophy className="text-ssfi-gold" size={20} /> Ongoing Championships</h3>
               <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
               {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                     <div className="w-12 h-12 bg-white/10 rounded md:block hidden md:flex items-center justify-center font-bold text-white/30 text-xs text-center leading-tight">
                        OCT<br /><span className="text-lg text-white">15</span>
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-sm text-white">National Speed Skating Championship</h4>
                        <p className="text-xs text-white/50">New Delhi • Track & Road</p>
                     </div>
                     <Badge color="green">Live</Badge>
                  </div>
               ))}
            </div>
         </GlassCard>

         <GlassCard className="h-full">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><DollarSign className="text-green-400" size={20} /> Recent Transactions</h3>
            <div className="space-y-4">
               {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><DollarSign size={14} /></div>
                        <div>
                           <p className="text-sm font-bold text-white">Club Registration Fee</p>
                           <p className="text-xs text-white/50">Speedsters Club Pune</p>
                        </div>
                     </div>
                     <span className="font-mono text-green-400 font-bold">+ ₹2,500</span>
                  </div>
               ))}
            </div>
         </GlassCard>
      </div>
   </div>
);

// --- Role Management View (Secretary Lists) ---
const RoleManagementView = () => {
   const [activeFilter, setActiveFilter] = useState('state'); // state, district, club

   const secretaries = [
      { id: 'SEC-MH-01', name: 'Dr. Rajesh Kumar', role: 'State Secretary', region: 'Maharashtra', status: 'Active', email: 'sec.mh@ssfi.org' },
      { id: 'SEC-KA-02', name: 'Suresh Patil', role: 'State Secretary', region: 'Karnataka', status: 'Active', email: 'sec.ka@ssfi.org' },
      { id: 'SEC-DL-03', name: 'Amit Sharma', role: 'State Secretary', region: 'Delhi', status: 'Pending', email: 'sec.dl@ssfi.org' },
   ];

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-display">Secretary Management</h2>
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
               {['state', 'district', 'club'].map(f => (
                  <button
                     key={f}
                     onClick={() => setActiveFilter(f)}
                     className={`px-4 py-2 rounded capitalize text-sm font-bold transition-all ${activeFilter === f ? 'bg-ssfi-gold text-ssfi-navy shadow-lg' : 'text-white/60 hover:text-white'}`}
                  >
                     {f} Level
                  </button>
               ))}
            </div>
         </div>

         <GlassCard>
            <table className="w-full text-left text-sm">
               <thead className="bg-white/5 text-white/40 uppercase text-xs">
                  <tr>
                     <th className="px-6 py-4 rounded-l-lg">ID</th>
                     <th className="px-6 py-4">Name</th>
                     <th className="px-6 py-4">Region</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 rounded-r-lg">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {secretaries.map((sec) => (
                     <tr key={sec.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4 font-mono text-white/50">{sec.id}</td>
                        <td className="px-6 py-4">
                           <div className="font-bold text-white">{sec.name}</div>
                           <div className="text-xs text-white/40">{sec.email}</div>
                        </td>
                        <td className="px-6 py-4">{sec.region}</td>
                        <td className="px-6 py-4">
                           <Badge color={sec.status === 'Active' ? 'green' : 'orange'}>{sec.status}</Badge>
                        </td>
                        <td className="px-6 py-4">
                           <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Manage</Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </GlassCard>
      </div>
   );
};

// --- Settings View (Legacy Style) ---
const SettingsView = () => (
   <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-display font-bold text-white">General Settings</h1>
         <Button><Save size={18} className="mr-2" /> Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Application Config */}
         <GlassCard className="p-0 overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex items-center gap-2">
               <Settings size={18} /> Application Configuration
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <label className="block text-xs uppercase text-white/50 mb-1">Application Name</label>
                  <input defaultValue="Speed Skating Federation of India" className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">Contact Email</label>
                     <input defaultValue="admin@ssfi.org" className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />
                  </div>
                  <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">Contact Phone</label>
                     <input defaultValue="+91 99999 88888" className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />
                  </div>
               </div>
               <div>
                  <label className="block text-xs uppercase text-white/50 mb-1">Footer Text</label>
                  <input defaultValue="© 2024 SSFI. All Rights Reserved." className="w-full bg-black/20 border border-white/10 rounded p-3 text-white" />
               </div>
            </div>
         </GlassCard>

         {/* Fees & Payments Config */}
         <GlassCard className="p-0 overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex items-center gap-2">
               <DollarSign size={18} /> Membership Fees Structure
            </div>
            <div className="p-6 space-y-4">
               <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-white/70">Skater Registration Fee</span>
                  <input defaultValue="₹ 500" className="w-32 bg-black/20 border border-white/10 rounded p-2 text-right text-white font-mono" />
               </div>
               <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-white/70">District Affiliation Fee</span>
                  <input defaultValue="₹ 5,000" className="w-32 bg-black/20 border border-white/10 rounded p-2 text-right text-white font-mono" />
               </div>
               <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-white/70">State Affiliation Fee</span>
                  <input defaultValue="₹ 15,000" className="w-32 bg-black/20 border border-white/10 rounded p-2 text-right text-white font-mono" />
               </div>
               <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-white/70">Club Registration Fee</span>
                  <input defaultValue="₹ 2,500" className="w-32 bg-black/20 border border-white/10 rounded p-2 text-right text-white font-mono" />
               </div>
            </div>
         </GlassCard>

         {/* System Maintenance */}
         <GlassCard className="p-0 overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex items-center gap-2">
               <Activity size={18} /> System Maintenance
            </div>
            <div className="p-6 space-y-4">
               <div className="flex justify-between items-center">
                  <div>
                     <h4 className="font-bold text-red-300">Maintenance Mode</h4>
                     <p className="text-xs text-white/50">Prevent users from logging in during updates</p>
                  </div>
                  <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                     <div className="absolute left-1 top-1 w-4 h-4 bg-white/30 rounded-full"></div>
                  </div>
               </div>
               <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div>
                     <h4 className="font-bold">Clear Cache</h4>
                     <p className="text-xs text-white/50">Remove temporary files and session data</p>
                  </div>
                  <Button variant="outline" size="sm">Clear Now</Button>
               </div>
            </div>
         </GlassCard>
      </div>
   </div>
);

// --- Front End Settings View (Legacy CMS Style) ---
const FrontEndSettingsView = () => {
   const { setCmsSection, cmsSection } = useStore();

   return (
      <div className="space-y-6 animate-in fade-in duration-500">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-display font-bold text-white">Front End Settings</h1>
            <Button><Plus size={18} className="mr-2" /> Add New Slide</Button>
         </div>

         <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 space-y-2">
               {['Hero Slider', 'Marquee Text', 'Popup Modal', 'Gallery', 'News', 'Downloads'].map(s => (
                  <button key={s} className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group transition-colors ${s === 'Hero Slider' ? 'bg-ssfi-gold text-ssfi-navy font-bold shadow-lg' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
                     {s}
                     <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${s === 'Hero Slider' ? 'opacity-100' : ''}`} />
                  </button>
               ))}
            </div>

            <div className="col-span-9">
               <GlassCard className="p-0 overflow-hidden min-h-[500px]">
                  <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex items-center justify-between">
                     <span className="flex items-center gap-2"><ImageIcon size={18} /> Hero Slider Management</span>
                     <span className="text-xs font-normal text-white/50">Displaying 3 active slides</span>
                  </div>

                  <div className="p-0">
                     <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-white/40 uppercase text-xs">
                           <tr>
                              <th className="px-6 py-4">Preview</th>
                              <th className="px-6 py-4">Details</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                           {[
                              { id: 1, title: 'National Speed Skating Championship 2024', sub: 'New Delhi • 15th Oct', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=200' },
                              { id: 2, title: 'Join the Junior Development Program', sub: 'Starts Age 4', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200' },
                              { id: 3, title: 'State Selections Announced', sub: 'Check your eligibility now', img: 'https://images.unsplash.com/photo-1552674605-4694559e5bc7?q=80&w=200' }
                           ].map((slide) => (
                              <tr key={slide.id} className="hover:bg-white/5 transition-colors">
                                 <td className="px-6 py-4">
                                    <div className="w-24 h-16 rounded overflow-hidden border border-white/10">
                                       <img src={slide.img} className="w-full h-full object-cover" />
                                    </div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <div className="font-bold text-white">{slide.title}</div>
                                    <div className="text-xs text-white/50">{slide.sub}</div>
                                 </td>
                                 <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs border border-green-500/30">Active</span>
                                 </td>
                                 <td className="px-6 py-4 flex gap-2">
                                    <button className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                    <button className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </GlassCard>
            </div>
         </div>
      </div>
   );
};

const StateAdminView = ({ addEvent }: { addEvent: any }) => {
   const [activeTab, setActiveTab] = useState('overview');

   return (
      <div className="space-y-6">
         <div className="flex gap-4 border-b border-white/10 pb-4">
            {['overview', 'districts', 'events'].map(t => (
               <button key={t} onClick={() => setActiveTab(t)} className={`capitalize px-4 py-2 rounded-lg font-bold ${activeTab === t ? 'bg-ssfi-gold text-ssfi-navy' : 'text-white/60'}`}>{t}</button>
            ))}
         </div>

         {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <StatBox label="Total Districts" value="36" icon={Map} color="blue" />
               <StatBox label="Active Skaters" value="12.5K" icon={Users} color="green" subtext="+15% YoY" />
               <StatBox label="State Events" value="8" icon={Calendar} color="yellow" />
            </div>
         )}

         {activeTab === 'districts' && (
            <GlassCard>
               <h3 className="font-bold mb-4">District Performance</h3>
               <div className="space-y-2">
                  {['Pune', 'Mumbai', 'Nagpur', 'Nashik'].map(d => (
                     <div key={d} className="flex justify-between p-3 bg-white/5 rounded border border-white/5">
                        <span>{d} District</span>
                        <Badge color="green">Active</Badge>
                     </div>
                  ))}
               </div>
            </GlassCard>
         )}

         {activeTab === 'events' && (
            <div>
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">State Level Championships</h3>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <EventForm
                     onSubmit={addEvent}
                     defaultCategory="State"
                     defaultState="Maharashtra"
                     role="STATE_ADMIN"
                  />
                  <GlassCard className="flex items-center justify-center text-white/40">
                     Event List Placeholder
                  </GlassCard>
               </div>
            </div>
         )}
      </div>
   );
};

const NationalAdminView = ({ heroSlides, addHeroSlide, deleteHeroSlide, publicEvents, addPublicEvent, deletePublicEvent, activeSection }: any) => {
   // Switch content based on activeSection directly here for cleaner code in Dashboard main
   switch (activeSection) {
      case 'overview': return <MasterControlView />;
      case 'roles': return <RoleManagementView />;
      case 'registrations':
         return <RegistrationView />;
      case 'settings':
         return <SettingsView />;
      case 'cms': return <FrontEndSettingsView />;

      case 'events':
         return (
            <div className="space-y-6 animate-in fade-in">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <EventForm
                     onSubmit={addPublicEvent}
                     defaultCategory="National"
                     role="NATIONAL_ADMIN"
                  />
                  <GlassCard>
                     <h3 className="font-bold mb-4">Scheduled Events</h3>
                     <div className="space-y-4">
                        {publicEvents.map((e: any) => (
                           <div key={e.id} className="flex justify-between items-center p-4 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-colors">
                              <div>
                                 <h4 className="font-bold flex items-center gap-2">{e.title} <Badge color="blue">{e.category}</Badge></h4>
                                 <p className="text-sm text-white/50">{e.date} • {e.location}</p>
                              </div>
                              <Button variant="outline" className="text-red-400 border-red-500/30 hover:bg-red-500/10" onClick={() => deletePublicEvent(e.id)}><Trash2 size={16} /></Button>
                           </div>
                        ))}
                     </div>
                  </GlassCard>
               </div>
            </div>
         );

      case 'payments':
         return (
            <div className="space-y-6 text-center py-20 animate-in fade-in">
               <DollarSign size={64} className="mx-auto text-white/20 mb-4" />
               <h2 className="text-2xl font-bold text-white">Payments & Transactions</h2>
               <p className="text-white/50">View and reconcile all payment records.</p>
            </div>
         );

      case 'results':
         return (
            <div className="space-y-6 text-center py-20 animate-in fade-in">
               <Trophy size={64} className="mx-auto text-white/20 mb-4" />
               <h2 className="text-2xl font-bold text-white">Race Results</h2>
               <p className="text-white/50">Upload and manage race results for all categories.</p>
            </div>
         );

      case 'reports':
         return (
            <div className="space-y-6 text-center py-20 animate-in fade-in">
               <FileText size={64} className="mx-auto text-white/20 mb-4" />
               <h2 className="text-2xl font-bold text-white">Official Reports</h2>
               <p className="text-white/50">Generate PDF reports for Ministry and Federations.</p>
            </div>
         );
      case 'renewals':
         return (
            <div className="space-y-6 text-center py-20 animate-in fade-in">
               <RefreshCw size={64} className="mx-auto text-white/20 mb-4" />
               <h2 className="text-2xl font-bold text-white">Membership Renewals</h2>
               <p className="text-white/50">Track expiring memberships and renewal stats.</p>
            </div>
         );
      default: return <MasterControlView />;
   }
};


// --- Main Dashboard Component ---

const Dashboard = () => {
   const {
      currentUser,
      heroSlides, addHeroSlide, deleteHeroSlide,
      publicEvents, addPublicEvent, deletePublicEvent
   } = useStore();

   const [activeTab, setActiveTab] = useState('dashboard');
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [showAI, setShowAI] = useState(false);
   const [aiInsight, setAiInsight] = useState<string>("");
   const [loadingAi, setLoadingAi] = useState(false);

   const handleAIAnalysis = async () => {
      if (!currentUser) return;
      setLoadingAi(true);
      setShowAI(true);
      const context = `
      User: ${currentUser.name} (${currentUser.role})
      Region: ${currentUser.region}
      Recent Data:
      - Total Registered Skaters: 1240
      - Gold Medals this season: 15
      - Average 500m time: 44.2s (National Avg: 45.1s)
      - Upcoming Events: National Sprint Championship (2 weeks)
    `;
      const insight = await generatePerformanceReport(currentUser.role, context);
      setAiInsight(insight);
      setLoadingAi(false);
   };

   // Protection against direct access without login
   if (!currentUser) {
      return (
         <div className="flex items-center justify-center h-screen w-full bg-[#0f172a] text-white">
            <div className="text-center">
               <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
               <p className="text-white/50 mb-6">Please log in to view your dashboard.</p>
               <Button onClick={() => window.location.href = '/'} variant="secondary">Return Home</Button>
            </div>
         </div>
      );
   }

   const renderContent = () => {
      switch (currentUser?.role) {
         case UserRole.STUDENT:
            return <StudentView currentUser={currentUser} />;
         case UserRole.COACH:
            return <CoachView currentUser={currentUser} />;
         case UserRole.CLUB_ADMIN:
            return <ClubAdminView currentUser={currentUser} />;
         case UserRole.DISTRICT_ADMIN:
            return <DistrictAdminView addEvent={addPublicEvent} />;
         case UserRole.STATE_ADMIN:
            return <StateAdminView addEvent={addPublicEvent} />;
         case UserRole.NATIONAL_ADMIN:
            return (
               <NationalAdminView
                  heroSlides={heroSlides}
                  addHeroSlide={addHeroSlide}
                  deleteHeroSlide={deleteHeroSlide}
                  publicEvents={publicEvents}
                  addPublicEvent={addPublicEvent}
                  deletePublicEvent={deletePublicEvent}
                  activeSection={activeTab}
               />
            );
         default:
            return (
               <div className="flex flex-col items-center justify-center h-[50vh] text-white/50">
                  <Layout size={64} className="mb-4 opacity-20" />
                  <h2 className="text-xl font-bold text-white">Dashboard Overview</h2>
                  <p>Welcome to your specialized dashboard.</p>
               </div>
            );
      }
   };


   if (!currentUser) {
      return (
         <div className="flex items-center justify-center h-screen w-full bg-[#0f172a] text-white">
            <div className="text-center">
               <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
               <p className="text-white/50 mb-6">Please log in to view your dashboard.</p>
               <Button onClick={() => window.location.href = '/'} variant="secondary">Return Home</Button>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-slate-900 text-white relative">
         <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
         />

         {/* Mobile Header */}
         <div className="md:hidden flex items-center justify-between p-4 glass-panel border-b border-white/10 sticky top-0 z-30">
            <div className="flex items-center gap-3">
               <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-white/70 hover:text-white">
                  <Menu size={24} />
               </button>
               <span className="font-display font-bold text-lg">SSFI Admin</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-ssfi-gold/20 flex items-center justify-center text-ssfi-gold font-bold border border-ssfi-gold/50">
               {currentUser.name[0]}
            </div>
         </div>

         <div className="md:ml-64 p-4 md:p-8 transition-all duration-300">
            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
               <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-ssfi-navy/30 rounded-full blur-[120px]" />
               <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-10 relative z-10">
               <div>
                  <motion.h1
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="text-3xl font-display font-bold"
                  >
                     Welcome back, {(currentUser?.name || '').split(' ')[0]}
                  </motion.h1>
                  <p className="text-white/50 flex items-center gap-2 text-sm mt-1">
                     <span className={`w-2 h-2 rounded-full ${currentUser?.role === UserRole.NATIONAL_ADMIN ? 'bg-ssfi-gold' : currentUser?.role === UserRole.STUDENT ? 'bg-blue-400' : 'bg-green-400'}`} />
                     {currentUser?.role.replace(/_/g, ' ')} Dashboard
                  </p>
               </div>

               <div className="flex items-center gap-4">
                  {currentUser?.role !== UserRole.STUDENT && (
                     <Button onClick={handleAIAnalysis} disabled={loadingAi} variant="secondary" className="!py-2 !px-4 text-xs">
                        {loadingAi ? 'AI Thinking...' : 'Ask AI Analyst'}
                     </Button>
                  )}

                  <div className="text-right hidden md:block">
                     <p className="text-sm font-bold">{currentUser?.region}</p>
                     <p className="text-xs text-white/40">ID: {currentUser?.ssfiId || 'ADMIN'}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center overflow-hidden">
                     <Users className="text-white/70" />
                  </div>
               </div>
            </div>

            {/* AI Insight Overlay */}
            <AnimatePresence>
               {(showAI || aiInsight) && (
                  <motion.div
                     initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                     animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
                     exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                     className="relative z-20 bg-gradient-to-r from-ssfi-navy/80 to-blue-900/80 rounded-xl border border-white/10 overflow-hidden"
                  >
                     <div className="p-6">
                        <div className="flex items-center gap-2 mb-2 text-ssfi-gold">
                           <BrainCircuit size={18} />
                           <span className="font-bold text-sm uppercase tracking-wider">AI Performance Analyst</span>
                        </div>
                        {loadingAi ? (
                           <div className="text-white/50 animate-pulse">Analyzing federation data points...</div>
                        ) : (
                           <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-line text-blue-100">
                              {aiInsight}
                           </div>
                        )}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            {/* Dynamic Content */}
            <div className="relative z-10">
               {renderContent()}
            </div>
         </div>
      </div>
   );
};

export default Dashboard;