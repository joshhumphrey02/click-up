import { UserRole } from '../types';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  'CEO / Executive': [
    '/',
    '/executive-dashboard',
    '/manager-dashboard',
    '/staff-workspace',
    '/hr-operations',
    '/procurement',
    '/projects',
    '/vendors',
    '/hse',
    '/approvals',
    '/meetings',
    '/communications',
    '/forms-sops',
    '/automations',
    '/integrations',
    '/access-control',
    '/roadmap'
  ],
  'Department Head': [
    '/',
    '/manager-dashboard',
    '/hr-operations',
    '/procurement',
    '/projects',
    '/vendors',
    '/hse',
    '/meetings',
    '/communications',
    '/forms-sops',
    '/roadmap'
  ],
  'Manager': [
    '/',
    '/manager-dashboard',
    '/hr-operations',
    '/procurement',
    '/projects',
    '/vendors',
    '/hse',
    '/meetings',
    '/communications',
    '/forms-sops'
  ],
  'Staff': [
    '/',
    '/staff-workspace',
    '/hse',
    '/meetings',
    '/communications',
    '/forms-sops'
  ],
  'Vendor / External Guest': [
    '/',
    '/vendors',
    '/meetings',
    '/forms-sops'
  ]
};

export interface RoleProfile {
  name: string;
  title: string;
  initials: string;
}

export const getProfileByRole = (role: UserRole): RoleProfile => {
  switch (role) {
    case 'Department Head':
      return { name: 'Ada Okafor', title: 'HR Department Lead', initials: 'AO' };
    case 'Manager':
      return { name: 'Tunde Balogun', title: 'Procurement Manager', initials: 'TB' };
    case 'Staff':
      return { name: 'Chinedu Nwosu', title: 'Electrical Ops Lead', initials: 'CN' };
    case 'Vendor / External Guest':
      return { name: 'Silas Thorne', title: 'Lead Audit Partner', initials: 'ST' };
    case 'CEO / Executive':
    default:
      return { name: 'Daniel Eze', title: 'Chief Executive Officer', initials: 'DE' };
  }
};
