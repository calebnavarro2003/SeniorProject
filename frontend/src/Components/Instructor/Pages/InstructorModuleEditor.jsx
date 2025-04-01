import React from 'react'

function InstructorModuleEditor() {
    const moduleInfo = {
        title: "Module 0: Computer Hardware Fundamentals",
        description: "Description of module X. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        questions: [
            { id: 1, title: "Question 1", description: "Description of question 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "},
            { id: 2, title: "Question 2", description: "Description of question 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "},
            { id: 3, title: "Question 3", description: "Description of question 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "},
            { id: 4, title: "Question 4", description: "Description of question 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "},
        ],
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
                    <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full gap-4">
                        <h1 className="text-2xl font-semibold">{question.title}</h1>
                        <div className="flex w-full items-end">
                            <span className="flex-1 ">
                                {question.description}
                            </span>
                            <button className="h-6 w-6 ml-auto ">
                                <img src="/trash-button.svg" alt="Edit button" className="h-6 " />
                            </button>
                            <button className="h-6 w-6 ml-2">
                                <img src="/edit-button.svg" alt="Edit button" className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                )
            })
        }
        </div>
        

        <div className='flex flex-row w-full'>
            <button className='mt-auto mr-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition'>Save Module State</button>
            <button className='mt-auto ml-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition'>Add New Question</button>
        </div>
    </div>
  )
}

export default InstructorModuleEditor