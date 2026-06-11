import React, { useState } from 'react';
import {
  Layers,
  CheckSquare,
  AlertTriangle,
  FolderLock,
  PlusSquare,
  Check,
  CalendarDays,
  Coins,
  LayoutGrid,
  List,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Modal } from '../components/ui/Modal';

interface ProjectTrackerInfo {
  id: string;
  name: string;
  manager: string;
  department: string;
  targetDate: string;
  stage: string;
  health: 'On Track' | 'At Risk' | 'Critical' | 'Completed';
  budgetAllocated: number;
  actualSpend: number;
  keyRisks: string;
  ragScope: 'Green' | 'Amber' | 'Red';
  ragSchedule: 'Green' | 'Amber' | 'Red';
  ragBudget: 'Green' | 'Amber' | 'Red';
  ragResources: 'Green' | 'Amber' | 'Red';
  progress: number;
  milestones: { title: string; target: string; status: 'Complete' | 'Pending' | 'At Risk' }[];
}

export const Projects: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'board' | 'dashboard'>('list');
  const [crModalOpen, setCrModalOpen] = useState(false);
  
  // Interactive Change Request local list showcase
  const [crTitle, setCrTitle] = useState('');
  const [crBudget, setCrBudget] = useState('');
  const [crReason, setCrReason] = useState('');
  const [changeRequests, setChangeRequests] = useState([
    { id: 'CR-101', title: 'Additional Boring Equipment Lease', amount: 1500000, reason: 'Encountered unexpected underground bedrock layers during early soil excavation.', status: 'Pending Route' }
  ]);

  const [projectList, setProjectList] = useState<ProjectTrackerInfo[]>([
    {
      id: 'PRJ-501',
      name: 'Eko Substation Civil Works Expansion',
      manager: 'Amadi Kalu',
      department: 'Infrastructure',
      targetDate: '2026-10-15',
      stage: 'Soil Excavation & Foundation Piling',
      health: 'On Track',
      budgetAllocated: 120000000,
      actualSpend: 45000000,
      keyRisks: 'Piling schedule delay due to rainy weather, potential budget overrun on concrete cost.',
      ragScope: 'Green',
      ragSchedule: 'Amber',
      ragBudget: 'Green',
      ragResources: 'Green',
      progress: 35,
      milestones: [
        { title: 'Geotechnical Soil Survey Sign-off', target: '2026-05-10', status: 'Complete' },
        { title: 'Piling Installation Completion', target: '2026-07-20', status: 'Pending' },
        { title: 'Concrete Base Pouring Ceremony', target: '2026-08-30', status: 'Pending' }
      ]
    },
    {
      id: 'PRJ-502',
      name: 'Port Harcourt Refinery Pipe Relining',
      manager: 'Chinedu Nwosu',
      department: 'Mechanical',
      targetDate: '2026-08-01',
      stage: 'Segment Refitting',
      health: 'At Risk',
      budgetAllocated: 85000000,
      actualSpend: 62050000,
      keyRisks: 'Third-party welding safety certification slow response, contractor mobilization delays.',
      ragScope: 'Amber',
      ragSchedule: 'Red',
      ragBudget: 'Amber',
      ragResources: 'Green',
      progress: 68,
      milestones: [
        { title: 'Depot Shut Down Approval Pack', target: '2026-04-12', status: 'Complete' },
        { title: 'Segment 1 & 2 Relining Inspections', target: '2026-06-02', status: 'Complete' },
        { title: 'High-Pressure Testing Loop 4', target: '2026-07-10', status: 'At Risk' }
      ]
    },
    {
      id: 'PRJ-503',
      name: 'VGC Transmission Line Overhaul',
      manager: 'Fatima Umar',
      department: 'Substations & Lines',
      targetDate: '2026-12-20',
      stage: 'Strategic Material Mobilization',
      health: 'Critical',
      budgetAllocated: 195005000,
      actualSpend: 110000000,
      keyRisks: 'Major hardware transformer delivery stuck at port, immediate SLA escalation needed.',
      ragScope: 'Red',
      ragSchedule: 'Red',
      ragBudget: 'Amber',
      ragResources: 'Red',
      progress: 20,
      milestones: [
        { title: 'Right-of-Way Community Clearances', target: '2026-05-15', status: 'Complete' },
        { title: 'Import Transformer Wharf Release', target: '2026-06-30', status: 'At Risk' },
        { title: 'Cable Laying Core Commences', target: '2526-08-15', status: 'Pending' }
      ]
    },
    {
      id: 'PRJ-504',
      name: 'Corporate HQ Solar Grid Transition',
      manager: 'Ada Okafor',
      department: 'HSE & Facilities',
      targetDate: '2026-06-30',
      stage: 'Testing and Commissioning',
      health: 'Completed',
      budgetAllocated: 45000000,
      actualSpend: 44500000,
      keyRisks: 'None. Ready for operational handover ceremony.',
      ragScope: 'Green',
      ragSchedule: 'Green',
      ragBudget: 'Green',
      ragResources: 'Green',
      progress: 100,
      milestones: [
        { title: 'Roof Structure Loading Validation', target: '2026-03-01', status: 'Complete' },
        { title: 'Inverter Array Interconnection', target: '2026-05-15', status: 'Complete' },
        { title: 'Final Commissioning and Handover', target: '2026-06-25', status: 'Complete' }
      ]
    }
  ]);

  const handleCreateCR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crTitle.trim() || !crReason.trim()) return;

    const newCR = {
      id: `CR-${Math.floor(102 + Math.random() * 800)}`,
      title: crTitle,
      amount: Number(crBudget) || 0,
      reason: crReason,
      status: 'Routed for Executive Approval'
    };

    setChangeRequests(prev => [...prev, newCR]);
    setCrTitle('');
    setCrBudget('');
    setCrReason('');
    setCrModalOpen(false);
  };

  const updateProjectHealth = (id: string, newHealth: ProjectTrackerInfo['health']) => {
    setProjectList(prev => prev.map(p => p.id === id ? { ...p, health: newHealth } : p));
  };

  const getRagStyle = (val: 'Green' | 'Amber' | 'Red') => {
    if (val === 'Red') return 'bg-rose-100 text-rose-800 border-rose-200';
    if (val === 'Amber') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-emerald-100 text-emerald-800 border-emerald-250';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-[#7C3AED] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Space: PMO-TRACKER
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">Project Execution Tracker</h2>
          <p className="text-xs text-slate-550 mt-1 font-semibold">
            Monitor milestones, RAG indicators, risk mitigation status, and project financial tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="font-bold border-indigo-200 text-[#7C3AED]/90" onClick={() => setCrModalOpen(true)}>
            Submit Change Request Form
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Layers}
          value={`${projectList.length} Active`}
          label="Total Tracked Initiatives"
          description="Operational infrastructure folders"
          variant="indigo"
        />
        <StatCard
          icon={BarChart3}
          value="₦445.0M"
          label="Combined PMO Appropriations"
          description="Capital allocations in ClickUp ledger"
          variant="emerald"
        />
        <StatCard
          icon={AlertTriangle}
          value={`${projectList.filter(p => p.health === 'Critical' || p.health === 'At Risk').length} Flagged`}
          label="Active Site Blockers (Red/Amber)"
          description="Identified risks needing attention"
          variant="rose"
        />
        <StatCard
          icon={CheckCircle2}
          value="1 Completed"
          label="Closed Out Milestones"
          description="Awaiting handover closeout pack"
          variant="blue"
        />
      </div>

      {/* View Selector Switcher */}
      <div className="flex border border-slate-200 bg-white shadow-xs rounded-xl p-1.5 justify-between items-center select-none">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveView('list')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
              activeView === 'list' ? 'bg-[#7C3AED] text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <List className="h-4 w-4" /> List View
          </button>
          <button
            onClick={() => setActiveView('board')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
              activeView === 'board' ? 'bg-[#7C3AED] text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Board View
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
              activeView === 'dashboard' ? 'bg-[#7C3AED] text-white' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="h-4 w-4" /> Dashboard View
          </button>
        </div>
        <span className="text-[10px] text-slate-400 font-extrabold uppercase mr-3 hidden sm:inline-block">
          ClickUp Workspace View Modes
        </span>
      </div>

      {/* VIEWS PRESENTATION */}
      <div>
        
        {/* 1. LIST VIEW */}
        {activeView === 'list' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">PMO Active List Data Ledger</h3>
              <Badge variant="indigo">Columns Configured</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-bold border-collapse select-none">
                <thead>
                  <tr className="bg-slate-100 text-slate-400 uppercase tracking-widest text-[9px] border-b border-slate-200">
                    <th className="p-4">Project Name & Stage</th>
                    <th className="p-4">Project Manager</th>
                    <th className="p-4 text-center">Health Status</th>
                    <th className="p-4 text-right">Budget Allocated</th>
                    <th className="p-4 text-right">Actual Spend</th>
                    <th className="p-4 text-center">Scope</th>
                    <th className="p-4 text-center">Schedule</th>
                    <th className="p-4 text-center">Budget</th>
                    <th className="p-4 text-center">Resources</th>
                    <th className="p-4">Target Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {projectList.map(proj => (
                    <tr key={proj.id} className="hover:bg-slate-50/60 transition duration-150">
                      <td className="p-4">
                        <p className="font-extrabold text-slate-900 leading-tight">{proj.name}</p>
                        <p className="text-[10px] text-[#7C3AED] uppercase tracking-wider font-extrabold mt-1.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full" /> {proj.stage}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-slate-850 font-bold">{proj.manager}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">{proj.department}</p>
                      </td>
                      <td className="p-4 text-center">
                        <select
                          value={proj.health}
                          onChange={(e) => updateProjectHealth(proj.id, e.target.value as any)}
                          className={`font-semibold text-[10px] px-2.5 py-1 rounded border focus:outline-none ${
                            proj.health === 'On Track' ? 'bg-emerald-50 text-emerald-800 border-emerald-250 font-bold' :
                            proj.health === 'At Risk' ? 'bg-amber-50 text-amber-800 border-amber-250 font-bold' :
                            proj.health === 'Critical' ? 'bg-rose-50 text-rose-800 border-rose-250 font-bold font-black' :
                            'bg-slate-100 text-slate-800 border-slate-200 font-bold'
                          }`}
                        >
                          <option value="On Track">On Track</option>
                          <option value="At Risk">At Risk</option>
                          <option value="Critical">Critical</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right font-extrabold text-slate-800">
                        ₦{proj.budgetAllocated.toLocaleString()}
                      </td>
                      <td className="p-4 text-right font-black text-slate-950">
                        ₦{proj.actualSpend.toLocaleString()}
                      </td>
                      
                      {/* RAG Indicators */}
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getRagStyle(proj.ragScope)}`}>
                          {proj.ragScope}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getRagStyle(proj.ragSchedule)}`}>
                          {proj.ragSchedule}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getRagStyle(proj.ragBudget)}`}>
                          {proj.ragBudget}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getRagStyle(proj.ragResources)}`}>
                          {proj.ragResources}
                        </span>
                      </td>
                      <td className="p-4 text-slate-405 font-bold">{proj.targetDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. BOARD VIEW */}
        {activeView === 'board' && (
          <div className="grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 select-none">
            {(['On Track', 'At Risk', 'Critical', 'Completed'] as const).map(lane => {
              const elements = projectList.filter(p => p.health === lane);
              return (
                <div key={lane} className="flex-grow min-w-[250px] bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col h-[500px]">
                  <div className="flex justify-between items-center text-xs font-black uppercase text-slate-800 border-b border-slate-200 pb-2 mb-3">
                    <span>{lane}</span>
                    <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-650 font-bold">{elements.length}</span>
                  </div>

                  <div className="space-y-3 flex-grow overflow-y-auto scrollbar-thin">
                    {elements.length === 0 ? (
                      <div className="border border-dashed border-slate-205 py-12 rounded-lg text-center text-[10px] text-slate-400 italic bg-white/40">
                        No projects in status
                      </div>
                    ) : (
                      elements.map(proj => (
                        <div key={proj.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-3">
                          <span className="text-[9px] uppercase font-bold text-slate-405 leading-none">{proj.id}</span>
                          <h4 className="text-xs font-black text-slate-900 leading-tight mt-1">{proj.name}</h4>
                          
                          <div className="space-y-1 text-[10px] text-slate-500 font-bold">
                            <p>Manager: <span className="text-slate-805 font-bold">{proj.manager}</span></p>
                            <p>Target Date: <span className="text-slate-805">{proj.targetDate}</span></p>
                          </div>

                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-purple-650 h-full" style={{ width: `${proj.progress}%` }} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. DASHBOARD VIEW */}
        {activeView === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Financial Risk Card */}
              <Card className="bg-white border border-slate-200">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="text-xs font-bold text-slate-405 uppercase tracking-wider">Budget Appropriations vs. Actual Spending To Date</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {projectList.map(p => {
                    const pct = Math.min(100, Math.round((p.actualSpend / p.budgetAllocated) * 100));
                    return (
                      <div key={p.id} className="space-y-2">
                        <div className="flex justify-between text-xs font-extrabold text-slate-700">
                          <span className="truncate max-w-[250px]">{p.name}</span>
                          <span>₦{(p.actualSpend / 1000000).toFixed(1)}M / ₦{(p.budgetAllocated / 1000000).toFixed(1)}M ({pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                          <div className={`h-full rounded-full ${pct > 90 ? 'bg-rose-500' : pct > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Risk Management Panel */}
              <Card className="bg-white border border-slate-200">
                <CardHeader className="border-b border-slate-100">
                  <CardTitle className="text-xs font-bold text-slate-405 uppercase tracking-wider">Active Risk Management Matrix</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {projectList.map(proj => (
                    <div key={proj.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 fs-semi text-xs">
                      <div className="flex justify-between items-center">
                        <strong className="text-slate-850 font-bold block">{proj.name}</strong>
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-lg uppercase tracking-wide inline-block ${
                          proj.health === 'Critical' ? 'bg-rose-100 text-rose-800' :
                          proj.health === 'At Risk' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {proj.health} Health
                        </span>
                      </div>
                      <p className="text-[10px] text-rose-700 font-bold font-semibold leading-relaxed">
                        ⚠️ Key Risk: {proj.keyRisks}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>

            {/* Change Requests Status Queue */}
            <Card className="bg-white border border-slate-200">
              <CardHeader className="border-b border-slate-100 p-4">
                <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">PMO Submitted Change Requests Tracker</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {changeRequests.map((cr) => (
                    <div key={cr.id} className="p-3 bg-[#7C3AED]/5 border border-purple-100 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-semibold">
                      <div>
                        <span className="text-[9px] uppercase tracking-wide font-extrabold text-indigo-750 block">{cr.id} Request</span>
                        <strong className="text-slate-900 font-extrabold">{cr.title}</strong>
                        <p className="text-[10px] text-slate-500 mt-0.5">{cr.reason}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-extrabold text-[#7C3AED]">Alloc: ₦{cr.amount.toLocaleString()}</span>
                        <Badge variant="indigo">{cr.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        )}

      </div>

      {/* FORM MODAL: PMO Change Requisition */}
      <Modal isOpen={crModalOpen} onClose={() => setCrModalOpen(false)} title="Intake Form: PMO Project Change Application">
        <form onSubmit={handleCreateCR} className="space-y-4 font-bold text-xs">
          <div>
            <label className="block text-slate-650 mb-1 uppercase text-[10px]">Change Requisition Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Concrete Supplier Swapping"
              value={crTitle}
              onChange={(e) => setCrTitle(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-650 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-650 mb-1 uppercase text-[10px]">Emergency Budget Requested (₦)</label>
            <input
              type="number"
              required
              placeholder="e.g. 2500000"
              value={crBudget}
              onChange={(e) => setCrBudget(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-650 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-650 mb-1 uppercase text-[10px]">Justification & Impact Assessment Reason</label>
            <textarea
              required
              rows={3}
              placeholder="Provide exact project risk if not budgeted..."
              value={crReason}
              onChange={(e) => setCrReason(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" type="button" onClick={() => setCrModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Submit Requisition Pack
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default Projects;
