import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

function NavBar() {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

  return (
    <nav className={`navbar ${mobileNavActive ? 'active' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/datafusion.png" alt="Home" style={{ width: '100px' }} />
        </Link>

        <div className="nav-toggle" onClick={toggleMobileNav}>
          <i className="fas fa-bars"></i>
        </div>
        <ul id="navbar" className={`navbar-nav ${mobileNavActive ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/users" className="nav-link" activeClassName="active">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" activeClassName="active">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" activeClassName="active">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
