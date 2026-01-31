import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative min-h-[90vh] flex flex-col justify-end bg-[#EBF0F5] text-primary-navy shadow-[inset_0_20px_50px_rgba(0,0,0,0.02)]">

            {/* Light Material Edge Highlight */}
            <div className="absolute top-0 left-0 w-full h-px bg-white shadow-sm" />

            {/* Subtle paper-like gradient to give surface direction */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-gray-200/50 pointer-events-none opacity-50" />

            {/* Editorial Margin Guides */}
            <div className="absolute inset-0 pointer-events-none container mx-auto px-4 lg:px-8 border-x border-gray-900/[0.03]">
                <div className="absolute top-0 bottom-0 left-12 w-px bg-gray-900/[0.03]" />
                <div className="absolute top-0 bottom-0 right-12 w-px bg-gray-900/[0.03]" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-32 pt-64 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 items-start">

                    {/* Column 1: Identity & Scope */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block group">
                            <span className="text-3xl font-serif font-bold text-primary-navy tracking-tight">
                                Mevoq<span className="text-primary-teal">.</span>
                            </span>
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs font-light">
                            Strategic regulatory consulting for pharmaceutical companies. We navigate global health authorities to accelerate life-saving therapies.
                        </p>
                        <div className="text-xs text-gray-500 font-medium">
                            &copy; {currentYear} Mevoq
                        </div>
                    </div>

                    {/* Column 2: Practice Areas */}
                    <div className="space-y-8">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-primary-navy/40">Practice Areas</h4>
                        <ul className="space-y-4 text-sm text-gray-600 font-light">
                            <li><Link href="/services/regulatory-strategy-planning" className="hover:text-primary-navy transition-colors duration-300">Regulatory Strategy & Planning</Link></li>
                            <li><Link href="/services/regulatory-documentation" className="hover:text-primary-navy transition-colors duration-300">Regulatory Documentation</Link></li>
                            <li><Link href="/services/quality-compliance" className="hover:text-primary-navy transition-colors duration-300">Quality & Compliance</Link></li>
                            <li><Link href="/services/medical-scientific-writing" className="hover:text-primary-navy transition-colors duration-300">Medical & Scientific Writing</Link></li>
                            <li><Link href="/services/risk-management" className="hover:text-primary-navy transition-colors duration-300">Risk Management</Link></li>
                            <li><Link href="/services/administrative-support" className="hover:text-primary-navy transition-colors duration-300">Administrative Support</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div className="space-y-8">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-primary-navy/40">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-600 font-light">
                            <li><Link href="/about" className="hover:text-primary-navy transition-colors duration-300">About Mevoq</Link></li>
                            <li><Link href="/blog" className="hover:text-primary-navy transition-colors duration-300">Regulatory Insights</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-navy transition-colors duration-300">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-navy transition-colors duration-300">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Governance */}
                    <div className="space-y-8">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-primary-navy/40">Governance</h4>

                        <div className="space-y-6 text-sm text-gray-600 font-light">
                            <div className="flex gap-4 items-start opacity-80">
                                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-1" strokeWidth={1.5} />
                                <span className="leading-relaxed">
                                    Gujarat, India
                                </span>
                            </div>
                            <div className="flex gap-4 items-center opacity-80">
                                <Mail className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                                <a href="mailto:consult@mevoq.com" className="hover:text-primary-navy transition-colors">consult@mevoq.com</a>
                            </div>
                            <div className="flex gap-4 items-center opacity-80">
                                <Phone className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                                <span>+91 8866147937</span>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-200/50 space-y-3">
                            <Link href="/legal/privacy" className="block text-xs text-gray-400 hover:text-primary-navy transition-colors">Privacy Policy</Link>
                            <Link href="/legal/terms" className="block text-xs text-gray-400 hover:text-primary-navy transition-colors">Terms of Engagement</Link>
                            <Link href="/legal/disclaimer" className="block text-xs text-gray-400 hover:text-primary-navy transition-colors">Regulatory Disclaimer</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Landing Zone */}
                <div className="h-32"></div>
            </div>
        </footer>
    );
}
