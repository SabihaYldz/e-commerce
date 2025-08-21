import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { checkAuth } from './services/authService';
import { setUser } from './store/reducers/clientReducer';
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
  const token = localStorage.getItem('token');
  
  if (!user && !token) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await checkAuth();
        if (response?.user) {
          dispatch(setUser(response.user));
        }
      } catch (error) {
        console.error('Oturum kontrolü başarısız:', error);
        localStorage.removeItem('token');
      }
    };

    checkUserAuth();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <main className="flex-grow">
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
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          
          {/* Protected Routes Example:
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;