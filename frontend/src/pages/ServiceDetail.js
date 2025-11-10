import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, FileText, ShieldCheck, PenTool, AlertTriangle, Folder,
  CheckCircle2, ArrowLeft
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

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const servicesData = await getServices();
      
      const foundService = servicesData.find(s => s.id === id);
      setService(foundService);
      
      const related = servicesData.filter(s => s.id !== id).slice(0, 3);
      setRelatedServices(related);
    } catch (e) {
      console.error('Error fetching service:', e);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || MapPin;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="mb-6 text-gray-600 hover:text-midnight"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Services
          </Button>
          
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-neon-teal to-signal-green flex items-center justify-center flex-shrink-0">
              <IconComponent size={40} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-midnight mb-4">{service.title}</h1>
              <p className="text-xl text-gray-600">{service.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-midnight mb-8">What's Included</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle2 size={24} className="text-signal-green flex-shrink-0 mt-1" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {service.case_study_snippet && (
            <div className="bg-gradient-to-br from-neon-teal/10 to-signal-green/10 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-midnight mb-4">Success Story</h3>
              <p className="text-lg text-gray-700">💡 {service.case_study_snippet}</p>
            </div>
          )}

          <div className="text-center">
            <Button 
              onClick={() => navigate('/contact')} 
              className="bg-midnight hover:bg-midnight/90 text-white font-semibold px-8 py-6 text-lg rounded-full"
            >
              Get Started with This Service
            </Button>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-midnight mb-12 text-center">Related Services</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => {
                const RelatedIcon = iconMap[relatedService.icon] || MapPin;
                return (
                  <div
                    key={relatedService.id}
                    className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-neon-teal hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => navigate(`/services/${relatedService.id}`)}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-teal to-signal-green flex items-center justify-center mb-4">
                      <RelatedIcon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-midnight mb-2">{relatedService.title}</h3>
                    <p className="text-gray-600 text-sm">{relatedService.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceDetail;
