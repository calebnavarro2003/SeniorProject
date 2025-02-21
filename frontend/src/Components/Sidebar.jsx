import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Sidebar() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/get-user-info', {withCredentials: true})
            .then(response => {
            setUser(response.data)
        })
        .catch(error => {
            console.error("Error fetching user info: ", error)
        })
    }, []);
      
    const handleNavigateHome = () => {
        navigate("/dashboard");
    };

    const handleNavigateModules = () => {
        navigate("/modules");
    };
    
    const handleNavigateSettings = () => {
        navigate("/settings");
    };
    
    const navigate = useNavigate();

    return (
        <div className="bg-purple-700 text-white p-8">
            <div className="flex flex-row pt-4 px-2 gap-8">
                <h2 className="text-3xl font-bold my-auto mr-auto text-wrap">Welcome, <br></br> {user ? user.given_name : "User"}</h2>
                <div class="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 my-auto">
                    {  
                        user ? 
                        <img className="rounded-full" src={user.picture} alt='user profile'/> :
                        <svg class="w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    }
                </div>
            </div>
            
            <ul className='mt-10 text-2xl font-bold'>
                <li className='rounded cursor-pointer hover:bg-purple-600 py-3 px-2'
                    onClick = {handleNavigateHome}>
                    🏠&nbsp;&nbsp;&nbsp;&nbsp;Home
                </li>
                <li className='rounded cursor-pointer hover:bg-purple-600 py-3 px-2'
                    onClick = {handleNavigateModules}>
                    📁&nbsp;&nbsp;&nbsp;&nbsp;Modules
                </li>
                <li className='rounded cursor-pointer hover:bg-purple-600 py-3 px-2'
                    onClick = {handleNavigateSettings}>
                    ⚙️&nbsp;&nbsp;&nbsp;&nbsp;Settings
                </li>
            </ul>
        </div>
  )
}

export default Sidebar