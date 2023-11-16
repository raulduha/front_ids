import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; 
import { useNavigate } from 'react-router-dom';

export function UserSignUpPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: '0',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://24.144.85.42:8001/records/api/v1/users/signup/', formData);
      console.log('Registro exitoso', response.data);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('El correo electrónico ya está en uso. Por favor, utilice otro.');
      } else {
        setError('Error en el registro. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="sign-up-page">
      <h2 style={{ color: 'white' }}>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ color: 'white' }}>Nombre:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'white' }}>Apellido:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'white' }}>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'white' }}>Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ color: 'white' }}>Rol:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="0">Machine worker</option>
            <option value="1">Warehouse worker</option>
            <option value="2">Supervisor</option>
            <option value="3">Manager</option>
            <option value="4">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label style={{ color: 'white' }}>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">Registrarse</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
