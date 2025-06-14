
const Explore = () => {
  const eventTypes = [
    {
      title: 'Wedding',
      description: 'Capture your special day with cinematic reels and stunning portraits',
      image: '/placeholder.svg',
      color: 'from-[#FFE5B4] to-[#FF9E4F]'
    },
    {
      title: 'Birthday',
      description: 'Fun and vibrant shoots to celebrate life\'s precious moments',
      image: '/placeholder.svg',
      color: 'from-[#FF9E4F] to-[#B55233]'
    },
    {
      title: 'Corporate',
      description: 'Professional content for your business events and branding',
      image: '/placeholder.svg',
      color: 'from-[#B55233] to-[#5B3228]'
    },
    {
      title: 'Fashion',
      description: 'Editorial shoots and lookbooks with creative storytelling',
      image: '/placeholder.svg',
      color: 'from-[#5B3228] to-[#FFE5B4]'
    },
    {
      title: 'Custom',
      description: 'Tailored shoots for your unique vision and requirements',
      image: '/placeholder.svg',
      color: 'from-[#FFE5B4] to-[#FF9E4F]'
    }
  ];

  return (
    <section id="explore" className="py-20 bg-white">
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
          {eventTypes.slice(0, 4).map((event, index) => (
            <div
              key={event.title}
              className="bg-[#FFE5B4] rounded-2xl border border-[#B55233] p-8 hover:scale-103 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group"
            >
              <div className={`w-full h-48 bg-gradient-to-br ${event.color} rounded-xl mb-6 flex items-center justify-center`}>
                <span className="text-white text-6xl font-bold opacity-50">
                  {event.title.charAt(0)}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#5B3228] mb-3 group-hover:text-[#B55233] transition-colors duration-300">
                {event.title}
              </h3>
              <p className="text-[#5B3228] leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
          
          {/* Custom event takes full width on larger screens */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="bg-[#FFE5B4] rounded-2xl border border-[#B55233] p-8 hover:scale-103 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group">
              <div className={`w-full h-48 bg-gradient-to-br ${eventTypes[4].color} rounded-xl mb-6 flex items-center justify-center`}>
                <span className="text-white text-6xl font-bold opacity-50">
                  {eventTypes[4].title.charAt(0)}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#5B3228] mb-3 group-hover:text-[#B55233] transition-colors duration-300">
                {eventTypes[4].title}
              </h3>
              <p className="text-[#5B3228] leading-relaxed">
                {eventTypes[4].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
