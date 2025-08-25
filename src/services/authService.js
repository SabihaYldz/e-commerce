import axios from 'axios';
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
  export const login = async (email, password, rememberMe = false) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          u => u.email === email && 
               u.password === password
        );
        
        if (user) {
          const token = `mock-jwt-token-${user.user.id}`;
          
          // Eğer "Beni Hatırla" seçiliyse token'ı localStorage'a kaydet
          if (rememberMe) {
            localStorage.setItem('token', token);
            setAuthToken(token);
          }
          
          resolve({
            token: token,
            user: user.user
          });
        } else {
          reject(new Error('Geçersiz email veya şifre'));
        }
      }, 1000);
    });
  };
  
  // Token doğrulama fonksiyonu
  export const checkAuth = async () => {
    const token = getAuthToken();
    
    if (!token) {
      return { isAuthenticated: false, user: null };
    }
    
    // Token varsa doğrulama yap
    try {
      // Burada gerçek bir API isteği yapılacakmış gibi simüle ediyoruz
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          const tokenParts = token.split('-');
          const userId = tokenParts[tokenParts.length - 1];
          const user = mockUsers.find(u => u.user.id.toString() === userId)?.user;
          
          if (user) {
            resolve({ 
              user,
              token: `mock-jwt-token-${user.id}` // Token'ı yenile
            });
          } else {
            resolve(null);
          }
        }, 500);
      });
  
      if (response) {
        // Token geçerli, kullanıcı bilgilerini döndür
        setAuthToken(response.token);
        return { isAuthenticated: true, user: response.user };
      } else {
        // Token geçersiz, temizle
        removeAuthToken();
        return { isAuthenticated: false, user: null };
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      removeAuthToken();
      return { isAuthenticated: false, user: null };
    }
  };
  
  // Axios header'ına token ekleme
  export const setAuthToken = (token) => {
    if (token) {
      // Bearer öneki olmadan token'ı header'a ekle
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  // LocalStorage'dan token'ı getir
  export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  // LocalStorage'dan token'ı kaldır
  export const removeAuthToken = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };
  
  // Kullanıcının giriş yapıp yapmadığını kontrol et
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };
  
  // Çıkış işlemi
  export const logout = () => {
    removeAuthToken();
  };