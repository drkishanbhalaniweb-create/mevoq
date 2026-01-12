import Link from 'next/link';
import { ArrowRight, CheckCircle2, FlaskConical, Globe2, ShieldCheck, MapPin, FileText, PenTool, AlertTriangle, Folder } from 'lucide-react';
import { getServices, getStats } from '@/lib/supabase';

// Helper to get icon component dynamically
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

export default async function Home() {
  const services = await getServices();
  const stats = getStats();

  return (
    <div className="flex flex-col min-h-screen">

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-primary-navy">
        {/* Abstract Background - CSS Only */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-teal rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container relative z-10 px-4 mx-auto lg:px-6">
          <div className="max-w-4xl mx-auto text-center">

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up">
              {['FDA Approved', 'EMA Certified', 'Health Canada Compliant'].map((badge) => (
                <span key={badge} className="px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-primary-light bg-primary/20 rounded-full border border-primary/30 backdrop-blur-sm">
                  {badge}
                </span>
              ))}
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6 sm:text-5xl md:text-6xl lg:text-7xl leading-tight animate-fade-in-up [animation-delay:200ms]">
              Accelerate Your Drug Approvals with <span className="text-primary-teal">Expert Regulatory Guidance</span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-300 sm:text-xl lg:text-2xl leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              50+ successful FDA submissions. 25 years of regulatory excellence. Your pathway to approval starts here.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS SECTION
          ============================================ */}
      <section className="py-20 bg-white items-center">
        <div className="container px-4 mx-auto lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: CheckCircle2, label: 'Successful Submissions', value: stats.successful_submissions, suffix: '+' },
              { icon: FlaskConical, label: 'Project Weeks Saved', value: stats.project_weeks_saved, suffix: '+' },
              { icon: ShieldCheck, label: 'Years Experience', value: stats.years_experience, suffix: '+' },
              { icon: Globe2, label: 'Countries Served', value: stats.countries_served, suffix: '' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 mb-6 bg-primary-light/50 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-primary-navy mb-2 font-mono tracking-tighter">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES PREVIEW
          ============================================ */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4 mx-auto lg:px-6">

          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-navy mb-4 sm:text-4xl">
              Our Regulatory Consulting Services
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive support from early development through post-market compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <Link
                  key={service.id}
                  href={`/services#${service.id}`}
                  className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="text-primary w-6 h-6 -translate-x-4 group-hover:translate-x-0 transition-transform" />
                  </div>

                  <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-primary-navy mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {service.case_study_snippet && (
                    <div className="pt-6 border-t border-gray-100 text-sm text-gray-500 italic flex gap-2">
                      <span className="font-semibold text-primary-teal not-italic">Result:</span>
                      {service.case_study_snippet}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Explore all services <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
