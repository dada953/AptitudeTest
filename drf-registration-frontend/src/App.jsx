import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/navbar';
import SubmitAnswersPage from './pages/SubmitAnswersPage';
import UserDashboard   from './pages/UserDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {<Route path="/" element={<RegisterPage />} /> }
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/submit" element={<SubmitAnswersPage />} />

        { <Route path="/login" element={<LoginPage />} /> }
        <Route path="/userdashboard" element={<UserDashboard />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
