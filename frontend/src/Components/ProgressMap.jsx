import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllModuleGrades } from '../Services/UserService';

function ProgressMap({ completedModules, modules }) {
    const modulesData = useMemo(() => {
        return modules.map((module) => ({
            id: module.moduleId,
            completed: completedModules.includes(module.moduleId),
        }));
    }, [completedModules, modules]);


    const containerRef = useRef(null);
    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();

    const handleNavigateToModule = (moduleId) => {
        navigate(`/module/${moduleId}`, { state: { id: moduleId } }); // Pass module details as state
    };

    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const containerHeight = containerRef.current.offsetHeight;
            const spacing = containerWidth / (modulesData.length + 1);
            const newPositions = modulesData.map((_, i) => ({
                x: spacing * (i + 1),
                y: Math.random() * (containerHeight * 0.6) + (containerHeight * 0.2),
            }));
            setPositions(newPositions);
        }
    }, [modulesData]);


    const firstIncompleteIndex = modulesData.findIndex(module => !module.completed);

    return (
        <div ref={containerRef} className='relative flex w-full h-full'>
            <svg className='absolute inset-0 w-full h-full'>
                {positions.map((pos, index) =>
                    index < positions.length - 1 ? (
                        <line
                            key={index}
                            x1={positions[index].x}
                            y1={positions[index].y}
                            x2={positions[index + 1].x}
                            y2={positions[index + 1].y}
                            stroke='#aaa'
                            strokeWidth='2'
                        />
                    ) : null
                )}
            </svg>
            {positions.map((pos, index) => {
                const circleStyle = modulesData[index].completed
                    ? { backgroundColor: '#82EBD1' }
                    : { border: '2px solid #4B0082', backgroundColor: 'white' };

                return (
                    <div key={modulesData[index].id}>
                        {index === firstIncompleteIndex && (
                            <div
                                className='absolute text-xs font-semibold text-center w-20 -translate-x-1/2'
                                style={{ left: pos.x - 40, top: pos.y - 40 }}
                            >
                                Start Here
                            </div>
                        )}
                        <button
                            className='flex rounded-full h-12 w-12 items-center justify-center z-10'
                            style={{
                                position: 'absolute',
                                left: pos.x - 24,
                                top: pos.y - 24,
                                ...circleStyle
                            }}
                            onClick={() => handleNavigateToModule(modulesData[index].id)}
                        >
                            {modulesData[index].id}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default ProgressMap;