import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

const Navbar = () => {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/plants">Plants</Link>
      <Link to="/cart">Cart</Link>
      <div className="cart-icon">
        🛒
        <span className="cart-count">{totalItems}</span>
      </div>
    </nav>
  );
};

const LandingPage = ({ onGetStarted }) => (
  <div className="landing-page">
    <div className="background-image" />
    <h1>Paradise Nursery</h1>
    <p>Bring nature indoors with our curated collection of houseplants.</p>
    <button className="get-started-btn" onClick={onGetStarted}>
      Get Started
    </button>
  </div>
);

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStartedClick = () => {
    setShowProducts(true);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            showProducts ? (
              <ProductList />
            ) : (
              <LandingPage onGetStarted={handleGetStartedClick} />
            )
          }
        />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;