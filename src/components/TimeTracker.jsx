import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import bgImage from '../assets/image1.jpg';

const TimeTracker = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsActive(false);
    };

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    return (
        <div 
            className="rounded-[24px] p-6 text-white relative overflow-hidden group flex flex-col justify-between h-full w-full"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-[#0F4C3A]/40 mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 shrink-0">
                <p className="text-[15px] font-semibold text-white/90">Time Tracker</p>
            </div>

            <div className="relative z-10 text-center flex flex-col items-center mt-auto mb-auto">
                <h2 className="text-[36px] md:text-[48px] font-bold tracking-tighter mb-4 md:mb-6 font-outfit leading-none">{formatTime(seconds)}</h2>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleTimer}
                        className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center text-[#0F4C3A] hover:scale-110 transition-transform shadow-sm"
                    >
                        {isActive ? (
                            <Pause size={18} fill="currentColor" strokeWidth={0} />
                        ) : (
                            <Play size={18} fill="currentColor" strokeWidth={0} className="ml-1" />
                        )}
                    </button>
                    <button 
                        onClick={resetTimer}
                        className="w-[42px] h-[42px] rounded-full bg-[#ef4444] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                    >
                        <Square size={16} fill="currentColor" strokeWidth={0} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeTracker;
