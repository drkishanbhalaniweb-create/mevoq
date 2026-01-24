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
                                Service Classification [V.2024.1]
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
            <section className="py-24 sm:py-32">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="space-y-32">
                        {services.map((service, index) => {
                            const Icon = getIcon(service.icon);

                            return (
                                <div
                                    key={service.id}
                                    id={service.id}
                                    className="relative grid grid-cols-1 lg:grid-cols-12 gap-16 items-start group"
                                >
                                    {/* Vertical Dossier Marker */}
                                    <div className="hidden lg:block lg:col-span-1 border-l border-gray-100 h-full pt-2">
                                        <span className="font-mono text-[10px] font-bold text-gray-300 group-hover:text-primary-teal transition-colors">
                                            [0{index + 1}]
                                        </span>
                                    </div>

                                    {/* Main Content Artifact */}
                                    <div className="lg:col-span-7">
                                        <div className="mb-8">
                                            <div className="w-12 h-[1px] bg-primary-teal/30 mb-8 group-hover:w-24 transition-all duration-700"></div>
                                            <h2 className="text-3xl md:text-4xl font-serif text-primary-navy mb-6">
                                                {service.title}
                                            </h2>
                                            <p className="text-lg text-gray-600 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {service.features && service.features.length > 0 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-12 bg-white p-10 border border-gray-100 shadow-sm rounded-sm">
                                                <div className="col-span-full mb-4">
                                                    <span className="font-mono text-[9px] font-bold text-primary-teal uppercase tracking-widest block mb-2">
                                                        CAPABILITIES INDEX
                                                    </span>
                                                    <div className="w-8 h-[2px] bg-primary-teal/20"></div>
                                                </div>
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-4 list-none group/feature">
                                                        <CheckCircle2 className="w-4 h-4 text-primary-teal/50 shrink-0 mt-1 transition-colors group-hover/feature:text-primary-teal" />
                                                        <span className="text-gray-600 text-[15px] font-medium leading-tight">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Impact / Metric Side-Brief */}
                                    <div className="lg:col-span-4 lg:pl-12 lg:border-l lg:border-gray-100 h-full flex flex-col justify-end">
                                        {service.case_study_snippet ? (
                                            <div className="p-8 bg-[#F1F3F5] border-t-2 border-[#0F172A] relative overflow-hidden">
                                                <div className="relative z-10">
                                                    <span className="font-mono text-[9px] font-bold text-[#0F172A] uppercase tracking-[0.25em] block mb-4">
                                                        VERIFIED OUTCOME
                                                    </span>
                                                    <p className="font-serif text-lg text-primary-navy italic leading-relaxed">
                                                        "{service.case_study_snippet}"
                                                    </p>
                                                </div>
                                                <div className="absolute -bottom-4 -right-4 opacity-[0.05]">
                                                    <Icon className="w-24 h-24" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-8 bg-white border border-gray-100 rounded-sm italic text-gray-400 text-sm">
                                                Operational case data pending analysis.
                                            </div>
                                        )}

                                        <div className="mt-8">
                                            <Link
                                                href="/contact"
                                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F172A] hover:translate-x-1 transition-all inline-flex items-center gap-2"
                                            >
                                                Consult on this Practice <ArrowRight className="w-3 h-3" />
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
