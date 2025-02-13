import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleNavigateToModule = (module) => {
    navigate(`/module/${module}`); // Navigate to the respective module page
  };

  const handleNavigateDashboard = () => {
    navigate("/dashboard"); // Navigates to the dashboard
  };

  const handleLogout = () => {
    navigate("/"); // Navigates to the home page (or login page)
  };

  const handleNavigateSettings = () => {
    navigate("/settings"); // Navigates to the settings page
  };

  const modules = Array.from({ length: 13 }, (_, index) => `Module ${index + 1}`);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-purple-700 text-white p-6 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-6">Home</h2>
        <ul>
          <li
            className="mb-4 hover:bg-purple-600 p-2 rounded cursor-pointer"
            onClick={handleNavigateDashboard}
          >
            🏠 Back to Dashboard
          </li>
          <li
            className="mb-4 hover:bg-purple-600 p-2 rounded cursor-pointer"
            onClick={handleNavigateSettings}
          >
            ⚙️ Settings
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
      <div className="flex-1 flex flex-col items-center justify-start md:justify-center overflow-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Modules</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full overflow-auto">
          {modules.map((module) => (
            <div
              key={module}
              className="bg-white shadow-md p-4 rounded-lg text-center cursor-pointer hover:bg-gray-200"
              onClick={() => handleNavigateToModule(module.toLowerCase().replace(" ", "-"))}
            >
              <h2 className="text-xl font-semibold text-gray-800">{module}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}