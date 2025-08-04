import React, { useState } from 'react';
import { FaUser, FaLock, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://aptitudetest-q2h6.onrender.com/api/login/', {
      // const response = await fetch('https://cab643f7d9fb.ngrok-free.app/api/login/', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        navigate('/userdashboard');
      } else {
        setError(data.detail || 'Invalid credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6 space-y-5 animate-fade-in-up"
      >
        <div className="text-center">
          <FaUserCircle className="text-5xl mx-auto text-blue-600 animate-bounce" />
          <h2 className="text-3xl font-extrabold text-gray-800 mt-2">Login</h2>
        </div>

        {error && (
          <p className="text-red-600 font-medium text-center animate-fade-in">{error}</p>
        )}

        {/* Username */}
        <div className="relative animate-fade-in-up">
          <span className="absolute left-3 top-3 text-gray-400">
            <FaUser />
          </span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform focus:scale-[1.02] hover:shadow"
          />
        </div>

        {/* Password */}
        <div className="relative animate-fade-in-up">
          <span className="absolute left-3 top-3 text-gray-400">
            <FaLock />
          </span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform focus:scale-[1.02] hover:shadow"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02] animate-fade-in-up"
        >
          Login
        </button>

        {/* Register Button */}
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="w-full py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-md transition duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02] animate-fade-in-up"
        >
          Don’t have an account? <span className="underline ml-1">Register</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
