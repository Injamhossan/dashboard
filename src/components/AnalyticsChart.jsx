import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

const renderCustomBarLabel = (props) => {
  const { x, y, width, index, data } = props;
  const entry = data[index];
  
  if (entry && entry.showTooltip) {
    return (
      <g>
        <rect x={x + width/2 - 20} y={y - 32} width="40" height="22" fill="white" rx="11" stroke="#d1d5db" strokeWidth="1" />
        <text x={x + width/2} y={y - 17} fill="#175336" fontSize="11" fontWeight="bold" textAnchor="middle">
          {entry.tooltipValue}
        </text>
      </g>
    );
  }
  return null;
};

const AnalyticsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://task-api-eight-flax.vercel.app/api/analytics')
      .then(res => res.json())
      .then(json => {
        const finalData = [
            { name: 'S', value: 5, fill: '#e5e7eb' }, 
            { name: 'M', value: 40, fill: '#175336' }, 
            { name: 'T', value: 50, fill: '#6EE7B7', showTooltip: true, tooltipValue: '74%' }, 
            { name: 'W', value: 45, fill: '#0F4C3A' }, 
            { name: 'T', value: 40, fill: 'url(#stripePattern)' }, 
            { name: 'F', value: 35, fill: 'url(#stripePattern)' }, 
            { name: 'S', value: 5, fill: '#e5e7eb' }, 
        ];
        
        // We override the base values with API proportional data using the views metric, scaled down
        if (Array.isArray(json) && json.length >= 5) {
            finalData[1].value = json[0].views / 40;
            finalData[2].value = json[1].views / 30;
            finalData[3].value = json[2].views / 40;
            finalData[4].value = json[3].views / 40;
            finalData[5].value = json[4].views / 50;
        }

        setData(finalData);
      })
      .catch(err => console.error("Analytics fetch:", err));
  }, []);

  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col h-full w-full shadow-sm">
      <div className="flex justify-between items-center shrink-0 mb-2">
        <h3 className="font-bold text-[18px] text-gray-900">Project Analytics</h3>
      </div>
      
      <div className="flex-1 w-full min-h-[220px] relative">
        <svg width="0" height="0">
          <defs>
            <pattern id="stripePattern" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#ffffff" />
              <line x1="0" y1="0" x2="0" y2="6" stroke="#d1d5db" strokeWidth="1.5" />
            </pattern>
          </defs>
        </svg>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 30, right: 10, left: 10, bottom: 5 }} barSize={54}>
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }}
                dy={16}
            />
            <Bar dataKey="value" radius={30}>
              {data.map((entry, index) => (
                <Cell 
                   key={`cell-${index}`} 
                   fill={entry.fill} 
                   stroke={entry.fill === 'url(#stripePattern)' ? '#d1d5db' : 'none'} 
                   strokeWidth={1} 
                />
              ))}
              <LabelList dataKey="value" content={(props) => renderCustomBarLabel({...props, data})} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
