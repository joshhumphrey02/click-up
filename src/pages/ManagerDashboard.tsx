import React, { useState } from 'react';
import {
  Users,
  ShoppingCart,
  Layers,
  Truck,
  HeartHandshake,
  FileCheck,
  Video,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  User,
  Clock,
  Activity
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export const ManagerDashboard: React.FC = () => {
  const {
    tasks,
    purchaseRequests,
    onboardingTasks,
    hseIncidents,
    executiveApprovals,
    meetings,
    commsRequests,
    projects,
    vendors
  } = useCommandCenter();

  // Active Tab representing selected Department metrics
  const [activeTab, setActiveTab] = useState<'HR' | 'Procurement' | 'Projects' | 'Vendor' | 'HSE' | 'Executive' | 'Meetings' | 'Comms'>('Projects');

  // Compute metrics dynamically for the selected Department
  const getDepartmentStats = () => {
    switch (activeTab) {
      case 'HR': {
        const deptTasks = tasks.filter(t => t.department === 'HR' || t.department?.includes('HR'));
        const pendingOnboardings = onboardingTasks.filter(o => o.status !== 'Completed').length;
        const total = deptTasks.length;
        const completed = deptTasks.filter(t => t.status === 'Completed').length;
        return {
          title: 'HR Department Dashboard',
          manager: 'Ada Okafor',
          openTasks: deptTasks.filter(t => t.status !== 'Completed').length,
          pendingApprovals: pendingOnboardings,
          overdue: deptTasks.filter(t => t.escalationFlag).length,
          rate: total > 0 ? Math.round((completed / total) * 100) : 80,
          sla: '98.2% Compliance',
          activity: ['Olumide Awosika moved to active onboarding slot', 'Drafted vacancy for junior safety officer']
        };
      }
      case 'Procurement': {
        const deptTasks = tasks.filter(t => t.department === 'Procurement');
        const prCount = purchaseRequests.filter(pr => pr.status !== 'Completed' && pr.status !== 'Approved').length;
        const total = deptTasks.length;
        const completed = deptTasks.filter(t => t.status === 'Completed').length;
        return {
          title: 'Procurement Workflow Dashboard',
          manager: 'Tunde Balogun',
          openTasks: deptTasks.filter(t => t.status !== 'Completed').length,
          pendingApprovals: prCount,
          overdue: purchaseRequests.filter(pr => pr.budgetLimitExceeded).length,
          rate: total > 0 ? Math.round((completed / total) * 100) : 75,
          sla: '94.8% SLA',
          activity: ['PO PR-8902 Excavation submitted to CEO Queue', 'SOP-PRO-01 tier limits realigned']
        };
      }
      case 'Projects': {
        const deptTasks = tasks.filter(t => t.department === 'Projects');
        const activeProjs = projects.length;
        const total = deptTasks.length;
        const completed = deptTasks.filter(t => t.status === 'Completed').length;
        return {
          title: 'Project Engineering Registry',
          manager: 'Chinedu Nwosu',
          openTasks: deptTasks.filter(t => t.status !== 'Completed').length,
          pendingApprovals: activeProjs,
          overdue: projects.filter(p => p.riskStatus === 'Red').length,
          rate: total > 0 ? Math.round((completed / total) * 100) : 64,
          sla: '89.5% Millstone SLA',
          activity: ['Niger Bridge Sensor telemetry array arrived', 'Red Alert updated on Ikoyi Smart Substation']
        };
      }
      case 'Vendor': {
        const deptTasks = tasks.filter(t => t.department?.includes('Vendor'));
        const activeDisputes = vendors.filter(v => v.disputeStatus !== 'None').length;
        const total = deptTasks.length;
        const completed = deptTasks.filter(t => t.status === 'Completed').length;
        return {
          title: 'Vendor Contract & Scorecard Portal',
          manager: 'Tunde Balogun',
          openTasks: deptTasks.filter(t => t.status !== 'Completed').length,
          pendingApprovals: activeDisputes,
          overdue: vendors.filter(v => v.docStatus === 'Missing Documents').length,
          rate: total > 0 ? Math.round((completed / total) * 100) : 90,
          sla: '96.5% Verification SLA',
          activity: ['Prime Digital Systems missing document notifications sent', 'Updated A-Z civil construction score to 93']
        };
      }
      case 'HSE': {
        const deptTasks = tasks.filter(t => t.department === 'HSE');
        const openInc = hseIncidents.filter(i => i.status !== 'Closed').length;
        const total = deptTasks.length;
        const completed = deptTasks.filter(t => t.status === 'Completed').length;
        return {
          title: 'Safety, Health & Compliance Dashboard',
          manager: 'Maryam Bello',
          openTasks: deptTasks.filter(t => t.status !== 'Completed').length,
          pendingApprovals: openInc,
          overdue: hseIncidents.filter(i => i.status === 'Escalated').length,
          rate: total > 0 ? Math.round((completed / total) * 100) : 85,
          sla: '99.8% Incident Action SLA',
          activity: ['Spillage containment kits deployed at Dock-4A', 'Electrical trip logged as critical surge for Ikoyi Substation']
        };
      }
      case 'Executive': {
        const deptTasks = tasks.filter(t => t.department?.includes('Exec'));
        const openEx = executiveApprovals.filter(e => e.status === 'Submitted' || e.status === 'Under Review').length;
        const total = deptTasks.length;
        const completed = deptTasks.filter(t => t.status === 'Completed').length;
        return {
          title: 'Executive & Strategic Governance Board',
          manager: 'Daniel Eze (CEO)',
          openTasks: deptTasks.filter(t => t.status !== 'Completed').length,
          pendingApprovals: openEx,
          overdue: executiveApprovals.filter(e => e.status === 'More Information Needed').length,
          rate: total > 0 ? Math.round((completed / total) * 100) : 95,
          sla: '100% Board SLA',
          activity: ['PR-8905 High-Value Desk remodel completed', ' Zenith Maritime strategic partnership paper reviewed']
        };
      }
      case 'Meetings': {
        const deptTasks = tasks.filter(t => t.department?.includes('Meeting') || t.department?.includes('Exec'));
        const total = deptTasks.length;
        const completed = deptTasks.filter(t => t.status === 'Completed').length;
        return {
          title: 'Calendar & Decisions Administration',
          manager: 'Daniel Eze (CEO)',
          openTasks: deptTasks.filter(t => t.status !== 'Completed').length,
          pendingApprovals: meetings.length,
          overdue: meetings.reduce((acc, m) => acc + m.actionItems.filter(ai => ai.status === 'Pending').length, 0),
          rate: total > 0 ? Math.round((completed / total) * 100) : 88,
          sla: '92% Minutes distribution within 12h',
          activity: ['Weekly Board Strategy minutes compiled', 'Scaffold safety protocols distributed to Niger Bridge site']
        };
      }
      case 'Comms': {
        const totalcomms = commsRequests.length;
        const resolved = commsRequests.filter(c => c.status === 'Resolved').length;
        return {
          title: 'Interdepartmental SLAs & Comms Track',
          manager: 'Administrative Desk',
          openTasks: commsRequests.filter(c => c.status !== 'Resolved').length,
          pendingApprovals: commsRequests.filter(c => c.status === 'New Request').length,
          overdue: commsRequests.filter(c => c.status === 'Escalated').length,
          rate: totalcomms > 0 ? Math.round((resolved / totalcomms) * 100) : 66,
          sla: '87.4% Response SLA',
          activity: ['HR request for compliance especialistas updated', 'Budget override request on PR-8902 escalated to Finance']
        };
      }
    }
  };

  const currentStats = getDepartmentStats();

  const tabsConfig = [
    { key: 'HR', label: 'HR Operations', icon: Users },
    { key: 'Procurement', label: 'Procurement', icon: ShoppingCart },
    { key: 'Projects', label: 'Projects Execution', icon: Layers },
    { key: 'Vendor', label: 'Vendor Management', icon: Truck },
    { key: 'HSE', label: 'HSE Compliance', icon: HeartHandshake },
    { key: 'Executive', label: 'Executive Board', icon: FileCheck },
    { key: 'Meetings', label: 'Strategic Meetings', icon: Video },
    { key: 'Comms', label: 'Cross-Dept Comms', icon: MessageSquare }
  ];

  // Specific Mock team workload distribution for Chinedu's Projects Team (as active example)
  const projectsTeamWorkload = [
    { name: 'Engr. Toni Alabi', role: 'Smart Substation Lead', load: '95% Load', color: 'bg-rose-500', count: 5, status: 'Overloaded' },
    { name: 'Ibrahim Danladi', role: 'Safety Inspector', load: '60% Load', color: 'bg-amber-500', count: 3, status: 'Neutral' },
    { name: 'Chidera Obi', role: 'Site Coordinator', load: '45% Load', color: 'bg-emerald-500', count: 2, status: 'Optimal' },
    { name: 'Tunde Balogun', role: 'Procurement Lead', load: '85% Load', color: 'bg-amber-500', count: 4, status: 'High' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Horizontal Scrollable Tabs Switcher */}
      <div className="flex border-b border-slate-200 overflow-x-auto pb-px">
        {tabsConfig.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? 'border-indigo-900 text-indigo-910 font-bold bg-white rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Header Summary Card */}
      <Card className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-0">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-xs uppercase tracking-widest">
              <Activity className="h-4 w-4 shrink-0" />
              Central Operations Registry
            </div>
            <h2 className="text-xl md:text-2xl font-black mt-1 text-white tracking-tight">{currentStats.title}</h2>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-indigo-300" />
                <strong>Assigned HOD:</strong> {currentStats.manager}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-indigo-300" />
                <strong>SLA Rating:</strong> {currentStats.sla}
              </span>
            </div>
          </div>
          
          <div className="flex items-end gap-2 shrink-0">
            <span className="text-4xl font-black text-indigo-400">{currentStats.rate}%</span>
            <div className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider mb-1">
              Task Closed Rate
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Activity}
          value={currentStats.openTasks}
          label="Open Tasks In-Sprint"
          description="Awaiting staff action & update"
          variant="amber"
        />
        <StatCard
          icon={FileCheck}
          value={currentStats.pendingApprovals}
          label="Pending Queue Bottlenecks"
          description="Requiring immediate department review"
          variant="indigo"
        />
        <StatCard
          icon={AlertTriangle}
          value={currentStats.overdue}
          label="SLA Warnings / Overdues"
          description="Delayed past configured threshold rules"
          variant="rose"
        />
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity List (1/3) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity Footprint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStats.activity.map((act, idx) => (
              <div key={idx} className="flex gap-3 text-xs leading-relaxed border-b border-slate-50 last:border-0 pb-3 h-fit items-start">
                <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 overflow-hidden shrink-0" />
                <div>
                  <p className="text-slate-800 font-medium">{act}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium uppercase">Logged today</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Dynamic Bottleneck / Active Item inspection (2/3) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Workforce Team Output Matrix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-xs text-slate-500 leading-relaxed">
              Tracking resource capabilities and task workload bottlenecks. Alerts appear when workload climbs past 80% with open critical SLA tasks. This allows managers to load balance immediately inside the workspace.
            </p>
            
            <div className="space-y-4 pt-2">
              {projectsTeamWorkload.map((staff, idx) => (
                <div key={idx} className="border border-slate-100 rounded-lg p-4 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{staff.name}</h4>
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-sm">{staff.role}</span>
                    </div>
                    <div className="flex gap-3 text-[10px] text-slate-400 mt-1 font-semibold uppercase">
                      <span>Ref Tasks: {staff.count} assigned</span>
                      <span>SLA: 100% compliant</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-48">
                    <div className="flex-1">
                      <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500 mb-1">
                        <span>Allocated Capacity</span>
                        <span>{staff.load}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${staff.color}`} style={{ width: staff.load }} />
                      </div>
                    </div>
                    <Badge variant={staff.status === 'Overloaded' ? 'red' : staff.status === 'High' ? 'orange' : 'green'}>
                      {staff.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
export default ManagerDashboard;
