import React from 'react';
import { Video } from 'lucide-react';

const Reminders = () => {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col justify-between h-full w-full shadow-sm">
      <div>
        <h3 className="font-bold text-[18px] mb-4 text-gray-900">Reminders</h3>
        <div className="space-y-4">
            <div className="p-1">
                <p className="text-[15px] font-bold text-[#0F4C3A] leading-snug mb-1">Meeting with Arc Company</p>
                <p className="text-[12px] text-gray-500 font-medium tracking-wide">Time: 02.00 pm - 04.00 pm</p>
            </div>
        </div>
      </div>
      
      <button className="flex items-center justify-center gap-2 w-full bg-[#112F24] text-white py-3.5 rounded-[12px] text-[14px] font-semibold mt-auto hover:bg-[#0a1e17] transition-all group">
        <Video size={18} className="group-hover:scale-110 transition-transform" strokeWidth={2.5}/>
        Start Meeting
      </button>
    </div>
  );
};

export default Reminders;
