import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // Scroll durumunu izle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobil menüyü kapat
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Dropdown menüyü aç/kapat
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Arama kutusunu aç/kapat
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        {/* Üst Menü */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center
          ">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              E-Commerce
            </Link>
          </div>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
              }
            >
              Ana Sayfa
            </NavLink>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
              }
            >
              Ürünler
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
              }
            >
              İletişim
            </NavLink>
          </nav>

          {/* Sağ Üst Menü */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Arama"
            >
              <FaSearch className="h-5 w-5" />
            </button>
            <Link 
              to="/account" 
              className="p-2 text-gray-600 hover:text-blue-600 hidden sm:inline-block"
              aria-label="Hesabım"
            >
              <FaUser className="h-5 w-5" />
            </Link>
            <Link 
              to="/cart" 
              className="p-2 text-gray-600 hover:text-blue-600 relative"
              aria-label="Sepetim"
            >
              <FaShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Menü"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Arama Çubuğu */}
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="px-4 py-2 space-y-2">
            <NavLink 
              to="/" 
              onClick={closeMobileMenu}
              className={`block px-4 py-3 text-sm font-medium ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Ana Sayfa
            </NavLink>
            <NavLink 
              to="/shop" 
              onClick={closeMobileMenu}
              className={`block px-4 py-3 text-sm font-medium ${location.pathname.startsWith('/shop') ? 'text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Ürünler
            </NavLink>
            <NavLink 
              to="/contact" 
              onClick={closeMobileMenu}
              className={`block px-4 py-3 text-sm font-medium ${location.pathname === '/contact' ? 'text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              İletişim
            </NavLink>
            <div className="border-t border-gray-200 my-2"></div>
            <Link 
              to="/account" 
              onClick={closeMobileMenu}
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <FaUser className="h-4 w-4 mr-2" />
              Hesabım
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;