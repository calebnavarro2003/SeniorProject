import React from "react";

const ContentPage = ({ currentQuestion, handlePrevious, handleNext, reviewingQuestions, handleReviewModule }) => (
  <div className="flex flex-col items-center h-full w-full">
    <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
      <div className="flex-grow mb-4 overflow-auto">
        <p className="text-lg text-gray-700">{currentQuestion.content}</p>
      </div>
      <div className="flex justify-between mt-auto">
        <button className="bg-black text-white px-6 py-3 rounded" onClick={handlePrevious}>
          Back
        </button>
        {reviewingQuestions && (
            <button className="bg-black text-white px-6 py-3 rounded mx-4" onClick={handleReviewModule}>
              Results Page
            </button>
          )}
        <button className="bg-black text-white px-6 py-3 rounded" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  </div>
);

export default ContentPage;