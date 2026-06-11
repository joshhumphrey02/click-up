import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  Users,
  ShoppingCart,
  Layers,
  Truck,
  HeartHandshake,
  Video,
  MessageSquare,
  FileCheck,
  HelpCircle,
  FileText,
  BadgeAlert,
  Gauge,
  TrendingUp,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useCommandCenter } from '../context/CommandCenterContext';
import { ROLE_PERMISSIONS } from '../utils/permissions';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { currentRole } = useCommandCenter();
  const allowedPaths = ROLE_PERMISSIONS[currentRole] || [];

  const getPrimaryCTALink = () => {
    if (allowedPaths.includes('/executive-dashboard')) return '/executive-dashboard';
    if (allowedPaths.includes('/hr-operations')) return '/hr-operations';
    return '/';
  };

  const getPrimaryCTALabel = () => {
    if (allowedPaths.includes('/executive-dashboard')) return 'View Executive Reporting';
    if (allowedPaths.includes('/hr-operations')) return 'Explore Workspace';
    return 'View Active Hub';
  };

  // Summary widgets meeting the requested list
  const summaryCards = [
    { title: '8 Core Operational Systems', val: 'Fully Digitized', desc: 'Active aligned stations for role' },
    { title: 'Department-Specific Workflows', val: 'Tailored Spaces', desc: 'Pre-configured ClickUp folders' },
    { title: 'Automated Approvals', val: 'Routed Queues', desc: 'Instant C-suite delegation logs' },
    { title: 'SOP Digitization', val: 'Forms to Tasks', desc: 'No-code process triggers' },
    { title: 'Executive Dashboards', val: 'Unified Reporting', desc: 'C-suite performance cards' },
    { title: 'Staff Training', val: 'Enablement Kits', desc: 'Zero operational downtime' },
    { title: 'Real-Time Reporting', val: 'Active Analytics', desc: 'Bottleneck tracking widgets' },
    { title: 'Notifications & Escalations', val: 'Auto Handled', desc: 'SLA ticking safety protocols' },
  ];

  const coreSystems = [
    { title: 'HR Operations', icon: Users, desc: 'Onboarding flows, recruitment tracking, leaves, and appraisal systems nested in ClickUp.', route: '/hr-operations', color: 'text-sky-650 bg-sky-50' },
    { title: 'Procurement Workflow', icon: ShoppingCart, desc: 'Requisition forms, evaluations matrix, purchase orders and automatic high-value threshold routes.', route: '/procurement', color: 'text-emerald-650 bg-emerald-50' },
    { title: 'Project Execution Tracker', icon: Layers, desc: 'Live project status, milestone logs, budget tracking and risks registries.', route: '/projects', color: 'text-amber-650 bg-amber-50' },
    { title: 'Vendor Management Portal', icon: Truck, desc: 'Partner onboarding checklists, SLA scoring, contract expiration alerts and External guest views.', route: '/vendors', color: 'text-indigo-650 bg-indigo-50' },
    { title: 'HSE Monitoring', icon: HeartHandshake, desc: 'Incident register checklists, investigations logs, severity matrices, and automated alerts.', route: '/hse', color: 'text-rose-650 bg-rose-50' },
    { title: 'Executive Approval Centre', icon: FileCheck, desc: 'Decisions pipeline, financial validation trackers, and custom action checkboxes.', route: '/approvals', color: 'text-fuchsia-650 bg-fuchsia-50' },
    { title: 'Virtual Meeting Management', icon: Video, desc: 'Agenda scheduling, platform badges, action tracking checklist, and unified minutes indexes.', route: '/meetings', color: 'text-teal-650 bg-teal-50' },
    { title: 'Interdepartmental Communication', icon: MessageSquare, desc: 'Ticket SLAs, cross-team tasks, responder assignees, and active resolution logs.', route: '/communications', color: 'text-violet-650 bg-violet-50' }
  ];

  const visibleSystems = coreSystems.filter(sys => allowedPaths.includes(sys.route));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 font-sans">
      
      {/* ClickUp Implementation Branding Banner */}
      <div className="text-center space-y-6 max-w-4xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/25 uppercase tracking-wider mx-auto">
          <Sparkles className="h-4 w-4 shrink-0" />
          ClickUp Implementation Simulation & Proposal Blueprint
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          ClickUp Operations Hub
        </h1>
        
        <p className="text-sm md:text-md text-slate-505 leading-relaxed max-w-3xl mx-auto font-medium">
          A centralized ClickUp operations platform to digitize workflows, automate approvals, and maintain real-time tracking across all key departments.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <Button variant="primary" size="lg" className="gap-2 shadow-md cursor-pointer" onClick={() => navigate(getPrimaryCTALink())}>
            {getPrimaryCTALabel()} <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="cursor-pointer" onClick={() => navigate('/architecture')}>
            View Workspace Architecture
          </Button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
        {summaryCards.map((card, idx) => (
          <Card key={idx} className="border-b-2 border-b-purple-500 hover:shadow-md transition bg-white">
            <CardContent className="p-4 flex flex-col justify-between h-full min-h-[110px]">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 leading-tight">{card.title}</p>
                <h3 className="text-sm font-bold text-slate-850">{card.val}</h3>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Understanding Requirements section */}
      <div className="mt-20 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-3 border-b border-slate-100 pb-3">
          <HelpCircle className="h-5 w-5 text-purple-600" />
          Understanding the Client’s Requirement
        </h2>
        <p className="text-xs text-slate-650 leading-relaxed font-semibold">
          The organization wants to move from manual, fragmented processes into a centralized operating environment where requests, approvals, SOPs, meetings, compliance, and reporting are structured, measurable, and traceable. Implementing ClickUp Operations Hub achieves exact compliance, speeds up delivery, digitizes SOP chains, and ensures instant, visual accountability for executives and personnel.
        </p>
      </div>

      {/* Manual vs Digital Transformation Comparison */}
      <div className="mt-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">The ClickUp Process Transformation</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Transitioning from friction into structured accountability</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Legacy Manual Processes */}
          <div className="bg-rose-50/50 border border-rose-250 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold mb-4 uppercase text-xs tracking-wider border-b border-rose-200/40 pb-2">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <h3>Manual & Fragmented Process</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 font-bold">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 mt-0.5">✕</span>
                <span><strong className="text-slate-850">Disconnected Emails:</strong> Requests are lost in unstructured inboxes with zero history logs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 mt-0.5">✕</span>
                <span><strong className="text-slate-850">Messy Spreadsheets:</strong> Multiple departments operate out of outdated, desynced xls workbooks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 mt-0.5">✕</span>
                <span><strong className="text-slate-850">Paper Forms & SOPs:</strong> Approvals require physical paperwork and printouts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 mt-0.5">✕</span>
                <span><strong className="text-slate-850">Verbal Follow-ups:</strong> Tracking requires active calling and memory without deadlines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 mt-0.5">✕</span>
                <span><strong className="text-slate-850">Delayed Approvals:</strong> Financial decisions stall because executives lack visibility.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 mt-0.5">✕</span>
                <span><strong className="text-slate-850">Weak Audit Trail:</strong> No historic records show who approved, when, and matching SOP compliance.</span>
              </li>
            </ul>
          </div>

          {/* Centralized Digital ClickUp Flow */}
          <div className="bg-emerald-50/20 border border-emerald-250 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold mb-4 uppercase text-xs tracking-wider border-b border-emerald-200/40 pb-2">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <h3>Digital ClickUp Workplace Flow</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-650 font-bold">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span><strong className="text-slate-900">Forms Create Tasks Automatically:</strong> Intakes instantly feed customized board rows.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span><strong className="text-slate-900">Tasks Follow Predefined Statuses:</strong> Real-time stage progressions mapped out.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span><strong className="text-slate-900">Approvals Route Electronically:</strong> Automated tiers flag correct executive decision makers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span><strong className="text-slate-900">Automatic On-Time Notifications:</strong> Triggers prevent overdues and push escalations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span><strong className="text-slate-900">Real-Time Performance Dashboard:</strong> Widgets outline cycle times, spending, and pending lines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span><strong className="text-slate-900">SOP Integration:</strong> Form links enforce exact legal compliance steps recursively.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Spaces Selector Grid */}
      <div className="mt-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Your Operational Stations ({visibleSystems.length} Active Spaces)
          </h2>
          <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">
            Simulate ClickUp Spaces configured for department workflows below
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleSystems.map((sys, idx) => {
            const IconComp = sys.icon;
            return (
              <Card
                key={idx}
                id={`module-card-${idx}`}
                onClick={() => navigate(sys.route)}
                className="hover:-translate-y-1 hover:border-purple-400 cursor-pointer transition bg-white"
              >
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className={`p-2.5 rounded-lg w-fit mb-4 ${sys.color}`}>
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">{sys.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-semibold">{sys.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-[10px] font-extrabold text-[#7C3AED] uppercase tracking-wider">
                    Configure Space <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Home;
