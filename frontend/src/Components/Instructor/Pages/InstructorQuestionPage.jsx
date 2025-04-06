import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressCircle from "../ProgressCircle"

function InstructorQuestionPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const pathArr = location.pathname.split('/')
    const questionId = pathArr[(pathArr.length) - 1]

    // Need API call to get overall accurracy and response % breakdown
    const sampleResponses = [
        {id: "A", responseFraction: 0.78, correct: true},
        {id: "B", responseFraction: 0.10, correct: false},
        {id: "C", responseFraction: 0.12, correct: false},
        {id: "D", responseFraction: 0.0, correct: false},
    ]
    const overallAccurracy = 0.78

    const returnToModule = () => {
        navigate(pathArr.slice(0, -2).join('/'))
    }

  return (
    <div className='flex flex-col items-center h-full bg-gray-100 p-4 w-full'>
        <div className='flex flex-col p-6 bg-white shadow rounded-lg w-full h-full gap-10'>
            <div className='text-3xl'>Question {questionId}</div>
            <div className='flex flex-col justify-center text-2xl gap-4 mx-auto'>
                Overall Accuracy
                <ProgressCircle value={overallAccurracy} size={180}/>
            </div>
            <div className="flex flex-col w-full p-4 gap-2 mt-auto">
                {sampleResponses.map((response) => {
                    return (
                        <div 
                            key={response.id} 
                            className="relative flex flex-row w-full rounded-lg h-12 items-center text-2xl bg-gray-200 overflow-hidden"
                        >
                            <span className="p-4 z-10"
                                style={{
                                    backgroundColor: response.correct ? "rgba(127, 90, 213, 0.8)" : "rgba(127, 90, 213, 0.3)",
                                }}>
                                    {response.id}
                            </span>

                            

                            {/* Background Fill Bar with Left Padding */}
                            <div 
                                className="h-full flex items-center pr-2" 
                                style={{
                                    width: `${Math.max(response.responseFraction * 100, 0)}%`,
                                    backgroundColor: response.correct ? "rgba(127, 90, 213, 0.8)" : "rgba(127, 90, 213, 0.3)",
                                }}
                            >
                            </div>

                            {/* Percentage at the end of the filled bar */}
                            <span className="absolute right-0 flex items-center ml-auto pr-4 text-lg h-full">
                                {Math.round(response.responseFraction * 100)}%
                            </span>
                        </div>
                    );
                })}
            </div>
            <button className='ml-auto mt-auto rounded-lg shadow text-white p-3 bg-purple-600' onClick={() => returnToModule()}>Return to Module</button>
        </div>
    </div>
  )
}

export default InstructorQuestionPage