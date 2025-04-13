import React from "react";
import { useLocation } from "react-router-dom";

const ModuleOverview = ({ module, moduleInfo, startModule, reviewModule, completionStatus, grade }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Module {moduleInfo.moduleId}: {moduleInfo.title}
      </h1>
      <p className="text-lg text-gray-700 overflow-auto">
        {moduleInfo.description}
      </p>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-auto mt-4 pt-4">
        <div className="flex flex-row items-center gap-2 mr-auto">
          <div className="rounded-full bg-green-300 w-3 h-3"></div>
          {module.length} Questions
        </div>
        {completionStatus && grade !== null ? (
          <>
            <div className="mt-auto text-center text-2xl">
              Your Grade: {grade}%
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={reviewModule}>
              Review Module
            </button>
          </>
        ) : (
          <button 
            className={`bg-blue-500 text-white px-6 py-2 rounded ${completionStatus ? "cursor-not-allowed opacity-50" : ""}`} 
            onClick={startModule}
            disabled={completionStatus}
          >
            Begin Module
          </button>
        )}
      </div>
    </div>
  )
};

export default ModuleOverview;