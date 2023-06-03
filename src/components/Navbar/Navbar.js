import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Shops</Link>
        </li>
        <li className="navbar-item">
          <Link to="/cart" className="navbar-link">Shopping Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;