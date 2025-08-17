import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">Hakkımızda</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          SYRA olarak 2020 yılından bu yana kaliteli ürünlerimizle siz değerli müşterilerimize hizmet vermekten gurur duyuyoruz.
        </p>
      </div>

      {/* About Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hikayemiz</h2>
          <p className="text-gray-600 mb-4">
            Küçük bir aile şirketi olarak başlayan yolculuğumuz, siz değerli müşterilerimizin desteğiyle bugün Türkiye'nin önde gelen e-ticaret markalarından biri haline geldi.
          </p>
          <p className="text-gray-600 mb-6">
            Kalite, güven ve müşteri memnuniyeti ilkelerimizle her geçen gün kendimizi geliştirmeye ve sizlere daha iyi hizmet vermeye devam ediyoruz.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            İletişime Geçin
          </Link>
        </div>
        <div className="order-1 md:order-2">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
            alt="Our Team" 
            className="rounded-lg shadow-xl w-full h-auto"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-12">Değerlerimiz</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Kalite',
              description: 'Tüm ürünlerimiz en yüksek kalite standartlarında üretilmektedir.',
              icon: '🏆'
            },
            {
              title: 'Güven',
              description: 'Müşteri memnuniyetini her şeyin üzerinde tutuyoruz.',
              icon: '🤝'
            },
            {
              title: 'Sürdürülebilirlik',
              description: 'Çevreye duyarlı üretim ve satış politikaları izliyoruz.',
              icon: '🌱'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Preview */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ekibimizle Tanışın</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Uzman ekibimiz, size en iyi hizmeti sunmak için burada. Ekibimizi daha yakından tanımak için sayfamızı ziyaret edin.
        </p>
        <Link 
          to="/team" 
          className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition duration-300"
        >
          Ekibimizi Görüntüle
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;