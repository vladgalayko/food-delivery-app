import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ShopsPage from './components/ShopsPage/ShopsPage';
import ShoppingCartPage from './components/ShoppingCartPage/ShoppingCartPage';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ShopsPage addToCart={addToCart}/>}/>
        <Route exact path="/cart" element={
        <ShoppingCartPage
        cartItems={cartItems}
        setCartItems={setCartItems}
      />}/>
      </Routes>
    </Router>
  );
};

export default App;