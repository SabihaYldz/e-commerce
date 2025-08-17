import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShopPage = () => {
  // Örnek ürün verileri
  const products = [
    { id: 1, name: 'Mor Şort', price: 199.99, image: '/images/morşort.png', category: 'Giyim' },
    { id: 2, name: 'Omuz Ceket', price: 499.99, image: '/images/omzundaceket.png', category: 'Giyim' },
    { id: 3, name: 'Pembe Üst', price: 249.99, image: '/images/pembeüst.png', category: 'Giyim' },
    { id: 4, name: 'Eteklik', price: 349.99, image: '/images/eteklikadın.png', category: 'Giyim' },
    { id: 5, name: 'Uzun Mont', price: 899.99, image: '/images/uzunmontlu.png', category: 'Giyim' },
    { id: 6, name: 'Sarı Hırka', price: 399.99, image: '/images/sarıhırka.png', category: 'Giyim' },
  ];

  const [filters, setFilters] = useState({
    category: 'all',
    sort: 'default',
  });

  // Filtreleme fonksiyonu
  const filteredProducts = products.filter(product => {
    if (filters.category === 'all') return true;
    return product.category === filters.category;
  });

  // Sıralama fonksiyonu
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sort === 'price-low') return a.price - b.price;
    if (filters.sort === 'price-high') return b.price - a.price;
    if (filters.sort === 'name-asc') return a.name.localeCompare(b.name);
    return 0; // Varsayılan sıralama
  });

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtreleme Alanı */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Filtreler</h2>
            
            {/* Kategori Filtresi */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Kategoriler</h3>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="all">Tüm Kategoriler</option>
                <option value="Giyim">Giyim</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Ev">Ev & Yaşam</option>
              </select>
            </div>

            {/* Fiyat Aralığı */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Fiyat Aralığı</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" id="price-all" name="price" className="mr-2" defaultChecked />
                  <label htmlFor="price-all">Tüm Fiyatlar</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="price-1" name="price" className="mr-2" />
                  <label htmlFor="price-1">0 - 250 TL</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="price-2" name="price" className="mr-2" />
                  <label htmlFor="price-2">250 - 500 TL</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="price-3" name="price" className="mr-2" />
                  <label htmlFor="price-3">500 TL ve üzeri</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ürünler */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Tüm Ürünler</h1>
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-sm text-gray-600">Sırala:</label>
              <select
                id="sort"
                className="p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.sort}
                onChange={(e) => setFilters({...filters, sort: e.target.value})}
              >
                <option value="default">Varsayılan</option>
                <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                <option value="name-asc">İsme Göre (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-lg font-bold text-blue-600">{product.price.toFixed(2)} TL</p>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Sayfalama */}
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-blue-600 hover:bg-gray-50">
                Önceki
              </a>
              <a href="#" className="px-4 py-2 border-t border-b border-gray-300 bg-blue-50 text-blue-600 font-medium">
                1
              </a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-blue-600 hover:bg-gray-50">
                2
              </a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-blue-600 hover:bg-gray-50">
                3
              </a>
              <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-blue-600 hover:bg-gray-50">
                Sonraki
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;