import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "NEW COLLECTION",
      subtitle: "SUMMER 2025",
      description: "Discover our new collection with exclusive designs",
      buttonText: "SHOP NOW",
      buttonLink: "/shop"
    },
    {
      title: "SUMMER SALE",
      subtitle: "UP TO 50% OFF",
      description: "Special discounts on selected items. Limited time offer!",
      buttonText: "SHOP SALE",
      buttonLink: "/sale"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="relative h-[600px] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/anasayfa.png)' }}
    >
      {/* Content */}
      <div className="relative h-full flex items-center bg-black bg-opacity-40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="text-white mb-4 text-sm md:text-base font-semibold tracking-widest">
              {slides[currentSlide].subtitle}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-white text-lg mb-8 max-w-lg">
              {slides[currentSlide].description}
            </p>
            <Link 
              to={slides[currentSlide].buttonLink}
              className="inline-block bg-[#2DC071] hover:bg-[#25a35f] text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
            >
              {slides[currentSlide].buttonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="text-gray-800 text-xl" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <FiChevronRight className="text-gray-800 text-xl" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-blue-600 w-8' : 'bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;