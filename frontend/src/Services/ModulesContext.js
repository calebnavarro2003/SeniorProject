import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchAllModules } from './UserService';
import { AuthContext } from './AuthContext';

// Create the ModulesContext
const ModulesContext = createContext();

// Export the ModulesContext provider component
export const ModulesProvider = ({ children }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const fetchModulesData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetchAllModules();
        setModules(response);
      } catch (error) {
        console.error('Failed to fetch modules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModulesData();
  }, [isAuthenticated]);

  return (
    <ModulesContext.Provider value={{ modules, loading }}>
      {children}
    </ModulesContext.Provider>
  );
};

// Custom hook to use the ModulesContext
export const useModules = () => {
  return useContext(ModulesContext);
};