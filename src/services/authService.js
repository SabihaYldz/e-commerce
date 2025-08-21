const API_URL = 'http://localhost:3000/api'; // API URL'sini projenize göre güncelleyin
const mockUsers = [
    {
      email: 'customer@commerce.com',
      password: '123456',
      user: { 
        id: 1, 
        email: 'customer@commerce.com', 
        name: 'Müşteri Kullanıcı',
        role: 'customer'
      }
    },
    {
      email: 'store@commerce.com',
      password: '123456',
      user: { 
        id: 2, 
        email: 'store@commerce.com', 
        name: 'Mağaza Yöneticisi',
        role: 'store'
      }
    },
    {
      email: 'admin@commerce.com',
      password: '123456',
      user: { 
        id: 3, 
        email: 'admin@commerce.com', 
        name: 'Sistem Yöneticisi',
        role: 'admin'
      }
    }
  ];
  
  // Login fonksiyonu
  export const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      // 1 saniyelik gecikme ekleyelim
      setTimeout(() => {
        const user = mockUsers.find(
          u => u.email === email && 
               u.password === password
        );
        
        if (user) {
          // Başarılı giriş
          resolve({
            token: `mock-jwt-token-${user.user.id}`,
            user: user.user
          });
        } else {
          // Hatalı giriş
          reject(new Error('Geçersiz email veya şifre'));
        }
      }, 1000);
    });
  };
  
  export const checkAuth = async () => {
    return new Promise((resolve) => {
      const token = getAuthToken();
      if (!token) {
        resolve({ user: null });
        return;
      }

      // Token varsa, mock kullanıcıyı bulalım
      const userId = parseInt(token.replace('mock-jwt-token-', ''));
      const user = mockUsers.find(u => u.user.id === userId)?.user;
      
      if (user) {
        resolve({ user });
      } else {
        // Geçersiz token
        setAuthToken(null);
        resolve({ user: null });
      }
    });
  };

  export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };