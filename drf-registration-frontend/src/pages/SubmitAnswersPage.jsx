import React, { useState } from 'react';
import { submitAnswers } from '../services/api';

function SubmitTestPage() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await submitAnswers(answers);
      setResult(res);
    } catch (err) {
      setError('Token missing or expired. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🧠 Aptitude Test</h2>

        {!result && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[1, 2, 3, 4, 5].map((qId) => (
              <div key={qId}>
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Question {qId}
                </label>
                <input
                  type="text"
                  placeholder="Enter your answer"
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  onChange={(e) => handleChange(qId, e.target.value)}
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 
                        text-white text-xl font-bold rounded-2xl shadow-lg 
                        hover:from-teal-500 hover:to-green-400 
                        hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out 
                        flex items-center justify-center gap-2"
            >
              🚀 Submit Test
            </button>

            {error && <p className="text-red-600 font-medium mt-2">{error}</p>}
            {loading && <p className="text-blue-600 animate-pulse mt-2">Submitting...</p>}
          </form>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="text-center text-2xl font-bold text-green-700">
              ✅ You {result.status} the test!
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl shadow-inner space-y-2">
              <p><strong>🎯 Score:</strong> {result.score} / {result.total_questions}</p>
              <p><strong>📊 Percentage:</strong> {result.percentage}%</p>
              <p><strong>🏅 Grade:</strong> {result.status === "Pass" ? "A+" : "Needs Improvement"}</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-700 mt-4">Correct Answers ✅</h4>
              {result.correct_questions.map((item) => (
                <div key={item.id} className="bg-green-50 border border-green-300 rounded-lg p-4 my-2 shadow">
                  <p><strong>Q:</strong> {item.question}</p>
                  <p className="text-green-700"><strong>Your Answer:</strong> {item.your_answer}</p>
                </div>
              ))}

              <h4 className="text-xl font-semibold text-red-700 mt-6">Wrong Answers ❌</h4>
              {result.wrong_questions.map((item) => (
                <div key={item.id} className="bg-red-50 border border-red-300 rounded-lg p-4 my-2 shadow">
                  <p><strong>Q:</strong> {item.question}</p>
                  <p className="text-red-600"><strong>Your Answer:</strong> {item.your_answer}</p>
                  <p className="text-green-700"><strong>Correct Answer:</strong> {item.correct_answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmitTestPage;
