
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OurJourney = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Intro - Parallax + fade-in title */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFE5B4] via-[#FF9E4F] to-[#B55233]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Our Journey
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            The Beginning of ShootSpace
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Story Introduction */}
      <section className="py-20 bg-white fade-in-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl text-[#5B3228] leading-relaxed mb-8">
            At ShootSpace, our journey has just begun—but our vision is bold and clear.
          </p>
          <p className="text-lg text-[#B55233] leading-relaxed">
            Founded in 2025, ShootSpace was born out of a passion for capturing life's most powerful moments with unmatched clarity, creativity, and precision. We're not just professional reel makers, photographers, or videographers—we're storytellers driven by emotion, aesthetics, and purpose.
          </p>
        </div>
      </section>

      {/* Timeline - Horizontal scroll sections */}
      <section className="py-20 bg-[#FFE5B4] fade-in-section" ref={timelineRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#B55233] text-center mb-16">
            🎬 What We Do
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:scale-105 transition-all duration-300 border border-[#FF9E4F]">
              <div className="w-16 h-16 bg-[#FF9E4F] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="text-xl font-bold text-[#5B3228] mb-4 text-center">Professional Reels</h3>
              <p className="text-[#B55233] text-center">that captivate your audience</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:scale-105 transition-all duration-300 border border-[#FF9E4F]">
              <div className="w-16 h-16 bg-[#FF9E4F] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-bold text-[#5B3228] mb-4 text-center">Candid & Commercial Photography</h3>
              <p className="text-[#B55233] text-center">that tells your story</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:scale-105 transition-all duration-300 border border-[#FF9E4F]">
              <div className="w-16 h-16 bg-[#FF9E4F] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="text-xl font-bold text-[#5B3228] mb-4 text-center">Cinematic Videography</h3>
              <p className="text-[#B55233] text-center">that elevates every moment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white fade-in-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#B55233] mb-8">
            🚀 Our Mission
          </h2>
          <p className="text-lg md:text-xl text-[#5B3228] leading-relaxed mb-8">
            To transform everyday moments into unforgettable visuals—and empower creators, brands, and individuals to shine through bold, compelling storytelling.
          </p>
          <div className="bg-gradient-to-r from-[#FF9E4F] to-[#B55233] rounded-2xl p-8 text-white">
            <p className="text-xl font-semibold">
              A space not just to shoot, but to share, learn, and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Ongoing Journey */}
      <section className="py-20 bg-[#FFE5B4] fade-in-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#B55233] text-center mb-16">
            🛤️ Our Ongoing Journey
          </h2>
          <p className="text-lg text-[#5B3228] text-center mb-12">Right now, we are:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Building a passionate community of creators and clients',
              'Innovating with the latest gear, editing styles, and trends',
              'Exploring new cities and stories',
              'Evolving into a creative ecosystem where visuals meet vision'
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-[#FF9E4F] hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-[#FF9E4F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <p className="text-[#5B3228] text-center text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outro - Sticky background + CTA */}
      <section className="relative py-20 bg-gradient-to-br from-[#5B3228] via-[#B55233] to-[#FF9E4F] fade-in-section">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            🌟 What's Next
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8">
            Our story is just beginning—and you are part of it. Whether you're a client, a collaborator, or a fan of creative content, we invite you to grow with us.
          </p>
          <p className="text-lg mb-12">
            Stay tuned. Follow our journey. And let us help you tell yours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              className="bg-[#FF9E4F] text-[#5B3228] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e68834] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Your Story
            </a>
            <a
              href="/vibespace"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#5B3228] transition-all duration-300"
            >
              Explore VibeSpace
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurJourney;
