import React, { useState } from 'react';
import {
  FileCheck,
  Check,
  X,
  AlertTriangle,
  FileText,
  Bookmark,
  ShieldCheck
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const ExecutiveApprovals: React.FC = () => {
  const {
    executiveApprovals,
    approveExecutiveApproval,
    rejectExecutiveApproval,
    requestInfoExecutiveApproval
  } = useCommandCenter();

  // Selected Item details for Approval confirmation
  const [confirmingApprovalId, setConfirmingApprovalId] = useState<string | null>(null);
  const [confirmStatusAction, setConfirmStatusAction] = useState<'Approve' | 'Reject' | null>(null);

  const handleOpenConfirmation = (id: string, action: 'Approve' | 'Reject') => {
    setConfirmingApprovalId(id);
    setConfirmStatusAction(action);
  };

  const handleExecuteConfirmation = () => {
    if (!confirmingApprovalId || !confirmStatusAction) return;
    
    if (confirmStatusAction === 'Approve') {
      approveExecutiveApproval(confirmingApprovalId);
    } else {
      rejectExecutiveApproval(confirmingApprovalId);
    }

    setConfirmingApprovalId(null);
    setConfirmStatusAction(null);
  };

  const selectedApprovalItem = executiveApprovals.find(e => e.id === confirmingApprovalId);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-700">
      
      {/* Sub title briefs */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">Board & Executive Approvals Pipeline</h2>
        <p className="text-xs text-slate-500 mt-1">
          Strategic decision register for Directors, Auditors, and CEOs. Review board papers, capital write-offs, and critical business joint ventures in continuous pipelines protected by cryptographic audit confirmations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={FileCheck}
          value={executiveApprovals.length}
          label="Total Board Docket Mappings"
          description="Tracked on current cycle"
          variant="indigo"
        />
        <StatCard
          icon={Bookmark}
          value={executiveApprovals.filter(e => e.status === 'Submitted' || e.status === 'Under Review').length}
          label="Awaiting Signatures"
          description="Awaiting C-Suite/MD endorsement"
          variant="amber"
        />
        <StatCard
          icon={ShieldCheck}
          value="Security Active"
          label="Electronic Seal Protocol"
          description="SHA-256 digital validation en-route"
          variant="emerald"
        />
      </div>

      {/* Grid of Approvals card stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {executiveApprovals.map((exe) => (
          <Card key={exe.id} className="hover:border-slate-350 transition">
            <CardHeader className="flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-1.5">
                <FileText className="h-4.5 w-4.5 text-indigo-905" />
                <span className="font-bold text-xs text-slate-800">{exe.boardRef}</span>
              </div>
              <Badge variant={getStatusVariant(exe.status)}>{exe.status}</Badge>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Governance Category</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <h4 className="text-sm font-bold text-slate-900">{exe.category}</h4>
                  <Badge variant={exe.impactLevel === 'Critical' ? 'red' : 'yellow'}>
                    {exe.impactLevel} Impact level
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                {exe.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-[10px] font-semibold text-slate-500 uppercase border-t border-slate-50 pt-3">
                <div>
                  <span>Sponsoring Department:</span>
                  <span className="block font-bold text-slate-805 mt-0.5">{exe.department}</span>
                </div>
                <div>
                  <span>Docket Owner:</span>
                  <span className="block font-bold text-slate-805 mt-0.5">{exe.requester}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase">SLA Limit: {exe.dueDate}</span>
                
                {exe.status === 'Submitted' || exe.status === 'Under Review' || exe.status === 'More Information Needed' ? (
                  <div className="flex items-center gap-2">
                    <Button variant="danger" size="sm" className="font-bold cursor-pointer" onClick={() => handleOpenConfirmation(exe.id, 'Reject')}>
                      Decline
                    </Button>
                    <Button variant="outline" size="sm" className="font-bold cursor-pointer bg-slate-50 text-slate-700 hover:bg-slate-200 border border-slate-300" onClick={() => requestInfoExecutiveApproval(exe.id)}>
                      Revise Info
                    </Button>
                    <Button variant="primary" size="sm" className="bg-indigo-905 bg-indigo-900 text-white font-bold cursor-pointer" onClick={() => handleOpenConfirmation(exe.id, 'Approve')}>
                      Authorize
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 uppercase bg-emerald-50 px-3 py-1 rounded-sm border border-emerald-150">
                    <Check className="h-4 w-4" /> Signature Processed
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cryptographic signature confirmation modal */}
      <Modal
        isOpen={confirmingApprovalId !== null}
        onClose={() => setConfirmingApprovalId(null)}
        title="🔒 Enterprise Signature Authorization Seal"
        footer={(
          <div className="flex justify-end gap-2 text-xs">
            <Button variant="outline" size="sm" onClick={() => setConfirmingApprovalId(null)}>
              Abort Authorization
            </Button>
            <Button
              variant={confirmStatusAction === 'Approve' ? 'primary' : 'danger'}
              size="sm"
              onClick={handleExecuteConfirmation}
            >
              Authorize Seal Sign-off
            </Button>
          </div>
        )}
      >
        {selectedApprovalItem ? (
          <div className="space-y-4 p-1 text-xs leading-relaxed">
            <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 p-4 rounded-lg text-indigo-950 font-semibold selection:text-white">
              <AlertTriangle className="h-5 w-5 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <strong>Verify digital seal authorization:</strong>
                <p className="mt-1 font-medium text-[11px] text-indigo-800 leading-relaxed">
                  You are en-route to {confirmStatusAction === 'Approve' ? 'Approved' : 'Rejected'} docket <strong>{selectedApprovalItem.boardRef}</strong>. Under statutory enterprise governance terms, this action records an immutable digital key containing tenant logs.
                </p>
              </div>
            </div>

            <div className="border border-slate-100 rounded-lg p-3 bg-slate-50 m-0">
              <p className="font-bold text-slate-500 uppercase tracking-widest text-[9px] mb-1">Docket Summary Details</p>
              <p className="font-bold text-slate-900">{selectedApprovalItem.category} - Impact: {selectedApprovalItem.impactLevel}</p>
              <p className="text-[11px] text-slate-455 mt-1 leading-normal italic">"{selectedApprovalItem.description}"</p>
            </div>
            
            <p className="text-[10px] text-slate-400 italic">This signature action will mirror status updates immediately to relevant operational lists.</p>
          </div>
        ) : (
          <p className="text-xs text-slate-500">Document registry loading error.</p>
        )}
      </Modal>

    </div>
  );
};
export default ExecutiveApprovals;
