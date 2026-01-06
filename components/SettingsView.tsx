
import React, { useState } from 'react';

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'integrations' | 'scorecard' | 'account'>('integrations');

  const integrations = [
    { name: 'Salesforce', status: 'Connected', icon: '☁️', color: 'text-blue-500' },
    { name: 'Slack', status: 'Connected', icon: '💬', color: 'text-purple-500' },
    { name: 'LinkedIn Sales Navigator', status: 'Connected', icon: '🔗', color: 'text-blue-700' },
    { name: 'HubSpot', status: 'Disconnected', icon: '🧡', color: 'text-orange-500' },
  ];

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500">Configure your DealFlow environment and integrations.</p>
      </header>

      <div className="flex gap-8 mb-8 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('integrations')}
          className={`pb-4 text-sm font-semibold transition-all ${activeTab === 'integrations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          API Integrations
        </button>
        <button 
          onClick={() => setActiveTab('scorecard')}
          className={`pb-4 text-sm font-semibold transition-all ${activeTab === 'scorecard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Scorecard Builder
        </button>
        <button 
          onClick={() => setActiveTab('account')}
          className={`pb-4 text-sm font-semibold transition-all ${activeTab === 'account' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          User & Permissions
        </button>
      </div>

      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((item) => (
              <div key={item.name} className="bg-white p-6 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <span className={`text-2xl ${item.color}`}>{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                    <p className={`text-xs font-medium ${item.status === 'Connected' ? 'text-green-600' : 'text-slate-400'}`}>
                      {item.status}
                    </p>
                  </div>
                </div>
                <button className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                  item.status === 'Connected' ? 'border-red-100 text-red-500 hover:bg-red-50' : 'border-blue-100 text-blue-600 hover:bg-blue-50'
                }`}>
                  {item.status === 'Connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg mt-8">
            <h3 className="font-bold mb-2">Developer API Access</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">Use your API key to programmatically import prospects and fetch scores for your custom apps.</p>
            <div className="flex gap-2">
              <input 
                type="password" 
                readOnly 
                value="sk_live_dealflow_xxxxxxxxxxxxxxxx"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 font-mono"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all">
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'scorecard' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Active Scorecard: "Enterprise SaaS Q1 2026"</h2>
            <button className="text-sm text-blue-600 font-bold hover:underline">Edit Logic</button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Firmographic Fit', weight: 40, color: 'bg-blue-500' },
                { label: 'Technographic Fit', weight: 20, color: 'bg-purple-500' },
                { label: 'Engagement Signals', weight: 25, color: 'bg-green-500' },
                { label: 'Buyer Intent', weight: 15, color: 'bg-orange-500' },
              ].map((factor) => (
                <div key={factor.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{factor.label}</span>
                    <span className="font-bold text-slate-900">{factor.weight}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${factor.color} rounded-full`} style={{ width: `${factor.weight}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
              <h4 className="text-sm font-bold text-blue-800 mb-1">Calibration Recommendation</h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                Based on last month's wins, increasing the weight of "Job Postings" for Sales/Marketing roles by 5% could improve score accuracy by 12%.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'account' && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-400">User Management is currently restricted to Administrators.</p>
        </div>
      )}
    </div>
  );
};

export default SettingsView;
