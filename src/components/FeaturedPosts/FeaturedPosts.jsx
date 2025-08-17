import React from 'react';

const FeaturedPosts = () => {
  // Image data with direct paths
  const posts = [
    {
      id: 1,
      image: '/images/ilkgörsel.png',
      caption: '/images/görselaltı.png'
    },
    {
      id: 2,
      image: '/images/ikincigörsel.png',
      caption: '/images/görselaltı.png'
    },
    {
      id: 3,
      image: '/images/üçüncügörsel.png',
      caption: '/images/görselaltı.png'
    }
  ];

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-[#2DC071] text-sm font-bold mb-2 inline-block">
            Practice Advice
          </span>
          <h2 className="text-4xl font-bold text-black mb-4">Featured Posts</h2>
          <p className="text-gray-600">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col items-center">
              <div className="w-full h-[300px] bg-gray-100 mb-4 overflow-hidden rounded-lg shadow-sm">
                <img 
                  src={post.image} 
                  alt={`Featured Post ${post.id}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Error loading image:', post.image);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="w-full">
                <img 
                  src={post.caption} 
                  alt={`Caption ${post.id}`}
                  className="w-full h-auto"
                  onError={(e) => {
                    console.error('Error loading caption:', post.caption);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;