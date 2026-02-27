import React from 'react';

const ProjectProgress = () => {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col h-full w-full">
      <h3 className="font-bold text-[18px] text-gray-900 mb-auto shrink-0">Project Progress</h3>
      
      <div className="relative flex flex-col items-center justify-center flex-1 w-full mt-6">
        <div className="relative w-full max-w-[280px] aspect-[2/1] flex items-end justify-center z-10">
          <svg className="w-full absolute bottom-0 overflow-visible" viewBox="0 0 240 120">
            <defs>
              <pattern id="diagonalHatchProgress" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#ffffff" />
                <line x1="0" y1="0" x2="0" y2="8" stroke="#9ca3af" strokeWidth="1.5" opacity="0.8" />
              </pattern>
            </defs>
            
            {/* Pending Track (hatch) - 100% of half circle */}
            <circle
              cx="120" cy="120" r="90"
              fill="none" stroke="url(#diagonalHatchProgress)" strokeWidth="40"
              strokeDasharray="282.74 565.48"
              transform="rotate(180 120 120)"
              strokeLinecap="round"
            />
            
            {/* In Progress Track (Dark Green) - extends up to 75% of the half circle */}
            <circle
              cx="120" cy="120" r="90"
              fill="none" stroke="#0F4C3A" strokeWidth="40"
              strokeDasharray="212.05 565.48" 
              transform="rotate(180 120 120)"
              strokeLinecap="round"
            />

            {/* Completed Track (Light/Bright Green) - extends to 41% of the half circle */}
            <circle
              cx="120" cy="120" r="90"
              fill="none" stroke="#227d53" strokeWidth="40"
              strokeDasharray="115.92 565.48" 
              transform="rotate(180 120 120)"
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute bottom-0 inset-x-0 flex flex-col items-center translate-y-3 z-20">
            <p className="text-[52px] font-extrabold text-[#111827] mb-0 leading-none tracking-tight">41%</p>
            <p className="text-[13px] text-[#175336] font-semibold mt-2 uppercase tracking-wide">Project Ended</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-16 w-full shrink-0">
            <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-3 md:w-3.5 h-3 md:h-3.5 rounded-full bg-[#175336]"></div>
                <span className="text-[11px] md:text-[12px] font-semibold text-text-gray">Completed</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-3 md:w-3.5 h-3 md:h-3.5 rounded-full bg-[#0F4C3A]"></div>
                <span className="text-[11px] md:text-[12px] font-semibold text-text-gray">In Progress</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-3 md:w-3.5 h-3 md:h-3.5 rounded-full relative overflow-hidden" style={{ background: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 1px, #9ca3af 1px, #9ca3af 2.5px)' }}>
                </div>
                <span className="text-[11px] md:text-[12px] font-semibold text-text-gray">Pending</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
