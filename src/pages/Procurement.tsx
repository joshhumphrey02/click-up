import React, { useState } from 'react';
import {
  ShoppingCart,
  DollarSign,
  Briefcase,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  TrendingDown,
  ArrowRight,
  Search,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Bookmark,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface PurchaseRequestInfo {
  id: string;
  item: string;
  requester: string;
  department: string;
  amount: number;
  vendor: string;
  approvalLevel: 'Tier 1' | 'Tier 2' | 'Tier 3';
  status: 'Draft' | 'Submitted' | 'Procurement Review' | 'RFQ Sent' | 'Vendor Selected' | 'Finance Approval' | 'Executive Approval' | 'PO Created' | 'Payment Pending' | 'Completed' | 'Rejected';
  currentApprover: string;
  dueDate: string;
  escalated: boolean;
  notes: string;
}

export const Procurement: React.FC = () => {
  // Mock data representing the 11 statuses and specified columns
  const [requests, setRequests] = useState<PurchaseRequestInfo[]>([
    {
      id: 'REQ-401',
      item: 'Enterprise Network Router & Switch Rack',
      requester: 'Amara Okonkwo',
      department: 'IT',
      amount: 850000,
      vendor: 'Kaduna Tech Fulfillments',
      approvalLevel: 'Tier 1',
      status: 'Submitted',
      currentApprover: 'Procurement Manager',
      dueDate: '2026-06-18',
      escalated: false,
      notes: 'Required for core routing backbone project installation.'
    },
    {
      id: 'REQ-402',
      item: 'Reinforced Site Concrete (20 Tons)',
      requester: 'Chinedu Nwosu',
      department: 'Projects',
      amount: 3200000,
      vendor: 'Dangote Cement Distributors',
      approvalLevel: 'Tier 2',
      status: 'Procurement Review',
      currentApprover: 'Finance Director',
      dueDate: '2026-06-22',
      escalated: false,
      notes: 'Material requisition for Port Harcourt station expansion foundation.'
    },
    {
      id: 'REQ-403',
      item: 'High-Scale Safety Audits Consultancy',
      requester: 'Ada Okafor',
      department: 'HSE',
      amount: 14500000,
      vendor: 'Thorne Compliance Partners',
      approvalLevel: 'Tier 3',
      status: 'Executive Approval',
      currentApprover: 'Chief Executive Officer',
      dueDate: '2026-06-15',
      escalated: true,
      notes: 'Statutory HSE Audit contract. High-value requires Executive Command Board sign-off.'
    },
    {
      id: 'REQ-404',
      item: 'Spare Electrical Transformers',
      requester: 'Tunde Balogun',
      department: 'Operations',
      amount: 1200000,
      vendor: 'Schneider Electric West Africa',
      approvalLevel: 'Tier 2',
      status: 'RFQ Sent',
      currentApprover: 'Procurement Manager',
      dueDate: '2026-06-25',
      escalated: false,
      notes: 'Substation spare replacement elements.'
    },
    {
      id: 'REQ-405',
      item: 'Office Supplies Bulk Intake',
      requester: 'Zainab Yusuf',
      department: 'HR',
      amount: 250000,
      vendor: 'Inland Stationers',
      approvalLevel: 'Tier 1',
      status: 'Completed',
      currentApprover: 'Procurement Manager',
      dueDate: '2026-06-05',
      escalated: false,
      notes: 'Ancillary stationers.'
    }
  ]);

  // View modal controls
  const [selectedReq, setSelectedReq] = useState<PurchaseRequestInfo | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Trigger feedback banner toast
  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 4000);
  };

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        let nextStatus = r.status;
        let nextApprover = r.currentApprover;

        // Sequence logic
        if (r.status === 'Submitted') {
          nextStatus = 'Procurement Review';
          nextApprover = 'Finance Director';
        } else if (r.status === 'Procurement Review' || r.status === 'RFQ Sent') {
          nextStatus = 'Finance Approval';
          nextApprover = 'Chief Executive Officer';
        } else if (r.status === 'Finance Approval' || r.status === 'Executive Approval') {
          nextStatus = 'PO Created';
          nextApprover = 'Purchasing Vendor Clerk';
        } else if (r.status === 'PO Created') {
          nextStatus = 'Payment Pending';
        } else if (r.status === 'Payment Pending') {
          nextStatus = 'Completed';
        }
        
        showFeedback(`Request ${r.id} approved successfully! Promoted from ${r.status} to ${nextStatus}.`);
        return {
          ...r,
          status: nextStatus as any,
          currentApprover: nextApprover
        };
      }
      return r;
    }));
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        showFeedback(`Request ${r.id} has been Rejected. Status updated.`);
        return { ...r, status: 'Rejected', currentApprover: 'None (Archived)' };
      }
      return r;
    }));
  };

  const handleEscalate = (id: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        showFeedback(`Overdue warning triggered! Request ${r.id} escalated to next executive authority.`);
        return { ...r, escalated: true, currentApprover: 'C-Suite Command Board' };
      }
      return r;
    }));
  };

  const handleConvertToPO = (id: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        showFeedback(`Commercial binding complete! Request ${r.id} converted into official Purchase Order (PO Created).`);
        return { ...r, status: 'PO Created', currentApprover: 'Vendor Coordinator' };
      }
      return r;
    }));
  };

  // Stats
  const activeCount = requests.filter(r => r.status !== 'Completed' && r.status !== 'Rejected').length;
  const totalAmount = requests.reduce((sum, r) => sum + r.amount, 0);
  const pendingTiers = requests.filter(r => r.status === 'Executive Approval' || r.status === 'Finance Approval').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Toast Feedback banner */}
      {feedbackMsg && (
        <div className="fixed top-4 right-4 bg-slate-900 border border-purple-500 text-white p-4 rounded-xl shadow-2xl z-50 animate-fade-in text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-purple-750 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ClickUp Space: Procurement-PRs
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">Procurement Workflow</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Manage purchase requisitions, quotation requests, and corporate approvals against threshold guidelines.
          </p>
        </div>
        <div className="text-[11px] font-bold text-slate-500 bg-slate-100 p-3 rounded-lg border border-slate-200">
          📍 Core Threshold Guidelines: Tier 1 &lt; ₦1M (Procurement HOD) | Tier 2 &lt; ₦10M (Finance HOD) | Tier 3 &gt; ₦10M (Executive Command)
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={ShoppingCart}
          value={`${activeCount} Active`}
          label="Active ClickUp Items"
          description="Excludes closed & rejected folders"
          variant="indigo"
        />
        <StatCard
          icon={DollarSign}
          value={`₦${(totalAmount / 1000000).toFixed(2)}M`}
          label="Total Value of Ledger"
          description="Across all purchase applications"
          variant="emerald"
        />
        <StatCard
          icon={AlertOctagon}
          value={`${requests.filter(r => r.escalated).length} Escalated`}
          label="Overdue SLA Red Flags"
          description="Requires target focus reminders"
          variant="rose"
        />
        <StatCard
          icon={Bookmark}
          value={`${pendingTiers} Sign-offs`}
          label="Pending High-value approvals"
          description="Awaiting HOD/Director actions"
          variant="blue"
        />
      </div>

      {/* Embedded Automation Alert Card */}
      <div className="bg-gradient-to-r from-[#7C3AED]/5 to-blue-50/50 border border-purple-200/50 p-4 rounded-xl flex items-center justify-between text-xs font-semibold">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 text-purple-750 rounded-lg">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#7C3AED] block">Active ClickUp Automator</span>
            <span className="text-slate-700">Dynamic allocation router enforces statutory limits in real-time when requests are logged.</span>
          </div>
        </div>
        <Badge variant="indigo">SLA Safeguards Active</Badge>
      </div>

      {/* Table view */}
      <Card className="bg-white border border-slate-200 overflow-hidden">
        <CardHeader className="border-b border-slate-100 p-4 bg-slate-50 flex items-center justify-between flex-row">
          <CardTitle className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Purchase Order Register</CardTitle>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400" />
            <span className="text-[10px] text-slate-405 font-extrabold">Filter: ClickUp Column Views</span>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bold border-collapse select-none">
            <thead>
              <tr className="bg-slate-100/60 text-slate-400 uppercase tracking-widest text-[9px] border-b border-slate-200/80">
                <th className="p-3.5">Ref ID</th>
                <th className="p-3.5">Request Title</th>
                <th className="p-3.5">Requester / Dept</th>
                <th className="p-3.5 text-right">Value (₦)</th>
                <th className="p-3.5">Authorized Vendor</th>
                <th className="p-3.5 text-center">Approval level</th>
                <th className="p-3.5">Current Approver</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5 text-center">Status state</th>
                <th className="p-3.5 text-right">Action Panel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {requests.map(req => (
                <tr key={req.id} className={`hover:bg-slate-50 transition duration-150 relative ${req.escalated ? 'bg-rose-50/10' : ''}`}>
                  <td className="p-3.5 text-slate-400 font-bold">{req.id}</td>
                  <td className="p-3.5">
                    <p className="font-extrabold text-slate-900 leading-tight">{req.item}</p>
                    {req.escalated && (
                      <span className="text-[9px] text-rose-650 bg-rose-50 border border-rose-100 font-bold px-1.5 py-0.5 rounded-full inline-block mt-1">
                        ⚠️ Overdue Escalation Active
                      </span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <p className="font-extrabold text-slate-800 leading-none">{req.requester}</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-1">{req.department}</p>
                  </td>
                  <td className="p-3.5 text-right font-black text-slate-950">
                    ₦{req.amount.toLocaleString()}
                  </td>
                  <td className="p-3.5 text-slate-500 font-semibold">{req.vendor}</td>
                  <td className="p-3.5 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wide font-extrabold ${
                      req.approvalLevel === 'Tier 3' ? 'bg-rose-105 text-rose-700 border border-rose-200' :
                      req.approvalLevel === 'Tier 2' ? 'bg-amber-105 text-amber-700 border border-amber-200' :
                      'bg-sky-105 text-sky-700 border border-sky-200'
                    }`}>
                      {req.approvalLevel}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-500">{req.currentApprover}</td>
                  <td className="p-3.5 text-slate-400 font-semibold">{req.dueDate}</td>
                  <td className="p-3.5 text-center">
                    <Badge variant={
                      req.status === 'Completed' ? 'green' :
                      req.status === 'Rejected' ? 'red' :
                      req.status === 'Draft' ? 'slate' : 'amber'
                    }>
                      {req.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button
                        title="View Full Context"
                        onClick={() => setSelectedReq(req)}
                        className="p-1 px-2 border border-slate-200 rounded text-slate-500 hover:bg-slate-100 cursor-pointer flex items-center gap-1 text-[10px]"
                      >
                        <Eye className="h-3 w-3" /> View
                      </button>

                      {req.status !== 'Completed' && req.status !== 'Rejected' && (
                        <>
                          <button
                            title="Advance Stage"
                            onClick={() => handleApprove(req.id)}
                            className="p-1 px-2 border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold rounded hover:bg-emerald-100 cursor-pointer text-[10px]"
                          >
                            Approve
                          </button>
                          <button
                            title="Reject"
                            onClick={() => handleReject(req.id)}
                            className="p-1 px-2 border border-rose-250 bg-rose-50 text-rose-700 font-bold rounded hover:bg-rose-100 cursor-pointer text-[10px]"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {!req.escalated && req.status !== 'Completed' && req.status !== 'Rejected' && (
                        <button
                          title="Trigger Overdue SLA"
                          onClick={() => handleEscalate(req.id)}
                          className="p-1 px-2 border border-amber-200 text-amber-700 font-bold rounded hover:bg-amber-50 cursor-pointer text-[10px]"
                        >
                          Overdue SLA
                        </button>
                      )}

                      {req.status === 'Finance Approval' && (
                        <button
                          title="Generate PO Document"
                          onClick={() => handleConvertToPO(req.id)}
                          className="p-1 px-2 border border-indigo-200 bg-indigo-50 text-[#7C3AED] font-bold rounded hover:bg-indigo-100 cursor-pointer text-[10px]"
                        >
                          Create PO
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* VIEW REQUEST MODAL OVERLAY */}
      {selectedReq && (
        <Modal isOpen={true} onClose={() => setSelectedReq(null)} title={`${selectedReq.id}: Detailed Audit Register`}>
          <div className="space-y-4 font-bold text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-slate-400">Status state:</span>
              <Badge variant="amber">{selectedReq.status}</Badge>
            </div>

            <div className="space-y-2 border-b border-slate-100 pb-4">
              <p className="text-slate-400 text-[10px] uppercase">Requisition Item Name</p>
              <h3 className="text-sm font-black text-slate-900 leading-snug">{selectedReq.item}</h3>
              <p className="text-[11px] text-slate-505 mt-1 leading-relaxed font-semibold">{selectedReq.notes}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px] font-semibold">
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Department Requester</p>
                <p className="text-slate-800 font-black mt-1">{selectedReq.requester} ({selectedReq.department})</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Commercial Amount</p>
                <p className="text-emerald-700 font-black mt-1">₦{selectedReq.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Target Supplier</p>
                <p className="text-slate-800 font-bold mt-1">{selectedReq.vendor}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Current Approver Authority</p>
                <p className="text-indigo-700 font-bold mt-1">{selectedReq.currentApprover}</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-405 font-bold italic border-t border-slate-100 pt-3">
              Auditable ClickUp Trail: Standard compliance rules checked. This item conforms to statutory budget lines.
            </p>
            
            <div className="flex justify-end pt-3">
              <Button variant="primary" size="sm" onClick={() => setSelectedReq(null)}>
                Close Overlay
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Procurement;
