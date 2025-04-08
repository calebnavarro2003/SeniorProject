import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function ProgressMap() {
    // Add fetch call to get modules info
    const modules = useMemo(() => [
        { id: 0, completed: true },
        { id: 1, completed: true },
        { id: 2, completed: false },
        { id: 3, completed: false },
        { id: 4, completed: false },
        { id: 5, completed: false },
        { id: 7, completed: false },
    ], []);

    const containerRef = useRef(null);
    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();

    const handleNavigateToModule = (moduleId, moduleTitle, moduleDescription) => {
        navigate(`/module/${moduleId}`, { state: { title: moduleTitle, description: moduleDescription, id: moduleId } }); // Pass module details as state
    };

    useEffect(() => {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const spacing = containerWidth / (modules.length + 1);
        const newPositions = modules.map((_, i) => ({
            x: spacing * (i + 1),
            y: Math.random() * (containerHeight * 0.6) + (containerHeight * 0.2),
        }));
        setPositions(newPositions);
    }, [modules]);

    const firstIncompleteIndex = modules.findIndex(module => !module.completed);

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
                const circleStyle = modules[index].completed
                    ? { backgroundColor: '#82EBD1' }
                    : { border: '2px solid #4B0082', backgroundColor: 'white' };

                return (
                    <div key={modules[index].id}>
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
                            onClick={() => handleNavigateToModule(modules[index].id)}
                        >
                            {modules[index].id}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default ProgressMap;