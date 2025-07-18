
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: '1 Hour Plan',
      tagline: 'Perfect for quick captures',
      price: '₹2,000',
      originalPrice: '₹2,500',
      gst: '+GST',
      features: [
        '2 hours shoot duration',
        '1 edited reel delivered',
        '15 edited portraits',
        'Fast delivery within 15 mins',
        'Online gallery (optional)',
        'Basic editing included',
        'Digital download'
      ],
      recommended: false,
      savings: 'Save ₹500'
    },
    {
      name: 'Half Day',
      tagline: 'For your essential events',
      price: '₹5,000',
      originalPrice: '₹6,500',
      gst: '+GST',
      features: [
        'Half day shoot (4-5 hours)',
        '3 edited reels delivered',
        '30 edited portraits',
        'Fast delivery within 10 mins',
        'Online gallery included',
        'Premium editing & color grading',
        'Digital download + USB drive',
        'Backup storage for 1 year'
      ],
      recommended: true,
      savings: 'Save ₹1,500'
    },
    {
      name: 'Full Day',
      tagline: 'Complete event coverage',
      price: '₹8,000',
      originalPrice: '₹10,000',
      gst: '+GST',
      features: [
        'Full day shoot (8+ hours)',
        '5 edited reels delivered',
        '50+ edited portraits',
        'Same-day preview delivery',
        'Premium online gallery',
        'Professional editing & retouching',
        'Multiple format delivery',
        'Backup storage for 2 years',
        'Print-ready files included'
      ],
      recommended: false,
      savings: 'Save ₹2,000'
    }
  ];

  const addOns = [
    { name: 'Extra hour of shooting', price: '₹800' },
    { name: 'Additional edited reel', price: '₹500' },
    { name: 'Rush delivery (2 hours)', price: '₹1,000' },
    { name: 'Drone shots (where permitted)', price: '₹1,500' },
    { name: 'Second photographer', price: '₹2,000' },
    { name: 'Live streaming setup', price: '₹3,000' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#B55233] mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-[#5B3228] max-w-3xl mx-auto mb-8">
            Professional photography and videography packages designed to fit every occasion and budget. No hidden fees, just exceptional value.
          </p>
          <div className="inline-flex items-center bg-[#FFE5B4] px-6 py-3 rounded-full border border-[#FF9E4F]">
            <span className="text-[#5B3228] font-semibold">🎉 Limited Time: Up to 25% OFF all packages!</span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-[#FFE5B4] rounded-2xl border-2 p-8 shadow-lg hover:scale-105 transition-all duration-300 relative ${
                  plan.recommended ? 'border-[#FF9E4F] shadow-xl scale-105' : 'border-[#B55233]'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#FF9E4F] text-[#5B3228] px-6 py-2 rounded-full font-bold text-sm">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                {plan.savings && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-xs">
                      {plan.savings}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#5B3228] mb-2">{plan.name}</h3>
                  <p className="text-[#B55233] text-lg mb-4">{plan.tagline}</p>
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl text-gray-500 line-through">{plan.originalPrice}</span>
                      <span className="text-5xl font-extrabold text-[#FF9E4F]">{plan.price}</span>
                    </div>
                    <span className="text-[#5B3228] text-lg">{plan.gst}</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-[#FF9E4F] mt-0.5 mr-3 flex-shrink-0" />
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
                  Select {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 bg-[#FFE5B4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B55233] mb-4">
              Optional Add-ons
            </h2>
            <p className="text-lg text-[#5B3228]">
              Customize your package with these additional services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-[#FF9E4F] hover:bg-white/70 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-[#5B3228] text-sm leading-tight">{addon.name}</h3>
                  <span className="text-[#FF9E4F] font-bold text-lg">{addon.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B55233] mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                q: "What's included in the delivery?",
                a: "All packages include professionally edited photos and videos delivered through our secure online gallery. You'll receive high-resolution files ready for sharing and printing."
              },
              {
                q: "How quickly will I receive my photos?",
                a: "Delivery times vary by package: 1 Hour Plan (15 minutes), Half Day (10 minutes), and Full Day (same day preview with full delivery within 24 hours)."
              },
              {
                q: "Can I customize a package?",
                a: "Absolutely! We offer flexible customization options. Contact us to discuss your specific requirements and we'll create a tailored package for your event."
              },
              {
                q: "What happens if I need to reschedule?",
                a: "We understand plans change. You can reschedule your booking up to 48 hours before your event at no additional cost."
              },
              {
                q: "Do you travel for events?",
                a: "Yes! We cover events across the city. Travel charges may apply for locations beyond 25km from our studio."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-[#FFE5B4] rounded-xl p-6 border border-[#FF9E4F]">
                <h3 className="font-semibold text-[#5B3228] text-lg mb-3">{faq.q}</h3>
                <p className="text-[#5B3228] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF9E4F] to-[#B55233]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FFE5B4] mb-6">
            Ready to Capture Your Moments?
          </h2>
          <p className="text-xl text-[#FFE5B4] mb-8 opacity-90">
            Book your session today and let's create something amazing together
          </p>
          <Link
            to="/book"
            className="inline-block bg-[#FFE5B4] text-[#5B3228] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Book Your Session Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
