import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, ArrowRight, Clock, TrendingUp, Users, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStats, getTestimonials, getServices } from '@/lib/api';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
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
      const [statsData, testimonialsData, servicesData] = await Promise.all([
        Promise.resolve(getStats()),
        getTestimonials(),
        getServices()
      ]);
      setStats(statsData);
      setTestimonials(testimonialsData);
      setServices(servicesData.slice(0, 3)); // Show only 3 on homepage
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 opacity-60"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-neon-teal/20 to-signal-green/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-midnight mb-6 leading-tight">
              Get Your Therapy to Market — <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-teal to-signal-green">30% Faster</span>. Every Time.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Expert pharmaceutical consulting that accelerates regulatory approvals, ensures compliance, and turns complex challenges into competitive advantages.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                onClick={() => navigate('/contact')} 
                className="bg-midnight hover:bg-midnight/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Request Free Strategy Call
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                onClick={() => navigate('/services')} 
                variant="outline" 
                className="border-2 border-midnight text-midnight font-semibold px-8 py-6 text-lg rounded-full hover:bg-midnight hover:text-white transition-all"
              >
                Explore Services
              </Button>
            </div>

            <div className="inline-flex items-center space-x-2 bg-lemon/20 border border-lemon/40 rounded-full px-6 py-3">
              <Clock size={18} className="text-amber-600" />
              <span className="text-sm font-medium text-gray-800">Availability this month: <span className="font-bold text-amber-600">4/12 strategy calls left</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats && [
              { label: 'Successful Submissions', value: stats.successful_submissions, suffix: '+', icon: CheckCircle2 },
              { label: 'Project Weeks Saved', value: stats.project_weeks_saved, suffix: '+', icon: Clock },
              { label: 'Client Satisfaction', value: stats.client_satisfaction, suffix: '%', icon: TrendingUp },
              { label: 'Countries Served', value: stats.countries_served, suffix: '', icon: Globe }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <stat.icon size={32} className="mx-auto mb-4 text-signal-green" />
                <p className="text-5xl font-bold text-signal-green mb-2">{stat.value}{stat.suffix}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-midnight mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for every regulatory challenge</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-neon-teal hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate(`/services/${service.id}`)}
              >
                <h3 className="text-xl font-bold text-midnight mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button variant="link" className="text-neon-teal p-0">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate('/services')} 
              className="bg-signal-green hover:bg-signal-green/90 text-midnight font-semibold px-8 py-4 rounded-full"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight text-center mb-12">What Our Clients Say</h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-teal to-signal-green flex items-center justify-center flex-shrink-0">
                  <Users size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700 mb-4 italic">"{testimonials[currentTestimonial]?.content}"</p>
                  <div>
                    <p className="font-semibold text-midnight">{testimonials[currentTestimonial]?.name}</p>
                    <p className="text-sm text-gray-600">{testimonials[currentTestimonial]?.role} at {testimonials[currentTestimonial]?.company}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentTestimonial ? 'bg-signal-green w-8' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Accelerate Your Approval?</h2>
          <p className="text-xl text-gray-300 mb-8">Let's discuss how we can help you reach the market faster.</p>
          <Button 
            onClick={() => navigate('/contact')} 
            className="bg-signal-green hover:bg-signal-green/90 text-midnight font-bold px-8 py-6 text-lg rounded-full"
          >
            Schedule Your Strategy Call
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
