import { getService, getServices } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import OrganicVectorField from '@/app/components/OrganicVectorField';

export const revalidate = 3600;

export async function generateStaticParams() {
    const services = await getServices();
    return services.map((service) => ({
        slug: service.slug || 'default',
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    return {
        title: `${service.title} | Mevoq Regulatory Services`,
        description: service.description,
        alternates: {
            canonical: `/services/${slug}`,
        },
        openGraph: {
            title: `${service.title} | Mevoq Regulatory Services`,
            description: service.description,
            type: 'website',
            images: service.featured_image ? [
                {
                    url: service.featured_image,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                }
            ] : []
        }
    };
}

export default async function ServicePage({ params }) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        notFound();
    }

    // Safety check for features being an array
    const features = Array.isArray(service.features) ? service.features : [];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 sm:py-32 bg-[#F8FAFC] border-b border-gray-200 overflow-hidden">
                {service.featured_image ? (
                    <div className="absolute inset-0">
                        <img
                            src={service.featured_image}
                            alt={service.title}
                            className="w-full h-full object-cover opacity-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/95 to-transparent" />
                    </div>
                ) : (
                    <OrganicVectorField variant="hero" className="absolute top-0 right-0 w-2/3 h-full opacity-[0.1]" />
                )}

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <Link
                            href="/services"
                            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-primary-navy mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Services
                        </Link>

                        <div className="mb-6">
                            <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.3em] border-l-2 border-primary-teal pl-4 py-1">
                                Service Overview
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-navy mb-8 leading-tight">
                            {service.title}
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                            {service.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Image Banner */}
            {service.featured_image && (
                <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                    <img
                        src={service.featured_image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </section>
            )}

            {/* Content & Features */}
            <section className="py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary-navy prose-p:text-gray-600 prose-li:text-gray-600">
                                {service.content ? (
                                    <div dangerouslySetInnerHTML={{ __html: service.content }} />
                                ) : (
                                    <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center text-gray-500">
                                        <p>Detailed service information is currently being updated.</p>
                                    </div>
                                )}
                            </div>

                            {/* Case Study Snippet if available */}
                            {service.case_study_snippet && (
                                <div className="mt-16 bg-[#F1F5F9] border-l-4 border-primary-teal p-8 rounded-r-lg">
                                    <h3 className="font-serif text-xl text-primary-navy mb-3">Case Success</h3>
                                    <p className="text-gray-700 italic font-medium">
                                        "{service.case_study_snippet}"
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32">
                                <div className="bg-white p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 mb-8">
                                    <h3 className="font-serif text-xl text-primary-navy mb-6">Key Deliverables</h3>
                                    <ul className="space-y-4">
                                        {features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                                <CheckCircle2 className="w-5 h-5 text-primary-teal shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-primary-navy text-white p-8 rounded-xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="font-serif text-2xl mb-4">Start Your Project</h3>
                                        <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                                            Ready to move forward? Schedule a consultation with our regulatory experts today.
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center justify-center w-full bg-white text-primary-navy font-bold text-sm uppercase tracking-widest py-4 hover:bg-gray-50 transition-colors"
                                        >
                                            Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal blur-[60px] opacity-20 transform translate-x-10 -translate-y-10"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
