import React, { useState } from 'react';
import {
  CalendarDays,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  CircleDot
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const Roadmap: React.FC = () => {
  // Chosen active week for detail highlight
  const [activeWeek, setActiveWeek] = useState(1);

  // Roadmap Weeks database
  const roadmapData = [
    {
      week: 1,
      title: 'Preparation & Architecture Alignment',
      focus: 'Stakeholder interviews, systems audits, data schema definition, and security parameters validation.',
      tasks: [
        { desc: 'Review existing paper templates & manual excels', complete: true },
        { desc: 'Align regulatory approval threshold values', complete: true },
        { desc: 'Provision development test instances on Cloud', complete: true },
        { desc: 'Sign off on core ISO RBAC access matrix permissions', complete: false }
      ]
    },
    {
      week: 2,
      title: 'Form & SOP Digitization Setups',
      focus: 'Recreating company physical registers as frictionless digital ClickUp forms, and centralizing the SOP library.',
      tasks: [
        { desc: 'Configure Procurement Tier approval paths', complete: true },
        { desc: 'Draft interactive HSE warning SMS escalation rule triggers', complete: false },
        { desc: 'Migrate active SOP policy articles into the system', complete: false },
        { desc: 'Deploy test webhooks connecting email APIs', complete: false }
      ]
    },
    {
      week: 3,
      title: 'ERP & Systems Integrations',
      focus: 'Plugging the platform into the existing corporate accounts registers, databases, and communication servers.',
      tasks: [
        { desc: 'Establish Google Workspace calendar sync', complete: false },
        { desc: 'Connect active directory LDAP staff logins', complete: false },
        { desc: 'Sync SAP accounting expense budget codes', complete: false },
        { desc: 'Link Twilio SMS API channels in HSE triggers', complete: false }
      ]
    },
    {
      week: 4,
      title: 'Staff Onboarding & Training Dry Run',
      focus: 'Department Head training, staff training files provision, and initial dry-run of standard operations.',
      tasks: [
        { desc: 'Coordinate training sessions with Ada Okafor (HR lead)', complete: false },
        { desc: 'Execute standard mock purchase orders', complete: false },
        { desc: 'Publish video tutorials on the workspace forum', complete: false },
        { desc: 'Record feedback on form field simplicity', complete: false }
      ]
    },
    {
      week: 5,
      title: 'Pilot Launch & Departmental Dry Run',
      focus: 'Isolating the platform to the initial department for trial (HR & Projects) to evaluate performance metrics.',
      tasks: [
        { desc: 'Lock manual excels in HR Department', complete: false },
        { desc: 'Track task closure SLA durations', complete: false },
        { desc: 'Sign off HSE checklists on site', complete: false },
        { desc: 'Resolve initial system bugs from feedback logs', complete: false }
      ]
    },
    {
      week: 6,
      title: 'Full Org Rollout & Executive Monitoring',
      focus: 'Promoting all departments to active production status. Establishing continuous audit monitors for high value transactions.',
      tasks: [
        { desc: 'Initiate full production servers migration', complete: false },
        { desc: 'Establish live executive dashboard analytics', complete: false },
        { desc: 'Decommission legacy paper filings', complete: false },
        { desc: 'Publish Q2 operational efficiency reports', complete: false }
      ]
    }
  ];

  const currentWeekData = roadmapData.find(w => w.week === activeWeek) || roadmapData[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-700 select-none">
      
      {/* Sub titles layout details */}
      <div className="bg-white border border-slate-205 p-6 rounded-xl shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">Platform Deployment & Implementation Roadmap</h2>
        <p className="text-xs text-slate-500 mt-1">
          A structures 6-Week playbook detailing configuration checkpoints, active directory imports, staff training dry runs, and pilot launches. Click on any week code below to inspect target milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={CalendarDays}
          value="6 Weeks"
          label="Total Target Duration"
          description="Structured implementation stages"
          variant="indigo"
        />
        <StatCard
          icon={Clock}
          value="Week 1 Launch"
          label="Current Deployment Week"
          description="Infrastructure en-route online"
          variant="amber"
        />
        <StatCard
          icon={Award}
          value="95% Readiness"
          label="Pilot Team SLA Confirmed"
          description="HR & Project groups en-route and trained"
          variant="emerald"
        />
      </div>

      {/* Week selection buttons */}
      <div className="bg-slate-100/60 p-2 border border-slate-200/80 rounded-xl">
        <div className="flex overflow-x-auto gap-2.5 pb-1 scrollbar-thin">
          {roadmapData.map((w) => (
            <button
              key={w.week}
              onClick={() => setActiveWeek(w.week)}
              className={`px-4.5 py-3 text-xs font-bold rounded-lg shrink-0 cursor-pointer transition flex items-center gap-1.5 ${
                activeWeek === w.week
                  ? 'bg-indigo-900 text-white shadow-md font-black'
                  : 'bg-white text-slate-655 hover:text-slate-905 border border-slate-205'
              }`}
            >
              <CircleDot className={`h-3.5 w-3.5 ${activeWeek === w.week ? 'text-indigo-300' : 'text-slate-400'}`} />
              <span>Week {w.week}: {w.title.split('&')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Week Detail highlight Overview (2/3) */}
        {currentWeekData && (
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-indigo-100">
              <CardHeader className="bg-slate-50/50 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase text-indigo-750">Active Week inspect: Phase {currentWeekData.week}</span>
                  <CardTitle className="mt-0.5">{currentWeekData.title}</CardTitle>
                </div>
                <Badge variant={currentWeekData.week === 1 ? 'indigo' : 'gray'}>
                  {currentWeekData.week === 1 ? 'CURRENT STAGE' : 'FUTURE CHECKPOINT'}
                </Badge>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Weekly Agenda Objective</p>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">{currentWeekData.focus}</p>
                </div>

                <div className="space-y-3.5 border-t border-slate-50 pt-4.5">
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Milestones Checklist</h4>
                  
                  <div className="space-y-2">
                    {currentWeekData.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-xs font-semibold">
                        <span className={task.complete ? 'line-through text-slate-400 font-medium' : 'text-slate-800'}>
                          {task.desc}
                        </span>
                        <Badge variant={task.complete ? 'green' : 'gray'}>
                          {task.complete ? 'COMPLETED' : 'PENDING'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Small general training & dry run notes (1/3) */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Continuous Audit Checkpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 font-semibold text-xs leading-relaxed">
              <div className="p-3 bg-slate-50 rounded-lg text-[11px]">
                <p className="font-bold text-slate-800">ISO-27001 Validation Check</p>
                <p className="text-[10px] text-slate-455 mt-1">Conducted on encryption schemas before migrating real ledger codes.</p>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-805 rounded-lg text-[11px] border border-emerald-100">
                <p className="font-bold">Post-Launch Q2 Audit Report</p>
                <p className="text-[10px] text-emerald-700 mt-1">Evaluates average SLA resolution times following deployment.</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
};
export default Roadmap;
