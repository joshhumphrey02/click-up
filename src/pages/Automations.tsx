import React, { useState } from 'react';
import {
  Cpu,
  Mail,
  Zap,
  PlayCircle,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Terminal,
  RefreshCw
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const Automations: React.FC = () => {
  const {
    triggerAutomationDemo,
    automationRunning,
    purchaseRequests,
    executiveApprovals
  } = useCommandCenter();

  // Highlight variables during demo run
  const demoTargetPR = purchaseRequests.find(pr => pr.id === 'PR-8902');
  const demoTargetEXE = executiveApprovals.find(exe => exe.id === 'EXE-301');

  const automationRules = [
    { cat: 'Approval Routing', trigger: 'Purchase Requisition Submitted', rule: 'If Amount > ₦10.0M → Lock docket & route directly to Finance Director + CEO Executive Queue.', status: 'Active' },
    { cat: 'Reminder & Escalation', trigger: 'Task Pending > 48 Business Hours', rule: 'Fire automated pushing alert and copy line manager Ada Okafor on en-route SMS logs.', status: 'Active' },
    { cat: 'HSE Compliance Alert', trigger: 'HSE Incident Risk Severity is Critical', rule: 'Trigger emergency broadcast warning panel directly on CEO Daniel Eze Command screen.', status: 'Active' },
    { cat: 'Status Change Triggers', trigger: 'Executive Director signs/approves PO', rule: 'Notify originator, shift PO register status to "Approved" and generate requisition order file.', status: 'Active' }
  ];

  const notificationMatrix = [
    { event: 'Task Assigned', recipients: 'Assignee + Project Watcher', channels: 'ClickUp In-App + email' },
    { event: 'Approval Signature Required', recipients: 'Approver + Department Head', channels: 'email + In-App notification' },
    { event: 'Overdue Escalation Warning', recipients: 'Supervisor + HR Operations Director', channels: 'Emergency email log' },
    { event: 'Critical HSE Incident Logged', recipients: 'HSE Lead Maryam Bello + CEO Daniel Eze', channels: 'email + SMS Direct Telemetry' },
    { event: 'Budget Threshold Violation', recipients: 'Finance Director + executive Office', channels: 'Dashboard Warning Icon' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-700">
      
      {/* Sub titles layout details */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">Enterprise Automations Engine Center</h2>
        <p className="text-xs text-slate-500 mt-1">
          Eliminate manual administrative bottlenecks. Define, inspect and test triggered operations workflows that align projects spending, safety incidents, and HR lifecycles automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Cpu}
          value="34 Rules"
          label="Active Automated Triggers"
          description="Running 24/7 across operation spaces"
          variant="indigo"
        />
        <StatCard
          icon={Zap}
          value="48.2 Hours"
          label="Median Delay Savings"
          description="Friction removed compared to legacy PDF routes"
          variant="emerald"
        />
        <StatCard
          icon={Terminal}
          value="100% Reliability"
          label="Policy Guard Checksums"
          description="Zero missed compliance audits"
          variant="fuchsia"
        />
      </div>

      {/* INTERACTIVE DEMO SIMULATOR PLAYGROUND */}
      <Card className="border-2 border-indigo-200/80 bg-indigo-50/10">
        <CardHeader className="flex justify-between items-center border-b border-indigo-100 bg-indigo-50/20">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-700 animate-pulse" />
            <CardTitle className="text-indigo-950 font-bold">Interactive SLA Automation Sandbox</CardTitle>
          </div>
          <Button
            variant="primary"
            className="gap-2 shrink-0 cursor-pointer text-xs font-bold"
            onClick={triggerAutomationDemo}
            disabled={automationRunning}
          >
            {automationRunning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Simulating Operational Flow...
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" /> Trigger Automated Demo
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs leading-relaxed font-semibold">
          
          {/* Demonstration timeline */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="font-bold text-slate-500 uppercase tracking-widest text-[10px]">Real-Time Processing timeline</h4>
            
            <div className="relative border-l-2 border-slate-200 pl-4 space-y-6">
              
              <div className="relative">
                <span className={`absolute -left-[21px] top-0 w-3 h-3 rounded-full border border-white ${automationRunning ? 'bg-indigo-650 animate-ping' : 'bg-indigo-600'}`} />
                <p className="font-bold text-slate-900 text-[11px]">Step 1: Evaluate Requisition (Lekki Dock PR-8902)</p>
                <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Auto-calculating transaction limits against cost budget codes.</p>
              </div>

              <div className="relative">
                <span className={`absolute -left-[20px] top-0 w-2.5 h-2.5 rounded-full ${automationRunning ? 'bg-indigo-505 bg-indigo-500' : 'bg-slate-300'}`} />
                <p className="font-bold text-slate-900 text-[11px]">Step 2: Financial Threshold routing bypass</p>
                <p className="text-[10px] text-slate-455 mt-0.5 font-medium">Bypasses standard department queue since ₦14.5M exceeds the ₦10M directive rule.</p>
              </div>

              <div className="relative font-semibold">
                <span className={`absolute -left-[20px] top-0 w-2.5 h-2.5 rounded-full ${automationRunning ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <p className="font-bold text-slate-900 text-[11px]">Step 3: Board Paper Injection & C-Suite ping</p>
                <p className="text-[10px] text-slate-450 mt-0.5 font-medium">Automatically injects reference docket "EXE-301" into CEO Daniel Eze queue.</p>
              </div>

            </div>
          </div>

          {/* Impact on data states */}
          <div className="lg:col-span-2 bg-slate-900/90 text-slate-100 rounded-xl p-5 font-mono space-y-4 shadow-xl border border-slate-805">
            <h5 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Terminal className="h-4 w-4" /> System Core State Inspection
            </h5>

            <div className="space-y-3 font-semibold text-[11px]">
              <div>
                <p className="text-slate-500 text-[10px] uppercase">// PO Register Live Reference: PR-8902</p>
                <div className="bg-slate-950 p-2 text-indigo-305 text-indigo-300 rounded border border-slate-800/60 mt-1 font-medium">
                  {`{\n  id: "PR-8902",\n  item: "Lekki excavators hire",\n  status: "${demoTargetPR?.status || 'Submitted'}",\n  managerApproved: ${demoTargetPR?.managerApproved},\n  budgetLimitExceeded: ${demoTargetPR?.budgetLimitExceeded}\n}`}
                </div>
              </div>

              <div>
                <p className="text-slate-505 text-[10px] uppercase">// Executive Approval Docket Reference: EXE-301</p>
                <div className="bg-slate-955 bg-slate-950 p-2 text-indigo-300 rounded border border-slate-800/60 mt-1 font-medium">
                  {`{\n  boardRef: "${demoTargetEXE?.boardRef || 'EXE-301'}",\n  department: "Projects",\n  status: "${demoTargetEXE?.status || 'Submitted'}",\n  impactLevel: "${demoTargetEXE?.impactLevel || 'Critical'}"\n}`}
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Rules and notifications layout grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Rules Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Enterprise Rules Matrix</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto text-[11px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="p-4">Operations Category</th>
                  <th className="p-4">Trigger Condition</th>
                  <th className="p-4">Automated Recipe Action</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-101 divide-slate-100">
                {automationRules.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-bold text-slate-800">{rule.cat}</td>
                    <td className="p-4 text-indigo-700 font-semibold">{rule.trigger}</td>
                    <td className="p-4 text-slate-600 font-medium leading-relaxed max-w-xs">{rule.rule}</td>
                    <td className="p-4 text-center">
                      <Badge variant="green">ACTIVE</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Email/SMS Notifications matrix */}
        <Card>
          <CardHeader>
            <CardTitle>SMTP & Direct Communications Matrix</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto text-[11px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-102 border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="p-4">Incident/Event</th>
                  <th className="p-4">Audited Recipients</th>
                  <th className="p-4">Configured Transmission Channels</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {notificationMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition font-medium">
                    <td className="p-4 font-bold text-slate-800">{item.event}</td>
                    <td className="p-4 text-slate-655 font-semibold">{item.recipients}</td>
                    <td className="p-4 text-indigo-700 font-semibold uppercase">{item.channels}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>

    </div>
  );
};
export default Automations;
