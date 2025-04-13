import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Services/AuthContext';
import { useContext } from 'react';

export default function Settings() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  // Create a click handler that calls logout and then navigates.
  const handleLogout = async () => {
    try {
      await logout(); // waits for logout to finish if it's async
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      navigate('/'); // redirect to the home or login page
    }
  };

  return (
    <div className="flex flex-col px-6 py-4 gap-4 h-full w-full bg-gray-100">
      <div className="flex flex-col w-full bg-white rounded shadow-md p-6 items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Settings</h1>
        <p className="text-lg text-gray-600 mb-6">Manage your account settings here.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}