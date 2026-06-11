import React, { useState } from 'react';
import {
  Calendar,
  MessageSquare,
  FileCheck2,
  AlertOctagon,
  LifeBuoy,
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const StaffWorkspace: React.FC = () => {
  const {
    tasks,
    updateTaskStatus,
    addTaskComment,
    sops
  } = useCommandCenter();

  // Selected State for SOP Inspecting Modal
  const [selectedSopId, setSelectedSopId] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>('');

  // Handle Comments submit
  const handleAddComment = (taskId: string) => {
    if (!newCommentText.trim()) return;
    addTaskComment(taskId, newCommentText);
    setNewCommentText('');
  };

  const myTasksCount = tasks.length;
  const overdraftTasks = tasks.filter(t => t.escalationFlag).length;

  // View linked SOP action
  const openSopModal = (sopId: string) => {
    setSelectedSopId(sopId);
  };

  const activeSop = sops.find(s => s.id === selectedSopId);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Intro Sub-Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">Assigned Operational Tasks</h2>
        <p className="text-xs text-slate-500 mt-1">
          Your centralized operational queues. Execute tasks, change status levels, check compliance directives via linked standard operating procedures (SOPs), and log real-time comments.
        </p>
      </div>

      {/* Staff Telemetry Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={FileCheck2}
          value={myTasksCount}
          label="Total Assigned Actions"
          description="Across active enterprise modules"
          variant="indigo"
        />
        <StatCard
          icon={AlertOctagon}
          value={overdraftTasks}
          label="SLA Escalations Rising"
          description="Flags triggered on warning paths"
          variant="rose"
        />
        <StatCard
          icon={Calendar}
          value="2 Upcoming"
          label="Calendar Events Today"
          description="Weekly Board Strategic review upcoming"
          variant="emerald"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Task Board (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">My Active Queue</h3>
          
          {tasks.map((task) => (
            <Card key={task.id} className={`border-l-4 ${task.escalationFlag ? 'border-l-rose-505 border-l-rose-500' : 'border-l-indigo-600'}`}>
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wide">{task.id}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase">{task.department}</span>
                      {task.escalationFlag && (
                        <Badge variant="red">Escalated SLA limit</Badge>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{task.title}</h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={getStatusVariant(task.priority)}>{task.priority}</Badge>
                    <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4 border-t border-slate-50 pt-3">
                  <div className="flex gap-4">
                    <span><strong>Owner:</strong> {task.owner}</span>
                    <span><strong>Due Date:</strong> {task.dueDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {task.linkedSopId && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="cursor-pointer font-bold shrink-0 text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100"
                        onClick={() => openSopModal(task.linkedSopId!)}
                      >
                        Read Linked SOP
                      </Button>
                    )}

                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as any)}
                      className="bg-white border border-slate-205 rounded-lg text-xs py-1.5 px-3 font-semibold text-slate-700 focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                </div>

                {/* Task comment thread */}
                <div className="bg-slate-50 p-4 rounded-lg mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" /> Comments ({task.comments.length})
                    </span>
                    <button
                      onClick={() => setActiveTaskId(activeTaskId === task.id ? null : task.id)}
                      className="text-[10px] text-indigo-650 hover:text-indigo-800 font-semibold cursor-pointer"
                    >
                      {activeTaskId === task.id ? 'Hide Comment Pad' : 'Write Comment'}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {task.comments.map((comment, idx) => (
                      <p key={idx} className="text-xs text-slate-600 bg-white p-2 rounded-md border border-slate-100/60 leading-relaxed font-semibold">
                        {comment}
                      </p>
                    ))}
                  </div>

                  {activeTaskId === task.id && (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Type standard comment update..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="flex-1 bg-white border border-slate-200 rounded-lg text-xs px-3 py-1.5 focus:outline-none"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(task.id); }}
                      />
                      <Button variant="primary" size="sm" className="font-bold cursor-pointer" onClick={() => handleAddComment(task.id)}>
                        Post
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Small Calendar & assigned forms (1/3) */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Operational Forms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border border-slate-100 rounded-lg hover:border-indigo-400 cursor-pointer transition">
                <p className="text-xs font-bold text-slate-900">Purchase Requisition Form</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Triggers Procurement Approval pipeline</p>
              </div>
              <div className="p-3 border border-slate-100 rounded-lg hover:border-indigo-400 cursor-pointer transition">
                <p className="text-xs font-bold text-slate-900">HSE Incident Report Form</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Triggers safety alert dashboard rules</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Sprint Calendar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div className="flex gap-3 text-xs">
                <div className="px-2 py-1 bg-indigo-50 text-indigo-800 rounded font-bold self-start text-center">
                  11<br/><span className="text-[9px] uppercase font-semibold">Jun</span>
                </div>
                <div>
                  <p className="font-bold text-slate-905">Weekly Exec reviews</p>
                  <p className="text-[10px] text-slate-400">10:00 AM - Online Zoom</p>
                </div>
              </div>
              <div className="flex gap-3 text-xs">
                <div className="px-2 py-1 bg-rose-50 text-rose-800 rounded font-bold self-start text-center">
                  12<br/><span className="text-[9px] uppercase font-semibold">Jun</span>
                </div>
                <div>
                  <p className="font-bold text-slate-905">HSE Fire drill reports</p>
                  <p className="text-[10px] text-slate-400">Due before 05:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* SOP Inspecting Modal */}
      <Modal
        isOpen={selectedSopId !== null}
        onClose={() => setSelectedSopId(null)}
        title={activeSop ? `${activeSop.docCode}: ${activeSop.name}` : 'Standard Operating Procedure'}
      >
        {activeSop ? (
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs leading-relaxed font-semibold">
              <strong>Applicable Department Context:</strong> {activeSop.department}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Standard Checklist</p>
              <div className="text-xs text-slate-655 leading-relaxed bg-indigo-50/20 border border-indigo-50 p-4 rounded-lg font-medium whitespace-pre-line">
                {activeSop.content}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 italic">This compliance instruction rule is digitally locked. Any deviations trigger audit logs.</p>
          </div>
        ) : (
          <p className="text-xs text-slate-500">Procedural documentation loading error.</p>
        )}
      </Modal>

    </div>
  );
};
export default StaffWorkspace;
