
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { dealflowApi } from '../lib/api';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const FUNNEL_DATA = [
  { name: 'Prospects', value: 120 },
  { name: 'Contacted', value: 85 },
  { name: 'Meetings', value: 32 },
  { name: 'Opportunities', value: 12 },
];

const Dashboard: React.FC = () => {
  const { data: prospects } = useQuery({ queryKey: ['prospects'], queryFn: dealflowApi.getProspects });
  const { data: alerts } = useQuery({ queryKey: ['alerts'], queryFn: dealflowApi.getAlerts });
  const { data: metrics } = useQuery({ queryKey: ['metrics'], queryFn: dealflowApi.getDailyMetrics });

  const priorityQueue = prospects?.filter(p => p.score >= 8).sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500">
      {/* SOP Section: Performance Snapshot */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Today's Calls" value={metrics?.calls || 0} icon="📞" />
        <MetricCard label="Emails Sent" value={metrics?.emails || 0} icon="✉️" />
        <MetricCard label="Meetings Set" value={metrics?.meetings || 0} icon="📅" />
        <MetricCard label="New Prospects" value={metrics?.prospects || 0} icon="👤" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOP Section: Priority Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
            <div className="p-8 pb-4 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">Priority Queue (Top 5)</h2>
              <button className="text-xs font-bold text-blue-600 hover:underline">View full list</button>
            </div>
            <div className="px-8 pb-8">
              <div className="space-y-3">
                {priorityQueue?.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-[#86c232]">
                        {p.score}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{p.firstName} {p.lastName}</p>
                        <p className="text-[11px] font-bold text-slate-400">{p.company} • {p.title}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50">Contact</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SOP Section: Conversion Funnel Activity */}
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 p-8">
            <h2 className="text-lg font-black text-slate-800 tracking-tight mb-6">Activity Trends</h2>
            <div className="h-64 -mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={FUNNEL_DATA}>
                  <defs>
                    <linearGradient id="colorF" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#86c232" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#86c232" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#86c232" strokeWidth={4} fill="url(#colorF)" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SOP Section: Buying Signals / Hot Alerts */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 p-8">
            <h2 className="text-lg font-black text-slate-800 tracking-tight mb-6">Hot Alerts 🔥</h2>
            <div className="space-y-4">
              {alerts?.map(alert => (
                <div key={alert.id} className={`p-5 rounded-[24px] border border-slate-50 shadow-sm transition-all hover:scale-[1.02] cursor-pointer ${
                  alert.type === 'HOT' ? 'bg-orange-50/50' : 'bg-white'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                      alert.type === 'HOT' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {alert.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{alert.timestamp}</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-800 mb-1">{alert.title}</h3>
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed">{alert.description}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">
              Clear All Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, icon }: any) => (
  <div className="bg-white p-6 rounded-[28px] border border-slate-50 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black text-slate-800 tracking-tighter">{value}</p>
    </div>
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl shadow-inner">
      {icon}
    </div>
  </div>
);

export default Dashboard;
