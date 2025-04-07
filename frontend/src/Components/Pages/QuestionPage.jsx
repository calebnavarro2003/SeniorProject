import React, { useEffect } from "react";

const QuestionPage = ({ currentQuestion, base64Image, selectedAnswers, handleAnswerSelect, handlePrevious, handleNext, correctAnswer }) => {
  return (
    <div className="flex flex-col items-center h-full bg-gray-100 p-4 w-full">
      <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
        <div className="flex-grow mb-4 flex justify-center items-center">
          {base64Image && (
            <img
              src={base64Image}
              alt="Question Image"
              className="object-contain h-full w-"
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["A", "B", "C", "D"].map((choice) => (
            <button
              key={choice}
              className={`px-4 py-2 rounded text-xl ${
                selectedAnswers[currentQuestion.question_id] === choice
                  ? "bg-green-700"
                  : correctAnswer === choice
                  ? "bg-red-500"
                  : "bg-green-500"
              } text-white`}
              onClick={() => handleAnswerSelect(currentQuestion.question_id, choice)}
            >
              {choice}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button className="bg-black text-white px-6 py-3 rounded" onClick={handlePrevious}>
            Back
          </button>
          <button className="bg-black text-white px-6 py-3 rounded" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;