import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchUserInfo } from "../Services/UserService";

function Sidebar() {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserInfo = async () => {
          const response = await fetchUserInfo();
          setUser(response);
        };
      
        getUserInfo();
      }, [navigate]);

    const handleNavigate = (path) => {
        navigate(path);
        setIsMenuOpen(false); // Close the menu after navigation
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const getFirstName = (fullName) => {
        if (!fullName) return "User"; 
      
        // If the name includes a comma, assume the format is "Last, First" or "Last, First MiddleInitial"
        if (fullName.includes(",")) {
          const parts = fullName.split(",");
          if (parts.length > 1) {
            const firstNameCandidate = parts[1].trim()
            const firstSpaceIndex = firstNameCandidate.indexOf(" ");
            return firstSpaceIndex !== -1
              ? firstNameCandidate.substring(0, firstSpaceIndex)
              : firstNameCandidate;
          }
          return fullName; 
        } 
        // Otherwise, if the name contains a space, assume the format is "First Last" or similar
        else if (fullName.includes(" ")) {
          return fullName.split(" ")[0];
        }
        
        return fullName;
      };

    return (
        <div>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:flex-col bg-purple-600 text-white p-8 min-h-screen">
                <div className="flex flex-row pt-4 gap-8">
                    <h2 className="text-3xl font-bold text-wrap">
                        Welcome, <br /> {user ? getFirstName(user.name) : "User"}
                    </h2>
                    <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        {user ? (
                            <img className="w-full h-full object-cover" src={user.picture} alt="user profile" />
                        ) : (
                            <svg className="w-10 h-10 text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                        )}
                    </div>
                </div>

                <ul className="mt-10 text-2xl font-bold">
                    {location.pathname !== '/dashboard' && (
                        <li className="rounded cursor-pointer hover:bg-purple-600 py-3 px-2" onClick={() => handleNavigate('/dashboard')}>
                            🏠&nbsp;&nbsp;&nbsp;&nbsp;Home
                        </li>
                    )}
                    {location.pathname !== '/modules' && (
                        <li className="rounded cursor-pointer hover:bg-purple-600 py-3 px-2" onClick={() => handleNavigate('/modules')}>
                            📁&nbsp;&nbsp;&nbsp;&nbsp;Modules
                        </li>
                    )}
                    {location.pathname !== '/settings' && (
                        <li className="rounded cursor-pointer hover:bg-purple-600 py-3 px-2" onClick={() => handleNavigate('/settings')}>
                            ⚙️&nbsp;&nbsp;&nbsp;&nbsp;Settings
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden sticky bg-purple-600 text-white px-4 py-4 flex justify-between items-center w-full overflow-auto">
                <div className="flex items-center gap-4">
                    <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        {user ? (
                            <img className="w-full h-full object-cover" src={user.picture} alt="user profile" />
                        ) : (
                            <svg className="w-10 h-10 text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                        )}
                    </div>
                    <h2 className="text-xl font-bold">Welcome, {user ? getFirstName(user.name) : "User"}</h2>
                </div>
                <button onClick={toggleMenu} className="focus:outline-none">
                    {isMenuOpen ? (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed top-12 mt-8 md:hidden bg-white shadow-lg py-2 w-full">
                    {location.pathname !== '/dashboard' && (
                        <div className="block px-4 py-2 cursor-pointer text-black hover:bg-purple-600 hover:text-white" onClick={() => handleNavigate('/dashboard')}>
                            🏠 Home
                        </div>
                    )}
                    {location.pathname !== '/modules' && (
                        <div className="block px-4 py-2 cursor-pointer text-black hover:bg-purple-600 hover:text-white" onClick={() => handleNavigate('/modules')}>
                            📁 Modules
                        </div>
                    )}
                    {location.pathname !== '/settings' && (
                        <div className="block px-4 py-2 cursor-pointer text-black hover:bg-purple-600 hover:text-white" onClick={() => handleNavigate('/settings')}>
                            ⚙️ Settings
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Sidebar;