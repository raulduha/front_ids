import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (userData) => {
    setUser(userData);
    };

    const logout = () => {
    setUser(null); 
    console.log('Cierre de sesión exitoso');
    };

    const authContextValue = {
    user,
    login,
    logout,
    };

    return (
    <AuthContext.Provider value={authContextValue}>
        {children}
    </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
