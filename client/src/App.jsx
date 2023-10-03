import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserPage } from './pages/UserPage';
import { UserLogInPage } from './pages/UserLogInPage';
import { Navigation } from './components/Navigation';
import { UserSignUpPage } from './pages/UserSignUpPage';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/users" element={<UserPage />} />
          <Route path="/login" element={<UserLogInPage />} />
          <Route path="/signup" element={<UserSignUpPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider> 
  );
}

export default App;