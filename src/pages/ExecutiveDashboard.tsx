import React from 'react';
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
  Line
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
  FileCheck
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
    purchaseRequests,
    projects,
    hseIncidents,
    approveExecutiveApproval,
    rejectExecutiveApproval,
    requestInfoExecutiveApproval,
    currentRole
  } = useCommandCenter();

  // Dynamic calculations based on state to show real-time changes
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const activeApprovals = executiveApprovals.filter(e => e.status === 'Submitted' || e.status === 'Under Review');
  const criticalIncidents = hseIncidents.filter(i => i.riskLevel === 'Critical' || i.status === 'Escalated').length;

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
  // PR values: standard historical spending
  const spendData = [
    { month: 'Jan', Spend: 12000000, Budget: 15000000 },
    { month: 'Feb', Spend: 18500000, Budget: 15000000 },
    { month: 'Mar', Spend: 21000000, Budget: 25000000 },
    { month: 'Apr', Spend: 14000000, Budget: 25000000 },
    { month: 'May', Spend: 34000000, Budget: 35000000 },
    { month: 'Jun', Spend: 41050000, Budget: 40000000 }, // Current (overshot slightly due to Lekki)
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Info Banner for Executive View restriction */}
      {currentRole !== 'CEO / Executive' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800">
            <strong>Security Warning:</strong> You are currently viewing the **Executive Dashboard** as a <strong>{currentRole}</strong>. Action controls are typically secured for CEO & Director credentials. Change role in Topbar to bypass.
          </div>
        </div>
      )}

      {/* KPI Stats widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Activity}
          value={`${completionRate}%`}
          label="Task Completion Rate"
          description={`${completedTasks} of ${totalTasks} actions closed`}
          variant="emerald"
        />
        <StatCard
          icon={FileCheck}
          value={activeApprovals.length}
          label="Open Director Sign-offs"
          description="Awaiting C-Suite signature approvals"
          variant="indigo"
        />
        <StatCard
          icon={AlertOctagon}
          value={criticalIncidents}
          label="Active HSE Alerts"
          description={`${hseIncidents.filter(i => i.status === 'Open').length} open safety cases`}
          variant="rose"
        />
        <StatCard
          icon={Building}
          value="₦165.0M"
          label="Active Capital Spend"
          description="Across 3 primary site networks"
          variant="fuchsia"
        />
      </div>

      {/* Main Charts & Visualizations Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Task completion donut (1/3) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Organization task Health</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-between">
            <div className="w-full h-44 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    key="val"
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {taskDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-800">{completionRate}%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Rate</span>
              </div>
            </div>
            
            <div className="flex justify-around text-xs font-semibold text-slate-600 gap-2 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-emerald-500 rounded-sm" />
                <span>Closed ({completedTasks})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-indigo-505 bg-indigo-600 rounded-sm" />
                <span>Pending ({totalTasks - completedTasks})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overdue / Active Departmental workload (1/3) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Active Workforce Load</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} />
                <Tooltip />
                <Bar name="Total Standard Tasks" dataKey="Total" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar name="Ref Pending Actions" dataKey="RestingTasks" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spend Line Chart (1/3) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Capital Spend vs Budget Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(v) => `₦${v / 1000000}M`} />
                <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString()}`, '']} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="Spend" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Budget" stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ACTION QUEUE: CEO Actionable list (2/3) */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Executive Sign-off Dispatch Panel</CardTitle>
            <Badge variant="indigo">SLA Response 24h</Badge>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="p-4">Reference</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Impact</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Requester</th>
                  <th className="p-4 text-right">Signed Date Due</th>
                  <th className="p-4 text-center">Current Status</th>
                  <th className="p-4 text-center">C-Suite Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {executiveApprovals.map((exe) => (
                  <tr key={exe.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-bold text-slate-900">{exe.boardRef}</td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-700">{exe.category}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant={exe.impactLevel === 'Critical' ? 'red' : 'yellow'}>{exe.impactLevel}</Badge>
                    </td>
                    <td className="p-4 max-w-xs truncate text-slate-500" title={exe.description}>
                      {exe.description}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-750">{exe.requester}</p>
                      <p className="text-[10px] text-slate-400">{exe.department}</p>
                    </td>
                    <td className="p-4 text-right font-semibold text-slate-600">{exe.dueDate}</td>
                    <td className="p-4 text-center">
                      <Badge variant={getStatusVariant(exe.status)}>{exe.status}</Badge>
                    </td>
                    <td className="p-4 text-center">
                      {exe.status === 'Submitted' || exe.status === 'Under Review' ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => approveExecutiveApproval(exe.id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white p-1 rounded-sm cursor-pointer transition shadow-xs"
                            title="Approve / Authorization"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => rejectExecutiveApproval(exe.id)}
                            className="bg-rose-500 hover:bg-rose-650 text-white p-1 rounded-sm cursor-pointer transition shadow-xs"
                            title="Reject Request"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => requestInfoExecutiveApproval(exe.id)}
                            className="bg-slate-100 hover:bg-slate-205 text-slate-600 p-1 rounded-sm cursor-pointer transition border border-slate-200"
                            title="Request Revision details"
                          >
                            <RefreshCw className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">Signature Recorded</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Active Project Progress & Critical Alerts Panel (1/3) */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Strategic Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="space-y-1.5 border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900 truncate" title={p.name}>{p.name}</span>
                    <Badge variant={p.riskStatus === 'Red' ? 'red' : p.riskStatus === 'Green' ? 'green' : 'orange'}>
                      RAG: {p.riskStatus}
                    </Badge>
                  </div>
                  <ProgressBar progress={p.completion} size="sm" variant={p.riskStatus === 'Red' ? 'red' : p.riskStatus === 'Green' ? 'green' : 'amber'} />
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase">
                    <span>Spent: ₦{(p.budgetSpent/1000000).toFixed(1)}M</span>
                    <span>Budget: ₦{(p.budgetTotal/1000000).toFixed(0)}M</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-rose-50/20 border border-thin border-rose-100">
            <CardHeader className="bg-rose-50/50 border-b border-rose-100/80">
              <div className="flex items-center gap-2 text-rose-800">
                <AlertOctagon className="h-4.5 w-4.5 shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Escalation & Compliance Register</h4>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5">
              <div className="text-xs text-rose-805 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                <p className="font-bold">Urgent: Standard Fuel Ltd Dispute</p>
                <p className="text-[10px] text-rose-650 mt-1 leading-relaxed">Active CAC dispute has suspended automatic diesel supply purchase requisition code at Lekki Dock. Executive waiver requested.</p>
              </div>
              <div className="text-xs text-indigo-905 bg-indigo-50 p-2.5 rounded-lg border border-indigo-100">
                <p className="font-bold">Auto-automation rule: TSK-103 Trigger</p>
                <p className="text-[10px] text-indigo-700 mt-1 leading-relaxed">Office fiber PO pending 48 hours. Auto-assigned to HOD. CEO notified.</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};
export default ExecutiveDashboard;
