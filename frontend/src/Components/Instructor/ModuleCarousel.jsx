import React from "react";
import { useNavigate } from 'react-router-dom';
import ProgressCircle from "./ProgressCircle.jsx"

const ModuleCarousel = ({ modules }) => {
  const navigate = useNavigate();

  const handleViewInsights = (id) => {
    navigate(`/admin/module/${id}`)
  }

  return (
      <div className='flex flex-row overflow-x-auto h-full w-full gap-4'>
        {
          modules.map((module) => {
            return (
              <div
              key={module.id}
              className="flex flex-col flex-shrink-0 w-72 h-full bg-white shadow rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold">{module.title}</h2>
              <div className='flex flex-col h-full items-center gap-2 text-large my-8 md:my-8 md:justify-center'>
                Completion Rate
                <ProgressCircle value={0.85} size={160} />
              </div>
              <button className='mt-auto ml-auto hover:underline' onClick={() => handleViewInsights(module.id)}>View Insights &rarr;</button>
            </div>
            )
          })
        }
  </div>
  );
};

export default ModuleCarousel;
