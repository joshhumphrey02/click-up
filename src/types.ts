export type UserRole = 'Executive Management' | 'Department Manager' | 'End User' | 'Vendor Guest' | 'System Administrator';

export interface Task {
  id: string;
  title: string;
  department: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'Under Review' | 'Completed' | 'On Hold';
  dueDate: string;
  owner: string;
  escalationFlag: boolean;
  linkedSopId?: string;
  comments: string[];
}

export interface OnboardingTask {
  id: string;
  name: string;
  position: string;
  department: string;
  status: 'New Request' | 'Under Review' | 'Interview Stage' | 'Offer Sent' | 'Onboarding' | 'Completed';
  startDate: string;
  contractType: 'Full-time' | 'Contract' | 'Consultant';
  employeeId: string;
  probationEnd: string;
  owner: string;
  priority: 'Low' | 'Medium' | 'High';
  approvalStatus: 'Pending' | 'Approved';
}

export interface PurchaseRequest {
  id: string;
  item: string;
  requester: string;
  department: string;
  amount: number;
  budgetCode: string;
  approvalTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  indicator: string;
  managerApproved: boolean;
  financeApproved: boolean;
  execApproved: boolean;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Finance Review' | 'Executive Approval' | 'Approved' | 'Rejected' | 'Ordered' | 'Completed';
  budgetLimitExceeded: boolean;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  owner: string;
  deadline: string;
  completion: number; // percentage
  budgetTotal: number;
  budgetSpent: number;
  riskStatus: 'Red' | 'Amber' | 'Green';
  nextMilestone: string;
  milestones: { title: string; done: boolean }[];
}

export interface Vendor {
  id: string;
  name: string;
  rating: number; // 1-5
  contractEnd: string;
  slaCompliance: number; // percentage
  disputeStatus: 'None' | 'Active Dispute' | 'Resolved';
  email: string;
  category: string;
  docStatus: 'Uploaded' | 'Missing Documents' | 'Verified';
  score: number; // out of 100
}

export interface HSEIncident {
  id: string;
  title: string;
  type: 'Near Miss' | 'Lost Time Injury' | 'Environmental' | 'First Aid' | 'Property Damage';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  correctiveActionOwner: string;
  closeOutDate: string;
  description: string;
  status: 'Open' | 'Escalated' | 'Closed';
  reportedAt: string;
}

export interface ExecutiveApproval {
  id: string;
  category: 'Procurement' | 'HR' | 'HSE' | 'Projects' | 'Strategic Decision' | 'Board Paper';
  impactLevel: 'Medium' | 'High' | 'Critical';
  boardRef: string;
  requester: string;
  department: string;
  dueDate: string;
  status: 'Submitted' | 'Under Review' | 'More Information Needed' | 'Approved' | 'Rejected' | 'Escalated';
  description: string;
}

export interface VirtualMeeting {
  id: string;
  title: string;
  department: string;
  date: string;
  time: string;
  platform: 'Zoom' | 'Google Meet' | 'Microsoft Teams';
  agenda: string;
  attendees: string[];
  actionItems: { id: string; text: string; taskOwner: string; status: 'Pending' | 'Completed' }[];
  decisions: string[];
}

export interface CommunicationRequest {
  id: string;
  title: string;
  sourceDept: string;
  receivingDept: string;
  slaHours: number;
  timeLeftHours: number;
  status: 'New Request' | 'Acknowledged' | 'In Progress' | 'Waiting on Sender' | 'Resolved' | 'Escalated';
  owner: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  lastUpdate: string;
  thread: { sender: string; message: string; date: string }[];
}

export interface DigitizedForm {
  id: string;
  name: string;
  department: string;
  triggeredWorkflow: string;
  approvalRoute: string;
  status: 'Active' | 'Draft';
  fields: { label: string; name: string; type: string; options?: string[]; required: boolean }[];
}

export interface SOPDocument {
  id: string;
  name: string;
  docCode: string;
  department: string;
  content: string;
}
