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
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sliders,
  Check,
  UserPlus,
  Trash2
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { toast } from 'sonner';

export interface EmployeeRecord {
  id: string;
  name: string;
  dept: string;
  pos: string;
  email: string;
  contract: 'Full-time' | 'Contract' | 'Consultant';
  status: 'Active' | 'On Probation' | 'Suspended' | 'Inactive / Terminated';
}

export interface LeaveRequest {
  id: string;
  name: string;
  dept: string;
  days: number;
  start: string;
  end: string;
  type: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AppraisalSubmission {
  id: string;
  name: string;
  dept: string;
  rating: string;
  reviewer: string;
  date: string;
}

export interface ExitProcess {
  id: string;
  employeeId: string;
  name: string;
  pos: string;
  dept: string;
  exitDate: string;
  auditStatus: 'Pending Sign-off' | 'Cleared';
  itRevoked: boolean;
  assetsReturned: boolean;
  interviewDone: boolean;
  financeSettled: boolean;
}

export interface EmployeeTraining {
  employeeId: string;
  employeeName: string;
  courseId: string;
  courseName: string;
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  lastUpdated: string;
}

export interface OnboardingChecklistState {
  id: string; // employeeId or candidateId
  itAccount: boolean;
  deviceAlloc: boolean;
  accessKeys: boolean;
  orientation: boolean;
  complianceCourse: boolean;
  probationReview: boolean;
}

export const HROperations: React.FC = () => {
  const { onboardingTasks, addOnboardingTask, updateOnboardingTaskStatus, currentRole } = useCommandCenter();

  // Selected Active Tab in HR Space
  const [activeTab, setActiveTab ] = useState<'recruitment' | 'onboarding' | 'records' | 'leaves' | 'performance' | 'training' | 'exits'>('recruitment');
  
  // Modals for Form Previews / Additions
  const [activeFormModal, setActiveFormModal] = useState<'recruitment' | 'leave' | 'performance' | 'exit' | null>(null);
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);

  // For adding custom candidates in Kanban
  const [addCandModal, setAddCandModal] = useState(false);
  const [candName, setCandName] = useState('');
  const [candPos, setCandPos] = useState('');
  const [candDept, setCandDept] = useState('Engineering');
  const [candType, setCandType] = useState<'Full-time' | 'Contract' | 'Consultant'>('Full-time');

  // Interactive Onboarding Task selection (automap logic showcase)
  const [selectedOnboardCand, setSelectedOnboardCand] = useState<string>('EMP-001');
  const [selectedExitProcessId, setSelectedExitProcessId] = useState<string>('EX-9');

  // New Employee Form State
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpPos, setNewEmpPos] = useState('');
  const [newEmpDept, setNewEmpDept] = useState('Engineering');
  const [newEmpContract, setNewEmpContract] = useState<'Full-time' | 'Contract' | 'Consultant'>('Full-time');
  const [newEmpEmail, setNewEmpEmail] = useState('');
  const [newEmpStatus, setNewEmpStatus] = useState<'Active' | 'On Probation' | 'Suspended'>('Active');

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

  const [exitFormName, setExitFormName] = useState('');
  const [exitFormPos, setExitFormPos] = useState('');
  const [exitFormDept, setExitFormDept] = useState('Operations');
  const [exitFormDate, setExitFormDate] = useState('');

  // Course Definitions
  const COURSES = [
    { id: 'C-1', name: 'HSE Site Operations Safety Course' },
    { id: 'C-2', name: 'ATMA Solution Workspace Training' },
    { id: 'C-3', name: 'Corporate Compliance & Ethics' }
  ];

  // Course assign state
  const [assignTrainEmpId, setAssignTrainEmpId] = useState('');
  const [assignTrainCourseId, setAssignTrainCourseId] = useState('C-1');
  const [assignTrainProgress, setAssignTrainProgress] = useState(50);

  // Persistence loaded state engines:
  const [employeeRecords, setEmployeeRecords] = useState<EmployeeRecord[]>(() => {
    const saved = localStorage.getItem('hr_employee_records');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'EMP-110', name: 'Emeka Obi', dept: 'Engineering', pos: 'Mechanical Engineer', email: 'e.obi@atma-ops.com', contract: 'Full-time', status: 'Active' },
      { id: 'EMP-111', name: 'Fatima Umar', dept: 'Procurement', pos: 'Contract Negotiator', email: 'f.umar@atma-ops.com', contract: 'Full-time', status: 'Active' },
      { id: 'EMP-112', name: 'Chioma Nwosu', dept: 'HSE', pos: 'Safety Inspector', email: 'c.nwosu@atma-ops.com', contract: 'Contract', status: 'Active' },
      { id: 'EMP-113', name: 'Kelechi Egwu', dept: 'Operations', pos: 'Site Supervisor', email: 'k.egwu@atma-ops.com', contract: 'Consultant', status: 'On Probation' },
      { id: 'EMP-114', name: 'Sade Adesina', dept: 'Finance', pos: 'Senior Auditor', email: 's.adesina@atma-ops.com', contract: 'Full-time', status: 'Active' }
    ];
  });

  const saveEmployeeRecords = (updated: EmployeeRecord[]) => {
    setEmployeeRecords(updated);
    localStorage.setItem('hr_employee_records', JSON.stringify(updated));
  };

  const [leaves, setLeaves] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('hr_leaves');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'L-1', name: 'Emeka Obi', dept: 'Engineering', days: 5, start: '2026-06-15', end: '2026-06-20', type: 'Annual Leave', status: 'Pending' },
      { id: 'L-2', name: 'Fatima Umar', dept: 'Procurement', days: 2, start: '2026-06-25', end: '2026-06-27', type: 'Casual Leave', status: 'Approved' },
      { id: 'L-3', name: 'Kelechi Egwu', dept: 'Operations', days: 3, start: '2026-07-02', end: '2026-07-05', type: 'Sick Leave', status: 'Pending' }
    ];
  });

  const saveLeaves = (updated: LeaveRequest[]) => {
    setLeaves(updated);
    localStorage.setItem('hr_leaves', JSON.stringify(updated));
  };

  const [appraisalSubmissions, setAppraisalSubmissions] = useState<AppraisalSubmission[]>(() => {
    const saved = localStorage.getItem('hr_appraisals');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'APP-1', name: 'Chioma Nwosu', dept: 'HSE', rating: 'Exceeds Expectations (Level 5)', reviewer: 'Ada Okafor', date: '2026-06-10' },
      { id: 'APP-2', name: 'Kelechi Egwu', dept: 'Operations', rating: 'Meets Expectations (Level 3)', reviewer: 'Ada Okafor', date: '2026-06-11' }
    ];
  });

  const saveAppraisals = (updated: AppraisalSubmission[]) => {
    setAppraisalSubmissions(updated);
    localStorage.setItem('hr_appraisals', JSON.stringify(updated));
  };

  const [exitProcesses, setExitProcesses] = useState<ExitProcess[]>(() => {
    const saved = localStorage.getItem('hr_exits');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'EX-9', employeeId: 'EMP-110', name: 'Lanre Davies', pos: 'Operations Manager', dept: 'Projects', exitDate: '2026-06-30', auditStatus: 'Pending Sign-off', itRevoked: true, assetsReturned: true, interviewDone: false, financeSettled: false },
      { id: 'EX-10', employeeId: 'EMP-114', name: 'Zainab Yusuf', pos: 'HR Assistant', dept: 'HR & Admin', exitDate: '2026-07-15', auditStatus: 'Cleared', itRevoked: true, assetsReturned: true, interviewDone: true, financeSettled: true }
    ];
  });

  const saveExits = (updated: ExitProcess[]) => {
    setExitProcesses(updated);
    localStorage.setItem('hr_exits', JSON.stringify(updated));
  };

  const [employeeTrainings, setEmployeeTrainings] = useState<EmployeeTraining[]>(() => {
    const saved = localStorage.getItem('hr_trainings');
    if (saved) return JSON.parse(saved);
    return [
      { employeeId: 'EMP-110', employeeName: 'Emeka Obi', courseId: 'C-1', courseName: 'HSE Site Operations Safety Course', progress: 100, status: 'Completed', lastUpdated: '2026-06-01' },
      { employeeId: 'EMP-111', employeeName: 'Fatima Umar', courseId: 'C-2', courseName: 'ATMA Solution Workspace Training', progress: 85, status: 'In Progress', lastUpdated: '2026-06-03' },
      { employeeId: 'EMP-112', employeeName: 'Chioma Nwosu', courseId: 'C-1', courseName: 'HSE Site Operations Safety Course', progress: 100, status: 'Completed', lastUpdated: '2026-06-05' },
      { employeeId: 'EMP-113', employeeName: 'Kelechi Egwu', courseId: 'C-2', courseName: 'ATMA Solution Workspace Training', progress: 60, status: 'In Progress', lastUpdated: '2026-06-10' },
      { employeeId: 'EMP-114', employeeName: 'Sade Adesina', courseId: 'C-3', courseName: 'Corporate Compliance & Ethics', progress: 90, status: 'In Progress', lastUpdated: '2026-06-09' }
    ];
  });

  const saveTrainings = (updated: EmployeeTraining[]) => {
    setEmployeeTrainings(updated);
    localStorage.setItem('hr_trainings', JSON.stringify(updated));
  };

  const [onboardingChecklists, setOnboardingChecklists] = useState<Record<string, OnboardingChecklistState>>(() => {
    const saved = localStorage.getItem('hr_onboarding_checklists');
    if (saved) return JSON.parse(saved);
    return {
      'EMP-001': { id: 'EMP-001', itAccount: true, deviceAlloc: true, accessKeys: false, orientation: true, complianceCourse: true, probationReview: false },
      'EMP-002': { id: 'EMP-002', itAccount: true, deviceAlloc: false, accessKeys: false, orientation: true, complianceCourse: false, probationReview: false }
    };
  });

  const saveOnboardingChecklists = (updated: Record<string, OnboardingChecklistState>) => {
    setOnboardingChecklists(updated);
    localStorage.setItem('hr_onboarding_checklists', JSON.stringify(updated));
  };

  // State transitions callback wrapper that triggers auto-personnel promotion
  const handleUpdateTaskStatus = (id: string, newStatus: any) => {
    updateOnboardingTaskStatus(id, newStatus);
    
    if (newStatus === 'Hired' || newStatus === 'Onboarding Started') {
      const task = onboardingTasks.find(t => t.id === id);
      if (task) {
        // check if exists
        const exists = employeeRecords.some(r => r.name.toLowerCase() === task.name.toLowerCase());
        if (!exists) {
          const empId = task.employeeId || `EMP-${Math.floor(100 + Math.random() * 900)}`;
          const newEmp: EmployeeRecord = {
            id: empId,
            name: task.name,
            dept: task.department,
            pos: task.position,
            email: `${task.name.toLowerCase().replace(/\s+/g, '.')}@atma-ops.com`,
            contract: task.contractType || 'Full-time',
            status: newStatus === 'Hired' ? 'Active' : 'On Probation'
          };
          const updated = [...employeeRecords, newEmp];
          saveEmployeeRecords(updated);
          toast.success(`Automatically added ${task.name} to Digital Employee Master Roll!`);
          
          // Allocate an onboarding checklist
          const updatedChecklists = {
            ...onboardingChecklists,
            [empId]: {
              id: empId,
              itAccount: false,
              deviceAlloc: false,
              accessKeys: false,
              orientation: false,
              complianceCourse: false,
              probationReview: false
            }
          };
          saveOnboardingChecklists(updatedChecklists);
          setSelectedOnboardCand(empId);
        }
      }
    }
  };

  const updateLeaveStatus = (id: string, newStatus: 'Approved' | 'Rejected') => {
    const updated = leaves.map(l => l.id === id ? { ...l, status: newStatus } : l);
    saveLeaves(updated);
    toast.success(`Leave request ${id} ${newStatus.toLowerCase()} successfully!`);
  };

  // Intake Submissions:
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

    toast.success(`Recruitment Request logged in Kanban lanes for ${recruitFormName}!`);
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

    const newLeave: LeaveRequest = {
      id: `L-${leaves.length + 1}`,
      name: leaveFormName,
      dept: leaveFormDept,
      days: diffDays,
      start: leaveFormStart,
      end: leaveFormEnd,
      type: leaveFormType,
      status: 'Pending'
    };

    saveLeaves([newLeave, ...leaves]);
    toast.success(`Leave Application submitted for HOD authorization!`);
    setLeaveFormName('');
    setLeaveFormStart('');
    setLeaveFormEnd('');
    setActiveFormModal(null);
  };

  const handlePerformanceIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!perfFormName.trim()) return;

    const emp = employeeRecords.find(r => r.name === perfFormName);
    const dept = emp ? emp.dept : 'Operations';

    const newAppraisal: AppraisalSubmission = {
      id: `APP-${appraisalSubmissions.length + 1}`,
      name: perfFormName,
      dept,
      rating: perfFormRating,
      reviewer: 'Ada Okafor',
      date: new Date().toISOString().split('T')[0]
    };

    saveAppraisals([newAppraisal, ...appraisalSubmissions]);
    toast.success(`HOD Appraisal registered for ${perfFormName}!`);
    setPerfFormName('');
    setActiveFormModal(null);
  };

  const handleExitIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exitFormName.trim() || !exitFormPos.trim()) return;

    const emp = employeeRecords.find(r => r.name === exitFormName);
    const empId = emp ? emp.id : `EMP-${Math.floor(100 + Math.random() * 900)}`;

    const newExit: ExitProcess = {
      id: `EX-${exitProcesses.length + 10}`,
      employeeId: empId,
      name: exitFormName,
      pos: exitFormPos,
      exitDate: exitFormDate || new Date().toISOString().split('T')[0],
      dept: exitFormDept,
      auditStatus: 'Pending Sign-off',
      itRevoked: false,
      assetsReturned: false,
      interviewDone: false,
      financeSettled: false
    };

    saveExits([newExit, ...exitProcesses]);
    setSelectedExitProcessId(newExit.id);
    toast.success(`Exit Offboarding request initiated!`);
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

    toast.success(`Simulated Candidate applied to "Request Submitted" lane!`);
    setCandName('');
    setCandPos('');
    setAddCandModal(false);
  };

  const handleAddNewEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName.trim() || !newEmpPos.trim()) return;

    const emailWithDomain = newEmpEmail.trim() || `${newEmpName.toLowerCase().replace(/\s+/g, '.')}@atma-ops.com`;
    const newEmp: EmployeeRecord = {
      id: `EMP-${Math.floor(120 + Math.random() * 800)}`,
      name: newEmpName,
      pos: newEmpPos,
      dept: newEmpDept,
      contract: newEmpContract,
      email: emailWithDomain,
      status: newEmpStatus
    };

    saveEmployeeRecords([...employeeRecords, newEmp]);
    toast.success(`Employee ${newEmpName} successfully registered!`);
    
    // Clear Form & Close Modal
    setNewEmpName('');
    setNewEmpPos('');
    setNewEmpEmail('');
    setAddEmployeeModal(false);
  };

  const handleDeleteEmployee = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from Active employee records?`)) {
      const updated = employeeRecords.filter(r => r.id !== id);
      saveEmployeeRecords(updated);
      toast.success(`${name} record deleted.`);
    }
  };

  const handleToggleOnboardingCheckbox = (empId: string, field: keyof OnboardingChecklistState) => {
    const current = onboardingChecklists[empId] || {
      id: empId,
      itAccount: false,
      deviceAlloc: false,
      accessKeys: false,
      orientation: false,
      complianceCourse: false,
      probationReview: false
    };
    
    const updatedCand = {
      ...current,
      [field]: !current[field]
    };
    
    const updated = {
      ...onboardingChecklists,
      [empId]: updatedCand
    };
    saveOnboardingChecklists(updated);
    toast.success(`Checklist updated!`);
  };

  const handleToggleExitCheckbox = (exitId: string, field: 'itRevoked' | 'assetsReturned' | 'interviewDone' | 'financeSettled') => {
    const updated = exitProcesses.map(p => {
      if (p.id === exitId) {
        const item = {
          ...p,
          [field]: !p[field]
        };
        // If complete and auditStatus is not cleared, notify they can sign off
        return item;
      }
      return p;
    });
    saveExits(updated);
    toast.success(`Clearance requirement state updated!`);
  };

  const handleFinalExitSignoff = (exitId: string) => {
    const exitItem = exitProcesses.find(p => p.id === exitId);
    if (!exitItem) return;

    // Set as cleared
    const updated = exitProcesses.map(p => p.id === exitId ? { ...p, auditStatus: 'Cleared' as const } : p);
    saveExits(updated);

    // Update Employee record status
    const empUpdated = employeeRecords.map(r => r.id === exitItem.employeeId ? { ...r, status: 'Inactive / Terminated' as const } : r);
    saveEmployeeRecords(empUpdated);

    toast.success(`Official Clearance Authorized! Coordinated with IT & Payroll to decommission ${exitItem.name}.`);
  };

  const handleAssignTraining = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTrainEmpId) return;

    const emp = employeeRecords.find(r => r.id === assignTrainEmpId);
    const course = COURSES.find(c => c.id === assignTrainCourseId);
    if (!emp || !course) return;

    // Check if enrollment exists
    const exists = employeeTrainings.some(t => t.employeeId === assignTrainEmpId && t.courseId === assignTrainCourseId);
    let updatedTrainings: EmployeeTraining[] = [];
    
    if (exists) {
      updatedTrainings = employeeTrainings.map(t => {
        if (t.employeeId === assignTrainEmpId && t.courseId === assignTrainCourseId) {
          return {
            ...t,
            progress: assignTrainProgress,
            status: assignTrainProgress === 100 ? 'Completed' as const : 'In Progress' as const,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return t;
      });
      toast.success(`Updated course progression for ${emp.name}!`);
    } else {
      const newTraining: EmployeeTraining = {
        employeeId: assignTrainEmpId,
        employeeName: emp.name,
        courseId: assignTrainCourseId,
        courseName: course.name,
        progress: assignTrainProgress,
        status: assignTrainProgress === 100 ? 'Completed' as const : (assignTrainProgress === 0 ? 'Not Started' as const : 'In Progress' as const),
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      updatedTrainings = [newTraining, ...employeeTrainings];
      toast.success(`Enrolled and set training progression for ${emp.name}!`);
    }

    saveTrainings(updatedTrainings);
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

  // Combined real-time list of onboarded profiles: static fallback + dynamic board status 'Hired' or 'Onboarding Started'
  const dynamicHired = onboardingTasks
    .filter(t => t.status === 'Hired' || t.status === 'Onboarding Started')
    .map(t => ({
      id: t.employeeId || t.id,
      name: t.name,
      position: t.position
    }));

  const allOnboardCands = [
    { id: 'EMP-110', name: 'Emeka Obi', position: 'Mechanical Engineer' },
    { id: 'EMP-111', name: 'Fatima Umar', position: 'Contract Negotiator' },
    ...dynamicHired
  ];

  const selectedCandData = allOnboardCands.find(c => c.id === selectedOnboardCand) || allOnboardCands[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Space Sub header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-[#7C3AED]/10 text-[#7C3AED] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ATMA Space: HR-OPS
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

      {/* Embedded ATMA View Navigation Bar */}
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
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">Statuses correspond directly to ATMA custom states mapping candidate selection benchmarks.</p>
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
                  <div key={status} className="flex-1 min-w-[250px] max-w-[310px] bg-slate-50 border border-slate-205 rounded-xl p-3 flex flex-col h-[650px]">
                    <div className="flex items-center justify-between font-extrabold text-[11px] text-slate-800 pb-2 border-b border-slate-200/80 mb-3 uppercase tracking-wider">
                      <h3>{status}</h3>
                      <span className="bg-[#7C3AED]/10 text-[#7C3AED] font-bold px-2.5 py-0.5 rounded-full text-[10px]">{candidates.length}</span>
                    </div>

                    <div className="space-y-3 overflow-y-auto flex-grow scrollbar-thin pr-1">
                      {candidates.length === 0 ? (
                        <div className="border border-dashed border-slate-200 rounded-xl p-8 text-[11px] text-slate-400 text-center italic mt-4 bg-white/40">
                          Empty Lane
                        </div>
                      ) : (
                        candidates.map((cand, candIdx) => (
                          <div key={cand.id || candIdx} className="bg-white p-3.5 rounded-xl border border-slate-200 hover:shadow-md transition duration-155 space-y-3">
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

                            {/* Dynamic Stage Transitioner Panel */}
                            <div className="space-y-2 pt-2 border-t border-slate-100">
                              <div className="flex items-center justify-between text-[8px] font-black uppercase text-slate-400 tracking-wider">
                                <span>Transition Stage</span>
                              </div>
                              <select
                                value={cand.status === 'New Request' ? 'Request Submitted' : cand.status}
                                onChange={(e) => {
                                  handleUpdateTaskStatus(cand.id, e.target.value as any);
                                }}
                                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-[#7C3AED] rounded-lg p-1.5 text-[10px] font-bold text-slate-700 outline-none transition cursor-pointer"
                              >
                                {recruitmentStatuses.map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>

                              <div className="flex items-center justify-between pt-1 gap-1">
                                <button
                                  type="button"
                                  disabled={recruitmentStatuses.indexOf(status) === 0}
                                  onClick={() => {
                                    const prevIdx = recruitmentStatuses.indexOf(status) - 1;
                                    if (prevIdx >= 0) {
                                      handleUpdateTaskStatus(cand.id, recruitmentStatuses[prevIdx]);
                                    }
                                  }}
                                  className="flex-1 bg-slate-50 hover:bg-slate-150 text-slate-750 border border-slate-200 font-extrabold text-[9px] py-1 px-1 rounded-md disabled:opacity-40 disabled:hover:bg-slate-55 transition flex items-center justify-center gap-0.5 cursor-pointer"
                                  title="Previous Stage"
                                >
                                  <ChevronLeft className="h-3 w-3" /> Back
                                </button>
                                <button
                                  type="button"
                                  disabled={recruitmentStatuses.indexOf(status) === recruitmentStatuses.length - 1}
                                  onClick={() => {
                                    const nextIdx = recruitmentStatuses.indexOf(status) + 1;
                                    if (nextIdx < recruitmentStatuses.length) {
                                      handleUpdateTaskStatus(cand.id, recruitmentStatuses[nextIdx]);
                                    }
                                  }}
                                  className="flex-1 bg-[#7C3AED]/10 hover:bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/20 font-extrabold text-[9px] py-1 px-1 rounded-md disabled:opacity-40 disabled:hover:bg-transparent transition flex items-center justify-center gap-0.5 cursor-pointer"
                                  title="Next Stage"
                                >
                                  Next <ChevronRight className="h-3 w-3" />
                                </button>
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
                  <h3 className="text-sm font-extrabold text-[#7C3AED] uppercase tracking-wider">ATMA Core Automation: Hired Workspace Generation</h3>
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold mt-1 max-w-3xl">
                    When a candidate’s Status is updated to <strong className="text-slate-900 border-b border-dashed border-emerald-600 pb-0.5">Hired</strong>, ATMA automatically generates direct task items in IT, Logistics, HR, and Training checklists to secure zero-delay onboarding.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Select Candidate Showcase */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-5 rounded-xl space-y-4">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Hired Staff Profile</h4>
                <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                  {allOnboardCands.map(cand => (
                    <button 
                      key={cand.id}
                      onClick={() => setSelectedOnboardCand(cand.id)}
                      className={`w-full p-3 rounded-lg border text-left flex items-center justify-between cursor-pointer transition ${selectedOnboardCand === cand.id ? 'border-purple-500 bg-purple-50 text-slate-805 font-bold' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      <div className="pr-2">
                        <p className="text-xs font-bold leading-tight mb-1">{cand.name}</p>
                        <p className="text-[10px] text-[#7C3AED] uppercase font-extrabold tracking-wider">{cand.position}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-purple-650 shrink-0" />
                    </button>
                  ))}
                </div>

                <div className="bg-slate-50 border border-slate-150 rounded-lg p-3 text-[11px] text-slate-505 font-semibold">
                  Click a candidate profile to view onboarding checklists automatically generated in respective workspace lists.
                </div>
              </div>

              {/* Automation Subtask List Output */}
              <div className="lg:col-span-8 space-y-4">
                <Card className="bg-white border border-slate-200">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-xs font-extrabold uppercase text-slate-755 tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
                        Generated Workspace Checklists for: {selectedCandData?.name || 'Amara Okonkwo'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3">
                    
                    {(() => {
                      const currentChecklist = onboardingChecklists[selectedOnboardCand] || {
                        id: selectedOnboardCand,
                        itAccount: false,
                        deviceAlloc: false,
                        accessKeys: false,
                        orientation: false,
                        complianceCourse: false,
                        probationReview: false
                      };

                      const checkedCount = [
                        currentChecklist.itAccount,
                        currentChecklist.deviceAlloc,
                        currentChecklist.accessKeys,
                        currentChecklist.orientation,
                        currentChecklist.complianceCourse,
                        currentChecklist.probationReview
                      ].filter(Boolean).length;
                      const checklistProgress = Math.round((checkedCount / 6) * 100);

                      return (
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center text-xs font-black mb-1.5 text-slate-450 uppercase">
                              <span>Checklist Integration Flow</span>
                              <span className="text-[#7C3AED]">{checklistProgress}% Completed ({checkedCount}/6 subtasks done)</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                              <div className="bg-[#7C3AED] h-full transition-all duration-300" style={{ width: `${checklistProgress}%` }} />
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="border border-slate-150 p-4 rounded-xl bg-slate-50/50 space-y-3">
                              <strong className="text-[11px] uppercase text-indigo-750 block font-black">💻 IT & Logistics checklist</strong>
                              <div className="space-y-3.5 text-xs font-bold text-slate-700">
                                <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                                  <input 
                                    type="checkbox" 
                                    checked={currentChecklist.itAccount} 
                                    onChange={() => handleToggleOnboardingCheckbox(selectedOnboardCand, 'itAccount')}
                                    className="rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED] h-4.5 w-4.5" 
                                  />
                                  <span className={currentChecklist.itAccount ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                                    IT Account Provisioning (Email, ATMA, Slack)
                                  </span>
                                </label>

                                <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                                  <input 
                                    type="checkbox" 
                                    checked={currentChecklist.deviceAlloc} 
                                    onChange={() => handleToggleOnboardingCheckbox(selectedOnboardCand, 'deviceAlloc')}
                                    className="rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED] h-4.5 w-4.5"  
                                  />
                                  <span className={currentChecklist.deviceAlloc ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                                    Assets Allocation (Laptop hardware, Charger)
                                  </span>
                                </label>

                                <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                                  <input 
                                    type="checkbox" 
                                    checked={currentChecklist.accessKeys} 
                                    onChange={() => handleToggleOnboardingCheckbox(selectedOnboardCand, 'accessKeys')}
                                    className="rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED] h-4.5 w-4.5"  
                                  />
                                  <span className={currentChecklist.accessKeys ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                                    Access Smartcard & Digital Keys Setup
                                  </span>
                                </label>
                              </div>
                            </div>

                            <div className="border border-slate-150 p-4 rounded-xl bg-slate-50/50 space-y-3">
                              <strong className="text-[11px] uppercase text-[#7C3AED] block font-black">📅 HR & Compliance checklist</strong>
                              <div className="space-y-3.5 text-xs font-bold text-slate-700">
                                <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                                  <input 
                                    type="checkbox" 
                                    checked={currentChecklist.orientation} 
                                    onChange={() => handleToggleOnboardingCheckbox(selectedOnboardCand, 'orientation')}
                                    className="rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED] h-4.5 w-4.5"  
                                  />
                                  <span className={currentChecklist.orientation ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                                    Scheduled group Orientation (ADA Okafor)
                                  </span>
                                </label>

                                <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                                  <input 
                                    type="checkbox" 
                                    checked={currentChecklist.complianceCourse} 
                                    onChange={() => handleToggleOnboardingCheckbox(selectedOnboardCand, 'complianceCourse')}
                                    className="rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED] h-4.5 w-4.5"  
                                  />
                                  <span className={currentChecklist.complianceCourse ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                                    Assigned HSE Operations Safety Class
                                  </span>
                                </label>

                                <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                                  <input 
                                    type="checkbox" 
                                    checked={currentChecklist.probationReview} 
                                    onChange={() => handleToggleOnboardingCheckbox(selectedOnboardCand, 'probationReview')}
                                    className="rounded border-slate-300 text-[#7C3AED] focus:ring-[#7C3AED] h-4.5 w-4.5"  
                                  />
                                  <span className={currentChecklist.probationReview ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                                    Set 90-day Performance Milestone reviews
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between items-center text-[10px] text-slate-405 font-extrabold uppercase">
                      <span>Status: Integrated Workspaces Active</span>
                      <span className="text-[#7C3AED]">Real-time Local Storage Synchronized</span>
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
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Digital Employee Master Roll</h3>
                <span className="text-[10px] bg-slate-200 px-2.5 py-1 rounded font-bold">{employeeRecords.length} Active Records</span>
              </div>
              <Button variant="primary" size="xs" onClick={() => setAddEmployeeModal(true)} className="gap-1 font-bold cursor-pointer">
                <UserPlus className="h-3.5 w-3.5" /> Register New Employee
              </Button>
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
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
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
                      <td className="p-3.5 text-center">
                        <Badge variant={rec.status === 'Active' ? 'green' : rec.status === 'On Probation' ? 'amber' : 'red'}>{rec.status}</Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        <button 
                          onClick={() => handleDeleteEmployee(rec.id, rec.name)}
                          className="text-rose-500 hover:text-rose-700 p-1.5 rounded hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
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
                    <span className="text-[10px] text-purple-650 font-bold block uppercase mt-0.5">ATMA List: Appraisal Forms</span>
                  </div>
                  <Badge variant="green">Active</Badge>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-150 bg-slate-50 flex justify-between items-center text-slate-700">
                  <div>
                    <strong className="text-xs font-bold block text-slate-900">Annual Peer-to-Peer Review Sync</strong>
                    <span className="text-[10px] text-purple-650 font-bold block uppercase mt-0.5">ATMA List: Peer Appraisals</span>
                  </div>
                  <Badge variant="amber">Not Started</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Review Template Automation</h4>
                <p className="text-[11px] text-slate-655 font-semibold leading-relaxed">
                  Every 180 Days, ATMA automatically sends standard performance forms and templates to team members, generating active task lines in respective HOD clearance schedules.
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
            {/* Compliance Stats Deck */}
            <div className="grid md:grid-cols-3 gap-4">
              {COURSES.map(course => {
                // calculate dynamic compliance
                const list = employeeTrainings.filter(t => t.courseId === course.id);
                const avgProgress = list.length > 0 
                  ? Math.round(list.reduce((acc, cur) => acc + cur.progress, 0) / list.length) 
                  : 0;
                
                return (
                  <div key={course.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                    <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded font-black uppercase tracking-wider">{course.id}</span>
                    <h4 className="text-xs font-black text-slate-800 leading-tight mt-1">{course.name}</h4>
                    <div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <span>Staff Enrollment Average:</span>
                        <span className="text-emerald-600">{avgProgress}% Compliance</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full transition-all" style={{ width: `${avgProgress}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* Form to Assign or Update Tuition */}
              <div className="lg:col-span-5 bg-white border border-slate-200 p-5 rounded-xl space-y-4 shadow-xs">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="h-4.5 w-4.5 text-[#7C3AED]" /> Assign & Update Tuition
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bold mt-0.5">Enroll any dynamic employee or update their progression metrics live.</p>
                </div>

                <form onSubmit={handleAssignTraining} className="space-y-4 text-xs font-bold text-slate-705">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Select Employee Staff</label>
                    <select
                      required
                      value={assignTrainEmpId}
                      onChange={(e) => setAssignTrainEmpId(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-white font-semibold text-slate-800 outline-none"
                    >
                      <option value="">-- Choose Employee --</option>
                      {employeeRecords.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name} ({emp.dept} - {emp.pos})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Target Training Module Course</label>
                    <select
                      value={assignTrainCourseId}
                      onChange={(e) => setAssignTrainCourseId(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg bg-white font-semibold text-slate-800 outline-none"
                    >
                      {COURSES.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 mb-1">
                      <span>Module Completion Progress</span>
                      <span className="text-[#7C3AED] font-black">{assignTrainProgress}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={assignTrainProgress}
                        onChange={(e) => setAssignTrainProgress(parseInt(e.target.value))}
                        className="w-full accent-[#7C3AED] cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={assignTrainProgress}
                        onChange={(e) => setAssignTrainProgress(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-16 p-1 text-center border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => { setAssignTrainProgress(100); }}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] py-1.5 px-3 rounded font-bold cursor-pointer transition"
                    >
                      Set to 100%
                    </button>
                    <Button variant="primary" size="xs" type="submit" className="font-bold shrink-0">
                      Submit Enrollment Progress
                    </Button>
                  </div>
                </form>
              </div>

              {/* Training Database Listing */}
              <div className="lg:col-span-7 bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Tuition Completion Progress Records</h4>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5">Check, modify, and authorize completion of certified curriculums.</p>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-extrabold">{employeeTrainings.length} Logged Enrollments</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-semibold text-slate-700">
                    <thead>
                      <tr className="border-b border-slate-100 text-[9px] uppercase font-bold text-slate-400">
                        <th className="pb-2">Employee Name</th>
                        <th className="pb-2">Course Name</th>
                        <th className="pb-2 text-center">Progression</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-[11px] font-bold">
                      {employeeTrainings.map((t, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="py-2.5 text-slate-900 font-extrabold">{t.employeeName}</td>
                          <td className="py-2.5 text-slate-500 text-xs max-w-[200px] truncate" title={t.courseName}>{t.courseName}</td>
                          <td className="py-2.5">
                            <div className="flex items-center justify-center gap-1.5">
                              <span className="text-[10px] text-indigo-700 font-black shrink-0 w-8 text-right">{t.progress}%</span>
                              <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0">
                                <div className="bg-indigo-600 h-full transition-all" style={{ width: `${t.progress}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 text-right">
                            <Badge variant={t.status === 'Completed' ? 'green' : 'amber'}>{t.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                <h3 className="text-xs font-extrabold text-slate-850 uppercase tracking-wide">Exit Clearance & Handover Check</h3>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">Tying offboard clearances directly to asset return files and deprovisioning pipelines.</p>
              </div>
              <Button variant="outline" size="xs" onClick={() => setActiveFormModal('exit')}>
                Test Exit Clearance Form
              </Button>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Lists exit requests */}
              <div className="lg:col-span-7 bg-white border border-slate-201 rounded-xl shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Active Offboarding Queue</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-bold select-none">
                    <thead>
                      <tr className="bg-slate-150 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <th className="p-3">Staff Name</th>
                        <th className="p-3">Position</th>
                        <th className="p-3">Exit Target Date</th>
                        <th className="p-3">Clearance Completion</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {exitProcesses.map(p => {
                        // calculate live clearance
                        const checkedCount = [p.itRevoked, p.assetsReturned, p.interviewDone, p.financeSettled].filter(Boolean).length;
                        const clearancePct = Math.round((checkedCount / 4) * 100);

                        return (
                          <tr 
                            key={p.id} 
                            onClick={() => setSelectedExitProcessId(p.id)}
                            className={`cursor-pointer transition hover:bg-slate-50/80 ${selectedExitProcessId === p.id ? 'bg-purple-50/80' : ''}`}
                          >
                            <td className="p-3 text-slate-900 font-extrabold">
                              <div>{p.name}</div>
                              <div className="text-[9px] text-slate-400 uppercase">{p.dept}</div>
                            </td>
                            <td className="p-3 text-[#7C3AED] font-bold text-xs">{p.pos}</td>
                            <td className="p-3 text-slate-500">{p.exitDate}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold text-indigo-750">{clearancePct}%</span>
                                <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                  <div className="bg-indigo-600 h-full" style={{ width: `${clearancePct}%` }} />
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-right">
                              <Badge variant={p.auditStatus === 'Cleared' ? 'green' : 'amber'}>{p.auditStatus}</Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Dynamic Clearance Checklist Control Panel */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                {(() => {
                  const activeProcess = exitProcesses.find(p => p.id === selectedExitProcessId) || exitProcesses[0];
                  
                  if (!activeProcess) {
                    return (
                      <div className="p-8 text-center text-slate-400 italic text-xs">
                        No offboarding requests active. Submit one using the tool above.
                      </div>
                    );
                  }

                  const checkedCount = [
                    activeProcess.itRevoked,
                    activeProcess.assetsReturned,
                    activeProcess.interviewDone,
                    activeProcess.financeSettled
                  ].filter(Boolean).length;

                  const clearancePct = Math.round((checkedCount / 4) * 100);
                  const isFullyCleared = checkedCount === 4;

                  return (
                    <div className="space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <span className="text-[9px] bg-red-50 text-rose-600 border border-rose-100 font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                          Clearance Runbook Schedule: {activeProcess.id}
                        </span>
                        <h4 className="text-sm font-black text-slate-900 mt-2">{activeProcess.name}</h4>
                        <p className="text-[10px] text-slate-500 font-extrabold uppercase mt-0.5">{activeProcess.pos} • {activeProcess.dept}</p>
                      </div>

                      {/* Overall Progress Bar */}
                      <div>
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-450 uppercase mb-1.5">
                          <span>Audit Sign-off Checklist Progress</span>
                          <span className="text-indigo-700">{clearancePct}% Verified</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${clearancePct}%` }} />
                        </div>
                      </div>

                      {/* Checkbox fields */}
                      <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-3.5">
                        <strong className="text-[11px] uppercase text-rose-700 block font-black border-b border-slate-100 pb-1.5">Required Clearances</strong>
                        
                        <div className="space-y-3 text-xs font-bold text-slate-700">
                          <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                            <input 
                              type="checkbox" 
                              checked={activeProcess.itRevoked} 
                              onChange={() => handleToggleExitCheckbox(activeProcess.id, 'itRevoked')}
                              disabled={activeProcess.auditStatus === 'Cleared'}
                              className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-4.5 w-4.5" 
                            />
                            <span className={activeProcess.itRevoked ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                              IT & Account Deprovisioning (Emails, Slack, Auth)
                            </span>
                          </label>

                          <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                            <input 
                              type="checkbox" 
                              checked={activeProcess.assetsReturned} 
                              disabled={activeProcess.auditStatus === 'Cleared'}
                              onChange={() => handleToggleExitCheckbox(activeProcess.id, 'assetsReturned')}
                              className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-4.5 w-4.5"  
                            />
                            <span className={activeProcess.assetsReturned ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                              Return Company Asset hardware (Laptops, Smartcards, Tokens)
                            </span>
                          </label>

                          <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                            <input 
                              type="checkbox" 
                              checked={activeProcess.interviewDone} 
                              disabled={activeProcess.auditStatus === 'Cleared'}
                              onChange={() => handleToggleExitCheckbox(activeProcess.id, 'interviewDone')}
                              className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-4.5 w-4.5"  
                            />
                            <span className={activeProcess.interviewDone ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                              Conduct Exit Survey Interview with HR Specialist
                            </span>
                          </label>

                          <label className="flex items-center gap-2.5 select-none cursor-pointer hover:text-slate-900 transition">
                            <input 
                              type="checkbox" 
                              checked={activeProcess.financeSettled} 
                              disabled={activeProcess.auditStatus === 'Cleared'}
                              onChange={() => handleToggleExitCheckbox(activeProcess.id, 'financeSettled')}
                              className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 h-4.5 w-4.5"  
                            />
                            <span className={activeProcess.financeSettled ? 'line-through text-slate-400 font-medium' : 'text-slate-750'}>
                              Finance & Payroll Settled (Decommission payroll ledger)
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Authorized Button */}
                      <div>
                        {activeProcess.auditStatus === 'Cleared' ? (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-850 px-4 py-3 rounded-lg text-xs font-bold leading-normal flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                            This employee is fully authorized and signed off. Master payroll records have been successfully deactivated.
                          </div>
                        ) : (
                          <button
                            type="button"
                            disabled={!isFullyCleared}
                            onClick={() => handleFinalExitSignoff(activeProcess.id)}
                            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white disabled:bg-slate-100 disabled:text-slate-400 border border-[#7C3AED]/20 disabled:border-slate-200 font-extrabold text-xs uppercase tracking-wider py-3 px-3 rounded-lg transition text-center cursor-pointer shadow-xs"
                          >
                            {isFullyCleared ? "🚀 Authorize Official Clearance & Sign-off" : "🔒 All Clearances Required for Sign-off"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* FORM PREVIEW MODALS SECTION */}
      {/* 1. RECRUITMENT REQUEST FORM */}
      <Modal isOpen={activeFormModal === 'recruitment'} onClose={() => setActiveFormModal(null)} title="Intake Form: Recruitment Request" footer={null}>
        <form onSubmit={handleRecruitmentIntakeSubmit} className="space-y-4 font-bold text-xs">
          <Badge variant="indigo">ATMA Form Embed Active</Badge>
          
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
           <Badge variant="indigo">ATMA Form Embed Active</Badge>
 
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
           <Badge variant="indigo">ATMA Form Embed Active</Badge>
 
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
           <Badge variant="indigo">ATMA Form Embed Active</Badge>
 
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

      {/* 5. ADD NEW EMPLOYEE MANUAL REGISTRATION */}
      <Modal isOpen={addEmployeeModal} onClose={() => setAddEmployeeModal(false)} title="Register New Employee Staff" footer={null}>
        <form onSubmit={handleAddNewEmployee} className="space-y-4 font-bold text-xs text-slate-705">
          <div className="space-y-4 bg-slate-50/55 p-4 rounded-xl border border-slate-150">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-505 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Hassan Bello" 
                value={newEmpName} 
                onChange={(e) => setNewEmpName(e.target.value)} 
                className="w-full p-2.5 text-xs font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-650" 
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-505 mb-1">Position / Office Title</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Logistics Supervisor" 
                value={newEmpPos} 
                onChange={(e) => setNewEmpPos(e.target.value)} 
                className="w-full p-2.5 text-xs font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-650" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-505 mb-1">Department</label>
                <select 
                  value={newEmpDept} 
                  onChange={(e) => setNewEmpDept(e.target.value)} 
                  className="w-full p-2.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white focus:outline-none"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Procurement">Procurement</option>
                  <option value="HSE">HSE</option>
                  <option value="Operations">Operations</option>
                  <option value="HR & Admin">HR & Admin</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-505 mb-1">Modality</label>
                <select 
                  value={newEmpContract} 
                  onChange={(e) => setNewEmpContract(e.target.value as any)} 
                  className="w-full p-2.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white focus:outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Consultant">Consultant</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-505 mb-1">Work Email</label>
              <input 
                type="email" 
                placeholder="e.g. h.bello@atma-ops.com" 
                value={newEmpEmail} 
                onChange={(e) => setNewEmpEmail(e.target.value)} 
                className="w-full p-2.5 text-xs font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-650" 
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-505 mb-1">Initial Status</label>
              <select 
                value={newEmpStatus} 
                onChange={(e) => setNewEmpStatus(e.target.value as any)} 
                className="w-full p-2.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="On Probation">On Probation</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setAddEmployeeModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Register Employee
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default HROperations;
