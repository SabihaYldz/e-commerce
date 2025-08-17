import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HeroSlider from './components/HeroSlider/HeroSlider';
import CategoryPick from './components/CategoryPick/CategoryPick';
import ProductCategoryList from './components/ProductCategoryList/ProductCategoryList';
import Slider from './components/Slider/Slider';
import CallToAction from './components/C2A/CallToAction';
import FeaturedPosts from './components/FeaturedPosts/FeaturedPosts';
import Footer from './components/Footer/Footer';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
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
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;