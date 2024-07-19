import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">College Vidya</Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/compare">Compare</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
