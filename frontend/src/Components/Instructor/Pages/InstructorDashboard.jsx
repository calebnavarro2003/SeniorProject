import ModuleCarousel from '../ModuleCarousel';
import ProgressCircle from '../ProgressCircle';
import { useEffect, useState } from 'react';
import { fetchModuleSummary } from "../../../Services/UserService";

export default function Dashboard() {
  const [modules, setModules] = useState(null);
  const [overallAccuracy, setOverallAccuracy] = useState(null);

  // Calls for getting the module data and numbers on the dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaries = await fetchModuleSummary();
        setModules(summaries.modules);
        setOverallAccuracy(summaries.overallAccuracy);

      } catch (err) {
        console.error("Failed to fetch module summary", err);
      }
    };
    fetchData();
  }, []);

  if (!modules || !overallAccuracy) return <div>Loading...</div>;

  return (
    <div className="flex flex-col px-4 py-4 gap-4 w-full h-full flex-1 bg-gray-100">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row p-4 md:h-64 w-full bg-white rounded-lg shadow gap-4 ">
        <div className="md:w-3/5 w-full flex items-center text-3xl px-6 py-4">
          Take a peak at how your students are performing
        </div>
        <div className="md:w-2/5 md:h-auto h-40 w-full flex flex-col justify-center items-center text-xl gap-2 mb-4 md:mb-0">
          Overall Accuracy
          {/* need to add a call for total accuracy across all modules */}
          <ProgressCircle value={overallAccuracy} size={160} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-row-1 h-full overflow-x-auto">
        {/* Pass modules to module carousel component */}
        <ModuleCarousel modules={modules} />
      </div>
    </div>
  );
}