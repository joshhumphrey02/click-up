import React, { useState } from 'react';
import {
  Video,
  Clock,
  Calendar,
  PlusCircle,
  Users,
  CheckSquare,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  ClipboardList,
  Sparkles,
  HelpCircle,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface MeetingAgenda {
  id: string;
  title: string;
  dateTime: string;
  platform: 'Google Meet' | 'Zoom' | 'Microsoft Teams';
  agendaBrief: string;
  attendees: { name: string; present: boolean }[];
  minutesPreviewLink: string;
}

interface ActionPoint {
  id: string;
  task: string;
  owner: string;
  status: 'Pending' | 'Completed';
}

interface BoardDecision {
  id: string; // Resolution ID
  decision: string;
  votedBy: string;
  category: string;
}

export const Meetings: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [meetingModal, setMeetingModal] = useState(false);
  const [selectedMeetingIdForMoM, setSelectedMeetingIdForMoM] = useState<string | null>(null);

  // New Meeting fields
  const [meetTitle, setMeetTitle] = useState('');
  const [meetDate, setMeetDate] = useState(new Date().toISOString().split('T')[0] + 'T14:30');
  const [meetPlatform, setMeetPlatform] = useState<'Google Meet' | 'Zoom' | 'Microsoft Teams'>('Google Meet');
  const [meetAgenda, setMeetAgenda] = useState('');

  // 1. Scheduled Virtual Meetings List with requested columns/fields
  const [meetings, setMeetings] = useState<MeetingAgenda[]>([
    {
      id: 'MTG-102',
      title: 'Q2 Executive Project Alignment & Budget Review',
      dateTime: '2026-06-12 at 14:30 SA Standard Time',
      platform: 'Google Meet',
      agendaBrief: 'Review foundational pile overrides for Eko Substation works, examine Kaduna dredging disputed SLA log, and approve HR welfare insurance HMO migration.',
      attendees: [
        { name: 'Daniel Eze (CEO)', present: true },
        { name: 'Maryam Bello (HSE Lead)', present: true },
        { name: 'Tunde Balogun (Procure Lead)', present: true },
        { name: 'Chinedu Nwosu (Ops Manager)', present: false }
      ],
      minutesPreviewLink: 'MoM-PROJ-ALIGN-Q2.md'
    },
    {
      id: 'MTG-103',
      title: 'Joint HR & Operations Safety Training Synchronizer',
      dateTime: '2026-06-15 at 10:00 SA Standard Time',
      platform: 'Zoom',
      agendaBrief: 'Formulate HSE audit runbook checklists, assign corrective action owners for recent scaffold warnings, and allocate emergency containment training slots.',
      attendees: [
        { name: 'Ada Okafor (HR Ops)', present: true },
        { name: 'Maryam Bello (HSE Lead)', present: true },
        { name: 'Olumide Awosika (Ops Lead)', present: true }
      ],
      minutesPreviewLink: 'MoM-SAFETY-TRAIN-Q2.md'
    }
  ]);

  // 2. ClickUp Action Items generated during meet
  const [actions, setActions] = useState<ActionPoint[]>([
    { id: 'ACT-901', task: 'Issue official budget variation order pack for Eko piling works', owner: 'Tunde Balogun', status: 'Pending' },
    { id: 'ACT-902', task: 'Conduct HSE physical inspection of unblocked fire exits at VGC Site B', owner: 'Maryam Bello', status: 'Completed' },
    { id: 'ACT-903', task: 'Dispatch Kaduna Dredging marine SLA amendment terms to CEO for signoff', owner: 'Chinedu Nwosu', status: 'Pending' }
  ]);

  // 3. Central Board Decisions Index Logs
  const [decisions, setDecisions] = useState<BoardDecision[]>([
    { id: 'DEC-RES-04', decision: 'Transition corporate HMO life insurance policy scheme to RedCare Health.', votedBy: 'Daniel Eze, Ada Okafor, Amara Okonkwo', category: 'Welfare' },
    { id: 'DEC-RES-05', decision: 'Lock VGC scaffold site zone and trigger automated push warnings.', votedBy: 'Daniel Eze, Maryam Bello', category: 'HSE Risk Mitigation' },
    { id: 'DEC-RES-06', decision: 'Swapped Kaduna marine logistic sub-vendors to Silas Thorne Rigging.', votedBy: 'Daniel Eze, Tunde Balogun', category: 'Procurement Strategy' }
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetTitle.trim() || !meetAgenda.trim()) return;

    const code = `MTG-${Math.floor(104 + Math.random() * 95)}`;
    const [date, time] = meetDate.split('T');
    const newMeeting: MeetingAgenda = {
      id: code,
      title: meetTitle,
      dateTime: `${date} at ${time || '14:30'} SA Standard Time`,
      platform: meetPlatform,
      agendaBrief: meetAgenda,
      attendees: [
        { name: 'Daniel Eze (CEO)', present: true },
        { name: 'Maryam Bello (HSE Lead)', present: true },
        { name: 'Tunde Balogun (Procure Lead)', present: true }
      ],
      minutesPreviewLink: `MoM-${meetTitle.replace(/\s+/g, '-').slice(0, 15)}.md`
    };

    setMeetings(prev => [...prev, newMeeting]);
    showToast(`Meeting ${code} scheduled. Invitation dispatches generated!`);
    setMeetTitle('');
    setMeetAgenda('');
    setMeetingModal(false);
  };

  // Toggle present/absent checklist states
  const handleToggleAttendance = (meetingId: string, attendeeName: string) => {
    setMeetings(prev => prev.map(m => {
      if (m.id === meetingId) {
        return {
          ...m,
          attendees: m.attendees.map(a => a.name === attendeeName ? { ...a, present: !a.present } : a)
        };
      }
      return m;
    }));
    showToast(`Updated attendance checklist for ${attendeeName}.`);
  };

  const handleToggleAction = (id: string) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Completed' ? 'Pending' : 'Completed' } : a));
    showToast(`Action point ${id} status toggled.`);
  };

  const handleAddAction = (taskText: string) => {
    if (!taskText.trim()) return;
    const newId = `ACT-${Math.floor(904 + Math.random() * 80)}`;
    setActions(prev => [...prev, { id: newId, task: taskText, owner: 'Maryam Bello', status: 'Pending' }]);
    showToast(`Action item ${newId} assigned during agenda review!`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Toast feedback */}
      {toast && (
        <div className="fixed top-4 right-4 bg-slate-900 border border-purple-500 text-white p-4 rounded-xl shadow-2xl z-50 animate-fade-in text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toast}</span>
        </div>
      )}

      {/* Hero Page Title Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-[#7C3AED] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Space: MEETING-OPERATIONS
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">9. Virtual Meeting Management</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Central coordination chamber containing digital agendas, scheduled invitations, board resolution logs, and action items checklists.
          </p>
        </div>

        <Button variant="primary" size="sm" className="gap-1.5 font-bold" onClick={() => setMeetingModal(true)}>
          <PlusCircle className="h-4.5 w-4.5" /> Schedule Virtual Board
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Video}
          value={`${meetings.length} Scheduled`}
          label="Upcoming Briefings"
          description="In continuous active pipeline"
          variant="indigo"
        />
        <StatCard
          icon={Users}
          value="92% Present"
          label="Average Board Quorum"
          description="Monitored in dispatch charts"
          variant="emerald"
        />
        <StatCard
          icon={FileCheck2}
          value={`${decisions.length} Approved`}
          label="Decisions & Resolutions"
          description="Logged in immutable audit index"
          variant="blue"
        />
        <StatCard
          icon={CheckSquare}
          value={`${actions.filter(a => a.status === 'Pending').length} Pending`}
          label="Assigned Actions Tracker"
          description="Awaiting action stakeholder responses"
          variant="amber"
        />
      </div>

      {/* Grid: Upcoming Meetings and MoM preview */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Grid: Upcoming Meetings List (8/12) */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Meetings Strategic Board</h3>
          
          <div className="space-y-4">
            {meetings.map(meet => (
              <Card key={meet.id} className="bg-white border border-slate-200">
                <CardHeader className="border-b border-slate-100 bg-slate-50/40 p-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span className="text-slate-400 font-extrabold">{meet.id}</span>
                    <span className="text-[10px] uppercase text-[#7C3AED] leading-none font-black flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> Scheduled Datetime: {meet.dateTime}
                    </span>
                  </div>
                  <Badge variant={meet.platform === 'Google Meet' ? 'green' : 'blue'}>
                    {meet.platform}
                  </Badge>
                </CardHeader>

                <CardContent className="p-5 space-y-4 text-xs font-bold">
                  {/* Title & Agenda */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-900 leading-tight">{meet.title}</h4>
                    <p className="text-[11px] font-semibold text-slate-505 leading-relaxed mt-1">
                      <strong>Agenda Description:</strong> {meet.agendaBrief}
                    </p>
                  </div>

                  {/* Attendance status Checklist */}
                  <div className="border-t border-slate-100 pt-3">
                    <span className="text-[9px] uppercase text-slate-400 font-black block mb-2">Live Attendance Checklist (Toggle Presence)</span>
                    <div className="flex flex-wrap gap-2">
                      {meet.attendees.map((attendee, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleToggleAttendance(meet.id, attendee.name)}
                          className={`px-2.5 py-1 text-[10px] font-bold border rounded-lg flex items-center gap-1.5 transition cursor-pointer select-none ${
                            attendee.present 
                              ? 'bg-emerald-50 border-emerald-205 text-emerald-850' 
                              : 'bg-rose-50 border-rose-205 text-rose-800'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${attendee.present ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                          <span>{attendee.name} ({attendee.present ? 'Present' : 'Absent'})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minutes (MoM) preview link section */}
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-extrabold italic">Generated MoM document target: {meet.minutesPreviewLink}</span>
                    <button
                      onClick={() => setSelectedMeetingIdForMoM(meet.id)}
                      className="text-[10px] text-[#7C3AED] hover:text-purple-800 flex items-center gap-1 font-extrabold uppercase tracking-wider cursor-pointer"
                    >
                      <ClipboardList className="h-4 w-4" /> Open Minutes (MoM) Preview <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resolutions Decisions index log */}
          <Card className="bg-white border border-slate-205">
            <CardHeader className="border-b border-slate-100 p-4 bg-slate-50">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Board Decisions Index Logs</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-bold border-collapse select-none">
                <thead>
                  <tr className="bg-slate-100 text-slate-400 uppercase tracking-widest text-[9px] border-b border-slate-200">
                    <th className="p-3">Resolution ID</th>
                    <th className="p-3">Decision Taken</th>
                    <th className="p-3">Category Classification</th>
                    <th className="p-3">Voted Signatories</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-705">
                  {decisions.map(dec => (
                    <tr key={dec.id}>
                      <td className="p-3 text-[#7C3AED] font-extrabold">{dec.id}</td>
                      <td className="p-3 text-slate-900 font-extrabold">{dec.decision}</td>
                      <td className="p-3 text-slate-500 font-semibold">{dec.category}</td>
                      <td className="p-3 text-[10px] text-slate-400 italic">{dec.votedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

        {/* Right Grid: Action Items Board (4/12) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-white border border-slate-200">
            <CardHeader className="border-b border-slate-100 p-4">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Minutes Action Items</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              
              <div className="space-y-2.5">
                {actions.map(act => (
                  <div 
                    key={act.id} 
                    onClick={() => handleToggleAction(act.id)}
                    className={`p-3.5 border rounded-xl flex items-start gap-2.5 transition cursor-pointer select-none leading-normal text-xs font-semibold ${
                      act.status === 'Completed' 
                        ? 'bg-slate-50 border-slate-200 text-slate-400 line-through' 
                        : 'bg-white border-slate-205 text-slate-800 hover:border-purple-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={act.status === 'Completed'}
                      readOnly
                      className="mt-0.5 accent-purple-600 h-4 w-4 shrink-0 pointer-events-none"
                    />
                    <div>
                      <strong>{act.task}</strong>
                      <p className={`text-[9px] mt-0.5 font-bold ${act.status === 'Completed' ? 'text-slate-400' : 'text-[#7C3AED] uppercase'}`}>
                        Owner: {act.owner} | {act.id}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action Input */}
              <div className="pt-3 border-t border-slate-100">
                <input
                  type="text"
                  placeholder="Insert custom action note..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddAction((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-650"
                />
                <p className="text-[9px] text-slate-400 font-bold mt-1.5 uppercase text-center select-none">Press Enter to assign new action item</p>
              </div>

            </CardContent>
          </Card>

          {/* SLA note */}
          <div className="bg-[#7C3AED]/5 border border-purple-100 p-4 rounded-xl text-xs font-semibold leading-normal text-slate-655 flex gap-2">
            <Info className="h-4 w-4 text-[#7C3AED] shrink-0 mt-0.5" />
            <p>Under board rules, virtual agendas and resolution records are synched directly to the CEO oversight workspace for instant validation seals.</p>
          </div>
        </div>

      </div>

      {/* SCHEDULE VIRTUAL MEETING MODAL */}
      <Modal isOpen={meetingModal} onClose={() => setMeetingModal(false)} title="Simulate Calendar Scheduler Form">
        <form onSubmit={handleCreateMeeting} className="space-y-4 font-bold text-xs select-none">
          <div>
            <label className="block text-slate-600 mb-1 uppercase text-[10px]">Session Title / Strategic Agenda Area</label>
            <input
              type="text"
              required
              placeholder="e.g. Q2 Port Harcourt Marine Subcontract SLA Review"
              value={meetTitle}
              onChange={(e) => setMeetTitle(e.target.value)}
              className="w-full p-2 border border-slate-205 rounded-lg focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 mb-1 uppercase text-[10px]">Date and Time Zone</label>
              <input
                type="datetime-local"
                required
                value={meetDate}
                onChange={(e) => setMeetDate(e.target.value)}
                className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 uppercase text-[10px]">Meeting Platform Provider</label>
              <select
                value={meetPlatform}
                onChange={(e) => setMeetPlatform(e.target.value as any)}
                className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none"
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom Video</option>
                <option value="Microsoft Teams">Microsoft Teams</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-600 mb-1 uppercase text-[10px]">Chronological Agenda Brief</label>
            <textarea
              required
              rows={3}
              placeholder="Formulate core brief headings to dispatch to committee members..."
              value={meetAgenda}
              onChange={(e) => setMeetAgenda(e.target.value)}
              className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" type="button" onClick={() => setMeetingModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Publish Invitation
            </Button>
          </div>
        </form>
      </Modal>

      {/* MEETING MINUTES PREVIEW FORMAL OVERLAY MODAL */}
      {selectedMeetingIdForMoM && (
        <Modal 
          isOpen={true} 
          onClose={() => setSelectedMeetingIdForMoM(null)} 
          title={`Minutes of Meeting (MoM) Preview - ${selectedMeetingIdForMoM}`}
        >
          <div className="space-y-4 font-bold text-xs text-slate-700 leading-normal p-1 select-none">
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-semibold text-slate-655 leading-snug">
              <p className="text-[10px] uppercase font-bold text-[#7C3AED]">OFFICIAL MINUTES DECLASSIFIED RECORD</p>
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-200 pb-1.5">
                {meetings.find(m => m.id === selectedMeetingIdForMoM)?.title}
              </h3>
              
              <div className="space-y-2 mt-2">
                <p><strong>1. Executive Quorum Alignment:</strong> Checked, calculated, and resolved. All designated core stakeholders were matched through live checklist logs.</p>
                <p><strong>2. Summary Decisions Authorized:</strong> Approbations and variations routed under central cryptographic security rules with complete legal oversight.</p>
                <p><strong>3. Assigned Next Steps:</strong> All minutes actions assigned to owners with standard SLA escalation parameters active.</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 italic">This MoM file is digitally synched in the PMO archive folder indexation, visible to all department managers.</p>

            <div className="flex justify-between items-center pt-2 border-t border-slate-55 border-t-slate-100">
              <button 
                onClick={() => showToast("Minutes printed to PDF successfully!")}
                className="text-[10px] text-slate-500 hover:text-slate-900"
              >
                🖨️ Export Minutes PDF
              </button>
              <Button variant="primary" size="sm" onClick={() => setSelectedMeetingIdForMoM(null)}>
                Dismiss MoM View
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};

export default Meetings;
