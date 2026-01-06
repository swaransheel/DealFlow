
import React from 'react';
import { Prospect, Alert, ActivityMetric } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface DashboardProps {
  prospects: Prospect[];
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({ prospects, alerts, setAlerts }) => {
  const metrics: ActivityMetric[] = [
    { label: 'Prospects', value: 12, target: 20, icon: '👥' },
    { label: 'Calls Made', value: 28, target: 50, icon: '📞' },
    { label: 'Emails Sent', value: 45, target: 100, icon: '📧' },
    { label: 'Meetings Set', value: 3, target: 5, icon: '🤝' },
  ];

  const priorityQueue = [...prospects]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const funnelData = [
    { name: 'Contacted', value: 400 },
    { name: 'Qualified', value: 300 },
    { name: 'Meeting', value: 200 },
    { name: 'Opportunity', value: 100 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Morning Briefing</h1>
          <p className="text-slate-500">Welcome back, Sarah. Here is what needs your attention today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-all">
            Daily Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition-all">
            + Add Prospect
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{m.icon}</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {Math.round((m.value / m.target) * 100)}% to target
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{m.label}</h3>
            <p className="text-2xl font-bold">{m.value} <span className="text-slate-300 font-normal">/ {m.target}</span></p>
            <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${(m.value / m.target) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Priority Queue */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">Priority Queue</h2>
              <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {priorityQueue.map((p) => (
                <div key={p.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                    p.score >= 8 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {p.score}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{p.firstName} {p.lastName}</h4>
                    <p className="text-sm text-slate-500">{p.title} at {p.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600 block mb-1">
                      {p.status}
                    </span>
                    <p className="text-xs text-slate-400">Last touch: {p.lastActivity}</p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="font-bold text-slate-800 mb-6">Conversion Funnel</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Sidebar Widgets (Alerts) */}
        <div className="space-y-6">
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-slate-800">Recent Alerts</h2>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                {alerts.length} NEW
              </span>
            </div>
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">All alerts reviewed. Nice work!</p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className="relative group p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 transition-all">
                    <button 
                      onClick={() => dismissAlert(alert.id)}
                      className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="flex gap-3 items-start">
                      <span className="text-xl">
                        {alert.type === 'HOT' ? '🔥' : alert.type === 'MEDIUM' ? '⚡' : '📊'}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.description}</p>
                        <span className="text-[10px] text-slate-400 mt-2 block uppercase font-semibold">{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="font-bold mb-2">DealFlow AI Tip</h3>
            <p className="text-sm text-blue-100 leading-relaxed mb-4">
              Prospects from SaaS industry have a 45% higher meeting rate this week. Consider prioritizing your "SaaS Mid-Market" list today.
            </p>
            <button className="w-full py-2 bg-white text-blue-600 rounded-lg text-sm font-bold shadow hover:bg-blue-50 transition-all">
              See Insights
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
