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
  Send
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const Communications: React.FC = () => {
  const { commsRequests, addCommsRequest } = useCommandCenter();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string>('COM-501');

  // Input States
  const [comTitle, setComTitle] = useState('');
  const [sourceDept, setSourceDept] = useState('HR Operations');
  const [recDept, setRecDept] = useState('HSE');
  const [slaHours, setSlaHours] = useState('48');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [owner, setOwner] = useState('Ada Okafor');

  const handleSubmitRequestByUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comTitle.trim()) return;

    addCommsRequest({
      title: comTitle,
      sourceDept,
      receivingDept: recDept,
      slaHours: Number(slaHours) || 48,
      priority,
      owner
    });

    setComTitle('');
    setFormOpen(false);
  };

  const selectedTicket = commsRequests.find(c => c.id === selectedThreadId) || commsRequests[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-700">
      
      {/* Sub titles layout details */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-205 p-6 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Interdepartmental Communications & Ticket SLA Tracker</h2>
          <p className="text-xs text-slate-505 mt-1 font-medium">
            Monitor and resolve cross-team dependencies, ticket SLA timers, responder assignees, thread communication histories, and escalated project bottlenecks.
          </p>
        </div>

        <Button variant="primary" size="sm" className="gap-1.5 font-bold shrink-0 cursor-pointer" onClick={() => setFormOpen(true)}>
          <PlusCircle className="h-4.5 w-4.5" /> Initialize Cross-Dept Ticket
        </Button>
      </div>

      {/* Comms Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={MessageSquare}
          value={commsRequests.length}
          label="Total Dependencies Lanes"
          description="Awaiting cross-departmental response"
          variant="indigo"
        />
        <StatCard
          icon={Clock}
          value={`${commsRequests.filter(c => c.timeLeftHours < 0).length} Tickets`}
          label="SLA Escalations Exceeded"
          description="Auto-assigned warnings routed to C-Suite"
          variant="rose"
        />
        <StatCard
          icon={TrendingUp}
          value="91.2% SLA"
          label="Median Response Efficiency"
          description="Calculated based on 48h benchmarks"
          variant="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Tickets List (1/3) */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Active Ticket Threads</h3>
          
          <div className="space-y-3">
            {commsRequests.map((c) => {
              const isOverdue = c.timeLeftHours < 0;
              return (
                <Card
                  key={c.id}
                  onClick={() => setSelectedThreadId(c.id)}
                  className={`transition-all ${
                    selectedThreadId === c.id ? 'ring-2 ring-indigo-900 border-indigo-400' : ''
                  }`}
                >
                  <div className="p-4 space-y-3.5 select-none text-xs">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{c.id}</span>
                        <h4 className="text-xs font-bold text-slate-900 leading-normal mt-0.5" title={c.title}>{c.title}</h4>
                      </div>
                      <Badge variant={getStatusVariant(c.status)}>{c.status}</Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-600">{c.sourceDept}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                      <span className="bg-indigo-50 px-1.5 py-0.5 rounded text-[9px] font-bold text-indigo-705">{c.receivingDept}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-450 font-semibold uppercase border-t border-slate-50 pt-2.5">
                      <span>Owner: {c.owner}</span>
                      <span className={`font-black ${isOverdue ? 'text-rose-600' : 'text-slate-500'}`}>
                        {isOverdue ? `Overdue by ${Math.abs(c.timeLeftHours)}h` : `${c.timeLeftHours}h Left`}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right Side: Conversation Thread View (2/3) */}
        {selectedTicket && (
          <Card className="lg:col-span-2 flex flex-col justify-between">
            <CardHeader className="flex justify-between items-center bg-slate-50/50">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wide">Docket Thread ID: {selectedTicket.id}</span>
                <CardTitle className="mt-1">{selectedTicket.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1 px-0.5">
                  <span className="text-[10px] font-semibold text-slate-500">Source: <strong>{selectedTicket.sourceDept}</strong></span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                  <span className="text-[10px] font-semibold text-slate-500">Receiver: <strong className="text-indigo-700">{selectedTicket.receivingDept}</strong></span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={getStatusVariant(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                <Badge variant={getStatusVariant(selectedTicket.status)}>{selectedTicket.status}</Badge>
              </div>
            </CardHeader>

            {/* Conversation Messages */}
            <div className="p-6 space-y-4 max-h-[360px] overflow-y-auto bg-slate-50/50 flex-grow min-h-[160px]">
              {selectedTicket.thread.map((msg, idx) => (
                <div key={idx} className="flex gap-4 items-start select-none text-xs">
                  <div className="p-2 rounded-full bg-indigo-50 text-indigo-805 self-start shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex-1 bg-white border border-slate-205 rounded-xl p-4 shadow-2xs leading-relaxed max-w-xl">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-450 uppercase mb-1.5">
                      <span>{msg.sender}</span>
                      <span>{new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-slate-700 font-semibold">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Reply Panel */}
            <div className="p-4 border-t border-slate-200 bg-white rounded-b-xl flex gap-3">
              <input
                type="text"
                placeholder="Type reply message logs complying with SLA limits..."
                className="flex-1 rounded-lg border border-slate-250 p-2.5 text-xs focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                onKeyDown={(e) => { if (e.key === 'Enter') alert('Interdepartmental reply saved on ledger! Thread synced.'); }}
              />
              <Button variant="primary" size="md" className="gap-2 shrink-0 font-bold cursor-pointer" onClick={() => alert('Reply logged and dispatched via SLA en-route push.')}>
                Transmit Reply <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        )}

      </div>

      {/* Ticket Create Modal Input */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title="Initialize Cross-Departmental Communication Ticket"
      >
        <form onSubmit={handleSubmitRequestByUnit} className="space-y-4 text-xs font-semibold select-none">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Issue / Dependency title</label>
            <input
              type="text"
              required
              placeholder="e.g. Realignment of budget ledger code for Lekki Excavator lease"
              value={comTitle}
              onChange={(e) => setComTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Initiator Department (Source)</label>
              <select
                value={sourceDept}
                onChange={(e) => setSourceDept(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
              >
                <option value="HR Operations">HR Operations</option>
                <option value="Projects">Projects</option>
                <option value="Procurement">Procurement</option>
                <option value="Vendor Management">Vendor Management</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Receiver Target Department</label>
              <select
                value={recDept}
                onChange={(e) => setRecDept(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
              >
                <option value="HSE">HSE Operations</option>
                <option value="Finance">Finance</option>
                <option value="Vendor Management">Vendor Management</option>
                <option value="HR Operations">HR Operations</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">SLA Resolution Limit (Hours)</label>
              <select
                value={slaHours}
                onChange={(e) => setSlaHours(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
              >
                <option value="12">12 Hours (Emergency)</option>
                <option value="24">24 Hours (High priority)</option>
                <option value="48">48 Hours (Standard)</option>
                <option value="72">72 Hours (Low priority)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">SLA Severity priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
              >
                <option value="Low">Low Rating</option>
                <option value="Medium">Medium Rating</option>
                <option value="High">High Severity Rating</option>
                <option value="Critical">Critical (Immediate Line Block)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Ticket Owner / Initiator Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Ada Okafor"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-50">
            <Button variant="outline" size="sm" type="button" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Launch Ticket Thread
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
export default Communications;
