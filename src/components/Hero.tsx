
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-[#FF9E4F] min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF9E4F] to-[#B55233] opacity-90"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#5B3228] mb-6 leading-tight">
          Book the Perfect Shoot
          <br />
          <span className="text-[#B55233]">for Every Occasion</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#5B3228] mb-8 max-w-3xl mx-auto font-medium">
          Professional instant reel makers, videographers, and photographers for weddings, birthdays, corporate events, and custom occasions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/book"
            className="bg-[#5B3228] text-[#FFE5B4] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-[#3d2219] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Book Now
          </Link>
          <Link
            to="/signin"
            className="bg-[#B55233] text-[#FFE5B4] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-[#953f2a] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[#FFE5B4] rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#B55233] rounded-full opacity-20 animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;
