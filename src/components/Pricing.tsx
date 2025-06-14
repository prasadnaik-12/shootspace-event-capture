
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
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
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
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
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-[#FFE5B4] rounded-2xl border-2 p-8 shadow-lg hover:scale-105 transition-all duration-300 relative ${
                plan.recommended ? 'border-[#FF9E4F] shadow-xl' : 'border-[#B55233]'
              }`}
            >
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
  );
};

export default Pricing;
