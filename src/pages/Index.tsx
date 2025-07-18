
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Minimal Explore Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B55233] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-[#5B3228] mb-6">
              Professional shoots for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {['Wedding', 'Birthday', 'Corporate', 'Fashion', 'Custom'].map((service) => (
              <div key={service} className="bg-[#FFE5B4] rounded-xl p-4 text-center border border-[#FF9E4F]">
                <div className="w-12 h-12 bg-[#FF9E4F] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{service.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-[#5B3228] text-sm">{service}</h3>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/explore"
              className="bg-[#FF9E4F] text-[#5B3228] px-6 py-3 rounded-xl font-semibold hover:bg-[#e68834] transition-all duration-300"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal VibeSpace Preview */}
      <section className="py-16 bg-[#FFE5B4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B55233] mb-4">
              VibeSpace
            </h2>
            <p className="text-lg text-[#5B3228] mb-6">
              Discover trending reels from our creators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Wedding Highlights', views: '12K' },
              { title: 'Car Launch Event', views: '8.5K' },
              { title: 'Celebrity Portrait', views: '25K' }
            ].map((video, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-[#FF9E4F]">
                <div className="aspect-[9/16] bg-gradient-to-br from-[#FF9E4F] to-[#B55233] rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold opacity-70">▶</span>
                </div>
                <h3 className="font-semibold text-[#5B3228] text-sm mb-1">{video.title}</h3>
                <p className="text-xs text-[#B55233]">{video.views} views</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/vibespace"
              className="bg-[#B55233] text-[#FFE5B4] px-6 py-3 rounded-xl font-semibold hover:bg-[#953f2a] transition-all duration-300"
            >
              Explore VibeSpace
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Journey Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B55233] mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-[#5B3228] mb-8">
              From idea to transforming event photography
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { year: '2023', title: 'Eureka Moment', desc: 'The spark of inspiration' },
              { year: '2024', title: 'Development', desc: 'Building our platform' },
              { year: '2024', title: 'Launch', desc: 'First prototype released' }
            ].map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#FF9E4F] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[#5B3228] font-bold">{milestone.year}</span>
                </div>
                <h3 className="font-semibold text-[#5B3228] mb-2">{milestone.title}</h3>
                <p className="text-sm text-[#B55233]">{milestone.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/journey"
              className="bg-[#5B3228] text-[#FFE5B4] px-6 py-3 rounded-xl font-semibold hover:bg-[#3d2219] transition-all duration-300"
            >
              View Full Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Pricing Preview */}
      <section className="py-16 bg-[#FFE5B4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B55233] mb-4">
              Simple Pricing
            </h2>
            <p className="text-lg text-[#5B3228] mb-8">
              Flexible plans for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl p-6 border border-[#B55233] text-center">
              <h3 className="text-xl font-bold text-[#5B3228] mb-2">1 Hour Plan</h3>
              <div className="text-3xl font-bold text-[#FF9E4F] mb-4">₹2,000</div>
              <p className="text-[#5B3228]">Perfect for quick captures</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-[#FF9E4F] text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF9E4F] text-[#5B3228] px-4 py-1 rounded-full text-sm font-bold">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-bold text-[#5B3228] mb-2">Half Day</h3>
              <div className="text-3xl font-bold text-[#FF9E4F] mb-4">₹5,000</div>
              <p className="text-[#5B3228]">For your essential events</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/#pricing"
              className="bg-[#FF9E4F] text-[#5B3228] px-6 py-3 rounded-xl font-semibold hover:bg-[#e68834] transition-all duration-300"
            >
              View All Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
