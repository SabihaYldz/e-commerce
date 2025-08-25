import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingBag } from 'react-icons/fa';
import { fetchCategories } from '../store/reducers/productReducer';

const Home = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.product);

  // Kategorileri yükle
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Yıldız derecelendirmesi oluştur
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return stars;
  };

  // En yüksek puanlı 5 kategoriyi al
  const topCategories = [...(categories || [])]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Hero Bölümü */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Yeni Sezon Koleksiyonu</h1>
          <p className="text-xl mb-6">En yeni ürünlerimizi keşfedin ve özel indirimlerden yararlanın!</p>
          <Link
            to="/shop"
            className="inline-flex items-center bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaShoppingBag className="mr-2" />
            Alışverişe Başla
          </Link>
        </div>
      </div>

      {/* Popüler Kategoriler */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="w-1 h-8 bg-blue-600 mr-3"></span>
          Popüler Kategoriler
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              to={`/shop/${category.gender}/${category.name.toLowerCase()}/${category.id}`}
              className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-100 overflow-hidden">
                {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500">Resim Yok</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  {category.name}
                </h3>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {renderRating(category.rating || 0)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({category.rating?.toFixed(1) || '0.0'})
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Öne Çıkan Ürünler */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="w-1 h-8 bg-blue-600 mr-3"></span>
          Öne Çıkan Ürünler
        </h2>
        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-gray-600">Yakında eklenecek...</p>
        </div>
      </section>

      {/* Kampanyalar */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="w-1 h-8 bg-blue-600 mr-3"></span>
          Özel Kampanyalar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8">
            <h3 className="text-xl font-bold mb-2">Yeni Üyelere Özel</h3>
            <p className="mb-4">İlk alışverişinizde %20 indirim kazanın</p>
            <button className="px-4 py-2 bg-white text-purple-700 font-medium rounded-lg hover:bg-opacity-90 transition-colors">
              Hemen Katıl
            </button>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl p-8">
            <h3 className="text-xl font-bold mb-2">Kargo Bedava</h3>
            <p className="mb-4">200 TL ve üzeri alışverişlerde kargo bedava</p>
            <button className="px-4 py-2 bg-white text-amber-700 font-medium rounded-lg hover:bg-opacity-90 transition-colors">
              Hemen Alışveriş Yap
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;