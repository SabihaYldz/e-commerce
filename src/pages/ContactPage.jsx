import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderim işlemleri burada yapılacak
    console.log('Form gönderildi:', formData);
    alert('Mesajınız başarıyla gönderildi!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Bize Ulaşın
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Sorularınız veya geri bildirimleriniz için aşağıdaki formu doldurun veya doğrudan iletişim bilgilerimizi kullanın.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* İletişim Bilgileri */}
            <div className="bg-blue-700 text-white p-8 lg:p-12">
              <h3 className="text-2xl font-bold mb-6">İletişim Bilgileri</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 rounded-lg p-3">
                    <FaPhoneAlt className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Telefon</h4>
                    <p className="text-blue-100">+90 555 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 rounded-lg p-3">
                    <FaEnvelope className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">E-posta</h4>
                    <p className="text-blue-100">info@example.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-600 rounded-lg p-3">
                    <FaMapMarkerAlt className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Adres</h4>
                    <p className="text-blue-100">1234 Sokak No:1 D:2<br />İstanbul, Türkiye</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4">Bizi Takip Edin</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-blue-200">
                    <FaFacebookF className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-blue-200">
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-blue-200">
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-white hover:text-blue-200">
                    <FaLinkedinIn className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div className="p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Ad Soyad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-posta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Mesajınız <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Mesaj Gönder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Harita */}
        <div className="mt-12 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="h-80 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2798569534!2d28.97835831541148!3d41.00823757930932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9eb9d587135%3A0x8aa0bb6b1dd6ffb7!2zQmV5b8SxZHUgS3VsZXNpLCDFnmVoaXRsacWfIE1lcmtlei9Jc3RhbmJ1bA!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Harita"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;