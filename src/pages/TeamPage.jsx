import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const TeamPage = () => {
  // Takım üyeleri
  const teamMembers = [
    {
      id: 1,
      name: 'Yunus Kalkan',
      role: 'Project Manager',
      image: '/images/yunushoca.png',
      linkedin: 'linkedin.com/in/kalkanyunus',
      github: '#',
      twitter: '#'
    },
    {
      id: 2,
      name: 'Sabiha Yıldız',
      role: 'Frontend Developer',
      image: '/images/sabiha.jpeg', // Kendi fotoğrafınızı ekleyebilirsiniz
      linkedin: 'https://www.linkedin.com/in/sabiha-y%C4%B1ld%C4%B1z-ab544b22b/',
      github: 'https://github.com/SabihaYldz',
      twitter: '#'
    },
    // Diğer takım üyeleri buraya eklenebilir
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ekibimiz
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            E-ticaret sitemizin arkasındaki yetenekli ekip üyelerimizle tanışın.
          </p>
        </div>

        {/* Takım Üyeleri */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  className="w-full h-full object-cover"
                  src={member.image}
                  alt={member.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-blue-200">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  {member.bio || `${member.name} hakkında kısa bir açıklama.`}
                </p>
                <div className="flex space-x-4">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600">
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                      <FaGithub className="h-6 w-6" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400">
                      <FaTwitter className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* İşe Alım Bölümü */}
        <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Aramıza Katılmak İster misiniz?</h3>
          <p className="text-gray-600 mb-6">
            Yetenekli ve tutkulu insanlarla çalışmayı seviyoruz. Açık pozisyonlarımızı inceleyin.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Kariyer Fırsatları
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;