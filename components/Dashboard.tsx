
import React from 'react';
import { Prospect, Alert } from '../types';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, LineChart, Line, AreaChart, Area } from 'recharts';

interface DashboardProps {
  prospects: Prospect[];
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({ prospects, alerts, setAlerts }) => {
  const comparisonData = [
    { name: 'Jan', business: 30, competitor: 25 },
    { name: 'Feb', business: 80, competitor: 45 },
    { name: 'Mar', business: 45, competitor: 85 },
    { name: 'Apr', business: 60, competitor: 55 },
  ];

  const salesReportData = [
    { day: 'Sun', value: 150 },
    { day: 'Mon', value: 300 },
    { day: 'Tue', value: 200 },
    { day: 'Wed', value: 650 },
    { day: 'Thu', value: 400 },
    { day: 'Fri', value: 550 },
    { day: 'Sat', value: 500 },
  ];

  return (
    <div className="space-y-6">
      {/* Comparison Section */}
      <section className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-slate-50">
        <div className="p-8 pb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Comparison</h2>
          <button className="text-slate-300 p-1 rounded-lg border border-slate-100">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 01-2.8-.7l-1.46 1.46A7.93 7.93 0 0012 20c4.42 0 8-3.58 8-8h3l-4-4zM5 16l4-4H6c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0012 4c-4.42 0-8 3.58-8 8H1l4 4z"/></svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 p-8 pt-0 gap-12">
          {/* Business Stats */}
          <div>
            <div className="mb-4">
              <p className="text-[10px] font-medium text-slate-400 mb-1">Your business</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-slate-800">$8.200</span>
                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded">+24%</span>
              </div>
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <Bar dataKey="business" fill="#86c232" radius={[4, 4, 4, 4]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Competitor Stats */}
          <div>
            <div className="mb-4">
              <p className="text-[10px] font-medium text-slate-400 mb-1">Your competitor</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-slate-800">$7.600</span>
                <span className="text-[10px] font-bold text-orange-400 bg-orange-50 px-1.5 py-0.5 rounded">-16%</span>
              </div>
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <Bar dataKey="competitor" fill="#a5d6a7" radius={[4, 4, 4, 4]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <button className="w-full py-4 bg-[#ffb74d] text-white text-sm font-bold hover:bg-[#ffa726] transition-all">
          See details
        </button>
      </section>

      {/* Product sales report */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-lg font-bold text-slate-800">Product sales report</h2>
        <button className="text-xs font-bold text-blue-600">View all products</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Product Feature */}
        <div className="md:col-span-2 relative h-80 rounded-[32px] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800" 
            alt="Bicycle Product" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-3xl p-6 shadow-xl flex justify-between items-center transform transition-all group-hover:scale-[1.02]">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Tigaroda oye bike</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-400">🕒 Published 15 Dec 2019</span>
              </div>
            </div>
            <button className="text-sm font-bold text-orange-400">Details</button>
          </div>
        </div>

        {/* Sales Chart and Stats Column */}
        <div className="space-y-6">
          {/* Weekly Line Chart */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 h-48 relative">
            <div className="absolute top-4 right-6 flex gap-1">
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            </div>
            <div className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesReportData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#86c232" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#86c232" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white px-3 py-1 rounded-lg shadow-lg border border-slate-100">
                            <p className="text-xs font-bold text-slate-800">${payload[0].value.toFixed(2)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={{ stroke: '#86c232', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <XAxis 
                    dataKey="day" 
                    hide={false} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 8, fill: '#94a3b8', fontWeight: 600}} 
                    interval={0}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#86c232" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                    dot={(props: any) => {
                      if (props.index === 3) {
                        return (
                          <circle cx={props.cx} cy={props.cy} r={4} fill="#86c232" stroke="white" strokeWidth={2} />
                        )
                      }
                      return null;
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Most Impressions */}
            <div className="bg-white rounded-[24px] p-4 shadow-sm border border-slate-50">
              <p className="text-[10px] font-bold text-slate-800 mb-3">Most Impressions</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#86c232]"></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-800">Europe</p>
                    <p className="text-[8px] font-semibold text-slate-400">34%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-300"></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-800">America</p>
                    <p className="text-[8px] font-semibold text-slate-400">28%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Product Summary */}
            <div className="bg-white rounded-[24px] p-4 shadow-sm border border-slate-50 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-50 rounded-xl mb-2 flex items-center justify-center">
                🚲
              </div>
              <p className="text-[10px] font-bold text-slate-800 leading-tight mb-2">Tigaroda oye bike</p>
              <div className="w-full space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-semibold text-slate-400">This month</span>
                  <span className="text-[8px] font-bold text-slate-800">$25K</span>
                </div>
                <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[70%]"></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[8px] font-semibold text-slate-400">Last month</span>
                  <span className="text-[8px] font-bold text-slate-800">$18K</span>
                </div>
                <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full w-[45%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
