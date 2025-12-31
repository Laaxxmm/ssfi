import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { GlassCard, Button, Badge } from '../components/UI';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { publicEvents } = useStore();

    const event = publicEvents.find(e => e.id === id);

    if (!event) {
        return (
            <div className="min-h-screen pt-32 text-center text-white">
                <h2 className="text-2xl font-bold">Event not found</h2>
                <Button onClick={() => navigate('/events')} variant="secondary" className="mt-4">Back to Events</Button>
            </div>
        );
    }

    return (
        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
            <Button variant="outline" onClick={() => navigate('/events')} className="mb-6 text-white/60 hover:text-white pl-0 border-none bg-transparent">
                <ArrowLeft size={18} className="mr-2" /> Back to Events
            </Button>
            <GlassCard>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-video rounded-xl overflow-hidden">
                        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <Badge color="blue">{event.category}</Badge>
                            <h1 className="text-4xl font-display font-bold text-white mt-4">{event.title}</h1>
                        </div>
                        <div className="space-y-4 text-lg text-white/80">
                            <div className="flex items-center gap-3"><Calendar className="text-ssfi-gold" /> {event.date}</div>
                            <div className="flex items-center gap-3"><Clock className="text-ssfi-gold" /> {event.time || 'TBA'}</div>
                            <div className="flex items-center gap-3">
                                <MapPin className="text-ssfi-gold" />
                                <span>
                                    {event.location}
                                    {(event.district || event.state) && <span className="text-white/50 text-sm block">{[event.district, event.state].filter(Boolean).join(', ')}</span>}
                                </span>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-white/60">Registration Fee</span>
                                <span className="text-2xl font-bold text-green-400">{event.cost || 'Free'}</span>
                            </div>
                            <Button className="w-full text-lg py-4" onClick={() => alert("Registration system integration coming in next phase.")}>Register Now</Button>
                            <p className="text-center text-xs text-white/40 mt-2">Registration closes: {event.deadline || 'Soon'}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-12 space-y-4">
                    <h3 className="text-2xl font-bold text-white">Event Details</h3>
                    <p className="text-white/70 leading-relaxed whitespace-pre-line">
                        {event.description || "Join us for this existing skating event. Compete with the best and showcase your skills. Detailed schedule and categories will be announced shortly."}
                    </p>
                </div>
            </GlassCard>
        </div>
    );
};

export default EventDetails;
