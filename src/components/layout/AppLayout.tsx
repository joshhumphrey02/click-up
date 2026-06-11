import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useCommandCenter } from '../../context/CommandCenterContext';
import { ROLE_PERMISSIONS, getProfileByRole } from '../../utils/permissions';
import { ShieldAlert, KeyRound, UserCheck, LayoutGrid } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [syncTime, setSyncTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, setRole } = useCommandCenter();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const allowedPaths = ROLE_PERMISSIONS[currentRole] || [];
  const isAllowed = allowedPaths.includes(location.pathname);
  const profile = getProfileByRole(currentRole);

  return (
    <div className="flex bg-[#F4F7F9] text-slate-800 h-screen w-full font-sans antialiased overflow-hidden selection:bg-blue-100 selection:text-blue-900 select-none">
      {/* Real-time Side Navigation Bar */}
      <Sidebar />

      {/* Primary Workspace Panel */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar />
        
        {/* Dynamic Outlet Pages or Access Denied Gating */}
        <div className="flex-1 overflow-y-auto relative bg-[#F4F7F9] p-0">
          {isAllowed ? (
            <Outlet />
          ) : (
            <div className="p-8 min-h-[calc(100vh-8rem)] flex items-center justify-center select-none font-sans">
              <div className="max-w-2xl w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
                {/* Header Band */}
                <div className="bg-[#001F3F] text-white p-6 flex items-center gap-4 border-b border-white/10">
                  <div className="p-3 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30">
                    <ShieldAlert className="h-6 w-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base uppercase tracking-wider">Security Access Intercepted</h3>
                    <p className="text-xs text-blue-300 font-semibold">Level 3 Core Infrastructure Protection Integrity Filter</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                    The active role <strong className="text-slate-900">"{currentRole}"</strong> does not possess the operational credentials required to access the directory <strong className="text-blue-600 font-mono text-xs">{location.pathname}</strong>. Access is restricted under automated governance guidelines.
                  </p>

                  {/* Operational diagnostics table */}
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-slate-500 font-bold uppercase tracking-wider text-[9px] border-b border-slate-200/60 pb-1.5">
                      <span>Operational Diagnostic</span>
                      <span>System Value</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Target System Route</span>
                      <strong className="text-slate-700 font-mono">{location.pathname}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Authorized Personnel</span>
                      <strong className="text-slate-700">{profile.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Assigned Title/Role</span>
                      <strong className="text-slate-700">{profile.title}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Authorization Status</span>
                      <strong className="text-red-600 flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        ACCESS_DENIED_EXCEEDED
                      </strong>
                    </div>
                  </div>

                  {/* Suggest Route button depending on what is allowed */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {allowedPaths.includes('/hr-operations') && (
                      <button
                        onClick={() => navigate('/hr-operations')}
                        className="flex-grow inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-lg transition cursor-pointer"
                      >
                        <UserCheck className="h-4 w-4 shrink-0" />
                        HR Operations
                      </button>
                    )}
                    {allowedPaths.includes('/executive-dashboard') && (
                      <button
                        onClick={() => navigate('/executive-dashboard')}
                        className="flex-grow inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-lg transition cursor-pointer"
                      >
                        <LayoutGrid className="h-4 w-4 shrink-0" />
                        Reporting Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => navigate('/')}
                      className="flex-grow inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold rounded-lg transition cursor-pointer"
                    >
                      Proposal Overview
                    </button>

                    <button
                      onClick={() => setRole('Executive Management')}
                      className="flex-grow inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#7C3AED] hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition shadow-md cursor-pointer"
                    >
                      <KeyRound className="h-4 w-4 shrink-0" />
                      Elevate to Executive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* IMMERSIVE STATUS BAR */}
        <footer className="h-10 bg-slate-800 text-white/60 px-8 flex items-center justify-between text-[10px] font-semibold shrink-0 select-none border-t border-slate-705/50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Operational Integrity: 99.9%</span>
            </div>
            <span>System Status: Optimal</span>
            <span className="text-blue-400 font-bold">Active Users: 124</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="uppercase tracking-wider font-bold text-slate-400">v1.2.4-Enterprise Blueprint</span>
            <span className="text-white/30">|</span>
            <span className="font-mono text-blue-300">Last Sync: {syncTime || 'Syncing...'}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default AppLayout;
