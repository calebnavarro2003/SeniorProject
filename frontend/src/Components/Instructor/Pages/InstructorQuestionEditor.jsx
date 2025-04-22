import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function InstructorQuestionEditor() {
    const navigate = useNavigate()
    const location = useLocation()
    const modulePath = location.pathname.split('/').slice(0, -3).join('/')

    const moduleInfo = location.state?.moduleInfo || {}
    const id = location.state?.questionId || moduleInfo.questions?.length + 1
    const currentQuestion = moduleInfo?.questions.find((question) => question.id === id);

    const [description, setDescription] = useState(currentQuestion?.description || "");
    const [questionType, setQuestionType] = useState(currentQuestion?.type || null); // 'trueFalse' or 'multipleChoice'
    const [correctAnswer, setCorrectAnswer] = useState(currentQuestion?.correctAnswer || null);
    const [image, setImage] = useState(currentQuestion?.image || null)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const question = {
            id: id,
            title: `Question ${id}`,
            description: description,
            type: questionType,
            correctAnswer: correctAnswer,
            image: image
        }

        let updatedQuestions;

        if (location.state?.questionId) {
            // Editing an existing question
            updatedQuestions = moduleInfo.questions.map(q =>
                q.id === location.state.questionId ? { ...q, ...question } : q
            );
        } else {
            // Adding a new question
            updatedQuestions = [...moduleInfo.questions, question];
        }

        const updatedModuleInfo = {
            ...moduleInfo,
            questions: updatedQuestions
        };

        navigate(modulePath + "/edit", {state: { updatedModuleInfo }} )
    };

    // helper to convert File → base64 string (no prefix)
    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });

    const handleDiscardQuestion = () => {
        const updatedModuleInfo = moduleInfo

        navigate(modulePath + "/edit", {state: { updatedModuleInfo }} )
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
          try {
            const b64 = await fileToBase64(file);
            setImage(b64);
          } catch (err) {
            console.error("Failed to convert image to base64", err);
          }
        }
      };

  return (
    <div className="flex flex-col items-center h-full bg-gray-100 p-4 w-full">
        <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full gap-6">
            <h1 className='text-3xl font-semibold'>Question {id}</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full h-full">
                    {/* Question Content Input */}
                    <div className="flex flex-col">
                        <label className="text-lg ">Question Content</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-64"
                            placeholder="Enter question content"
                            required
                        ></textarea>
                    </div>

                    {/* Image Upload Section */}
                    <div className="flex flex-col md:flex-row w-full gap-4 md:items-center">
                        <h2 className="text-lg">Upload Module Image</h2>
                        <label >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className=""
                            />
                        </label>
                    </div>

                    {/* Select Question Type */}
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-lg transition ${
                                questionType === 'trueFalse' ? 'bg-purple-600 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => {
                                setQuestionType('trueFalse');
                                setCorrectAnswer(null);
                            }}
                        >
                            True or False
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-lg transition ${
                                questionType === 'multipleChoice' ? 'bg-purple-600 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => {
                                setQuestionType('multipleChoice');
                                setCorrectAnswer(null);
                            }}
                        >
                            Multiple Choice
                        </button>
                    </div>
                    
                    {/* Display Possible Question Answers */}
                    <div className="flex flex-row flex-wrap gap-4 w-full">
                        {
                            questionType && (questionType === 'trueFalse'
                                ? ['True', 'False']
                                : ['A', 'B', 'C', 'D']
                                ).map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        className={`px-4 py-2 rounded-lg transition w-24 ${
                                            correctAnswer === option ? 'bg-purple-600 text-white' : 'bg-gray-200'
                                        }`}
                                        onClick={() => setCorrectAnswer(option)}
                                    >
                                        {option}
                                    </button>
                                )
                            )
                        }
                    </div>

                    {/* Buttons*/}
                    <div className="flex flex-col md:flex-row w-full mt-auto gap-4">
                        <button
                            type="button"
                            className="mt-auto md:mr-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                            onClick={() => handleDiscardQuestion()}
                        >
                            {currentQuestion ? "Discard Changes" : "Discard Question"}
                        </button>
                        <button
                            type="submit"
                            className="mt-auto md:ml-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                        >
                            {currentQuestion ? "Update Question" : "Create Question"}
                        </button>
                    </div>
                </form>
        </div>
    </div>
  )
}

export default InstructorQuestionEditor