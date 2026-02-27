import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Root = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden relative w-full">
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out z-50 p-3 lg:pr-0 shrink-0`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Content Area adjusts its margin based on screen size */}
      <div className="flex-1 flex flex-col min-w-0 h-full gap-3 py-3 px-3 lg:pl-3 w-full">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto bg-[#f5f6f8] rounded-3xl shadow-sm border border-gray-100/50 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;