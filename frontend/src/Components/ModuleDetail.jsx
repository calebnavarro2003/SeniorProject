import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Document } from "react-pdf";

export const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
    }

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/questions/module/${moduleId}`, {
        withCredentials: true,
      })
      .then((response) => setModule(response.data))
      .catch((error) => console.error("Error fetching module details!", error));
  }, [moduleId]);


  if (!module) return <div>Loading...</div>;

  const handleNext = () => setShowImage(true);
  const handleNextQuestion = () => {
    setShowImage(false);
    if (currentIndex < module.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const currentQuestion = module[currentIndex];

  const fileAsBase64 = currentQuestion.image


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Module: {moduleId}
      </h1>

      {!showImage ? (
        <div className="p-6 bg-white shadow-md rounded-lg text-center w-full max-w-2xl">
          <p className="text-lg text-gray-700">{currentQuestion.content}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-lg text-center w-full max-w-2xl">

          <div className="grid grid-cols-2 gap-4 mt-4">
            {["A", "B", "C", "D"].map((choice) => (
              <button
                key={choice}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {choice}
              </button>
            ))}
          </div>

          <button
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default ModuleDetail;
