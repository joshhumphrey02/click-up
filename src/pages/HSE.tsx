import React, { useState } from 'react';
import { toast as sonnerToast } from 'sonner';
import {
  ShieldAlert,
  PlusCircle,
  AlertTriangle,
  Flame,
  User,
  Activity,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  CheckSquare,
  HelpCircle,
  Clock,
  Sparkles,
  Sliders,
  CheckSquare2
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface IncidentItem {
  id: string;
  date: string;
  location: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Investigating' | 'Resolved';
  actionsTaken: string;
  dateClosed: string;
}

export const HSE: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [escalationTriggered, setEscalationTriggered] = useState(false);
  // toastMessage managed via sonner

  // Form Fields
  const [incDate, setIncDate] = useState(new Date().toISOString().split('T')[0]);
  const [incTitle, setIncTitle] = useState('');
  const [incType, setIncType] = useState('Safety Hazard Near-Miss');
  const [severity, setSeverity] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('Medium');
  const [locInput, setLocInput] = useState('');
  const [actionsInput, setActionsInput] = useState('');

  // 1. Incidents register data with specified columns
  const [incidents, setIncidents] = useState<IncidentItem[]>([
    {
      id: 'HSE-701',
      date: '2026-06-05',
      location: 'South Substation Base Generator Unit 4',
      type: 'First Aid - Minor Hand Scraping',
      severity: 'Low',
      status: 'Resolved',
      actionsTaken: 'Cleaned wound with standard antiseptics, dressed, completed safety brief.',
      dateClosed: '2026-06-05'
    },
    {
      id: 'HSE-702',
      date: '2026-06-08',
      location: 'Port Harcourt Jetty Loading Dock B',
      type: 'Environmental Fuel Spillage (15 Liters)',
      severity: 'High',
      status: 'Investigating',
      actionsTaken: 'Deployed sawdust absorbent pads, cordoned off drainage channels, dispatched containment inspectors.',
      dateClosed: 'Pending Audit'
    },
    {
      id: 'HSE-703',
      date: '2026-06-10',
      location: 'VGC Main Overhaul Steel Scaffold Rack',
      type: 'Critical Scaffold Structural Sagging',
      severity: 'Critical',
      status: 'Open',
      actionsTaken: 'Site access immediately locked, red-flag tag attached, emergency structural crew contacted.',
      dateClosed: 'Pending Review'
    },
    {
      id: 'HSE-704',
      date: '2025-05-28',
      location: 'Corporate HQ Server Room Base Block',
      type: 'Electrical Short-circuit Sparking',
      severity: 'Medium',
      status: 'Resolved',
      actionsTaken: 'Manual safety breakers toggled, circuit breaker swap-out by electrical contractor, thermographic review done.',
      dateClosed: '2025-05-29'
    }
  ]);

  // 2. Safety Audit Checklist (interactive checklist)
  const [auditChecks, setAuditChecks] = useState([
    { id: 'AC-1', item: 'Verify all fire suppressors have active certification gauges', checked: true },
    { id: 'AC-2', item: 'Conduct physical audit of core team high-visibility PPE gears', checked: true },
    { id: 'AC-3', item: 'Ensure secondary emergency fire exits are entirely unblocked', checked: false },
    { id: 'AC-4', item: 'Recalibrate gas leak alarm telemetry sensor probes', checked: false },
    { id: 'AC-5', item: 'Restock electrical shocks first aid medical lockers', checked: true }
  ]);

  // 3. Safety Corrective Action Tracker
  const [correctiveActions, setCorrectiveActions] = useState([
    { id: 'CAR-91', hazard: 'Structural Sagging Scaffold VGC', action: 'Dismantle and install thicker steel base beams', owner: 'Maryam Bello', status: 'In Progress' },
    { id: 'CAR-92', hazard: 'Refinery Spillage PH', action: 'Install automatic safety fuel shut-off valves', owner: 'Olumide Awosika', status: 'Approved' },
    { id: 'CAR-93', hazard: 'Server Sparking HQ', action: 'Annual thermal scan audit of grid breakers', owner: 'Amara Okonkwo', status: 'Verified' }
  ]);

  // Compliance calendar scheduled active lines
  const safetyCalendar = [
    { event: 'Q2 Station Emergency Fire Drill', date: '2026-06-18', category: 'Exercise' },
    { event: 'Group HSE Policy Compliance Audit', date: '2026-06-25', category: 'Review' },
    { event: 'High-Voltage Safety Gear Calibration', date: '2026-07-05', category: 'Testing' }
  ];

  const triggerToast = (msg: string) => {
    if (msg.toLowerCase().includes('escalated') || msg.toLowerCase().includes('danger') || msg.toLowerCase().includes('critical') || msg.toLowerCase().includes('error')) {
      sonnerToast.error(msg);
    } else if (msg.toLowerCase().includes('resolve') || msg.toLowerCase().includes('success')) {
      sonnerToast.success(msg);
    } else {
      sonnerToast.info(msg);
    }
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incTitle.trim() || !locInput.trim()) return;

    const newId = `HSE-${Math.floor(705 + Math.random() * 90)}`;
    const newItem: IncidentItem = {
      id: newId,
      date: incDate,
      location: locInput,
      type: incTitle,
      severity,
      status: 'Open',
      actionsTaken: actionsInput || 'None recorded yet.',
      dateClosed: 'Pending Review'
    };

    setIncidents(prev => [newItem, ...prev]);

    if (severity === 'Critical') {
      setEscalationTriggered(true);
    } else {
      triggerToast(`Safety incident ${newId} logged successfully as ${severity} severity.`);
      setFormOpen(false);
      resetFields();
    }
  };

  const resetFields = () => {
    setIncTitle('');
    setLocInput('');
    setActionsInput('');
    setSeverity('Medium');
  };

  const handleToggleAudit = (id: string) => {
    setAuditChecks(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
    triggerToast("Audit compliance checkbox updated.");
  };

  const updateCARStatus = (id: string, next: string) => {
    setCorrectiveActions(prev => prev.map(a => a.id === id ? { ...a, status: next } : a));
    triggerToast(`Corrective action ${id} state updated to ${next}.`);
  };

  const resolvedCount = incidents.filter(i => i.status === 'Resolved').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Toast managed by sonner */}

      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-201 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-rose-100 text-rose-750 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Space: HSE-COMPLIANCE
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">HSE Monitoring Dashboard</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Track environmental hazards, incident investigation logs, mitigation actions, and safety checklists.
          </p>
        </div>

        <Button variant="danger" size="sm" className="gap-1.5 font-bold" onClick={() => setFormOpen(true)}>
          <Flame className="h-4.5 w-4.5 text-white" /> Report New Hazard
        </Button>
      </div>

      {/* 5 Requested Dashboard Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs font-bold text-xs">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Total Incidents</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{incidents.length} File cases</h3>
          <p className="text-[10px] text-slate-500 mt-1 font-semibold">Logged in current Q2 frame</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs font-semibold text-xs">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Resolved Incidents</p>
          <h3 className="text-2xl font-black text-emerald-700 mt-1">{resolvedCount} Cases</h3>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">✓ Complete sign-offs verified</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs font-semibold text-xs">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Days Since Last Incident</p>
          <h3 className="text-2xl font-black text-purple-650 mt-1">42 Days</h3>
          <p className="text-[10px] text-purple-500 font-bold mt-1">Group records achievement</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs font-bold text-xs">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Pending Audits</p>
          <h3 className="text-2xl font-black text-amber-600 mt-1">2 Audits</h3>
          <p className="text-[10px] text-slate-550 mt-1">Awaiting compliance HODs</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs font-semibold text-xs">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Compliance Score</p>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">96% Done</h3>
          <p className="text-[10px] text-slate-500 mt-1">Passing statutory benchmarks</p>
        </div>
      </div>

      {/* Main Layout Divided */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Incidents register table (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-white border border-slate-200 overflow-hidden">
            <CardHeader className="border-b border-slate-100 p-4 bg-slate-50 flex items-center justify-between flex-row">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Incident Registry Logs</CardTitle>
              <Badge variant="red">SLA Ticking</Badge>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-bold border-collapse select-none">
                <thead>
                  <tr className="bg-slate-100 text-slate-400 uppercase tracking-widest text-[9px] border-b border-slate-200/80">
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Incident Brief Title</th>
                    <th className="p-3">Classification Date</th>
                    <th className="p-3">Site Location</th>
                    <th className="p-3 text-center">Severity</th>
                    <th className="p-3">Actions Taken</th>
                    <th className="p-3">Date Closed</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-705">
                  {incidents.map(inc => (
                    <tr key={inc.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-3 text-slate-400 font-bold">{inc.id}</td>
                      <td className="p-3">
                        <span className="font-extrabold text-slate-900 block leading-tight">{inc.type}</span>
                      </td>
                      <td className="p-3 text-slate-500">{inc.date}</td>
                      <td className="p-3 text-slate-500 font-semibold">{inc.location}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide inline-block ${
                          inc.severity === 'Critical' ? 'bg-rose-100 text-rose-800 animate-pulse' :
                          inc.severity === 'High' ? 'bg-orange-100 text-orange-850' :
                          inc.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {inc.severity}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 font-semibold max-w-xs truncate" title={inc.actionsTaken}>
                        {inc.actionsTaken}
                      </td>
                      <td className="p-3 font-semibold text-slate-500">{inc.dateClosed}</td>
                      <td className="p-3 text-center">
                        <Badge variant={inc.status === 'Resolved' ? 'green' : inc.status === 'Investigating' ? 'amber' : 'red'}>
                          {inc.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* Safety Corrective Action Tracker CARs */}
          <Card className="bg-white border border-slate-200">
            <CardHeader className="border-b border-slate-105">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Corrective Action Tracker (CARs)</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3.5">
                {correctiveActions.map(act => (
                  <div key={act.id} className="p-3 border border-slate-150 rounded-xl bg-slate-55 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-semibold leading-normal">
                    <div>
                      <span className="text-[9px] uppercase tracking-wide font-extrabold text-[#7C3AED] block">{act.id} Action</span>
                      <strong className="text-slate-850 font-extrabold">{act.action}</strong>
                      <p className="text-[10px] text-slate-500 mt-1">Hazard: {act.hazard} | Assignee: {act.owner}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-indigo-750 font-extrabold mr-2">Status: {act.status}</span>
                      {act.status !== 'Verified' && (
                        <button
                          onClick={() => updateCARStatus(act.id, 'Verified')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase rounded"
                        >
                          Verify Closeout
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* RIGHT COLUMN (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Audit interactive checklist */}
          <Card className="bg-white border border-slate-200">
            <CardHeader className="border-b border-slate-100 p-4">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
                <CheckSquare2 className="h-4.5 w-4.5 text-purple-650" />
                HSE Audit checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {auditChecks.map(check => (
                  <label key={check.id} className="flex items-start gap-2.5 cursor-pointer select-none border-b border-slate-50 pb-2">
                    <input
                      type="checkbox"
                      checked={check.checked}
                      onChange={() => handleToggleAudit(check.id)}
                      className="mt-0.5 accent-purple-600 h-4 w-4"
                    />
                    <span className={`text-xs font-semibold leading-normal ${check.checked ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {check.item}
                    </span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Severity Matrix mapping */}
          <Card className="bg-white border border-slate-201 p-5 space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">HSE Danger Rating matrix</h4>
            <div className="bg-slate-50 border border-slate-200 p-1 rounded-xl text-[10px] font-bold text-center">
              <div className="grid grid-cols-5 gap-1">
                <div className="bg-rose-100 text-rose-800 p-2 rounded">Low</div>
                <div className="bg-amber-100 text-amber-800 p-2 rounded">Med</div>
                <div className="bg-orange-100 text-orange-800 p-2 rounded col-span-2">High</div>
                <div className="bg-red-600 text-white p-2 rounded animate-pulse">Critical</div>
              </div>
              <p className="text-[9px] text-slate-400 font-semibold mt-2">Likelihood (L1 - L5) vs Consequences (S1 - S5) matrix mapping</p>
            </div>
          </Card>

          {/* Safety Calendar */}
          <Card className="bg-white border border-slate-200">
            <CardHeader className="border-b border-indigo-50">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-405 tracking-wider">Compliance Calendar</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 font-semibold text-xs text-slate-700">
              {safetyCalendar.map((cal, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                  <div>
                    <strong className="text-slate-800 font-extrabold">{cal.event}</strong>
                    <p className="text-[10px] text-slate-400 mt-0.5">Scheduled: {cal.date}</p>
                  </div>
                  <Badge variant="indigo">{cal.category}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

      </div>

      {/* NEW Hazard report modal */}
      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title="Simulate Statutory Incident Filing Form">
        <form onSubmit={handleCreateIncident} className="space-y-4 font-bold text-xs shadow-xs">
          <div>
            <label className="block text-slate-600 mb-1 uppercase text-[10px]">Breach / Incident Brief Description</label>
            <input
              type="text"
              required
              placeholder="e.g. Scaffolding Base support structural decay"
              value={incTitle}
              onChange={(e) => setIncTitle(e.target.value)}
              className="w-full p-2 border border-slate-201 rounded-lg focus:ring-1 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-1 uppercase text-[10px]">Date of Incident</label>
              <input
                type="date"
                required
                value={incDate}
                onChange={(e) => setIncDate(e.target.value)}
                className="w-full p-2 border border-slate-201 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-650 mb-1 uppercase text-[10px]">Hazard Severity Rating</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none"
              >
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Severity Risk</option>
                <option value="Critical">Critical Breach (Automated Executive Alert)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1 uppercase text-[10px]">Exact Site Location Coordinates</label>
            <input
              type="text"
              required
              placeholder="e.g. VGC Transmission Substation Frame"
              value={locInput}
              onChange={(e) => setLocInput(e.target.value)}
              className="w-full p-2 border border-slate-201 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1 uppercase text-[10px]">Emergency Actions Taken Containment</label>
            <textarea
              rows={3}
              placeholder="Detail safety barricades, chemical containments, or medical deployments..."
              value={actionsInput}
              onChange={(e) => setActionsInput(e.target.value)}
              className="w-full p-2 border border-slate-250 rounded-lg focus:outline-none resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" type="button" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" type="submit">
              Submit Incident Docket
            </Button>
          </div>
        </form>
      </Modal>

      {/* CRITICAL SAFETY OVERRIDE ESCALATION */}
      <Modal isOpen={escalationTriggered} onClose={() => { setEscalationTriggered(false); setFormOpen(false); resetFields(); }} title="⚠️ AUTOMATED REGULATORY SAFETY ALERT PROTOCOLS">
        <div className="space-y-4 text-xs font-bold leading-normal text-slate-700 p-1">
          <div className="flex gap-2.5 bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-800">
            <AlertTriangle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>AUTOMATIC EXECUTIVE ESCALATION DISPATCHED!</strong>
              <p className="text-[10px] font-semibold text-rose-700 mt-1 max-w-sm">
                severity rating of CRITICAL triggers automated ClickUp push alerts directly communicating with Executive Director Daniel Eze.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] text-slate-400 uppercase font-black uppercase">Triggered Runbook Tasks:</h4>
            <ul className="space-y-1.5 text-[10px]">
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Emergency HSE containment dispatch task logged.</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> SMS telemetry packet routed to HSE Lead Maryam Bello.</li>
            </ul>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => { setEscalationTriggered(false); setFormOpen(false); resetFields(); }}>
              Dismiss Overdue Notice
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default HSE;
