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
  RefreshCw,
  BellRing,
  Smartphone,
  CheckCircle2,
  ListTodo
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface AutomationRuleItem {
  id: string;
  category: string;
  trigger: string;
  condition: string;
  actions: string[];
  active: boolean;
}

export const Automations: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [runningDemo, setRunningDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Rule categories and recipes
  const rulesList: AutomationRuleItem[] = [
    {
      id: 'RUL-801',
      category: 'HSE Critical Protection',
      trigger: 'HSE Incident Filed',
      condition: 'When Severity Level is "Critical"',
      actions: [
        'Dispatch instant push SMS notification to CEO Daniel Eze',
        'Log "Review Emergency Scaffold Sagging" item on Joint Venture Committee board',
        'Cordon off corresponding site coordinates in telemetry ledger'
      ],
      active: true
    },
    {
      id: 'RUL-802',
      category: 'Procurement Escalations',
      trigger: 'Purchase Requisition Submitted',
      condition: 'When Total Requisition Amount > ₦10,000,000',
      actions: [
        'Lock standard department queue routing',
        'Bypass intermediate manager approvals',
        'Inject docket directly into CEO Executive Approval Centre queue'
      ],
      active: true
    },
    {
      id: 'RUL-803',
      category: 'SLA Lifecycle Reminders',
      trigger: 'Collaboration Ticket Pending',
      condition: 'When Response Time > 48 Business Hours',
      actions: [
        'Generate SMS alert escalation to HOD Ada Okafor',
        'Change Ticket Status to "Escalated to Director"',
        'Deduct 5% from SLA response efficiency index score'
      ],
      active: true
    },
    {
      id: 'RUL-804',
      category: 'Onboarding On-Time Trigger',
      trigger: 'Candidate Contract Signed',
      condition: 'When Status transitions to "Hired"',
      actions: [
        'Initialize Onboarding Folder Space profile in ClickUp',
        'Dispatch automatic welcome SMS email with Q2 Training playbook',
        'Create "Standard Hardware Package Requisition" task in Procurement Space'
      ],
      active: true
    }
  ];

  const notificationChannels = [
    { trigger: 'HSE Critical Breach', channel: 'email + Direct SMS Telemetry', target: 'Daniel Eze (CEO) & HSE Committee' },
    { trigger: 'Overdue Ticket SLA', channel: 'In-App Warning Bell + Email', target: 'Sponsoring Department HOD' },
    { trigger: 'Approved Executive Seal', channel: 'System Webhook + DB Sync', target: 'Purchasing/Procure Office ledger' }
  ];

  // Simulated execution of the requested Critical Incident rule sequence
  const handleTriggerDemo = () => {
    if (runningDemo) return;
    setRunningDemo(true);
    setDemoStep(1);

    // Timeline steps simulation
    setTimeout(() => {
      setDemoStep(2);
      showToast("Step 1 Complete: Severity Evaluation matched CRITICAL rules.");
    }, 1500);

    setTimeout(() => {
      setDemoStep(3);
      showToast("Step 2 Complete: Dispatched CEO Push Notification SMS!");
    }, 3000);

    setTimeout(() => {
      setDemoStep(4);
      setRunningDemo(false);
      setDemoModalOpen(true);
      showToast("Step 3 Complete: Joint Venture Action Item logged.");
    }, 4500);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed top-4 right-4 bg-slate-900 border border-purple-500 text-white p-4 rounded-xl shadow-2xl z-50 animate-fade-in text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toast}</span>
        </div>
      )}

      {/* Hero Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-purple-750 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Space: WORKFLOW-AUTOMATIONS
          </span>
          <h2 className="text-xl font-black text-slate-905 mt-2">11. Workflow Automations</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Eliminate manual friction between operations. Run active custom recipes mapping HSE hazards, high-value procurement ceilings, and SLA breaches automatically.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <Badge variant="indigo">24/7 Active Scheduler</Badge>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Cpu}
          value="18 Global Rules"
          label="SLA Automated Recipes"
          description="Listening across core spaces"
          variant="indigo"
        />
        <StatCard
          icon={Zap}
          value="48.2 Hours Saved"
          label="Median Delay Reductions"
          description="Compared to legacy manual forms"
          variant="emerald"
        />
        <StatCard
          icon={BellRing}
          value="100% Notified"
          label="Push Communication Quality"
          description="Direct integrations en-route logs"
          variant="amber"
        />
        <StatCard
          icon={Terminal}
          value="Logs Active"
          label="Continuous Watcher"
          description="System health monitors enqueued"
          variant="blue"
        />
      </div>

      {/* DYNAMIC SANDBOX SIMULATION */}
      <Card className="border-2 border-indigo-250 bg-[#7C3AED]/5 rounded-2xl">
        <CardHeader className="border-b border-indigo-100 p-5 flex items-center justify-between select-none bg-indigo-50/10 flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#7C3AED] animate-pulse" />
            <div>
              <CardTitle className="text-sm font-black text-slate-900 leading-tight">Interactive ClickUp Automation Sandbox</CardTitle>
              <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Test real-time statutory recipe triggers in action.</p>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleTriggerDemo}
            disabled={runningDemo}
            className="font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {runningDemo ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Simulating Recipe Logic...
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 text-white" /> Run Automation Demo
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent className="p-6 grid md:grid-cols-12 gap-8 items-start">
          
          {/* Timeline steps progress (5/12) */}
          <div className="md:col-span-6 space-y-4 font-bold text-xs">
            <h4 className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Simulated Rule Recipe Step Sequence</h4>
            
            <div className="relative border-l-2 border-indigo-150 pl-5 space-y-6">
              
              <div className="relative">
                <span className={`absolute -left-[26px] top-0.5 w-3 h-3 rounded-full border border-white transition-all ${
                  demoStep >= 1 ? 'bg-indigo-600 ring-2 ring-[#7C3AED]/20Scale' : 'bg-slate-300'
                }`} />
                <p className={`font-extrabold ${demoStep >= 1 ? 'text-[#7C3AED]' : 'text-slate-400'}`}>
                  Trigger: HSE Incident Filed (Critical Severity)
                </p>
                <p className="text-[10px] text-slate-400 font-semibold leading-normal mt-0.5">
                  When a safety officer files an incident with and chooses a risk evaluation of "Critical".
                </p>
              </div>

              <div className="relative">
                <span className={`absolute -left-[26px] top-0.5 w-3 h-3 rounded-full border border-white transition-all ${
                  demoStep >= 2 ? 'bg-indigo-600' : 'bg-slate-300'
                }`} />
                <p className={`font-extrabold ${demoStep >= 2 ? 'text-[#7C3AED]' : 'text-slate-400'}`}>
                  Action 1: Dispatch push SMS alert to CEO
                </p>
                <p className="text-[10px] text-slate-400 font-semibold leading-normal mt-0.5">
                  Sends an instant statutory push message detailing coordinates and description directly to director Daniel Eze.
                </p>
              </div>

              <div className="relative">
                <span className={`absolute -left-[26px] top-0.5 w-3 h-3 rounded-full border border-white transition-all ${
                  demoStep >= 3 ? 'bg-indigo-600' : 'bg-slate-300'
                }`} />
                <p className={`font-extrabold ${demoStep >= 3 ? 'text-[#7C3AED]' : 'text-slate-400'}`}>
                  Action 2: Log emergency joint-venture action task
                </p>
                <p className="text-[10px] text-slate-400 font-semibold leading-normal mt-0.5">
                  Creates an actionable task on the Executive approvals and Board minutes logs immediately.
                </p>
              </div>

            </div>
          </div>

          {/* Sandbox code inspector terminal output (7/12) */}
          <div className="md:col-span-6 bg-slate-900 text-slate-100 p-5 rounded-2xl shadow-xl font-mono text-xs border border-slate-800 space-y-4 select-none">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-none">
              <span className="flex items-center gap-1.5">
                <Terminal className="h-4 w-4" /> System Automations Console
              </span>
              <span>STATE: ACTIVE</span>
            </div>

            <div className="space-y-3 font-semibold text-[11px] leading-relaxed">
              <p className="text-slate-500">// Real-time state telemetry of active sandbox trigger</p>
              <div className="p-3 bg-slate-950 rounded border border-slate-800/80 text-emerald-400 font-medium">
                {`{\n  activeRecipeId: "RUL-801",\n  triggerSource: "HSE_INCIDENT_FORM",\n  isRunning: ${runningDemo},\n  matchedCondition: ${demoStep >= 2 ? 'true' : 'false'},\n  notificationsSent: ${demoStep >= 3 ? '1 (Target: Daniel Eze CEO)' : '0'},\n  loggedActionItems: ${demoStep >= 4 ? '1 (Target: JVC Board)' : '0'}\n}`}
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Active Rules Grid Layout */}
      <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Enterprise ClickUp Recipes Index</h3>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {rulesList.map(rule => (
          <Card key={rule.id} className="bg-white border border-slate-200">
            <CardHeader className="bg-slate-50 p-4 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider leading-none">{rule.id}</span>
                <h4 className="text-xs font-black text-slate-905 mt-0.5">{rule.category}</h4>
              </div>
              <Badge variant="green">Active</Badge>
            </CardHeader>
            <CardContent className="p-5 space-y-3 font-bold text-xs select-none">
              
              <div className="space-y-1 bg-slate-50 p-3.5 border border-slate-150 rounded-xl leading-snug">
                <span className="text-[9px] uppercase text-indigo-755 font-black block">Trigger condition</span>
                <p className="text-indigo-700 font-extrabold">{rule.trigger}</p>
                <p className="text-[10px] text-slate-505 font-bold mt-1">Rule: {rule.condition}</p>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-[9px] uppercase text-slate-450 font-black block mb-1">Automated actions execution:</span>
                {rule.actions.map((act, idx) => (
                  <div key={idx} className="flex gap-2 items-start leading-normal text-[11px] font-semibold text-slate-655">
                    <span className="w-1.5 h-1.5 bg-emerald-505 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* SMTP Routing and Matrix table */}
      <Card className="bg-white border border-slate-200 overflow-hidden">
        <CardHeader className="border-b border-slate-100 p-4 bg-slate-50">
          <CardTitle className="text-xs uppercase font-extrabold text-slate-400">SMTP & Direct Telemetry communications matrix [Active]</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto text-xs font-bold">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="bg-slate-100/50 text-slate-400 uppercase tracking-widest text-[9px] border-b border-slate-200">
                <th className="p-3.5">Triggering Incident Event</th>
                <th className="p-3.5">Audited Recipients</th>
                <th className="p-3.5">Configuration Communication Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-705">
              {notificationChannels.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition">
                  <td className="p-3.5 text-slate-900 font-extrabold">{item.trigger}</td>
                  <td className="p-3.5 text-slate-550 font-semibold">{item.target}</td>
                  <td className="p-3.5 text-indigo-700 font-extrabold uppercase">{item.channel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* DEMO COMPLETE MODAL SCREEN FOR CRITICAL INCIDENT */}
      <Modal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} title="✓ Automation Engine Demonstration Complete">
        <div className="space-y-4 text-xs font-bold text-slate-750 leading-relaxed p-1 select-none">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-850 flex gap-2.5">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>AUTOMATED PROTOCOL COMPLETED SUCCESSFULLY</strong>
              <p className="text-[10px] text-emerald-700 mt-1 max-w-sm">
                Safety trigger successfully matched. Chronological runbook actions dispatched in exact sequence based on policy.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-indigo-150 bg-indigo-50/20 space-y-3">
            <span className="text-[9px] font-black text-indigo-705 uppercase block mb-1">Executed Sequence Details:</span>
            
            <div className="flex items-center gap-2">
              <Smartphone className="h-4.5 w-4.5 text-[#7C3AED]" />
              <p className="text-[11px] text-slate-700 font-bold"><strong>Action 1 SMS dispatched:</strong> "Daniel, Critical Scaffold structural sag reported at Lekki Site Grid C. Safety tag attached."</p>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-200/50 pt-2.5">
              <ListTodo className="h-4.5 w-4.5 text-[#7C3AED]" />
              <p className="text-[11px] text-slate-800 font-black"><strong>Action 2 JVC task enqueued:</strong> logged emergency milestone review task on Joint Venture Committee dashboard under ref: JVC-HSE-901.</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic">This demo mirrors real-time actions execution inside our configured ClickUp operations workspace after implementation.</p>

          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setDemoModalOpen(false)}>
              Acknowledge Simulator Outcome
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Automations;
