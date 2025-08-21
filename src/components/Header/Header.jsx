import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Gravatar from 'react-gravatar';
import { setAuthToken } from '../../services/authService';
import { setUser } from '../../store/reducers/clientReducer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.client);

  // Scroll durumunu izle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobil menüyü kapat
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Arama kutusunu aç/kapat
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Çıkış yap
  const handleLogout = () => {
    setAuthToken(null);
    dispatch(setUser(null));
    toast.success('Başarıyla çıkış yapıldı');
    navigate('/login');
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4">
        {/* Üst Menü */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              SYRA
            </Link>
          </div>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              Ana Sayfa
            </NavLink>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              Ürünler
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              Hakkımızda
            </NavLink>
            <NavLink 
              to="/team" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              Ekibimiz
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              İletişim
            </NavLink>
          </nav>

          {/* Sağ Üst Menü */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
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
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Giriş Yap
              </Link>
            )}

            <Link
              to="/sepet"
              className="p-2 text-gray-600 hover:text-blue-600 relative"
              aria-label="Sepet"
            >
              <FaShoppingCart />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobil Menü Butonu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
              aria-label="Menü"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Arama Kutusu */}
        {isSearchOpen && (
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ürün ara..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={toggleSearch}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            <NavLink
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={closeMobileMenu}
            >
              Ana Sayfa
            </NavLink>
            <NavLink
              to="/shop"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={closeMobileMenu}
            >
              Ürünler
            </NavLink>
            <NavLink
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={closeMobileMenu}
            >
              Hakkımızda
            </NavLink>
            <NavLink
              to="/team"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={closeMobileMenu}
            >
              Ekibimiz
            </NavLink>
            <NavLink
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={closeMobileMenu}
            >
              İletişim
            </NavLink>
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-100 rounded-md flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Çıkış Yap
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;