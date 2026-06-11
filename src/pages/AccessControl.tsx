import React, { useState } from 'react';
import {
  Lock,
  User,
  ShieldCheck,
  CheckCircle,
  XCircle,
  HelpCircle,
  Activity
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';

export const AccessControl: React.FC = () => {
  // Selected role for interactive highlight
  const [selectedRole, setSelectedRole] = useState<'CEO' | 'HOD' | 'Manager' | 'Staff' | 'Vendor'>('CEO');

  const rolesDetails = {
    CEO: {
      name: 'CEO / Executive / MD',
      desc: 'Central command authority. Grants high-value capital sign-offs, audits critical HSE incidents, and monitors corporate operations KPIs.',
      permissions: [
        { name: 'Full tenant admin settings', allowed: true },
        { name: 'Approve Tier 3 PO (Above ₦10M)', allowed: true },
        { name: 'Authorize board papers & joint ventures', allowed: true },
        { name: 'Manage own staff tasks', allowed: true },
        { name: 'Write task comments', allowed: true },
        { name: 'Access external vendor portal only', allowed: false }
      ]
    },
    HOD: {
      name: 'Department Head (HOD)',
      desc: 'Controls department resource allocations, validates task backlogs, manages unit staff capacity maps, and signs Tier 2 procurement orders (Up to ₦10M).',
      permissions: [
        { name: 'Full tenant admin settings', allowed: false },
        { name: 'Approve Tier 3 PO (Above ₦10M)', allowed: false },
        { name: 'Authorize board papers & joint ventures', allowed: false },
        { name: 'Manage own staff tasks', allowed: true },
        { name: 'Write task comments', allowed: true },
        { name: 'Access external vendor portal only', allowed: false }
      ]
    },
    Manager: {
      name: 'Senior Staff / Manager',
      desc: 'Assigns daily work to staff, schedules weekly virtual review sessions, coordinates projects execution, and tracks local HSE corrective actions.',
      permissions: [
        { name: 'Full tenant admin settings', allowed: false },
        { name: 'Approve Tier 3 PO (Above ₦10M)', allowed: false },
        { name: 'Authorize board papers & joint ventures', allowed: false },
        { name: 'Manage own staff tasks', allowed: true },
        { name: 'Write task comments', allowed: true },
        { name: 'Access external vendor portal only', allowed: false }
      ]
    },
    Staff: {
      name: 'General Operational Staff',
      desc: 'Executes daily task tickets, logs comments, files purchase requisitions, and registers HSE hazards. Locked out of strategic dashboards.',
      permissions: [
        { name: 'Full tenant admin settings', allowed: false },
        { name: 'Approve Tier 3 PO (Above ₦10M)', allowed: false },
        { name: 'Authorize board papers & joint ventures', allowed: false },
        { name: 'Manage own staff tasks', allowed: false },
        { name: 'Write task comments', allowed: true },
        { name: 'Access external vendor portal only', allowed: false }
      ]
    },
    Vendor: {
      name: 'Vendor / External Partner Guest',
      desc: 'Isolated tenant access. Allowed to upload CAC verification certificates, verify ratings scorecard, and file payment invoice disputes.',
      permissions: [
        { name: 'Full tenant admin settings', allowed: false },
        { name: 'Approve Tier 3 PO (Above ₦10M)', allowed: false },
        { name: 'Authorize board papers & joint ventures', allowed: false },
        { name: 'Manage own staff tasks', allowed: false },
        { name: 'Write task comments', allowed: false },
        { name: 'Access external vendor portal only', allowed: true }
      ]
    }
  };

  const activeRole = rolesDetails[selectedRole];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-700 select-none">
      
      {/* Sub titles layout details */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">Permissions & Role-Based Access Control (RBAC)</h2>
        <p className="text-xs text-slate-500 mt-1">
          Secure operations by restricting views, approvals, and data creation. Highlight any corporate role below to audit their workspace privileges instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Lock}
          value="6 Default Roles"
          label="Pre-Configured Roles"
          description="Aligned with standard enterprise hierarchy"
          variant="indigo"
        />
        <StatCard
          icon={ShieldCheck}
          value="ISO 27001 Checked"
          label="Snoop-Proof Isolation"
          description="Failsafe permission matrix locks"
          variant="emerald"
        />
        <StatCard
          icon={Activity}
          value="Enabled"
          label="Continuous Audit Logs"
          description="Every signature & transition cataloged"
          variant="fuchsia"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Role Picker List (1/3) */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Workspace Roles</h3>
          
          <div className="space-y-2.5">
            {[
              { key: 'CEO', label: 'CEO / Executive / MD' },
              { key: 'HOD', label: 'Department Head (HOD)' },
              { key: 'Manager', label: 'Senior Staff / Manager' },
              { key: 'Staff', label: 'General Operational Staff' },
              { key: 'Vendor', label: 'Vendor / External Partner' }
            ].map((role) => (
              <button
                key={role.key}
                onClick={() => setSelectedRole(role.key as any)}
                className={`w-full text-left p-3.5 border rounded-lg text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  selectedRole === role.key
                    ? 'border-indigo-900 bg-indigo-50/40 text-indigo-950 font-black'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{role.label}</span>
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Permissions privileges Checklist (2/3) */}
        {activeRole && (
          <Card className="lg:col-span-2">
            <CardHeader className="bg-slate-50/50">
              <div>
                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Auditing Privileges Matrix</span>
                <CardTitle className="mt-0.5">{activeRole.name}</CardTitle>
              </div>
              <Badge variant="indigo">Compliance Active</Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="bg-white border select-none border-slate-200/80 p-4 rounded-lg">
                <p className="text-[10px] uppercase font-bold text-slate-400">Role Purpose & Description</p>
                <p className="text-xs text-slate-655 mt-1 leading-relaxed font-semibold">{activeRole.desc}</p>
              </div>

              <div className="space-y-3.5">
                <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                  Privileges Checklist
                </h4>

                <div className="space-y-2.5">
                  {activeRole.permissions.map((perm, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 border rounded-lg text-xs font-bold ${
                        perm.allowed ? 'bg-emerald-50/20 border-emerald-100' : 'bg-slate-100/40 border-slate-200 text-slate-400'
                      }`}
                    >
                      <span>{perm.name}</span>
                      <div className="flex items-center gap-1.5 font-bold uppercase text-[10px]">
                        {perm.allowed ? (
                          <span className="text-emerald-700 flex items-center gap-1"><CheckCircle className="h-4 w-4 shrink-0" /> ALLOWED</span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1"><XCircle className="h-4 w-4 shrink-0" /> RESTRICTED</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        )}

      </div>

    </div>
  );
};
export default AccessControl;
