import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import {
  UserRole,
  Task,
  OnboardingTask,
  PurchaseRequest,
  Project,
  Vendor,
  HSEIncident,
  ExecutiveApproval,
  VirtualMeeting,
  CommunicationRequest,
  DigitizedForm,
  SOPDocument
} from '../types';
import {
  initialTasks,
  initialOnboardingTasks,
  initialPurchaseRequests,
  initialProjects,
  initialVendors,
  initialHseIncidents,
  initialExecutiveApprovals,
  initialMeetings,
  initialCommsRequests,
  initialDigitizedForms,
  initialSops
} from '../data/mockData';

interface CommandCenterContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  tasks: Task[];
  onboardingTasks: OnboardingTask[];
  purchaseRequests: PurchaseRequest[];
  projects: Project[];
  vendors: Vendor[];
  hseIncidents: HSEIncident[];
  executiveApprovals: ExecutiveApproval[];
  meetings: VirtualMeeting[];
  commsRequests: CommunicationRequest[];
  digitizedForms: DigitizedForm[];
  sops: SOPDocument[];
  
  // Interactive Actions
  approvePurchaseRequest: (id: string) => void;
  rejectPurchaseRequest: (id: string) => void;
  escalatePurchaseRequest: (id: string) => void;
  approveExecutiveApproval: (id: string) => void;
  rejectExecutiveApproval: (id: string) => void;
  requestInfoExecutiveApproval: (id: string) => void;
  addOnboardingTask: (task: Omit<OnboardingTask, 'id'>) => void;
  addHseIncident: (incident: Omit<HSEIncident, 'id' | 'reportedAt' | 'status'>) => void;
  addMeeting: (meeting: Omit<VirtualMeeting, 'id' | 'actionItems' | 'decisions'>) => void;
  addCommsRequest: (req: Omit<CommunicationRequest, 'id' | 'timeLeftHours' | 'status' | 'lastUpdate' | 'thread'>) => void;
  addTaskComment: (taskId: string, comment: string) => void;
  updateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
  triggerAutomationDemo: () => Promise<void>;
  automationRunning: boolean;
  activeNotification: string | null;
  setActiveNotification: (msg: string | null) => void;
  notificationsList: { id: string; text: string; time: string; read: boolean }[];
  clearNotifications: () => void;
  isLoggedIn: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const CommandCenterContext = createContext<CommandCenterContextType | undefined>(undefined);

export const CommandCenterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('hub_user_role') as UserRole) || 'Executive Management';
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('hub_logged_in') === 'true';
  });

  const setRole = (role: UserRole) => {
    setRoleState(role);
    localStorage.setItem('hub_user_role', role);
  };

  const login = (role: UserRole) => {
    setRole(role);
    setIsLoggedIn(true);
    localStorage.setItem('hub_logged_in', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('hub_logged_in');
  };
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>(initialOnboardingTasks);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>(initialPurchaseRequests);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [hseIncidents, setHseIncidents] = useState<HSEIncident[]>(initialHseIncidents);
  const [executiveApprovals, setExecutiveApprovals] = useState<ExecutiveApproval[]>(initialExecutiveApprovals);
  const [meetings, setMeetings] = useState<VirtualMeeting[]>(initialMeetings);
  const [commsRequests, setCommsRequests] = useState<CommunicationRequest[]>(initialCommsRequests);
  const [digitizedForms] = useState<DigitizedForm[]>(initialDigitizedForms);
  const [sops] = useState<SOPDocument[]>(initialSops);
  
  const [automationRunning, setAutomationRunning] = useState<boolean>(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [notificationsList, setNotificationsList] = useState([
    { id: '1', text: 'Critical Alert: Purchase Order TSK-103 overdue by 24 hours.', time: '10 mins ago', read: false },
    { id: '2', text: 'New HSE Incident registered for Ikoyi Smart Substation Control Grid.', time: '1 hour ago', read: false },
    { id: '3', text: 'Approval granted for Headcount Request Onb-001 by Ada Okafor.', time: '2 hours ago', read: true }
  ]);

  const addNotification = (text: string) => {
    const newNotif = {
      id: Math.random().toString(),
      text,
      time: 'Just now',
      read: false
    };
    setNotificationsList(prev => [newNotif, ...prev]);
    setActiveNotification(text);
    
    // Display using sonner toast
    if (text.toLowerCase().includes('critical') || text.toLowerCase().includes('overdue') || text.toLowerCase().includes('alert') || text.toLowerCase().includes('failed') || text.toLowerCase().includes('warning')) {
      toast.error(text, { duration: 5000 });
    } else if (text.toLowerCase().includes('success') || text.toLowerCase().includes('approved') || text.toLowerCase().includes('grant') || text.toLowerCase().includes('complete')) {
      toast.success(text);
    } else {
      toast.info(text);
    }
  };

  const clearNotifications = () => {
    setNotificationsList([]);
  };

  // 1. Purchase Request approval actions
  const approvePurchaseRequest = (id: string) => {
    setPurchaseRequests(prev => prev.map(pr => {
      if (pr.id === id) {
        let nStatus: PurchaseRequest['status'] = 'Approved';
        if (pr.status === 'Draft' || pr.status === 'Submitted') {
          nStatus = 'Under Review';
        } else if (pr.status === 'Under Review') {
          nStatus = 'Finance Review';
        } else if (pr.status === 'Finance Review' && pr.amount > 10000000) {
          nStatus = 'Executive Approval';
        }
        
        const isCompleted = pr.status === 'Executive Approval' || (pr.status === 'Finance Review' && pr.amount <= 10000000);
        const finalStatus: PurchaseRequest['status'] = isCompleted ? 'Approved' : nStatus;

        addNotification(`Approved Purchase Request ${id} for ${pr.item}. Progressed to: ${finalStatus}`);
        return {
          ...pr,
          managerApproved: pr.status === 'Under Review' ? true : pr.managerApproved,
          financeApproved: pr.status === 'Finance Review' ? true : pr.financeApproved,
          execApproved: pr.status === 'Executive Approval' ? true : pr.execApproved,
          status: finalStatus
        };
      }
      return pr;
    }));

    // Mirror on Executive Approval if linked
    setExecutiveApprovals(prev => prev.map(exe => {
      if (exe.id === 'EXE-301' && id === 'PR-8902') {
        return { ...exe, status: 'Approved' };
      }
      return exe;
    }));
  };

  const rejectPurchaseRequest = (id: string) => {
    setPurchaseRequests(prev => prev.map(pr => {
      if (pr.id === id) {
        addNotification(`Rejected Purchase Request ${id}`);
        return { ...pr, status: 'Rejected' };
      }
      return pr;
    }));
    setExecutiveApprovals(prev => prev.map(exe => {
      if (exe.id === 'EXE-301' && id === 'PR-8902') {
        return { ...exe, status: 'Rejected' };
      }
      return exe;
    }));
  };

  const escalatePurchaseRequest = (id: string) => {
    setPurchaseRequests(prev => prev.map(pr => {
      if (pr.id === id) {
        addNotification(`Escalated Purchase Request ${id} to Executive Command`);
        return { ...pr, status: 'Executive Approval', budgetLimitExceeded: true };
      }
      return pr;
    }));
  };

  // 2. Executive approvals
  const approveExecutiveApproval = (id: string) => {
    setExecutiveApprovals(prev => prev.map(exe => {
      if (exe.id === id) {
        addNotification(`Executive Approved: ${exe.category} (Ref: ${exe.boardRef})`);
        return { ...exe, status: 'Approved' };
      }
      return exe;
    }));

    // Also mirror to appropriate linked entities
    if (id === 'EXE-301') {
      setPurchaseRequests(prev => prev.map(pr => {
        if (pr.id === 'PR-8902') {
          return { ...pr, status: 'Approved', execApproved: true };
        }
        return pr;
      }));
    }
  };

  const rejectExecutiveApproval = (id: string) => {
    setExecutiveApprovals(prev => prev.map(exe => {
      if (exe.id === id) {
        addNotification(`Executive Rejected: ${exe.category} (Ref: ${exe.boardRef})`);
        return { ...exe, status: 'Rejected' };
      }
      return exe;
    }));
    if (id === 'EXE-301') {
      setPurchaseRequests(prev => prev.map(pr => {
        if (pr.id === 'PR-8902') {
          return { ...pr, status: 'Rejected' };
        }
        return pr;
      }));
    }
  };

  const requestInfoExecutiveApproval = (id: string) => {
    setExecutiveApprovals(prev => prev.map(exe => {
      if (exe.id === id) {
        addNotification(`Revision Requested on Executive Item: ${exe.boardRef}`);
        return { ...exe, status: 'More Information Needed' };
      }
      return exe;
    }));
  };

  // 3. HR Onboarding adding
  const addOnboardingTask = (partTask: Omit<OnboardingTask, 'id'>) => {
    const newId = `ONB-00${onboardingTasks.length + 1}`;
    const newTask: OnboardingTask = {
      ...partTask,
      id: newId,
      employeeId: `EMP-08${50 + onboardingTasks.length}`
    };
    setOnboardingTasks(prev => [...prev, newTask]);
    addNotification(`Added Onboarding candidate: ${newTask.name} for ${newTask.position}`);
  };

  // 4. HSE Incident adding
  const addHseIncident = (partInc: Omit<HSEIncident, 'id' | 'reportedAt' | 'status'>) => {
    const newId = `INC-${200 + hseIncidents.length + 1}`;
    const escalationCheck = partInc.riskLevel === 'Critical' ? 'Escalated' as const : 'Open' as const;
    const newInc: HSEIncident = {
      ...partInc,
      id: newId,
      reportedAt: new Date().toISOString(),
      status: escalationCheck
    };
    setHseIncidents(prev => [newInc, ...prev]);
    
    if (escalationCheck === 'Escalated') {
      addNotification(`CRITICAL HSE INCIDENT: "${newInc.title}" registered & automatically escalated to HSE Lead & CEO Daniel Eze!`);
    } else {
      addNotification(`New HSE Incident logged: ${newInc.title}`);
    }
    
    // Auto populate task to safety team
    const incidentTask: Task = {
      id: `TSK-${110 + tasks.length}`,
      title: `Emergency Action: ${newInc.title}`,
      department: 'HSE',
      priority: newInc.riskLevel === 'Critical' ? 'Critical' : 'High',
      status: 'Pending',
      dueDate: newInc.closeOutDate,
      owner: newInc.correctiveActionOwner || 'Maryam Bello',
      escalationFlag: newInc.riskLevel === 'Critical',
      comments: [`Triggered automatically by automated safety matrix from incident: ${newId}`]
    };
    setTasks(prev => [incidentTask, ...prev]);
  };

  // 5. Meetings adding
  const addMeeting = (partMeet: Omit<VirtualMeeting, 'id' | 'actionItems' | 'decisions'>) => {
    const newId = `MEET-${400 + meetings.length + 1}`;
    const newMeet: VirtualMeeting = {
      ...partMeet,
      id: newId,
      actionItems: [],
      decisions: []
    };
    setMeetings(prev => [newMeet, ...prev]);
    addNotification(`Scheduled Virtual Meeting: ${newMeet.title} on ${newMeet.platform}`);
  };

  // 6. Communications adding
  const addCommsRequest = (partComm: Omit<CommunicationRequest, 'id' | 'timeLeftHours' | 'status' | 'lastUpdate' | 'thread'>) => {
    const newId = `COM-${500 + commsRequests.length + 1}`;
    const newComm: CommunicationRequest = {
      ...partComm,
      id: newId,
      timeLeftHours: partComm.slaHours,
      status: 'New Request',
      lastUpdate: new Date().toISOString(),
      thread: [
        { sender: partComm.owner, message: `Initialized interdepartmental request. Target receiver desk: ${partComm.receivingDept}`, date: new Date().toISOString() }
      ]
    };
    setCommsRequests(prev => [newComm, ...prev]);
    addNotification(`Interdepartmental Communication thread launched: ${newComm.title}`);
  };

  // 7. Tasks comments/status updates
  const addTaskComment = (taskId: string, comment: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, comments: [...t.comments, comment] };
      }
      return t;
    }));
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        addNotification(`Task ${taskId} status updated to ${newStatus}`);
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  // 8. Automation Demo Timeline Simulation
  const triggerAutomationDemo = async () => {
    if (automationRunning) return;
    setAutomationRunning(true);
    addNotification('AUTOMATION: Initializing purchase limit threshold inspection on PR-8902...');

    // Simulate Step 1 (2 seconds): Evaluate rule
    await new Promise(resolve => setTimeout(resolve, 1500));
    addNotification('AUTOMATION: Threshold exceeded (₦14.5M > ₦10.0M rule). Standard route bypassed.');

    // Simulate Step 2 (2 seconds): Route to HOD & Finance
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPurchaseRequests(prev => prev.map(pr => {
      if (pr.id === 'PR-8902') {
        return { ...pr, status: 'Executive Approval', managerApproved: true, financeApproved: true };
      }
      return pr;
    }));
    addNotification('AUTOMATION: Auto-flagging SLA escalation. Dispatched CEO push update + SMS logs to Daniel Eze.');

    // Simulate Step 3 (2 seconds): Generate Board Secretariat Doc
    await new Promise(resolve => setTimeout(resolve, 1500));
    setExecutiveApprovals(prev => prev.map(exe => {
      if (exe.id === 'EXE-301') {
        return { ...exe, status: 'Submitted', impactLevel: 'Critical' };
      }
      return exe;
    }));
    addNotification('AUTOMATION COMPLETE: Form, PO register, and executive board queue synchronized under SLA-2026 guidelines!');
    setAutomationRunning(false);
  };

  return (
    <CommandCenterContext.Provider value={{
      currentRole,
      setRole,
      tasks,
      onboardingTasks,
      purchaseRequests,
      projects,
      vendors,
      hseIncidents,
      executiveApprovals,
      meetings,
      commsRequests,
      digitizedForms,
      sops,
      
      approvePurchaseRequest,
      rejectPurchaseRequest,
      escalatePurchaseRequest,
      approveExecutiveApproval,
      rejectExecutiveApproval,
      requestInfoExecutiveApproval,
      addOnboardingTask,
      addHseIncident,
      addMeeting,
      addCommsRequest,
      addTaskComment,
      updateTaskStatus,
      triggerAutomationDemo,
      automationRunning,
      activeNotification,
      setActiveNotification,
      notificationsList,
      clearNotifications,
      isLoggedIn,
      login,
      logout
    }}>
      {children}
    </CommandCenterContext.Provider>
  );
};

export const useCommandCenter = () => {
  const context = useContext(CommandCenterContext);
  if (context === undefined) {
    throw new Error('useCommandCenter must be used within a CommandCenterProvider');
  }
  return context;
};
