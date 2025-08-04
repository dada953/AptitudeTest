// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import profilePic from "./d.jpg";
// import axios from "axios";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";

// export default function Dashboard() {
//   const [selectedDay, setSelectedDay] = useState("All");
//   const [user, setUser] = useState(null);
//   const [results, setResults] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });

//   const navigate = useNavigate();

//   const days = [
//     "all",
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday"
//   ];

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem("access");
//         const response = await axios.get("http://localhost:8000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(response.data);
//         setFormData({
//           first_name: response.data.first_name || "",
//           last_name: response.data.last_name || "",
//           email: response.data.email || ""
//         });
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     const fetchChartData = async () => {
//       try {
//         const token = localStorage.getItem("access");
//         const response = await axios.get("http://127.0.0.1:8000/api/piechart/", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setChartData(response.data);
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };

//     fetchUserProfile();
//     fetchChartData();
//   }, []);

//   const fetchResultsByDay = async (day) => {
//     try {
//       if (day === "All") {
//         setResults([]);
//         return;
//       }

//       const token = localStorage.getItem("access");
//       const response = await axios.get(
//         `http://localhost:8000/api/results/${day}/`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       setResults(response.data);
//     } catch (error) {
//       console.error("Error fetching results:", error);
//       setResults([]);
//     }
//   };

//   const handleEditSubmit = async () => {
//   try {
//     const token = localStorage.getItem("access");
//     const form = new FormData();
//     form.append("first_name", formData.first_name);
//     form.append("last_name", formData.last_name);
//     form.append("email", formData.email);
//     if (formData.profile_image) {
//       form.append("profile_image", formData.profile_image);
//     }

//     const response = await axios.put("http://localhost:8000/api/update_profile/", form, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     setUser((prev) => ({ ...prev, ...response.data }));
//     setEditMode(false);
//   } catch (error) {
//     console.error("Error updating profile:", error);
//   }
// };


//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF6666", "#66CCCC"];

//   return (
//     <div className="min-h-screen bg-[#1e1e1e] text-white font-sans">
//       <nav className="bg-[#2b2b2b] px-8 py-4 flex justify-between items-center shadow-md">
//         <h1 className="text-xl font-bold text-yellow-400">Test Mate</h1>
//         <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>
//       </nav>

//       <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Panel */}
//         <div className="bg-[#2b2b2b] rounded-2xl p-6 space-y-4">
//           <div className="flex flex-col items-center">
//             <img
//               src={user?.profile_image ? `http://localhost:8000${user.profile_image}` : profilePic}
//               alt="Profile"
//               className="rounded-full w-24 h-24 border-4 border-yellow-500"
//             />

//             {editMode ? (
//               <>
//                 <input
//                   type="text"
//                   className="mt-4 p-1 rounded text-black w-full"
//                   value={formData.first_name}
//                   onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
//                   placeholder="First Name"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="mt-4 p-1 rounded bg-white w-full"
//                   onChange={(e) =>
//                     setFormData({ ...formData, profile_image: e.target.files[0] })
//   }
// />
//                 <input
//                   type="text"
//                   className="mt-2 p-1 rounded text-black w-full"
//                   value={formData.last_name}
//                   onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
//                   placeholder="Last Name"
//                 />
//                 <input
//                   type="email"
//                   className="mt-2 p-1 rounded text-black w-full"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder="Email"
//                 />
//                 <button
//                   onClick={handleEditSubmit}
//                   className="mt-4 px-4 py-1 border border-green-500 rounded hover:bg-green-500 hover:text-black"
//                 >
//                   Save
//                 </button>
//               </>
//             ) : (
//               <>
//                 <h2 className="text-xl font-bold mt-4">
//                   {user?.first_name || ""} {user?.last_name || ""}
//                 </h2>
//                 <p className="text-sm text-gray-400">{user?.email}</p>
//                 <button
//                   className="mt-4 px-4 py-1 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black"
//                   onClick={() => setEditMode(true)}
//                 >
//                   Edit Profile
//                 </button>
//               </>
//             )}
//           </div>

//           <button
//             onClick={() => navigate("/dashboard")}
//             className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-semibold transition mx-auto block"
//           >
//             🚀 Start Exam
//           </button>
//         </div>

//         {/* Right Panel */}
//         <div className="md:col-span-2 space-y-6">
//           {/* Day Filter */}
//           <div className="bg-[#2b2b2b] rounded-2xl p-6 space-y-4">
//             <div className="flex flex-wrap gap-2 justify-center md:justify-end">
//               {days.map((day) => (
//                 <button
//                   key={day}
//                   onClick={() => {
//                     setSelectedDay(day);
//                     fetchResultsByDay(day);
//                   }}
//                   className={`px-3 py-1 rounded-full border text-sm ${
//                     selectedDay === day
//                       ? "bg-yellow-400 text-black"
//                       : "border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black"
//                   } transition`}
//                 >
//                   {day}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Pie Chart */}
//           <div className="bg-[#2b2b2b] rounded-2xl p-6">
//             <h4 className="text-md text-gray-300 mb-3">
//               Test Attempts Per Day (All Days)
//             </h4>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={chartData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#8884d8"
//                   label
//                 >
//                   {chartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Filtered Results */}
//           <div className="bg-[#2b2b2b] rounded-2xl p-6">
//             <h4 className="text-md text-gray-300 mb-3">
//               Test Results - {selectedDay}
//             </h4>
//             <div className="space-y-4 text-sm">
//               {results.length > 0 ? (
//                 results.map((result, index) => (
//                   <div
//                     key={index}
//                     className="bg-[#3a3a3a] p-4 rounded-md shadow-md text-sm space-y-2"
//                   >
//                     <p><strong>Score:</strong> {result.score} / {result.total_questions}</p>
//                     <p><strong>Percentage:</strong> {result.percentage}%</p>
//                     <p><strong>Status:</strong> {result.status}</p>
//                     <p><strong>Submitted on:</strong> {result.submitted_at} ({result.day_name})</p>

//                     <details className="mt-2">
//                       <summary className="cursor-pointer text-yellow-400">✅ Correct Answers</summary>
//                       <ul className="list-disc ml-5">
//                         {result.correct_answers.map((ans, i) => (
//                           <li key={i}>{ans.question}</li>
//                         ))}
//                       </ul>
//                     </details>

//                     <details className="mt-2">
//                       <summary className="cursor-pointer text-red-400">❌ Wrong Answers</summary>
//                       <ul className="list-disc ml-5">
//                         {result.wrong_answers.map((ans, i) => (
//                           <li key={i}>{ans.question}</li>
//                         ))}
//                       </ul>
//                     </details>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-400">No results found for {selectedDay}.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "./d.jpg";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [selectedDay, setSelectedDay] = useState("All");
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });

  const navigate = useNavigate();

  const days = [
    "all", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("https://aptitudetest-q2h6.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setFormData({
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          email: response.data.email || ""
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("https://aptitudetest-q2h6.onrender.com/api/piechart/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchUserProfile();
    fetchChartData();
  }, []);

  const fetchResultsByDay = async (day) => {
    try {
      if (day === "All") {
        setResults([]);
        return;
      }

      const token = localStorage.getItem("access");
      const response = await axios.get(
        `https://aptitudetest-q2h6.onrender.com/api/results/${day}/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("access");
      const form = new FormData();
      form.append("first_name", formData.first_name);
      form.append("last_name", formData.last_name);
      form.append("email", formData.email);
      if (formData.profile_image) {
        form.append("profile_image", formData.profile_image);
      }

      const response = await axios.put("https://aptitudetest-q2h6.onrender.com/api/update_profile/", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prev) => ({ ...prev, ...response.data }));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF6666", "#66CCCC"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800 font-sans p-4">
      <nav className="bg-white px-8 py-4 rounded-lg shadow-md flex justify-between items-center mb-6 animate-fade-in-up">
        <h1 className="text-xl font-bold text-blue-600">Test Mate</h1>
        <button className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600 transition duration-300">
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4 animate-fade-in-up">
          <div className="flex flex-col items-center">
            <img
              src={user?.profile_image ? `https://aptitudetest-q2h6.onrender.com${user.profile_image}` : profilePic}
              alt="Profile"
              className="rounded-full w-24 h-24 border-4 border-blue-400 shadow"
            />

            {editMode ? (
              <>
                <input
                  type="text"
                  className="mt-4 p-2 rounded-md border w-full"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  placeholder="First Name"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-4 p-2 rounded-md border w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, profile_image: e.target.files[0] })
                  }
                />
                <input
                  type="text"
                  className="mt-2 p-2 rounded-md border w-full"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  placeholder="Last Name"
                />
                <input
                  type="email"
                  className="mt-2 p-2 rounded-md border w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                />
                <button
                  onClick={handleEditSubmit}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mt-4">
                  {user?.first_name || ""} {user?.last_name || ""}
                </h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <button
                  className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white font-semibold transition block w-full"
          >
            🚀 Start Exam
          </button>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 space-y-6 animate-fade-in-up">
          {/* Day Filter */}
          <div className="bg-white rounded-2xl p-6 shadow space-y-4">
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    fetchResultsByDay(day);
                  }}
                  className={`px-3 py-1 rounded-full border text-sm transition duration-300 ${
                    selectedDay === day
                      ? "bg-blue-600 text-white"
                      : "border-blue-600 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h4 className="text-md text-gray-700 mb-3 font-semibold">
              Test Attempts Per Day (All Days)
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Filtered Results */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h4 className="text-md text-gray-700 mb-3 font-semibold">
              Test Results - {selectedDay}
            </h4>
            <div className="space-y-4 text-sm">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-4 rounded-md shadow text-sm space-y-2"
                  >
                    <p><strong>Score:</strong> {result.score} / {result.total_questions}</p>
                    <p><strong>Percentage:</strong> {result.percentage}%</p>
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Submitted on:</strong> {result.submitted_at} ({result.day_name})</p>

                    <details className="mt-2">
                      <summary className="cursor-pointer text-green-600">✅ Correct Answers</summary>
                      <ul className="list-disc ml-5">
                        {result.correct_answers.map((ans, i) => (
                          <li key={i}>{ans.question}</li>
                        ))}
                      </ul>
                    </details>

                    <details className="mt-2">
                      <summary className="cursor-pointer text-red-500">❌ Wrong Answers</summary>
                      <ul className="list-disc ml-5">
                        {result.wrong_answers.map((ans, i) => (
                          <li key={i}>{ans.question}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No results found for {selectedDay}.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
