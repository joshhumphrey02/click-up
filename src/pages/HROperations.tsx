import React, { useState } from 'react';
import {
  Users,
  Search,
  PlusCircle,
  TrendingUp,
  GraduationCap,
  Briefcase,
  AlertCircle,
  FileCheck2,
  Calendar,
  Clock,
  Send,
  UserCheck2,
  CheckSquare,
  ArrowRight,
  ClipboardList,
  Fingerprint,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const HROperations: React.FC = () => {
  const { onboardingTasks, addOnboardingTask, currentRole } = useCommandCenter();

  // Selected Active Tab in HR Space
  const [activeTab, setActiveTab] = useState<'recruitment' | 'onboarding' | 'records' | 'leaves' | 'performance' | 'training' | 'exits'>('recruitment');
  
  // Modals for Form Previews
  const [activeFormModal, setActiveFormModal] = useState<'recruitment' | 'leave' | 'performance' | 'exit' | null>(null);

  // For adding custom candidates in Kanban
  const [addCandModal, setAddCandModal] = useState(false);
  const [candName, setCandName] = useState('');
  const [candPos, setCandPos] = useState('');
  const [candDept, setCandDept] = useState('Marketing');
  const [candType, setCandType] = useState<'Full-time' | 'Contract' | 'Consultant'>('Full-time');

  // Interactive Onboarding Task selection (automap logic showcase)
  const [selectedOnboardCand, setSelectedOnboardCand] = useState<string>('EMP-001');

  // Interactive states for test intake forms:
  const [recruitFormName, setRecruitFormName] = useState('');
  const [recruitFormRole, setRecruitFormRole] = useState('');
  const [recruitFormDept, setRecruitFormDept] = useState('Engineering');
  const [recruitFormType, setRecruitFormType] = useState<'Full-time' | 'Contract' | 'Consultant'>('Full-time');
  const [recruitFormPriority, setRecruitFormPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [recruitFormJustification, setRecruitFormJustification] = useState('');

  const [leaveFormName, setLeaveFormName] = useState('');
  const [leaveFormDept, setLeaveFormDept] = useState('Operations');
  const [leaveFormType, setLeaveFormType] = useState('Annual Leave');
  const [leaveFormStart, setLeaveFormStart] = useState('');
  const [leaveFormEnd, setLeaveFormEnd] = useState('');

  const [perfFormName, setPerfFormName] = useState('');
  const [perfFormRating, setPerfFormRating] = useState('Meets Expectations (Level 3)');
  const [appraisalSubmissions, setAppraisalSubmissions] = useState([
    { id: 'APP-1', name: 'Chioma Nwosu', rating: 'Exceeds Expectations (Level 5)', reviewer: 'Ada Okafor', date: '2026-06-10' },
    { id: 'APP-2', name: 'Kelechi Egwu', rating: 'Meets Expectations (Level 3)', reviewer: 'Ada Okafor', date: '2026-06-11' }
  ]);

  const [exitFormName, setExitFormName] = useState('');
  const [exitFormPos, setExitFormPos] = useState('');
  const [exitFormDept, setExitFormDept] = useState('Operations');
  const [exitFormDate, setExitFormDate] = useState('');

  // Trigger local leaves approve/reject status hook
  const [leaves, setLeaves] = useState([
    { id: 'L-1', name: 'Amadi Kalu', dept: 'Operations', days: 5, start: '2026-06-15', end: '2026-06-20', type: 'Annual Leave', status: 'Pending' },
    { id: 'L-2', name: 'Funmi Alao', dept: 'HR', days: 2, start: '2026-06-25', end: '2026-06-27', type: 'Casual Leave', status: 'Approved' },
    { id: 'L-3', name: 'Musa Bello', dept: 'Procurement', days: 3, start: '2026-07-02', end: '2026-07-05', type: 'Sick Leave', status: 'Pending' }
  ]);

  const updateLeaveStatus = (id: string, newStatus: string) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleRecruitmentIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruitFormName.trim() || !recruitFormRole.trim()) return;

    addOnboardingTask({
      name: recruitFormName,
      position: recruitFormRole,
      department: recruitFormDept,
      status: 'Request Submitted',
      startDate: new Date().toISOString().split('T')[0],
      contractType: recruitFormType,
      employeeId: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      probationEnd: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      owner: 'Ada Okafor',
      priority: recruitFormPriority,
      approvalStatus: 'Pending'
    });

    setRecruitFormName('');
    setRecruitFormRole('');
    setRecruitFormJustification('');
    setActiveFormModal(null);
  };

  const handleLeaveIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveFormName.trim() || !leaveFormStart || !leaveFormEnd) return;

    const start = new Date(leaveFormStart);
    const end = new Date(leaveFormEnd);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    const newLeave = {
      id: `L-${leaves.length + 1}`,
      name: leaveFormName,
      dept: leaveFormDept,
      days: diffDays,
      start: leaveFormStart,
      end: leaveFormEnd,
      type: leaveFormType,
      status: 'Pending'
    };

    setLeaves(prev => [newLeave, ...prev]);
    setLeaveFormName('');
    setLeaveFormStart('');
    setLeaveFormEnd('');
    setActiveFormModal(null);
  };

  const handlePerformanceIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!perfFormName.trim()) return;

    const newAppraisal = {
      id: `APP-${appraisalSubmissions.length + 1}`,
      name: perfFormName,
      rating: perfFormRating,
      reviewer: 'Ada Okafor',
      date: new Date().toISOString().split('T')[0]
    };

    setAppraisalSubmissions(prev => [newAppraisal, ...prev]);
    setPerfFormName('');
    setActiveFormModal(null);
  };

  const handleExitIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exitFormName.trim() || !exitFormPos.trim()) return;

    const newExit = {
      id: `EX-${exitProcesses.length + 10}`,
      name: exitFormName,
      pos: exitFormPos,
      exitDate: exitFormDate || new Date().toISOString().split('T')[0],
      dept: exitFormDept,
      auditStatus: 'Pending Sign-off',
      clearance: '0% Complete'
    };

    setExitProcesses(prev => [newExit, ...prev]);
    setExitFormName('');
    setExitFormPos('');
    setExitFormDate('');
    setActiveFormModal(null);
  };

  const handleCreateRecruitmentRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName.trim() || !candPos.trim()) return;

    addOnboardingTask({
      name: candName,
      position: candPos,
      department: candDept,
      status: 'Request Submitted',
      startDate: new Date().toISOString().split('T')[0],
      contractType: candType,
      employeeId: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      probationEnd: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      owner: 'Ada Okafor',
      priority: 'High',
      approvalStatus: 'Pending'
    });

    setCandName('');
    setCandPos('');
    setAddCandModal(false);
  };

  const hrSpacesTabs = [
    { key: 'recruitment', label: 'Recruitment board' },
    { key: 'onboarding', label: 'Onboarding runbook' },
    { key: 'records', label: 'Employee Records' },
    { key: 'leaves', label: 'Leave Requests' },
    { key: 'performance', label: 'Performance Reviews' },
    { key: 'training', label: 'Training & Skills' },
    { key: 'exits', label: 'Staff Offboarding' }
  ] as const;

  const recruitmentStatuses = [
    'Request Submitted',
    'Under Review',
    'Shortlisting',
    'Interview Scheduled',
    'Offer Approved',
    'Hired',
    'Onboarding Started'
  ] as const;

  // Static HR Data representation
  const [employeeRecords, setEmployeeRecords] = useState([
    { id: 'EMP-110', name: 'Emeka Obi', dept: 'Engineering', pos: 'Mechanical Engineer', email: 'e.obi@nextgen.com', contract: 'Full-time', status: 'Active' },
    { id: 'EMP-111', name: 'Fatima Umar', dept: 'Procurement', pos: 'Contract Negotiator', email: 'f.umar@nextgen.com', contract: 'Full-time', status: 'Active' },
    { id: 'EMP-112', name: 'Chioma Nwosu', dept: 'HSE', pos: 'Safety Inspector', email: 'c.nwosu@nextgen.com', contract: 'Contract', status: 'Active' },
    { id: 'EMP-113', name: 'Kelechi Egwu', dept: 'Operations', pos: 'Site Supervisor', email: 'k.egwu@nextgen.com', contract: 'Consultant', status: 'On Probation' },
    { id: 'EMP-114', name: 'Sade Adesina', dept: 'Finance', pos: 'Senior Auditor', email: 's.adesina@nextgen.com', contract: 'Full-time', status: 'Active' }
  ]);

  const [exitProcesses, setExitProcesses] = useState([
    { id: 'EX-9', name: 'Lanre Davies', pos: 'Operations Manager', exitDate: '2026-06-30', dept: 'Projects', auditStatus: 'Pending Sign-off', clearance: '70% Complete' },
    { id: 'EX-10', name: 'Zainab Yusuf', pos: 'HR Assistant', exitDate: '2026-07-15', border: 'none', dept: 'HR & Admin', auditStatus: 'Cleared', clearance: '100% Complete' }
  ]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Space Sub header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-[#7C3AED]/10 text-[#7C3AED] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Space: HR-OPS
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">HR Operations Space</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Track talent acquisition pipelines, candidate reviews, employee onboarding, and personnel status logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="font-bold border-[#7C3AED]/20 text-[#7C3AED] hover:bg-purple-50" onClick={() => setActiveFormModal('recruitment')}>
            Preview Form Installs
          </Button>
          <Button variant="primary" size="sm" className="gap-1.5 font-bold cursor-pointer" onClick={() => setAddCandModal(true)}>
            <PlusCircle className="h-4.5 w-4.5" /> Log Recruitment Request
          </Button>
        </div>
      </div>

      {/* HR Dashboard KPI Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Pipeline Space</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">7 Stages</h3>
          <p className="text-[10px] text-slate-500 mt-1 font-semibold">Active candidate funnel</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Leave Status</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{leaves.filter(l => l.status === 'Pending').length} Pending</h3>
          <p className="text-[10px] text-amber-600 mt-1 font-bold">Needs HOD review</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Total Headcount</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">142 Staff</h3>
          <p className="text-[10px] text-slate-500 mt-1 font-semibold">5 Operational departments</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Open Positions</p>
          <h3 className="text-xl font-bold text-[#7C3AED] mt-1">6 Active</h3>
          <p className="text-[10px] text-slate-500 mt-1 font-semibold">Recruiting pipelines</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs font-semibold">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Training Status</p>
          <h3 className="text-xl font-bold text-emerald-600 mt-1">94% Done</h3>
          <p className="text-[10px] text-slate-500 mt-1">Compliance training progress</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs font-semibold">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Exits Processed</p>
          <h3 className="text-xl font-bold text-slate-900 mt-1">2 Active</h3>
          <p className="text-[10px] text-rose-500 mt-1 font-bold">Clearance pending</p>
        </div>
      </div>

      {/* Embedded ClickUp View Navigation Bar */}
      <div className="flex border-b border-slate-250 bg-slate-100 rounded-lg p-1.5 gap-1 select-none">
        {hrSpacesTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition duration-150 cursor-pointer ${
              activeTab === tab.key 
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tab Area Content */}
      <div className="transition-all duration-200">
        
        {/* RECRUITMENT TAB */}
        {activeTab === 'recruitment' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-850 uppercase tracking-tight">Active Recruitment Kanban Board</h3>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">Statuses correspond directly to ClickUp custom states mapping candidate selection benchmarks.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="xs" onClick={() => setActiveFormModal('recruitment')}>
                  Test Intake Form
                </Button>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-6 select-none scrollbar-thin">
              {recruitmentStatuses.map(status => {
                const candidates = onboardingTasks.filter(t => t.status === status || (status === 'Request Submitted' && t.status === 'New Request'));
                return (
                  <div key={status} className="flex-1 min-w-[245px] max-w-[300px] bg-slate-50 border border-slate-205 rounded-xl p-3 flex flex-col h-[525px]">
                    <div className="flex items-center justify-between font-extrabold text-[11px] text-slate-800 pb-2 border-b border-slate-200/80 mb-3 uppercase tracking-wider">
                      <h3>{status}</h3>
                      <span className="bg-slate-205 text-slate-600 font-bold px-2 py-0.5 rounded-full">{candidates.length}</span>
                    </div>

                    <div className="space-y-3 overflow-y-auto flex-grow scrollbar-thin pr-1">
                      {candidates.length === 0 ? (
                        <div className="border border-dashed border-slate-200 rounded-xl p-8 text-[11px] text-slate-400 text-center italic mt-4 bg-white/40">
                          Empty Lane
                        </div>
                      ) : (
                        candidates.map((cand, candIdx) => (
                          <div key={cand.id || candIdx} className="bg-white p-3.5 rounded-xl border border-slate-200 hover:shadow-xs transition duration-150 space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-extrabold">
                              <span className="text-slate-400">{cand.employeeId || 'REC-REQ'}</span>
                              <Badge variant={cand.priority === 'High' ? 'red' : 'indigo'}>{cand.priority || 'Low'}</Badge>
                            </div>
                            <h4 className="text-xs font-extrabold text-slate-855 mt-1 leading-snug">{cand.name}</h4>
                            <p className="text-[10px] text-[#7C3AED] leading-none font-extrabold uppercase tracking-wider">{cand.position}</p>
                            
                            <div className="space-y-1.5 text-[10px] text-slate-500 font-bold uppercase leading-normal border-t border-slate-100 pt-2 bg-slate-50/50 p-2 rounded">
                              <div className="flex justify-between">
                                <span className="text-[9px] text-slate-400">Department:</span> <span className="text-slate-800">{cand.department}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[9px] text-slate-400">Modality:</span> <span className="text-slate-800">{cand.contractType}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ONBOARDING AUTOMATION RUNBOOK TAB */}
        {activeTab === 'onboarding' && (
          <div className="space-y-6">
            
            <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-start gap-4 z-10 relative">
                <div className="p-3 bg-[#7C3AED]/10 text-[#7C3AED] rounded-xl shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#7C3AED] uppercase tracking-wider">ClickUp Core Automation: Hired Workspace Generation</h3>
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold mt-1 max-w-3xl">
                    When a candidate’s Status is updated to <strong className="text-slate-900 border-b border-dashed border-emerald-600 pb-0.5">Hired</strong>, ClickUp automatically generates direct task items in IT, Logistics, HR, and Training checklists to secure zero-delay onboarding.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Select Candidate Showcase */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-5 rounded-xl space-y-4">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Hired Staff Profile</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => setSelectedOnboardCand('EMP-001')}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between cursor-pointer transition ${selectedOnboardCand === 'EMP-001' ? 'border-purple-500 bg-purple-50 text-slate-800 font-bold' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    <div>
                      <p className="text-xs font-bold leading-none mb-1">Amara Okonkwo</p>
                      <p className="text-[10px] text-slate-405 uppercase font-extrabold tracking-wider">HSE Lead Inspector</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-purple-650" />
                  </button>

                  <button 
                    onClick={() => setSelectedOnboardCand('EMP-002')}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between cursor-pointer transition ${selectedOnboardCand === 'EMP-002' ? 'border-purple-500 bg-purple-50 text-slate-800 font-bold' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    <div>
                      <p className="text-xs font-bold leading-none mb-1">Tariq Al-Mansoor</p>
                      <p className="text-[10px] text-slate-405 uppercase font-extrabold tracking-wider">Senior Procurement Officer</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-purple-650" />
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-150 rounded-lg p-3 text-[11px] text-slate-505 font-semibold">
                  Click a candidate profile to view onboarding checklists automatically generated in respective workspace lists.
                </div>
              </div>

              {/* Automation Subtask List Output */}
              <div className="lg:col-span-8 space-y-4">
                <Card className="bg-white border border-slate-200">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-xs font-extrabold uppercase text-slate-705 tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
                      Generated Workspace Checklists for: {selectedOnboardCand === 'EMP-001' ? 'Amara Okonkwo' : 'Tariq Al-Mansoor'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3">
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="border border-slate-150 p-3.5 rounded-xl bg-slate-50/50">
                        <strong className="text-[11px] uppercase text-indigo-750 block font-bold mb-2">💻 IT & Provisioning Checklist</strong>
                        <div className="space-y-2 text-[11px] text-slate-700 font-semibold">
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-emerald-500" /> IT Account Setup (Email, Slack, ClickUp)</div>
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-amber-500" /> Device Allocation (Laptop, Charger, Token)</div>
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-slate-400" /> Access Keys & ID Card Processing</div>
                        </div>
                      </div>

                      <div className="border border-slate-150 p-3.5 rounded-xl bg-slate-50/50">
                        <strong className="text-[11px] uppercase text-[#7C3AED] block font-bold mb-2">📅 Compliance & HR Onboarding</strong>
                        <div className="space-y-2 text-[11px] text-slate-700 font-semibold">
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-emerald-500" /> Group Orientation Scheduling</div>
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-emerald-500" /> HSE Compliance Training Module dispatch</div>
                          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded bg-amber-500" /> Probation Review 90-Day Scheduling</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between items-center text-[10px] text-slate-405 font-extrabold uppercase">
                      <span>Status: Auto Trigger Active</span>
                      <span className="text-[#7C3AED]">Linked to Form Triggers</span>
                    </div>

                  </CardContent>
                </Card>
              </div>

            </div>

          </div>
        )}

        {/* EMPLOYEE RECORDS TAB */}
        {activeTab === 'records' && (
          <div className="bg-white border border-slate-201 rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Digital Employee Master Roll</h3>
              <span className="text-[10px] bg-slate-200 px-2.5 py-1 rounded font-bold">{employeeRecords.length} Active Records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-bold select-none">
                <thead>
                  <tr className="bg-slate-100/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Position</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Modality</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {employeeRecords.map(rec => (
                    <tr key={rec.id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 text-slate-400">{rec.id}</td>
                      <td className="p-3.5 text-slate-900 font-extrabold">{rec.name}</td>
                      <td className="p-3.5 text-slate-900">{rec.dept}</td>
                      <td className="p-3.5 text-indigo-700">{rec.pos}</td>
                      <td className="p-3.5 lowercase text-slate-500 font-semibold">{rec.email}</td>
                      <td className="p-3.5 font-semibold text-slate-600">{rec.contract}</td>
                      <td className="p-3.5 text-right">
                        <Badge variant={rec.status === 'Active' ? 'green' : 'amber'}>{rec.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LEAVE REQUESTS TAB */}
        {activeTab === 'leaves' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-xs font-extrabold text-slate-850 uppercase tracking-wide">Interactive Leave Intake Approvals</h3>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">Decisions on requests immediately notify staff and update leave logs.</p>
              </div>
              <Button variant="outline" size="xs" onClick={() => setActiveFormModal('leave')}>
                Test Leave Form
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {leaves.map(req => (
                <Card key={req.id} className="bg-white border border-slate-200">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-extrabold tracking-widest">{req.id}</span>
                        <h4 className="text-sm font-extrabold text-slate-900 mt-1">{req.name}</h4>
                        <p className="text-[10px] text-slate-505 font-bold">{req.dept} Department</p>
                      </div>
                      <Badge variant={req.status === 'Approved' ? 'green' : req.status === 'Rejected' ? 'red' : 'amber'}>
                        {req.status}
                      </Badge>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-600 font-semibold bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                      <div className="flex justify-between">
                        <span>Duration:</span> <strong className="text-slate-900">{req.days} Working Days</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span> <span className="text-slate-700">{req.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Span:</span> <span className="text-slate-500">{req.start} to {req.end}</span>
                      </div>
                    </div>

                    {req.status === 'Pending' && (
                      <div className="flex gap-2.5 pt-1">
                        <button 
                          onClick={() => updateLeaveStatus(req.id, 'Approved')}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase tracking-wide py-2 rounded-lg cursor-pointer transition shadow-xs"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => updateLeaveStatus(req.id, 'Rejected')}
                          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[10px] uppercase tracking-wide py-2 rounded-lg cursor-pointer transition shadow-xs"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* PERFORMANCE REVIEWS TAB */}
        {activeTab === 'performance' && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border border-slate-200">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Evaluation Setup Checklists</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="p-3.5 rounded-xl border border-slate-150 bg-slate-50 flex justify-between items-center text-slate-700">
                  <div>
                    <strong className="text-xs font-bold block text-slate-900">Mid-Year HOD Appraisals</strong>
                    <span className="text-[10px] text-purple-650 font-bold block uppercase mt-0.5">ClickUp List: Appraisal Forms</span>
                  </div>
                  <Badge variant="green">Active</Badge>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-150 bg-slate-50 flex justify-between items-center text-slate-700">
                  <div>
                    <strong className="text-xs font-bold block text-slate-900">Annual Peer-to-Peer Review Sync</strong>
                    <span className="text-[10px] text-purple-650 font-bold block uppercase mt-0.5">ClickUp List: Peer Appraisals</span>
                  </div>
                  <Badge variant="amber">Not Started</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Review Template Automation</h4>
                <p className="text-[11px] text-slate-655 font-semibold leading-relaxed">
                  Every 180 Days, ClickUp automatically sends standard performance forms and templates to team members, generating active task lines in respective HOD clearance schedules.
                </p>
                <div className="pt-3">
                  <Button variant="outline" size="sm" onClick={() => setActiveFormModal('performance')}>
                    Test Appraisal Intake Form
                  </Button>
                </div>
              </div>

              {appraisalSubmissions.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                  <h4 className="text-xs font-extrabold text-[#7C3AED] uppercase tracking-wider border-b border-slate-100 pb-2">Completed Appraisals Log</h4>
                  <div className="space-y-2">
                    {appraisalSubmissions.map((app) => (
                      <div key={app.id} className="p-2.5 bg-slate-50 rounded-lg flex justify-between items-center text-xs font-semibold">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block">{app.id} • Submitted {app.date}</span>
                          <span className="text-slate-800 font-extrabold">{app.name}</span>
                          <span className="text-[10.5px] text-purple-600 block mt-0.5">{app.rating}</span>
                        </div>
                        <span className="text-[10px] bg-purple-50 text-[#7C3AED] border border-purple-100 px-2 py-0.5 rounded font-bold uppercase">{app.reviewer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRAINING TAB */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest mb-4">Mandatory Compliance Training Logs</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1">
                    <span>HSE Site Operations Safety Course</span>
                    <span className="text-emerald-600">92% Compliance</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-extrabold text-slate-700 mb-1">
                    <span>ClickUp Solution Workspace Training</span>
                    <span className="text-emerald-500">85% Compliance</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAFF OFFBOARDING TAB */}
        {activeTab === 'exits' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-xs font-extrabold text-slate-850 uppercase tracking-wide">Exit Clearance & handover check</h3>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">Tying offboard clearances directly to asset return files.</p>
              </div>
              <Button variant="outline" size="xs" onClick={() => setActiveFormModal('exit')}>
                Test Exit Clearance Form
              </Button>
            </div>

            <div className="bg-white border border-slate-201 rounded-xl shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs font-bold select-none">
                <thead>
                  <tr className="bg-slate-150 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <th className="p-3">Staff Name</th>
                    <th className="p-3">Position</th>
                    <th className="p-3">Exit Target Date</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Clearance Completion</th>
                    <th className="p-3 text-right">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {exitProcesses.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 text-slate-900 font-extrabold">{p.name}</td>
                      <td className="p-3 text-[#7C3AED] font-bold">{p.pos}</td>
                      <td className="p-3 text-slate-500">{p.exitDate}</td>
                      <td className="p-3 text-slate-500">{p.dept}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-indigo-750">{p.clearance}</span>
                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full" style={{ width: p.clearance }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <Badge variant={p.auditStatus === 'Cleared' ? 'green' : 'amber'}>{p.auditStatus}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* FORM PREVIEW MODALS SECTION */}
      {/* 1. RECRUITMENT REQUEST FORM */}
      <Modal isOpen={activeFormModal === 'recruitment'} onClose={() => setActiveFormModal(null)} title="Intake Form: Recruitment Request" footer={null}>
        <form onSubmit={handleRecruitmentIntakeSubmit} className="space-y-4 font-bold text-xs">
          <Badge variant="indigo">ClickUp Form Embed Active</Badge>
          
          <div className="space-y-4 bg-slate-50/55 p-4 rounded-xl border border-slate-150 text-slate-700">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Candidate Full Name</label>
              <input 
                type="text" 
                required 
                value={recruitFormName} 
                onChange={(e) => setRecruitFormName(e.target.value)} 
                placeholder="e.g. Chinedu Alao" 
                className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Target Role/Position Title</label>
              <input 
                type="text" 
                required 
                value={recruitFormRole} 
                onChange={(e) => setRecruitFormRole(e.target.value)} 
                placeholder="e.g. Senior Piping Specialist" 
                className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600" 
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Department</label>
                <select 
                  value={recruitFormDept} 
                  onChange={(e) => setRecruitFormDept(e.target.value)} 
                  className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Procurement">Procurement</option>
                  <option value="HSE">HSE</option>
                  <option value="Operations">Operations</option>
                  <option value="HR & Admin">HR & Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Priority</label>
                <select 
                  value={recruitFormPriority} 
                  onChange={(e) => setRecruitFormPriority(e.target.value as any)} 
                  className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Contract Type</label>
                <select 
                  value={recruitFormType} 
                  onChange={(e) => setRecruitFormType(e.target.value as any)} 
                  className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Consultant">Consultant</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Budget Allocation</label>
                <select className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none">
                  <option>Tier 1 ($50k - $80k)</option>
                  <option>Tier 2 ($80k - $120k)</option>
                  <option>Tier 3 ($120k+)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Justification Memo</label>
              <textarea 
                rows={2} 
                value={recruitFormJustification} 
                onChange={(e) => setRecruitFormJustification(e.target.value)} 
                placeholder="Provide hiring justification context..." 
                className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white resize-none focus:outline-none focus:ring-1 focus:ring-indigo-600" 
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setActiveFormModal(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Submit Intake Form
            </Button>
          </div>
        </form>
      </Modal>
 
       {/* 2. LEAVE APPLICATION FORM */}
       <Modal isOpen={activeFormModal === 'leave'} onClose={() => setActiveFormModal(null)} title="Intake Form: Leave Application" footer={null}>
         <form onSubmit={handleLeaveIntakeSubmit} className="space-y-4 font-bold text-xs">
           <Badge variant="indigo">ClickUp Form Embed Active</Badge>
 
           <div className="space-y-4 bg-slate-50/55 p-4 rounded-xl border border-slate-150 text-slate-700">
             <div>
               <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Applicant Name</label>
               <input 
                 type="text" 
                 required 
                 value={leaveFormName} 
                 onChange={(e) => setLeaveFormName(e.target.value)} 
                 placeholder="e.g. Amadi Kalu" 
                 className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600" 
               />
             </div>
 
             <div className="grid grid-cols-2 gap-3">
               <div>
                 <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Department</label>
                 <select 
                   value={leaveFormDept} 
                   onChange={(e) => setLeaveFormDept(e.target.value)} 
                   className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none"
                 >
                   <option value="Operations">Operations</option>
                   <option value="Engineering">Engineering</option>
                   <option value="Procurement">Procurement</option>
                   <option value="HSE">HSE</option>
                   <option value="HR & Admin">HR & Admin</option>
                 </select>
               </div>
 
               <div>
                 <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Leave Category</label>
                 <select 
                   value={leaveFormType} 
                   onChange={(e) => setLeaveFormType(e.target.value)} 
                   className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none"
                 >
                   <option value="Annual Leave">Annual Leave</option>
                   <option value="Casual Leave">Casual Leave</option>
                   <option value="Sick Leave">Sick Leave</option>
                   <option value="Maternity Leave">Maternity Leave</option>
                 </select>
               </div>
             </div>
 
             <div className="grid grid-cols-2 gap-3">
               <div>
                 <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Start Date</label>
                 <input 
                   type="date" 
                   required 
                   value={leaveFormStart} 
                   onChange={(e) => setLeaveFormStart(e.target.value)} 
                   className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none" 
                 />
               </div>
               <div>
                 <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">End Date</label>
                 <input 
                   type="date" 
                   required 
                   value={leaveFormEnd} 
                   onChange={(e) => setLeaveFormEnd(e.target.value)} 
                   className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none" 
                 />
               </div>
             </div>
           </div>
 
           <div className="flex items-center justify-end gap-3 pt-2">
             <Button variant="outline" size="sm" type="button" onClick={() => setActiveFormModal(null)}>
               Cancel
             </Button>
             <Button variant="primary" size="sm" type="submit">
               Submit Leave Request
             </Button>
           </div>
         </form>
       </Modal>
 
       {/* 3. PERFORMANCE REVIEW FORM */}
       <Modal isOpen={activeFormModal === 'performance'} onClose={() => setActiveFormModal(null)} title="Intake Form: HOD Appraisal Submit" footer={null}>
         <form onSubmit={handlePerformanceIntakeSubmit} className="space-y-4 font-bold text-xs">
           <Badge variant="indigo">ClickUp Form Embed Active</Badge>
 
           <div className="space-y-4 bg-slate-50/55 p-4 rounded-xl border border-slate-150 text-slate-700">
             <div>
               <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Reviewee / Team Member Name</label>
               <input 
                 type="text" 
                 required 
                 value={perfFormName} 
                 onChange={(e) => setPerfFormName(e.target.value)} 
                 placeholder="e.g. Kelechi Egwu" 
                 className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none" 
               />
             </div>
 
             <div>
               <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Core Capability Rating</label>
               <select 
                 value={perfFormRating} 
                 onChange={(e) => setPerfFormRating(e.target.value)} 
                 className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none"
               >
                 <option value="Exceeds Expectations (Level 5)">Exceeds Expectations (Level 5)</option>
                 <option value="Meets Expectations (Level 3)">Meets Expectations (Level 3)</option>
                 <option value="Needs Improvement (Level 1)">Needs Improvement (Level 1)</option>
               </select>
             </div>
           </div>
 
           <div className="flex items-center justify-end gap-3 pt-2">
             <Button variant="outline" size="sm" type="button" onClick={() => setActiveFormModal(null)}>
               Cancel
             </Button>
             <Button variant="primary" size="sm" type="submit">
               Submit Appraisal
             </Button>
           </div>
         </form>
       </Modal>
 
       {/* 4. EXIT CLEARANCE FORM */}
       <Modal isOpen={activeFormModal === 'exit'} onClose={() => setActiveFormModal(null)} title="Intake Form: Exit & Offboard Clearance Check" footer={null}>
         <form onSubmit={handleExitIntakeSubmit} className="space-y-4 font-bold text-xs">
           <Badge variant="indigo">ClickUp Form Embed Active</Badge>
 
           <div className="space-y-4 bg-slate-50/55 p-4 rounded-xl border border-slate-150 text-slate-700">
             <div>
               <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Departing Employee Name</label>
               <input 
                 type="text" 
                 required 
                 value={exitFormName} 
                 onChange={(e) => setExitFormName(e.target.value)} 
                 placeholder="e.g. Zainab Yusuf" 
                 className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none" 
               />
             </div>
 
             <div className="grid grid-cols-2 gap-3">
               <div>
                 <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Position / Role</label>
                 <input 
                   type="text" 
                   required 
                   value={exitFormPos} 
                   onChange={(e) => setExitFormPos(e.target.value)} 
                   placeholder="e.g. HR Assistant" 
                   className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none" 
                 />
               </div>
 
               <div>
                 <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Department</label>
                 <select 
                   value={exitFormDept} 
                   onChange={(e) => setExitFormDept(e.target.value)} 
                   className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none"
                 >
                   <option value="HR & Admin">HR & Admin</option>
                   <option value="Operations">Operations</option>
                   <option value="Engineering">Engineering</option>
                   <option value="Procurement">Procurement</option>
                   <option value="HSE">HSE</option>
                 </select>
               </div>
             </div>
 
             <div>
               <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Exit Target Date</label>
               <input 
                 type="date" 
                 required 
                 value={exitFormDate} 
                 onChange={(e) => setExitFormDate(e.target.value)} 
                 className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none font-semibold" 
               />
             </div>
 
             <div className="space-y-2">
               <label className="block text-[10px] font-bold uppercase text-slate-400">Handover Verifications Status</label>
               <div className="space-y-1.5 font-semibold text-slate-600">
                 <div className="flex items-center gap-2"><input type="checkbox" checked disabled className="rounded text-indigo-600" /> IT Access Revoked</div>
                 <div className="flex items-center gap-2"><input type="checkbox" checked disabled className="rounded text-indigo-600" /> Company Assets returned & signed</div>
                 <div className="flex items-center gap-2"><input type="checkbox" disabled className="rounded" /> Final Salary accounts settlement (SLA Pending)</div>
               </div>
             </div>
           </div>
 
           <div className="flex items-center justify-end gap-3 pt-2">
             <Button variant="outline" size="sm" type="button" onClick={() => setActiveFormModal(null)}>
               Cancel
             </Button>
             <Button variant="primary" size="sm" type="submit">
               Submit Exit Application
             </Button>
           </div>
         </form>
       </Modal>

      {/* LOG ONBOARDING REQUEST MODAL (Sandbox Action) */}
      <Modal isOpen={addCandModal} onClose={() => setAddCandModal(false)} title="Simulate Candidate Submission" footer={null}>
        <form onSubmit={handleCreateRecruitmentRequest} className="space-y-4 font-bold text-xs">
          <div>
            <label className="block text-slate-600 mb-1 uppercase text-[10px]">Candidate Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Amadi Kalu"
              value={candName}
              onChange={(e) => setCandName(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1 uppercase text-[10px]">Target Position/Role</label>
            <input
              type="text"
              required
              placeholder="e.g. Electrical Safety Assistant"
              value={candPos}
              onChange={(e) => setCandPos(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-1 uppercase text-[10px]">Department</label>
              <select
                value={candDept}
                onChange={(e) => setCandDept(e.target.value)}
                className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none"
              >
                <option value="HR">HR Operations</option>
                <option value="Procurement">Procurement</option>
                <option value="Engineering">Engineering</option>
                <option value="Ops">Operations Mode</option>
                <option value="HSE">HSE</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1 uppercase text-[10px]">Contracts Type</label>
              <select
                value={candType}
                onChange={(e) => setCandType(e.target.value as any)}
                className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Consultant">Consultant</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" type="button" onClick={() => setAddCandModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Submit Form Intake
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default HROperations;
