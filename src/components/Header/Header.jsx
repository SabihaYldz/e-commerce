import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaSearch, FaUser, FaHeart, FaShoppingCart, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ location }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleShop = () => setIsShopOpen(!isShopOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Shop', 
      path: '/shop',
      submenu: {
        women: ['Bags', 'Belts', 'Cosmetics', 'Hats'],
        men: ['Bags', 'Belts', 'Cosmetics', 'Hats']
      }
    },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Pages', path: '/pages' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-[#252B42] text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-2 md:mb-0">
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2 text-xs" />
                <span>(+90) 555 123 45 67</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-xs" />
                <span>info@bandage.com</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <span>Follow Us and get a chance to win 80% off</span>
            </div>
            
            <div className="flex space-x-4">
              <span className="hidden md:inline">Follow Us:</span>
              <div className="flex space-x-2">
                <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
                <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
                <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
                <a href="#" className="hover:text-gray-300"><FaLinkedinIn /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#252B42]">Bandage</Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.submenu ? (
                    <div className="flex items-center cursor-pointer">
                      <span className={`hover:text-[#23A6F0] transition-colors ${location.pathname === item.path ? 'text-[#23A6F0]' : 'text-gray-700'}`}>
                        {item.name}
                      </span>
                      <FaChevronDown className="ml-1 text-xs" />
                      
                      {/* Dropdown Menu */}
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 hidden group-hover:block">
                        <div className="px-4 py-2 font-semibold text-gray-700 border-b">Kadın</div>
                        {item.submenu.women.map((subItem, i) => (
                          <Link 
                            key={`women-${i}`} 
                            to={`/shop/women/${subItem.toLowerCase()}`}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem}
                          </Link>
                        ))}
                        <div className="px-4 py-2 font-semibold text-gray-700 border-t border-b">Erkek</div>
                        {item.submenu.men.map((subItem, i) => (
                          <Link 
                            key={`men-${i}`}
                            to={`/shop/men/${subItem.toLowerCase()}`}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`hover:text-[#23A6F0] transition-colors ${location.pathname === item.path ? 'text-[#23A6F0]' : 'text-gray-700'}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/login" className="flex items-center text-[#23A6F0] hover:text-[#1e96d6]">
                  <FaUser className="mr-1" /> Login / Register
                </Link>
                <button className="text-gray-700 hover:text-[#23A6F0]">
                  <FaSearch />
                </button>
              </div>
              <button className="text-gray-700 hover:text-[#23A6F0] relative">
                <FaHeart />
                <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
              </button>
              <button className="text-gray-700 hover:text-[#23A6F0] relative">
                <FaShoppingCart />
                <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
              </button>
              <button 
                className="md:hidden text-gray-700"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="py-2 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/product" className="py-2 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Product</Link>
                <Link to="/pricing" className="py-2 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                <Link to="/contact" className="py-2 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              </div>
              <div className="mt-6 pt-6 border-t">
                <Link to="/login" className="flex items-center space-x-4 mb-4 text-[#23A6F0]" onClick={() => setIsMenuOpen(false)}>
                  <FaUser />
                  <span>Login / Register</span>
                </Link>
                <button className="flex items-center space-x-4 text-gray-600">
                  <FaSearch />
                  <span>Search</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default withRouter(Header);