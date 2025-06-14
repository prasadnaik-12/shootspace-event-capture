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
              to="/#explore"
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
              to="/#journey"
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

      <div id="explore" className="scroll-mt-20">
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#B55233] mb-4">
                Explore Our Services
              </h2>
              <p className="text-xl text-[#5B3228] max-w-3xl mx-auto">
                From intimate celebrations to grand events, we capture every moment with professional expertise
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Wedding', desc: 'Capture your special day with cinematic reels and stunning portraits', color: 'from-[#FFE5B4] to-[#FF9E4F]' },
                { title: 'Birthday', desc: 'Fun and vibrant shoots to celebrate life\'s precious moments', color: 'from-[#FF9E4F] to-[#B55233]' },
                { title: 'Corporate', desc: 'Professional content for your business events and branding', color: 'from-[#B55233] to-[#5B3228]' },
                { title: 'Fashion', desc: 'Editorial shoots and lookbooks with creative storytelling', color: 'from-[#5B3228] to-[#FFE5B4]' },
                { title: 'Custom', desc: 'Tailored shoots for your unique vision and requirements', color: 'from-[#FFE5B4] to-[#FF9E4F]' }
              ].map((event, index) => (
                <div key={event.title} className={index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}>
                  <div className="bg-[#FFE5B4] rounded-2xl border border-[#B55233] p-8 hover:scale-103 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group">
                    <div className={`w-full h-48 bg-gradient-to-br ${event.color} rounded-xl mb-6 flex items-center justify-center`}>
                      <span className="text-white text-6xl font-bold opacity-50">
                        {event.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#5B3228] mb-3 group-hover:text-[#B55233] transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-[#5B3228] leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div id="journey" className="scroll-mt-20">
        <section className="py-20 bg-[#FFE5B4]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#B55233] mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-[#5B3228] max-w-3xl mx-auto">
                From a simple idea to a comprehensive platform transforming event photography
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#B55233] h-full"></div>
              
              <div className="space-y-12">
                {[
                  { title: 'Eureka Moment', description: 'The spark of inspiration to revolutionize event photography and videography', year: '2023' },
                  { title: 'Beginning of ShootSpace', description: 'Founded with a vision to make professional shoots accessible for every occasion', year: '2023' },
                  { title: 'Team Formation', description: 'Assembled a passionate team of photographers, videographers, and tech enthusiasts', year: '2023' },
                  { title: 'Research', description: 'Deep market research to understand client needs and industry gaps', year: '2024' },
                  { title: 'Development', description: 'Built our platform with cutting-edge technology and user-centric design', year: '2024' },
                  { title: 'First Prototype', description: 'Launched our MVP and gathered valuable feedback from early adopters', year: '2024' }
                ].map((milestone, index) => (
                  <div key={milestone.title} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white rounded-2xl border border-[#B55233] p-6 shadow-lg hover:scale-105 transition-all duration-300">
                        <div className="text-[#FF9E4F] font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-2xl font-bold text-[#5B3228] mb-3">{milestone.title}</h3>
                        <p className="text-[#5B3228] leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10 w-6 h-6 bg-[#FF9E4F] border-4 border-[#B55233] rounded-full flex-shrink-0"></div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-20 text-center">
              <div className="bg-[#FF9E4F] rounded-2xl border border-[#B55233] p-8 shadow-lg">
                <h3 className="text-3xl font-bold text-[#5B3228] mb-4">Vision of ShootSpace</h3>
                <p className="text-[#5B3228] text-lg leading-relaxed max-w-4xl mx-auto">
                  To become the leading platform that connects people with exceptional visual storytellers, 
                  making professional photography and videography accessible, affordable, and extraordinary 
                  for every milestone in life.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="pricing" className="scroll-mt-20">
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#B55233] mb-4">
                Choose Your Plan
              </h2>
              <p className="text-xl text-[#5B3228] max-w-3xl mx-auto">
                Flexible pricing options designed to fit every occasion and budget
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: '1 Hour Plan',
                  tagline: 'Perfect for quick captures',
                  price: '₹2,000',
                  gst: '+GST',
                  features: [
                    '2 hours shoot duration',
                    '1 edited reel delivered',
                    '15 edited portraits',
                    'Fast delivery within 15 mins',
                    'Online gallery (optional)'
                  ],
                  recommended: false
                },
                {
                  name: 'Half Day',
                  tagline: 'For your essential events',
                  price: '₹5,000',
                  gst: '+GST',
                  features: [
                    'Half day shoot',
                    '3 edited reels delivered',
                    '30 edited portraits',
                    'Fast delivery within 10 mins',
                    'Online gallery (optional)'
                  ],
                  recommended: true
                }
              ].map((plan, index) => (
                <div key={plan.name} className={`bg-[#FFE5B4] rounded-2xl border-2 p-8 shadow-lg hover:scale-105 transition-all duration-300 relative ${plan.recommended ? 'border-[#FF9E4F] shadow-xl' : 'border-[#B55233]'}`}>
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#FF9E4F] text-[#5B3228] px-6 py-2 rounded-full font-bold text-sm">
                        RECOMMENDED
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-[#5B3228] mb-2">{plan.name}</h3>
                    <p className="text-[#B55233] text-lg mb-4">{plan.tagline}</p>
                    <div className="mb-6">
                      <span className="text-5xl font-extrabold text-[#FF9E4F]">{plan.price}</span>
                      <span className="text-[#5B3228] text-lg ml-2">{plan.gst}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-[#FF9E4F] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-[#5B3228] leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to="/book"
                    className={`block w-full text-center py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg ${
                      plan.recommended
                        ? 'bg-[#FF9E4F] text-[#5B3228] hover:bg-[#e68834]'
                        : 'bg-[#B55233] text-[#FFE5B4] hover:bg-[#953f2a]'
                    }`}
                  >
                    Select Plan
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-[#5B3228] text-lg">
                Need something custom? <Link to="/book" className="text-[#FF9E4F] hover:text-[#B55233] font-semibold">Contact us</Link> for personalized packages.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
