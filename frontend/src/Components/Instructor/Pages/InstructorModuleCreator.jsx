import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createModule } from "../../../Services/UserService";


export default function CreateModule() {
    const location = useLocation()
    const navigate = useNavigate()

    const [moduleId, setModuleId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await createModule({
            moduleId,           
            title,
            description
          });
          navigate("/admin/modules");
        } catch (err) {
          console.error("Error creating module:", err);
        }
      };

    return (
        <div className="flex flex-col items-center h-full bg-gray-100 p-4 w-full">
            <div className="flex flex-col p-6 bg-white shadow rounded-lg w-full h-full gap-6">
                <h2 className="text-2xl font-bold text-gray-800">Create New Module</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
                    {/* Module ID Input */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">Module ID</label>
                        <input
                            type="text"
                            value={moduleId}
                            onChange={(e) => setModuleId(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter module ID"
                            required
                        />
                    </div>
                    
                    {/* Module Title Input */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">Module Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter module title"
                            required
                        />
                    </div>

                    {/* Module Description Input */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">Module Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-64"
                            placeholder="Enter module description"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-auto bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                    >
                        Create Module
                    </button>
                </form>
            </div>
        </div>
    );
}
