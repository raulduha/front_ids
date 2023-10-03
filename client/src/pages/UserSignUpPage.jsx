import React, { useState } from 'react';
import axios from 'axios';

export function UserSignUpPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: '', 
        password: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/records/api/v1/users/', formData);
            console.log('Registro exitoso', response.data);
        } catch (error) {
            console.error('Error en el registro', error);
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                />
            </div>
        <div>
            <label>Apellido:</label>
            <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label>Correo Electrónico:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label>Teléfono:</label>
            <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label>Rol:</label>
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
        <div>
            <label>Contraseña:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            </div>
            <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}
