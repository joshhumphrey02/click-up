import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  Users, 
  Laptop, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const UserTraining: React.FC = () => {
  const [adoptionChecked, setAdoptionChecked] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': false,
    '4': false,
    '5': false,
  });

  const toggleCheck = (id: string) => {
    setAdoptionChecked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const trainingGroups = [
    {
      title: 'Executive Management',
      icon: Users,
      badge: 'C-Suite & HODs',
      focus: ['Strategic Dashboard Customization', 'Approval Queues Routing & Auditing', 'Bottleneck Reporting Visualizations'],
      deliverables: ['ClickUp Executive Quick-Cheat Sheet', 'Executive Dashboard Interactive Video Guides'],
      duration: '4 Hours Total Sessions'
    },
    {
      title: 'Department Managers',
      icon: Laptop,
      badge: 'Operations Leads',
      focus: ['List, Board, and Gantt View Management', 'Bottleneck Detection & Reassignments', 'Service level agreements Monitoring & Overdues'],
      deliverables: ['Manager Workflow Operating Guide', 'SOP automation rules Configuration Handbooks'],
      duration: '8 Hours Hands-on Labs'
    },
    {
      title: 'End Users / Operational Staff',
      icon: GraduationCap,
      badge: 'Daily Operators',
      focus: ['Logging Tasks & Intake Form Submission', 'Status Progressions & Communication Threads', 'SOP adherence & checklists'],
      deliverables: ['Staff Essential Tasks Onboarding Guide', 'Recorded Simulation Platform Walkthroughs'],
      duration: '3 Hours Interactive Training'
    }
  ];

  const checkoutRules = [
    { id: '1', label: 'Hold initial discovery workshops to map operational legacy SOPs to ClickUp hierarchy.' },
    { id: '2', label: 'Establish custom role permissions and perform sandbox dry runs for elite users.' },
    { id: '3', label: 'Deploy standardized training modules across all executive and personnel nodes.' },
    { id: '4', label: 'Implement 100% digital checklists for Leave, HSE, and Purchasing applications.' },
    { id: '5', label: 'Monitor ClickUp active adoption score and provide 1-on-1 operational coaching sessions.' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-sans">
      
      {/* Title Banner */}
      <div className="bg-[#001F3F] text-white p-8 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden mb-10">
        <div className="absolute right-0 top-0 opacity-10 translate-x-20 -translate-y-16 scale-150">
          <GraduationCap className="w-96 h-96" />
        </div>
        <div className="z-10 relative">
          <span className="bg-[#7C3AED] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
            Change Management Plan
          </span>
          <h1 className="text-2xl font-black mt-3 tracking-tight">User Onboarding & Training Strategy</h1>
          <p className="text-xs text-blue-300 mt-1 max-w-2xl leading-relaxed">
            Transitioning your organization to ClickUp is a human migration first, and a digital one second. Our change management framework ensures zero downtime, full staff confidence, and immediate utility.
          </p>
        </div>
      </div>

      {/* Target Audience Groups Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {trainingGroups.map((grp, idx) => {
          const Icon = grp.icon;
          return (
            <Card key={idx} className="hover:border-purple-400 transition hover:shadow-md bg-white">
              <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900 leading-tight">
                    {grp.title}
                  </CardTitle>
                </div>
                <Badge variant="indigo">{grp.badge}</Badge>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Training Focus</h4>
                  <ul className="space-y-1.5">
                    {grp.focus.map((f, fIdx) => (
                      <li key={fIdx} className="text-[11px] text-slate-700 font-semibold flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Key Deliverables</h4>
                  <div className="space-y-1.5">
                    {grp.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded flex items-center gap-1.5">
                        <BookOpen className="h-3 w-3 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-405 font-bold">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-400" /> {grp.duration}</span>
                  <span className="text-emerald-600">Simulate Ready</span>
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Adoption Checklist (Left 7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="bg-white border border-slate-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ClickUp Solution Adoption Checklist
              </CardTitle>
              <p className="text-xs text-slate-405 mt-0.5 font-semibold">
                Mark off training and integration milestones as implementation steps complete.
              </p>
            </CardHeader>
            <CardContent className="p-6 space-y-3.5">
              {checkoutRules.map((chk) => (
                <div 
                  key={chk.id}
                  onClick={() => toggleCheck(chk.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 select-none ${
                    adoptionChecked[chk.id] 
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-700' 
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-500'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    adoptionChecked[chk.id] 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-300 bg-white'
                  }`}>
                    {adoptionChecked[chk.id] && <span className="text-[10px] font-black">✓</span>}
                  </div>
                  <div>
                    <span className={`text-xs ${adoptionChecked[chk.id] ? 'line-through opacity-70 font-semibold' : 'font-bold text-slate-800'}`}>
                      {chk.label}
                    </span>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-1 font-bold">
                      {adoptionChecked[chk.id] ? 'Milestone Complete' : 'Awaiting Deployment'}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Change adoption & Rollout (Right 5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
              <Layers className="h-4 w-4 text-purple-600" />
              Progressive Weekly Rollout
            </h3>

            <div className="space-y-4">
              <div className="border-l-2 border-purple-500 pl-4 py-1 relative">
                <span className="absolute -left-1.5 top-2 w-3.5 h-3.5 bg-purple-600 rounded-full border-2 border-white shadow-xs" />
                <strong className="text-xs text-slate-900 block font-bold leading-none mb-1">Week 1: Pilot Team Ignition</strong>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                  HR Leads map initial Onboarding & Leave Requests checklists to prove architecture feasibility.
                </p>
              </div>

              <div className="border-l-2 border-purple-500 pl-4 py-1 relative">
                <span className="absolute -left-1.5 top-2 w-3.5 h-3.5 bg-purple-600 rounded-full border-2 border-white shadow-xs" />
                <strong className="text-xs text-slate-900 block font-bold leading-none mb-1">Week 2-3: Core Operations Integration</strong>
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                  Procurement and HSE managers begin running purchase evaluations and incidents logging.
                </p>
              </div>

              <div className="border-l-2 border-slate-200 pl-4 py-1 relative">
                <span className="absolute -left-1.5 top-2 w-3.5 h-3.5 bg-slate-300 rounded-full border-2 border-white shadow-xs" />
                <strong className="text-xs text-slate-405 block font-bold leading-none mb-1">Week 4: Global Rollout & Coaching</strong>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                  Executive Approval flow takes live flight with all department reports integrated into dashboards.
                </p>
              </div>
            </div>

            <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl space-y-1 text-slate-900 text-xs">
              <strong className="text-[10px] uppercase font-bold text-purple-750 block">Post-Onboarding Hotline Support</strong>
              <p className="text-[11px] font-semibold text-slate-600 leading-relaxed">
                Trained Champion Superusers remain active inside departmental ClickUp spaces to answer questions, build specific views, and resolve operational issues instantly.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default UserTraining;
