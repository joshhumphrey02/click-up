import React, { useState } from 'react';
import {
  Video,
  Clock,
  Calendar,
  PlusCircle,
  Users,
  CheckSquare,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const Meetings: React.FC = () => {
  const { meetings, addMeeting } = useCommandCenter();

  const [formOpen, setFormOpen] = useState(false);
  const [mtTitle, setMtTitle] = useState('');
  const [mtDept, setMtDept] = useState('Projects');
  const [mtDate, setMtDate] = useState('');
  const [mtTime, setMtTime] = useState('');
  const [mtPlatform, setMtPlatform] = useState<'Zoom' | 'Google Meet' | 'Microsoft Teams'>('Zoom');
  const [mtAgenda, setMtAgenda] = useState('');
  const [mtAttendees, setMtAttendees] = useState('');

  const handleSubmitMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mtTitle.trim() || !mtDate.trim()) return;

    const parsedAttendees = mtAttendees
      ? mtAttendees.split(',').map(a => a.trim())
      : ['Daniel Eze (CEO)', 'Maryam Bello', 'Tunde Balogun'];

    addMeeting({
      title: mtTitle,
      department: mtDept,
      date: mtDate,
      time: mtTime || '11:00 AM',
      platform: mtPlatform,
      agenda: mtAgenda,
      attendees: parsedAttendees
    });

    // Reset Fields
    setMtTitle('');
    setMtDate('');
    setMtTime('');
    setMtAgenda('');
    setMtAttendees('');
    setFormOpen(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-700">
      
      {/* Sub titles metadata definitions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Virtual Strategic Meeting Hub & Calendar</h2>
          <p className="text-xs text-slate-500 mt-1">
            Centralized strategic agenda alignment, minute indexation, decisions tracker logs, team actions execution, and frictionless calendar scheduling.
          </p>
        </div>

        <Button variant="primary" size="sm" className="gap-1.5 font-bold shrink-0 cursor-pointer" onClick={() => setFormOpen(true)}>
          <PlusCircle className="h-4.5 w-4.5" /> Schedule Virtual Session
        </Button>
      </div>

      {/* Meet Metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Video}
          value={meetings.length}
          label="Sessions Programmed"
          description="In continuous active sprint calendar"
          variant="indigo"
        />
        <StatCard
          icon={CheckSquare}
          value={meetings.reduce((acc, m) => acc + m.actionItems.length, 0)}
          label="Total Meeting Action Items"
          description="Assigned following central minutes audits"
          variant="amber"
        />
        <StatCard
          icon={FileCheck2}
          value={meetings.reduce((acc, m) => acc + m.decisions.length, 0)}
          label="Immutably Signed Decisions"
          description="Logged in board minute archives"
          variant="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scheduled List and details (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold uppercase text-slate-405 text-slate-400 tracking-wider">Upcoming Calendar Grid</h3>
          
          {meetings.map((meet) => (
            <Card key={meet.id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{meet.id}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded mr-1">DEPT: {meet.department}</span>
                      <Badge variant={meet.platform === 'Zoom' ? 'blue' : meet.platform === 'Google Meet' ? 'green' : 'purple'}>
                        {meet.platform} BADGE
                      </Badge>
                    </div>
                    
                    <h4 className="text-base font-bold text-slate-900 mt-1.5">{meet.title}</h4>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-slate-550 mr-1.5 text-xs font-bold uppercase">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>{meet.date} at {meet.time}</span>
                  </div>
                </div>

                <div className="space-y-1 bg-slate-50 p-4 rounded-lg">
                  <p className="text-[10px] uppercase font-bold text-slate-450 tracking-wider">Minutes Agenda</p>
                  <p className="text-xs text-slate-655 font-medium leading-relaxed">{meet.agenda}</p>
                </div>

                {/* Attendees list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> Attendees ({meet.attendees.length})
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {meet.attendees.map((user, idx) => (
                        <span key={idx} className="bg-white border border-slate-201 border-slate-200 text-slate-655 font-semibold text-[10px] py-1 px-2 rounded">
                          {user}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Decisions inside */}
                  <div>
                    <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1">
                      <FileCheck2 className="h-3.5 w-3.5" /> Immutably Signed Decisions
                    </h5>
                    {meet.decisions.length === 0 ? (
                      <p className="text-[10px] text-slate-400 italic">No strategic decisions recorded yet in this session.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {meet.decisions.map((dec, idx) => (
                          <div key={idx} className="p-2 bg-emerald-50 text-emerald-805 border border-emerald-100 text-[10px] font-semibold rounded leading-relaxed">
                            {dec}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Assigned action elements */}
                {meet.actionItems.length > 0 && (
                  <div className="border-t border-slate-100 pt-3">
                    <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1">
                      <CheckSquare className="h-3.5 w-3.5" /> Minutes Action checklist
                    </h5>
                    <div className="space-y-1.5">
                      {meet.actionItems.map((action) => (
                        <div key={action.id} className="flex justify-between items-center bg-slate-50 p-2 rounded text-[10px] font-bold">
                          <span className={action.status === 'Completed' ? 'line-through text-slate-400 font-medium' : 'text-slate-800'}>
                            {action.text} (Assignee: {action.taskOwner})
                          </span>
                          <Badge variant={action.status === 'Completed' ? 'green' : 'gray'}>
                            {action.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Small strategic summary card list (1/3) */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Decision Board Awaiting Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div className="p-3 bg-amber-50 text-amber-805 rounded-lg border border-amber-100 text-xs font-semibold leading-relaxed">
                <p className="font-bold">EXE-303 Partnership Vote</p>
                <p className="text-[10px] text-amber-700 mt-1">Awaiting third quarter independent maritime audit report.</p>
              </div>
              <div className="p-3 bg-slate-50 text-slate-700 rounded-lg border border-slate-150 text-xs font-semibold leading-relaxed">
                <p className="font-bold">Lekki Extension PO-8902</p>
                <p className="text-[10px] text-slate-450 mt-1">Waiver approved during session MEET-401.</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Create Meeting Modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        title="Schedule Strategic Virtual Session"
      >
        <form onSubmit={handleSubmitMeeting} className="space-y-4 text-xs font-semibold select-none">
          <div>
            <label className="block text-[10px] font-bold text-slate-550 uppercase mb-1">Session / Meeting Heading</label>
            <input
              type="text"
              required
              placeholder="e.g. Q3 Lekki Port Equipment Audit review"
              value={mtTitle}
              onChange={(e) => setMtTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Applicable Department</label>
              <select
                value={mtDept}
                onChange={(e) => setMtDept(e.target.value)}
                className="w-full rounded-lg border border-slate-205 p-2 text-xs focus:outline-none"
              >
                <option value="Executive Office">Executive Office</option>
                <option value="HSE">HSE Operations</option>
                <option value="Procurement">Procurement</option>
                <option value="Projects">Projects</option>
                <option value="Vendor Management">Vendor Management</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Meeting Platform</label>
              <select
                value={mtPlatform}
                onChange={(e) => setMtPlatform(e.target.value as any)}
                className="w-full rounded-lg border border-slate-205 p-2 text-xs focus:outline-none"
              >
                <option value="Zoom">Zoom</option>
                <option value="Google Meet">Google Meet</option>
                <option value="Microsoft Teams">Microsoft Teams</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target Date</label>
              <input
                type="date"
                required
                value={mtDate}
                onChange={(e) => setMtDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Session Time</label>
              <input
                type="text"
                required
                placeholder="e.g. 10:00 AM"
                value={mtTime}
                onChange={(e) => setMtTime(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-550 uppercase mb-1">Attendees (Comma separated names)</label>
            <input
              type="text"
              placeholder="e.g. Daniel Eze, Ada Okafor, Tunde Balogun"
              value={mtAttendees}
              onChange={(e) => setMtAttendees(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Agenda list details</label>
            <textarea
              required
              rows={3}
              placeholder="Detail out the meeting points and alignment structures..."
              value={mtAgenda}
              onChange={(e) => setMtAgenda(e.target.value)}
              className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-50">
            <Button variant="outline" size="sm" type="button" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Schedule Session
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
export default Meetings;
