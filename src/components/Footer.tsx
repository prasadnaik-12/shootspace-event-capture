
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#5B3228] text-[#FFE5B4] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-[#FF9E4F]">ShootSpace</h3>
            <p className="text-[#FFE5B4] leading-relaxed">
              Professional photography and videography for every occasion. 
              Capturing life's precious moments with creativity and excellence.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-[#FF9E4F]">Contact Us</h4>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="font-medium">Email:</span>
                <span className="ml-2">hello@shootspace.com</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium">Phone:</span>
                <span className="ml-2">+91 98765 43210</span>
              </p>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-[#FF9E4F]">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-[#B55233] rounded-full hover:bg-[#FF9E4F] hover:scale-110 transition-all duration-300"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="p-3 bg-[#B55233] rounded-full hover:bg-[#FF9E4F] hover:scale-110 transition-all duration-300"
              >
                <Youtube size={24} />
              </a>
            </div>
            <div className="space-y-2">
              <button className="bg-[#FF9E4F] text-[#5B3228] px-6 py-2 rounded-full font-semibold hover:bg-[#e68834] transition-colors duration-300">
                Follow
              </button>
              <button className="bg-[#B55233] text-[#FFE5B4] px-6 py-2 rounded-full font-semibold hover:bg-[#953f2a] transition-colors duration-300 ml-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#FFE5B4] mt-8 pt-8 text-center">
          <p className="text-[#FFE5B4]">
            © 2024 ShootSpace. All rights reserved. Capturing moments, creating memories.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
