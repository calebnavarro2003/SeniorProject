import { useParams } from 'react-router-dom';
import Module1 from './modules/Module1';

const moduleComponents = {
  "module-1": Module1
  // Import and map other module components
};

export default function ModulePage() {
  const { moduleName } = useParams();

  const ModuleComponent = moduleComponents[moduleName] || null;

  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 capitalize">{moduleName.replace("-", " ")}</h1>
        {ModuleComponent ? <ModuleComponent /> : "This module is under construction."}
      </div>
    </div>
  );
}