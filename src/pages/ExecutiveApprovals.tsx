import React, { useState } from 'react';
import { toast as sonnerToast } from 'sonner';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Bookmark,
  ShieldCheck,
  Award,
  Download,
  Info,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface ExecutiveApprovalDocket {
  id: string; // Reference Code
  dateSubmitted: string;
  requestName: string;
  category: 'Procurement' | 'HSE' | 'Project Change Orders' | 'Corporate Policies';
  requester: string;
  department: string;
  amount: number | 'N/A - Non-Financial Policy';
  impactAssessment: string;
  status: 'Pending Executive Review' | 'Approved' | 'Rejected' | 'Action Required / Escalated';
  evidenceBadge: string;
  dueDate: string;
  description: string;
}

export const ExecutiveApprovals: React.FC = () => {
  const [dockets, setDockets] = useState<ExecutiveApprovalDocket[]>([
    {
      id: 'EXE-CO-201',
      dateSubmitted: '2026-06-10',
      requestName: 'HSE Heavy Machinery Safety Compliance Audit Authorization',
      category: 'HSE',
      requester: 'Maryam Bello',
      department: 'HSE - Health Safety Environment',
      amount: 'N/A - Non-Financial Policy',
      impactAssessment: 'High - Neglecting this audit will lead to a statutory state penalty and potential equipment shutdown.',
      status: 'Pending Executive Review',
      evidenceBadge: 'HSE_Mechanical_Audit_Brief.pdf',
      dueDate: '2026-06-15',
      description: 'Annual mandatory audit authorization of heavy site earth-boring cranes operational safety under statutory guidelines.'
    },
    {
      id: 'EXE-PR-502',
      dateSubmitted: '2026-06-08',
      requestName: 'Emergency Capital Spend: Eko Substation Piling Excavation Base Overrun',
      category: 'Procurement',
      requester: 'Amadi Kalu',
      department: 'Infrastructure & Projects',
      amount: 14500000,
      impactAssessment: 'Critical - Overrun base concrete foundational block requires instant allocation to prevent site collapse.',
      status: 'Pending Executive Review',
      evidenceBadge: 'Piling_Overrun_Invoice_PH4.pdf',
      dueDate: '2026-06-18',
      description: 'Extraordinary structural contingency requisition for 15 additional concrete cement trucks to reinforce shifting bedrock soils.'
    },
    {
      id: 'EXE-PC-89',
      dateSubmitted: '2026-06-12',
      requestName: 'Change Order Request #4: Kaduna Dredging SLA Terms Revision',
      category: 'Project Change Orders',
      requester: 'Chinedu Nwosu',
      department: 'Procurement',
      amount: 2500000,
      impactAssessment: 'Medium - Swapping marine haulage sub-vendors ensures faster timeline but raises budget by ₦2.5M.',
      status: 'Action Required / Escalated',
      evidenceBadge: 'Kaduna_Dredging_Contract_V3.pdf',
      dueDate: '2026-06-25',
      description: 'Amendment application to alter marine dredging subcontract SLA response thresholds from 48h to 24h immediate standby.'
    },
    {
      id: 'EXE-HR-12',
      dateSubmitted: '2026-06-02',
      requestName: 'Group Health and Life Insurance Scheme Selection Revision',
      category: 'Corporate Policies',
      requester: 'Ada Okafor',
      department: 'HR Operations',
      amount: 'N/A - Non-Financial Policy',
      impactAssessment: 'High - Affects employee retention metrics and satisfies corporate welfare liability obligations.',
      status: 'Approved',
      evidenceBadge: 'Welfare_Insurance_Proposal_2026.pdf',
      dueDate: '2026-06-10',
      description: 'Statutory approval requested for transitioning group medical coverage from existing HMO broker to standard comprehensive cover.'
    }
  ]);

  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [confirmType, setConfirmType] = useState<'Approve' | 'Reject' | 'RequestInfo' | null>(null);
  const showToast = (msg: string) => {
    if (msg.toLowerCase().includes('declined') || msg.toLowerCase().includes('rejected') || msg.toLowerCase().includes('error')) {
      sonnerToast.error(msg);
    } else if (msg.toLowerCase().includes('request') || msg.toLowerCase().includes('escalated')) {
      sonnerToast.warning(msg);
    } else {
      sonnerToast.success(msg);
    }
  };

  const handleOpenAction = (id: string, action: 'Approve' | 'Reject' | 'RequestInfo') => {
    setConfirmId(id);
    setConfirmType(action);
  };

  const executeAction = () => {
    if (!confirmId || !confirmType) return;

    setDockets(prev => prev.map(dock => {
      if (dock.id === confirmId) {
        let resultStatus = dock.status;
        if (confirmType === 'Approve') {
          resultStatus = 'Approved';
          showToast(`Docket ${dock.id} verified with Board level cryptographic signature! Status: APPROVED.`);
        } else if (confirmType === 'Reject') {
          resultStatus = 'Rejected';
          showToast(`Docket ${dock.id} DECLINED and returned to sponsoring department! Status: REJECTED.`);
        } else if (confirmType === 'RequestInfo') {
          resultStatus = 'Action Required / Escalated';
          showToast(`Information Request initialized for docket ${dock.id}. Escalated to department lead.`);
        }

        return { ...dock, status: resultStatus };
      }
      return dock;
    }));

    setConfirmId(null);
    setConfirmType(null);
  };

  const activeReviewItem = dockets.find(d => d.id === confirmId);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Toast notifications processed by sonner */}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-[#7C3AED] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ATMA Space: EXECUTIVE-DECISIONS
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">Executive Approval Centre</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Authorize structural changes, high-value procurement requisitions, emergency safety checklists, and corporate policies.
          </p>
        </div>
        <div className="text-[11px] font-bold text-[#7C3AED] bg-purple-50 border border-purple-200 p-3 rounded-xl flex items-center gap-2">
          <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
          <span>Governance Override Active: Digital Cryptographic Seals Engaged.</span>
        </div>
      </div>

      {/* Top dashboard panels */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FileCheck2}
          value={`${dockets.length} Dockets`}
          label="Governance Docket Queue"
          description="In Q2 strategic checklist fold"
          variant="indigo"
        />
        <StatCard
          icon={Bookmark}
          value={`${dockets.filter(d => d.status === 'Pending Executive Review').length} Pending`}
          label="Awaiting C-Suite Sign-off"
          description="High impact files requiring review"
          variant="amber"
        />
        <StatCard
          icon={CheckCircle2}
          value={`${dockets.filter(d => d.status === 'Approved').length} Authorizations`}
          label="Immutable Seals Signed"
          description="Dispatched to operations ledger"
          variant="emerald"
        />
        <StatCard
          icon={AlertTriangle}
          value={`${dockets.filter(d => d.status === 'Action Required / Escalated').length} Flagged`}
          label="Information Actions Open"
          description="Awaiting department responses"
          variant="rose"
        />
      </div>

      {/* Grid of Executive Approval Queue list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dockets.map((dock) => (
          <Card key={dock.id} className="bg-white border border-slate-205 hover:border-purple-300 transition duration-150 flex flex-col justify-between">
            <div>
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-4.5 w-4.5 text-[#7C3AED]" />
                  <span className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">{dock.id}</span>
                </div>
                <Badge variant={
                  dock.status === 'Approved' ? 'green' :
                  dock.status === 'Rejected' ? 'red' :
                  dock.status === 'Pending Executive Review' ? 'amber' : 'indigo'
                }>
                  {dock.status}
                </Badge>
              </CardHeader>
              
              <CardContent className="p-5 space-y-4 font-bold text-xs">
                
                {/* Request Name and Category */}
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Docket Category: {dock.category}</span>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{dock.requestName}</h4>
                  <p className="text-[11px] text-slate-505 font-semibold leading-relaxed mt-1">{dock.description}</p>
                </div>

                {/* Audit Fields */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-3 text-[10px] font-bold uppercase text-slate-505">
                  <div>
                    <span className="text-[9px] text-slate-400 font-extrabold">Date Submitted</span>
                    <p className="text-slate-800 mt-0.5">{dock.dateSubmitted}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-extrabold">Amount Requested</span>
                    <p className="text-slate-900 mt-0.5">
                      {typeof dock.amount === 'number' ? `₦${dock.amount.toLocaleString()}` : dock.amount}
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-extrabold">Sponsoring HOD</span>
                    <p className="text-indigo-750 mt-0.5 truncate max-w-[150px]">{dock.requester}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-extrabold">Department Source</span>
                    <p className="text-slate-800 mt-0.5 truncate max-w-[150px]">{dock.department}</p>
                  </div>
                </div>

                {/* Impact / Risk Assessment */}
                <div className="p-3.5 rounded-xl border border-rose-250 bg-rose-50/10 text-rose-800 text-[11px] leading-relaxed font-semibold">
                  <span className="text-[9px] font-bold text-rose-600 block uppercase mb-1">Impact & Risk Assessment:</span>
                  {dock.impactAssessment}
                </div>

                {/* Supporting Document attachment badge */}
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="text-[10px] text-slate-600 truncate max-w-[180px]">{dock.evidenceBadge}</span>
                  </div>
                  <button 
                    onClick={() => showToast(`Downloading supporting board paper ${dock.evidenceBadge}...`)}
                    className="p-1 text-slate-500 hover:text-slate-905 cursor-pointer flex items-center gap-1 text-[9px] uppercase font-black"
                  >
                    <Download className="h-3 w-3" /> Get Doc
                  </button>
                </div>

              </CardContent>
            </div>

            {/* Action buttons footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider font-extrabold select-none bg-slate-50/50 rounded-b-2xl">
              <span>Limit: {dock.dueDate}</span>
              {dock.status === 'Pending Executive Review' || dock.status === 'Action Required / Escalated' ? (
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenAction(dock.id, 'Reject')}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded cursor-pointer transition shadow-xs text-[10px] uppercase tracking-wide"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleOpenAction(dock.id, 'RequestInfo')}
                    className="px-3 py-1.5 border border-slate-350 bg-white text-slate-700 font-bold rounded cursor-pointer hover:bg-slate-100 transition shadow-xs text-[10px] uppercase tracking-wide"
                  >
                    Request Info
                  </button>
                  <button 
                    onClick={() => handleOpenAction(dock.id, 'Approve')}
                    className="px-3 py-1.5 bg-[#7C3AED] hover:bg-purple-700 text-white font-bold rounded cursor-pointer transition shadow-xs text-[10px] uppercase tracking-wide"
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded inline-flex items-center gap-1 font-bold">
                  ✓ SECURE SEAL SIGNED
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* CRYPTOGRAPHIC SIGNATURE OPT-IN DIALOG */}
      {confirmId && confirmType && activeReviewItem && (
        <Modal isOpen={true} onClose={() => setConfirmId(null)} title="🔒 Cryptographic Signatures Authorization Seal">
          <div className="space-y-4 font-bold text-xs text-slate-700 leading-normal">
            
            <div className="flex gap-2.5 bg-[#7C3AED]/5 border border-purple-200 p-4 rounded-xl text-indigo-950">
              <ShieldCheck className="h-6 w-6 text-[#7C3AED] shrink-0 mt-0.5" />
              <div>
                <strong>Verify digital governance stamp request:</strong>
                <p className="text-[10px] text-slate-555 font-semibold mt-1">
                  You are en-route to marking docket <strong className="text-slate-900 font-extrabold">{activeReviewItem.id}</strong> as <strong className="text-slate-900">{confirmType === 'Approve' ? 'APPROVED' : confirmType === 'Reject' ? 'REJECTED' : 'INFO REQUEST'}</strong>. This action signs the official ATMA Board file.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-3 rounded-lg text-[10px] font-bold">
              <p className="text-slate-400 uppercase tracking-widest text-[9px] mb-1">Target Document Details</p>
              <p className="text-slate-900 truncate max-w-[400px]">{activeReviewItem.requestName}</p>
              <p className="text-[#7C3AED] mt-1 font-extrabold font-black uppercase">Reference ID: {activeReviewItem.id} | Limit: {activeReviewItem.dueDate}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-50">
              <Button variant="outline" size="sm" type="button" onClick={() => setConfirmId(null)}>
                Abort
              </Button>
              <Button 
                variant={confirmType === 'Approve' ? 'primary' : confirmType === 'Reject' ? 'danger' : 'outline'} 
                size="sm" 
                onClick={executeAction}
                className="cursor-pointer font-bold"
              >
                Sign & Authorize Seal
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};

export default ExecutiveApprovals;
