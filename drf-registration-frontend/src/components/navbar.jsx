
import React from 'react';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  return (
    <nav className="bg-white shadow-lg py-4 px-8 flex justify-between items-center animate-fade-in">
      <div className="text-2xl font-bold text-indigo-700">
        MyApp
      </div>
      <div className="space-x-4">
        <button
          type="button"
          onClick={() => window.location.href = '/login'}
          className="px-5 py-2 rounded-full bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => window.location.href = '/register'}
          className="px-5 py-2 rounded-full bg-white text-indigo-600 border border-indigo-500 font-semibold hover:bg-indigo-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-sm"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => window.location.href = '/progress'}
          className="px-5 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Progress
        </button>
      </div>
    </nav>
  );
}

export default Navbar;