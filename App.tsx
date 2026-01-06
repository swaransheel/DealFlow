
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

  // Initialize mock data
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

    // Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        alert('Quick Search triggered (Ctrl+K)');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">DealFlow</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem active={currentView === AppView.DASHBOARD} icon={<ICONS.Dashboard />} label="Dashboard" onClick={() => setCurrentView(AppView.DASHBOARD)} />
          <NavItem active={currentView === AppView.PROSPECTS} icon={<ICONS.Prospects />} label="Prospects" onClick={() => setCurrentView(AppView.PROSPECTS)} />
          <NavItem active={currentView === AppView.LISTS} icon={<ICONS.Lists />} label="Lists" onClick={() => setCurrentView(AppView.LISTS)} />
          <NavItem active={currentView === AppView.ANALYTICS} icon={<ICONS.Analytics />} label="Analytics" onClick={() => setCurrentView(AppView.ANALYTICS)} />
          <div className="pt-8 pb-4 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</div>
          <NavItem active={currentView === AppView.SETTINGS} icon={<ICONS.Settings />} label="Settings" onClick={() => setCurrentView(AppView.SETTINGS)} />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
              <img src="https://picsum.photos/seed/user/40/40" alt="Avatar" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Sarah Johnson</p>
              <p className="text-xs text-slate-400 truncate">SDR Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        {renderView()}
      </main>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default App;
