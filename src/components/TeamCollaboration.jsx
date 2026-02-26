import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

const TeamCollaboration = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('https://task-api-eight-flax.vercel.app/api/users')
      .then(res => res.json())
      .then(json => {
        const mapped = json.slice(0, 4).map((user, idx) => {
            const taskArr = ['Working on Github Project Repository', 'Integrate User Authentication', 'Develop Search and Filter Func', 'Responsive Layout for Homepage'];
            const statusArr = ['Completed', 'In Progress', 'Pending', 'In Progress'];
            
            return {
                name: user.name,
                task: taskArr[idx % taskArr.length],
                status: statusArr[idx % statusArr.length],
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name.replace(' ', '')}`
            };
        });
        setMembers(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col min-h-0 h-full w-full">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="font-bold text-[18px] text-gray-900">Team Collaboration</h3>
        <button className="flex items-center gap-1.5 px-4 py-2 border border-primary-dark/20 rounded-full text-xs font-bold text-primary-dark hover:bg-primary-dark hover:text-white transition-all">
          <Plus size={16} /> Add Member
        </button>
      </div>
      
      <div className="space-y-5 overflow-y-auto custom-scrollbar flex-1 pr-2">
        {members.map((member, index) => (
          <div key={index} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden ring-2 ring-white shadow-sm transform group-hover:scale-110 transition-transform shrink-0">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover scale-110 mt-1" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-text-dark">{member.name}</p>
                <p className="text-[11px] text-text-gray font-medium truncate max-w-[140px] md:max-w-none">{member.task}</p>
              </div>
            </div>
            <span className={`text-[10px] whitespace-nowrap font-bold px-3 py-1 rounded-lg ${
              member.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
              member.status === 'In Progress' ? 'bg-amber-50 text-amber-600' :
              'bg-pink-50 text-pink-600'
            }`}>
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCollaboration;
