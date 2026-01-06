
import React, { useState } from 'react';

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'integrations' | 'scorecard' | 'governance'>('scorecard');

  const scorecardFactors = [
    { label: 'Firmographic Fit', weight: 40, color: 'bg-[#86c232]', desc: 'Industry, Company Size, Revenue' },
    { label: 'Technographic Fit', weight: 20, color: 'bg-blue-500', desc: 'CRM Usage, Tech Stack Adoption' },
    { label: 'Engagement Signals', weight: 25, color: 'bg-orange-400', desc: 'Email Opens, Website Visits' },
    { label: 'Buyer Intent', weight: 15, color: 'bg-purple-500', desc: 'Job Changes, Funding Rounds' },
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-6 pb-12">
      <header>
        <h1 className="text-2xl font-black text-slate-800">System Configuration</h1>
        <p className="text-sm font-bold text-slate-400">Manage DealFlow scoring logic and system integrations.</p>
      </header>

      <div className="flex gap-8 border-b border-slate-100 overflow-x-auto no-scrollbar">
        {['integrations', 'scorecard', 'governance'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? 'text-[#86c232] border-b-2 border-[#86c232]' : 'text-slate-300 hover:text-slate-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'scorecard' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50">
            <h2 className="text-lg font-black text-slate-800 mb-6">Scorecard Builder v2.0</h2>
            <div className="space-y-6">
              {scorecardFactors.map(factor => (
                <div key={factor.label} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-black text-slate-800">{factor.label}</p>
                      <p className="text-[10px] font-bold text-slate-400">{factor.desc}</p>
                    </div>
                    <span className="text-sm font-black text-[#86c232]">{factor.weight}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div className={`h-full ${factor.color} rounded-full`} style={{ width: `${factor.weight}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-5 bg-[#86c232] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-100 hover:bg-green-600 transition-all">
              Save Scorecard Logic
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50">
              <h3 className="text-sm font-black text-slate-800 mb-4">Calibration Insights</h3>
              <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-700 leading-relaxed">
                  💡 <strong>Recommendation:</strong> Based on Q4 data, increasing Firmographic weight for "Series A" companies improved meeting conversion by 14%.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl">
              <h3 className="text-sm font-black mb-4 tracking-tight">API Key Management</h3>
              <p className="text-[11px] font-bold text-slate-400 mb-6 leading-relaxed">Use this key for custom integrations or bulk enrichment workflows.</p>
              <div className="flex bg-slate-800 rounded-2xl p-4 border border-slate-700">
                <code className="flex-1 text-[10px] text-slate-300 truncate">sk_live_dealflow_2026_q1_pvt_0x...</code>
                <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-4">Copy</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <IntegrationCard name="Salesforce" status="Connected" icon="☁️" />
          <IntegrationCard name="LinkedIn Sales Navigator" status="Connected" icon="🔗" />
          <IntegrationCard name="Slack" status="Active" icon="💬" />
          <IntegrationCard name="HubSpot" status="Ready" icon="🧡" />
          <IntegrationCard name="Apollo.io" status="Ready" icon="🚀" />
        </div>
      )}

      {activeTab === 'governance' && (
        <div className="bg-white rounded-[32px] p-12 text-center border border-dashed border-slate-200">
          <p className="text-sm font-bold text-slate-400">RBAC Controls and Audit Logs are restricted to Enterprise Administrators.</p>
        </div>
      )}
    </div>
  );
};

const IntegrationCard = ({ name, status, icon }: any) => (
  <div className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex items-center justify-between group hover:border-[#86c232] transition-all cursor-pointer">
    <div className="flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-sm font-black text-slate-800">{name}</p>
        <p className="text-[10px] font-bold text-green-500">{status}</p>
      </div>
    </div>
    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-green-50 transition-colors">
      <svg className="w-4 h-4 text-slate-300 group-hover:text-[#86c232]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
    </div>
  </div>
);

export default SettingsView;
