import {
  Task,
  OnboardingTask,
  PurchaseRequest,
  Project,
  Vendor,
  HSEIncident,
  ExecutiveApproval,
  VirtualMeeting,
  CommunicationRequest,
  DigitizedForm,
  SOPDocument
} from '../types';

export const initialTasks: Task[] = [
  {
    id: 'TSK-101',
    title: 'Conduct Q2 Fire Drill & Evacuation Review',
    department: 'HSE',
    priority: 'High',
    status: 'Pending',
    dueDate: '2026-06-15',
    owner: 'Maryam Bello',
    escalationFlag: false,
    linkedSopId: 'SOP-HSE-01',
    comments: ['Assigned to local fire wardens.', 'Logistics confirmed with estate management.']
  },
  {
    id: 'TSK-102',
    title: 'Vet Supplier Credentials of Standard Oil Refinery Ltd',
    department: 'Vendor Management',
    priority: 'Medium',
    status: 'Under Review',
    dueDate: '2026-06-18',
    owner: 'Tunde Balogun',
    escalationFlag: false,
    linkedSopId: 'SOP-VND-02',
    comments: ['Pending CAC certification upload.', 'References verified.']
  },
  {
    id: 'TSK-103',
    title: 'Finalize Executive Boardroom Smart Screen PO',
    department: 'Procurement',
    priority: 'Critical',
    status: 'Pending',
    dueDate: '2026-06-12',
    owner: 'Fatima Musa',
    escalationFlag: true,
    linkedSopId: 'SOP-PRO-01',
    comments: ['Overdue by 24h. Escalated automatically to Executive Office.']
  },
  {
    id: 'TSK-104',
    title: 'Draft Project Charter for Lekki Infrastructure Expansion',
    department: 'Projects',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-06-08',
    owner: 'Chinedu Nwosu',
    escalationFlag: false,
    linkedSopId: 'SOP-PRJ-01',
    comments: ['Approved by Client representative.', 'Charter saved in project drive.']
  },
  {
    id: 'TSK-105',
    title: 'Review Staff Onboarding Portal Security Policy',
    department: 'HR',
    priority: 'Medium',
    status: 'On Hold',
    dueDate: '2026-06-25',
    owner: 'Ada Okafor',
    escalationFlag: false,
    comments: ['Awaiting feedback from external cyber audit vendor.']
  }
];

export const initialOnboardingTasks: OnboardingTask[] = [
  {
    id: 'ONB-001',
    name: 'Olumide Awosika',
    position: 'Senior Operations Architect',
    department: 'Projects',
    status: 'Onboarding Started',
    startDate: '2026-06-01',
    contractType: 'Full-time',
    employeeId: 'EMP-0842',
    probationEnd: '2026-09-01',
    owner: 'Ada Okafor',
    priority: 'High',
    approvalStatus: 'Approved'
  },
  {
    id: 'ONB-002',
    name: 'Zainab Yar\'Adua',
    position: 'HSE Compliance Lead',
    department: 'HSE',
    status: 'Interview Scheduled',
    startDate: '2026-07-01',
    contractType: 'Full-time',
    employeeId: 'EMP-PEND-2',
    probationEnd: '2026-10-01',
    owner: 'Maryam Bello',
    priority: 'High',
    approvalStatus: 'Pending'
  },
  {
    id: 'ONB-003',
    name: 'Emeka Okafor',
    position: 'Procurement Strategy Consultant',
    department: 'Procurement',
    status: 'Request Submitted',
    startDate: '2026-06-20',
    contractType: 'Consultant',
    employeeId: 'EMP-0853',
    probationEnd: '2026-08-20',
    owner: 'Tunde Balogun',
    priority: 'Medium',
    approvalStatus: 'Pending'
  },
  {
    id: 'ONB-004',
    name: 'Nneka Ejiofor',
    position: 'Database Administrator',
    department: 'IT Office',
    status: 'Hired',
    startDate: '2026-05-15',
    contractType: 'Contract',
    employeeId: 'EMP-0820',
    probationEnd: '2026-08-15',
    owner: 'Ada Okafor',
    priority: 'Low',
    approvalStatus: 'Approved'
  }
];

export const initialPurchaseRequests: PurchaseRequest[] = [
  {
    id: 'PR-8902',
    item: 'Lekki Phase 2 Site Excavation Heavy Equipment Hire',
    requester: 'Chinedu Nwosu',
    department: 'Projects',
    amount: 14500000, // ₦ 14.5M (Nigerian Naira context)
    budgetCode: 'PRJ-LEKKI-04',
    approvalTier: 'Tier 3',
    indicator: 'Above ₦10M Limit',
    managerApproved: true,
    financeApproved: true,
    execApproved: false,
    status: 'Executive Approval',
    budgetLimitExceeded: true
  },
  {
    id: 'PR-8903',
    item: 'Corporate Headquarters Primary Fiber Optic Line Backup Upgrade',
    requester: 'Ada Okafor',
    department: 'IT Office',
    amount: 4200000, // ₦ 4.2M
    budgetCode: 'CORP-OPS-22',
    approvalTier: 'Tier 2',
    indicator: '₦1M to ₦5M Range',
    managerApproved: true,
    financeApproved: false,
    execApproved: false,
    status: 'Finance Review',
    budgetLimitExceeded: false
  },
  {
    id: 'PR-8904',
    item: 'Stationery and Desktop Consumables Q3 Supply Order',
    requester: 'Chidera Obi',
    department: 'Admin',
    amount: 850000, // ₦ 0.85M
    budgetCode: 'CORP-ADM-01',
    approvalTier: 'Tier 1',
    indicator: 'Within ₦1M Budget',
    managerApproved: false,
    financeApproved: false,
    execApproved: false,
    status: 'Under Review',
    budgetLimitExceeded: false
  },
  {
    id: 'PR-8905',
    item: 'Executive Office Smart Desk and Ergonomic Seating Redesign',
    requester: 'Daniel Eze',
    department: 'Executive Office',
    amount: 21000000, // ₦ 21.0M
    budgetCode: 'EXEC-PRO-02',
    approvalTier: 'Tier 3',
    indicator: 'Above ₦10M Limit',
    managerApproved: true,
    financeApproved: true,
    execApproved: true,
    status: 'Approved',
    budgetLimitExceeded: true
  }
];

export const initialProjects: Project[] = [
  {
    id: 'PRJ-LKI',
    name: 'Lekki Deep Sea Logistics Hub Integration',
    client: 'Lagos Maritime Authority',
    owner: 'Chinedu Nwosu',
    deadline: '2026-10-30',
    completion: 64,
    budgetTotal: 120000000, // ₦ 120M
    budgetSpent: 82000000,
    riskStatus: 'Green',
    nextMilestone: 'Phase 2 Sea-Wall Fortification Sign-off',
    milestones: [
      { title: 'Site Inspection & Soil Survey', done: true },
      { title: 'Piling & Substructure Foundations', done: true },
      { title: 'Sea-Wall Fortification Inspection', done: false },
      { title: 'Port Control Room Digital Setup', done: false }
    ]
  },
  {
    id: 'PRJ-NIG',
    name: 'Niger Bridge Safety Monitoring Telemetry',
    client: 'Federal Ministry of Works',
    owner: 'Chinedu Nwosu',
    deadline: '2026-07-24',
    completion: 35,
    budgetTotal: 45000000, // ₦ 45M
    budgetSpent: 18000000,
    riskStatus: 'Amber',
    nextMilestone: 'Sensor array delivery from international vendors',
    milestones: [
      { title: 'Geological sensor location mapping', done: true },
      { title: 'Deliver sensory telemetry array', done: false },
      { title: 'Integration with central executive cloud board', done: false }
    ]
  },
  {
    id: 'PRJ-IKY',
    name: 'Ikoyi Smart Substation Control Grid',
    client: 'Eko Electricity Distribution',
    owner: 'Toni Alabi',
    deadline: '2026-05-15',
    completion: 95,
    budgetTotal: 85000000, // ₦ 85M
    budgetSpent: 89000000, // Over budget
    riskStatus: 'Red',
    nextMilestone: 'Safety testing and grid synchronized energized run',
    milestones: [
      { title: 'Substation civil concrete chamber casing', done: true },
      { title: 'Control panel wiring & network setup', done: true },
      { title: 'Transformers load balancing', done: true },
      { title: 'Safety testing & grid synchronization', done: false }
    ]
  }
];

export const initialVendors: Vendor[] = [
  {
    id: 'VND-001',
    name: 'A-Z Civil Construction Services',
    rating: 4.8,
    contractEnd: '2026-12-31',
    slaCompliance: 97,
    disputeStatus: 'None',
    email: 'info@azconstruction.ng',
    category: 'Civil & Engineering',
    docStatus: 'Verified',
    score: 93
  },
  {
    id: 'VND-002',
    name: 'Standard Fuel & Oil Refiners Nig. Ltd',
    rating: 4.2,
    contractEnd: '2026-08-15',
    slaCompliance: 86,
    disputeStatus: 'Active Dispute',
    email: 'disputes@standardrefinery.ng',
    category: 'Heavy Machinery & Fuel Logistics',
    docStatus: 'Verified',
    score: 79
  },
  {
    id: 'VND-003',
    name: 'Prime Digital Systems West Africa',
    rating: 3.5,
    contractEnd: '2026-06-30',
    slaCompliance: 74,
    disputeStatus: 'None',
    email: 'ops@primedigital.ng',
    category: 'IT Hardware & Telecom Integrations',
    docStatus: 'Missing Documents',
    score: 65
  },
  {
    id: 'VND-004',
    name: 'Safety Guard Equipment Group',
    rating: 4.9,
    contractEnd: '2027-02-28',
    slaCompliance: 99,
    disputeStatus: 'None',
    email: 'supplies@safetyguard.com',
    category: 'HSE Safety Wear & Instrumentation',
    docStatus: 'Verified',
    score: 98
  }
];

export const initialHseIncidents: HSEIncident[] = [
  {
    id: 'INC-201',
    title: 'Minor Hydraulic Oil Spill during Lekki Dock Excavation',
    type: 'Environmental',
    riskLevel: 'Medium',
    location: 'Lekki Deep Sea Logistics Hub (Dock-4A)',
    correctiveActionOwner: 'Maryam Bello',
    closeOutDate: '2026-06-12',
    description: 'During soil shifting, hydraulic hose leaked, spilling roughly 3 liters of oil. Spillage containment kit deployed successfully.',
    status: 'Open',
    reportedAt: '2026-06-08T09:12:00Z'
  },
  {
    id: 'INC-202',
    title: 'Critical Electrical Current Surge in Switchboard-B',
    type: 'Property Damage',
    riskLevel: 'Critical',
    location: 'Ikoyi Smart Substation Site',
    correctiveActionOwner: 'Toni Alabi',
    closeOutDate: '2026-06-11',
    description: 'Incoming line voltage surged by 30%, blowing fuses in distribution panel and tripping active load breaker. Automatic email dispatched.',
    status: 'Escalated',
    reportedAt: '2026-06-09T14:45:00Z'
  },
  {
    id: 'INC-203',
    title: 'Near-miss scaffold plank slippage during inspection',
    type: 'Near Miss',
    riskLevel: 'Low',
    location: 'Niger Bridge Safety Monitoring Site',
    correctiveActionOwner: 'Ibrahim Danladi',
    closeOutDate: '2026-06-05',
    description: 'Plank shifted during setup; inspector secured with safety harness and did not fall. All site managers reminded to double-tie.',
    status: 'Closed',
    reportedAt: '2026-06-04T11:00:00Z'
  }
];

export const initialExecutiveApprovals: ExecutiveApproval[] = [
  {
    id: 'EXE-301',
    category: 'Procurement',
    impactLevel: 'Critical',
    boardRef: 'BRD-2026-PRK-34',
    requester: 'Chinedu Nwosu',
    department: 'Projects',
    dueDate: '2026-06-12',
    status: 'Submitted',
    description: 'Approval of ₦14.5M purchase order for Lekki Phase 2 Site Excavation Heavy Equipment Hire.'
  },
  {
    id: 'EXE-302',
    category: 'HR',
    impactLevel: 'High',
    boardRef: 'BRD-2026-HR-11',
    requester: 'Ada Okafor',
    department: 'HR Operations',
    dueDate: '2026-06-15',
    status: 'Under Review',
    description: 'Authorized addition of 4 junior compliance staff slots to HSE department to match current Lagos Port workload.'
  },
  {
    id: 'EXE-303',
    category: 'Strategic Decision',
    impactLevel: 'Critical',
    boardRef: 'BRD-2026-STRAT-01',
    requester: 'Daniel Eze',
    department: 'Executive Office',
    dueDate: '2026-06-20',
    status: 'More Information Needed',
    description: 'Proposed joint venture partnership with Zenith Maritime Port Ops for Lekki logistics operations. Awaiting audit report.'
  },
  {
    id: 'EXE-304',
    category: 'Board Paper',
    impactLevel: 'High',
    boardRef: 'BRD-2026-PAPER-19',
    requester: 'Fatima Musa',
    department: 'Finance',
    dueDate: '2026-06-25',
    status: 'Submitted',
    description: 'Drafting of the Q2 Integrated Financial Statement submission to the CBN-regulated Advisory Council.'
  }
];

export const initialMeetings: VirtualMeeting[] = [
  {
    id: 'MEET-401',
    title: 'Weekly Executive Interdepartmental Strategy Review',
    department: 'Executive Office',
    date: '2026-06-11',
    time: '10:00 AM',
    platform: 'Zoom',
    agenda: 'Update from Lekki deep sea port progress, audit of active procurement queues, HSE incident escalation review, and validation of digitized standard operating procedures.',
    attendees: ['Daniel Eze (CEO)', 'Ada Okafor (HR)', 'Tunde Balogun (Procure)', 'Maryam Bello (HSE)', 'Chinedu Nwosu (Projects)'],
    actionItems: [
      { id: 'ACT-401a', text: 'Validate physical spillage logs for Dock-4A environmental incident', taskOwner: 'Maryam Bello', status: 'Pending' },
      { id: 'ACT-401b', text: 'Recalculate Eko Substation contingency budget escalation', taskOwner: 'Chinedu Nwosu', status: 'Completed' }
    ],
    decisions: ['Approve standard template for all CAC verification files in the Vendor management system going forward.']
  },
  {
    id: 'MEET-402',
    title: 'HSE Safety & Risk Review - Lagos Port Expansion',
    department: 'HSE',
    date: '2026-06-15',
    time: '02:30 PM',
    platform: 'Google Meet',
    agenda: 'Risk matrix alignment based on new hydraulic spillage container policies & review of site warden compliance.',
    attendees: ['Maryam Bello (HSE)', 'Zainab Yar\'Adua', 'Ibrahim Danladi'],
    actionItems: [
      { id: 'ACT-402a', text: 'Deliver 15 additional containment kits to dock zones A through D', taskOwner: 'Maryam Bello', status: 'Pending' }
    ],
    decisions: ['Implement double-tie scaffold requirements strictly for high elevations.']
  }
];

export const initialCommsRequests: CommunicationRequest[] = [
  {
    id: 'COM-501',
    title: 'Information Request: HSE Onboarding Slot Details',
    sourceDept: 'HR Operations',
    receivingDept: 'HSE',
    slaHours: 48,
    timeLeftHours: 23,
    status: 'In Progress',
    owner: 'Ada Okafor',
    priority: 'Medium',
    lastUpdate: '2026-06-10T12:00:00Z',
    thread: [
      { sender: 'Ada Okafor', message: 'Hello Maryam, is the job description and CAC standard finalized for the Compliance Specialist slot?', date: '2026-06-09T09:30:00Z' },
      { sender: 'Maryam Bello', message: 'Hi Ada, yes! We updated Section 4 to include the certified Safety Inspector training. Attaching details now.', date: '2026-06-10T11:45:00Z' }
    ]
  },
  {
    id: 'COM-502',
    title: 'SLA Escalation: Budget Code Realignment PR-8902',
    sourceDept: 'Projects',
    receivingDept: 'Finance',
    slaHours: 24,
    timeLeftHours: -3, // Overdue by 3h
    status: 'Escalated',
    owner: 'Chinedu Nwosu',
    priority: 'Critical',
    lastUpdate: '2026-06-10T15:00:00Z',
    thread: [
      { sender: 'Chinedu Nwosu', message: 'Budget limit hit on Eko substation code. We need manual override code from Finance Director Fatima immediately to approve emergency equipment lease.', date: '2026-06-10T08:15:00Z' }
    ]
  },
  {
    id: 'COM-503',
    title: 'Inquiry: CAC Verification Status Prime Digital Systems',
    sourceDept: 'Procurement',
    receivingDept: 'Vendor Management',
    slaHours: 72,
    timeLeftHours: 54,
    status: 'Acknowledged',
    owner: 'Tunde Balogun',
    priority: 'Low',
    lastUpdate: '2026-06-10T13:10:00Z',
    thread: [
      { sender: 'Tunde Balogun', message: 'Vendor is complaining that PO is frozen due to verification status. Please confirm document upload status.', date: '2026-06-10T13:10:00Z' }
    ]
  }
];

export const initialDigitizedForms: DigitizedForm[] = [
  {
    id: 'FORM-01',
    name: 'Staff Recruitment & Requisition Request',
    department: 'HR Operations',
    triggeredWorkflow: 'HR Onboarding Workflow Pipeline',
    approvalRoute: 'HOD Approval -> Finance Review -> Executive Director Approves',
    status: 'Active',
    fields: [
      { label: 'Role Title', name: 'roleTitle', type: 'text', required: true },
      { label: 'Estimated Monthly Salary Band (₦)', name: 'salary', type: 'select', options: ['500,000 - 1,000,000', '1,000,000 - 2,000,000', '2,000,000+'], required: true },
      { label: 'Target Onboarding Date', name: 'targetDate', type: 'date', required: true },
      { label: 'Contract Modality', name: 'modality', type: 'select', options: ['Full-time', 'Contract', 'Consultancy'], required: true },
      { label: 'Justification & Org Impact Notes', name: 'justification', type: 'textarea', required: true }
    ]
  },
  {
    id: 'FORM-02',
    name: 'Purchase Requisition Submission',
    department: 'Procurement',
    triggeredWorkflow: 'Procurement Approval Tier Routing',
    approvalRoute: 'Unit Head -> Finance Director -> CEO Command Sign-off',
    status: 'Active',
    fields: [
      { label: 'Requested Item/Service Name', name: 'itemName', type: 'text', required: true },
      { label: 'Cost Amount (₦)', name: 'amount', type: 'number', required: true },
      { label: 'Budget Allocation Code', name: 'budgetCode', type: 'select', options: ['PRJ-LEKKI-04', 'CORP-OPS-22', 'CORP-ADM-01', 'EXEC-PRO-02'], required: true },
      { label: 'Sponsor Department', name: 'department', type: 'text', required: true },
      { label: 'Justification/SOP Associated Code', name: 'sopLinked', type: 'text', required: false }
    ]
  },
  {
    id: 'FORM-03',
    name: 'HSE Safety Hazard & Incident Report',
    department: 'HSE',
    triggeredWorkflow: 'Safety Action, Risk Severity Routing & Emergency Callout',
    approvalRoute: 'HSE Field Officer -> HSE Director (Maryam) -> Executive Escalation (Critical)',
    status: 'Active',
    fields: [
      { label: 'Incident Title/Brief', name: 'incidentTitle', type: 'text', required: true },
      { label: 'Safety Severity Rating', name: 'riskLevel', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'], required: true },
      { label: 'Site Location Description', name: 'location', type: 'text', required: true },
      { label: 'Type of Safety Breach', name: 'incidentType', type: 'select', options: ['Near Miss', 'Lost Time Injury', 'Environmental', 'Property Damage'], required: true },
      { label: 'Full Chronological Observation', name: 'description', type: 'textarea', required: true }
    ]
  },
  {
    id: 'FORM-04',
    name: 'Executive Board Paper Submission Memo',
    department: 'Executive Office',
    triggeredWorkflow: 'Board Secretariat Advisory Pipeline',
    approvalRoute: 'Head Secretariat -> MD/CEO (Daniel) -> Board Chairman Audit',
    status: 'Active',
    fields: [
      { label: 'Board Ref Code', name: 'refCode', type: 'text', required: true },
      { label: 'Strategic Proposal Heading', name: 'title', type: 'text', required: true },
      { label: 'Financial Appropriation Request (₦)', name: 'appropriation', type: 'number', required: false },
      { label: 'Full Executive Memo Body', name: 'body', type: 'textarea', required: true }
    ]
  }
];

export const initialSops: SOPDocument[] = [
  {
    id: 'SOP-HSE-01',
    name: 'HSE Environmental Oil Spillage Response Protocol',
    docCode: 'SOP-2026-HSE-V1',
    department: 'HSE',
    content: '1. Identification: Spot oil leakage visual flow. Containment kit deployment within 5 minutes. 2. Isolation: Shut down hydraulic pumps. Place sawdust logs or oil absorption sheets. 3. Logging: Register volume spilled in HSE command logs. 4. Remediation: Dispose of chemical compounds following Eko Municipal guidelines.'
  },
  {
    id: 'SOP-VND-02',
    name: 'CAC & Regulatory Vendor Prequalification Standard',
    docCode: 'SOP-2026-VND-V4',
    department: 'Vendor Management',
    content: '1. Compliance Standard: Every vendor must verify Corporate Affairs Commission (CAC) Cert, Nigeria Federal Inland Revenue Tax Clearance, and 3 Year Audited Financial Log. 2. Audit Rating: Rating score below 60/100 freezes automatic purchase draft creation. Escalation flags rise for Tier-3 vendors.'
  },
  {
    id: 'SOP-PRO-01',
    name: 'Procurement Tier Threshold Delegated Authority rules',
    docCode: 'SOP-2026-PRO-V2',
    department: 'Procurement',
    content: '1. Authorization limits: Value <= ₦1M: Signed by Department Manager. Value between ₦1M and ₦10M: Signed by Department Head & Finance Director. Value > ₦10M: Requires CEO & Executive Command sign-off. 2. Override: Requires Executive Board reference.'
  },
  {
    id: 'SOP-PRJ-01',
    name: 'Project Milestone Tracking & Budget Validation',
    docCode: 'SOP-2026-PRJ-V1',
    department: 'Projects',
    content: '1. Milestone Review: Subcontractor files status. Project manager inspects via site inspection camera. 2. Budget Alert: RAG status changes to Red if project spent rises over 95% of target budget or when deadlines elapse by 14 calendar days.'
  }
];
