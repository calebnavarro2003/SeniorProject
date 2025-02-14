import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)

  useEffect(() => {
      axios.get('http://localhost:8080/get-user-info', {withCredentials: true})
      .then(response => {
        setUser(response.data)
        console.log(user)
      })
      .catch(error => {
        console.error("Error fetching user info: ", error)
      })
  }, []);

  const handleLogout = () => {
    navigate("/");
  };
  
  const handleNavigateHome = () => {
    navigate("/home");
  };

  const handleNavigateAnalytics = () => {
    navigate("/analytics");
  };

  const handleNavigateSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-purple-700 text-white p-6">
        <div className="flex flex-row space-x-8">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        </div>
        
        <ul className="pl-[32px]">
          <li className="mb-4 hover:bg-purple-600 p-2 rounded cursor-pointer">🏠 Home</li>
          <li className="mb-4 hover:bg-purple-600 p-2 rounded cursor-pointer">📊 Analytics</li>
          <li className="mb-4 hover:bg-purple-600 p-2 rounded cursor-pointer">⚙️ Settings</li>
        </ul>
        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 p-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard {user ? user.given_name : ""} 🎉</h1>
        <p className="text-lg text-gray-600">Manage your account and explore the features.</p>
      </div>
    </div>
  );
}
