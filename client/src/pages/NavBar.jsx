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
    navigate('/');
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
          {/* Overview tab visible only to roles 2 and 4 */}
          {user && (user.role === 2 || user.role === 4) && (
            <li className="nav-item">
              <Link to="/overview" className="nav-link">
                Overview
              </Link>
            </li>
          )}

          {/* Existing tabs */}
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
