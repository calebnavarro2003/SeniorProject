import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchAllModules } from "../../../Services/UserService";

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModulesData = async () => {
      const response = await fetchAllModules();
      setModules(response);
    };
  
    fetchModulesData();
  }, []);

  const handleNavigateToModule = (moduleId, moduleTitle, moduleDescription) => {
    navigate(`/admin/module/${moduleId}`, { state: { title: moduleTitle, description: moduleDescription } }); // Pass module details as state
  };

  const handleNewModule = () => {
    navigate('/admin/module/new', { state: { modules }})
  }

  return (
    <div className="flex flex-col items-center justify-start overflow-auto bg-gray-100 h-full gap-4">
      <h1 className="w-full text-center text-4xl font-bold text-gray-800 py-4">
        Available Modules
      </h1>
      <div className="flex flex-col gap-4 w-full px-6 pb-4 overflow-auto">
        {modules.map((module) => (
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
      <button className="ml-auto mt-auto rounded-lg text-white shadow p-3 m-4 bg-purple-600" onClick={() => handleNewModule()}>Create New Module</button>
    </div>
  );
};

export default ModulesPage;
