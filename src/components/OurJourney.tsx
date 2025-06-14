
const OurJourney = () => {
  const milestones = [
    {
      title: 'Eureka Moment',
      description: 'The spark of inspiration to revolutionize event photography and videography',
      year: '2023'
    },
    {
      title: 'Beginning of ShootSpace',
      description: 'Founded with a vision to make professional shoots accessible for every occasion',
      year: '2023'
    },
    {
      title: 'Team Formation',
      description: 'Assembled a passionate team of photographers, videographers, and tech enthusiasts',
      year: '2023'
    },
    {
      title: 'Research',
      description: 'Deep market research to understand client needs and industry gaps',
      year: '2024'
    },
    {
      title: 'Development',
      description: 'Built our platform with cutting-edge technology and user-centric design',
      year: '2024'
    },
    {
      title: 'First Prototype',
      description: 'Launched our MVP and gathered valuable feedback from early adopters',
      year: '2024'
    }
  ];

  return (
    <section id="journey" className="py-20 bg-[#FFE5B4]">
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
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#B55233] h-full"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.title}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-2xl border border-[#B55233] p-6 shadow-lg hover:scale-105 transition-all duration-300">
                    <div className="text-[#FF9E4F] font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-2xl font-bold text-[#5B3228] mb-3">{milestone.title}</h3>
                    <p className="text-[#5B3228] leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="relative z-10 w-6 h-6 bg-[#FF9E4F] border-4 border-[#B55233] rounded-full flex-shrink-0"></div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Vision Section */}
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
  );
};

export default OurJourney;
