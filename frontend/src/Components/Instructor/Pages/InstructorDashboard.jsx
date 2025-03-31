import React, { useEffect, useState } from 'react';
import ProgressCircle from '../../ProgressCircle';

export default function Dashboard() {
  const sampleModules = [
    { id: 1, title: "Module 1", description: "Introduction to React" },
    { id: 2, title: "Module 2", description: "State & Props" },
    { id: 3, title: "Module 3", description: "Hooks & Context API" },
    { id: 4, title: "Module 4", description: "Advanced Patterns" },
    { id: 5, title: "Module 4", description: "Advanced Patterns" },
    { id: 6, title: "Module 4", description: "Advanced Patterns" },
    { id: 7, title: "Module 4", description: "Advanced Patterns" },
];

  return (
    <div className="flex flex-col px-4 py-4 gap-4 w-full h-full flex-1 bg-gray-100">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row p-4 md:h-64 w-full bg-white rounded-lg shadow gap-4 ">
        <div className="md:w-3/5 w-full flex items-center text-3xl px-6 py-4">
          Take a peak at how your students are performing
        </div>
        <div className="md:w-2/5 md:h-auto h-40 w-full flex flex-col justify-center items-center text-xl gap-2 mb-4 md:mb-0">
          Overall Accuracy
          <ProgressCircle value={0.85} size={160} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-row-1 h-full overflow-x-auto">
        <div className='flex flex-row overflow-x-auto h-full w-full gap-4'>
          {
          sampleModules.map((module) => {
            return (
              <div
              key={module.id}
              className="flex flex-col flex-shrink-0 w-72 h-full bg-white shadow rounded-lg p-6"
            >
              <h2 className="text-xl font-bold">{module.title}</h2>
              <div className='flex flex-col h-full items-center gap-2 text-large my-8 md:my-8 md:justify-center'>
                Completion Rate
                <ProgressCircle value={0.85} size={160} />
              </div>
              <button className='mt-auto ml-auto hover:underline'>View Insights &rarr;</button>
            </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
}