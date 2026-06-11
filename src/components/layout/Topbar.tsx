import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, ShieldCheck, ChevronDown, User, CheckCircle, Trash } from 'lucide-react';
import { useCommandCenter } from '../../context/CommandCenterContext';
import { UserRole } from '../../types';

interface TopbarProps {
  id?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ id }) => {
  const {
    currentRole,
    setRole,
    notificationsList,
    clearNotifications,
    activeNotification,
    setActiveNotification
  } = useCommandCenter();

  const [notifOpen, setNotifOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Find readable page title from current router path
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/': return 'Proposal Overview';
      case '/architecture': return 'Workspace Architecture';
      case '/executive-dashboard': return 'Dashboards & Reporting';
      case '/hr-operations': return 'HR Operations';
      case '/procurement': return 'Procurement Workflow';
      case '/projects': return 'Project Execution Tracker';
      case '/vendors': return 'Vendor Management Portal';
      case '/hse': return 'HSE Monitoring';
      case '/approvals': return 'Executive Approval Centre';
      case '/meetings': return 'Virtual Meeting Management';
      case '/communications': return 'Interdepartmental Communication';
      case '/forms-sops': return 'SOP Digitization';
      case '/automations': return 'Workflow Automations';
      case '/training': return 'User Training & Change Management';
      case '/roadmap': return 'Implementation Timeline';
      default: return 'Command Center';
    }
  };

  const roles: UserRole[] = [
    'Executive Management',
    'Department Manager',
    'End User',
    'Vendor Guest',
    'System Administrator'
  ];

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    setRoleOpen(false);
  };

  const unreadNotifsCount = notificationsList.filter(n => !n.read).length;

  return (
    <header
      id={id}
      className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40"
    >
      {/* Left Title Space */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-slate-850 tracking-tight">{getPageTitle()}</h2>
        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase tracking-wide">
          Presentation Mode
        </span>
      </div>

      {/* Middle Search Input */}
      <div className="hidden md:flex items-center relative w-64">
        <Search className="h-4 w-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Global workspace search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-xs placeholder:text-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {searchQuery && (
          <span className="absolute right-3 bg-blue-100 text-[10px] text-blue-800 font-semibold px-2 py-0.5 rounded-full">
            Filtered
          </span>
        )}
      </div>

      {/* Right Notifications, Badges and Switcher */}
      <div className="flex items-center gap-4">
        {/* Active Notification Banner Toast */}
        {activeNotification && (
          <div className="hidden lg:flex items-center gap-2 bg-slate-905 text-white bg-slate-800 text-xs py-1.5 px-3.5 rounded-lg animate-fade-in shadow-lg border border-slate-700">
            <CheckCircle className="h-3.5 w-3.5 text-blue-400" />
            <span className="font-semibold truncate max-w-xs">{activeNotification}</span>
            <button
              onClick={() => setActiveNotification(null)}
              className="ml-1 text-slate-300 hover:text-white transition-colors font-semibold"
            >
              ×
            </button>
          </div>
        )}

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setRoleOpen(false); }}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">{unreadNotifsCount}</span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 text-slate-700 z-50">
              <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">Command Incidents ({notificationsList.length})</span>
                {notificationsList.length > 0 && (
                  <button
                    onClick={() => clearNotifications()}
                    className="text-[10px] text-rose-650 hover:text-rose-700 font-semibold flex items-center gap-1"
                  >
                    <Trash className="h-3 w-3" /> Clear
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notificationsList.length === 0 ? (
                  <p className="p-4 text-xs text-center text-slate-405 italic">No events logged</p>
                ) : (
                  notificationsList.map((n) => (
                    <div key={n.id} className={`p-4 border-b border-slate-50 text-xs transition hover:bg-slate-50 ${!n.read ? 'bg-blue-50/20' : ''}`}>
                      <p className="font-medium text-slate-900 leading-tight">{n.text}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200"></div>

        {/* Role Switcher Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setRoleOpen(!roleOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer text-xs font-semibold hover:bg-slate-100 transition"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-xs text-slate-750">Role: {currentRole}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          </button>

          {roleOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 text-slate-700 z-50 animate-dropdown-fade">
              <div className="px-4 py-2 border-b border-slate-100 text-[10px] text-slate-400 uppercase tracking-widest font-bold bg-slate-50">
                Simulate Role View
              </div>
              <div className="p-1 space-y-0.5">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                      currentRole === r
                        ? 'bg-blue-50 text-blue-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>{r}</span>
                    {currentRole === r && (
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Topbar;
