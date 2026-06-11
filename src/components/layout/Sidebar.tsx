import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Briefcase,
  UserCheck,
  Users,
  ShoppingCart,
  Layers,
  Truck,
  ShieldAlert,
  FileCheck,
  Video,
  MessageSquare,
  FileText,
  Cpu,
  Link2,
  Lock,
  Milestone,
  BrainCircuit
} from 'lucide-react';
import { useCommandCenter } from '../../context/CommandCenterContext';
import { ROLE_PERMISSIONS, getProfileByRole } from '../../utils/permissions';

interface SidebarProps {
  id?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ id }) => {
  const { currentRole } = useCommandCenter();

  const navGroups = [
    {
      title: 'Operational Systems',
      items: [
        { to: '/', icon: Home, label: 'Overview' },
        { to: '/executive-dashboard', icon: LayoutDashboard, label: 'Executive Dashboard' },
        { to: '/manager-dashboard', icon: Briefcase, label: 'Manager Dashboard' },
        { to: '/staff-workspace', icon: UserCheck, label: 'Staff Workspace' },
        { to: '/hr-operations', icon: Users, label: 'HR Operations' },
        { to: '/procurement', icon: ShoppingCart, label: 'Procurement' },
        { to: '/projects', icon: Layers, label: 'Projects' },
        { to: '/vendors', icon: Truck, label: 'Vendors' },
        { to: '/hse', icon: ShieldAlert, label: 'HSE Monitoring' },
      ],
    },
    {
      title: 'Management',
      items: [
        { to: '/approvals', icon: FileCheck, label: 'Executive Approvals' },
        { to: '/meetings', icon: Video, label: 'Virtual Meetings' },
        { to: '/communications', icon: MessageSquare, label: 'Internal Comms' },
        { to: '/forms-sops', icon: FileText, label: 'Forms & SOPs' },
      ],
    },
    {
      title: 'System',
      items: [
        { to: '/automations', icon: Cpu, label: 'Automations' },
        { to: '/integrations', icon: Link2, label: 'Integrations' },
        { to: '/access-control', icon: Lock, label: 'Access Control' },
        { to: '/roadmap', icon: Milestone, label: 'Roadmap' },
      ],
    },
  ];

  // Filter navigation items by active role permissions
  const allowedPaths = ROLE_PERMISSIONS[currentRole] || [];
  const filteredNavGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => allowedPaths.includes(item.to)),
    }))
    .filter((group) => group.items.length > 0);

  const profile = getProfileByRole(currentRole);

  return (
    <aside
      id={id}
      className="w-60 bg-[#001F3F] text-white border-r border-white/10 flex flex-col shrink-0 min-h-screen font-sans"
    >
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <span className="font-bold text-sm leading-tight text-white tracking-wide">
          COMMAND<br />
          <span className="text-blue-300">CENTER</span>
        </span>
      </div>

      {/* Role Indicator Widget Restyled for Immersive Theme */}
      <div className="px-4 py-3 mx-4 mt-4 bg-black/20 border border-white/10 rounded-lg">
        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Active Workspace</p>
        <p className="text-xs text-blue-300 font-bold truncate mt-1">{currentRole}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Enterprise Tenant</span>
        </div>
      </div>

      {/* Navigation Space */}
      <nav className="flex-grow mt-4 overflow-y-auto pb-10 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent">
        {filteredNavGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-4">
            <div className="px-6 py-2 text-white/40 text-[9px] uppercase tracking-wider font-semibold">
              {group.title}
            </div>
            <div className="space-y-0.5 mt-1">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-6 py-2.5 text-[11px] uppercase tracking-wider font-bold transition-all border-r-4 ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-300 border-blue-400'
                          : 'hover:bg-white/5 text-white/70 hover:text-white border-transparent'
                      }`
                    }
                  >
                    <IconComponent className="h-4 w-4 shrink-0 opacity-80" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Decorative Brand Tag */}
      <div className="p-6 border-t border-white/10 bg-black/20 text-center">
        <div className="flex items-center gap-3 justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center font-bold text-xs text-white">
            {profile.initials}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white leading-none mb-1">{profile.name}</p>
            <p className="text-[10px] text-blue-300 font-semibold leading-none">{profile.title}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
