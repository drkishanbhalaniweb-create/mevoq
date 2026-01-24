import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, Globe2, FileText, Activity } from 'lucide-react';
import { getServices, getStats, getBlogPosts } from '@/lib/supabase';
import HeroBackground from '@/app/components/HeroBackground';
import ApproachSteps from '@/app/components/ApproachSteps';
import AnimatedCounter from '@/app/components/AnimatedCounter';

import RegulatorySystemCanvas from '@/app/components/RegulatorySystemCanvas';

import OrganicVectorField from '@/app/components/OrganicVectorField';

// Helper for strict typography
const SectionHeading = ({ children, className = "" }) => (
  <h2 className={`font-serif text-3xl md:text-4xl text-primary-navy mb-8 ${className}`}>
    {children}
  </h2>
);

const SectionSubtext = ({ children, className = "" }) => (
  <p className={`text-gray-600 text-lg leading-relaxed max-w-2xl ${className}`}>
    {children}
  </p>
);

export default async function Home() {
  const services = await getServices();
  const stats = getStats();
  const posts = await getBlogPosts(true); // Limit to top insights

  // Feature Flag: Toggle between variants
  // Variants: 'default' | 'case-file' | 'systems-engineering'
  const APPROACH_VARIANT = 'case-file';

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ============================================
          HERO SECTION (Strict Narrative)
          ============================================ */}
      {/* ============================================
          HERO SECTION (Strict Narrative)
          ============================================ */}
      <section className="relative min-h-screen flex items-center pt-48 pb-24 overflow-hidden bg-gray-100 border-b border-gray-200/50 -mt-32">

        <HeroBackground />

        <div className="container relative z-10 px-4 mx-auto lg:px-8">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-10 animate-fade-in">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500 border-b border-primary-teal/50 pb-1 drop-shadow-sm">
                Former FDA Reviewers | Global Regulatory Consulting
              </span>
            </div>

            {/* Headline: Increased tension via spacing */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary-navy leading-[1.1] mb-14 animate-fade-in-up [animation-delay:200ms] drop-shadow-md">
              Navigate Drug Approvals with Experts Who Have Worked on the <span className="italic relative z-10 before:absolute before:bottom-2 before:left-0 before:w-full before:h-3 before:bg-primary-teal/20 before:-z-10">Regulatory Side</span>
            </h1>

            {/* Subtext: Increased breathing room */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mb-16 animate-fade-in-up [animation-delay:400ms] drop-shadow-sm">
              Mevoq partners with pharmaceutical and biotech teams to plan and execute regulatory strategies across FDA, EMA, Health Canada, and other global authorities. We help programs move forward with clarity, confidence, and regulatory foresight.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up [animation-delay:600ms]">
              <Link
                href="/contact"
                className="btn-authority px-8 py-4 text-sm font-semibold tracking-wide"
              >
                Schedule a Confidential Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-primary-navy text-sm font-semibold tracking-wide hover:bg-white hover:border-[#0F172A] hover:text-[#0F172A] transition-all duration-300 rounded-sm group"
              >
                View Regulatory Services
                <ArrowRight className="w-4 h-4 ml-2 text-gray-400 group-hover:text-[#0F172A] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        {/* Subtle background texture or grain could go here */}
        <div className="container px-4 mx-auto lg:px-8 relative z-10">
          {/* Governing Editorial Label */}
          <div className="mb-14 flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-gray-400 border-l-2 border-primary-teal pl-4 py-1">
              Data Verification [REF: OPS-2024]
            </span>
            <div className="flex-1 border-t border-gray-100 ml-8 opacity-50"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
            {[
              { label: 'Successful Submissions', value: 34, unit: 'CASES' },
              { label: 'Project Weeks Saved', value: 112, unit: 'WK' },
              { label: 'Years of Experience', value: 25, unit: 'YR' },
              { label: 'Countries Served', value: 9, unit: 'REG' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-4 relative group">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl md:text-5xl text-primary-navy leading-none tracking-tighter">
                    <AnimatedCounter end={stat.value} />
                  </span>
                  <span className="font-mono text-[10px] text-primary-teal font-bold opacity-70">
                    {stat.unit}
                  </span>
                </div>
                <div className="w-8 h-[2px] bg-gray-200 group-hover:bg-primary-teal transition-colors duration-500"></div>
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-gray-500 leading-tight max-w-[140px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PROBLEM ACKNOWLEDGMENT
          ============================================ */}
      <section className="py-32 bg-gray-50 border-y border-gray-200/30">
        <div className="container px-4 mx-auto lg:px-8 text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-primary-navy mb-6 leading-tight">
            Regulatory missteps cost time and capital. <br />
            We provide the foresight to avoid them.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            In an environment where every day of delay impacts patient access and commercial viability, reliance on generalist advice is a risk you cannot afford.
          </p>
        </div>
      </section>

      {/* ============================================
          SERVICES (Grouped)
          ============================================ */}
      <section className="py-32 bg-gray-100 border-b border-gray-200/50 relative overflow-hidden">
        {/* Side-anchored Vector Field for depth */}
        <OrganicVectorField variant="edge-right" className="absolute top-0 right-0 w-1/2 h-full opacity-[0.3]" />

        <div className="container px-4 mx-auto lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="mb-6">
                <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.25em]">
                  Practice Specialization
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-primary-navy mb-6">
                Core Capabilities
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Strategic support tailored to the critical milestones of drug development and global regulatory submission.
              </p>
            </div>
            <Link
              href="/services"
              className="group flex items-center gap-3 text-primary-navy font-bold text-xs uppercase tracking-widest border-b border-gray-200 hover:border-primary-teal transition-all pb-2"
            >
              View Full Capabilities <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {services.slice(0, 6).map((service, idx) => (
              <div key={service.id} className="group relative">
                {/* Alphanumeric Index */}
                <span className="absolute -top-6 -left-1 font-mono text-[10px] font-bold text-gray-300 group-hover:text-primary-teal transition-colors duration-500">
                  REF: 0{idx + 1}
                </span>

                <h3 className="font-serif text-2xl text-primary-navy mb-4 group-hover:translate-x-1 transition-transform duration-500">
                  {service.title}
                </h3>

                <div className="w-12 h-[1px] bg-primary-teal/20 mb-6 group-hover:w-full transition-all duration-700"></div>

                <p className="text-[15px] text-gray-600 leading-relaxed mb-8 line-clamp-3">
                  {service.description}
                </p>

                <Link
                  href={`/services#${service.id}`}
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-primary-navy transition-colors"
                >
                  Expertise Brief <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          THE MEVOQ APPROACH (Operating Framework)
          ============================================ */}
      {APPROACH_VARIANT === 'case-file' ? (
        /* EXPERIMENTAL: Case File / Confidential Dossier Variant */
        <section className="py-48 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 relative">

          {/* Document Slab Container */}
          <div className="container px-4 mx-auto lg:px-8">
            <div
              className="max-w-6xl mx-auto bg-[#FAFBFC] border border-gray-200/80 relative overflow-hidden"
              style={{
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.03), inset 0 -1px 2px rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              {/* Document Top Edge Marker */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary-navy/10 to-transparent"></div>

              {/* Confidential Header Strip */}
              <div className="border-b border-gray-200/60 bg-gradient-to-b from-white/50 to-transparent px-12 py-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-gray-400 uppercase">
                      Operating Model
                    </span>
                    <div className="w-12 h-[1px] bg-gray-200"></div>
                    <span className="font-mono text-[9px] tracking-wider text-gray-300">
                      REF: MVQ-2024-OPS
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-primary-teal/40"></div>
                </div>
              </div>

              {/* Document Content */}
              <div className="px-12 py-16 lg:px-16 lg:py-20 relative">
                {/* Organic Vector Field: 
                    Covers 60% of the entire artifact container.
                    Positioned as a background layer (z-0) behind all text (z-10).
                */}
                <OrganicVectorField variant="document" className="absolute left-0 top-0 w-3/5 h-full opacity-[0.9]" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 relative z-10">

                  {/* Left Zone: Declarative Anchor */}
                  <div className="lg:col-span-5">
                    <div className="max-w-md space-y-8 relative z-10">
                      {/* Title */}
                      <h2 className="font-serif text-4xl md:text-5xl text-primary-navy leading-[1.05]">
                        The Mevoq Approach
                      </h2>

                      {/* Subtitle - Document Label Style */}
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-primary-teal/30"></div>
                        <p className="font-serif text-xl text-primary-teal italic leading-tight">
                          Precision & Partnership
                        </p>
                      </div>

                      {/* Manifesto Paragraph */}
                      <p className="text-gray-600 text-[15px] leading-relaxed pt-4">
                        We embed directly with your scientific and clinical teams, translating complex data into compelling regulatory arguments that withstand agency scrutiny.
                      </p>
                    </div>
                  </div>

                  {/* Right Zone: Process System */}
                  <div className="lg:col-span-7 lg:pl-8">
                    <ApproachSteps />
                  </div>

                </div>
              </div>

              {/* Document Bottom Edge */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>
          </div>
        </section>
      ) : APPROACH_VARIANT === 'systems-engineering' ? (
        /* VISUAL SPEC V1.0: Regulatory Systems Engineering */
        <section className="py-32 bg-[#EBF2F7] border-y border-gray-200/50 relative overflow-hidden">
          <div className="container px-4 mx-auto lg:px-8 h-full">
            <div className="flex flex-col lg:flex-row h-full gap-12 lg:gap-0">

              {/* LEFT COLUMN — Authority & Framing (~35-40%) */}
              <div className="lg:w-[40%] flex flex-col justify-center lg:pr-12 relative z-20 pt-10 lg:pt-0">
                <div className="max-w-md">
                  <h2 className="font-serif text-4xl text-primary-navy mb-3 leading-tight">
                    The Mevoq Approach
                  </h2>
                  <p className="font-sans text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">
                    Precision & Partnership
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">
                    We embed directly with your scientific and clinical teams, translating complex data into compelling regulatory arguments that withstand agency scrutiny.
                  </p>
                </div>
              </div>

              {/* RIGHT FIELD — System Canvas (~60-65%) */}
              <div className="lg:w-[60%] relative min-h-[600px] border-l border-gray-200/50 bg-[#F4F6F8] pl-0 lg:pl-0">
                <RegulatorySystemCanvas />
              </div>

            </div>
          </div>
        </section>
      ) : (
        /* ORIGINAL: Default Implementation */
        <section className="py-40 bg-[#EBF2F7] border-y border-gray-200/60 relative">

          <div className="container px-4 mx-auto lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

              {/* Left Zone: Declarative Anchor (Static) */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32 max-w-md">
                  {/* Section Label */}
                  <div className="mb-8">
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase border-b border-gray-200 pb-2 inline-block">
                      Operating Model
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-4xl md:text-5xl text-primary-navy mb-6 leading-[1.1]">
                    The Mevoq Approach
                  </h2>

                  {/* Subtitle */}
                  <p className="font-serif text-2xl text-primary-teal italic mb-8 leading-tight">
                    Precision & Partnership
                  </p>

                  {/* Manifesto Paragraph */}
                  <p className="text-gray-600 text-base leading-relaxed border-l-2 border-primary-navy/10 pl-6">
                    We embed directly with your scientific and clinical teams, translating complex data into compelling regulatory arguments that withstand agency scrutiny.
                  </p>
                </div>
              </div>

              {/* Right Zone: Process System */}
              <div className="lg:col-span-7">
                <ApproachSteps />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ============================================
          REGULATORY INSIGHTS (Blog)
          ============================================ */}
      {/* ============================================
          STRATEGY ARCHIVE (Blog)
          ============================================ */}
      <section className="py-32 bg-gray-50 border-y border-gray-200/30">
        <div className="container px-4 mx-auto lg:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.25em] block mb-4">
                Institutional Knowledge
              </span>
              <h2 className="font-serif text-4xl text-primary-navy">Strategy Archive</h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm">
              Analysis of evolving global regulatory landscapes by senior personnel.
            </p>
          </div>

          <div className="space-y-0 divide-y divide-gray-200">
            {posts.slice(0, 3).map((post, idx) => (
              <article key={post.id} className="group py-12 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
                  <div className="md:col-span-1">
                    <span className="font-mono text-[10px] font-bold text-gray-300 group-hover:text-primary-teal transition-colors">
                      [0{idx + 1}]
                    </span>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-serif text-2xl text-primary-navy group-hover:translate-x-1 transition-transform duration-500 mb-4 px-0 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-[15px] leading-relaxed line-clamp-2 max-w-2xl">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="md:col-span-3 text-right">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-4">
                      {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0F172A] opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Analysis <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-20 pt-12 border-t border-gray-100">
            <Link href="/blog" className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-primary-navy">
              View Full Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          CONSULTATIVE CTA (Final)
          ============================================ */}
      <section className="py-40 bg-gray-50 border-t border-gray-200/50 relative overflow-hidden">
        <OrganicVectorField variant="edge-left" className="absolute top-0 left-0 w-1/2 h-full opacity-[0.2]" />

        <div className="container px-4 mx-auto lg:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.3em] inline-block px-4 py-1 border border-primary-teal/20 rounded-full">
                Professional Engagement
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-primary-navy mb-8 tracking-tight">
              Secure your regulatory <br className="hidden md:block" /> milestone.
            </h2>
            <p className="text-xl text-gray-600 mb-14 leading-relaxed max-w-2xl mx-auto">
              We operate with strict confidentiality. Schedule a primary assessment with a principal consultant to review your program.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="btn-authority px-12 py-5 font-bold tracking-widest group"
              >
                Request Confidential Briefing
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
