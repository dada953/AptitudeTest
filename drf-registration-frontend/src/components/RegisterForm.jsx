import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { FaUser, FaEnvelope, FaLock, FaFileImage, FaUserCircle } from "react-icons/fa";

function RegisterForm() {


    

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    profile_image: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'profile_image' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      const response = await registerUser(payload);
      setMessage(response.data.message);
      setError('');
      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        profile_image: null,
      });
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please check your input.');
      setMessage('');
    }
  };
return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="animate-fade-in-up bg-white shadow-2xl rounded-2xl w-full max-w-md p-6 space-y-5 transform transition-all duration-700"
    >
      <div className="text-center animate-fade-in">
        <FaUserCircle className="text-5xl mx-auto text-blue-600 animate-bounce" />
        <h2 className="text-3xl font-extrabold text-gray-800">Register</h2>
      </div>

      {message && <p className="text-green-600 font-medium text-center animate-fade-in">{message}</p>}
      {error && <p className="text-red-600 font-medium text-center animate-fade-in">{error}</p>}

      {/* Inputs */}
      {[
        { icon: <FaUser />, name: "first_name", placeholder: "First Name", value: formData.first_name },
        { icon: <FaUser />, name: "last_name", placeholder: "Last Name", value: formData.last_name },
        { icon: <FaUser />, name: "username", placeholder: "Username", value: formData.username },
        { icon: <FaEnvelope />, name: "email", placeholder: "Email", value: formData.email },
        { icon: <FaLock />, name: "password", placeholder: "Password", value: formData.password, type: "password" },
      ].map((field, idx) => (
        <div key={idx} className="relative animate-fade-in-up">
          <span className="absolute left-3 top-3 text-gray-400">{field.icon}</span>
          <input
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={handleChange}
            required
            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform focus:scale-[1.02] hover:shadow"
          />
        </div>
      ))}

      {/* File upload */}
      <div className="flex items-center gap-2 animate-fade-in-up">
        <label className="flex items-center gap-2 text-blue-600 cursor-pointer hover:text-blue-800 transition duration-200">
          <FaFileImage className="text-xl" />
          <span className="text-sm">Upload Profile Image</span>
          <input
            type="file"
            name="profile_image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
        {formData.profile_image && (
          <span className="text-xs text-gray-600 truncate max-w-[160px]">{formData.profile_image.name}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02] animate-fade-in-up"
      >
        Register
      </button>

      {/* Login Redirect Button */}
      <button
        type="button"
        onClick={() => window.location.href = '/login'}
        className="w-full py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-md transition duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02] animate-fade-in-up"
      >
        Already have an account? Login
      </button>

    </form>
  </div>
);
}
export default RegisterForm;
