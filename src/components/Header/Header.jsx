import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Gravatar from 'react-gravatar';
import { setAuthToken } from '../../services/authService';
import { setUser } from '../../store/reducers/clientReducer';
import { fetchCategories } from '../../store/reducers/productReducer';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.client);
  const { categories } = useSelector((state) => state.product);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Kategorileri yükle
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Kategorileri cinsiyete göre grupla
  const groupedCategories = useMemo(() => {
    if (!Array.isArray(categories)) return {};
    
    return categories.reduce((acc, category) => {
      if (category && category.gender) {
        if (!acc[category.gender]) {
          acc[category.gender] = [];
        }
        acc[category.gender].push(category);
      }
      return acc;
    }, {});
  }, [categories]);

  // Scroll durumunu izle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menüyü kapat
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  };

  // Arama işlevi
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Arama işlemleri burada yapılabilir
      console.log('Arama yapılıyor:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Çıkış yap
  const handleLogout = () => {
    setAuthToken(null);
    dispatch(setUser(null));
    toast.success('Başarıyla çıkış yapıldı');
    navigate('/login');
    closeMenus();
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800" onClick={closeMenus}>
              E-TİCARET
            </Link>
          </div>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={closeMenus}
            >
              Ana Sayfa
            </Link>
            
            {/* Kategoriler Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              >
                Kategoriler
                <FaChevronDown className={`ml-1 text-xs transition-transform ${
                  isCategoryDropdownOpen ? 'transform rotate-180' : ''
                }`} />
              </button>
              
              {isCategoryDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50"
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                >
                  {Object.entries(groupedCategories).map(([gender, genderCategories]) => (
                    <div key={gender} className="px-4 py-2">
                      <h3 className="text-sm font-bold text-gray-900 uppercase">
                        {gender === 'kadin' ? 'Kadın' : 'Erkek'}
                      </h3>
                      <div className="mt-1">
                        {genderCategories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/kategori/${category.slug}`}
                            className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                            onClick={closeMenus}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/urunler" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={closeMenus}
            >
              Ürünler
            </Link>
            <Link 
              to="/hakkimizda" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={closeMenus}
            >
              Hakkımızda
            </Link>
            <Link 
              to="/iletisim" 
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              onClick={closeMenus}
            >
              İletişim
            </Link>
          </nav>

          {/* Sağ Üst Menü */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-blue-600"
              aria-label="Ara"
            >
              <FaSearch />
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                    <Gravatar 
                      email={user.email} 
                      size={32} 
                      className="w-full h-full object-cover"
                      default="identicon"
                    />
                  </div>
                  <span className="hidden md:inline text-sm font-medium">
                    {user.name || user.email.split('@')[0]}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <Link
                    to="/profil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeMenus}
                  >
                    Profilim
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Çıkış Yap
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/giris"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
                onClick={closeMenus}
              >
                Giriş Yap
              </Link>
            )}

            <Link
              to="/sepet"
              className="p-2 text-gray-600 hover:text-blue-600 relative"
              onClick={closeMenus}
            >
              <FaShoppingCart className="text-lg" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobil Menü Butonu */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menüyü Aç"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Arama Kutusu */}
        {isSearchOpen && (
          <div className="mt-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>
          </div>
        )}
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={closeMenus}
            >
              Ana Sayfa
            </Link>
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center justify-between"
            >
              <span>Kategoriler</span>
              <FaChevronDown
                className={`text-xs transition-transform ${
                  isCategoryDropdownOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {isCategoryDropdownOpen && (
              <div className="pl-4">
                {Object.entries(groupedCategories).map(([gender, genderCategories]) => (
                  <div key={gender} className="mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 px-2 py-1">
                      {gender === 'kadin' ? 'Kadın' : 'Erkek'}
                    </h4>
                    <div className="mt-1">
                      {genderCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/kategori/${category.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          onClick={closeMenus}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link
              to="/urunler"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={closeMenus}
            >
              Ürünler
            </Link>
            <Link
              to="/hakkimizda"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={closeMenus}
            >
              Hakkımızda
            </Link>
            <Link
              to="/iletisim"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={closeMenus}
            >
              İletişim
            </Link>
            {!user && (
              <Link
                to="/giris"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={closeMenus}
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;