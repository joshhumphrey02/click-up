import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Building, 
  Folder, 
  ListTodo, 
  CheckSquare, 
  ChevronsRight, 
  Info, 
  Layers, 
  Database,
  ArrowRight,
  BookOpen,
  ArrowDownWideNarrow,
  Target
} from 'lucide-react';

interface SpaceDetail {
  id: number;
  name: string;
  icon: string;
  folders: {
    name: string;
    lists: string[];
    description: string;
  }[];
  description: string;
  color: string;
}

export const WorkspaceArchitecture: React.FC = () => {
  const [selectedSpaceIdx, setSelectedSpaceIdx] = useState<number>(0);

  const spacesData: SpaceDetail[] = [
    {
      id: 1,
      name: '1. HR Operations System',
      description: 'Centralized ClickUp Space managing recruitments, core personnel management, training logs and exits.',
      icon: '👥',
      color: 'border-l-4 border-l-blue-500',
      folders: [
        {
          name: 'Talent Acquisition',
          description: 'Hiring tracker and onboarding workflows',
          lists: ['Recruitment Requests', 'Candidate Review Pipeline', 'Onboarding Runbooks']
        },
        {
          name: 'Core Personnel Records',
          description: 'Employee metadata and status logs',
          lists: ['Staff Records', 'Exits/Offboarding Checklists']
        },
        {
          name: 'Operations & Performance',
          description: 'Leaves and yearly assessments tracking',
          lists: ['Leave Logs', 'Performance Appraisals']
        }
      ]
    },
    {
      id: 2,
      name: '2. Procurement Workflow System',
      description: 'ClickUp Space containing purchase requests, RFQs, evaluations, purchase orders, and payment escalations.',
      icon: '🛒',
      color: 'border-l-4 border-l-purple-500',
      folders: [
        {
          name: 'Purchasing Requests',
          description: 'Departmental purchase intakes',
          lists: ['Purchase Requests Intake', 'Evaluation Matrix']
        },
        {
          name: 'Tendering & RFQ',
          description: 'Sent quotes and evaluations',
          lists: ['RFQ Dispatches', 'Vendor Evaluation Metrics']
        },
        {
          name: 'Fulfillments & POs',
          description: 'Official purchase orders and billing steps',
          lists: ['Purchase Orders', 'Pending Payments Ledger']
        }
      ]
    },
    {
      id: 3,
      name: '3. Project Execution Tracker',
      description: 'Visual space showing timeline projects categorized by stages and milestones for key accounts.',
      icon: '💼',
      color: 'border-l-4 border-l-amber-500',
      folders: [
        {
          name: 'Project Milestones',
          description: 'Active project alignment benchmarks',
          lists: ['Milestone Boards', 'Resource Allocation Lists', 'Critical Roadmaps']
        },
        {
          name: 'Quality Assurance & Delivery',
          description: 'Risk assessment profiles',
          lists: ['Risk Register', 'Delivery Sign-offs']
        }
      ]
    },
    {
      id: 4,
      name: '4. Vendor Management Portal',
      description: 'Portal managing compliance, ratings, external guest panels, and dispute filings.',
      icon: '🚚',
      color: 'border-l-4 border-l-emerald-500',
      folders: [
        {
          name: 'Vendor Onboarding',
          description: 'New partner verifications and certifications',
          lists: ['Contractor Registration Lists', 'Credential Verifications']
        },
        {
          name: 'Performance & SLA',
          description: 'Objective vendor evaluations',
          lists: ['Monthly Compliance Tracker', 'SLA Scorecards']
        }
      ]
    },
    {
      id: 5,
      name: '5. HSE Monitoring Dashboard',
      description: 'Health, Safety & Environment system for logging incidents, investigations and safety auditing.',
      icon: '⚠️',
      color: 'border-l-4 border-l-rose-500',
      folders: [
        {
          name: 'Emergency & Incident Log',
          description: 'Automated notification and tracking logs',
          lists: ['Incident Master Register', 'Corrective Actions Tracker']
        },
        {
          name: 'Audits & Safety Checks',
          description: 'Compliance scorekeeping',
          lists: ['Compliance Calendars', 'Monthly Site Inspection Logs']
        }
      ]
    },
    {
      id: 6,
      name: '6. Executive Approval Centre',
      description: 'Single interface capturing all approvals (financial, project, HR) that require C-suite reviews.',
      icon: '✅',
      color: 'border-l-4 border-l-indigo-500',
      folders: [
        {
          name: 'Approval Intake Queue',
          description: 'Incoming files matching threshold benchmarks',
          lists: ['High-Impact Decisions Board', 'Pending C-Suite Signature']
        },
        {
          name: 'Decision Archiving',
          description: 'Auditable approvals catalog',
          lists: ['Approved Actions Master', 'Rejected / Feedback Required']
        }
      ]
    },
    {
      id: 7,
      name: '7. Virtual Meeting Management',
      description: 'Workspace space that organizes, calendars, and tracks actions from strategic organizational syncs.',
      icon: '🎥',
      color: 'border-l-4 border-l-teal-500',
      folders: [
        {
          name: 'Strategic Meetings Agenda',
          description: 'Calendars and attendees',
          lists: ['Upcoming Corporate Syncs', 'Historical Transcripts']
        },
        {
          name: 'Post-Meeting Actions',
          description: 'Task assignments tied to ClickUp lists',
          lists: ['Board Action Items Tracker', 'Decisions Log']
        }
      ]
    },
    {
      id: 8,
      name: '8. Interdepartmental Communication Tracker',
      description: 'Tracks requests and SLAs when routing cross-department dependency tickets.',
      icon: '💬',
      color: 'border-l-4 border-l-sky-500',
      folders: [
        {
          name: 'Service Enquiries',
          description: 'Ticketing and team tasks',
          lists: ['Open Service Requests', 'Escalations Bucket']
        },
        {
          name: 'SLA Diagnostics',
          description: 'Bottleneck logs',
          lists: ['Departmental SLA Reports', 'Completed Dispatches']
        }
      ]
    }
  ];

  const currentSpace = spacesData[selectedSpaceIdx];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-sans">
      
      {/* Visual Workspace Hero Banner */}
      <div className="bg-[#001F3F] text-white p-8 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden mb-10">
        <div className="absolute right-0 top-0 opacity-10 translate-x-20 -translate-y-16 scale-150">
          <Database className="w-96 h-96" />
        </div>
        <div className="z-10 relative">
          <span className="bg-blue-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
            ClickUp Implementation Schema
          </span>
          <h1 className="text-2xl font-black mt-3 tracking-tight">Enterprise Workspace Architecture</h1>
          <p className="text-xs text-blue-300 mt-1 max-w-2xl leading-relaxed">
            This blueprint demonstrates how the client organization’s digital operations are structured into ClickUp hierarchical divisions. By nesting processes, tasks can move through unified statuses with absolute accountability.
          </p>
        </div>
      </div>

      {/* Visually descriptive ClickUp Hierarchy Diagram Card */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Hierarchy Overview (Left 4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 mb-4 border-b border-slate-150 pb-2">
              <Layers className="h-4 w-4 text-blue-600" />
              Hierarchical Architecture
            </h3>
            
            {/* Visual Step-Ladder */}
            <div className="relative border-l border-slate-250 ml-3.5 space-y-5 py-2">
              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border border-white flex items-center justify-center text-[8px] text-white font-extrabold shadow-sm">
                  1
                </span>
                <strong className="text-slate-900 text-[11px] uppercase tracking-wider block">Workspace</strong>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight font-medium">ClickUp Platform</p>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#7C3AED] border border-white flex items-center justify-center text-[8px] text-white font-extrabold shadow-sm">
                  2
                </span>
                <strong className="text-slate-900 text-[11px] uppercase tracking-wider block">Spaces</strong>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight font-medium">8 Separate Business Divisions</p>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border border-white flex items-center justify-center text-[8px] text-white font-extrabold shadow-sm">
                  3
                </span>
                <strong className="text-slate-900 text-[11px] uppercase tracking-wider block">Folders</strong>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight font-medium">Specific operational modules</p>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border border-white flex items-center justify-center text-[8px] text-white font-extrabold shadow-sm">
                  4
                </span>
                <strong className="text-slate-900 text-[11px] uppercase tracking-wider block">Lists (Views)</strong>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight font-medium">Taskboards with custom statuses</p>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-600 border border-white flex items-center justify-center text-[8px] text-white font-extrabold shadow-sm">
                  5
                </span>
                <strong className="text-slate-900 text-[11px] uppercase tracking-wider block">Tasks & Subtasks</strong>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight font-medium">Forms become trackable items</p>
              </div>
            </div>

            <div className="mt-6 pt-4 bg-slate-50 border border-slate-150 rounded-lg p-3 text-slate-700 text-[11px] leading-relaxed font-semibold">
              <Info className="h-4 w-4 text-blue-600 inline mr-1.5" />
              Implementing a defined ClickUp framework completely replaces chaotic phone calls, emails, and isolated Excel workbooks.
            </div>
          </div>
        </div>

        {/* Space Folder/List Inspect Panel (Right 8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Space Picker */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
              Select Client Space to Preview Hierarchy:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {spacesData.map((sp, idx) => (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpaceIdx(idx)}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition text-xs font-bold flex items-center gap-2 ${
                    selectedSpaceIdx === idx 
                      ? 'border-blue-600 bg-blue-50/40 text-blue-900 shadow-xs' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span className="text-sm shrink-0">{sp.icon}</span>
                  <span className="truncate leading-tight">{sp.name.split('. ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hierarchy Inspector Card */}
          <Card className={`bg-white border-2 ${currentSpace.color}`}>
            <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between py-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentSpace.icon}</span>
                  <CardTitle className="text-lg font-bold text-slate-900">{currentSpace.name}</CardTitle>
                </div>
                <p className="text-xs text-slate-705 mt-1 font-semibold">{currentSpace.description}</p>
              </div>
              <Badge variant="indigo">Space Scope</Badge>
            </CardHeader>
            <CardContent className="p-6">
              
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-purple-600" />
                Configured Folders & Task Lists
              </div>

              {/* Sub-Folders Block */}
              <div className="space-y-6">
                {currentSpace.folders.map((folder, fIdx) => (
                  <div key={fIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start justify-between border-b border-slate-200/60 pb-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Folder className="h-4.5 w-4.5 text-purple-600" />
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                          Folder: {folder.name}
                        </h4>
                      </div>
                      <span className="text-[10px] text-purple-750 font-bold bg-purple-100/60 px-2 py-0.5 rounded-full">
                        {folder.lists.length} ClickUp Lists
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-505 font-medium mb-3 leading-relaxed">
                      {folder.description}
                    </p>

                    {/* Lists items */}
                    <div className="grid sm:grid-cols-3 gap-2.5">
                      {folder.lists.map((lst, lIdx) => (
                        <div key={lIdx} className="bg-white border border-slate-200 p-2.5 rounded-lg flex items-center gap-2">
                          <ListTodo className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span className="text-[10px] font-bold text-slate-700 leading-tight">
                            List: {lst}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status & Governance Card footer */}
              <div className="mt-6 border-t border-slate-100 pt-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span>Standard Workspace Status:</span>
                  <strong className="text-slate-800">Draft → Submitted → Under Review → Approved → Closed</strong>
                </div>
                <div className="flex items-center gap-1.5 text-blue-800 font-bold bg-blue-50 px-3 py-1.5 rounded-lg">
                  <span>Custom Fields: Status, Assignee, Priority, Watchers, Audit Trail</span>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
};

export default WorkspaceArchitecture;
