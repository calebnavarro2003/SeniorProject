import React from "react";

const ReviewPage = ({ module, moduleId, selectedAnswers, unansweredCount, handleNavigateToQuestion, handlePreviousQuestion, handleSubmitAnswers }) => (
  <div className="flex flex-col items-center h-full w-full">
    <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Module {moduleId}
      </h2>
      <div className="bg-purple-600 text-white rounded-t-lg px-4 py-2 mb-4 text-center">
        {unansweredCount} Questions Unanswered
      </div>
      {module.map((question, index) => (
        <div key={question.question_id} className="flex items-center justify-between mb-4">
          <p className="text-lg text-gray-700">
            Question {index + 1}
            {selectedAnswers[question.question_id] ? (
              <span className="text-green-500 ml-2">&#10003;</span>
            ) : (
              <span className="text-red-500 ml-2">&#10007;</span>
            )}
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleNavigateToQuestion(index)}>
            Go to Question
          </button>
        </div>
      ))}
      <div className="flex justify-between mt-auto">
        <button className="bg-black text-white px-6 py-3 rounded " onClick={handlePreviousQuestion}>
          Back
        </button>
        <button className="bg-green-500 text-white px-6 py-3 rounded ml-4 ml-auto" onClick={handleSubmitAnswers}>
          Submit
        </button>
      </div>
    </div>
  </div>
);

export default ReviewPage;