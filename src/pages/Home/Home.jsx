import React from 'react';
import { Plus, Download } from 'lucide-react';
import DashboardStats from '../../components/DashboardStats';
import AnalyticsChart from '../../components/AnalyticsChart';
import Reminders from '../../components/Reminders';
import TeamCollaboration from '../../components/TeamCollaboration';
import ProjectProgress from '../../components/ProjectProgress';
import ProjectList from '../../components/ProjectList';
import TimeTracker from '../../components/TimeTracker';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-8 pt-3 pb-12 flex flex-col gap-6"
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-text-dark font-outfit mb-1 leading-tight tracking-tight">Dashboard</h1>
          <p className="text-[#9ca3af] font-medium text-[14px]">Plan, prioritize, and accomplish your tasks with ease.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#175336] text-white px-5 py-2.5 rounded-full text-[14px] font-semibold hover:bg-[#0F4C3A] transition-colors shadow-sm">
            <Plus size={18} strokeWidth={2.5} /> Add Project
          </button>
          <button className="flex items-center gap-2 border-2 border-gray-200 text-[#4b5563] px-5 py-2.5 rounded-full text-[14px] font-semibold hover:bg-gray-50 transition-colors">
            Import Data
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <motion.div variants={itemVariants}>
        <DashboardStats />
      </motion.div>

      {/* 4-Column Masonry-Style Grid for perfect vertical stacking */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full items-stretch">
        
        {/* Column 1 & 2: Analytics & Collaboration */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
            <motion.div variants={itemVariants} className="h-[320px] shrink-0">
                <AnalyticsChart />
            </motion.div>
            <motion.div variants={itemVariants} className="flex-1">
                <TeamCollaboration />
            </motion.div>
        </div>

        {/* Column 3: Reminders & Progress */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            <motion.div variants={itemVariants} className="shrink-0">
                <Reminders />
            </motion.div>
            <motion.div variants={itemVariants} className="flex-1">
                <ProjectProgress />
            </motion.div>
        </div>

        {/* Column 4: Project List & Time Tracker */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            <motion.div variants={itemVariants} className="flex-1">
                <ProjectList />
            </motion.div>
            <motion.div variants={itemVariants} className="shrink-0 h-[220px]">
                <TimeTracker />
            </motion.div>
        </div>
        
      </div>
    </motion.div>
  );
};

export default Home;
