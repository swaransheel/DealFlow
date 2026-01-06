
import { z } from 'zod';

export const ProspectStatusSchema = z.enum([
  'New Lead',
  'Contacted',
  'Qualified',
  'Meeting Scheduled',
  'Opportunity',
  'Closed Won',
  'Disqualified'
]);

export type ProspectStatus = z.infer<typeof ProspectStatusSchema>;

export const ProspectSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  company: z.string(),
  title: z.string(),
  score: z.number().min(0).max(10),
  status: ProspectStatusSchema,
  industry: z.string(),
  lastActivity: z.string(),
  phone: z.string().optional(),
  revenue: z.number().optional(),
  techStack: z.array(z.string()).optional(),
});

export type Prospect = z.infer<typeof ProspectSchema>;

export interface Alert {
  id: string;
  type: 'HOT' | 'MEDIUM' | 'INFO';
  category: 'Job Change' | 'Funding' | 'Engagement' | 'Tech Update';
  title: string;
  description: string;
  timestamp: string;
  isReviewed: boolean;
}

export interface DailyMetrics {
  calls: number;
  emails: number;
  meetings: number;
  prospects: number;
}

export enum AppView {
  DASHBOARD = 'dashboard',
  PROSPECTS = 'prospects',
  LISTS = 'lists',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings'
}
