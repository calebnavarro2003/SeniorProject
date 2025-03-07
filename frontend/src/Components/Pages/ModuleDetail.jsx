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
    setCurrentIndex(0);
    setShowImage(false); // Starts with content of the first module
  };

  const handleNext = () => {
    if (showImage) {
      // From Qx, go to Cx+1
      setShowImage(false);
      if (currentIndex < module.length - 1) setCurrentIndex(currentIndex + 1);
    } else {
      // From Cx, go to Qx
      setShowImage(true);
    }
  };

  const handleNextQuestion = () => {
    // Ensure we're going to the next content page
    setShowImage(false);
    if (currentIndex < module.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (reviewAnswers) {
      setReviewAnswers(false);
      setCurrentIndex(module.length - 1);
      setShowImage(true);
    } else {
      if (showImage) {
        // From Qx, go to Cx
        setShowImage(false);
      } else {
        // From Cx, go to Cx-1 or back to the module overview if the first content page
        if (currentIndex === 0) {
          setHasStarted(false);
        } else {
          setShowImage(true); // Go to Qx-1
          setCurrentIndex(currentIndex - 1);
        }
      }
    }
  };

  const handleAnswerSelect = (questionId, choice) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice,
    }));
  };

  const handleNavigateToQuestion = (index) => {
    setReviewAnswers(false);
    setCurrentIndex(index);
    setShowImage(true);
  };

  const currentQuestion = module[currentIndex];

  const base64Image = currentQuestion?.image
    ? `data:image/jpeg;base64,${currentQuestion.image}`
    : "";

  const handleReviewAnswers = () => {
    setReviewAnswers(true);
  };

  const reviewPage = () => {
    const unansweredCount = module.filter(
      (question) => !selectedAnswers[question.question_id]
    ).length;

    return (
      //Review Page
      <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
        <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Module {moduleId}: {module.title}</h2>
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
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleNavigateToQuestion(index)}
                >
                  Go to Question
                </button>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                className="bg-purple-600 text-white px-6 py-3 rounded"
                onClick={handlePreviousQuestion}
              >
                Back
              </button>
              <button
                className="bg-green-500 text-white px-6 py-3 rounded"
                onClick={() => console.log("Submit Answers")} // Placeholder for submission logic
              >
                Submit
              </button>
            </div>
          </div>
      </div>
    );
  };

  return (
    //Module Overview Page
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
      {!hasStarted ? (
        <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Module {moduleId}: {module.title}
          </h1>
          <h2 className="text-2xl text-gray-800 mb-6">Textbook sections: Textbook sections</h2>
          <p className="text-lg text-gray-700 overflow-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-auto mt-4 pt-4">
            <div className="flex flex-row items-center gap-2 mr-auto">
              <div className="rounded-full bg-green-300 w-3 h-3"></div>
              {module.length} Questions
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={handleStartModule}>
              Begin Module
            </button>
          </div>
        </div>
      ) : reviewAnswers ? (
        reviewPage()
      ) : (
        <>
          {!showImage ? (
            //Content Page
            <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
              <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
                <div className="flex-grow mb-4 overflow-auto">
                  <p className="text-lg text-gray-700">{currentQuestion.content}</p>
                </div>
                <div className="flex justify-between mt-auto">
                  <button
                    className="bg-black text-white px-6 py-3 rounded"
                    onClick={handlePreviousQuestion}
                  >
                    Back
                  </button>
                  <button className="bg-black text-white px-6 py-3 rounded" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Question page
            <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
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
                          : "bg-green-500"
                      } text-white`}
                      onClick={() => handleAnswerSelect(currentQuestion.question_id, choice)}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-black text-white px-6 py-3 rounded"
                    onClick={handlePreviousQuestion}
                  >
                    Back
                  </button>
                  {currentIndex === module.length - 1 ? (
                    <button
                      className="bg-black text-white px-6 py-3 rounded"
                      onClick={handleReviewAnswers}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="bg-black text-white px-6 py-3 rounded"
                      onClick={handleNextQuestion}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ModuleDetail;