import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

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
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4 hover:bg-purple-600 p-2 rounded cursor-pointer"
            onClick = {handleNavigateHome}>
            🏠 Home</li>
          <li className="mb-4 hover:bg-purple-600 p-2 rounded cursor-pointer"
            onClick = {handleNavigateAnalytics}>
            📊 Analytics</li>
          <li className="mb-4 hover:bg-purple-600 p-2 rounded cursor-pointer"
            onClick = {handleNavigateSettings}>
            ⚙️ Settings</li>
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard 🎉</h1>
        <p className="text-lg text-gray-600">Manage your account and explore the features.</p>
      </div>
    </div>
  );
}
