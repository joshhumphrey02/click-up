import React, { useState } from 'react';
import {
  ShieldAlert,
  PlusCircle,
  AlertTriangle,
  Flame,
  User,
  Activity,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const HSE: React.FC = () => {
  const { hseIncidents, addHseIncident } = useCommandCenter();

  const [formOpen, setFormOpen] = useState(false);
  const [escalationTriggered, setEscalationTriggered] = useState(false);

  // Form Fields
  const [incTitle, setIncTitle] = useState('');
  const [incType, setIncType] = useState<'Near Miss' | 'Lost Time Injury' | 'Environmental' | 'First Aid' | 'Property Damage'>('Near Miss');
  const [riskLevel, setRiskLevel] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState('Maryam Bello');
  const [closeDate, setCloseDate] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmitIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incTitle.trim() || !location.trim()) return;

    addHseIncident({
      title: incTitle,
      type: incType,
      riskLevel,
      location,
      correctiveActionOwner: owner,
      closeOutDate: closeDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: desc
    });

    if (riskLevel === 'Critical') {
      setEscalationTriggered(true);
    } else {
      setFormOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setIncTitle('');
    setIncType('Near Miss');
    setRiskLevel('Medium');
    setLocation('');
    setCloseDate('');
    setDesc('');
  };

  const handleEscalationClose = () => {
    setEscalationTriggered(false);
    setFormOpen(false);
    resetForm();
  };

  const closedPercent = Math.round(
    (hseIncidents.filter(i => i.status === 'Closed').length / hseIncidents.length) * 100
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Sub titles layout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Safety & Compliance Incident registers</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time HSE case tracking, risk level breakdown matrices, and automatic escalation channels. Under statutory policy rules, listing any 'Critical' risk sparks automated alerts directly to executive directors.
          </p>
        </div>

        <Button variant="danger" size="sm" className="gap-1.5 font-bold shrink-0 cursor-pointer" onClick={() => setFormOpen(true)}>
          <Flame className="h-4.5 w-4.5" /> File Incident Report
        </Button>
      </div>

      {/* HSE Telemetry grids */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={ShieldAlert}
          value={hseIncidents.length}
          label="Total Logged Incidents"
          description="In last 30 calendar days"
          variant="indigo"
        />
        <StatCard
          icon={Activity}
          value={hseIncidents.filter(i => i.status !== 'Closed').length}
          label="Open Corrective Actions"
          description="Enforced containment en-route"
          variant="rose"
        />
        <StatCard
          icon={CheckCircle2}
          value={`${closedPercent}%`}
          label="Action Closure Rate"
          description="Avg response time 4.2 hours"
          variant="emerald"
        />
        <StatCard
          icon={AlertTriangle}
          value={hseIncidents.filter(i => i.riskLevel === 'Critical').length}
          label="Critical Severity Breaches"
          description="Require Director led root audits"
          variant="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Matrix board (1/3) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Safety Hazard Risk Grid Matrix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-slate-505 leading-relaxed font-semibold">
              Calculates priority severity against probability rating parameters (S-Seve, L-Like).
            </p>

            {/* Matrix Board */}
            <div className="grid grid-cols-5 h-44 gap-1.5 text-[10px] font-bold text-center">
              {/* L5 down to L1 rows */}
              <div className="bg-emerald-500/10 text-emerald-700 p-2.5 rounded flex items-center justify-center">Low (L-1)</div>
              <div className="bg-emerald-500/20 text-emerald-700 p-2.5 rounded flex items-center justify-center">Low (L-2)</div>
              <div className="bg-amber-500/20 text-amber-700 p-2.5 rounded flex items-center justify-center">Med (L-3)</div>
              <div className="bg-rose-500/20 text-rose-700 p-2.5 rounded flex items-center justify-center">High (L-4)</div>
              <div className="bg-red-600 text-white p-2.5 rounded flex items-center justify-center animate-pulse">Critical (L-5)</div>

              <div className="bg-emerald-500/10 text-emerald-700 p-2 rounded flex items-center justify-center col-span-3">Standard Safety</div>
              <div className="bg-rose-500/10 text-rose-700 p-2 rounded flex items-center justify-center col-span-2">Warning Path</div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 font-semibold border-t border-slate-100 pt-3">
              <span>S1 (Insignificant)</span>
              <span>→</span>
              <span>S5 (Catastrophic)</span>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table (2/3) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Operations Hazard Register Log</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="p-4 font-bold">Ref Code</th>
                  <th className="p-4">Incident Briefing</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4 font-bold">Severity</th>
                  <th className="p-4">Site Location</th>
                  <th className="p-4">Action Owner</th>
                  <th className="p-4 text-right">Close Target</th>
                  <th className="p-4 text-center">Case Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hseIncidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-bold text-slate-900">{inc.id}</td>
                    <td className="p-4 max-w-xs break-words" title={inc.description}>
                      <span className="font-bold text-slate-800 block text-xs">{inc.title}</span>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">{inc.description}</p>
                    </td>
                    <td className="p-4 text-slate-655 font-semibold">{inc.type}</td>
                    <td className="p-4">
                      <Badge variant={inc.riskLevel === 'Critical' ? 'red' : inc.riskLevel === 'High' ? 'orange' : 'green'}>
                        {inc.riskLevel}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-600 font-semibold">{inc.location}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-slate-450" />
                        <span className="font-semibold text-slate-700">{inc.correctiveActionOwner}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right text-slate-550 font-bold">{inc.closeOutDate}</td>
                    <td className="p-4 text-center">
                      <Badge variant={getStatusVariant(inc.status)}>{inc.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>

      {/* Incident Input drawer Modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title="File Operations Hazard Incident Report"
      >
        <form onSubmit={handleSubmitIncident} className="space-y-4 text-xs font-semibold select-none">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Incident Brief title</label>
            <input
              type="text"
              required
              placeholder="e.g. Minor water leak near electric generator chamber"
              value={incTitle}
              onChange={(e) => setIncTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Breach Category</label>
              <select
                value={incType}
                onChange={(e) => setIncType(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
              >
                <option value="Near Miss">Near Miss</option>
                <option value="Lost Time Injury">Lost Time Injury</option>
                <option value="Environmental">Environmental</option>
                <option value="First Aid">First Aid</option>
                <option value="Property Damage">Property Damage</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hazard Severity Rating</label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value as any)}
                className="w-full rounded-lg border border-slate-250 p-2 text-xs focus:outline-none"
              >
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Severity Risk</option>
                <option value="Critical">Critical Breach (Automated CEO Warning)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Exact Site Location</label>
            <input
              type="text"
              required
              placeholder="e.g. Lekki Deep Sea Dock Zone B"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Corrective Action Assignee</label>
              <select
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
              >
                <option value="Maryam Bello">Maryam Bello (HSE Lead)</option>
                <option value="Olumide Awosika">Olumide Awosika (Ops Lead)</option>
                <option value="Tunde Balogun">Tunde Balogun (Procure Lead)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Close Action Target Date</label>
              <input
                type="date"
                required
                value={closeDate}
                onChange={(e) => setCloseDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Chronological incident description</label>
            <textarea
              required
              rows={3}
              placeholder="Provide clear technical, environmental or mechanical description..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-50">
            <Button variant="outline" size="sm" type="button" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" type="submit">
              Log Report
            </Button>
          </div>
        </form>
      </Modal>

      {/* AUTOMATED CRITICAL ESCALATION NOTICE MODAL */}
      <Modal
        isOpen={escalationTriggered}
        onClose={handleEscalationClose}
        title="⚠️ CRITICAL SEVERITY ESCALATION NOTICE"
        footer={(
          <Button variant="danger" size="sm" onClick={handleEscalationClose}>
            Acknowledge Escalation Route
          </Button>
        )}
      >
        <div className="space-y-4 p-1 text-xs">
          <div className="flex items-start gap-3 bg-rose-50 text-rose-800 p-4 border border-rose-200 rounded-lg">
            <ShieldAlert className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
            <div className="font-semibold leading-relaxed">
              <strong>MANDATORY STATUTORY SAFETY OVERRIDE DETECTED!</strong>
              <p className="mt-1 font-medium text-[11px]">Because the risk rating was enqueued as <strong>CRITICAL</strong>, the automation engine has triggered emergency safety SOP protocol protocols!</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-500 uppercase tracking-widest text-[10px]">Real-Time Actions Executed:</h4>
            <ul className="space-y-2 font-semibold">
              <li className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                Dispatched SMS Alert to HSE Lead Maryam Bello.
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                Interdepartmental Action Task logged on CEO Daniel Eze dashboard.
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                Locked field coordinates in central Lekki port telemetry workspace.
              </li>
            </ul>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default HSE;
