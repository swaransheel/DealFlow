
import React, { useState } from 'react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import ProspectList from './components/ProspectList';
import AnalyticsView from './components/AnalyticsView';
import ListsView from './components/ListsView';
import SettingsView from './components/SettingsView';
import RightPanel from './components/RightPanel';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.PROSPECTS: return <ProspectList />;
      case AppView.ANALYTICS: return <AnalyticsView prospects={[]} />;
      case AppView.LISTS: return <ListsView prospects={[]} />;
      case AppView.SETTINGS: return <SettingsView />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen p-6 gap-6 overflow-hidden max-w-[1600px] mx-auto">
      {/* Sidebar: Quiet, Clean, Functional (Updated per SOP) */}
      <aside className="w-64 bg-white rounded-[40px] shadow-xl flex flex-col py-10 shrink-0">
        <div className="px-8 mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#86c232] rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tight uppercase">DealFlow</span>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          <NavItem active={currentView === AppView.DASHBOARD} label="Dashboard" icon="📊" onClick={() => setCurrentView(AppView.DASHBOARD)} />
          <NavItem active={currentView === AppView.PROSPECTS} label="Prospects" icon="🎯" onClick={() => setCurrentView(AppView.PROSPECTS)} />
          <NavItem active={currentView === AppView.LISTS} label="Lists" icon="📉" onClick={() => setCurrentView(AppView.LISTS)} />
          <NavItem active={currentView === AppView.ANALYTICS} label="Analytics" icon="⚖️" onClick={() => setCurrentView(AppView.ANALYTICS)} />
          <NavItem active={currentView === AppView.SETTINGS} label="Settings" icon="⚙️" onClick={() => setCurrentView(AppView.SETTINGS)} />
        </nav>

        <div className="px-8 mt-auto">
          <button className="flex items-center gap-3 text-slate-400 hover:text-slate-600 transition-all py-3 group">
            <span className="w-7 h-7 rounded-full border-2 border-slate-200 flex items-center justify-center text-[10px] font-black group-hover:border-slate-400">?</span>
            <span className="text-xs font-bold uppercase tracking-wider">Help Center</span>
          </button>
        </div>
      </aside>

      {/* Main Content Hub */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden min-w-0">
        <header className="flex justify-between items-center px-4 shrink-0">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {currentView === AppView.DASHBOARD ? 'Operations Overview' : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
          </h1>
          <div className="flex items-center gap-6">
            <div className="relative flex bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 text-[10px] font-black text-slate-600 cursor-pointer hover:bg-slate-50 transition-all uppercase tracking-widest">
              Live Feed <span className="ml-3 text-[#86c232] animate-pulse">●</span>
            </div>
            <div className="flex items-center gap-3 ml-2">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=James" 
                alt="User" 
                className="w-10 h-10 rounded-full bg-orange-100 shadow-sm ring-2 ring-white"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-black text-slate-800 leading-none">James Ray</p>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">SDR Territory West ▼</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pr-2 scroll-smooth">
          {renderView()}
        </main>
      </div>

      {/* Right Column Intelligence Panel */}
      <RightPanel />
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
      active ? 'bg-[#f1f8e9] text-[#86c232]' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
    }`}
  >
    <span className={`text-lg ${active ? 'opacity-100' : 'opacity-60'}`}>{icon}</span>
    {label}
  </button>
);

export default App;
