import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('https://aptitudetest-q2h6.onrender.com/api/aptitude_questions/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setQuestions(res.data.questions);
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load questions');
        setLoading(false);
      });
  }, [navigate]);

  const handleOptionClick = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmitTest = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      setError("Token not found. Please login again.");
      return;
    }

    try {
      const res = await axios.post(
        'https://aptitudetest-q2h6.onrender.com/api/submit_answers/',
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Submission failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-sky-200 p-6 animate-fade-in">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-indigo-700 animate-pulse tracking-wide">
            Welcome, {user} 👋
          </h2>
          <button
            onClick={() => {
              navigate('/userdashboard');
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Logout
          </button>
        </div>

        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <FaQuestionCircle className="text-indigo-600 animate-bounce" />
          Aptitude Questions
        </h3>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading questions...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : result ? (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-green-700">🎉 Test Submitted!</h2>
            <p className="text-xl text-gray-800">👤 <strong>Name:</strong> {user}</p>
            <p className="text-xl text-gray-800">🎯 <strong>Score:</strong> {result.score} / {result.total_questions}</p>
            <p className="text-xl text-gray-800">📊 <strong>Percentage:</strong> {result.percentage}%</p>
            <p className={`text-xl font-bold ${result.status === 'Pass' ? 'text-green-600' : 'text-red-600'}`}>
              🏅 Status: {result.status}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className="bg-gradient-to-br from-white via-gray-50 to-indigo-50 p-5 rounded-xl border border-gray-200 shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-[1.015]"
                >
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                    {index + 1}. {q.question}
                  </h4>
                  <ul className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                    {q.options.map((opt, i) => (
                      <li
                        key={i}
                        onClick={() => handleOptionClick(q.id, opt)}
                        className={`px-4 py-2 border rounded-xl cursor-pointer transition-all duration-200
                          ${
                            answers[q.id] === opt
                              ? 'bg-indigo-500 text-white border-indigo-500'
                              : 'bg-white border-indigo-300 hover:bg-indigo-100 hover:text-indigo-800'
                          }`}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Submit Test Button */}
            <div className="mt-10">
              <button
                onClick={handleSubmitTest}
                type="button"
                className="w-full py-3 px-6 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 
                          text-white text-xl font-bold rounded-2xl shadow-lg 
                          hover:from-teal-500 hover:to-green-400 
                          hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out 
                          flex items-center justify-center gap-2"
              >
                🚀 Submit Test
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
