
import React from 'react';

const RightPanel: React.FC = () => {
  return (
    <aside className="hidden xl:flex w-80 bg-white rounded-[40px] shadow-2xl flex-col p-10 overflow-y-auto shrink-0 border border-white">
      <h2 className="text-lg font-black text-slate-800 mb-10 text-center tracking-tight">Goals Performance</h2>
      
      {/* Gauge Chart Placeholder */}
      <div className="relative w-48 h-48 mx-auto mb-10 group">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <path className="text-slate-100" strokeDasharray="100, 100" strokeWidth="3.5" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="text-[#86c232]" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3.5" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-800 tracking-tighter">75%</span>
          <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">$1.050 / week</span>
        </div>
        {/* Thumb */}
        <div className="absolute top-0 left-1/2 -ml-2 -mt-1 w-4 h-4 bg-[#86c232] rounded-full border-4 border-white shadow-xl"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <MetricSmall label="This month" val="$4.200" delta="+8.2%" color="text-orange-400" />
        <MetricSmall label="Last month" val="$4.008" delta="+4%" color="text-slate-800" />
      </div>

      <div className="mb-10 space-y-6">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-black text-slate-800 text-sm tracking-tight">Impressions</h3>
          <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600">Region ▼</button>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <ImpressionItem label="Europe" val="34%" color="bg-[#86c232]" />
          <ImpressionItem label="America" val="28%" color="bg-orange-300" />
          <ImpressionItem label="Asia" val="22%" color="bg-blue-600" />
          <ImpressionItem label="Africa" val="16%" color="bg-orange-400" />
        </div>
      </div>

      <button className="mt-auto w-full py-5 bg-[#ffb74d] text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-100 hover:bg-[#ffa726] hover:-translate-y-1 transition-all active:translate-y-0">
        View Full Report
      </button>
    </aside>
  );
};

const MetricSmall = ({ label, val, delta, color }: any) => (
  <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100/50 backdrop-blur-sm">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tight mb-1">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className={`text-base font-black ${color}`}>{val}</span>
      <span className="text-[8px] font-black text-green-500">{delta}</span>
    </div>
  </div>
);

const ImpressionItem = ({ label, val, color }: any) => (
  <div className="flex items-start gap-3 group cursor-default">
    <div className={`w-2 h-2 rounded-full mt-1.5 ${color} transition-transform group-hover:scale-125`}></div>
    <div>
      <p className="text-xs font-black text-slate-800 leading-none">{label}</p>
      <p className="text-[9px] font-bold text-slate-400 mt-1">{val}</p>
    </div>
  </div>
);

export default RightPanel;
