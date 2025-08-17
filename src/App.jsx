import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HeroSlider from './components/HeroSlider/HeroSlider';
import CategoryPick from './components/CategoryPick/CategoryPick';
import ProductCategoryList from './components/ProductCategoryList/ProductCategoryList';
import Slider from './components/Slider/Slider';
import CallToAction from './components/C2A/CallToAction';
import FeaturedPosts from './components/FeaturedPosts/FeaturedPosts';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Switch>
            <Route path="/">
              <HeroSlider />
              <CategoryPick />
              <ProductCategoryList />
              <Slider />
              <CallToAction />
              <FeaturedPosts />
              <Footer />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;