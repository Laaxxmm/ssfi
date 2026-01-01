import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './UI';
import { Save, Plus, X } from 'lucide-react';

// --- Generic Components ---

const FormInput = ({ label, type = "text", placeholder, value, onChange, required = false }: any) => (
    <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider font-bold text-white/50 ml-1">{label} {required && <span className="text-red-400">*</span>}</label>
        <div className="relative group">
            <input
                type={type}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-ssfi-gold/50 focus:bg-white/5 transition-all font-medium"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
            <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/10 pointer-events-none transition-colors" />
        </div>
    </div>
);

const FormSelect = ({ label, options, value, onChange, required = false }: any) => (
    <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider font-bold text-white/50 ml-1">{label} {required && <span className="text-red-400">*</span>}</label>
        <div className="relative">
            <select
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-ssfi-gold/50 focus:bg-white/5 transition-all font-medium appearance-none cursor-pointer"
                value={value}
                onChange={onChange}
                required={required}
            >
                <option value="" className="bg-slate-900 text-white/50">Select {label}</option>
                {options.map((opt: string) => (
                    <option key={opt} value={opt} className="bg-slate-900 text-white">{opt}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>
        </div>
    </div>
);

const FormSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white/5 rounded-2xl p-8 border border-white/5 space-y-6 hover:bg-white/[0.07] transition-colors">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-ssfi-gold rounded-full" />
            {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {children}
        </div>
    </div>
);

// --- Specific Forms ---

export const StudentForm = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', dob: '', gender: '', school: '', district: '', skaterId: '', category: '',
        aadhaarNo: '', phone: ''
    });
    const [verification, setVerification] = useState({
        otpSent: false,
        otpVerified: false,
        enteredOtp: ''
    });

    const handleSendOTP = () => {
        if (!formData.phone || formData.phone.length < 10) {
            alert("Please enter a valid phone number");
            return;
        }
        setVerification({ ...verification, otpSent: true });
        alert(`OTP sent to ${formData.phone}. (Mock: Use '1234')`);
    };

    const handleVerifyOTP = () => {
        if (verification.enteredOtp === '1234') {
            setVerification({ ...verification, otpVerified: true });
            alert("Phone Verified Successfully!");
        } else {
            alert("Invalid OTP. Please try '1234'");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!verification.otpVerified) {
            alert("Please verify your phone number first.");
            return;
        }
        console.log("Submitting Student:", formData);
        alert("Student Registration Submitted (Mock)");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Personal Details">
                <FormInput label="First Name" required value={formData.firstName} onChange={(e: any) => setFormData({ ...formData, firstName: e.target.value })} />
                <FormInput label="Last Name" required value={formData.lastName} onChange={(e: any) => setFormData({ ...formData, lastName: e.target.value })} />
                <FormInput label="Date of Birth" type="date" required value={formData.dob} onChange={(e: any) => setFormData({ ...formData, dob: e.target.value })} />
                <FormSelect label="Gender" options={['Male', 'Female', 'Other']} required value={formData.gender} onChange={(e: any) => setFormData({ ...formData, gender: e.target.value })} />
            </FormSection>

            <FormSection title="Identity & Verification">
                <FormInput
                    label="Aadhaar Number"
                    placeholder="XXXX XXXX XXXX"
                    value={formData.aadhaarNo}
                    onChange={(e: any) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                    required
                />

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider font-bold text-white/50 ml-1">Mobile Number <span className="text-red-400">*</span></label>
                        <div className="relative">
                            <input
                                type="tel"
                                className={`w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-ssfi-gold/50 focus:bg-white/5 transition-all font-medium ${verification.otpVerified ? 'border-green-500/50 pr-12' : 'pr-24'}`}
                                placeholder="98765 43210"
                                value={formData.phone}
                                onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                disabled={verification.otpVerified}
                            />

                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                {!verification.otpVerified ? (
                                    <button
                                        type="button"
                                        onClick={handleSendOTP}
                                        disabled={verification.otpSent}
                                        className="px-3 py-1.5 rounded-lg bg-ssfi-gold text-ssfi-navy text-xs font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {verification.otpSent ? 'Resend' : 'Get OTP'}
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-1 text-green-400 font-bold text-xs bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                                        <Save size={12} /> Verified
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {verification.otpSent && !verification.otpVerified && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-end gap-3"
                        >
                            <div className="flex-1">
                                <label className="text-xs uppercase tracking-wider font-bold text-white/50 ml-1 mb-1 block">One Time Password</label>
                                <input
                                    type="text"
                                    maxLength={4}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white text-center tracking-[0.5em] font-bold focus:outline-none focus:border-ssfi-gold/50"
                                    placeholder="• • • •"
                                    value={verification.enteredOtp}
                                    onChange={(e: any) => setVerification({ ...verification, enteredOtp: e.target.value })}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleVerifyOTP}
                                className="h-[42px] px-6 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-all shadow-lg"
                            >
                                Verify
                            </button>
                        </motion.div>
                    )}
                </div>
            </FormSection>

            <FormSection title="Skating Details">
                <FormInput label="School / Institution" value={formData.school} onChange={(e: any) => setFormData({ ...formData, school: e.target.value })} />
                <FormSelect label="District" options={['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli']} required value={formData.district} onChange={(e: any) => setFormData({ ...formData, district: e.target.value })} />
                <FormSelect label="Category" options={['Adjustable', 'Quad', 'Inline']} required value={formData.category} onChange={(e: any) => setFormData({ ...formData, category: e.target.value })} />
                <FormInput label="Existing Skater ID (Optional)" value={formData.skaterId} onChange={(e: any) => setFormData({ ...formData, skaterId: e.target.value })} />
            </FormSection>

            <div className="flex justify-end pt-4">
                <Button
                    variant="secondary"
                    className={`!px-8 ${!verification.otpVerified ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                    disabled={!verification.otpVerified}
                >
                    Register Student
                </Button>
            </div>
        </form>
    );
};

export const CoachForm = () => {
    const [formData, setFormData] = useState({ name: '', licenseNo: '', experience: '', specialty: '', phone: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting Coach:", formData);
        alert("Coach Registration Submitted (Mock)");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Coach Profile">
                <FormInput label="Full Name" required value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} />
                <FormInput label="License / Cert Number" required value={formData.licenseNo} onChange={(e: any) => setFormData({ ...formData, licenseNo: e.target.value })} />
                <FormInput label="Experience (Years)" type="number" value={formData.experience} onChange={(e: any) => setFormData({ ...formData, experience: e.target.value })} />
                <FormSelect label="Specialty" options={['Speed', 'Artistic', 'Hockey', 'Slalom']} required value={formData.specialty} onChange={(e: any) => setFormData({ ...formData, specialty: e.target.value })} />
            </FormSection>
            <FormSection title="Contact Info">
                <FormInput label="Phone Number" type="tel" required value={formData.phone} onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })} />
                <FormInput label="Email Address" type="email" required value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} />
            </FormSection>
            <div className="flex justify-end pt-4">
                <Button variant="secondary" className="!px-8">Register Coach</Button>
            </div>
        </form>
    );
};

export const ClubForm = () => {
    const [formData, setFormData] = useState({ clubName: '', regNo: '', district: '', secretaryName: '', contactPhone: '' });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting Club:", formData);
        alert("Club Registration Submitted (Mock)");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Club Information">
                <FormInput label="Club Name" required value={formData.clubName} onChange={(e: any) => setFormData({ ...formData, clubName: e.target.value })} />
                <FormInput label="Registration Number" value={formData.regNo} onChange={(e: any) => setFormData({ ...formData, regNo: e.target.value })} />
                <FormSelect label="District" options={['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli']} required value={formData.district} onChange={(e: any) => setFormData({ ...formData, district: e.target.value })} />
                <FormInput label="Secretary Name" value={formData.secretaryName} onChange={(e: any) => setFormData({ ...formData, secretaryName: e.target.value })} />
                <FormInput label="Contact Phone" value={formData.contactPhone} onChange={(e: any) => setFormData({ ...formData, contactPhone: e.target.value })} />
            </FormSection>
            <div className="flex justify-end pt-4">
                <Button variant="secondary" className="!px-8">Register Club</Button>
            </div>
        </form>
    );
};

export const DistrictForm = () => {
    const [formData, setFormData] = useState({ districtName: '', zone: '', secretary: '', email: '' });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting District:", formData);
        alert("District Registration Submitted (Mock)");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="District Association">
                <FormInput label="District Name" required value={formData.districtName} onChange={(e: any) => setFormData({ ...formData, districtName: e.target.value })} />
                <FormSelect label="Zone" options={['North', 'South', 'East', 'West', 'Central']} required value={formData.zone} onChange={(e: any) => setFormData({ ...formData, zone: e.target.value })} />
                <FormInput label="Secretary Name" required value={formData.secretary} onChange={(e: any) => setFormData({ ...formData, secretary: e.target.value })} />
                <FormInput label="Official Email" type="email" value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} />
            </FormSection>
            <div className="flex justify-end pt-4">
                <Button variant="secondary" className="!px-8">Register District</Button>
            </div>
        </form>
    );
};

export const StateForm = () => {
    const [formData, setFormData] = useState({ stateName: 'Tamil Nadu', affiliationNo: '', president: '', secretary: '' });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting State:", formData);
        alert("State Body Registration Submitted (Mock)");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="State Association">
                <FormInput label="State Name" required value={formData.stateName} onChange={(e: any) => setFormData({ ...formData, stateName: e.target.value })} />
                <FormInput label="Affiliation Number" value={formData.affiliationNo} onChange={(e: any) => setFormData({ ...formData, affiliationNo: e.target.value })} />
                <FormInput label="President Name" value={formData.president} onChange={(e: any) => setFormData({ ...formData, president: e.target.value })} />
                <FormInput label="Secretary Name" value={formData.secretary} onChange={(e: any) => setFormData({ ...formData, secretary: e.target.value })} />
            </FormSection>
            <div className="flex justify-end pt-4">
                <Button variant="secondary" className="!px-8">Update State Details</Button>
            </div>
        </form>
    );
};
