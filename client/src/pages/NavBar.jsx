import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; 
import { useAuth } from '../components/AuthContext';

function NavBar() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the main page when clicking Logout
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
          {user && (user.role === 2 || user.role === 4) && (
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                Usuarios
              </Link>
            </li>
          )}
          {user && (user.role === 1 || user.role === 2 || user.role === 4) && (
            <li className="nav-item">
              <Link to="/storage" className="nav-link">
                Bodega
              </Link>
            </li>
          )}
          {/* Condición actualizada para que solo los roles 0, 2 y 4 puedan ver Producción */}
          {user && (user.role === 0 || user.role === 2 || user.role === 4) && (
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Producción
              </Link>
            </li>
          )}
          {user ? (
            <>
              {(user.role === 2 || user.role === 4) && (
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Registrar
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Iniciar sesión
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
