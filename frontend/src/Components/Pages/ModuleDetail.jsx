import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { nudgingMessages } from "../../constants/NudgingMessages";  // Import nudging messages

// Assuming backend endpoint is hosted on localhost:8080
const BASE_URL = "http://localhost:8080";

// Function to get a random nudging message based on the grade
const getNudgingMessage = (grade) => {
  let messageCategory;
  if (grade >= 90) {
    messageCategory = nudgingMessages.gold;
  } else if (grade >= 80) {
    messageCategory = nudgingMessages.silver;
  } else if (grade >= 65) {
    messageCategory = nudgingMessages.bronze;
  } else {
    messageCategory = nudgingMessages.noMedal;
  }

  // Get a random message from the chosen category
  return messageCategory[Math.floor(Math.random() * messageCategory.length)];
};

const getMedal = (grade) => {
  if (grade >= 90) {
    return "/gold.jpg";
  } else if (grade >= 80) {
    return "/silver.jpg";
  } else if (grade >= 65) {
    return "/bronze.jpg";
  } else {
    return null;
  }
};

const ModuleOverview = ({ module, startModule }) => {
  //Fetch for Module Info for overview page
  const location = useLocation();
  const {title, description, id} = location.state || {}; //Extract state variables from Module Page info

  return (
    <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Module {id}: {title}
      </h1>
      <p className="text-lg text-gray-700 overflow-auto">
        {description}
      </p>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-auto mt-4 pt-4">
        <div className="flex flex-row items-center gap-2 mr-auto">
          <div className="rounded-full bg-green-300 w-3 h-3"></div>
          {module.length} Questions
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={startModule}>
          Begin Module
        </button>
      </div>
    </div>
  )
};

const ReviewResultsPage = ({ results, moduleId, handleNavigateToQuestion }) => {
  const grade = Math.round((results.filter((r) => r.correct).length / results.length) * 100);
  const message = getNudgingMessage(grade);
  const medalImagePath = getMedal(grade);

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
      <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Module {moduleId} Results</h2>
        {results.map((result, index) => (
          <div key={result.questionId} className="flex items-center justify-between mb-4">
            <p className="text-lg text-gray-700">
              Question {index + 1}
              {result.correct ? (
                <span className="text-green-500 ml-2">&#10003;</span>
              ) : (
                <span className="text-red-500 ml-2">&#10007;</span>
              )}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleNavigateToQuestion(result.questionId)}
            >
              Review Question
            </button>
          </div>
        ))}
        <div className="mt-auto text-center text-2xl">
          Grade: {grade}%
        </div>
        {medalImagePath && (
          <div className="mt-2 mb-4">
            <img src={medalImagePath} alt="Medal" className="mx-auto" style={{ width: '275px', height: 'auto' }} />
          </div>
        )}
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 text-lg rounded-lg">
          {message}
        </div>
      </div>
    </div>
  );
};

const ReviewPage = ({
  module,
  selectedAnswers,
  unansweredCount,
  handleNavigateToQuestion,
  handlePreviousQuestion,
  handleSubmitAnswers,
}) => (
  <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
    <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Module {module.moduleId}: {module.title}
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
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleNavigateToQuestion(index)}
          >
            Go to Question
          </button>
        </div>
      ))}
      <div className="flex mt-auto">
        <button
          className="bg-black text-white px-6 py-3 rounded "
          onClick={handlePreviousQuestion}
        >
          Back
        </button>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded ml-4 ml-auto"
          onClick={handleSubmitAnswers}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
);

const ContentPage = ({ currentQuestion, handlePrevious, handleNext }) => (
  <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
    <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
      <div className="flex-grow mb-4 overflow-auto">
        <p className="text-lg text-gray-700">{currentQuestion.content}</p>
      </div>
      <div className="flex justify-between mt-auto">
        <button
          className="bg-black text-white px-6 py-3 rounded"
          onClick={handlePrevious}
        >
          Back
        </button>
        <button className="bg-black text-white px-6 py-3 rounded" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  </div>
);

const QuestionPage = ({
  currentQuestion,
  base64Image,
  selectedAnswers,
  handleAnswerSelect,
  handlePrevious,
  handleNext
}) => (
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
          onClick={handlePrevious}
        >
          Back
        </button>
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

const ModuleDetail = () => {
  const { moduleId, userId } = useParams();
  const [module, setModule] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hasStarted, setHasStarted] = useState(false);
  const [reviewAnswers, setReviewAnswers] = useState(false);
  const [submissionResults, setSubmissionResults] = useState(null);
  const [completionStatus, setCompletionStatus] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // State to store user email
  const [userDetails, setUserDetails] = useState({ userId: null, email: null }); // State to store user ID and email
  
  //Fetch Requests
  {
  // Fetch user email
  useEffect(() => {
    axios
      .get(`${BASE_URL}/get-user-info`, { withCredentials: true })
      .then(response => setUserEmail(response.data.email))
      .catch(error => console.error("Error fetching user info!", error));
  }, []);
  
  // Fetch user ID using email
  useEffect(() => {
    if (userEmail) {
      const encodedEmail = encodeURIComponent(userEmail);
      axios
        .get(`${BASE_URL}/${encodedEmail}/id`, { withCredentials: true })
        .then(response => setUserDetails({ userId: response.data, email: userEmail }))
        .catch(error => console.error("Error fetching user ID!", error));
    }
  }, [userEmail]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/questions/module/${moduleId}`, { withCredentials: true })
      .then(response => setModule(response.data))
      .catch(error => console.error("Error fetching module details!", error));

    //Placeholder for a fetch request to check if a user has taken this module yet.
    if (userDetails.userId) {
    
    }
  }, [moduleId, userDetails.userId]);

  if (!module) return <div>Loading...</div>;
  }

  const handleStartModule = () => {
    if (!completionStatus) {
      setHasStarted(true);
      setCurrentIndex(0);
      setShowImage(false); // Starts with content of the first module
    }
  };

  const handleReviewModule = () => {
    setReviewAnswers(true);
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
  const base64Image = currentQuestion?.image ? `data:image/jpeg;base64,${currentQuestion.image}` : "";

  const handleReviewAnswers = () => {
    setReviewAnswers(true);
  };

  const unansweredCount = module.filter((question) => !selectedAnswers[question.question_id]).length;
  
  const handleSubmitAnswers = () => {
    if (unansweredCount > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const answers = Object.keys(selectedAnswers).map((questionId) => ({
      questionId: parseInt(questionId),
      letter: selectedAnswers[questionId],
      userId: userDetails.userId
    }));

    axios
      .post(`${BASE_URL}/answers/grade`, answers, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setSubmissionResults(response.data); // Save the results to state
        setReviewAnswers(false);
        setHasStarted(false); // Navigate user once answers are submitted
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
      });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
      {!hasStarted ? (
        submissionResults ? (
          <ReviewResultsPage
            results={submissionResults}
            moduleId={moduleId}
            handleNavigateToQuestion={handleNavigateToQuestion}
          />
        ) : (
          <ModuleOverview
            module={module}
            startModule={handleStartModule}
            reviewModule={handleReviewModule}
            completionStatus={completionStatus}
            userId={userId}
          />
        )
      ) : reviewAnswers ? (
        <ReviewPage
          module={module}
          selectedAnswers={selectedAnswers}
          unansweredCount={unansweredCount}
          handleNavigateToQuestion={handleNavigateToQuestion}
          handlePreviousQuestion={handlePreviousQuestion}
          handleSubmitAnswers={handleSubmitAnswers}
        />
      ) : (
        <>
          {!showImage ? (
            <ContentPage
              currentQuestion={currentQuestion}
              handlePrevious={handlePreviousQuestion}
              handleNext={handleNext}
            />
          ) : (
            <QuestionPage
              currentQuestion={currentQuestion}
              base64Image={base64Image}
              selectedAnswers={selectedAnswers}
              handleAnswerSelect={handleAnswerSelect}
              handlePrevious={handlePreviousQuestion}
              handleNext={currentIndex === module.length - 1 ? handleReviewAnswers : handleNextQuestion}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ModuleDetail;