import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, subtext, number, isPrimary }) => (
  <div 
    className={`p-6 rounded-[24px] transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${
      isPrimary ? 'text-white border-0' : 'bg-white text-text-dark border-[1.5px] border-gray-100'
    }`}
    style={isPrimary ? { background: 'linear-gradient(135deg, #175336 40%, #9fd663 150%)' } : {}}
  >
    <div className="flex justify-between items-start mb-6">
      <p className={`text-[15px] font-medium ${isPrimary ? 'text-white/90' : 'text-gray-900'}`}>{title}</p>
      <div className={`p-1.5 rounded-full border ${isPrimary ? 'border-white bg-white text-[#175336]' : 'border-gray-800 text-gray-800'}`}>
        <ArrowUpRight size={18} strokeWidth={1.5} />
      </div>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <h3 className="text-[40px] leading-none font-bold mb-4">{value}</h3>
        <div className="flex items-center gap-2">
            {number && (
                <div className={`flex items-center justify-center gap-1 px-1.5 py-0.5 rounded-[5px] border-[1.5px] text-[10px] font-bold ${
                    isPrimary ? 'border-[#9fd663]/60 text-[#9fd663]' : 'border-[#175336]/30 text-[#175336] bg-[#175336]/[0.02]'
                }`}>
                    <span>{number}</span>
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 0L6 5H0L3 0Z" />
                    </svg>
                </div>
            )}
            <p className={`text-[12px] font-medium ${isPrimary ? 'text-[#9fd663]' : 'text-[#175336]'}`}>{subtext}</p>
        </div>
      </div>
    </div>
  </div>
);

const DashboardStats = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://task-api-eight-flax.vercel.app/api/dashboard')
      .then(res => res.json())
      .then(json => {
          if (json.overview) {
              setData(json.overview);
          } else if (Array.isArray(json) && json.length > 0) {
              setData(json[0].overview || json[0]);
          } else {
              setData(json);
          }
      })
      .catch(err => console.error("Failed to fetch overview:", err));
  }, []);

  const stats = data ? [
    { title: 'Total Users', value: data.totalUsers?.toLocaleString() || '12,458', subtext: 'Increased from last month', number: '5', isPrimary: true },
    { title: 'Active Users', value: data.activeUsers?.toLocaleString() || '8,234', subtext: 'Increased from last month', number: '6', isPrimary: false },
    { title: 'Total Revenue', value: data.revenue ? `$${data.revenue.toLocaleString()}` : '$245,890', subtext: 'Increased from last month', number: '2', isPrimary: false },
    { title: 'Growth Rate', value: `${data.growth || 23.5}%`, subtext: 'Constant upward trend', number: null, isPrimary: false },
  ] : [
    { title: 'Total Users', value: '...', subtext: 'Loading...', number: '5', isPrimary: true },
    { title: 'Active Users', value: '...', subtext: 'Loading...', number: '6', isPrimary: false },
    { title: 'Total Revenue', value: '...', subtext: 'Loading...', number: '2', isPrimary: false },
    { title: 'Growth Rate', value: '...', subtext: 'Loading...', number: null, isPrimary: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
