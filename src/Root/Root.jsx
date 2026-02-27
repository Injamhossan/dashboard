import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Root = () => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-[280px] flex flex-col min-w-0 h-full gap-3 py-3 pr-3">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#f5f6f8] rounded-3xl shadow-sm border border-gray-100/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;