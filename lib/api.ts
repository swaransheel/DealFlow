
import { Prospect, ProspectStatus, Alert, DailyMetrics } from '../types';

const MOCK_PROSPECTS: Prospect[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@acme.com', company: 'Acme Corp', title: 'CTO', score: 9.2, status: 'Qualified', industry: 'SaaS', lastActivity: '2025-01-05', revenue: 120000, techStack: ['Salesforce', 'AWS'] },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@beta.com', company: 'Beta Inc', title: 'VP Sales', score: 8.7, status: 'Contacted', industry: 'FinTech', lastActivity: '2025-01-06', revenue: 85000, techStack: ['HubSpot'] },
  { id: '3', firstName: 'Alice', lastName: 'Johnson', email: 'alice@gamma.com', company: 'Gamma LLC', title: 'Director of Ops', score: 8.5, status: 'New Lead', industry: 'Healthcare', lastActivity: '2025-01-04', revenue: 45000 },
  { id: '4', firstName: 'Bob', lastName: 'Brown', email: 'bob@delta.com', company: 'Delta Group', title: 'CEO', score: 4.2, status: 'Disqualified', industry: 'Manufacturing', lastActivity: '2025-01-02', revenue: 0 },
  { id: '5', firstName: 'Sarah', lastName: 'Miller', email: 'sarah@epsilon.com', company: 'Epsilon Tech', title: 'Head of Growth', score: 7.9, status: 'Meeting Scheduled', industry: 'E-commerce', lastActivity: '2025-01-05', revenue: 210000 },
  { id: '6', firstName: 'Mike', lastName: 'Ross', email: 'mike@pearson.com', company: 'Pearson Hardman', title: 'Senior Partner', score: 9.8, status: 'Qualified', industry: 'Legal', lastActivity: '2025-01-06', revenue: 500000 },
];

const MOCK_ALERTS: Alert[] = [
  { id: 'a1', type: 'HOT', category: 'Job Change', title: 'CTO Change at Acme', description: 'John Doe recently promoted to CTO. High intent signal.', timestamp: '10 min ago', isReviewed: false },
  { id: 'a2', type: 'HOT', category: 'Funding', title: 'Beta Inc raised $10M', description: 'Series A funding confirmed. New budget available.', timestamp: '1 hour ago', isReviewed: false },
  { id: 'a3', type: 'MEDIUM', category: 'Engagement', title: 'Email Hyper-Engagement', description: 'Sarah Miller opened pricing email 5x.', timestamp: '2 hours ago', isReviewed: false },
];

export const dealflowApi = {
  getProspects: async (): Promise<Prospect[]> => {
    await new Promise(r => setTimeout(r, 800));
    return JSON.parse(localStorage.getItem('dealflow_prospects') || JSON.stringify(MOCK_PROSPECTS));
  },
  
  getAlerts: async (): Promise<Alert[]> => {
    await new Promise(r => setTimeout(r, 400));
    return MOCK_ALERTS;
  },

  getDailyMetrics: async (): Promise<DailyMetrics> => {
    return { calls: 28, emails: 45, meetings: 3, prospects: 12 };
  },

  updateProspectStatus: async (id: string, status: ProspectStatus): Promise<Prospect> => {
    await new Promise(r => setTimeout(r, 400));
    const prospects = await dealflowApi.getProspects();
    const index = prospects.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Prospect not found");
    
    prospects[index].status = status;
    localStorage.setItem('dealflow_prospects', JSON.stringify(prospects));
    return prospects[index];
  }
};
