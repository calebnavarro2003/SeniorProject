export default function Dashboard() {
  return (
    <div className="flex flex-col px-4 py-4 gap-4 w-full h-full flex-1 bg-gray-100">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:h-64 w-full bg-white rounded-lg shadow gap-4 overflow-hidden">
        <div className="md:w-3/5 w-full flex items-center text-3xl px-6 py-4">
          Boost your learning - just one short lesson at a time 🚀
        </div>
        <div className="md:w-2/5 md:h-auto h-40 w-full flex justify-center items-center rounded md:pt-4 pb-4">
          <img
            className="object-contain max-w-full max-h-full"
            src="./gold-medal.png"
            alt="gold medal reward"
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
