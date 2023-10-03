import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserPage } from './pages/UserPage';
import { UserLogInPage } from './pages/UserLogInPage';
import { UserSignUpPage } from './pages/UserSignUpPage';
import { AuthProvider } from './components/AuthContext';
import NavBar from './pages/NavBar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar /> {/* Include the NavBar component */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Add a route for the HomePage */}
          <Route path="/users" element={<UserPage />} />
          <Route path="/login" element={<UserLogInPage />} />
          <Route path="/signup" element={<UserSignUpPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
