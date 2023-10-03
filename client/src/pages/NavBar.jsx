import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your custom CSS for styling

function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
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
      </div>
      <div className="nav-right">
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
      </div>
    </nav>
  );
}

export default NavBar;
