import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { checkAuth, setAuthToken, removeAuthToken } from './services/authService';
import { setUser, clearUser } from './store/reducers/clientReducer';
import Navbar from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HeroSlider from './components/HeroSlider/HeroSlider';
import CategoryPick from './components/CategoryPick/CategoryPick';
import ProductCategoryList from './components/ProductCategoryList/ProductCategoryList';
import Slider from './components/Slider/Slider';
import CallToAction from './components/C2A/CallToAction';
import FeaturedPosts from './components/FeaturedPosts/FeaturedPosts';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.client);
  const isAuth = localStorage.getItem('token');
  
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.client);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const { isAuthenticated, user } = await checkAuth();
        
        if (isAuthenticated && user) {
          dispatch(setUser(user));
        } else {
          // Token geçersizse veya kullanıcı yoksa temizlik yap
          dispatch(clearUser());
          removeAuthToken();
        }
      } catch (error) {
        console.error('Oturum kontrolü başarısız:', error);
        dispatch(clearUser());
        removeAuthToken();
      }
    };

    // Sayfa yüklendiğinde token kontrolü yap
    checkUserAuth();
  }, [dispatch]);

  // ... diğer kodlar aynı kalacak ...

  return (
    <div className="App">
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSlider />
            <CategoryPick />
            <ProductCategoryList />
            <Slider />
            <CallToAction />
            <FeaturedPosts />
          </>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/urunler" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/shop/:gender?/:categoryName?/:categoryId?" element={<ShopPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <div>Profil Sayfası</div>
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;