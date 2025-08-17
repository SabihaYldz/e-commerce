import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const sections = [
    {
      title: 'Company Info',
      links: ['About Us', 'Carrier', 'We are hiring', 'Blog']
    },
    {
      title: 'Legal',
      links: ['About Us', 'Carrier', 'We are hiring', 'Blog']
    },
    {
      title: 'Features',
      links: ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support']
    },
    {
      title: 'Resources',
      links: ['IOS & Android', 'Watch a Demo', 'Customers', 'API']
    },
    {
      title: 'Get In Touch',
      isContact: true
    }
  ];

  return (
    <footer className="w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Top Section - Logo & Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 px-2">
          <h2 className="text-2xl font-bold text-[#252B42] mb-4 md:mb-0">Bandage</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-[#23A6F0] hover:text-[#1E88E5] transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-[#23A6F0] hover:text-[#1E88E5] transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-[#23A6F0] hover:text-[#1E88E5] transition-colors">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4 mb-8 px-2">
          {sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-sm font-bold text-[#252B42] mb-3">{section.title}</h3>
              {section.isContact ? (
                <div className="mt-2">
                  <div className="flex max-w-xs">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="px-3 py-2 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 flex-grow"
                    />
                    <button className="bg-[#23A6F0] text-white px-3 py-2 text-sm rounded-r hover:bg-[#1E88E5] transition-colors">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Lore imp sum dolor Amit</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-xs text-[#737373] hover:text-[#252B42] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs text-gray-600 text-center">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;