
import React, { useState } from 'react';
import { Prospect, ProspectStatus } from '../types';

interface ProspectListProps {
  prospects: Prospect[];
  setProspects: React.Dispatch<React.SetStateAction<Prospect[]>>;
}

const ProspectList: React.FC<ProspectListProps> = ({ prospects, setProspects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredProspects = prospects.filter(p => {
    const matchesSearch = `${p.firstName} ${p.lastName} ${p.company} ${p.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prospect Intelligence</h1>
          <p className="text-slate-500">Managing {prospects.length} contactable prospects in your territory.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50">
            Import CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700">
            + New Prospect
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[240px] relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input 
            type="text" 
            placeholder="Search by name, company, or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          {Object.values(ProspectStatus).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Prospect</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">Score</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Industry</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Last Activity</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredProspects.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                      {p.firstName[0]}{p.lastName[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {p.firstName} {p.lastName}
                      </div>
                      <div className="text-xs text-slate-500">{p.company} • {p.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-2 py-1 rounded-lg text-sm font-bold ${
                    p.score >= 8 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {p.score}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {p.industry}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 italic">
                  {p.lastActivity}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProspects.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400">No prospects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProspectList;
