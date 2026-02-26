import React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import bgImage from '../assets/image1.jpg';

const TimeTracker = () => {
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
                <h2 className="text-[48px] font-bold tracking-tighter mb-6 font-outfit leading-none">01:24:08</h2>
                <div className="flex items-center gap-4">
                    <button className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center text-[#0F4C3A] hover:scale-110 transition-transform shadow-sm">
                        <Pause size={18} fill="currentColor" strokeWidth={0} />
                    </button>
                    <button className="w-[42px] h-[42px] rounded-full bg-[#ef4444] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm">
                        <Square size={16} fill="currentColor" strokeWidth={0} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeTracker;
