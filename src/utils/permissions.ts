import { UserRole } from '../types';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  'Executive Management': [
    '/',
    '/architecture',
    '/hr-operations',
    '/procurement',
    '/projects',
    '/vendors',
    '/hse',
    '/approvals',
    '/meetings',
    '/communications',
    '/automations',
    '/executive-dashboard',
    '/forms-sops',
    '/training',
    '/roadmap',
    '/integrations'
  ],
  'Department Manager': [
    '/',
    '/architecture',
    '/hr-operations',
    '/procurement',
    '/projects',
    '/vendors',
    '/hse',
    '/meetings',
    '/communications',
    '/automations',
    '/forms-sops',
    '/training',
    '/roadmap',
    '/integrations'
  ],
  'End User': [
    '/',
    '/projects',
    '/hse',
    '/meetings',
    '/communications',
    '/forms-sops'
  ],
  'Vendor Guest': [
    '/',
    '/vendors',
    '/meetings',
    '/forms-sops'
  ],
  'System Administrator': [
    '/',
    '/architecture',
    '/automations',
    '/executive-dashboard',
    '/training',
    '/roadmap',
    '/integrations'
  ]
};

export interface RoleProfile {
  name: string;
  title: string;
  initials: string;
  badge: string;
}

export const getProfileByRole = (role: UserRole): RoleProfile => {
  switch (role) {
    case 'Department Manager':
      return { 
        name: 'Ada Okafor', 
        title: 'Operations & HR Lead', 
        initials: 'AO',
        badge: 'HOD Clearance'
      };
    case 'End User':
      return { 
        name: 'Chinedu Nwosu', 
        title: 'Operational Staff Specialist', 
        initials: 'CN',
        badge: 'Staff Access'
      };
    case 'Vendor Guest':
      return { 
        name: 'Silas Thorne', 
        title: 'Lead Contractor Auditing', 
        initials: 'ST',
        badge: 'External Guest Access'
      };
    case 'System Administrator':
      return { 
        name: 'Alex Mercer', 
        title: 'ClickUp Workspace Admin', 
        initials: 'AM',
        badge: 'Workspace Superuser'
      };
    case 'Executive Management':
    default:
      return { 
        name: 'Daniel Eze', 
        title: 'Chief Executive Officer', 
        initials: 'DE',
        badge: 'C-Suite Administrator'
      };
  }
};
