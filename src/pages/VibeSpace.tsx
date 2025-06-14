
import { useState } from 'react';
import { Play } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const VibeSpace = () => {
  const [selectedCategory, setSelectedCategory] = useState('Events & Weddings');
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  const categories = [
    'Events & Weddings',
    'Car Delivery',
    'Celebrities',
    'Fashion',
    'Corporate',
    'Birthdays',
    'Travel'
  ];

  const videoCards = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop',
      title: 'Wedding Highlights',
      creator: 'FLA*HOOT',
      views: '12K'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=600&fit=crop',
      title: 'Car Launch Event',
      creator: 'FLA*HOOT',
      views: '8.5K'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=600&fit=crop',
      title: 'Celebrity Portrait',
      creator: 'FLA*HOOT',
      views: '25K'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF9E4F] to-[#B55233]">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Discover with{' '}
              <span className="text-[#FFE5B4] drop-shadow-lg">vibespace</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 font-medium max-w-2xl mx-auto">
              Explore trending reels from our creators
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border border-white/20 hover:scale-105 hover:shadow-lg hover:border-white/40 ${
                  selectedCategory === category
                    ? 'bg-white/30 text-white shadow-lg border-white/40'
                    : 'bg-white/10 text-white/90 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {videoCards.map((video) => (
              <div
                key={video.id}
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15"
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Watermark */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-xs font-bold">{video.creator}</span>
                  </div>

                  {/* Play Button Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${
                      hoveredVideo === video.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 shadow-lg">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>

                  {/* Gradient Overlay at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1 truncate">{video.title}</h3>
                  <p className="text-white/80 text-sm">{video.views} views</p>
                </div>

                {/* Glassmorphism shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Load More Videos
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VibeSpace;
