import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function InstructorModuleEditor() {
    const navigate = useNavigate();
    const location = useLocation();
    const modulePath = location.pathname.split('/').slice(0, -1).join('/');

    // Initialize state with either passed data or default temp values (which will be an API call in actuality)
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

    // State to track if title and description are being edited
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [tempTitle, setTempTitle] = useState(moduleInfo.title);
    const [tempDescription, setTempDescription] = useState(moduleInfo.description);

    // Handle save changes for title and description
    const handleSaveTitle = () => {
        setModuleInfo({ ...moduleInfo, title: tempTitle });
        setIsEditingTitle(false);
    };

    const handleSaveDescription = () => {
        setModuleInfo({ ...moduleInfo, description: tempDescription });
        setIsEditingDescription(false);
    };

    const handleSaveModule = () => {
        console.log("Saving module:", moduleInfo);
        // TODO: Add API POST request here then navigate back to /modules
    };

    const handleNewQuestion = () => {
        navigate(modulePath + "/question/new/edit", { state: { moduleInfo } });
    };

    const handleDiscardChanges = () => {
        navigate("/admin/modules");
    };

    const handleEditQuestion = (questionId) => {
        navigate(modulePath + `/question/${questionId}/edit`, { state: { moduleInfo, questionId } });
    };

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

            setModuleInfo({
                ...moduleInfo,
                questions: updatedQuestions
            });
        }
    };

    return (
        <div className="flex flex-col items-center h-full bg-gray-100 p-4 w-full gap-4">
            <div className="flex flex-col h-full w-full gap-4 overflow-auto">
                
                {/* Module Title Section */}
                <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full gap-4">
                    <h1 className="text-2xl font-semibold">Module Title</h1>
                    <div className="flex flex-row w-full items-center">
                        {isEditingTitle ? (
                            <input
                                type="text"
                                value={tempTitle}
                                onChange={(e) => setTempTitle(e.target.value)}
                                className="rounded-lg p-2 flex-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        ) : (
                            <span className="flex-1">{moduleInfo.title}</span>
                        )}
                        <button className="h-6 w-6 ml-2 self-end" onClick={() => isEditingTitle ? handleSaveTitle() : setIsEditingTitle(true)}>
                            <img src={isEditingTitle ? "/check-button.svg" : "/edit-button.svg"} alt={isEditingTitle ? "Save button" : "Edit button"}/>
                        </button>
                    </div>
                </div>

                {/* Module Description Section */}
                <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full gap-4">
                    <h1 className="text-2xl font-semibold">Module Description</h1>
                    <div className="flex w-full items-end">
                        {isEditingDescription ? (
                            <textarea
                                value={tempDescription}
                                onChange={(e) => setTempDescription(e.target.value)}
                                className="rounded-lg p-2 flex-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        ) : (
                            <span className="flex-1">{moduleInfo.description}</span>
                        )}
                        <button className="h-6 w-6 ml-2 self-end" onClick={() => isEditingDescription ? handleSaveDescription() : setIsEditingDescription(true)}>
                            <img src={isEditingDescription ? "/check-button.svg" : "/edit-button.svg"} alt={isEditingDescription ? "Save button" : "Edit button"} />
                        </button>
                    </div>
                </div>

                {/* Questions List */}
                {moduleInfo.questions.map((question) => (
                    <div key={question.id} className="flex flex-col p-6 bg-white shadow rounded-lg w-full gap-4">
                        <h1 className="text-2xl font-semibold">{question.title}</h1>
                        <div className="flex w-full items-end">
                            <span className="flex-1">{question.description}</span>
                            <button className="h-6 w-6 ml-auto" onClick={() => handleDeleteQuestion(question.id)}>
                                <img src="/trash-button.svg" alt="Delete button" className="h-6" />
                            </button>
                            <button className="h-6 w-6 ml-2" onClick={() => handleEditQuestion(question.id)}>
                                <img src="/edit-button.svg" alt="Edit button" className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Buttons */}
            <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
                <button className="mt-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition" onClick={handleSaveModule}>
                    Save Module State
                </button>
                <button className="mt-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition" onClick={handleDiscardChanges}>
                    Discard Changes
                </button>
                <button className="mt-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition" onClick={handleNewQuestion}>
                    Add New Question
                </button>
            </div>
        </div>
    );
}

export default InstructorModuleEditor;
