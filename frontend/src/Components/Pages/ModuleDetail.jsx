import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hasStarted, setHasStarted] = useState(false);
  const [reviewAnswers, setReviewAnswers] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/questions/module/${moduleId}`, {
        withCredentials: true,
      })
      .then((response) => setModule(response.data))
      .catch((error) => console.error("Error fetching module details!", error));
  }, [moduleId]);

  if (!module) return <div>Loading...</div>;

  const handleStartModule = () => {
    setHasStarted(true);
  };

  const handleNext = () => setShowImage(true);
  const handleNextQuestion = () => {
    setShowImage(false);
    if (currentIndex < module.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (showImage) {
      setShowImage(false);
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setShowImage(true);
      }
    }
  };

  const handleBackToOverview = () => {
    setReviewAnswers(false);
    setHasStarted(false);
  };

  const handleAnswerSelect = (questionId, choice) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice,
    }));
  };

  const currentQuestion = module[currentIndex];

  // Convert byte data to base64 string for the image
  const base64Image = currentQuestion?.image
    ? `data:image/jpeg;base64,${currentQuestion.image}`
    : "";

  const handleReviewAnswers = () => {
    setReviewAnswers(true);
  };

  const reviewPage = () => {
    return (
      <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Review Your Answers</h1>
        {module.map((question) => (
          <div key={question.question_id} className="mb-4">
            <p className="text-lg text-gray-700">Question {question.question_id}</p>
            <p className="text-lg text-gray-500">
              Your answer: {selectedAnswers[question.question_id] || "No answer"}
            </p>
          </div>
        ))}
        <div className="flex justify-between mt-auto pt-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded"
            onClick={handleBackToOverview}
          >
            Back to Module Overview
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded"
            
          >
            Submit Answers
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center h-full bg-gray-100 p-4 w-full">
      {!hasStarted ? (
        <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Module {moduleId}: {module.title} Module Title
          </h1>
          <h2 className="text-2xl text-gray-800 mb-6">Textbook sections: Textbook sections</h2>
          <p className="text-lg text-gray-700 overflow-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-auto mt-4 pt-4">
            <div className="flex flex-row items-center gap-2 mr-auto">
              <div className="rounded-full bg-green-300 w-3 h-3"></div>
              {module.length} Questions
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded"
              onClick={handleStartModule}
            >
              Begin Module
            </button>
          </div>
        </div>
      ) : reviewAnswers ? (
        // Show review answers page
        reviewPage() 
      ) : (
        <>
          {!showImage ? (
            // Content page
            <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
              <p className="text-lg text-gray-700">{currentQuestion.content}</p>
              <div className="flex justify-between mt-auto pt-4">
                {currentIndex === 0 ? (
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                    onClick={handleBackToOverview}
                  >
                    Back to Module Overview
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                    onClick={handlePreviousQuestion}
                    disabled={currentIndex === 0 && !showImage}
                  >
                    Back
                  </button>
                )}

                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            // Question page
            <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
              <img src={base64Image} alt="Question" className="mb-4" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                {["A", "B", "C", "D"].map((choice) => (
                  <button
                    key={choice}
                    className={`px-4 py-2 rounded ${
                      selectedAnswers[currentQuestion.question_id] === choice
                        ? "bg-green-700"
                        : "bg-green-500"
                    } text-white`}
                    onClick={() => handleAnswerSelect(currentQuestion.question_id, choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-auto pt-4">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded"
                  onClick={handlePreviousQuestion}
                  disabled={currentIndex === 0 && !showImage}
                >
                  Back
                </button>
                {currentIndex === module.length - 1 ? (
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                    onClick={handleReviewAnswers}
                  >
                    Review Answers
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded"
                    onClick={handleNextQuestion}
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ModuleDetail;
