import React from 'react'
import ProgressCircle from "../ProgressCircle.jsx"
import { useNavigate, useLocation } from 'react-router-dom';

function ModulePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const sampleQuestions = [
    { id: 1, title: "Question 1"},
    { id: 2, title: "Question 2"},
    { id: 3, title: "Question 3"},
    { id: 4, title: "Question 4"},
    { id: 5, title: "Question 5"},
    { id: 6, title: "Question 6"},
    { id: 7, title: "Question 7"},
  ]

  const handleViewInsights = (questionId) => {
    navigate(`${location.pathname}/question/${questionId}`)
  }

  return (
    <div className="flex flex-col px-4 py-4 gap-4 w-full h-full flex-1 bg-gray-100">
      {/* Top Section */}
      <div className='flex flex-col text-3xl bg-white rounded-lg shadow p-4'>
        Module 0
        <div className="flex flex-col md:flex-row p-4 md:h-64 w-full  gap-4 ">
          <div className="md:w-1/2 md:h-auto h-40 w-full flex flex-col justify-center items-center text-xl gap-2 mb-4 md:mb-0">
            Completion Rate
            {/* need to add a call for completion rate for this specific module */}
            <ProgressCircle value={0.85} size={160} />
          </div>
          <div className="md:w-1/2 md:h-auto h-40 w-full flex flex-col justify-center items-center text-xl gap-2 mb-4 md:mb-0">
            Overall Accuracy
            {/* need to add a call for total accuracy for this specific module */}
            <ProgressCircle value={0.85} size={160} />
          </div>
        </div>
      </div>
      

      {/* Bottom Section */}
      <div className="flex flex-col h-full overflow-y-auto gap-4">
        {
          sampleQuestions.map((question) => {
            return (
              <div className='flex flex-row w-full bg-white rounded-lg shadow p-4 justify-between'>
                <div className='text-2xl'>Question {question.id}</div>
                <ProgressCircle value={0.67} size={80}/>
                <button className='mt-auto hover:underline' onClick={() => handleViewInsights(question.id)}>View Insights &rarr;</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ModulePage