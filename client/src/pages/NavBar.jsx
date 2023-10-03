import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Home Page
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </li>
      </ul>
      <div className="user-menu">
        <ul className="user-dropdown">
          <li>
            <Link to="/login" className="user-dropdown-item">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="user-dropdown-item">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
