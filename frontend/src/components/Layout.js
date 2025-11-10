import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-midnight">Maglinc</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'text-neon-teal' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about') ? 'text-neon-teal' : ''}`}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className={`nav-link ${isActive('/services') || location.pathname.startsWith('/services/') ? 'text-neon-teal' : ''}`}
              >
                Services
              </Link>
              <Link 
                to="/blog" 
                className={`nav-link ${isActive('/blog') || location.pathname.startsWith('/blog/') ? 'text-neon-teal' : ''}`}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`nav-link ${isActive('/contact') ? 'text-neon-teal' : ''}`}
              >
                Contact
              </Link>
              <Button 
                onClick={() => navigate('/contact')} 
                className="bg-signal-green hover:bg-signal-green/90 text-midnight font-semibold rounded-full px-6"
              >
                Get Started
              </Button>
            </div>

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="px-4 space-y-3">
              <Link to="/" className="block w-full text-left py-2 text-gray-700" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" className="block w-full text-left py-2 text-gray-700" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/services" className="block w-full text-left py-2 text-gray-700" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link to="/blog" className="block w-full text-left py-2 text-gray-700" onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link to="/contact" className="block w-full text-left py-2 text-gray-700" onClick={() => setMenuOpen(false)}>Contact</Link>
              <Button onClick={() => { navigate('/contact'); setMenuOpen(false); }} className="w-full bg-signal-green hover:bg-signal-green/90 text-midnight font-semibold">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>

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
                <li><Link to="/services" className="hover:text-signal-green">Regulatory Strategy</Link></li>
                <li><Link to="/services" className="hover:text-signal-green">Documentation</Link></li>
                <li><Link to="/services" className="hover:text-signal-green">Quality & Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-signal-green">About Us</Link></li>
                <li><Link to="/blog" className="hover:text-signal-green">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-signal-green">Contact</Link></li>
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

export default Layout;
