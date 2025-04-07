import { useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import React, { useEffect, useState } from "react";

const ModulesPage = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Fetch the modules from the backend
    fetchModules()
  }, []);

  const fetchModules = async () => {
    try {
      const response = await UserService.getAllModules()
      setModules(response)
    } catch (error) {
      console.error("Error fetching modules: " + error)
    }
  }

  const navigate = useNavigate();

  const handleNavigateToModule = (moduleId, moduleTitle, moduleDescription) => {
    navigate(`/module/${moduleId}`, { state: { title: moduleTitle, description: moduleDescription, id: moduleId } }); // Pass module details as state
  };

  return (
    <div className="flex flex-col items-center justify-start overflow-auto bg-gray-100 h-full">
      <h1 className="w-full text-center text-4xl font-bold text-gray-800 py-4">
        Available Modules
      </h1>
      <div className="flex flex-col gap-4 w-full px-6 pb-4 overflow-auto">
        {modules?.map((module) => (
          <div
          key={module.moduleId}
          className="bg-white shadow-md p-4 rounded-lg text-center cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigateToModule(module.moduleId, module.title, module.description)}
        >
          <h2 className="text-xl font-semibold text-gray-800">Module {module.moduleId}: {module.title}</h2>
          <p className="text-gray-600">{module.description}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesPage;
