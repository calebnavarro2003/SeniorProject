import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchModuleInfo, fetchModuleDetails, updateModule, fetchModuleAnswers } from "../../../Services/UserService";

function InstructorModuleEditor() {
    const navigate = useNavigate();
    const location = useLocation();
    const modulePath = location.pathname.split('/').slice(0, -1).join('/');
    const moduleId = location.pathname.split('/')[location.pathname.split('/').length - 2];

    // State to track if title and description are being edited
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [tempTitle, setTempTitle] = useState("");
    const [tempDescription, setTempDescription] = useState("");

    // Initialize state with either passed data or default temp values (which will be an API call in actuality)
    const [moduleInfo, setModuleInfo] = useState(
        location.state?.updatedModuleInfo ?? null
    );


    // Call for setting module information
    useEffect(() => {
        if (moduleInfo) {
            setTempTitle(moduleInfo.title);
            setTempDescription(moduleInfo.description);
            return;
          }
        const fetchData = async () => {
            try {
                if (!location.state?.updatedModuleInfo) {
                    const modInfo      = await fetchModuleInfo(moduleId)
                    const modQuestions = await fetchModuleDetails(moduleId)
                    const modAnswers   = await fetchModuleAnswers(moduleId)
                    
                    // build a map from questionId → user’s letter answer
                    const answerMap = new Map(modAnswers.map(a => [ a.questionId, a.letter ]))
                    console.log(modQuestions);
                    
                    // build your questions array
                    const questions = modQuestions.map((q, idx) => {
                      // grab the numeric id field (adjust property name as needed)
                      const id = q.questionId ?? q.id
                    
                      return {
                        id,
                        title:       `Question ${idx + 1}`,
                        description: q.content,        // or q.questionContent if that’s your field
                        type:        "multipleChoice",
                        image: q.image,
                        correctAnswer: answerMap.get(id) ?? null
                      }
                    })
                    
                    // finally assemble your moduleInfo object
                    const moduleInfo = {
                      title:       modInfo.title,
                      description: modInfo.description,
                      questions
                    }
                    
                    // e.g. store in state:
                    setModuleInfo(moduleInfo)
                }

            } catch (err) {
                console.error("Failed to fetch module details", err);
            }
        }
        fetchData();
      }, [moduleId, moduleInfo]);

    // Handle save changes for title and description
    const handleSaveTitle = () => {
        setModuleInfo({ ...moduleInfo, title: tempTitle });
        setIsEditingTitle(false);
    };

    const handleSaveDescription = () => {
        setModuleInfo({ ...moduleInfo, description: tempDescription });
        setIsEditingDescription(false);
    };

    const handleSaveModule = async () => {
        console.log(moduleInfo);
        try {
          // call the updateModule API with the current moduleInfo
          await updateModule({
            id: parseInt(moduleId, 10),
            title: moduleInfo.title,
            description: moduleInfo.description,
            questions: moduleInfo.questions.map(q => ({
              questionId: q.id,
              title: q.title,
              description: q.description,
              type: q.type,
              image: q.image,
              correctAnswer: q.correctAnswer
            }))
          });
          // navigate back to the modules list
          navigate("/admin/modules");
        } catch (err) {
          console.error("Failed to save module:", err);
          // optionally show an error message to the user here
        }
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

    if(!moduleInfo) return <p>Loading...</p>;
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
