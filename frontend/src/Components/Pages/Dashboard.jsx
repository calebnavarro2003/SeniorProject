import React from 'react';

export default function Dashboard() {
  return (
    <div className="flex flex-col px-6 py-4 gap-4 w-full bg-gray-100">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row h-auto md:h-64 w-full bg-white rounded shadow gap-4 overflow-hidden">
        <div className="md:w-3/5 w-full flex items-center justify-center text-3xl px-6 py-4 md:py-0">
          Boost your learning - just one short lesson at a time 🚀
        </div>
        <div className="w-full md:w-1/5"></div> {/* Blank space */}
        <div className="md:w-1/5 w-full flex justify-center items-center rounded">
          <img
            className="object-contain max-w-full max-h-full"
            src="./gold-medal.png"
            alt="gold medal reward"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col h-auto md:h-auto bg-white rounded shadow-md">
        <div className="text-3xl my-8 ml-8">Your current progress</div>
        <div className="w-full h-full px-4 pb-4">
          {/* Add progress map here */}
        </div>
      </div>
    </div>
  );
}