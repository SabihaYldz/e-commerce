import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingBag } from 'react-icons/fa';
import { fetchCategories, fetchProducts } from '../store/reducers/productReducer';
import Spinner from '../components/Spinner/Spinner';

const Home = () => {
  const dispatch = useDispatch();
  const { 
    categories, 
    productList: products, 
    total, 
    fetchState 
  } = useSelector((state) => state.product);

  // Kategorileri ve ürünleri yükle
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ limit: 12 })); // İlk 12 ürünü getir
  }, [dispatch]);

  // Yıldız derecelendirmesi oluştur
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;

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

  // Yükleme durumunu kontrol et
  if (fetchState === 'LOADING') {
    return <Spinner />;
  }

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
            Alışverişe Başla
          </Link>
        </div>
      </div>

      {/* Ürünler Bölümü */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Popüler Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {product.images?.[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Resim Yok</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  {renderRating(product.rating)}
                  <span className="text-gray-600 text-sm ml-2">({product.reviewCount || 0})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price?.toFixed(2)}</span>
                  <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <FaShoppingBag />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kategoriler Bölümü */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Kategoriler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories?.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.gender === 'kadin' ? 'Kadın' : 'Erkek'}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;