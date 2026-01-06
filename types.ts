
export enum ProspectStatus {
  NEW = 'New Lead',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  MEETING_SCHEDULED = 'Meeting Scheduled',
  OPPORTUNITY = 'Opportunity',
  CLOSED_WON = 'Closed Won',
  DISQUALIFIED = 'Disqualified'
}

export interface Prospect {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  score: number;
  status: ProspectStatus;
  industry: string;
  lastActivity: string;
  phone?: string;
}

export interface Alert {
  id: string;
  type: 'HOT' | 'MEDIUM' | 'INFO';
  title: string;
  description: string;
  timestamp: string;
  isReviewed: boolean;
}

export interface ActivityMetric {
  label: string;
  value: number;
  target: number;
  icon: string;
}

export enum AppView {
  DASHBOARD = 'dashboard',
  PROSPECTS = 'prospects',
  LISTS = 'lists',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings'
}
