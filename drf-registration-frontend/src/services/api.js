// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://aptitudetest-q2h6.onrender.com/api'; // change this if your backend is running elsewhere

export const registerUser = (formData) => {
  return axios.post(`${API_BASE_URL}/register/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};



export const submitAnswers = async (answers) => {
  const token = localStorage.getItem('access');
  if (!token) {
    throw new Error('Token not found');
  }

  const response = await axios.post(
    'https://aptitudetest-q2h6.onrender.com/api/submit-answers/',
    { answers },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
