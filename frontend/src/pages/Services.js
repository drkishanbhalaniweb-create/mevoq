import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, FileText, ShieldCheck, PenTool, AlertTriangle, Folder,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getServices } from '@/lib/api';

const iconMap = {
  'map-pin': MapPin,
  'file-text': FileText,
  'shield-check': ShieldCheck,
  'pen-tool': PenTool,
  'alert-triangle': AlertTriangle,
  'folder': Folder
};

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (e) {
      console.error('Error fetching services:', e);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-midnight mb-6">Our Services</h1>
          <p className="text-xl text-gray-600">
            Comprehensive regulatory solutions tailored to accelerate your path to market
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || MapPin;
              return (
                <div
                  key={service.id}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-neon-teal hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-teal to-signal-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-midnight mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 size={16} className="text-signal-green flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="link" className="text-neon-teal p-0 group-hover:translate-x-2 transition-transform">
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-midnight mb-4">How We Work</h2>
            <p className="text-xl text-gray-600">A proven process that delivers results</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Quick Intro Call', desc: 'No prep needed. Share your goals and challenges.', icon: '📞' },
              { step: '02', title: 'Deep-Dive Diagnosis', desc: 'We analyze your situation and identify opportunities.', icon: '🔍' },
              { step: '03', title: 'Strategy Roadmap', desc: 'Receive a clear, actionable plan with timelines.', icon: '🗺️' },
              { step: '04', title: 'Ongoing Support', desc: 'We execute alongside you until approval.', icon: '🎯' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">Schedule a free strategy call to discuss your regulatory needs.</p>
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

export default Services;
