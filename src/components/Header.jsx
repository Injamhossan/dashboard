import React, { useContext, useState } from 'react';
import { Search, Bell, Mail, Command, User, Menu } from 'lucide-react';
import { AuthContext } from '../providers/AuthProvider';

const Header = ({ setSidebarOpen }) => {
  const { user } = useContext(AuthContext);
  return (
    <header className="h-[70px] md:h-[90px] bg-[#f5f6f8] sticky rounded-3xl top-0 z-40 px-4 md:px-8 flex items-center justify-between shrink-0 shadow-sm border border-gray-100/50">
      
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden mr-2">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100"
        >
           <Menu size={20} />
        </button>
      </div>

      {/* Search Bar - hidden on mobile, visible on medium+ screens */}
      <div className="relative flex-1 lg:w-[420px] lg:flex-none hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} strokeWidth={2} />
        <input 
          type="text" 
          placeholder="Search task" 
          className="w-full bg-white text-gray-900 placeholder-[#9ca3af] border border-gray-100 rounded-full py-[14px] pl-[44px] pr-[60px] outline-none text-[15px] font-outfit shadow-sm"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#f5f6f8] border border-gray-100 px-2 py-1 rounded-[6px] text-[12px] font-semibold text-gray-500">
           <Command size={12} strokeWidth={2.5} /> F
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-[14px] ml-auto">
        <button className="w-9 h-9 md:w-[42px] md:h-[42px] rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#4b5563] hover:bg-gray-50 transition-colors shadow-sm hidden sm:flex">
            <Mail size={19} strokeWidth={1.5} />
        </button>
        <button className="w-9 h-9 md:w-[42px] md:h-[42px] rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#4b5563] hover:bg-gray-50 transition-colors shadow-sm">
            <Bell size={19} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3 ml-2 cursor-pointer">
          <div className="w-9 h-9 md:w-[42px] md:h-[42px] rounded-full bg-indigo-100 overflow-hidden flex-shrink-0 flex items-center justify-center border border-indigo-200">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="User" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text-indigo-400" size={20} strokeWidth={2} />
            )}
          </div>
          <div className="hidden sm:flex flex-col justify-center">
            <span className="text-[14px] md:text-[15px] font-medium text-black tracking-tight leading-tight">
              {user?.displayName || 'User'}
            </span>
            <span className="text-[12px] md:text-[14px] text-gray-400 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
              {user?.email || 'user@example.com'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
