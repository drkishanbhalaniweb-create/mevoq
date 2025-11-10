import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Linkedin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTeam } from '@/lib/api';

const About = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const data = await getTeam();
      setTeam(data);
    } catch (e) {
      console.error('Error fetching team:', e);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-midnight mb-6">About Maglinc</h1>
          <p className="text-xl text-gray-600">
            We're a team of ex-regulators, scientists, and industry veterans dedicated to accelerating pharmaceutical innovation through expert regulatory consulting.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-midnight mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At Maglinc, we believe that life-saving therapies shouldn't be delayed by regulatory complexity. Our mission is to bridge the gap between pharmaceutical innovation and regulatory approval, ensuring that breakthrough treatments reach patients faster.
              </p>
              <p className="text-lg text-gray-600">
                With decades of combined experience in FDA review, quality systems, and global regulatory strategy, we provide the expertise and guidance that transforms regulatory challenges into competitive advantages.
              </p>
            </div>
            <div className="bg-gradient-to-br from-neon-teal/10 to-signal-green/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-midnight mb-4">Why Choose Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-signal-green mr-2">✓</span>
                  <span className="text-gray-700">Former FDA reviewers on staff</span>
                </li>
                <li className="flex items-start">
                  <span className="text-signal-green mr-2">✓</span>
                  <span className="text-gray-700">200+ successful drug approvals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-signal-green mr-2">✓</span>
                  <span className="text-gray-700">Global regulatory expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-signal-green mr-2">✓</span>
                  <span className="text-gray-700">Proven track record of accelerating timelines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-midnight mb-4">Meet Our Experts</h2>
            <p className="text-xl text-gray-600">Ex-regulators, scientists, and industry veterans</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
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
                    {member.expertise.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-signal-green/10 text-gray-700 px-3 py-1 rounded-full">
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

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl text-gray-300 mb-8">Let's discuss how our team can help accelerate your regulatory success.</p>
          <Button 
            onClick={() => navigate('/contact')} 
            className="bg-signal-green hover:bg-signal-green/90 text-midnight font-bold px-8 py-6 text-lg rounded-full"
          >
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
