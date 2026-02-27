import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload.itemData;
    if (!data) return null;
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 outline-none">
        <p className="font-bold text-gray-800 mb-1">{data.date}</p>
        <div className="flex flex-col gap-1">
            <p className="text-[#175336] text-[13px]"><span className="font-semibold">Views:</span> {data.views}</p>
            <p className="text-[#0F4C3A] text-[13px]"><span className="font-semibold">Clicks:</span> {data.clicks}</p>
            <p className="text-[#10b981] text-[13px]"><span className="font-semibold">Conversions:</span> {data.conversions}</p>
        </div>
      </div>
    );
  }
  return null;
};

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
        const finalData = [];
        let maxViews = 0;
        let highestIdx = -1;
        
        const colors = ['#e5e7eb', '#175336', '#6EE7B7', '#0F4C3A', 'url(#stripePattern)'];

        if (Array.isArray(json)) {
            json.forEach((item, index) => {
                const dateObj = new Date(item.date);
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
                
                finalData.push({
                    name: dayName,
                    date: item.date,
                    value: item.views,
                    itemData: item,
                    fill: colors[index % colors.length]
                });

                if (item.views > maxViews) {
                    maxViews = item.views;
                    highestIdx = index;
                }
            });

            // Dynamically show tooltip on the day with the highest views
            if (highestIdx !== -1) {
                finalData[highestIdx].showTooltip = true;
                const topItem = finalData[highestIdx].itemData;
                finalData[highestIdx].tooltipValue = topItem.conversions + '%';
            }
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
            <pattern id="stripePattern" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#ffffff" />
              <line x1="0" y1="0" x2="0" y2="8" stroke="#8ca298" strokeWidth="2" opacity="0.9" />
            </pattern>
          </defs>
        </svg>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 30, right: 10, left: 10, bottom: 5 }} barSize={54}>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
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
                   stroke={entry.fill === 'url(#stripePattern)' ? '#8ca298' : 'none'} 
                   strokeWidth={entry.fill === 'url(#stripePattern)' ? 1.5 : 1} 
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
