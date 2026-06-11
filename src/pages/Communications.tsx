import React, { useState } from 'react';
import {
  MessageSquare,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  PlusCircle,
  HelpCircle,
  User,
  Send,
  CheckCircle2,
  BookmarkCheck,
  Building,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface InterdeptTicket {
  id: string; // Ticket Code
  title: string;
  sponsoringDept: string;
  respondingDept: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open Requisition' | 'In Progress Routing' | 'Completed Sign-off' | 'Escalated to Director';
  dateLogged: string;
  slaTimeLeftHours: number; // Resolution SLA Time
  detailDescription: string;
  coreActionItems: { task: string; done: boolean }[];
  thread: { sender: string; message: string; date: string }[];
}

export const Communications: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');

  // 1. Core Interdepartmental Tickets
  const [tickets, setTickets] = useState<InterdeptTicket[]>([
    {
      id: 'COM-TKT-501',
      title: 'Structural Excavator Heavy Lease Cost Alignment',
      sponsoringDept: 'Projects & Infrastructure',
      respondingDept: 'Finance & Accounts',
      priority: 'High',
      status: 'In Progress Routing',
      dateLogged: '2026-06-08',
      slaTimeLeftHours: 19,
      detailDescription: 'Emergency variance request to align the general ledger code for port excavator lease overrides supporting Eko Substation piles.',
      coreActionItems: [
        { task: 'Submit cost variance projection audit sheet', done: true },
        { task: 'Validate statutory withholding tax coordinates', done: false },
        { task: 'Obtain CEO digital seal authorize', done: false }
      ],
      thread: [
        { sender: 'Amadi Kalu (Projects Lead)', message: 'We need the cost code alignment urgently so the contractor can lease the boring machine before Friday rainfall.', date: '2026-06-08T10:30:00Z' },
        { sender: 'Amara Okonkwo (Finance Lead)', message: 'I have checked the ledger code structure. We can map this under Section 4.5. Pending final pile overrun cost estimation files.', date: '2026-06-08T12:15:00Z' }
      ]
    },
    {
      id: 'COM-TKT-502',
      title: 'Welfare Scheme HMO Transition Employee Data Sync',
      sponsoringDept: 'HR Operations',
      respondingDept: 'Finance & Accounts',
      priority: 'Medium',
      status: 'Open Requisition',
      dateLogged: '2026-06-11',
      slaTimeLeftHours: 46,
      detailDescription: 'Synthesizing verified life insurance premium contributions spreadsheet for board authorized transition to RedCare cover.',
      coreActionItems: [
        { task: 'Export active personnel list with age ratings', done: true },
        { task: 'Map monthly deduction parameters on paycheck backend', done: false }
      ],
      thread: [
        { sender: 'Ada Okafor (HR Ops Lead)', message: 'Please review the personal medical data sheet. Direct coverage sign-off is standard.', date: '2026-06-11T08:10:00Z' }
      ]
    },
    {
      id: 'COM-TKT-503',
      title: 'Scaffold Safety Remediation Warning VGC Site',
      sponsoringDept: 'HSE Committee',
      respondingDept: 'Projects & Infrastructure',
      priority: 'Critical',
      status: 'Escalated to Director',
      dateLogged: '2026-06-10',
      slaTimeLeftHours: -4,
      detailDescription: 'Critical structural warnings reported during scaffolding sag review. Immediate lock and scaffold re-piling required.',
      coreActionItems: [
        { task: 'Cordon off grid area and tag poles Red', done: true },
        { task: 'Deploy steel support beams reinforcements', done: false },
        { task: 'File formal corrective closure report pack', done: false }
      ],
      thread: [
        { sender: 'Maryam Bello (HSE Lead)', message: 'Structural sag is significant. Site crews must not step footprint near Frame C.', date: '2026-06-10T14:00:00Z' },
        { sender: 'Daniel Eze (CEO)', message: 'This is escalated. Amadi, focus site resources on fixing this scaffold base immediately.', date: '2026-06-10T15:20:00Z' }
      ]
    }
  ]);

  const [selectedTicketId, setSelectedTicketId] = useState<string>('COM-TKT-501');

  // Fields for new Ticket Requisition
  const [newTitle, setNewTitle] = useState('');
  const [newSponsor, setNewSponsor] = useState('HR Operations');
  const [newResponder, setNewResponder] = useState('Finance & Accounts');
  const [newPriority, setNewPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('Medium');
  const [newDesc, setNewDesc] = useState('');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLaunchTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const tCode = `COM-TKT-${Math.floor(504 + Math.random() * 80)}`;
    const newItem: InterdeptTicket = {
      id: tCode,
      title: newTitle,
      sponsoringDept: newSponsor,
      respondingDept: newResponder,
      priority: newPriority,
      status: newPriority === 'Critical' ? 'Escalated to Director' : 'Open Requisition',
      dateLogged: new Date().toISOString().split('T')[0],
      slaTimeLeftHours: newSponsor === 'Critical' ? 12 : 48,
      detailDescription: newDesc,
      coreActionItems: [
        { task: 'Acknowledge request intake by responder HOD', done: false }
      ],
      thread: [
        { sender: 'System Administrator', message: `Ticket initiated by ${newSponsor}. Routed for responder action.`, date: new Date().toISOString() }
      ]
    };

    setTickets(prev => [...prev, newItem]);
    setSelectedTicketId(tCode);
    setNewTitle('');
    setNewDesc('');
    setFormOpen(false);
    triggerToast(`Ticket ${tCode} successfully enqueued!`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicketId) {
        return {
          ...t,
          thread: [
            ...t.thread,
            { sender: 'System Administrator (Simulation)', message: chatInput, date: new Date().toISOString() }
          ]
        };
      }
      return t;
    }));

    setChatInput('');
    triggerToast('Interdepartmental reply synced in ledger thread.');
  };

  const handleToggleActionItem = (ticketId: string, taskText: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          coreActionItems: t.coreActionItems.map(a => a.task === taskText ? { ...a, done: !a.done } : a)
        };
      }
      return t;
    }));
    triggerToast("Action item check updated.");
  };

  const handleSignOffTicket = (ticketId: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'Completed Sign-off',
          slaTimeLeftHours: 0
        };
      }
      return t;
    }));
    triggerToast(`Ticket ${ticketId} marked completed with cross-departmental sign-off!`);
  };

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];
  const totalOpenTickets = tickets.filter(t => t.status !== 'Completed Sign-off').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-slate-900 border border-purple-500 text-white p-4 rounded-xl shadow-2xl z-50 animate-fade-in text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-purple-750 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Space: INTER-DEPT-COMMS
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">10. Interdepartmental Communication</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Track interdepartmental dependencies, request SLA times, joint-venture committee sign-offs, and simulate cross-departmental collaboration chat grids.
          </p>
        </div>

        <Button variant="primary" size="sm" className="gap-1.5 font-bold" onClick={() => setFormOpen(true)}>
          <PlusCircle className="h-4.5 w-4.5" /> New Collaboration Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={MessageSquare}
          value={`${totalOpenTickets} Tickets`}
          label="Active Collaborations"
          description="Awaiting cross-departmental signs"
          variant="indigo"
        />
        <StatCard
          icon={Clock}
          value={`${tickets.filter(t => t.slaTimeLeftHours < 0).length} Overdue`}
          label="SLA Escalation Files"
          description="SLA breach triggers alerts"
          variant="rose"
        />
        <StatCard
          icon={TrendingUp}
          value="94.6% Avg"
          label="SLA Response Velocity"
          description="Calculated based on 48h limit"
          variant="emerald"
        />
        <StatCard
          icon={CheckCircle2}
          value={`${tickets.filter(t => t.status === 'Completed Sign-off').length} Closed`}
          label="Resolved Handover Tasks"
          description="Successfully completed"
          variant="emerald"
        />
      </div>

      {/* Main Workspace split */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Active tickets select list (4/12) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Communication Threads Queue</h3>
          
          <div className="space-y-3 p-0.5">
            {tickets.map(t => {
              const overdue = t.slaTimeLeftHours < 0;
              const isSelected = t.id === selectedTicketId;
              return (
                <Card
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`transition-all duration-150 cursor-pointer text-xs font-bold ${
                    isSelected ? 'ring-2 ring-[#7C3AED] border-transparent shadow-md' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="p-4 space-y-3 leading-normal">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{t.id}</span>
                        <h4 className="text-xs font-extrabold text-slate-900 mt-0.5 max-w-[190px] truncate">{t.title}</h4>
                      </div>
                      <Badge variant={
                        t.status === 'Completed Sign-off' ? 'green' :
                        t.status === 'Escalated to Director' ? 'red' : 'indigo'
                      }>
                        {t.status.replace(' Requisition', '').replace(' Routing', '')}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold border-b border-slate-50 pb-2">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px]">{t.sponsoringDept.split(' & ')[0]}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                      <span className="bg-purple-50 text-[#7C3AED] px-1.5 py-0.5 rounded text-[9px]">{t.respondingDept.split(' & ')[0]}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase">
                      <span>Logged: {t.dateLogged}</span>
                      <span className={`font-extrabold ${overdue ? 'text-rose-600 animate-pulse' : 'text-slate-500'}`}>
                        {t.status === 'Completed Sign-off' ? 'Done' : overdue ? `Escalated +${Math.abs(t.slaTimeLeftHours)}h` : `${t.slaTimeLeftHours}h limit`}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Details and Chat Workspace (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTicket ? (
            <Card className="bg-white border border-slate-205 flex flex-col min-h-[500px] justify-between">
              
              <div>
                {/* Header info */}
                <CardHeader className="bg-slate-50 border-b border-slate-100 p-4 flex flex-row items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Communication Ticket: {activeTicket.id}</span>
                    <CardTitle className="text-sm font-black text-slate-950 mt-1 leading-tight">{activeTicket.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={activeTicket.priority === 'Critical' ? 'red' : 'amber'}>{activeTicket.priority} Priority</Badge>
                    <Badge variant="indigo">{activeTicket.status}</Badge>
                  </div>
                </CardHeader>

                {/* Details list */}
                <CardContent className="p-5 space-y-4 font-semibold text-xs leading-normal">
                  
                  {/* Descriptions block */}
                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                    <span className="text-[9px] uppercase tracking-wide font-black text-slate-400 block mb-1">Detailed Description</span>
                    <p className="text-slate-700 font-semibold">{activeTicket.detailDescription}</p>
                  </div>

                  {/* Core Action Items list */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-black text-[#7C3AED] block mb-1">Cross-Departmental Action Handover Checklist:</span>
                    <div className="space-y-2 flex flex-col">
                      {activeTicket.coreActionItems.map(item => (
                        <label 
                          key={item.task} 
                          className={`flex items-start gap-2.5 p-2 rounded-lg border border-transparent hover:bg-slate-50 transition cursor-pointer select-none ${
                            item.done ? 'line-through text-slate-405 italic' : 'text-slate-700 font-bold'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => handleToggleActionItem(activeTicket.id, item.task)}
                            className="mt-0.5 accent-purple-600 h-4 w-4 shrink-0 cursor-pointer"
                          />
                          <span>{item.task}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Chat interface layout */}
                  <div className="border-t border-slate-100 pt-4 space-y-4">
                    <span className="text-[10px] uppercase font-black text-slate-400 flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-purple-600" /> Live Collaboration Chat logs (Threaded)
                    </span>
                    
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-150 max-h-[160px] overflow-y-auto scrollbar-thin space-y-3.5">
                      {activeTicket.thread.map((msg, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[9px] text-slate-400 font-extrabold uppercase">
                            <span>{msg.sender}</span>
                            <span>{new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="p-2.5 bg-white border border-slate-150 rounded-lg text-slate-800 text-[11px] leading-relaxed font-semibold">
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </CardContent>
              </div>

              {/* Chat Input form footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                <form onSubmit={handleSendMessage} className="flex gap-2 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Enter collaborative coordinate note to synch in ticket thread..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-white p-2.5 border border-slate-205 rounded-xl font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-650"
                  />
                  <Button variant="primary" size="sm" type="submit" className="gap-1 font-bold">
                    Transmit <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>

                {/* Handover Signoff Action */}
                {activeTicket.status !== 'Completed Sign-off' && (
                  <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex justify-end items-center gap-3">
                    <span className="text-[9px] text-slate-400 font-extrabold flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" /> Cross-departmental authorization signs this ticket off completely.
                    </span>
                    <button
                      onClick={() => handleSignOffTicket(activeTicket.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase text-[10px] rounded cursor-pointer transition shadow-xs flex items-center gap-1.5"
                    >
                      <BookmarkCheck className="h-4 w-4" /> Authorize Cross Sign-off
                    </button>
                  </div>
                )}
              </div>

            </Card>
          ) : (
            <div className="text-center p-12 text-slate-400 italic">No communication threads selected.</div>
          )}
        </div>

      </div>

      {/* CREATE TICKET MODAL */}
      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title="Simulate Collaboration Intake Form">
        <form onSubmit={handleLaunchTicket} className="space-y-4 font-bold text-xs select-none">
          <div>
            <label className="block text-slate-655 mb-1 uppercase text-[10px]">Short title of Inter-department dependency</label>
            <input
              type="text"
              required
              placeholder="e.g. HSE hazard barricade hardware procurement order"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-slate-205 rounded-lg focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-650 mb-1 uppercase text-[10px]">Your Department (Sponsor)</label>
              <select
                value={newSponsor}
                onChange={(e) => setNewSponsor(e.target.value)}
                className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none"
              >
                <option value="HR Operations">HR Operations</option>
                <option value="Projects & Infrastructure">Projects & Infrastructure</option>
                <option value="HSE Committee">HSE Committee</option>
                <option value="Procurement Office">Procurement Office</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-650 mb-1 uppercase text-[10px]">Target Responder Department</label>
              <select
                value={newResponder}
                onChange={(e) => setNewResponder(e.target.value)}
                className="w-full p-1.5 border border-slate-205 rounded-lg focus:outline-none"
              >
                <option value="Finance & Accounts">Finance & Accounts</option>
                <option value="Projects & Infrastructure">Projects & Infrastructure</option>
                <option value="HSE Committee">HSE Committee</option>
                <option value="Procurement Office">Procurement Office</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-650 mb-1 uppercase text-[10px]">SLA Priority</label>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as any)}
              className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none text-[11px]"
            >
              <option value="Low">Low Rating (48h Resolution SLA)</option>
              <option value="Medium">Medium Rating (24h Resolution SLA)</option>
              <option value="High">High Rating (12h Resolution SLA)</option>
              <option value="Critical">Critical Emergency (Immediate CEO notification)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-650 mb-1 uppercase text-[10px]">Request Coordinates and Justification Details</label>
            <textarea
              required
              rows={3}
              placeholder="Provide chronological brief of help or asset required from the responding unit..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" type="button" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Launch Ticket
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default Communications;
