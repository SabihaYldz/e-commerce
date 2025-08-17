import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // C2A Bileşeni Doğrudan İçeride
  const C2A = () => (
    <div className="relative min-h-screen bg-[#23856D] flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 overflow-hidden">
      {/* Text Content */}
      <div className="text-white z-10 lg:w-1/2 lg:pl-20 text-center lg:text-left mb-8 lg:mb-0">
        <p className="text-sm font-bold mb-2">SUMMER 2025</p>
        <h1 className="text-4xl md:text-6xl font-bold">VITA CLASSIC</h1>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">PRODUCT</h1>
        <p className="text-lg mb-6 max-w-lg mx-auto lg:mx-0">
          We know how large objects will act, We know how are objects will act, We know how
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <span className="text-2xl font-bold">16.48 €</span>
          <button className="bg-[#2DC071] text-white px-8 py-3 rounded-md font-bold hover:bg-opacity-90 transition-all">
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="lg:absolute lg:right-20 lg:bottom-0 w-full lg:w-auto flex justify-center lg:block">
        <img 
          src="/images/tekliçocuk.png" 
          alt="Vitaclassic Product" 
          className="w-[300px] h-[464px] lg:w-[443px] lg:h-[685px] object-cover"
        />
      </div>
    </div>
  );
  
  // Slayt verileri
  const slides = [
    {
      id: 1,
      content: <C2A />
    },
    {
      id: 2,
      content: <C2A /> // İkinci slayt için farklı içerik ekleyebilirsiniz
    },
    // Daha fazla slayt ekleyebilirsiniz
  ];

  // Otomatik geçiş işlevselliği - 10 saniyede bir
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            {slide.content}
          </div>
        ))}
      </div>

      {/* Yön Okları */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-[#23856D] w-10 h-10 flex items-center justify-center rounded-full z-20 hover:bg-opacity-100 transition-all shadow-lg"
        aria-label="Önceki slide"
      >
        <span className="text-2xl font-bold">‹</span>
      </button>
      <button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-[#23856D] w-10 h-10 flex items-center justify-center rounded-full z-20 hover:bg-opacity-100 transition-all shadow-lg"
        aria-label="Sonraki slide"
      >
        <span className="text-2xl font-bold">›</span>
      </button>

      {/* Nokta Navigasyonu */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`${index + 1}. slayta git`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;