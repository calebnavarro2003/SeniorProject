import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';


function InstructorModuleEditor() {
    const navigate = useNavigate()
    const location = useLocation()
    const modulePath = location.pathname.split('/').slice(0, -1).join('/')

    // Check for passed state variable from question editor page
    // Need to add API call for fetching question data
    const [moduleInfo, setModuleInfo] = useState(
        location.state?.updatedModuleInfo || {
            title: "Module 0: Computer Hardware Fundamentals",
            description: "Description of module X. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
            questions: [
                { id: 1, title: "Question 1", description: "Description of question 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", type: "multipleChoice", correctAnswer: "B" },
                { id: 2, title: "Question 2", description: "Description of question 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", type: "multipleChoice", correctAnswer: "C"  },
                { id: 3, title: "Question 3", description: "Description of question 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", type: "trueFalse", correctAnswer: "True"  },
                { id: 4, title: "Question 4", description: "Description of question 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", type: "trueFalse", correctAnswer: "False"  },
            ],
        }
    );

    const handleSaveModule = () => {
        console.log("Saving module:", moduleInfo);
        // TODO: Add API POST request here then navigate back to /modules
    };

    const handleNewQuestion = () => {
        navigate(modulePath + "/question/new/edit", {state : { moduleInfo }})
    }

    const handleDiscardChanges = () => {
        navigate("/admin/modules")
    }

    const handleEditQuestion = (questionId) => {
        navigate(modulePath + `/question/${questionId}/edit`, {state : { moduleInfo, questionId }})
    }

    const handleDeleteQuestion = (questionId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");

        if (confirmDelete) {
            const updatedQuestions = moduleInfo.questions
            .filter((question) => question.id !== questionId)
            .map((question, index) => ({
                ...question,
                id: index + 1, // Reassign IDs sequentially
                title: `Question ${index + 1}` // Update title to match new ID
            }));

        // Update the moduleInfo state
        setModuleInfo({
            ...moduleInfo,
            questions: updatedQuestions
        });
        }
        
    }

  return (
    <div className="flex flex-col items-center h-full bg-gray-100 p-4 w-full gap-4">
        <div className='flex flex-col h-full w-full gap-4 overflow-auto'>
        <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full gap-4">
            <h1 className='text-2xl font-semibold'>Module Title</h1>
            <div className='flex flex-row'>
                {moduleInfo.title}
                <button className='h-6 w-6 ml-auto' >
                    <img src='/edit-button.svg' alt='Edit button'></img>
                </button>
            </div>
        </div>

        <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full gap-4">
            <h1 className="text-2xl font-semibold">Module Description</h1>
            <div className="flex w-full items-end">
                <span className="flex-1 ">
                    {moduleInfo.description}
                </span>
                <button className="h-6 w-6 ml-2 self-end">
                    <img src="/edit-button.svg" alt="Edit button" className="h-6 w-6" />
                </button>
            </div>
        </div>

        {
            moduleInfo.questions.map((question) => {
                return (
                    <div key={question.id} className="flex flex-col p-6 bg-white shadow rounded-lg w-full gap-4">
                        <h1 className="text-2xl font-semibold">{question.title}</h1>
                        <div className="flex w-full items-end">
                            <span className="flex-1 ">
                                {question.description}
                            </span>
                            <button className="h-6 w-6 ml-auto " onClick={() => handleDeleteQuestion(question.id)}>
                                <img src="/trash-button.svg" alt="Delete button" className="h-6 " />
                            </button>
                            <button className="h-6 w-6 ml-2" onClick={() => handleEditQuestion(question.id)}>
                                <img src="/edit-button.svg" alt="Edit button" className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                )
            })
        }
        </div>
        

        <div className='flex flex-row w-full justify-between'>
            <button className='mt-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition' onClick={() => handleSaveModule()}>Save Module State</button>
            <button className='mt-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition' onClick={() => handleDiscardChanges()}>Discard Changes</button>
            <button className='mt-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition' onClick={() => handleNewQuestion()}>Add New Question</button>
        </div>
    </div>
  )
}

export default InstructorModuleEditor