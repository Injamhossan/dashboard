import React from 'react';
import { Search, Bell, Mail, Command } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-[90px] bg-white sticky  rounded-3xl top-0 z-40 px-8 flex items-center justify-between mx-3 my-2">
      {/* Search Bar */}
      <div className="relative w-[420px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} strokeWidth={2} />
        <input 
          type="text" 
          placeholder="Search task" 
          className="w-full bg-[#f4f5f7] text-gray-900 placeholder-[#9ca3af] border-none rounded-full py-[14px] pl-[44px] pr-[60px] outline-none text-[15px] font-outfit"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#e5e7eb] px-2 py-1 rounded-[6px] text-[12px] font-semibold text-gray-600">
           <Command size={12} strokeWidth={2.5} /> F
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-[14px]">
        <button className="w-[42px] h-[42px] rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#4b5563] hover:bg-gray-50 transition-colors shadow-sm">
            <Mail size={19} strokeWidth={1.5} />
        </button>
        <button className="w-[42px] h-[42px] rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#4b5563] hover:bg-gray-50 transition-colors shadow-sm">
            <Bell size={19} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3 ml-2 cursor-pointer">
          <div className="w-[42px] h-[42px] rounded-full bg-[#f0a6a6] overflow-hidden flex-shrink-0">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" 
              alt="User" 
              className="w-full h-full object-cover scale-110 mt-1"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[15px] font-medium text-black tracking-tight leading-tight">Totok Michael</span>
            <span className="text-[14px] text-gray-400 mt-0.5">tmichael20@mail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
