import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CommandCenterProvider } from './context/CommandCenterContext';
import { AppLayout } from './components/layout/AppLayout';

// Lazy loading components to optimize performance and prevent token limit issues
const Home = lazy(() => import('./pages/Home'));
const ExecutiveDashboard = lazy(() => import('./pages/ExecutiveDashboard'));
const ManagerDashboard = lazy(() => import('./pages/ManagerDashboard'));
const StaffWorkspace = lazy(() => import('./pages/StaffWorkspace'));
const HROperations = lazy(() => import('./pages/HROperations'));
const Procurement = lazy(() => import('./pages/Procurement'));
const Projects = lazy(() => import('./pages/Projects'));
const Vendors = lazy(() => import('./pages/Vendors'));
const HSE = lazy(() => import('./pages/HSE'));
const ExecutiveApprovals = lazy(() => import('./pages/ExecutiveApprovals'));
const Meetings = lazy(() => import('./pages/Meetings'));
const Communications = lazy(() => import('./pages/Communications'));
const FormsAndSOPs = lazy(() => import('./pages/FormsAndSOPs'));
const Automations = lazy(() => import('./pages/Automations'));
const Integrations = lazy(() => import('./pages/Integrations'));
const AccessControl = lazy(() => import('./pages/AccessControl'));
const Roadmap = lazy(() => import('./pages/Roadmap'));

// A luxurious full-screen loading micro-indicator
const ScreenSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-indigo-900 select-none">
    <div className="w-10 h-10 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin" />
    <span className="text-xs font-bold uppercase tracking-widest mt-4">Command Center Syncing...</span>
  </div>
);

export default function App() {
  return (
    <CommandCenterProvider>
      <HashRouter>
        <Suspense fallback={<ScreenSpinner />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
              <Route path="/manager-dashboard" element={<ManagerDashboard />} />
              <Route path="/staff-workspace" element={<StaffWorkspace />} />
              <Route path="/hr-operations" element={<HROperations />} />
              <Route path="/procurement" element={<Procurement />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/hse" element={<HSE />} />
              <Route path="/approvals" element={<ExecutiveApprovals />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/communications" element={<Communications />} />
              <Route path="/forms-sops" element={<FormsAndSOPs />} />
              <Route path="/automations" element={<Automations />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/access-control" element={<AccessControl />} />
              <Route path="/roadmap" element={<Roadmap />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </CommandCenterProvider>
  );
}
