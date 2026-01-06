
import React from 'react';
import { Prospect } from '../types';

interface ListsViewProps {
  prospects: Prospect[];
}

const ListsView: React.FC<ListsViewProps> = ({ prospects }) => {
  const mockLists = [
    { name: 'Q1 2026 Enterprise SaaS - West', description: 'Target mid-market SaaS companies in CA/OR/WA', count: 124, type: 'Campaign-Based' },
    { name: 'High-Intent Prospects', description: 'Score > 8, engaged in last 7 days', count: 42, type: 'Smart List' },
    { name: 'Webinar Follow-Up', description: 'Leads from Product Launch event', count: 215, type: 'Event-Based' },
    { name: 'Stale Accounts', description: 'No contact in > 30 days', count: 89, type: 'Maintenance' },
  ];

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Segmented Lists</h1>
          <p className="text-slate-500">Organize and prioritize your outreach with custom segments.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition-all flex items-center gap-2">
          <span>+ Create New List</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockLists.map((list) => (
          <div key={list.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase tracking-wider">{list.type}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{list.name}</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">{list.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-sm font-medium text-slate-700">{list.count} Prospects</span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/list${i}/32/32`} alt="avatar" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsView;
