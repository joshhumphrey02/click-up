import React, { useState } from 'react';
import { toast as sonnerToast } from 'sonner';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  AlertOctagon,
  Check,
  X,
  RefreshCw,
  FolderKanban,
  Activity,
  Award,
  AlertTriangle,
  Building,
  FileCheck,
  BarChart3,
  HelpCircle,
  Eye,
  Layers,
  Sparkles,
  Users2,
  Timer
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

export const ExecutiveDashboard: React.FC = () => {
  const {
    tasks,
    executiveApprovals,
    projects,
    hseIncidents,
    approveExecutiveApproval,
    rejectExecutiveApproval,
    requestInfoExecutiveApproval,
    currentRole
  } = useCommandCenter();

  // Toast state managed by Sonner

  // Dashboard Tier selector state
  // Tiers: C-Suite Executive Overview, Department Manager Workloads, Team member/Operational view
  const [activeTier, setActiveTier] = useState<'CSuite' | 'Manager' | 'Operational'>('CSuite');

  // Interactive Q&A selection
  const [selectedQuestion, setSelectedQuestion] = useState<string>('q1');

  // Dynamic calculations based on state to show real-time changes
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const activeApprovals = executiveApprovals.filter(e => e.status === 'Submitted' || e.status === 'Under Review');
  const criticalIncidentsCount = hseIncidents.filter(i => i.riskLevel === 'Critical' || i.status === 'Escalated').length;

  const triggerToast = (msg: string) => {
    if (msg.toLowerCase().includes('decline') || msg.toLowerCase().includes('reject') || msg.toLowerCase().includes('error') || msg.toLowerCase().includes('failed')) {
      sonnerToast.error(msg);
    } else {
      sonnerToast.success(msg);
    }
  };

  // Recharts Donut Data (Strategic task completion rate across the tenant)
  const taskDonutData = [
    { name: 'Completed Tasks', value: completedTasks, color: '#10b981' },
    { name: 'Pending Admin State', value: totalTasks - completedTasks, color: '#6366f1' }
  ];

  // Recharts Departmental Bar Chart: Compute count of tasks that are Pending or Under Review per department
  const depts = ['HSE', 'Vendor Management', 'Procurement', 'Projects', 'HR'];
  const departmentTrendData = depts.map(d => {
    const totalDept = tasks.filter(t => t.department === d).length;
    const pendingDept = tasks.filter(t => t.department === d && t.status !== 'Completed').length;
    return {
      name: d,
      Total: totalDept,
      RestingTasks: pendingDept
    };
  });

  // Recharts Spend Vs Budget Line Graph (Procurement)
  const spendData = [
    { month: 'Jan', Spend: 12000000, Budget: 15000000 },
    { month: 'Feb', Spend: 18500000, Budget: 15000000 },
    { month: 'Mar', Spend: 21000000, Budget: 25000000 },
    { month: 'Apr', Spend: 14000000, Budget: 25000000 },
    { month: 'May', Spend: 34000000, Budget: 35000000 },
    { month: 'Jun', Spend: 41054000, Budget: 40000000 }, // Current 
  ];

  // HSE incident velocity over weeks
  const hseIncidentTrend = [
    { week: 'Wk1', incidents: 2, audits: 4 },
    { week: 'Wk2', incidents: 1, audits: 5 },
    { week: 'Wk3', incidents: 3, audits: 3 },
    { week: 'Wk4', incidents: 0, audits: 6 },
    { week: 'Wk5', incidents: 1, audits: 4 }
  ];

  // Business Questions list
  const businessQuestions = [
    {
      id: 'q1',
      question: 'What is our overall task completion rate?',
      answer: `Our overall clickup workspace task completion rate is currently ${completionRate}% (${completedTasks} of ${totalTasks} tasks closed). Standard Q2 operational threshold targets 85% completion. Refactor of projects workflows has boosted this index by 11.4% since last sprint.`,
      icon: Activity
    },
    {
      id: 'q2',
      question: 'Which department is currently the bottleneck?',
      answer: `Based on active workload load calculations, the Projects & Infrastructure unit is the primary operational bottleneck, holding ${tasks.filter(t => t.department === 'Projects' && t.status !== 'Completed').length} pending high-priority actions. This is primarily related to pending supplier budget code overrides.`,
      icon: AlertTriangle
    },
    {
      id: 'q3',
      question: 'How does our monthly spend compare to budget?',
      answer: `Monthly capital spent stands at ₦41,054,000 against a threshold ceiling budget of ₦40,000,000. We have overshot by 2.63% (₦1,054,000 variance override) due to emergency equipment purchase orders for Lekki Dock structural re-boring.`,
      icon: Building
    },
    {
      id: 'q4',
      question: 'What is our HSE incident velocity?',
      answer: `Our HSE safety incident occurrence velocity stands at a median of 1.4 incidents per week, while audit safety checklists are completed at a speedier rate of 4.4 per week. This indicates active, defensive hazard containment compliance.`,
      icon: AlertOctagon
    }
  ];

  const currentQA = businessQuestions.find(b => b.id === selectedQuestion) || businessQuestions[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-slate-705">
      
      {/* Toast notifications powered by sonner */}

      {/* Top Warning for role-based restricted access previews */}
      {currentRole !== 'Executive Management' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
          <AlertTriangle className="h-4.5 w-4.5 text-amber-700 shrink-0 mt-0.5 animate-pulse" />
          <div className="text-xs text-amber-800 font-semibold leading-normal">
            <strong>Security Warning:</strong> You are currently viewing the **Dashboards & Reporting** space as a <strong>{currentRole}</strong>. Action overrides and custom C-Suite approval signatures are secured for <strong>Executive Management</strong> credentials. Use the Selector in Topbar to toggle.
          </div>
        </div>
      )}

      {/* Page Header and Tier Selection Tabs */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-purple-750 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Workspace: REPORTING-TIERS
          </span>
          <h2 className="text-xl font-black text-slate-905 mt-2">Dashboards & Reporting</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold text-slate-500">
            Real-time, synchronized data streams across all configured workflow spaces.
          </p>
        </div>

        {/* Tab-based Dashboard Tier Selector */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold shrink-0 self-start xl:self-center select-none">
          <button
            onClick={() => { setActiveTier('CSuite'); triggerToast("Switched Dashboard view to C-Suite Executive Overview"); }}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTier === 'CSuite' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-slate-505 hover:bg-slate-200/50'
            }`}
          >
            <Award className="h-4 w-4" /> C-Suite Overview
          </button>
          <button
            onClick={() => { setActiveTier('Manager'); triggerToast("Switched Dashboard view to Department Manager workloads"); }}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTier === 'Manager' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-slate-505 hover:bg-slate-200/50'
            }`}
          >
            <Users2 className="h-4 w-4" /> Manager Workloads
          </button>
          <button
            onClick={() => { setActiveTier('Operational'); triggerToast("Switched Dashboard view to Team Member Operational View"); }}
            className={`px-3 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTier === 'Operational' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-slate-505 hover:bg-slate-200/50'
            }`}
          >
            <FolderKanban className="h-4 w-4" /> Operational view
          </button>
        </div>
      </div>

      {/* KPI Stats widgets (changes slightly based on active Dashboard Tier) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        <StatCard
          icon={Activity}
          value={`${completionRate}%`}
          label="Overall Workspace Completion"
          description={`${completedTasks} of ${totalTasks} tasks resolved`}
          variant="emerald"
        />
        <StatCard
          icon={FileCheck}
          value={activeApprovals.length}
          label="Open Executive Sign-offs"
          description="In-flight budget authorizations"
          variant="indigo"
        />
        <StatCard
          icon={AlertOctagon}
          value={criticalIncidentsCount}
          label="Critical HSE Incidents"
          description="Escalated emergency alerts active"
          variant="rose"
        />
        <StatCard
          icon={Building}
          value="₦165.0M CapEx"
          label="Total Project Commitments"
          description="Across 3 primary site networks"
          variant="fuchsia"
        />
      </div>

      {/* TIERS-BASED CARD TOGGLE PREVIEWS */}
      {activeTier === 'CSuite' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Donut Chart Block */}
          <Card className="bg-white border border-slate-200">
            <CardHeader p-4 border-b border-slate-50>
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Total Workspace Task Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-60 flex flex-col justify-between p-5">
              <div className="w-full h-40 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDonutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={65}
                      key="val"
                      dataKey="value"
                      paddingAngle={3}
                    >
                      {taskDonutData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v} tasks`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-slate-900">{completionRate}%</span>
                  <span className="text-[9px] text-slate-400 font-black uppercase">Res Rate</span>
                </div>
              </div>
              <div className="flex justify-around text-[10px] font-bold uppercase tracking-wider text-slate-500 border-t border-slate-100 pt-3">
                <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">✓ Closed: {completedTasks}</span>
                <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">⌛ Pending: {totalTasks - completedTasks}</span>
              </div>
            </CardContent>
          </Card>

          {/* Departmental Workload Loads */}
          <Card className="bg-white border border-slate-200">
            <CardHeader p-4 border-b border-slate-50>
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Active Workloads by Space</CardTitle>
            </CardHeader>
            <CardContent className="h-60 p-5">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} />
                  <Tooltip />
                  <Bar name="Total Standard Tasks" dataKey="Total" fill="#e2e8f0" radius={[3, 3, 0, 0]} />
                  <Bar name="Pending Actions" dataKey="RestingTasks" fill="#f43f5e" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Capital Spending vs Budget Line */}
          <Card className="bg-white border border-slate-200">
            <CardHeader p-4 border-b border-slate-50>
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">CapEx Spend vs Budget Variance</CardTitle>
            </CardHeader>
            <CardContent className="h-60 p-5">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={(v) => `₦${v / 1000000}M`} />
                  <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, '']} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase' }} />
                  <Line type="monotone" name="Actual Spend" dataKey="Spend" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" name="SOP Ceiling Limit" dataKey="Budget" stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>
      )}

      {activeTier === 'Manager' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Departmental Bottleneck metrics */}
          <Card className="bg-white border border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Turnaround Times by Department (Manager View)</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {depts.map(d => {
                const totalDept = tasks.filter(t => t.department === d).length;
                const completedDept = tasks.filter(t => t.department === d && t.status === 'Completed').length;
                const rate = totalDept > 0 ? Math.round((completedDept / totalDept) * 100) : 0;
                return (
                  <div key={d} className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-900">{d} Operations Space</span>
                      <span className="text-indigo-600">{rate}% Sign-off</span>
                    </div>
                    <ProgressBar progress={rate} variant={rate > 70 ? 'emerald' : rate > 40 ? 'amber' : 'red'} />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* HSE Incidents Velocities Trends */}
          <Card className="bg-white border border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Weekly HSE incident Velocity vs Audits completed</CardTitle>
            </CardHeader>
            <CardContent className="h-64 p-5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hseIncidentTrend} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
                  <Tooltip />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 9, textTransform: 'uppercase', fontWeight: 'bold' }} />
                  <Area name="Reported Hazards" type="monotone" dataKey="incidents" stroke="#f43f5e" fill="#ffe4e6" />
                  <Area name="Audits Approved" type="monotone" dataKey="audits" stroke="#10b981" fill="#ecfdf5" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>
      )}

      {activeTier === 'Operational' && (
        <Card className="bg-white border border-slate-200">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Personal Work Queue & SLA countdown (Team Member View)</CardTitle>
            <Badge variant="green">Synced</Badge>
          </CardHeader>
          <div className="overflow-x-auto text-xs font-bold leading-normal">
            <table className="w-full text-left border-collapse select-none">
              <thead>
                <tr className="bg-slate-100/50 border-b border-slate-200 text-[10px] text-slate-400 uppercase tracking-widest">
                  <th className="p-3.5">Task ID</th>
                  <th className="p-3.5">Task Title</th>
                  <th className="p-3.5">Assigned To</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-center">Remaining SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-705">
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-3.5 text-slate-900 font-extrabold">TSK-102</td>
                  <td className="p-3.5 font-bold">Obtain CEO digital seal authorize for VGC</td>
                  <td className="p-3.5">Amadi Kalu (Projects)</td>
                  <td className="p-3.5"><Badge variant="amber">High Priority</Badge></td>
                  <td className="p-3.5 text-center text-rose-600 font-black">19h remaining</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-3.5 text-slate-900 font-extrabold">TSK-105</td>
                  <td className="p-3.5">Validate statutory withholding tax coordinate</td>
                  <td className="p-3.5">Amara Okonkwo (Finance)</td>
                  <td className="p-3.5"><Badge variant="indigo">Medium Priority</Badge></td>
                  <td className="p-3.5 text-center text-slate-505">46h remaining</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="p-3.5 text-slate-900 font-extrabold">TSK-109</td>
                  <td className="p-3.5">Deploy steel support scaffolding beam re-piles</td>
                  <td className="p-3.5">Maryam Bello (Safety)</td>
                  <td className="p-3.5"><Badge variant="red">Critical</Badge></td>
                  <td className="p-3.5 text-center text-rose-600 animate-pulse font-black">OVERDUE BY 4h</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* DYNAMIC EXECUTIVE Q&A INSIGHTS PANEL */}
      <Card className="border-2 border-indigo-250 bg-indigo-50/5 rounded-2xl overflow-hidden">
        <CardHeader className="bg-[#7C3AED]/5 p-5 border-b border-indigo-100 flex items-center gap-2 select-none flex-row">
          <HelpCircle className="h-5.5 w-5.5 text-[#7C3AED]" />
          <div>
            <CardTitle className="text-sm font-black text-slate-900 leading-tight">💡 Executive Q&A Insights Panel</CardTitle>
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Click any standard compliance policy query below to extract state-driven telemetry responses.</p>
          </div>
        </CardHeader>
        
        <div className="grid md:grid-cols-12 gap-6 p-6 items-start">
          
          {/* Question buttons left (5/12) */}
          <div className="md:col-span-5 space-y-3 font-semibold text-xs text-slate-700">
            {businessQuestions.map(b => {
              const Icon = b.icon;
              const isSelected = b.id === selectedQuestion;
              return (
                <button
                  key={b.id}
                  onClick={() => { setSelectedQuestion(b.id); triggerToast(`Computing insights for: "${b.question}"`); }}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-bold leading-snug flex items-center gap-3 cursor-pointer ${
                    isSelected ? 'bg-white border-[#7C3AED] ring-2 ring-[#7C3AED]/10 shadow-xs text-slate-950' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Icon className={`h-5.5 w-5.5 shrink-0 ${isSelected ? 'text-[#7C3AED]' : 'text-slate-400'}`} />
                  <span>{b.question}</span>
                </button>
              );
            })}
          </div>

          {/* Answer display container (7/12) */}
          <div className="md:col-span-7 bg-white p-5.5 rounded-2xl border border-slate-205 flex flex-col justify-between min-h-[190px] font-bold text-xs select-none shadow-xs leading-relaxed">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-black text-slate-400">
                <span>Calculated Resolution Output</span>
                <Badge variant="indigo">Q2 Fiscal Period</Badge>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2.5 bg-[#7C3AED]/10 rounded-xl text-[#7C3AED] mt-1 shrink-0">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-900">Query: "{currentQA.question}"</h4>
                  <p className="text-slate-655 font-semibold text-[11.5px] leading-relaxed">
                    {currentQA.answer}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] text-slate-400 font-extrabold uppercase mt-4">
              <span className="flex items-center gap-1.5 text-[#7C3AED]"><Timer className="h-4 w-4" /> Live Calculation Sync</span>
              <span>Updated: Real-time</span>
            </div>
          </div>

        </div>
      </Card>

    </div>
  );
};

export default ExecutiveDashboard;
