import React, { useState } from 'react';
import {
  Layers,
  CheckSquare,
  AlertTriangle,
  FolderLock,
  PlusSquare,
  Check,
  CalendarDays,
  Coins
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Modal } from '../components/ui/Modal';

export const Projects: React.FC = () => {
  const { projects } = useCommandCenter();

  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [changeRequestOpen, setChangeRequestOpen] = useState(false);
  
  // Change Request simple form state
  const [crsTitle, setCrsTitle] = useState('');
  const [crsBudget, setCrsBudget] = useState('');
  const [crsReason, setCrsReason] = useState('');

  const currentProj = projects[activeProjectIdx] || projects[0];

  const handleCrsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Change Request "${crsTitle}" registered! Logged under board code EXE-303, routed for Executive Approval.`);
    setCrsTitle(''); setCrsBudget(''); setCrsReason('');
    setChangeRequestOpen(false);
  };

  // Mock schedule phases for Gantt chart
  const ganttPhases = [
    { name: 'Soil Inspection & Piling', start: 0, length: 30, color: 'bg-indigo-600' },
    { name: 'Core Foundations Civil Unit', start: 25, length: 40, color: 'bg-indigo-505 bg-indigo-500' },
    { name: 'Network Telemetry Panel Hardware Wiring', start: 55, length: 25, color: 'bg-sky-500' },
    { name: 'Client Inspection & Final Grid Sync run', start: 75, length: 25, color: 'bg-emerald-500' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Sub titles metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Project Architecture & Execution Milestone Dashboard</h2>
          <p className="text-xs text-slate-500 mt-1">Real-time milestones tracking, budget vs actual variance monitoring, contractor risk scorecard registers, and strategic Gantt timeline visualizations.</p>
        </div>

        <Button variant="primary" size="sm" className="gap-1.5 font-bold shrink-0 cursor-pointer" onClick={() => setChangeRequestOpen(true)}>
          <PlusSquare className="h-4.5 w-4.5" /> Submit Change Request
        </Button>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Layers}
          value={projects.length}
          label="Active Site Developments"
          description="Monitored cross Lagos state grids"
          variant="indigo"
        />
        <StatCard
          icon={Coins}
          value="₦250.0M"
          label="Total Capital Appropriations"
          description="Allocated across Q2 frameworks"
          variant="emerald"
        />
        <StatCard
          icon={AlertTriangle}
          value={projects.filter(p => p.riskStatus === 'Red').length}
          label="Critical Risk Blockers (Red)"
          description="Eko Substation over-budget flag active"
          variant="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side Active Project selector (1/3) */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Active Project Sites</h3>
          
          <div className="space-y-3">
            {projects.map((p, idx) => (
              <Card
                key={p.id}
                onClick={() => setActiveProjectIdx(idx)}
                className={`transition-all ${
                  activeProjectIdx === idx ? 'ring-2 ring-indigo-900 border-indigo-400' : ''
                }`}
              >
                <div className="p-4 space-y-3.5">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{p.id}</span>
                      <h4 className="text-xs font-bold text-slate-900 leading-normal">{p.name}</h4>
                    </div>
                    <Badge variant={p.riskStatus === 'Red' ? 'red' : p.riskStatus === 'Green' ? 'green' : 'orange'}>
                      {p.riskStatus} Risk
                    </Badge>
                  </div>

                  <ProgressBar progress={p.completion} size="sm" variant={p.riskStatus === 'Red' ? 'red' : p.riskStatus === 'Green' ? 'green' : 'amber'} />
                  
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold uppercase">
                    <span>Spent: ₦{(p.budgetSpent/1000000).toFixed(1)}M</span>
                    <span>Client: {p.client}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side: Detailed Milestones, Gantt Timeline and metrics (2/3) */}
        {currentProj && (
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Milestone Checklist: {currentProj.name}</CardTitle>
                <Badge variant="indigo">HOD: {currentProj.owner}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                  <div className="bg-slate-50 p-3 rounded-lg text-xs leading-relaxed">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Total Approved Budget</p>
                    <p className="text-lg font-black text-slate-900 mt-1">₦{currentProj.budgetTotal.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-xs leading-relaxed">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Actual Real-Time Spend</p>
                    <p className="text-lg font-black text-slate-900 mt-1">₦{currentProj.budgetSpent.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Milestones Registry</h4>
                  <div className="space-y-2">
                    {currentProj.milestones.map((ms, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50/50 transition">
                        <div className="flex items-center gap-3">
                          <div className={`p-1 rounded-full ${ms.done ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">{ms.title}</span>
                        </div>
                        <Badge variant={ms.done ? 'green' : 'gray'}>
                          {ms.done ? 'COMPLETED' : 'PENDING'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gantt chart-style visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Continuous Gantt Planning Forecast</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="relative border-l border-slate-200 pl-4 space-y-4 pb-2">
                  {ganttPhases.map((phase, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-800">{phase.name}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{phase.length} Days Allocated</span>
                      </div>
                      
                      {/* Timeline bar representing progress start */}
                      <div className="w-full bg-slate-100 h-3 rounded-full relative">
                        <div
                          className={`absolute h-full rounded-full ${phase.color}`}
                          style={{
                            left: `${phase.start}%`,
                            width: `${phase.length}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>

      {/* Change Request Modal Preview */}
      <Modal
        isOpen={changeRequestOpen}
        onClose={() => setChangeRequestOpen(false)}
        title="Submit Structural Project Change Request"
      >
        <form onSubmit={handleCrsSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Proposal / Project Heading</label>
            <input
              type="text"
              required
              placeholder="e.g. Substation voltage threshold scope expansion"
              value={crsTitle}
              onChange={(e) => setCrsTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Additional Financial Capital Needed (₦)</label>
            <input
              type="number"
              required
              placeholder="e.g. 5000000"
              value={crsBudget}
              onChange={(e) => setCrsBudget(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Detailed Technical Justification & Risk Mitigation notes</label>
            <textarea
              required
              rows={3}
              placeholder="Provide exact reasons supporting this budget realignment..."
              value={crsReason}
              onChange={(e) => setCrsReason(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-50">
            <Button variant="outline" size="sm" type="button" onClick={() => setChangeRequestOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Inject Proposed Change
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
export default Projects;
