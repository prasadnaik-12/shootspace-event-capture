
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { User } from 'lucide-react';

const Hero = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-200 rounded-full opacity-25 animate-bounce"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
            Book the Perfect{' '}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Shoot
            </span>
            <br />
            for Every Occasion
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Professional instant reel makers, videographers, and photographers 
            for weddings, birthdays, corporate events, and custom occasions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              to="/book"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Book Now
            </Link>
            
            {user ? (
              <Link
                to="/dashboard"
                className="bg-white text-orange-600 border-2 border-orange-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <User size={20} />
                <span>Account</span>
              </Link>
            ) : (
              <Link
                to="/signin"
                className="bg-white text-orange-600 border-2 border-orange-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign In
              </Link>
            )}
          </div>
          
          <div className="pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">📸</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Quality</h3>
                <p className="text-gray-600">High-end equipment and experienced professionals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Delivery</h3>
                <p className="text-gray-600">Quick turnaround for your precious moments</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Custom Solutions</h3>
                <p className="text-gray-600">Tailored services for every occasion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
