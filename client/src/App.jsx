import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserPage } from './pages/UserPage';
import { UserFormPage } from './pages/UserFormPage';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/users" element={<UserPage />} />
        <Route path="/users-create" element={<UserFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;