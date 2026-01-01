import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserRole, HeroSlide, PublicEvent, GalleryAlbum, BlogPost } from './types';

interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  theme: 'dark' | 'light';

  // CMS State
  heroSlides: HeroSlide[];
  publicEvents: PublicEvent[];
  galleryAlbums: GalleryAlbum[];
  blogPosts: BlogPost[];

  // Actions
  login: (role: UserRole) => void;
  logout: () => void;
  toggleTheme: () => void;

  // CMS Actions
  addHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (id: string) => void;
  addPublicEvent: (event: PublicEvent) => void;
  deletePublicEvent: (id: string) => void;
  addGalleryAlbum: (album: GalleryAlbum) => void;
  deleteGalleryAlbum: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;

  cmsSection: string;
  setCmsSection: (section: string) => void;
  registrationView: string;
  setRegistrationView: (view: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      theme: 'dark',

      // Initial Data (Mock)
      heroSlides: [
        {
          id: '1',
          title: 'Future Champions on Wheels',
          subtitle: 'Nurturing the next generation of inline skaters. Join our junior development program starting age 4.',
          imageUrl: '/images/hero_kids.jpg',
          ctaText: 'Start Their Journey',
          ctaLink: '/login'
        },
        {
          id: '2',
          title: 'Speed & Precision',
          subtitle: 'Experience the thrill of competitive speed skating. State-of-the-art tracks and world-class coaching.',
          imageUrl: '/images/hero_speed.jpg',
          ctaText: 'Explore Events',
          ctaLink: '/events?category=State'
        },
        {
          id: '3',
          title: 'National Excellence',
          subtitle: 'The official governing body for speed skating in India. Developing athletes for the world stage.',
          imageUrl: '/images/hero_national.jpg',
          ctaText: 'View Rankings',
          ctaLink: '/events?category=National'
        }
      ],
      publicEvents: [
        {
          id: '1',
          title: 'National Speed Championship',
          date: 'Oct 15, 2024',
          location: 'New Delhi',
          category: 'National',
          imageUrl: '/images/hero_national.jpg',
          registrationLink: '/events',
          cost: '₹2,500',
          deadline: 'Oct 10, 2024',
          time: '08:00 AM - 06:00 PM',
          description: 'The premier national event of the year. Skaters from all states compete for the national title. Categories include 500m Sprint, 1000m Endurance, and Relay.',
          state: 'Delhi',
          district: 'New Delhi'
        },
        {
          id: '2',
          title: 'Maharashtra State Qualifiers',
          date: 'Nov 02, 2024',
          location: 'Pune',
          category: 'State',
          imageUrl: '/images/hero_speed.jpg',
          registrationLink: '/events',
          cost: '₹1,500',
          deadline: 'Oct 25, 2024',
          time: '09:00 AM - 05:00 PM',
          description: 'Qualifying rounds for the state team selection. Top 3 finishers in each category will proceed to nationals.',
          state: 'Maharashtra',
          district: 'Pune'
        },
        {
          id: '3',
          title: 'Bangalore Club Meet',
          date: 'Sept 28, 2024',
          location: 'Bangalore',
          category: 'Club',
          imageUrl: '/images/hero_kids.jpg',
          registrationLink: '/events',
          cost: '₹500',
          deadline: 'Sept 25, 2024',
          time: '07:00 AM - 11:00 AM',
          description: 'Friendly club meet for beginners and intermediates. A great platform to experience competitive skating.',
          state: 'Karnataka',
          district: 'Bangalore'
        }
      ],
      galleryAlbums: [
        { id: '1', title: 'National Championship 2023', coverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop', category: 'National', imageCount: 45 },
        { id: '2', title: 'Training Camp - Manali', coverImage: 'https://images.unsplash.com/photo-1552674605-4694559e5bc7?q=80&w=800&auto=format&fit=crop', category: 'Club', imageCount: 120 },
      ],
      blogPosts: [
        { id: '1', title: 'Top 5 Nutrition Tips for Skaters', excerpt: 'Fuel your body for peak performance with these essential dietary guidelines.', date: 'Aug 12, 2024', author: 'Dr. A. Singh', imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=800&auto=format&fit=crop', category: 'Health', tags: ['Nutrition', 'Performance'] },
        { id: '2', title: 'Understanding Wheel Hardness', excerpt: 'A comprehensive guide to choosing the right wheels for different track surfaces.', date: 'July 28, 2024', author: 'Coach Mike', imageUrl: 'https://images.unsplash.com/photo-1575470522418-b88b692b8084?q=80&w=800&auto=format&fit=crop', category: 'Equipment', tags: ['Gear', 'Technical'] },
      ],

      login: (role) => set({
        isAuthenticated: true,
        currentUser: {
          id: '1',
          name: role === UserRole.STUDENT ? 'Rohan Gupta' : role === UserRole.NATIONAL_ADMIN ? 'Dr. Administrator' : 'Admin User',
          email: 'user@ssfi.org',
          role
        }
      }),
      logout: () => set({ isAuthenticated: false, currentUser: null }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      // CMS Reducers
      addHeroSlide: (slide) => set((state) => ({ heroSlides: [...state.heroSlides, slide] })),
      deleteHeroSlide: (id) => set((state) => ({ heroSlides: state.heroSlides.filter(s => s.id !== id) })),
      addPublicEvent: (event) => set((state) => ({ publicEvents: [...state.publicEvents, event] })),
      deletePublicEvent: (id) => set((state) => ({ publicEvents: state.publicEvents.filter(e => e.id !== id) })),
      addGalleryAlbum: (album) => set((state) => ({ galleryAlbums: [...state.galleryAlbums, album] })),
      deleteGalleryAlbum: (id) => set((state) => ({ galleryAlbums: state.galleryAlbums.filter(a => a.id !== id) })),
      addBlogPost: (post) => set((state) => ({ blogPosts: [...state.blogPosts, post] })),
      deleteBlogPost: (id) => set((state) => ({ blogPosts: state.blogPosts.filter(p => p.id !== id) })),

      // UI State
      cmsSection: 'hero',
      setCmsSection: (section) => set({ cmsSection: section }),
      registrationView: 'student',
      setRegistrationView: (view) => set({ registrationView: view }),
    }),
    {
      name: 'ssfi-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);