import { getServices } from '@/lib/supabase';
import { MapPin, FileText, ShieldCheck, PenTool, AlertTriangle, Folder, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import OrganicVectorField from '@/app/components/OrganicVectorField';

export const revalidate = 3600;

export const metadata = {
    title: 'Pharmaceutical Regulatory Consulting Services | Mevoq',
    description: 'Comprehensive regulatory affairs consulting services. From FDA IND/NDA submissions to GMP compliance audits and medical writing.',
    alternates: {
        canonical: '/services',
    },
};

const getIcon = (iconName) => {
    const icons = {
        'map-pin': MapPin,
        'file-text': FileText,
        'shield-check': ShieldCheck,
        'pen-tool': PenTool,
        'alert-triangle': AlertTriangle,
        'folder': Folder
    };
    return icons[iconName] || FileText;
};

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            {/* Hero Section: The Dossier Header */}
            <section className="relative py-24 sm:py-32 overflow-hidden border-b border-gray-200/50">
                <OrganicVectorField variant="hero" className="absolute top-0 right-0 w-2/3 h-full opacity-[0.4]" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <div className="mb-6">
                            <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.3em] border-l-2 border-primary-teal pl-4 py-1">
                                Service Classification [V.2015.1]
                            </span>
                        </div>
                        <h1 className="text-4xl font-serif text-primary-navy sm:text-6xl mb-8 leading-[1.1]">
                            Expert Guidance Through <br />
                            Every Regulatory Milestone
                        </h1>
                        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                            We simplify the complex path to approval with strategic foresight, precision documentation, and proactive compliance management.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services List: The Capabilities Dossier */}
            <section className="py-24 sm:py-32 bg-[#F1F5F9]/30">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-12">
                        {services.map((service, index) => {
                            const Icon = getIcon(service.icon);

                            return (
                                <div
                                    key={service.id}
                                    id={service.id}
                                    className="group relative bg-white border border-gray-200/60 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm flex flex-col h-full transform hover:-translate-y-1"
                                >
                                    {/* Subtle Paper Texture Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-sm"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'repeat'
                                        }}
                                    />

                                    {/* Card Header: Icon & Index */}
                                    <div className="flex justify-between items-start mb-8 relative z-10">
                                        <div className="w-14 h-14 bg-gray-50/50 flex items-center justify-center rounded-sm border border-gray-100 group-hover:border-primary-teal group-hover:bg-primary-teal/5 transition-all duration-300">
                                            <Icon className="w-7 h-7 text-primary-navy group-hover:text-primary-teal transition-colors" />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="font-mono text-[10px] font-bold text-gray-300 group-hover:text-primary-teal transition-colors tracking-widest">
                                                ID: 0{index + 1}
                                            </span>
                                            <div className="w-4 h-[1px] bg-gray-200 mt-1 transition-all group-hover:w-8 group-hover:bg-primary-teal"></div>
                                        </div>
                                    </div>

                                    {/* Card Content Area */}
                                    <div className="flex-grow relative z-10">
                                        <h2 className="text-2xl font-serif text-primary-navy mb-4 group-hover:text-primary-teal transition-colors leading-tight">
                                            {service.title}
                                        </h2>
                                        <p className="text-gray-500 leading-relaxed text-[15px] mb-8 line-clamp-3">
                                            {service.description}
                                        </p>

                                        {/* Simplified Capabilities Index */}
                                        {service.features && service.features.length > 0 && (
                                            <div className="mb-8 pt-6 border-t border-gray-100/80">
                                                <h3 className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-teal/40"></span>
                                                    Core Capabilities
                                                </h3>
                                                <ul className="grid grid-cols-1 gap-y-3">
                                                    {service.features.slice(0, 4).map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 group/feat">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary-teal/60 shrink-0 mt-0.5 group-hover/feat:text-primary-teal transition-colors" />
                                                            <span className="text-gray-600 text-[13px] leading-tight font-medium">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Footer: Outcome & Actions */}
                                    <div className="mt-auto pt-8 border-t border-gray-100 relative z-10">
                                        {service.case_study_snippet ? (
                                            <div className="mb-8 p-5 bg-[#F8FAFC] border-l-2 border-primary-navy/10 relative overflow-hidden group-hover:border-primary-teal/30 transition-colors">
                                                <span className="font-mono text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Verified Outcome</span>
                                                <p className="text-[13px] italic text-gray-600 font-serif leading-relaxed">
                                                    "{service.case_study_snippet}"
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="mb-8 p-4 border border-dashed border-gray-200 rounded-sm">
                                                <p className="text-[11px] text-gray-400 italic">Case data pending synchronization.</p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={`/services/${service.slug || service.id}`}
                                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-teal inline-flex items-center gap-2 hover:gap-3 transition-all"
                                            >
                                                Full Details <ArrowRight className="w-3 h-3" />
                                            </Link>
                                            <Link
                                                href="/contact"
                                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-navy/60 hover:text-primary-navy inline-flex items-center gap-2 transition-colors"
                                            >
                                                Consult <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
