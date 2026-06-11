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
  FileCheck
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
    if (allowedPaths.includes('/manager-dashboard')) return '/manager-dashboard';
    if (allowedPaths.includes('/staff-workspace')) return '/staff-workspace';
    if (allowedPaths.includes('/vendors')) return '/vendors';
    return '/';
  };

  const getPrimaryCTALabel = () => {
    if (allowedPaths.includes('/executive-dashboard')) return 'View Executive Dashboard';
    if (allowedPaths.includes('/manager-dashboard')) return 'View Manager Dashboard';
    if (allowedPaths.includes('/staff-workspace')) return 'View Staff Workspace';
    if (allowedPaths.includes('/vendors')) return 'View Vendor Portal';
    return 'View Active Hub';
  };

  const kpis = [
    { label: 'Core Operations Systems', val: `${currentRole === 'CEO / Executive' ? '8 Systems' : `${allowedPaths.filter(p => p !== '/' && !p.includes('dashboard') && !p.includes('workspace') && !p.includes('access') && !p.includes('roadmap') && !p.includes('automation') && !p.includes('integration')).length} Systems`}`, desc: 'Active aligned stations for role' },
    { label: 'Automations Engine', val: '30+ Rules', desc: 'Eliminate duplicate admin overhead' },
    { label: 'Executive Dashboard Tiers', val: '3 Tiers', desc: 'SLA alignment for C-Suite/Dept Heads' },
    { label: 'SOP & Form Digitization', val: '100% Digital', desc: 'Audited, secure submissions' },
    { label: 'Modern Security Architecture', val: 'Role-Based', desc: `Role clearance: ${currentRole}` },
    { label: 'Rapid Prototype Rollout', val: '6–8 Weeks', desc: 'From architecture to launch Day' },
  ];

  const coreSystems = [
    { title: 'HR Operations', icon: Users, desc: 'Central onboarding requests, recruitment pipelines, probation tracking, and leave allocations.', route: '/hr-operations', color: 'text-sky-600 bg-sky-50' },
    { title: 'Procurement Workflow', icon: ShoppingCart, desc: 'Purchase requisition tiers, automated audit limit flags, approval routing, and budget realignments.', route: '/procurement', color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Project Execution', icon: Layers, desc: 'Milestone tracking, budget vs actual visualization, risk level metrics, and contractor RAG status indicators.', route: '/projects', color: 'text-amber-600 bg-amber-50' },
    { title: 'Vendor Management', icon: Truck, desc: 'Direct onboarding, CAC document verification tracker, dispute scoring, and SLA contract expiry dates.', route: '/vendors', color: 'text-indigo-650 bg-indigo-50' },
    { title: 'HSE Monitoring', icon: HeartHandshake, desc: 'Incident register, corrective action close-out dates, risk severity matrix, and automated CEO push alerts.', route: '/hse', color: 'text-rose-650 bg-rose-50' },
    { title: 'Executive Approvals', icon: FileCheck, desc: 'Strategic decision pipeline, impact levels, board paper references, and confirmation action points.', route: '/approvals', color: 'text-fuchsia-600 bg-fuchsia-50' },
    { title: 'Virtual Meetings', icon: Video, desc: 'Integration schedule timers, meeting platform badges, minutes indexation, and decisions tracker logs.', route: '/meetings', color: 'text-teal-600 bg-teal-50' },
    { title: 'Interdepartmental Comms', icon: MessageSquare, desc: 'Cross-team dependencies, ticket SLAs, responder assignees, thread communication histories.', route: '/communications', color: 'text-violet-600 bg-violet-50' }
  ];

  const visibleSystems = coreSystems.filter(sys => allowedPaths.includes(sys.route));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      {/* Hero Header */}
      <div className="text-center space-y-5 max-w-3xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-805 border border-indigo-200">
          <Sparkles className="h-4.5 w-4.5 text-indigo-600" />
          ClickUp Enterprise System Deployment
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Digital Operations Command Center
        </h1>
        
        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
          A centralized, fully automated workspace for HR, Procurement, Project Execution, Vendor Management, HSE Compliance, Executive Approvals, meetings, and interdepartmental communication logs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <Button variant="primary" size="lg" className="gap-2 shadow-md cursor-pointer" onClick={() => navigate(getPrimaryCTALink())}>
            {getPrimaryCTALabel()} <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="cursor-pointer" onClick={() => navigate('/forms-sops')}>
            Explore Forms & SOPs
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="border-b-2 border-b-indigo-900/40 hover:shadow-md transition">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{kpi.label}</p>
                <h3 className="text-xl font-bold text-slate-950">{kpi.val}</h3>
              </div>
              <p className="text-xs text-slate-500 mt-2">{kpi.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Before vs After Transformation Section */}
      <div className="mt-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">The Digital Operations Transformation</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">A modern blueprint replacing legacy administrative friction</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Legacy Before State */}
          <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-6">
            <div className="flex items-center gap-2 text-rose-700 font-bold mb-4">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <h3 className="text-md">Legacy Operations (Dispersed / Manual)</h3>
            </div>
            <ul className="space-y-3.5 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5 font-bold">✕</span>
                Manual PDF approvals, paper-bound SOP structures, and delayed signatures.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5 font-bold">✕</span>
                Fragmented communications on emails, paper memos, or unstructured chats.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5 font-bold">✕</span>
                Zero real-time budget compliance limits or regulatory warnings.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5 font-bold">✕</span>
                Poor visibility on critical health/safety risk matrix incidents.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 mt-0.5 font-bold">✕</span>
                Exceeded SLAs and communication gaps without executive oversight.
              </li>
            </ul>
          </div>

          {/* Connected After State */}
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-6">
            <div className="flex items-center gap-2 text-emerald-800 font-bold mb-4">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <h3 className="text-md">Future Operations Center (Centralized / Standardized)</h3>
            </div>
            <ul className="space-y-3.5 text-xs text-slate-655 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Automated multi-tier routing with instant <strong className="text-slate-900">one-click approval controls</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Centralized, auditable threads with SLA ticking and <strong className="text-slate-900">contextual task linkage</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span><strong className="text-slate-900">Digitized forms & SOP validation</strong> directly mapped into active project queues.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Instant automated escalation mechanisms on <strong className="text-slate-900">safety and budget limits</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Frictionless transition with structured <strong className="text-slate-900">6–8 week transition roadmaps</strong>.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 8 Core Modules Dashboard Grid */}
      <div className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentRole === 'CEO / Executive' ? 'The 8 Core Operational Systems' : `Your Operational Stations (${visibleSystems.length} Aligned)`}
          </h2>
          <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">
            {currentRole === 'CEO / Executive' ? 'Fully functional prototype modules live in left navigation bar' : `Authorized system modules for your active clearance level (${currentRole})`}
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
                className="hover:-translate-y-1 hover:border-indigo-400 transition"
              >
                <CardContent className="p-6">
                  <div className={`p-2.5 rounded-lg w-fit mb-4 ${sys.color}`}>
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{sys.title}</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{sys.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-bold text-indigo-700">
                    Open Station <ArrowRight className="h-3 w-3" />
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
