import React, { useState } from 'react';
import { toast as sonnerToast } from 'sonner';
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
  // toast managed via sonner
  const [runningDemo, setRunningDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeScenarioId, setActiveScenarioId] = useState('scen-hse');

  const showToast = (msg: string) => {
    if (msg.toLowerCase().includes('error') || msg.toLowerCase().includes('fail')) {
      sonnerToast.error(msg);
    } else {
      sonnerToast.success(msg);
    }
  };

  // Presentation Scenarios definitions for testing
  const presentationScenarios = [
    {
      id: 'scen-hse',
      name: 'HSE Emergency Breach',
      badge: 'Safety Alert',
      color: 'rose',
      ruleId: 'RUL-801',
      description: 'Critical safety breach triggering senior director and board escalations.',
      icon: ShieldAlert,
      steps: [
        {
          title: 'Trigger: HSE Incident Filed (Critical Severity)',
          description: 'A safety officer files an incident with coordinate telemetry and marks severity as "Critical".'
        },
        {
          title: 'Action 1: Dispatch cellular push message to leadership',
          description: 'Sends immediate direct SMS detailing incident coordinates to CEO Daniel Eze and HSE Committee.'
        },
        {
          title: 'Action 2: Log Emergency JVC Resolution task',
          description: 'Creates a priority task on the Joint Venture Committee dashboard to mandate instant mitigation.'
        }
      ],
      stepToasts: [
        "Evaluating hazard incident report & matched HSE Critical safeguards.",
        "Dispatched Direct Push SMS alert to CEO Daniel Eze's device!",
        "HSE Safeguard Complete: Logged emergency Board Action Checklist."
      ],
      consoleData: (running: boolean, step: number) => ({
        activeRecipeId: 'RUL-801',
        triggerSource: 'HSE_INCIDENT_FORM',
        isRunning: running,
        matchedCondition: step >= 2,
        recipientsNotified: step >= 3 ? ['Daniel Eze (CEO)', 'HSE Committee Chair'] : [],
        loggedActionItems: step >= 4 ? ['JVC Board Checklist #801'] : [],
        telemetryStatus: step >= 2 ? 'Lekki-Grid-C_ISOLATED' : 'LISTENING'
      }),
      modalOutcome: {
        alertTitle: 'SAFETY BREACH MITIGATION PROTOCOL COMPLETED',
        alertDesc: 'Cron-watcher evaluated safety coordinates and dispatched emergency communication in exact statutory order.',
        action1: 'SMS dispatch validated: "Daniel, Critical Scaffold structural sag reported at Lekki Site Grid C. Safety tag attached."',
        action2: 'JVC checklist generated: Emergency review scheduled for JV Board under ticket JVC-HSE-901.',
        icon1: Smartphone,
        icon2: ListTodo
      }
    },
    {
      id: 'scen-procure',
      name: 'Procurement Ceiling Bypass',
      badge: 'Finance Ceilings',
      color: 'emerald',
      ruleId: 'RUL-802',
      description: 'High-value approval requests auto-bypassing bottlenecks directly to CEO queue.',
      icon: Cpu,
      steps: [
        {
          title: 'Trigger: Heavy Equipment Requisition Submitted',
          description: 'Procurement officer requests ₦15,400,000 for heavy turbine spares.'
        },
        {
          title: 'Action 1: Bypass intermediate queues & lock branch routing',
          description: 'Halts typical manager workflows to avoid administrative delays for critical spares.'
        },
        {
          title: 'Action 2: Inject docket into main CEO Approval Queue',
          description: 'Places request securely right at the top of Daniel Eze\'s executive approval docket.'
        }
      ],
      stepToasts: [
        "Evaluating Purchase order value & exceeded ₦10M threshold.",
        "Middling administration bypassed. Direct router activated.",
        "Procurement Complete: Transferred Priority Docket to CEO Cryptographic queue."
      ],
      consoleData: (running: boolean, step: number) => ({
        activeRecipeId: 'RUL-802',
        triggerSource: 'REQUISITION_PORTAL',
        isRunning: running,
        matchedCondition: step >= 2,
        recipientsNotified: step >= 3 ? ['Daniel Eze (CEO)', 'Finance Director'] : [],
        loggedActionItems: step >= 4 ? ['Executive Seal Queue Entry #154'] : [],
        overrideBypassApplied: step >= 2 ? 'TRUE' : 'FALSE'
      }),
      modalOutcome: {
        alertTitle: 'CEILING BYPASS ROUTING SUCCESSFUL',
        alertDesc: 'Financial safety triggers monitored the ₦15.4M amount and completed instant vertical escalation to bypass administrative delay.',
        action1: 'Branch routing locked: Traditional middle-manager approval steps deactivated for purchase speed.',
        action2: 'CEO Dashboard entry logged: Secure docket placed directly in Daniel Eze\'s executive inbox with High Priority.',
        icon1: Zap,
        icon2: ListTodo
      }
    },
    {
      id: 'scen-sla',
      name: 'SLA Breach Safeguard',
      badge: 'SLA Lifecycle',
      color: 'amber',
      ruleId: 'RUL-803',
      description: 'Stale corporate collaboration tickets escalated with department rating fines.',
      icon: Clock,
      steps: [
        {
          title: 'Trigger: Ticket Pending > 48 Business Hours',
          description: 'Corporate partnership ticket remains unresolved for 52 consecutive business hours.'
        },
        {
          title: 'Action 1: Dispatch warning escalation summary to HOD',
          description: 'Triggers Direct Bell Alert and SLA Breach Summary to HOD Ada Okafor.'
        },
        {
          title: 'Action 2: Degrade department response efficiency score',
          description: 'Applies automated 5% SLA performance index penalty directly into weekly department dashboard stats.'
        }
      ],
      stepToasts: [
        "Timer analysis detected SLA breach > 4 business days.",
        "Dispatched immediate breach report & Bell Alarm alert to HOD Ada Okafor.",
        "SLA Complete: Response efficiency index score docked by 5%."
      ],
      consoleData: (running: boolean, step: number) => ({
        activeRecipeId: 'RUL-803',
        triggerSource: 'TICKET_TICKER',
        isRunning: running,
        matchedCondition: step >= 2,
        recipientsNotified: step >= 3 ? ['Ada Okafor (HOD)', 'Partnerships Team'] : [],
        loggedActionItems: step >= 4 ? ['SLA Response Index Adjustment -5%'] : [],
        slaTicketTimer: '52 HOURS (BREACH)'
      }),
      modalOutcome: {
        alertTitle: 'SLA BREACH SAFEGUARD EXECUTED',
        alertDesc: 'SLA monitoring rules flagged the critical milestone breach and triggered automatic departmental warnings.',
        action1: 'HOD alert completed: Dispatched direct system notification to Ada Okafor.',
        action2: 'Index penalty filed: Department weekly efficiency tracker adjusted; ticket marked "Escalated to Director".',
        icon1: BellRing,
        icon2: Clock
      }
    },
    {
      id: 'scen-onboard',
      name: 'Auto-Onboarding Suite',
      badge: 'HR Automation',
      color: 'blue',
      ruleId: 'RUL-804',
      description: 'Instant sandbox profiling, handbook mailing, and hardware ordering upon sign.',
      icon: Mail,
      steps: [
        {
          title: 'Trigger: Candidate Signed Contract (Hired status)',
          description: 'HR systems register a fully countersigned executive job offer contract.'
        },
        {
          title: 'Action 1: Initialize custom ATMA Onboarding Folder',
          description: 'Automatically provisions a personal training profile space and Q2 Training playbook.'
        },
        {
          title: 'Action 2: File Hardware Requisition in Procurement',
          description: 'Creates standard modern hardware package ticket in the purchasing queue with no manual input.'
        }
      ],
      stepToasts: [
        "State-watcher registered countersigned HR contract (Hired).",
        "Created custom candidate workspace folder on ATMA.",
        "Onboarding Complete: Dispatched digital Q2 Handbook & Hardware request."
      ],
      consoleData: (running: boolean, step: number) => ({
        activeRecipeId: 'RUL-854',
        triggerSource: 'CONTRACTS_LEDGER',
        isRunning: running,
        matchedCondition: step >= 2,
        recipientsNotified: step >= 3 ? ['Candidate (SMS Hello)', 'HR Ops Team'] : [],
        loggedActionItems: step >= 4 ? ['ATMA Onboarding Workspace Directory', 'Hardware Ticket IP-290'] : [],
        candidateContractStatus: 'COUNTERSIGNED'
      }),
      modalOutcome: {
        alertTitle: 'WORKFORCE INTRO SEQUENCE COMPLETED',
        alertDesc: 'Seamless HR contract webhook caught the "Hired" state transition and provisioned the starter suite instantly.',
        action1: 'Workspace initialized: Personalized onboarding folder structured inside corporate ATMA Space.',
        action2: 'Requisition triggered: Automatic Procurement order submitted for standardized corporate laptop kit.',
        icon1: CheckCircle2,
        icon2: ListTodo
      }
    }
  ];

  const currentScenario = presentationScenarios.find(s => s.id === activeScenarioId) || presentationScenarios[0];

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
        'Initialize Onboarding Folder Space profile in ATMA Space',
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
      showToast(`Step 1: ${currentScenario.stepToasts[0]}`);
    }, 1500);

    setTimeout(() => {
      setDemoStep(3);
      showToast(`Step 2: ${currentScenario.stepToasts[1]}`);
    }, 3000);

    setTimeout(() => {
      setDemoStep(4);
      setRunningDemo(false);
      setDemoModalOpen(true);
      showToast(`Step 3: ${currentScenario.stepToasts[2]}`);
    }, 4500);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Toast Feedback handled by sonner */}

      {/* Hero Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-purple-750 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ATMA Space: WORKFLOW-AUTOMATIONS
          </span>
          <h2 className="text-xl font-black text-slate-905 mt-2">Workflow Automations</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Automate processes by running custom rules for HSE hazards, procurement ceilings, and SLA breaches.
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
              <CardTitle className="text-sm font-black text-slate-900 leading-tight">Interactive ATMA Automation Sandbox</CardTitle>
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

        {/* SELECTOR FOR DIFFERENT SCENARIOS */}
        <div className="px-6 pt-4 pb-3 border-b border-indigo-100/50 bg-slate-50/40 flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Select Presentation Demo Scenario:</span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {presentationScenarios.map(sc => {
              const IconComp = sc.icon;
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    if (runningDemo) return;
                    setActiveScenarioId(sc.id);
                    setDemoStep(0);
                  }}
                  disabled={runningDemo}
                  className={`flex flex-col p-3 rounded-xl border text-left transition relative cursor-pointer select-none ${
                    isSelected
                      ? 'bg-white border-[#7C3AED] shadow-xs ring-2 ring-[#7C3AED]/10'
                      : 'bg-white/40 border-slate-200 hover:bg-white hover:border-slate-300'
                  } ${runningDemo ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 justify-between">
                    <IconComp className={`h-4 w-4 ${isSelected ? 'text-[#7C3AED]' : 'text-slate-500'}`} />
                    <span className={`text-[9px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded-full ${
                      sc.color === 'rose' ? 'bg-rose-50 text-rose-700 border border-rose-200/50' :
                      sc.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-250/50' :
                      sc.color === 'amber' ? 'bg-amber-50 text-amber-700 border border-amber-250/50' :
                      'bg-blue-50 text-blue-700 border border-blue-200/50'
                    }`}>
                      {sc.badge}
                    </span>
                  </div>
                  <span className="text-xs font-black text-slate-800 leading-snug truncate">{sc.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">{sc.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <CardContent className="p-6 grid md:grid-cols-12 gap-8 items-start">
          
          {/* Timeline steps progress (5/12) */}
          <div className="md:col-span-6 space-y-4 font-bold text-xs">
            <h4 className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Simulated Rule Recipe Step Sequence</h4>
            
            <div className="relative border-l-2 border-indigo-150 pl-5 space-y-6">
              {currentScenario.steps.map((st, idx) => {
                const stepNum = idx + 1;
                const isActive = demoStep >= stepNum;
                return (
                  <div key={idx} className="relative">
                    <span className={`absolute -left-[26px] top-0.5 w-3 h-3 rounded-full border border-white transition-all ${
                      isActive ? 'bg-indigo-600 ring-2 ring-[#7C3AED]/20' : 'bg-slate-300'
                    }`} />
                    <p className={`font-extrabold transition-colors ${isActive ? 'text-[#7C3AED]' : 'text-slate-400'}`}>
                      {st.title}
                    </p>
                    <p className="text-[10px] text-slate-450 font-semibold leading-normal mt-0.5">
                      {st.description}
                    </p>
                  </div>
                );
              })}
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
              <div className="p-3 bg-slate-950 rounded border border-slate-800/80 text-emerald-400 font-medium whitespace-pre">
                {JSON.stringify(currentScenario.consoleData(runningDemo, demoStep), null, 2)}
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Active Rules Grid Layout */}
      <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Enterprise ATMA Recipes Index</h3>
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

      {/* DEMO COMPLETE MODAL SCREEN FOR CURRENT SCENARIO */}
      <Modal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} title={`✓ ${currentScenario.name} Demonstration Complete`}>
        <div className="space-y-4 text-xs font-bold text-slate-750 leading-relaxed p-1 select-none font-sans">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-850 flex gap-2.5">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="uppercase">{currentScenario.modalOutcome.alertTitle}</strong>
              <p className="text-[10px] text-emerald-700 mt-1 max-w-sm">
                {currentScenario.modalOutcome.alertDesc}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-indigo-150 bg-indigo-50/20 space-y-3">
            <span className="text-[9px] font-black text-indigo-755 uppercase block mb-1">Executed Sequence Details:</span>
            
            {(() => {
              const Icon1 = currentScenario.modalOutcome.icon1;
              const Icon2 = currentScenario.modalOutcome.icon2;
              return (
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Icon1 className="h-4.5 w-4.5 text-[#7C3AED] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-705 font-bold leading-normal">
                      <strong>Action 1:</strong> {currentScenario.modalOutcome.action1}
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5 border-t border-slate-200/50 pt-2.5">
                    <Icon2 className="h-4.5 w-4.5 text-[#7C3AED] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-755 font-black leading-normal">
                      <strong>Action 2:</strong> {currentScenario.modalOutcome.action2}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

          <p className="text-[10px] text-slate-400 italic">This demo mirrors real-time actions execution inside our configured ATMA operations workspace after implementation.</p>

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
