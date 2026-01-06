
import React, { useState, useEffect } from 'react';
import { AppView, Prospect, Alert, ProspectStatus } from './types';
import { ICONS } from './constants';
import Dashboard from './components/Dashboard';
import ProspectList from './components/ProspectList';
import AnalyticsView from './components/AnalyticsView';
import ListsView from './components/ListsView';
import SettingsView from './components/SettingsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const mockProspects: Prospect[] = [
      { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@acme.com', company: 'Acme Corp', title: 'CTO', score: 9.2, status: ProspectStatus.QUALIFIED, industry: 'SaaS', lastActivity: '2025-01-05' },
      { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@beta.com', company: 'Beta Inc', title: 'VP Sales', score: 8.7, status: ProspectStatus.CONTACTED, industry: 'FinTech', lastActivity: '2025-01-06' },
      { id: '3', firstName: 'Alice', lastName: 'Johnson', email: 'alice@gamma.com', company: 'Gamma LLC', title: 'Director of Ops', score: 8.5, status: ProspectStatus.NEW, industry: 'Healthcare', lastActivity: '2025-01-04' },
      { id: '4', firstName: 'Bob', lastName: 'Brown', email: 'bob@delta.com', company: 'Delta Group', title: 'CEO', score: 4.2, status: ProspectStatus.DISQUALIFIED, industry: 'Manufacturing', lastActivity: '2025-01-02' },
      { id: '5', firstName: 'Sarah', lastName: 'Miller', email: 'sarah@epsilon.com', company: 'Epsilon Tech', title: 'Head of Growth', score: 7.9, status: ProspectStatus.MEETING_SCHEDULED, industry: 'E-commerce', lastActivity: '2025-01-05' },
    ];

    const mockAlerts: Alert[] = [
      { id: 'a1', type: 'HOT', title: 'Job Change Detected', description: 'VP of Sales left Acme Corp, now at Beta Inc', timestamp: '10 min ago', isReviewed: false },
      { id: 'a2', type: 'MEDIUM', title: 'Email opened 3x', description: 'Jane Smith opened pricing email 3 times', timestamp: '1 hour ago', isReviewed: false },
      { id: 'a3', type: 'INFO', title: 'Tech Stack Updated', description: 'Gamma LLC added Salesforce to tech stack', timestamp: '3 hours ago', isReviewed: false },
    ];

    setProspects(mockProspects);
    setAlerts(mockAlerts);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard prospects={prospects} alerts={alerts} setAlerts={setAlerts} />;
      case AppView.PROSPECTS:
        return <ProspectList prospects={prospects} setProspects={setProspects} />;
      case AppView.ANALYTICS:
        return <AnalyticsView prospects={prospects} />;
      case AppView.LISTS:
        return <ListsView prospects={prospects} />;
      case AppView.SETTINGS:
        return <SettingsView />;
      default:
        return <div className="p-8">View coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen p-4 gap-4 overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white rounded-3xl shadow-xl flex flex-col py-8">
        <div className="px-8 mb-12 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#86c232] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">DealFlow</span>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          <NavItem active={currentView === AppView.DASHBOARD} label="Summary" icon="📊" onClick={() => setCurrentView(AppView.DASHBOARD)} />
          <NavItem active={currentView === AppView.PROSPECTS} label="Segmentation" icon="🎯" onClick={() => setCurrentView(AppView.PROSPECTS)} />
          <NavItem active={currentView === AppView.ANALYTICS} label="Comparison" icon="⚖️" onClick={() => setCurrentView(AppView.ANALYTICS)} />
          <NavItem active={false} label="Product" icon="📦" onClick={() => {}} />
          <NavItem active={currentView === AppView.LISTS} label="Chart" icon="📉" onClick={() => setCurrentView(AppView.LISTS)} />
          <NavItem active={false} label="Balance" icon="💰" onClick={() => {}} />
          <NavItem active={currentView === AppView.SETTINGS} label="Settings" icon="⚙️" onClick={() => setCurrentView(AppView.SETTINGS)} />
        </nav>

        <div className="px-8 mt-auto">
          <button className="flex items-center gap-3 text-slate-400 hover:text-slate-600 transition-colors py-2">
            <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold">?</span>
            <span className="text-sm font-medium">Help Center</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Top Header */}
        <header className="flex justify-between items-center px-4 py-2">
          <h1 className="text-2xl font-bold text-slate-800">My Summary</h1>
          <div className="flex items-center gap-6">
            <div className="flex bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 text-sm font-medium text-slate-600 cursor-pointer">
              Monthly <span className="ml-2 text-slate-400">▼</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-slate-600">✉️</button>
              <button className="hover:text-slate-600 relative">
                🔔
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center gap-3 ml-2">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jamet" 
                alt="Jamet Roy" 
                className="w-10 h-10 rounded-full bg-orange-100 shadow-sm"
              />
              <div className="hidden md:block">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-slate-800">Jamet Roy</span>
                  <span className="text-slate-400 text-[10px]">▼</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto pr-2">
          {renderView()}
        </main>
      </div>

      {/* Right Column: Performance Summary */}
      <aside className="hidden xl:flex w-80 bg-white rounded-3xl shadow-xl flex-col p-8 overflow-y-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-8 text-center">Goals Performance</h2>
        
        {/* Progress Gauge Placeholder Style */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <path className="text-slate-100" strokeDasharray="100, 100" strokeWidth="3" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-[#86c232]" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-slate-800">75%</span>
            <span className="text-[10px] font-medium text-slate-400">$1.050 / week</span>
          </div>
          {/* Green dot handle */}
          <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1 w-3 h-3 bg-[#86c232] rounded-full border-2 border-white shadow-sm"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-medium text-slate-400 mb-1">This month</p>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-orange-400">$4.200</span>
              <span className="text-[10px] font-bold text-green-500">+8.2%</span>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-medium text-slate-400 mb-1">Last month</p>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-slate-800">$4.008</span>
              <span className="text-[10px] font-bold text-green-500">+4%</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Impressions</h3>
            <span className="text-[10px] font-bold text-slate-400 cursor-pointer">Region ▼</span>
          </div>
          <div className="grid grid-cols-2 gap-y-4">
            <ImpressionItem label="Europe" value="34%" color="bg-[#86c232]" />
            <ImpressionItem label="America" value="28%" color="bg-orange-300" />
            <ImpressionItem label="Asia" value="22%" color="bg-blue-600" />
            <ImpressionItem label="Africa" value="16%" color="bg-orange-400" />
          </div>
        </div>

        <button className="mt-auto w-full py-4 bg-[#ffb74d] text-white rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-[#ffa726] transition-all">
          View Full Report
        </button>
      </aside>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-8 py-3 rounded-2xl text-sm font-semibold transition-all ${
      active ? 'bg-[#f1f8e9] text-[#86c232]' : 'text-slate-400 hover:bg-slate-50'
    }`}
  >
    <span className="text-lg opacity-80">{icon}</span>
    {label}
  </button>
);

const ImpressionItem: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="flex items-start gap-2">
    <div className={`w-2 h-2 rounded-full mt-1.5 ${color}`}></div>
    <div>
      <p className="text-sm font-bold text-slate-800">{label}</p>
      <p className="text-xs text-slate-400">{value}</p>
    </div>
  </div>
);

export default App;
