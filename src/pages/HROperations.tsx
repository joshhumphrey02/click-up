import React, { useState } from 'react';
import {
  Users,
  Search,
  PlusCircle,
  TrendingUp,
  GraduationCap,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const HROperations: React.FC = () => {
  const { onboardingTasks, addOnboardingTask } = useCommandCenter();

  const [modalOpen, setModalOpen] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('Projects');
  const [contractType, setContractType] = useState<'Full-time' | 'Contract' | 'Consultant'>('Full-time');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('High');

  // Submit new onboarding candidate
  const handleSubmitOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !position.trim()) return;

    addOnboardingTask({
      name: candidateName,
      position,
      department,
      status: 'New Request',
      startDate: new Date().toISOString().split('T')[0],
      contractType,
      employeeId: 'EMP-PEND',
      probationEnd: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      owner: 'Ada Okafor',
      priority,
      approvalStatus: 'Pending'
    });

    // Reset fields
    setCandidateName('');
    setPosition('');
    setModalOpen(false);
  };

  const kanbanStages = [
    { key: 'New Request', label: 'New Request', border: 'border-t-slate-300' },
    { key: 'Under Review', label: 'Under Review', border: 'border-t-sky-400' },
    { key: 'Interview Stage', label: 'Interview Stage', border: 'border-t-amber-400' },
    { key: 'Offer Sent', label: 'Offer Sent', border: 'border-t-indigo-400' },
    { key: 'Onboarding', label: 'Onboarding', border: 'border-t-fuchsia-400' },
    { key: 'Completed', label: 'Completed', border: 'border-t-emerald-400' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Dynamic Sub title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-slate-800">HR Operations & Onboarding Pipeline</h2>
          <p className="text-xs text-slate-500 mt-1">Centralizing employee lifecycle workflows, recruitment requisitions, contract indicators, and onboarding checklists.</p>
        </div>

        <Button variant="primary" size="sm" className="gap-1.5 font-bold shrink-0 cursor-pointer" onClick={() => setModalOpen(true)}>
          <PlusCircle className="h-4.5 w-4.5" /> Log Onboarding Request
        </Button>
      </div>

      {/* Stats Widgets Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          value="142 Staff"
          label="Total Group Headcount"
          description="Across 5 active departments"
          variant="indigo"
        />
        <StatCard
          icon={Briefcase}
          value="6 Vacancies"
          label="Open Job Openings"
          description="Active recruiting on LinkedIn/Job boards"
          variant="blue"
        />
        <StatCard
          icon={GraduationCap}
          value={onboardingTasks.filter(o => o.status !== 'Completed').length}
          label="Candidates In-Onboarding"
          description="Navigating compliance & checklist schedules"
          variant="fuchsia"
        />
        <StatCard
          icon={AlertCircle}
          value="1 Required"
          label="Probation Reviews Pending"
          description="Requiring HOD evaluation sign-off"
          variant="amber"
        />
      </div>

      {/* Kanban Board Container */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Onboarding Stages Unified Kanban</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin select-none">
          {kanbanStages.map((stage) => {
            const stageTasks = onboardingTasks.filter(t => t.status === stage.key);
            return (
              <div
                key={stage.key}
                className={`flex-1 min-w-[250px] max-w-[320px] bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col h-[520px] border-t-4 ${stage.border}`}
              >
                {/* Column Title Header */}
                <div className="flex justify-between items-center mb-3 text-xs font-bold text-slate-805">
                  <span>{stage.label}</span>
                  <span className="bg-slate-200/60 text-slate-600 px-2 py-0.5 rounded-full">{stageTasks.length}</span>
                </div>

                {/* Candidate space stack */}
                <div className="space-y-3 flex-grow overflow-y-auto pr-1 scrollbar-thin">
                  {stageTasks.length === 0 ? (
                    <div className="border border-dashed border-slate-200 rounded-lg p-6 text-center text-[10px] text-slate-400 italic">
                      Empty Lane
                    </div>
                  ) : (
                    stageTasks.map((cand) => (
                      <Card key={cand.id} className="border border-slate-200 hover:border-slate-350 shadow-xs">
                        <CardContent className="p-4 space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                              <span>{cand.employeeId}</span>
                              <Badge variant={cand.priority === 'High' ? 'red' : 'yellow'}>{cand.priority}</Badge>
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 mt-1 leading-normal">{cand.name}</h4>
                            <p className="text-[10px] text-indigo-700 font-semibold">{cand.position}</p>
                          </div>

                          <div className="space-y-1.5 text-[10px] text-slate-500 font-semibold uppercase leading-normal border-t border-slate-50 pt-2.5">
                            <div className="flex justify-between">
                              <span>Dept:</span> <span className="text-slate-700">{cand.department}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Modality:</span> <span className="text-slate-700">{cand.contractType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Probation:</span> <span className="text-slate-700">{cand.probationEnd}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Owner:</span> <span className="text-slate-740">{cand.owner}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Onboarding Logging Drawer Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Register Onboarding Lifecycle Slot"
      >
        <form onSubmit={handleSubmitOnboarding} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Employee/Candidate Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Adebowale Okafor"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Position/Role</label>
            <input
              type="text"
              required
              placeholder="e.g. Operations Coordinator"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Assigned Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="HR Operations">HR Operations</option>
                <option value="Procurement">Procurement</option>
                <option value="Projects">Projects</option>
                <option value="Vendor Management">Vendor Management</option>
                <option value="HSE">HSE</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Contract Type</label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value as any)}
                className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Consultant">Consultant</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">SLA Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:outline-none"
            >
              <option value="Low">Low (Standard)</option>
              <option value="Medium">Medium (Escalate)</option>
              <option value="High">High (Immediate Action)</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-50 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Log Candidate
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
export default HROperations;
