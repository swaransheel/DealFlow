
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dealflowApi } from '../lib/api';
import { ProspectStatus } from '../types';

const ProspectList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: prospects, isLoading, error } = useQuery({
    queryKey: ['prospects'],
    queryFn: dealflowApi.getProspects,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ProspectStatus }) => dealflowApi.updateProspectStatus(id, status),
    onMutate: async (newStatus) => {
      // Optimistic Update
      await queryClient.cancelQueries({ queryKey: ['prospects'] });
      const previousProspects = queryClient.getQueryData(['prospects']);
      queryClient.setQueryData(['prospects'], (old: any) => 
        old?.map((p: any) => p.id === newStatus.id ? { ...p, status: newStatus.status } : p)
      );
      return { previousProspects };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['prospects'] });
    }
  });

  if (isLoading) return <div className="space-y-6 animate-pulse p-8">
    <div className="h-20 bg-white rounded-3xl w-full"></div>
    <div className="h-64 bg-white rounded-3xl w-full"></div>
  </div>;

  return (
    <div className="animate-in fade-in duration-700 space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Prospect Intelligence</h1>
          <p className="text-sm font-bold text-slate-400">Decision-ready insights for {prospects?.length} records.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
            IMPORT DATA
          </button>
          <button className="px-6 py-3 bg-[#86c232] text-white rounded-2xl text-xs font-black shadow-lg shadow-green-100 hover:bg-green-600 transition-all">
            + ADD PROSPECT
          </button>
        </div>
      </header>

      {/* Senior Table implementation */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50 bg-slate-50/30">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prospect</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Score</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue Impact</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {prospects?.map((p) => (
              <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-sm group-hover:bg-white group-hover:shadow-sm transition-all">
                      {p.firstName[0]}{p.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{p.firstName} {p.lastName}</p>
                      <p className="text-[11px] font-bold text-slate-400">{p.company} • {p.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={`inline-block px-3 py-1.5 rounded-xl text-xs font-black ${
                    p.score >= 8 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {p.score}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <select 
                    value={p.status}
                    onChange={(e) => mutation.mutate({ id: p.id, status: e.target.value as any })}
                    className="text-xs font-black bg-slate-100 border-none rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-[#86c232] cursor-pointer"
                  >
                    {['New Lead', 'Contacted', 'Qualified', 'Meeting Scheduled', 'Opportunity', 'Closed Won', 'Disqualified'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-slate-800">${p.revenue?.toLocaleString() || '0'}</p>
                  <p className="text-[10px] font-bold text-slate-400 tracking-tight">Projected Annual</p>
                </td>
                <td className="px-8 py-6">
                  <button className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-800">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProspectList;
