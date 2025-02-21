import Sidebar from "../Sidebar";

export default function Dashboard() {

  return (
    <div className="flex flex-col px-6 py-4 gap-4  w-full bg-gray-100">
      <div className="flex flex-row h-2/5 w-full bg-white rounded shadow gap-4">
        <div className="w-3/5 rounded text-3xl m-auto px-12">Boost your learning - just one short lesson at a time 🚀</div>
        <div className="flex justify-center items-center w-2/5 rounded">
            <img className="max-h-full py-12 w-auto object-contain" src="./gold-medal.png" alt="gold medal reward"/>
        </div>
      </div>
      <div className="flex flex-col h-3/5 bg-white rounded shadow-md">
        <div className="text-3xl my-8 ml-8">Your current progress</div>
        <div className="w-full h-full">
          {/* Add progress map here */}
        </div>
      </div>
    </div>

  );
}
