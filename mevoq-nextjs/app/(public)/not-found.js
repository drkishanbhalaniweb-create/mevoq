import Link from 'next/link';
import OrganicVectorField from '@/app/components/OrganicVectorField';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center relative overflow-hidden">
            {/* Immersive background decoration */}
            <OrganicVectorField variant="hero" className="absolute inset-0 w-full h-full opacity-[0.3]" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.4em] border border-primary-teal/20 px-4 py-1 rounded-full">
                            System Error: 404
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif text-primary-navy mb-8 leading-tight">
                        Entry Domain <br />
                        <span className="italic text-gray-400">Not Found.</span>
                    </h1>

                    <p className="text-xl text-gray-500 mb-12 leading-relaxed">
                        The requested regulatory document or territory could not be located within our secure index. It may have been reclassified or moved.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/"
                            className="btn-authority px-10 py-5 font-bold tracking-widest flex items-center gap-3 group"
                        >
                            Return to Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/contact"
                            className="text-xs font-bold uppercase tracking-[0.2em] text-primary-navy border-b border-gray-200 hover:border-primary-teal transition-all pb-2"
                        >
                            Report Discrepancy
                        </Link>
                    </div>
                </div>
            </div>

            {/* Alphanumeric footer marker for clinical vibe */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                <span className="font-mono text-[9px] text-gray-300 uppercase tracking-widest">
                    TERMINAL_REF: ERR_PATH_UNDEFINED // MEVOQ_CORE
                </span>
            </div>
        </main>
    );
}
