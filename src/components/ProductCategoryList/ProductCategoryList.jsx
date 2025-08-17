import React from 'react';

const ProductCategoryList = () => {
  const categories = [
    { id: 1, image: 'morşort.png', alt: 'Mor Şort' },
    { id: 2, image: 'omzundaceket.png', alt: 'Omuz Ceket' },
    { id: 3, image: 'pembeüst.png', alt: 'Pembe Üst' },
    { id: 4, image: 'eteklikadın.png', alt: 'Eteklik' },
    { id: 5, image: 'uzunmontlu.png', alt: 'Uzun Mont' },
    { id: 6, image: 'sarıhırka.png', alt: 'Sarı Hırka' },
    { id: 7, image: 'sweat.png', alt: 'Sweat' },
    { id: 8, image: 'zenciçocuk.png', alt: 'Çocuk Giyim' },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 py-10">
      {/* Featured Products Title */}
      <div className="text-center mb-2">
        <h3 className="text-[#737373] text-xl font-bold">Featured Products</h3>
      </div>
      
      {/* Bestseller Products Title */}
      <div className="text-center mb-4">
        <h2 className="text-[#252B42] text-4xl font-bold">BESTSELLER PRODUCTS</h2>
      </div>
      
      {/* Description */}
      <div className="text-center max-w-[600px] mx-auto mb-10">
        <p className="text-[#737373] text-sm">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
        {categories.map((category) => (
          <div key={category.id} className="w-[239px] flex flex-col mx-auto">
            <div className="w-full overflow-hidden">
              <img 
                src={`/images/${category.image}`} 
                alt={category.alt} 
                className="w-full h-auto"
              />
            </div>
            <div className="w-[239px] mt-4">
              <img 
                src="/images/resimaltıözellik.png" 
                alt="Ürün Açıklaması" 
                className="w-full h-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryList;