import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserPage } from './pages/UserPage';
import { UserLogInPage } from './pages/UserLogInPage';
import { Navigation } from './components/Navigation';
import { UserSignUpPage } from './pages/UserSignUpPage';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/users" element={<UserPage />} />
        <Route path="/login" element={<UserLogInPage />} />
        <Route path="/signup" element={<UserSignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;