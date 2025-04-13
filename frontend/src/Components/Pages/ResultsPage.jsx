import React, { useState, useEffect } from "react";
import { getNudgingMessage, getMedal } from "../../utils/helpers";
import { fetchUserResponsesForModule } from "../../Services/UserService";

const ReviewResultsPage = ({ results, userId, moduleId, handleNavigateToQuestion, reviewingQuestions, userGrade }) => {
  const [grade, setGrade] = useState(0);
  const [submissionResults, setSubmissionResults] = useState(results);
  const [loading, setLoading] = useState(true);

  // Calculate grade and set initial submission results on mount or results change
  useEffect(() => {
    if (results != null && !reviewingQuestions) {
      const correctAnswersCount = results.filter((r) => r.correct).length;
      const grade = Math.round((correctAnswersCount / results.length) * 100);
      setGrade(grade);
      setSubmissionResults(results);
      setLoading(false);
    } else if (reviewingQuestions) {
      fetchUserResponses();
    } else {
      setGrade(userGrade);
      setLoading(false);
    }
  }, [results, reviewingQuestions, userGrade]);

  // Fetch user responses for review mode
  const fetchUserResponses = async () => {
    setLoading(true);
    try {
      const responses = await fetchUserResponsesForModule(userId, moduleId);
      setSubmissionResults(responses);
      const correctAnswersCount = responses.filter((r) => r.correct).length;
      const grade = Math.round((correctAnswersCount / responses.length) * 100);
      setGrade(grade);
      setLoading(false);
    } catch (error) {
      console.error('Error retrieving user responses:', error);
      setLoading(false);
    }
  };

  const message = getNudgingMessage(grade);
  const medalImagePath = getMedal(grade);

  if (loading) {
    return (
      <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
        <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4 w-full">
      <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Module {moduleId} Results</h2>
        {submissionResults.map((result, index) => (
          <div key={result.questionId} className="flex items-center justify-between mb-4">
            <p className="text-lg text-gray-700">
              Question {index + 1}
              {result.correct ? (
                <span className="text-green-500 ml-2">&#10003;</span>
              ) : (
                <span className="text-red-500 ml-2">&#10007;</span>
              )}
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleNavigateToQuestion(index)}>
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

export default ReviewResultsPage;