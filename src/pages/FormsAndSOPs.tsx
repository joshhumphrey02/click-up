import React, { useState } from 'react';
import { toast as sonnerToast } from 'sonner';
import {
  FileText,
  BookOpen,
  ArrowRight,
  Eye,
  CheckCircle,
  HelpCircle,
  Bookmark,
  Shuffle,
  ShieldCheck,
  Zap,
  Layers,
  FileCheck2,
  Trash2,
  Lock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface DigitizedSOP {
  id: string; // SOP reference code
  name: string;
  department: string;
  manualSystemBefore: string;
  clickUpSystemAfter: string;
  policyDetails: string;
  benefits: string[];
}

export const FormsAndSOPs: React.FC = () => {
  // toast managed via sonner
  const [activeSopId, setActiveSopId] = useState<string | null>('SOP-HR-04');
  const [comparisonToggle, setComparisonToggle] = useState<'SideBySide' | 'ComparisonList'>('SideBySide');

  // Transformed SOP blueprints
  const sopBlueprints: DigitizedSOP[] = [
    {
      id: 'SOP-HR-04',
      name: 'Employee Offboarding & Exit Clearing Policy',
      department: 'HR Operations',
      manualSystemBefore: 'Multiple department paper signatures, email threads containing duplicate asset handovers, loose Excel sheets, and delayed payroll closeout.',
      clickUpSystemAfter: 'Automatic subtask generation upon HR status transition to "Resigned". Cross-department clearings routed simultaneously to IT, Finance, and Security.',
      policyDetails: 'When status is updated to "Resigned", the ClickUp Automation engine spawns 4 concurrent subtask folders: (1) IT Asset Retrieval [SLA: 48h], (2) Finance Payroll Settlement [SLA: 24h], (3) Security Access Deactivation [SLA: 12h], (4) Exit Interview scheduling. Exit clearances are digitally consolidated on the personnel dossier sheet automatically.',
      benefits: ['Zero unreturned corporate assets', '100% compliant withholding tax closeout', 'IT access locked on day-of-exit']
    },
    {
      id: 'SOP-PROC-12',
      name: 'Procurement Approval & Purchase Ordering Guidelines',
      department: 'Procurement & Finance',
      manualSystemBefore: 'Manual printable voucher forms, physical folder transfers seeking executive director ink signatures, and loose scanner attachments.',
      clickUpSystemAfter: 'Digital Intake Form submission trigger. Automatic threshold-based division routes transactions instantly into custom C-suite queues.',
      policyDetails: 'Purchase requisition form input triggers automatic audit limit calculations. Files under ₦10M stay inside department queue for standard manager review. Requisitions exceeding ₦10M bypass standard levels, locking modifications and injecting the board paper directly into the CEO Executive Approval Queue.',
      benefits: ['Approval cycle reduced from 5 days to 4 hours', '15% savings via pre-qualified vendor screening', 'Cryptographic signature logs audit compliance']
    },
    {
      id: 'SOP-HSE-99',
      name: 'Incident Reporting and Emergency Site Escapes',
      department: 'HSE & Compliance',
      manualSystemBefore: 'Verbal warnings logged on paper books at site depots, causing 48h delays before corporate safety managers are notified.',
      clickUpSystemAfter: 'Emergency incident filing form. Choosing severity level "Critical" triggers direct push alerts to CEO and logs JVC committee actions.',
      policyDetails: 'Upon filing a safety hazard, if risk level matched as "Critical", standard queues are overridden. An SMS trigger dispatched immediately to CEO. Site coordinates locked on local board records, and runbook logs an action task assigned directly to safety directors.',
      benefits: ['Statutory penalty exposure minimized', 'Zero hours delay for critical notifications', 'Auditable corrective action tracker closed loop']
    }
  ];

  const valueProps = [
    { title: '100% Scheme Control', desc: 'SOP compliance rules are hardcoded into ClickUp status triggers, preventing step-skipping behavior.' },
    { title: 'Durable Ledger Tracking', desc: 'Every sign-off, comment, and attachment is preserved in the task history audit trail.' },
    { title: 'SLA Escalation Engine', desc: 'Tasks approaching limit deadlines are automatically color-coded with warning bells for HODs.' }
  ];

  const triggerToast = (msg: string) => {
    if (msg.toLowerCase().includes('error') || msg.toLowerCase().includes('fail')) {
      sonnerToast.error(msg);
    } else {
      sonnerToast.success(msg);
    }
  };

  const selectedSop = sopBlueprints.find(s => s.id === activeSopId) || sopBlueprints[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Toast Feedback handled by sonner */}

      {/* Hero Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-purple-750 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Space: SOP-DIGITIZATION
          </span>
          <h2 className="text-xl font-black text-slate-905 mt-2">SOP Digitization</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Convert standard operating procedures, policy guidelines, and forms into responsive workflows.
          </p>
        </div>
        <div className="shrink-0 flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold select-none">
          <button 
            onClick={() => setComparisonToggle('SideBySide')} 
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${comparisonToggle === 'SideBySide' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-slate-505'}`}
          >
            Side-By-Side Views
          </button>
          <button 
            onClick={() => setComparisonToggle('ComparisonList')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${comparisonToggle === 'ComparisonList' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-slate-505'}`}
          >
            Outcome Lists
          </button>
        </div>
      </div>

      {/* Value benefits bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {valueProps.map((prop, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-4.5 rounded-2xl shadow-xs space-y-1.5 font-bold text-xs text-slate-705">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center text-[10px]">
                {idx + 1}
              </span>
              <strong className="text-slate-900 font-extrabold">{prop.title}</strong>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed pl-7">{prop.desc}</p>
          </div>
        ))}
      </div>

      {/* COMPARISON SLIDER SECTION */}
      <Card className="bg-white border border-slate-201 overflow-hidden">
        <CardHeader className="bg-slate-50/50 p-4 border-b border-slate-100 flex items-center justify-between flex-row">
          <div className="flex items-center gap-2">
            <Shuffle className="h-5 w-5 text-purple-650" />
            <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Digitization Scheme Comparison Matrix</CardTitle>
          </div>
          <Badge variant="indigo">SaaS Transformation preview</Badge>
        </CardHeader>
        <CardContent className="p-6">
          {comparisonToggle === 'SideBySide' ? (
            <div className="grid md:grid-cols-2 gap-8 text-xs font-bold leading-normal">
              
              {/* Manual Before Card */}
              <div className="p-5 rounded-2xl border border-rose-150 bg-rose-50/5 space-y-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-800 uppercase font-black tracking-wiest text-[10px]">
                    <Trash2 className="h-4.5 w-4.5 text-rose-600 shrink-0" />
                    <span>Legacy Manual System (Before)</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-2">Vulnerable Operations Friction Paths</h4>
                  <ul className="space-y-2 mt-4 text-slate-655 font-semibold leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-505 font-bold mt-0.5">•</span>
                      <span>Paper approval chains and prints that are easily lost/delayed on manager desks.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-505 font-bold mt-0.5">•</span>
                      <span>Manual email reminders, requiring constant follow-up and introducing schedule delays.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-505 font-bold mt-0.5">•</span>
                      <span>Disconnected systems, leading to duplicate entries and inconsistent record tracking.</span>
                    </li>
                  </ul>
                </div>
                <div className="text-[10px] text-rose-800 italic uppercase font-extrabold mt-4">
                  ⚠️ Limit: Extreme liability exposure and high operation friction.
                </div>
              </div>

              {/* ClickUp After Card */}
              <div className="p-5 rounded-2xl border border-emerald-205 bg-emerald-50/10 space-y-3.5 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-2 text-emerald-800 uppercase font-black tracking-wiest text-[10px]">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0 animate-pulse" />
                    <span>ClickUp Digital Operations (After)</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mt-2">Structured Schema Policy Guard</h4>
                  <ul className="space-y-2 mt-4 text-slate-705 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-505 font-bold mt-0.5">✓</span>
                      <span>Digital intakes instantly map fields into task columns, ensuring data consistency.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-505 font-bold mt-0.5">✓</span>
                      <span>Automatic parallel task routing, reducing process cycle times.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-505 font-bold mt-0.5">✓</span>
                      <span>Cryptographic verification seals log approvals on secure system dockets.</span>
                    </li>
                  </ul>
                </div>
                <div className="text-[10px] text-emerald-800 font-extrabold uppercase mt-4 flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-emerald-505" />
                  <span>Success: Friction minimized, security guaranteed.</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-3 font-semibold text-xs text-slate-700 leading-relaxed">
              <p>Through our ClickUp implementation roadmap, we consolidate three foundational layers:</p>
              <div className="grid md:grid-cols-3 gap-6 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>1. Schema Consistency</strong>
                  <p className="text-[11px] text-slate-500 mt-1">Standardized custom fields ensure every project has exact tracking metrics.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>2. Zero Lost Files</strong>
                  <p className="text-[11px] text-slate-500 mt-1">Contracts, CAC documents, and invoices are enqueued securely within tasks.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>3. Transparent SLA</strong>
                  <p className="text-[11px] text-slate-500 mt-1">Every department manager is evaluated on real turnaround times.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SOP POLICY EXPLORER SPLIT */}
      <div className="grid lg:grid-cols-12 gap-8 items-start select-none">
        
        {/* Left Side: SOP list select (4/12) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Transformed Document Index</h3>
          
          <div className="space-y-3 p-0.5">
            {sopBlueprints.map(sop => {
              const isSelected = sop.id === activeSopId;
              return (
                <Card
                  key={sop.id}
                  onClick={() => setActiveSopId(sop.id)}
                  className={`transition-all duration-150 cursor-pointer text-xs font-bold border ${
                    isSelected ? 'ring-2 ring-[#7C3AED] border-transparent shadow-md bg-white' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="p-4 space-y-2 leading-tight">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{sop.id}</span>
                    <h4 className="text-xs font-black text-slate-905">{sop.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Dept: {sop.department}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right Side: Selected SOP details (8/12) */}
        <div className="lg:col-span-8">
          {selectedSop ? (
            <Card className="bg-white border border-slate-205">
              <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 flex flex-row items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ACTIVE POLICY BLUEPRINT: {selectedSop.id}</span>
                  <CardTitle className="text-sm font-black text-slate-950 mt-1 leading-tight">{selectedSop.name}</CardTitle>
                </div>
                <Badge variant="indigo">{selectedSop.department}</Badge>
              </CardHeader>

              <CardContent className="p-5 space-y-5 font-bold text-xs leading-normal">
                
                {/* Legacy vs Digital comparison blocks */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-rose-50/20 border border-rose-150 rounded-xl">
                    <span className="text-[9px] uppercase font-black text-rose-700 block mb-1">Manual legacy path (Before)</span>
                    <p className="text-[11px] text-slate-655 font-semibold leading-relaxed">{selectedSop.manualSystemBefore}</p>
                  </div>
                  
                  <div className="p-3 bg-emerald-50/10 border border-emerald-205 rounded-xl">
                    <span className="text-[9px] uppercase font-black text-emerald-700 block mb-1">ClickUp automatic trigger (After)</span>
                    <p className="text-[11px] text-slate-705 leading-relaxed">{selectedSop.clickUpSystemAfter}</p>
                  </div>
                </div>

                {/* Core Policy runbook */}
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                  <span className="text-[9px] uppercase tracking-wider font-black text-[#7C3AED] block">Transformed clickup status runbook policy:</span>
                  <p className="text-[11px] text-slate-705 leading-relaxed font-semibold">{selectedSop.policyDetails}</p>
                </div>

                {/* Quantifiable business benefits details */}
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-wide font-black text-slate-450 block">Operational Value Benefits:</span>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {selectedSop.benefits.map((ben, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-white shadow-3xs flex items-start gap-1.5">
                        <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[10px] text-slate-700 leading-snug">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Print button simulator */}
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center bg-slate-50/30">
                  <span className="text-[10px] text-slate-400 italic">This blueprint represents a fully integrated ClickUp Doc template, visible to authorized stakeholders.</span>
                  <button
                    onClick={() => triggerToast(`Copied policy Doc template for ${selectedSop.id} to workspace pasteboard!`)}
                    className="p-1.5 bg-[#7C3AED]/10 text-[#7C3AED] hover:bg-[#7C3AED]/15 rounded text-[10px] cursor-pointer font-black uppercase flex items-center gap-1.5"
                  >
                    <BookOpen className="h-4 w-4 text-[#7C3AED]" /> Sync Doc Template
                  </button>
                </div>

              </CardContent>
            </Card>
          ) : (
            <div className="text-center p-12 text-slate-400 italic font-bold">No digitized SOPs selected.</div>
          )}
        </div>

      </div>

    </div>
  );
};

export default FormsAndSOPs;
