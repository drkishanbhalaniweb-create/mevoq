import { submitContact } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import OrganicVectorField from '@/app/components/OrganicVectorField';
import Link from 'next/link';

export const metadata = {
    title: 'Contact Mevoq | Pharmaceutical Consulting',
    description: 'Get in touch with our regulatory experts. Schedule a consultation for your FDA, EMA, or Health Canada submissions.',
    alternates: {
        canonical: '/contact',
    },
};

async function submitForm(formData) {
    'use server';

    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        message: formData.get('message'),
    };

    if (!rawData.email || !rawData.name || !rawData.message) {
        redirect('/contact?error=true');
    }

    try {
        await submitContact(rawData);
    } catch (error) {
        console.error('Submission error:', error);
        redirect('/contact?error=true');
    }

    redirect('/contact?submitted=true');
}

export default async function ContactPage(props) {
    const searchParams = await props.searchParams;
    const isSubmitted = searchParams?.submitted === 'true';
    const hasError = searchParams?.error === 'true';

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            {/* Background Anchor */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.2]">
                <OrganicVectorField variant="hero" className="w-full h-full" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 pt-32 pb-32 relative z-10">
                <div className="max-w-6xl mx-auto">

                    {/* Editorial Header */}
                    <div className="mb-20">
                        <div className="mb-6">
                            <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.3em] border-l-2 border-primary-teal pl-4 py-1">
                                Engagement Protocol [MVQ-INTAKE-2024]
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-primary-navy leading-tight mb-8">
                            Accelerate Your <br />
                            <span className="italic">Regulatory Trajectory.</span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
                            Schedule a primary assessment with our senior personnel to review your program under strict confidentiality protocols.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Information Artifact */}
                        <div className="lg:col-span-4 space-y-12">
                            <div className="pt-8 border-t border-gray-100">
                                <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-6">
                                    RESPONSE PROTOCOL
                                </span>
                                <p className="text-sm text-gray-600 leading-relaxed italic">
                                    "Our team operates across dual time zones (US/EU). Initial screening of new inquiries is typically completed within one operational day."
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { label: 'Secure Email', value: 'contact@mevoq.com', icon: Mail },
                                    { label: 'Primary Line', value: '+1 (555) 123-4567', icon: Phone },
                                    { label: 'Operational Hub', value: 'Boston, MA — USA', icon: MapPin }
                                ].map((item, idx) => (
                                    <div key={idx} className="group">
                                        <span className="font-mono text-[9px] font-bold text-primary-teal uppercase tracking-[0.15em] block mb-2">
                                            {item.label}
                                        </span>
                                        <p className="font-serif text-lg text-primary-navy group-hover:translate-x-1 transition-transform">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submission Dossier (Form) */}
                        <div className="lg:col-span-8">
                            <div className="bg-white p-10 md:p-16 border border-gray-100 shadow-sm rounded-sm relative">
                                {isSubmitted ? (
                                    <div className="text-center py-20">
                                        <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.3em] block mb-8">
                                            SUBMISSION VERIFIED
                                        </span>
                                        <h2 className="text-3xl font-serif text-primary-navy mb-6">Inquiry Successfully Logged.</h2>
                                        <p className="text-gray-500 mb-12 max-w-sm mx-auto">
                                            Your program data has been received. A principal consultant will contact you via your work email.
                                        </p>
                                        <Link href="/" className="btn-authority px-10 py-4 font-bold text-xs uppercase tracking-widest">
                                            Return to Portal
                                        </Link>
                                    </div>
                                ) : (
                                    <form action={submitForm} className="space-y-10">
                                        {hasError && (
                                            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-10">
                                                <div className="flex items-center gap-3 text-red-700 font-bold text-sm uppercase tracking-widest mb-2">
                                                    <AlertCircle className="w-4 h-4" />
                                                    Validation Error
                                                </div>
                                                <p className="text-red-600/80 text-sm italic">Verification failed. Please ensure all required operational fields are prioritized correctly.</p>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    Principal Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    className="w-full bg-[#F8FAFC] border-b border-gray-200 py-3 px-0 font-serif text-lg text-primary-navy outline-none focus:border-primary-teal transition-colors"
                                                    placeholder="Dr. Jane Smith"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="email" className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    Operational Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    required
                                                    className="w-full bg-[#F8FAFC] border-b border-gray-200 py-3 px-0 font-serif text-lg text-primary-navy outline-none focus:border-primary-teal transition-colors"
                                                    placeholder="jane@biotech.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="company" className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                Institution / Organization
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                id="company"
                                                className="w-full bg-[#F8FAFC] border-b border-gray-200 py-3 px-0 font-serif text-lg text-primary-navy outline-none focus:border-primary-teal transition-colors"
                                                placeholder="Organization Name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                Engagement Brief
                                            </label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows="4"
                                                required
                                                className="w-full bg-[#F8FAFC] border-b border-gray-200 py-3 px-0 font-serif text-lg text-primary-navy outline-none focus:border-primary-teal transition-colors resize-none"
                                                placeholder="Please provide a high-level summary of your regulatory needs or program timeline..."
                                            />
                                        </div>

                                        <div className="pt-6">
                                            <button
                                                type="submit"
                                                className="btn-authority w-full md:w-auto px-16 py-5 font-bold tracking-[0.2em] group"
                                            >
                                                Submit Intake Dossier <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>

                                        <p className="font-mono text-[9px] text-gray-400 leading-relaxed border-t border-gray-50 pt-8 mt-10 italic">
                                            NOTE: Data transmitted via this portal is encrypted and routed through our secure internal servers. By submitting this briefing, you consent to our standard professional data handling protocols.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
