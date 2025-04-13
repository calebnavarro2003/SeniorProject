import React from "react";

const QuestionPage = ({
  currentQuestion,
  base64Image,
  selectedAnswers,
  handleAnswerSelect,
  handlePrevious,
  handleNext,
  correctAnswer,
  reviewingQuestions,
  handleReviewModule,
}) => {
  return (
    <div className="flex flex-col items-center h-full w-full">
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
                reviewingQuestions
                  ? selectedAnswers[currentQuestion.question_id] === choice
                    ? "bg-green-700"
                    : correctAnswer === choice
                    ? "bg-green-500"
                    : "bg-red-500"
                  : selectedAnswers[currentQuestion.question_id] === choice
                  ? "bg-green-700"
                  : "bg-green-500"
              } text-white`}
              onClick={() =>
                !reviewingQuestions && handleAnswerSelect(currentQuestion.question_id, choice)
              }
              disabled={reviewingQuestions}
            >
              {choice}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-black text-white px-6 py-3 rounded"
            onClick={handlePrevious}
          >
            Back
          </button>
          {reviewingQuestions && (
            <button
              className="bg-black text-white px-6 py-3 rounded mx-4"
              onClick={handleReviewModule}
            >
              Results Page
            </button>
          )}
          <button
            className="bg-black text-white px-6 py-3 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;