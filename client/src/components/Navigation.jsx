import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

export function Navigation() {
    const { user, logout } = useAuth(); 

    return (
    <div>
        <Link to="/users">
        <h1>Record App</h1>
        </Link>
        {user ? ( 
        <button onClick={logout}>Logout</button>
        ) : (
        <Link to="/login">Login</Link> 
        )}
    </div>
    );
}
