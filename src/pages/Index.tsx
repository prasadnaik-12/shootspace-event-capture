
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Explore from '@/components/Explore';
import OurJourney from '@/components/OurJourney';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Explore />
      <OurJourney />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
