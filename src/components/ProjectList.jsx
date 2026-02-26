import React, { useState, useEffect } from 'react';
import { Plus, Github, Code, Layout, TrendingUp, Zap } from 'lucide-react';

const iconMap = [
    <Zap className="text-blue-500" size={16} key="zap" />,
    <Github className="text-emerald-500" size={16} key="git" />,
    <Layout className="text-amber-500" size={16} key="layout" />,
    <TrendingUp className="text-orange-500" size={16} key="trend" />,
    <Code className="text-purple-500" size={16} key="code" />
];

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://task-api-eight-flax.vercel.app/api/products')
      .then(res => res.json())
      .then(json => {
        const mapped = json.slice(0, 5).map((product, idx) => ({
            name: product.name,
            date: new Date(Date.now() + idx * 86400000 * 2).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            icon: iconMap[idx % iconMap.length]
        }));
        setProjects(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col h-full w-full">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="font-bold text-lg">Project</h3>
        <button className="flex items-center gap-1.5 px-3 py-1 border border-primary-dark/20 rounded-full text-[10px] font-bold text-primary-dark hover:bg-primary-dark hover:text-white transition-all">
          <Plus size={12} /> New
        </button>
      </div>
      
      <div className="space-y-6 overflow-y-auto custom-scrollbar flex-1 pr-2">
        {projects.length > 0 ? projects.map((project, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
                {project.icon}
            </div>
            <div>
                <p className="text-sm font-bold text-text-dark leading-tight">{project.name}</p>
                <p className="text-[10px] text-text-gray font-medium mt-1">Due date: {project.date}</p>
            </div>
          </div>
        )) : (
            <p className="text-sm text-gray-500 font-medium">Loading projects...</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
