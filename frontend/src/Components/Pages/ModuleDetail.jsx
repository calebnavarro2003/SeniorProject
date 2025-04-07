import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentPage from "./ContentPage";
import ModuleOverview from "./ModuleOverview";
import QuestionPage from "./QuestionPage";
import ReviewPage from "./ReviewPage";
import ReviewResultsPage from "./ResultsPage";
import { fetchUserInfo, fetchUserGrade, fetchModuleAnswers, fetchModuleDetails, submitAnswers } from "../../Services/UserService";

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hasStarted, setHasStarted] = useState(false);
  const [reviewAnswers, setReviewAnswers] = useState(false);
  const [submissionResults, setSubmissionResults] = useState(null);
  const [completionStatus, setCompletionStatus] = useState(false);
  const [userGrade, setUserGrade] = useState(null);
  const [moduleAnswers, setModuleAnswers] = useState(null);
  const [userDetails, setUserDetails] = useState({ userId: null, email: null });
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [reviewingQuestions, setReviewingQuestions] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Requests
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const userInfo = await fetchUserInfo();
        const userEmail = userInfo.email;
        const userId = userInfo.id;
        const moduleData = await fetchModuleDetails(moduleId);
        setModule(moduleData);
        setUserDetails({ userId: userId, email: userEmail });

        const userGrade = await fetchUserGrade(userId, moduleId);
        if (typeof userGrade === "number") {
          setUserGrade(userGrade);
          setCompletionStatus(true);
          setReviewingQuestions(true);
        } else {
          setCompletionStatus(false);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setCompletionStatus(false);
      }
      setLoading(false);
    })();
  }, [moduleId]);

  useEffect(() => {
    if (completionStatus && userDetails.userId) {
      (async () => {
        try {
          const answers = await fetchModuleAnswers(moduleId);
          setModuleAnswers(answers);

          // Set correct answers separately for review
          const correctAns = {};
          answers.forEach(({ questionId, letter }) => {
            correctAns[questionId] = letter;
          });
          setCorrectAnswer(correctAns);
        } catch (error) {
          console.error("Error fetching module answers:", error);
        }
      })();
    }
  }, [completionStatus, userDetails.userId, moduleId]);

  if (loading) return <div>Loading...</div>;

  if (!module) return <div>Loading...</div>;

  const handleStartModule = () => {
    if (!completionStatus) {
      setHasStarted(true);
      setCurrentIndex(0);
      setShowImage(false);
    }
  };

  const handleReviewModule = () => {
    setSubmissionResults(moduleAnswers);
    setReviewAnswers(true);
    setHasStarted(false);
  };

  const handleNext = () => {
    if (showImage) {
      setShowImage(false);
      if (currentIndex < module.length - 1) setCurrentIndex(currentIndex + 1);
    } else {
      setShowImage(true);
    }
  };

  const handleNextQuestion = () => {
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
        setShowImage(false);
      } else {
        if (currentIndex === 0) {
          setHasStarted(false);
        } else {
          setShowImage(true);
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

  // New method for navigation to specific question
  const handleNavigateToQuestion = (index) => {
    setSubmissionResults(null);
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

  const handleSubmitAnswers = async () => {
    if (unansweredCount > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const answers = Object.keys(selectedAnswers).map((questionId) => ({
      questionId: parseInt(questionId),
      letter: selectedAnswers[questionId],
      userId: userDetails.userId,
    }));

    try {
      const results = await submitAnswers(answers);
      setSubmissionResults(results);
      setReviewAnswers(false);
      setHasStarted(false);
      setCompletionStatus(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-full bg-gray-100 p-4 w-full">
      {!hasStarted ? (
        submissionResults ? (
          <ReviewResultsPage
            results={submissionResults}
            userId={userDetails.userId}
            moduleId={moduleId}
            handleNavigateToQuestion={handleNavigateToQuestion}
            reviewingQuestions={reviewingQuestions}
            userGrade={userGrade}
          />
        ) : (
          <ModuleOverview
            module={module}
            startModule={handleStartModule}
            reviewModule={completionStatus ? handleReviewModule : null}
            completionStatus={completionStatus}
            grade={userGrade}
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
              correctAnswer={correctAnswer && correctAnswer[currentQuestion.question_id]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ModuleDetail;