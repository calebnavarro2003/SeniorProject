import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/questions/module/${moduleId}`, {
        withCredentials: true,
      })
      .then((response) => setModule(response.data))
      .catch((error) => console.error("Error fetching module details!", error));
  }, [moduleId]);

  if (!module) return <div>Loading...</div>;

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

  const handleAnswerSelect = (questionId, choice) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice,
    }));
  };

  const currentQuestion = module[currentIndex];

  // Convert byte data to base64 string
  const base64Image = `data:image/jpeg;base64,${currentQuestion.image}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Module: {moduleId}
      </h1>

      {!showImage ? (
        <div className="p-6 bg-white shadow-md rounded-lg text-center w-full max-w-2xl">
          <p className="text-lg text-gray-700">{currentQuestion.content}</p>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded"
              onClick={handlePreviousQuestion}
              disabled={currentIndex === 0 && !showImage}
            >
              Back
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-lg text-center w-full max-w-2xl">
          <img src={base64Image} alt="Question" className="mb-4" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {["A", "B", "C", "D"].map((choice) => (
              <button
                key={choice}
                className={`px-4 py-2 rounded ${
                  selectedAnswers[currentQuestion.questionId] === choice
                    ? "bg-green-700"
                    : "bg-green-500"
                } text-white`}
                onClick={() => handleAnswerSelect(currentQuestion.questionId, choice)}
              >
                {choice}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded"
              onClick={handlePreviousQuestion}
              disabled={currentIndex === 0 && !showImage}
            >
              Back
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleDetail;