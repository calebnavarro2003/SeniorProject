import React, { useEffect, useState } from 'react';
import { messages } from '../../constants/WelcomeMessages.js'; // Adjust the import path as necessary

// Utility function to get a random message from an array
const getRandomMessage = (messageArray) => {
  const randomIndex = Math.floor(Math.random() * messageArray.length);
  return messageArray[randomIndex];
};

// Function to determine the current module based on the date
const getCurrentModule = () => { 
  /*
  const currentDate = new Date();

  // Example logic for determining the current module; replace with your actual logic
  if (currentDate >= new Date('2023-01-01') && currentDate < new Date('2023-02-01')) {
    return 'module0';
  } else if (currentDate >= new Date('2023-02-01') && currentDate < new Date('2023-03-01')) {
    return 'module1';
  } else if (currentDate >= new Date('2023-03-01') && currentDate < new Date('2023-04-01')) {
    return 'module2';
  }  
  */
  // Add more conditions for additional modules
  return 'module0'; // Default to module0 if no conditions match
};

export default function Dashboard() {
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('Welcome to LearnOS!');
  const [randomMessage, setRandomMessage] = useState('');

  useEffect(() => {
    // Logic to display the banner on first load
    const moduleKey = getCurrentModule();
    const selectedMessage = getRandomMessage(messages[moduleKey]);
    setRandomMessage(selectedMessage);
    setShowBanner(true);
  }, []);

  const handleBannerClose = () => {
    setShowBanner(false);
  };

  return (
    <div className="flex flex-col px-4 py-4 gap-4 w-full h-full flex-1 bg-gray-100">
      {/* Banner that appears each time a user navigates to the dashboard */}
      {showBanner && (
        <div className="mb-4 w-full bg-purple-600 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <span>{bannerMessage}</span>
          <button onClick={handleBannerClose} className="text-white font-bold">
            X
          </button>
        </div>
      )}

      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:h-64 w-full bg-white rounded-lg shadow gap-4 overflow-hidden">
        <div className="md:w-1/2 w-full flex flex-col justify-center text-3xl px-6 py-4">
          <div className="mb-4">{randomMessage}</div>
        </div>
        <div className="md:w-1/2 md:h-auto h-40 w-full flex justify-center items-center rounded md:pt-4 pb-4">
          <img
            className="object-contain md:w-1/3 max-h-full"
            src="./gold.jpg"
            alt="gold medal reward"
          />
          <img
            className="object-contain md:w-1/3 max-h-full"
            src="./silver.jpg"
            alt="silver medal reward"
          />
          <img
            className="object-contain md:w-1/3 max-h-full"
            src="./bronze.jpg"
            alt="bronze medal reward"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col flex-1 bg-white rounded-lg shadow-md h-full">
        <div className="text-3xl my-8 ml-8">Your current progress</div>
        <div className="w-full h-full px-4 pb-4">
          {/* Add progress map here */}
        </div>
      </div>
    </div>
  );
}