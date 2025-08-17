import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaFacebookF, FaTwitter, FaPinterest, FaInstagram } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Örnek ürün verisi - Gerçek uygulamada API'den çekilecek
  const product = {
    id: id || '1',
    title: 'Premium Ürün Adı',
    price: 299.99,
    oldPrice: 399.99,
    description: 'Bu ürün yüksek kaliteli malzemelerden üretilmiştir ve uzun ömürlü kullanım için tasarlanmıştır. Su geçirmez ve dayanıklıdır.',
    images: [
      '/images/morşort.png',
    '/images/omzundaceket.png',
    '/images/pembeüst.png',
    '/images/eteklikadın.png',
    '/images/uzunmontlu.png',
    '/images/sarıhırka.png',
    '/images/sweat.png',
    '/images/zenciçocuk.png'

    ],
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'Yüksek kaliteli malzeme',
      'Su geçirmez',
      'Hafif ve dayanıklı',
      'Ergonomik tasarım'
    ]
  };

  const handleQuantityChange = (value) => {
    const newValue = quantity + value;
    if (newValue >= 1 && newValue <= 10) {
      setQuantity(newValue);
    }
  };

  return (
    <div className="bg-white">
      {/* Üst Navigasyon */}
      <div className="bg-gray-100 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/shop" className="text-gray-600 hover:text-blue-600 flex items-center">
            <FaArrowLeft className="mr-2" />
            Alışverişe Devam Et
          </Link>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ürün Görselleri - Mobil */}
          <div className="lg:hidden">
            <div className="relative h-80 bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''} rounded overflow-hidden`}
                >
                  <img 
                    src={img} 
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Ürün Görselleri - Masaüstü */}
          <div className="hidden lg:grid grid-cols-5 gap-4">
            <div className="col-span-1 space-y-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-full h-20 rounded overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
                >
                  <img 
                    src={img} 
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="col-span-4 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Ürün Bilgileri */}
          <div className="lg:pl-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-600 ml-2">(10 Değerlendirme)</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="ml-2 text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
              <span className="ml-2 text-green-600 font-medium">%25 İndirim</span>
            </div>

            <p className="text-gray-600 mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Renk Seçiniz</h3>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    style={{ backgroundColor: color }}
                    title={`Renk ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Beden</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Adet</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  -
                </button>
                <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                  {quantity}
                </div>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center">
                <FaShoppingCart className="mr-2" />
                Sepete Ekle
              </button>
              <button className="p-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
                <FaHeart />
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Özellikler</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Paylaş</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-red-600">
                  <FaPinterest className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-600">
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ürün Açıklama ve Detaylar */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 text-sm font-medium">
                Ürün Açıklaması
              </button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 text-sm font-medium">
                Ek Bilgiler
              </button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 text-sm font-medium">
                Değerlendirmeler (5)
              </button>
            </nav>
          </div>

          <div className="py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ürün Hakkında</h3>
            <p className="text-gray-600">
              Bu ürün yüksek kaliteli malzemelerden üretilmiştir ve uzun ömürlü kullanım için tasarlanmıştır. 
              Su geçirmez özelliği sayesinde her türlü hava koşulunda rahatlıkla kullanabilirsiniz. 
              Ergonomik tasarımı sayesinde maksimum konfor sağlar.
            </p>
            
            <h4 className="text-md font-medium text-gray-900 mt-6 mb-2">Özellikler</h4>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>%100 Orijinal Ürün</li>
              <li>2 Yıl Garanti</li>
              <li>Hızlı ve Ücretsiz Kargo</li>
              <li>Güvenli Ödeme</li>
              <li>Kolay İade</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;