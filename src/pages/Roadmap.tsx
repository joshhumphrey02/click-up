import React, { useState } from 'react';
import { toast as sonnerToast } from 'sonner';
import {
  CalendarDays,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  CircleDot,
  Layers,
  ChevronRight,
  Users2,
  FileCheck2,
  Settings2,
  ShieldCheck,
  Zap,
  BookmarkCheck,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface MilestonePhase {
  phaseNum: number;
  weeksLabel: string;
  title: string;
  duration: string;
  focus: string;
  status: 'In Progress' | 'Completed' | 'Upcoming';
  readinessPercentage: number;
  milestones: { desc: string; complete: boolean }[];
  adoptionIndicator: string;
}

export const Roadmap: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  // toast managed via sonner

  // 10-Week Proposal Phases
  const phasesList: MilestonePhase[] = [
    {
      phaseNum: 1,
      weeksLabel: 'Weeks 1-2',
      title: 'Workspace Architecture & Custom Fields Setup',
      duration: '10 Days',
      focus: 'Define standard organizational schemas, custom hierarchy layers (Spaces, Folders, Lists), custom column formats, and secure permission structures.',
      status: 'Completed',
      readinessPercentage: 100,
      adoptionIndicator: 'HODs aligned on Space-Folder-List nomenclature schemas.',
      milestones: [
        { desc: 'Audit manual spreadsheet columns & legacy registers', complete: true },
        { desc: 'Configure standard Workspace custom fields formats', complete: true },
        { desc: 'Map Role-Based Permissions access profiles', complete: true },
        { desc: 'Provision development test instances on Cloud', complete: true }
      ]
    },
    {
      phaseNum: 2,
      weeksLabel: 'Weeks 3-4',
      title: 'Active Operational Spaces Deployment & SOP Ingestion',
      duration: '14 Days',
      focus: 'Configure core ClickUp spaces (HR Operations, Procurement, Projects, Vendor, HSE), and digitize policy SOP templates under core Lists.',
      status: 'In Progress',
      readinessPercentage: 80,
      adoptionIndicator: 'HR & Projects teams successfully piloting first-generation digital intake boards.',
      milestones: [
        { desc: 'Create default Kanban columns & active task registers', complete: true },
        { desc: 'Populate the interactive HSE severity incident registers', complete: true },
        { desc: 'Consolidate historic SOP documents into digitized policies', complete: true },
        { desc: 'Sync external vendor portfolio structures and directories', complete: false }
      ]
    },
    {
      phaseNum: 3,
      weeksLabel: 'Weeks 5-6',
      title: 'Workflow Automation, SLA & Notification Matrix',
      duration: '12 Days',
      focus: 'Code custom automatic routing recipes, SLA compliance warnings, and SMS trigger dispatch channels.',
      status: 'Upcoming',
      readinessPercentage: 0,
      adoptionIndicator: 'Automated ₦10M threshold routing bypass triggers mapped in dry-runs.',
      milestones: [
        { desc: 'Establish escalation triggers for overdue SLA dockets', complete: false },
        { desc: 'Connect Twilio direct SMS channels for HSE safety hazards', complete: false },
        { desc: 'Program automated checklist generation rules', complete: false }
      ]
    },
    {
      phaseNum: 4,
      weeksLabel: 'Weeks 7-8',
      title: 'Pilot Test, Dry Run & Executive Approvals Validation',
      duration: '14 Days',
      focus: 'Execute concurrent simulated operations tests across HR, Procurement, and HSE units to validate structural safety.',
      status: 'Upcoming',
      readinessPercentage: 0,
      adoptionIndicator: 'Board directors complete mock approvals on sample dockets.',
      milestones: [
        { desc: 'Run end-to-end purchasing request to PO transformations', complete: false },
        { desc: 'Test joint-venture committee decision logs sync speed', complete: false },
        { desc: 'Measure system average response SLA duration indices', complete: false }
      ]
    },
    {
      phaseNum: 5,
      weeksLabel: 'Weeks 9-10',
      title: 'Live Cutover, User Training & Change Management',
      duration: '14 Days',
      focus: 'Publish Q2 training schedule, launch onboarding video playbooks, de-commission legacy paper books and shift entire group to production.',
      status: 'Upcoming',
      readinessPercentage: 0,
      adoptionIndicator: 'Group-ready adoption milestone checked by executive director command office.',
      milestones: [
        { desc: 'Publish video tutorials and visual adoption playbooks', complete: false },
        { desc: 'Establish Live Helpdesk support channel inside workspace', complete: false },
        { desc: 'Decommission all physical paper/loose spreadsheet logs', complete: false }
      ]
    }
  ];

  const triggerToast = (msg: string) => {
    if (msg.toLowerCase().includes('error') || msg.toLowerCase().includes('fail')) {
      sonnerToast.error(msg);
    } else {
      sonnerToast.success(msg);
    }
  };

  const activePhaseData = phasesList.find(p => p.phaseNum === selectedPhase) || phasesList[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-slate-705">
      
      {/* Toast notifications processed by sonner */}

      {/* Hero Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-105 bg-purple-200 text-[#7C3AED] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Workspace: DEPLOYMENT-PLAN
          </span>
          <h2 className="text-xl font-black text-slate-905 mt-2">Implementation Timeline</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Chronological 10-week roadmap detailing implementation phases, deployment targets, and milestones.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <Badge variant="emerald">Live Tracking Enabled</Badge>
        </div>
      </div>

      {/* Deployment KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 select-none animate-fade-in">
        <StatCard
          icon={CalendarDays}
          value="10 Weeks"
          label="SOP Deployment Lifecycle"
          description="Total implementation roadmap scale"
          variant="indigo"
        />
        <StatCard
          icon={Clock}
          value="Phase 2 Active"
          label="Deployment Milestone"
          description="Focus: Space deployment & setup"
          variant="amber"
        />
        <StatCard
          icon={Award}
          value="25% Completed"
          label="Total Workspace Integration"
          description="On schedule to meet parameters"
          variant="emerald"
        />
        <StatCard
          icon={TrendingUp}
          value="98.4% On-time"
          label="Roadmap Quality index"
          description="Evaluated weekly against plan"
          variant="blue"
        />
      </div>

      {/* HORIZONTAL ROADMAP PHASES TIMELINE GRID */}
      <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl select-none">
        <span className="text-[9px] uppercase font-black text-slate-400 block mb-3.5 tracking-wider">Implementation Phase Track</span>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {phasesList.map(p => {
            const isSelected = p.phaseNum === selectedPhase;
            return (
              <button
                key={p.phaseNum}
                onClick={() => { setSelectedPhase(p.phaseNum); triggerToast(`Inspecting: Phase ${p.phaseNum} details`); }}
                className={`text-left p-4 rounded-xl border font-bold text-xs leading-snug transition-all duration-150 cursor-pointer ${
                  isSelected ? 'bg-white border-[#7C3AED] ring-2 ring-[#7C3AED]/10 shadow-xs' : 'bg-white border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex justify-between items-center text-[9px] uppercase text-slate-400">
                  <span>Phase {p.phaseNum}</span>
                  <Badge variant={p.status === 'Completed' ? 'green' : p.status === 'In Progress' ? 'amber' : 'gray'}>
                    {p.status.toUpperCase()}
                  </Badge>
                </div>
                
                <h4 className="text-slate-905 font-black mt-2 truncate text-xs" title={p.title}>{p.title}</h4>
                <p className="text-[10px] text-indigo-700 font-extrabold mt-1.5">{p.weeksLabel} ({p.duration})</p>
                
                {/* Visual completion bar inside timelines page */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-200" style={{ width: `${p.readinessPercentage}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE ACTIVE PHASE SPECIFICATION SHEET */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Detail sheet overview and tasks list (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          {activePhaseData ? (
            <Card className="bg-white border border-slate-205">
              <CardHeader className="bg-slate-50 p-4 border-b border-slate-100 flex flex-row items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">PROJECT DETAILED RUNBOOK SHEET</span>
                  <CardTitle className="text-sm font-black text-slate-950 mt-1">Phase {activePhaseData.phaseNum}: {activePhaseData.title}</CardTitle>
                </div>
                <Badge variant="indigo">{activePhaseData.weeksLabel}</Badge>
              </CardHeader>

              <CardContent className="p-5 space-y-5 font-bold text-xs leading-normal select-none">
                
                <div>
                  <span className="text-[9px] uppercase tracking-wide font-black text-slate-450 block mb-1">Strategic Objective</span>
                  <p className="text-[11.5px] text-slate-705 leading-relaxed font-semibold">{activePhaseData.focus}</p>
                </div>

                {/* Subtask list */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-[10px] uppercase font-black text-[#7C3AED] block mb-1.5">Actionable Deployment Milestone Checkpoints:</span>
                  
                  <div className="space-y-2.5">
                    {activePhaseData.milestones.map((mil, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 border border-slate-150 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition flex justify-between items-center text-xs font-bold leading-normal ${
                          mil.complete ? 'text-slate-405 italic' : 'text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle className={`h-4.5 w-4.5 shrink-0 ${mil.complete ? 'text-emerald-600' : 'text-slate-300'}`} />
                          <span className={mil.complete ? 'line-through text-slate-450 font-medium' : ''}>{mil.desc}</span>
                        </div>
                        <Badge variant={mil.complete ? 'green' : 'gray'}>
                          {mil.complete ? 'CONCLUDED' : 'DOCKET PENDING'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Adoption Check Indicator widget inside phase sheet */}
                <div className="bg-indigo-50/20 border border-indigo-100 p-4 rounded-xl flex gap-3.5 items-start">
                  <BookmarkCheck className="h-5.5 w-5.5 text-indigo-700 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="text-[10px] uppercase font-black text-indigo-705 block mb-0.5">Adoption Readiness Check:</span>
                    <p className="text-[11px] text-slate-655 font-semibold leading-relaxed">
                      {activePhaseData.adoptionIndicator}
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          ) : (
            <div className="text-center p-12 text-slate-400 italic">No phase record selected.</div>
          )}
        </div>

        {/* Small secondary sidebar metrics (4/12) */}
        <div className="lg:col-span-4 space-y-4">
          
          <Card className="bg-white border border-slate-200">
            <CardHeader className="bg-slate-50/50 p-4 border-b border-slate-100">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Governance</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 font-semibold text-xs leading-relaxed select-none">
              
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <strong>Staging Audits</strong>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Staging phase audits verified.</p>
              </div>

              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100">
                <strong>Compliance Check</strong>
                <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">ISO authorizations synced.</p>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-yellow-50/30 border border-yellow-200 text-yellow-800 p-4 rounded-xl relative space-y-2 font-bold text-xs">
            <AlertCircle className="h-4.5 w-4.5 text-amber-600 animate-pulse" />
            <strong>Critical Path Alert</strong>
            <p className="text-[10px] text-slate-505 font-semibold leading-relaxed">
              Delays in Vendor Portal document checks will impact the Procurement live launch timeline.
            </p>
          </Card>

        </div>

      </div>

    </div>
  );
};

export default Roadmap;
