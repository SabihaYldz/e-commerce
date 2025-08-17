import React from 'react';

const CallToAction = () => {
  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between max-w-[1440px] mx-auto h-[682px]">
        {/* Görsel */}
        <div className="w-[704px] h-[682px] overflow-hidden">
          <img
            src="/images/kızerkek.png"
            alt="Special Offer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* İçerik */}
        <div className="flex-1 pl-20 pr-10">
          <p className="text-lg text-gray-500 mb-4">Summer 2025</p>
          <h2 className="text-5xl font-bold mb-6">
            Part of the Neural <br /> Universe
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            We know how large objects will act, but things on a small scale
          </p>
          <div className="flex space-x-4">
            <button className="bg-[#2DC071] text-white rounded-full px-8 py-3 font-bold hover:bg-[#25a35a] transition-colors">
              BUY NOW
            </button>
            <button className="text-[#2DC071] border border-[#2DC071] bg-white rounded-full px-8 py-3 font-bold hover:bg-gray-50 transition-colors">
              READ MORE
            </button>
          </div>
        </div>
      </div>
       {/* Mobile View */}
<div className="md:hidden p-6">
  <div className="text-center mb-8">
    <p className="text-gray-500 mb-2">Summer 2025</p>
    <h2 className="text-3xl font-bold mb-4">
      Part of the Neural <br /> Universe
    </h2>
    <p className="text-gray-600 mb-6">
      We know how large objects will act, but things on a small scale
    </p>
    <div className="flex flex-col space-y-4 items-center">
      <button className="bg-[#2DC071] text-white rounded-full px-6 py-2 text-sm font-bold hover:bg-[#25a35a] transition-colors w-auto">
        BUY NOW
      </button>
      <button className="text-[#2DC071] border border-[#2DC071] bg-white rounded-full px-6 py-2 text-sm font-bold hover:bg-gray-50 transition-colors w-auto">
        READ MORE
      </button>
    </div>
  </div>
  
  {/* Mobil Görsel */}
  <div className="w-full h-[300px] mt-8">
    <img
      src="/images/kızerkek.png"
      alt="Special Offer"
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
</div>
      
    </div>
  );
};

export default CallToAction;