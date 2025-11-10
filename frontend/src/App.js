import { useEffect, useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { 
  MapPin, FileText, ShieldCheck, PenTool, AlertTriangle, Folder,
  CheckCircle2, ArrowRight, Menu, X, ChevronDown, Play, Linkedin,
  Clock, TrendingUp, Users, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const iconMap = {
  'map-pin': MapPin,
  'file-text': FileText,
  'shield-check': ShieldCheck,
  'pen-tool': PenTool,
  'alert-triangle': AlertTriangle,
  'folder': Folder
};

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [resources, setResources] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '', phone: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [activeService, setActiveService] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const fetchData = async () => {
    try {
      const [statsRes, testimonialsRes, servicesRes, teamRes, caseStudiesRes, resourcesRes] = await Promise.all([
        axios.get(`${API}/stats`),
        axios.get(`${API}/testimonials`),
        axios.get(`${API}/services`),
        axios.get(`${API}/team`),
        axios.get(`${API}/case-studies`),
        axios.get(`${API}/resources`)
      ]);
      setStats(statsRes.data);
      setTestimonials(testimonialsRes.data);
      setServices(servicesRes.data);
      setTeam(teamRes.data);
      setCaseStudies(caseStudiesRes.data);
      setResources(resourcesRes.data);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contacts`, { ...contactForm, lead_type: 'strategy_call' });
      toast.success('Thank you! We\'ll be in touch within 24 hours.');
      setContactForm({ name: '', email: '', company: '', message: '', phone: '' });
    } catch (error) {
      toast.error('Oops! Please try again.');
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contacts`, { 
        name: 'Newsletter Subscriber', 
        email: newsletterEmail, 
        lead_type: 'newsletter' 
      });
      toast.success('Subscribed! Check your inbox.');
      setNewsletterEmail('');
    } catch (error) {
      toast.error('Oops! Please try again.');
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-midnight">Maglinc</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('services')} className="nav-link" data-testid="nav-services">Services</button>
              <button onClick={() => scrollToSection('results')} className="nav-link" data-testid="nav-results">Results</button>
              <button onClick={() => scrollToSection('team')} className="nav-link" data-testid="nav-team">Team</button>
              <button onClick={() => scrollToSection('resources')} className="nav-link" data-testid="nav-resources">Resources</button>
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="bg-signal-green hover:bg-signal-green/90 text-midnight font-semibold rounded-full px-6"
                data-testid="nav-cta-button"
              >
                Get Started
              </Button>
            </div>

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-toggle">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4" data-testid="mobile-menu">
            <div className="px-4 space-y-3">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-gray-700">Services</button>
              <button onClick={() => scrollToSection('results')} className="block w-full text-left py-2 text-gray-700">Results</button>
              <button onClick={() => scrollToSection('team')} className="block w-full text-left py-2 text-gray-700">Team</button>
              <button onClick={() => scrollToSection('resources')} className="block w-full text-left py-2 text-gray-700">Resources</button>
              <Button onClick={() => scrollToSection('contact')} className="w-full bg-signal-green hover:bg-signal-green/90 text-midnight font-semibold">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 opacity-60"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-neon-teal/20 to-signal-green/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-magenta/10 to-lemon/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Social Proof Bar */}
          <div className="flex items-center justify-center space-x-2 mb-8 animate-fade-in" data-testid="social-proof-bar">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-teal-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-cyan-400 border-2 border-white"></div>
            </div>
            <p className="text-sm text-gray-600">Supporting 9/10 top pharma launches across 47 countries</p>
          </div>

          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight mb-6 leading-tight" data-testid="hero-headline">
              Get Your Therapy to Market — <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-teal to-signal-green">30% Faster</span>. Every Time.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto" data-testid="hero-subheadline">
              Expert pharmaceutical consulting that accelerates regulatory approvals, ensures compliance, and turns complex challenges into competitive advantages.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                onClick={() => scrollToSection('contact')} 
                className="bg-midnight hover:bg-midnight/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                data-testid="hero-primary-cta"
              >
                Request Free Strategy Call
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                onClick={() => scrollToSection('process')} 
                variant="outline" 
                className="border-2 border-midnight text-midnight font-semibold px-8 py-6 text-lg rounded-full hover:bg-midnight hover:text-white transition-all"
                data-testid="hero-secondary-cta"
              >
                See How We Work
              </Button>
            </div>

            {/* Scarcity Trigger */}
            <div className="inline-flex items-center space-x-2 bg-lemon/20 border border-lemon/40 rounded-full px-6 py-3" data-testid="scarcity-trigger">
              <Clock size={18} className="text-amber-600" />
              <span className="text-sm font-medium text-gray-800">Availability this month: <span className="font-bold text-amber-600">4/12 strategy calls left</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Animation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-6 uppercase tracking-wider">Trusted by Leading Pharmaceutical Companies</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">BioGenix</div>
            <div className="text-2xl font-bold text-gray-400">PharmaTech</div>
            <div className="text-2xl font-bold text-gray-400">MedLife</div>
            <div className="text-2xl font-bold text-gray-400">TherapeutiX</div>
          </div>
        </div>
      </section>

      {/* Pain/Agitation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" data-testid="pain-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-midnight mb-6">
                Every Week of Delay Costs You <span className="text-magenta">Millions</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <X size={18} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Regulatory Complexity Maze</h3>
                    <p className="text-gray-600">Navigating FDA, EMA, and global requirements without expert guidance leads to costly rejections.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <X size={18} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Documentation Bottlenecks</h3>
                    <p className="text-gray-600">Incomplete or poorly prepared submissions trigger endless review cycles and delays.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <X size={18} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Compliance Blind Spots</h3>
                    <p className="text-gray-600">Missing quality issues until inspection time results in warning letters and market delays.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200">
                <p className="text-sm text-gray-600 mb-2">Cost of a 3-week delay:</p>
                <p className="text-4xl font-bold text-red-600">$2.4M+</p>
                <p className="text-sm text-gray-500 mt-2">Based on average daily revenue for specialty drugs</p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1716840646010-e5622fd6683d?w=600" 
                alt="Regulatory Process" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-600 mb-1">With Maglinc:</p>
                <p className="text-2xl font-bold text-signal-green">Clear Path Forward</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight text-white relative overflow-hidden" data-testid="results-section">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-teal rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-signal-green rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Results That Matter</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Numbers that prove our commitment to your success</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {stats && [
              { label: 'Successful Submissions', value: stats.successful_submissions, suffix: '+', icon: CheckCircle2 },
              { label: 'Project Weeks Saved', value: stats.project_weeks_saved, suffix: '+', icon: Clock },
              { label: 'Client Satisfaction', value: stats.client_satisfaction, suffix: '%', icon: TrendingUp },
              { label: 'Countries Served', value: stats.countries_served, suffix: '', icon: Globe }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all" data-testid={`stat-card-${idx}`}>
                <stat.icon size={32} className="mx-auto mb-4 text-signal-green" />
                <p className="text-5xl font-bold text-signal-green mb-2">{stat.value}{stat.suffix}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials Carousel */}
          {testimonials.length > 0 && (
            <div className="max-w-4xl mx-auto" data-testid="testimonials-carousel">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-teal to-signal-green flex items-center justify-center flex-shrink-0">
                    <Users size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-white mb-4 italic">"{testimonials[currentTestimonial]?.content}"</p>
                    <div>
                      <p className="font-semibold text-white">{testimonials[currentTestimonial]?.name}</p>
                      <p className="text-sm text-gray-300">{testimonials[currentTestimonial]?.role} at {testimonials[currentTestimonial]?.company}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentTestimonial ? 'bg-signal-green w-8' : 'bg-white/30'}`}
                      data-testid={`testimonial-dot-${idx}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50" data-testid="process-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight mb-4">How We Work</h2>
            <p className="text-xl text-gray-600">A proven process that delivers results</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Quick Intro Call', desc: 'No prep needed. Share your goals and challenges.', icon: '📞' },
              { step: '02', title: 'Deep-Dive Diagnosis', desc: 'We analyze your situation and identify opportunities.', icon: '🔍' },
              { step: '03', title: 'Strategy Roadmap', desc: 'Receive a clear, actionable plan with timelines.', icon: '🗺️' },
              { step: '04', title: 'Ongoing Support', desc: 'We execute alongside you until approval.', icon: '🎯' }
            ].map((item, idx) => (
              <div key={idx} className="relative" data-testid={`process-step-${idx}`}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-signal-green">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-sm font-bold text-neon-teal mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold text-midnight mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight size={24} className="text-signal-green" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Remove friction: <span className="font-semibold">No prep needed, just show up — we'll map your roadmap in one call.</span></p>
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-signal-green hover:bg-signal-green/90 text-midnight font-semibold px-8 py-6 text-lg rounded-full"
              data-testid="process-cta-button"
            >
              Schedule Your Strategy Call
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" data-testid="services-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for every regulatory challenge</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || MapPin;
              return (
                <div
                  key={service.id}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-neon-teal hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setActiveService(activeService === idx ? null : idx)}
                  data-testid={`service-card-${idx}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-teal to-signal-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  {activeService === idx && (
                    <div className="mt-4 space-y-2 animate-fade-in">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-2">
                          <CheckCircle2 size={16} className="text-signal-green flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {service.case_study_snippet && (
                        <div className="mt-4 p-3 bg-lemon/10 rounded-lg border border-lemon/30">
                          <p className="text-xs text-gray-600 italic">💡 {service.case_study_snippet}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <button className="mt-4 text-neon-teal font-semibold text-sm flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>{activeService === idx ? 'Show Less' : 'Learn More'}</span>
                    <ChevronDown size={16} className={`transform transition-transform ${activeService === idx ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-teal-50" data-testid="team-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight mb-4">Meet Our Experts</h2>
            <p className="text-xl text-gray-600">Ex-regulators, scientists, and industry veterans</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group" data-testid={`team-member-${idx}`}>
                <div className="aspect-square bg-gradient-to-br from-neon-teal/20 to-signal-green/20 flex items-center justify-center">
                  {member.avatar_url ? (
                    <img src={member.avatar_url} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users size={80} className="text-neon-teal" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-midnight mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold text-neon-teal mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map((skill, sIdx) => (
                      <span key={sIdx} className="text-xs bg-signal-green/10 text-gray-700 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-neon-teal flex items-center space-x-1 text-sm hover:underline">
                      <Linkedin size={16} />
                      <span>Connect on LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" data-testid="case-studies-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-midnight mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real results for real clients</p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, idx) => (
              <div key={study.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`} data-testid={`case-study-${idx}`}>
                <div className="md:w-1/2">
                  <img src={study.image_url || 'https://images.unsplash.com/photo-1667842539494-e1b7146be2ca?w=600'} alt={study.title} className="rounded-2xl shadow-xl" />
                </div>
                <div className="md:w-1/2">
                  <div className="inline-block bg-signal-green/10 text-signal-green px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    {study.client}
                  </div>
                  <h3 className="text-2xl font-bold text-midnight mb-4">{study.title}</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">CHALLENGE</p>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">SOLUTION</p>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-2">RESULTS</p>
                      <ul className="space-y-2">
                        {study.results.map((result, rIdx) => (
                          <li key={rIdx} className="flex items-start space-x-2">
                            <CheckCircle2 size={20} className="text-signal-green flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(study.metrics).map(([key, value], mIdx) => (
                      <div key={mIdx} className="text-center p-4 bg-gradient-to-br from-neon-teal/10 to-signal-green/10 rounded-xl">
                        <p className="text-2xl font-bold text-midnight">{value}</p>
                        <p className="text-xs text-gray-600 mt-1">{key.replace(/_/g, ' ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-midnight hover:bg-midnight/90 text-white font-semibold px-8 py-6 text-lg rounded-full"
              data-testid="case-study-cta-button"
            >
              See if we can do the same for you
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Hub */}
      <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" data-testid="resources-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-midnight mb-4">Resources & FAQs</h2>
            <p className="text-lg text-gray-600">Everything you need to know</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {resources.filter(r => r.type === 'faq').map((resource, idx) => (
              <AccordionItem key={resource.id} value={`item-${idx}`} className="bg-white rounded-xl border border-gray-200 px-6" data-testid={`faq-item-${idx}`}>
                <AccordionTrigger className="text-left font-semibold text-midnight hover:text-neon-teal">
                  {resource.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {resource.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Want more insights?</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" data-testid="newsletter-form">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border-2 border-gray-300 focus:border-neon-teal focus:outline-none"
                required
                data-testid="newsletter-email-input"
              />
              <Button type="submit" className="bg-neon-teal hover:bg-neon-teal/90 text-midnight font-semibold px-8 rounded-full" data-testid="newsletter-submit-button">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight text-white relative overflow-hidden" data-testid="contact-section">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-signal-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-teal rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Ready to Accelerate Your Approval?</h2>
            <p className="text-xl text-gray-300">Let's discuss how we can help you reach the market faster.</p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20" data-testid="contact-form">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-signal-green"
                  placeholder="Your name"
                  required
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-signal-green"
                  placeholder="your@email.com"
                  required
                  data-testid="contact-email-input"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Company</label>
                <input
                  type="text"
                  value={contactForm.company}
                  onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-signal-green"
                  placeholder="Your company"
                  data-testid="contact-company-input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-signal-green"
                  placeholder="+1 (555) 123-4567"
                  data-testid="contact-phone-input"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">How can we help?</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-signal-green h-32 resize-none"
                placeholder="Tell us about your project..."
                data-testid="contact-message-input"
              />
            </div>
            <Button type="submit" className="w-full bg-signal-green hover:bg-signal-green/90 text-midnight font-bold py-4 text-lg rounded-full" data-testid="contact-submit-button">
              Request Strategy Call
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-xl font-bold">Maglinc</span>
              </div>
              <p className="text-gray-400 text-sm">Accelerating pharmaceutical innovation through expert regulatory consulting.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-signal-green">Regulatory Strategy</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-signal-green">Documentation</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-signal-green">Quality & Compliance</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('team')} className="hover:text-signal-green">About Us</button></li>
                <li><button onClick={() => scrollToSection('results')} className="hover:text-signal-green">Case Studies</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-signal-green">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-signal-green">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-signal-green">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Maglinc Pharmaceutical Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;