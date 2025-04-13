import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchAllModules } from './UserService';

// Create the ModulesContext
const ModulesContext = createContext();

// Export the ModulesContext provider component
export const ModulesProvider = ({ children }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModulesData = async () => {
      try {
        const response = await fetchAllModules();
        setModules(response);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch modules:', error);
        setLoading(false);
      }
    };

    fetchModulesData();
  }, []);

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