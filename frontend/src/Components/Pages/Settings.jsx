import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const handleNavigateDashboard = () => {
    navigate("/dashboard"); // Navigates to the dashboard
  };

  const handleLogout = () => {
    navigate("/"); // Navigates to the home page (or login page)
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-purple-700 text-white p-6 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        <ul>
          <li
            className="mb-4 hover:bg-purple-600 p-2 rounded cursor-pointer"
            onClick={handleNavigateDashboard}
          >
            🏠 Back to Dashboard
          </li>
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Settings</h1>
        <p className="text-lg text-gray-600">Manage your account settings here.</p>
        {/* Add settings form or content here */}
      </div>
    </div>
  );
}