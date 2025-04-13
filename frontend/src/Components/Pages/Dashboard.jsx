import React, { useEffect, useState } from 'react';
import { messages } from '../../constants/WelcomeMessages';
import { tierMessages } from '../../constants/TierMessages';
import { fetchUserInfo, fetchAllModuleGrades, fetchAllModules } from '../../Services/UserService';
import ProgressMap from '../ProgressMap';

// Function to get a random message from a message array
const getRandomMessage = (messageArray) => {
  const randomIndex = Math.floor(Math.random() * messageArray.length);
  return messageArray[randomIndex];
};

// Function to get the current module based on grades and fetched modules
const getCurrentModule = (grades, modules) => {
  const completedModules = new Set(grades.map(grade => grade.id.moduleId));
  for (const module of modules) {
    if (!completedModules.has(module.moduleId)) {
      return `module${module.moduleId}`;
    }
  }
  return `allDone`;  // If all modules are completed, return an indication that all done
};

// Function to get the list of completed modules based on grades
const getCompletedModules = (grades) => {
  const completedModules = new Set(grades.map(grade => grade.id.moduleId));
  return Array.from(completedModules); // Convert Set to Array for easier usage
};

// Function to calculate medals based on grades
const calculateMedals = (grades) => {
  const medals = { gold: 0, silver: 0, bronze: 0 };
  grades.forEach((grade) => {
    if (grade.percentage >= 90) {
      medals.gold += 1;
    } else if (grade.percentage >= 80) {
      medals.silver += 1;
    } else if (grade.percentage >= 65) {
      medals.bronze += 1;
    }
  });
  return medals;
};

// Function to determine the tier based on grades and medals
const getTier = (grades, medals) => {
  const totalMedals = medals.gold + medals.silver + medals.bronze;
  const totalCompletedModules = grades.length;

  if (totalCompletedModules === 0) {
    return 'tier0';
  } else if (medals.gold >= 5) {
    return 'tier4';
  } else if (medals.gold >= 2 && totalMedals >= 5) {
    return 'tier3';
  } else if (totalMedals >= 3) {
    return 'tier2';
  } else {
    return 'tier1';
  }
};

// Dashboard Component Implementation
export default function Dashboard() {
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState('Welcome to LearnOS!');
  const [randomMessage, setRandomMessage] = useState('');
  const [medals, setMedals] = useState({ gold: 0, silver: 0, bronze: 0 });
  const [completedModules, setCompletedModules] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initialize = async () => {
      try {
        const userInfo = await fetchUserInfo();
        const userEmail = userInfo.email;
        const userId = userInfo.id;

        // Fetch all modules
        const fetchedModules = await fetchAllModules();
        setModules(fetchedModules);

        // Fetch grades
        const grades = await fetchAllModuleGrades(userId);
        const medalCounts = calculateMedals(grades);
        setMedals(medalCounts);

        // Get the current module key for messages
        const moduleKey = getCurrentModule(grades, fetchedModules);
        const selectedModuleMessage = moduleKey === "allDone" ? 
                                      getRandomMessage(messages["allDone"]) : 
                                      getRandomMessage(messages[moduleKey]);
        
        // Get the tier message
        const tier = getTier(grades, medalCounts);
        const selectedTierMessage = getRandomMessage(tierMessages[tier]);

        // Get the list of completed modules
        const completedModules = getCompletedModules(grades);
        setCompletedModules(completedModules);
        
        // Set banner messages
        setBannerMessage(selectedModuleMessage);
        setRandomMessage(selectedTierMessage);

        setShowBanner(true);
        setLoading(false); // Mark loading as false once done
      } catch (error) {
        console.error("Error initializing dashboard:", error);
        setLoading(false); // Mark loading as false on error
      }
    };

    initialize();
  }, []);

  const handleBannerClose = () => {
    setShowBanner(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 py-4 gap-4 w-full h-full flex-1 bg-gray-100">
      {showBanner && (
        <div className=" w-full bg-purple-600 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
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
        <div className="md:w-1/2 mt-9 h-40 w-full flex justify-center items-center pb-4">
          <div className="flex flex-col mx-2 text-center items-center">
            <img
              className="object-contain w-70 h-70"
              src="gold.jpg"
              alt="gold medal reward"
            />
            <div className="text-2xl">{`x${medals.gold}`}</div>
          </div>
          <div className="flex flex-col mx-2 text-center items-center">
            <img
              className="object-contain w-70 h-70"
              src="silver.jpg"
              alt="silver medal reward"
            />
            <div className="text-2xl">{`x${medals.silver}`}</div>
          </div>
          <div className="flex flex-col mx-2 text-center items-center">
            <img
              className="object-contain w-70 h-70"
              src="bronze.jpg"
              alt="bronze medal reward"
            />
            <div className="text-2xl">{`x${medals.bronze}`}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-white rounded-lg shadow-md h-full">
        <div className="text-3xl my-8 ml-8">Your current progress</div>
        <div className="w-full h-full px-4 pb-4">
          <ProgressMap completedModules={completedModules} modules={modules}/>
        </div>
      </div>
    </div>
  );
}