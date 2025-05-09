import ModuleCarousel from '../ModuleCarousel';
import ProgressCircle from '../ProgressCircle';

export default function Dashboard() {
  // will have to add some call to fetch the modules and their completion rates
  const overallAccuracy = 0.88 
  const sampleModules = [
    { id: 1, title: "Module 1", completionRate: 0.78},
    { id: 2, title: "Module 2", completionRate: 0.78},
    { id: 3, title: "Module 3", completionRate: 0.78},
    { id: 4, title: "Module 4", completionRate: 0.78},
    { id: 5, title: "Module 5", completionRate: 0.78},
    { id: 6, title: "Module 6", completionRate: 0.78},
    { id: 7, title: "Module 7", completionRate: 0.78},
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
          {/* need to add a call for total accuracy across all modules */}
          <ProgressCircle value={overallAccuracy} size={160} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-row-1 h-full overflow-x-auto">
        {/* Pass modules to module carousel component */}
        <ModuleCarousel modules={sampleModules} />
      </div>
    </div>
  );
}