import React from 'react';

const CategoryPick = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">EDITOR'S PICK</h2>
        <p className="text-gray-600 text-center mb-12">Problems trying to resolve the conflict between</p>
        
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-[1030px] mx-auto">
          {/* First column - MEN */}
          <div className="w-full md:w-[510px] overflow-hidden">
            <img 
              src="/images/kahvemontlu.png" 
              alt="MEN"
              className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          <div className="flex flex-col md:flex-row w-full md:w-[490px] gap-4">
            {/* Second column - WOMEN */}
            <div className="w-full md:w-[240px] overflow-hidden">
              <img 
                src="/images/grikazak.png" 
                alt="WOMEN"
                className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            {/* Third column - ACCESSORIES and KIDS */}
            <div className="flex flex-col w-full md:w-[240px] gap-4">
              <div className="w-full overflow-hidden">
                <img 
                  src="/images/hırkalıkadın.png" 
                  alt="ACCESSORIES"
                  className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="w-full overflow-hidden">
                <img 
                  src="/images/sarıgömlek.png" 
                  alt="KIDS"
                  className="w-full h-auto object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPick;