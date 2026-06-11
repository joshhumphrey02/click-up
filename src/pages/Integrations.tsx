import React from 'react';
import {
  Link2,
  CheckCircle2,
  ArrowRight,
  Database,
  Workflow,
  Settings,
  GitPullRequest
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';

export const Integrations: React.FC = () => {

  const apps = [
    { name: 'Google Workspace', purpose: 'Auto syncing agenda, Gmail dockets logs and Sheets tables', status: 'Connected', badge: 'green', desc: 'Flows calendar schedules to/from virtual meetings module.' },
    { name: 'Microsoft 365', purpose: 'Excel tables and Outlook dockets syncs', status: 'Optional', badge: 'gray', desc: 'Synchronizes active task logs with enterprise directory rails.' },
    { name: 'Zapier & Make', purpose: 'Custom API backplanes linkages', status: 'Connected', badge: 'green', desc: 'Triggers external webhooks when critical events log on matrix.' },
    { name: 'Slack', purpose: 'Automated channel notifications', status: 'Connected', badge: 'green', desc: 'Fires instant updates on HOD channels upon approvals.' },
    { name: 'ERP / SAP Accounting', purpose: 'Purchase ledger and statutory balance verification', status: 'Pending', badge: 'orange', desc: 'Locks PR cost codes directly against active SAP budgets.' },
    { name: 'HRIS Payroll Systems', purpose: 'Candidate directory syncing on offer confirmation', status: 'Connected', badge: 'green', desc: 'Auto creates employee numbers inside local corporate LDAP.' },
    { name: 'Zoom & Teams', purpose: 'Generates online session meeting IDs automatically', status: 'Connected', badge: 'green', desc: 'Appends calendar link directly on Meeting agendas.' },
    { name: 'WhatsApp Business API', purpose: 'Dispatches urgent HSE risk warning logs to directors', status: 'Connected', badge: 'green', desc: 'SMS backup pipelines secured via Twilio routers.' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-700">
      
      {/* Sub titles layout details */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">Connected Enterprise Integrations Ecosystem</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review connected third-party SaaS systems, custom database connectors, message queues, and API gateways. Real-time data streams unify operations cross Microsoft, Google, ERP and ClickUp APIs.
        </p>
      </div>

      {/* Visual SVG Data Flow diagram */}
      <Card className="border border-indigo-200/50 bg-slate-50/50">
        <CardHeader className="bg-white border-b border-slate-200">
          <CardTitle>Continuous Operations Data Flow Architecture</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 py-8 text-center text-xs font-bold leading-normal">
            
            <div className="bg-white border-2 border-indigo-900 text-indigo-950 px-4 py-3 rounded-lg w-44 shadow-xs">
              <p className="text-[10px] uppercase font-bold text-slate-400">Trigger Entry</p>
              <h4 className="mt-1">Digitized Forms</h4>
              <p className="text-[9px] text-slate-450 mt-1 font-medium font-medium leading-tight">Staff submit PR or HSE reports</p>
            </div>

            <ArrowRight className="h-5 w-5 text-indigo-400 rotate-90 lg:rotate-0" />

            <div className="bg-white border-2 border-indigo-900 text-indigo-950 px-4 py-3 rounded-lg w-44 shadow-xs">
              <p className="text-[10px] uppercase font-bold text-slate-400">Action Generator</p>
              <h4 className="mt-1">ClickUp Tasks</h4>
              <p className="text-[9px] text-slate-450 mt-1 font-medium font-medium leading-tight">Auto-assigned with SLA limit trackers</p>
            </div>

            <ArrowRight className="h-5 w-5 text-indigo-400 rotate-90 lg:rotate-0" />

            <div className="bg-white border-2 border-indigo-900 text-indigo-950 px-4 py-3 rounded-lg w-44 shadow-xs">
              <p className="text-[10px] uppercase font-bold text-slate-400">Rule Processor</p>
              <h4 className="mt-1">Automations</h4>
              <p className="text-[9px] text-slate-450 mt-1 font-medium font-medium leading-tight">Threshold & path evaluation rules</p>
            </div>

            <ArrowRight className="h-5 w-5 text-indigo-400 rotate-90 lg:rotate-0" />

            <div className="bg-white border-2 border-indigo-900 text-indigo-950 px-4 py-3 rounded-lg w-44 shadow-xs">
              <p className="text-[10px] uppercase font-bold text-slate-400">Governance Gateway</p>
              <h4 className="mt-1">Executive approvals</h4>
              <p className="text-[9px] text-slate-450 mt-1 font-medium font-medium leading-tight">immutable Board dockets signatures</p>
            </div>

            <ArrowRight className="h-5 w-5 text-indigo-400 rotate-90 lg:rotate-0" />

            <div className="bg-white border-2 border-emerald-600 text-emerald-800 px-4 py-3 rounded-lg w-44 shadow-xs border-dashed">
              <p className="text-[10px] uppercase font-bold text-emerald-600">Unified Output</p>
              <h4 className="mt-1">Live Notifications</h4>
              <p className="text-[9px] text-slate-450 mt-1 font-medium font-medium leading-tight">Dispatched SMS logs & email reports</p>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Grid of Apps */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Integrations Register</h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, idx) => (
            <Card key={idx} className="hover:-translate-y-0.5 hover:border-slate-350 transition select-none">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="p-1.5 bg-slate-100 rounded-lg text-slate-700 font-bold text-xs flex items-center gap-1">
                      <Link2 className="h-3.5 w-3.5" /> APP
                    </span>
                    <Badge variant={app.status === 'Connected' ? 'green' : app.status === 'Pending' ? 'orange' : 'gray'}>
                      {app.status}
                    </Badge>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-normal">{app.name}</h4>
                  <p className="text-[10px] text-indigo-750 font-bold mt-1 max-w-[200px] leading-tight break-words">{app.purpose}</p>
                  <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed mt-3.5">{app.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
export default Integrations;
