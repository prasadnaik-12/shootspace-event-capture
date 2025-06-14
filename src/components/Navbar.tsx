import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'VibeSpace', href: '/vibespace' },
    { name: 'Explore', href: '/explore' },
    { name: 'Our Journey', href: '/journey' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Sign In', href: '/signin' },
  ];

  return (
    <nav className="bg-[#5B3228] text-[#FFE5B4] sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-[#FF9E4F] hover:scale-105 transition-transform duration-300">
            ShootSpace
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-[#FF9E4F] transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/book"
              className="bg-[#FF9E4F] text-[#5B3228] px-6 py-2 rounded-2xl font-semibold hover:bg-[#e68834] hover:scale-103 transition-all duration-300 shadow-lg"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#B55233] transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block hover:text-[#FF9E4F] transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/book"
              className="block bg-[#FF9E4F] text-[#5B3228] px-6 py-2 rounded-2xl font-semibold hover:bg-[#e68834] transition-all duration-300 shadow-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
