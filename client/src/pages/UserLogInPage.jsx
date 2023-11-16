import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import './UserLogInPage.css';
import { useNavigate } from 'react-router-dom';

export function UserLogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://24.144.85.42:8001/records/api/v1/users/login/', {
        email: email,
        password: password,
      });
      console.log('Inicio de sesión exitoso');

      login(response.data);
      navigate('/'); 
    } catch (err) {
      setError('Credenciales incorrectas');
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <h2 style={{ color: 'white' }}>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label style={{ color: 'white' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'white' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Iniciar sesión</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
