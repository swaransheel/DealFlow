
import React from 'react';
import { Prospect } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AnalyticsViewProps {
  prospects: Prospect[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ prospects }) => {
  const performanceData = [
    { name: 'Week 1', contacts: 65, meetings: 12, deals: 2 },
    { name: 'Week 2', contacts: 85, meetings: 18, deals: 4 },
    { name: 'Week 3', contacts: 120, meetings: 25, deals: 6 },
    { name: 'Week 4', contacts: 90, meetings: 20, deals: 5 },
  ];

  const sourceData = [
    { name: 'LinkedIn', count: 45 },
    { name: 'CRM Sync', count: 32 },
    { name: 'Referrals', count: 18 },
    { name: 'Manual', count: 5 },
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Performance Analytics</h1>
        <p className="text-slate-500">Track your conversion rates, activity levels, and ROI attribution.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="font-bold text-slate-800 mb-6">Activity vs. Outcomes</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Area type="monotone" dataKey="contacts" stroke="#3b82f6" fillOpacity={1} fill="url(#colorContacts)" strokeWidth={3} />
                <Line type="monotone" dataKey="meetings" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="font-bold text-slate-800 mb-6">Pipeline Velocity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Line type="stepAfter" dataKey="deals" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase">Avg. Time to Contact</h3>
          <p className="text-3xl font-bold text-slate-900">4.2 <span className="text-sm font-normal text-slate-400">hours</span></p>
          <p className="text-xs text-green-600 font-medium mt-2">↓ 12% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase">Contact-to-Meeting Rate</h3>
          <p className="text-3xl font-bold text-slate-900">18.5%</p>
          <p className="text-xs text-green-600 font-medium mt-2">↑ 3.4% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase">Win Rate (Qualified)</h3>
          <p className="text-3xl font-bold text-slate-900">24.1%</p>
          <p className="text-xs text-slate-400 font-medium mt-2">Stable vs last month</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
