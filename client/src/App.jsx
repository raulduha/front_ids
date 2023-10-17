import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserPage } from './pages/UserPage';
import { UserLogInPage } from './pages/UserLogInPage';
import { UserSignUpPage } from './pages/UserSignUpPage';
import { AuthProvider } from './components/AuthContext';
import NavBar from './pages/NavBar';
import HomePage from './pages/HomePage';
import RecordPage from './pages/RecordPage';
import EditPage from './pages/EditPage';
import { ToastContainer } from 'react-toastify'; // Paso 1: Importa las dependencias
import 'react-toastify/dist/ReactToastify.css'; // Estilos de react-toastify

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/login" element={<UserLogInPage />} />
          <Route path="/signup" element={<UserSignUpPage />} />
          <Route path="/register" element={<RecordPage />} />
          <Route path="/editar/:id" element={<EditPage />} />
        </Routes>
        <ToastContainer /> {/* Paso 2: Añade el componente ToastContainer */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
