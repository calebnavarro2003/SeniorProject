import React from 'react'
import ProgressCircle from "../ProgressCircle.jsx"
import { useNavigate, useLocation } from 'react-router-dom';

function ModulePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const moduleId = location.pathname.split('/')[location.pathname.split('/').length - 1]
  const moduleTitle = location.state?.title

  // Need to add API call to fetch module data (module overall accuracy, completion rate, questions)
  const completionRate = 0.73
  const totalAccurracy = 0.85
  const sampleQuestions = [
    { id: 1, title: "Question 1", accuracy: 0.67},
    { id: 2, title: "Question 2", accuracy: 0.67},
    { id: 3, title: "Question 3", accuracy: 0.67},
    { id: 4, title: "Question 4", accuracy: 0.67},
    { id: 5, title: "Question 5", accuracy: 0.67},
    { id: 6, title: "Question 6", accuracy: 0.67},
    { id: 7, title: "Question 7", accuracy: 0.67},
  ]

  const handleViewInsights = (questionId) => {
    navigate(`${location.pathname}/question/${questionId}`)
  }

  const handleEditModule = (moduleId) => {
    navigate(`/admin/module/${moduleId}/edit`)
  }

  return (
    <div className="flex flex-col px-4 py-4 gap-4 w-full h-full flex-1 bg-gray-100">
      {/* Top Section */}
      <div className='flex flex-col text-3xl bg-white rounded-lg shadow p-4'>
        <h1 className='text-3xl font-semibold text-center md:text-left'>{`Module ${moduleId}: ${moduleTitle}`}</h1>
        <div className="flex flex-col md:flex-row p-4 md:h-64 w-full  gap-4 ">
          <div className="md:w-1/2 md:h-auto h-40 w-full flex flex-col justify-center items-center text-xl gap-2 mb-4 md:mb-0">
            Completion Rate
            <ProgressCircle value={completionRate} size={160} />
          </div>
          <div className="md:w-1/2 md:h-auto h-40 w-full flex flex-col justify-center items-center text-xl gap-2 mb-4 md:mb-0">
            Overall Accuracy
            <ProgressCircle value={totalAccurracy} size={160} />
          </div>
        </div>
        <button className='text-lg ml-auto mt-auto rounded-lg shadow text-white p-3 bg-purple-600 hover:bg-purple-700' onClick={() => handleEditModule(moduleId)}>Edit Module</button>
      </div>
      

      {/* Bottom Section */}
      <div className="flex flex-col h-full overflow-y-auto gap-4">
        {
          sampleQuestions.map((question) => {
            return (
              <div key={question.id} className='flex flex-row w-full bg-white rounded-lg shadow p-4 justify-between'>
                <div className='text-2xl'>Question {question.id}</div>
                <ProgressCircle value={question.accuracy} size={80}/>
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