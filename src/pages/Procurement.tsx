import React from 'react';
import {
  ShoppingCart,
  DollarSign,
  Briefcase,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const Procurement: React.FC = () => {
  const {
    purchaseRequests,
    approvePurchaseRequest,
    rejectPurchaseRequest,
    escalatePurchaseRequest
  } = useCommandCenter();

  // Helper to determine approval policy thresholds
  const getApprovalThresholdRequirement = (amount: number) => {
    if (amount > 10000000) {
      return {
        label: 'C-Suite (Tier 3)',
        desc: 'Over ₦10.0M - Requires Director Audit & CEO Command sign-off',
        style: 'bg-rose-50 text-rose-750 border-rose-200'
      };
    }
    if (amount >= 1000000) {
      return {
        label: 'Finance (Tier 2)',
        desc: '₦1.0M to ₦10.0M - Requires Finance Director & Unit Head',
        style: 'bg-amber-50 text-amber-750 border-amber-200'
      };
    }
    return {
      label: 'Procure Manager (Tier 1)',
      desc: 'Below ₦1.0M - Requires standard Procurement Lead authorization',
      style: 'bg-sky-50 text-sky-750 border-sky-200'
    };
  };

  const pendingSpend = purchaseRequests
    .filter(pr => pr.status !== 'Approved' && pr.status !== 'Completed' && pr.status !== 'Rejected')
    .reduce((acc, pr) => acc + pr.amount, 0);

  const approvedSpend = purchaseRequests
    .filter(pr => pr.status === 'Approved' || pr.status === 'Completed')
    .reduce((acc, pr) => acc + pr.amount, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Sub title details */}
      <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">Purchase Requests & PO Approval Queue</h2>
        <p className="text-xs text-slate-500 mt-1">
          Automated multi-tier financial delegation routing. Submissions are categorized into Tiers based on statutory budget limits (₦1M / ₦10M thresholds) to enforce compliance before ordering.
        </p>
      </div>

      {/* Procurement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={ShoppingCart}
          value={purchaseRequests.length}
          label="Total Register Mappings"
          description="Purchase orders tracked in ledger"
          variant="indigo"
        />
        <StatCard
          icon={DollarSign}
          value={`₦${(pendingSpend / 1000000).toFixed(2)}M`}
          label="Pending Appropriation"
          description="Awaiting department authorizations"
          variant="amber"
        />
        <StatCard
          icon={CheckCircle2}
          value={`₦${(approvedSpend / 1000000).toFixed(1)}M`}
          label="Authorized Spend"
          description="Passed threshold validation rules"
          variant="emerald"
        />
        <StatCard
          icon={AlertOctagon}
          value={purchaseRequests.filter(pr => pr.budgetLimitExceeded).length}
          label="Budget Warnings Flags"
          description="Exceeds baseline department ceilings"
          variant="rose"
        />
      </div>

      {/* Primary Table Ledger */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>PO Regulatory Register</CardTitle>
          <Badge variant="indigo">Compliance Active</Badge>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="p-4">PO Reference</th>
                <th className="p-4 font-bold">Requested Item</th>
                <th className="p-4">Dept / Requester</th>
                <th className="p-4 text-right">Value (₦)</th>
                <th className="p-4">Financial Tier Authority</th>
                <th className="p-4 text-center font-bold">Step Approvals</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Operation Panel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {purchaseRequests.map((pr) => {
                const threshold = getApprovalThresholdRequirement(pr.amount);
                return (
                  <tr key={pr.id} className="hover:bg-slate-50/50 transition leading-snug">
                    <td className="p-4 font-bold text-slate-900">{pr.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-slate-800 break-words max-w-sm">{pr.item}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{pr.budgetCode}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-700">{pr.requester}</p>
                      <p className="text-[10px] text-slate-400">{pr.department}</p>
                    </td>
                    <td className="p-4 text-right font-black text-slate-900">
                      ₦{pr.amount.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className={`p-2 border rounded-md ${threshold.style}`}>
                        <p className="font-bold uppercase text-[9px]">{threshold.label}</p>
                        <p className="text-[9px] mt-0.5 leading-tight">{threshold.desc}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-[9px] font-semibold">
                        <div className="flex justify-between items-center bg-slate-100 px-1.5 py-0.5 rounded">
                          <span>Unit HOD:</span>
                          <span className={pr.managerApproved ? 'text-emerald-600 font-black' : 'text-slate-400'}>
                            {pr.managerApproved ? 'SAVED' : 'PENDING'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-100 px-1.5 py-0.5 rounded">
                          <span>Finance Dir:</span>
                          <span className={pr.financeApproved ? 'text-emerald-600 font-black' : 'text-slate-400'}>
                            {pr.financeApproved ? 'SAVED' : 'PENDING'}
                          </span>
                        </div>
                        {pr.amount > 10000000 && (
                          <div className="flex justify-between items-center bg-slate-100 px-1.5 py-0.5 rounded">
                            <span>MD / CEO:</span>
                            <span className={pr.execApproved ? 'text-emerald-600 font-black' : 'text-slate-400'}>
                              {pr.execApproved ? 'SECRETED' : 'PENDING'}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant={getStatusVariant(pr.status)}>{pr.status}</Badge>
                    </td>
                    <td className="p-4 text-center">
                      {pr.status !== 'Approved' && pr.status !== 'Completed' && pr.status !== 'Rejected' ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => approvePurchaseRequest(pr.id)}
                            className="bg-emerald-550 bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 text-[10px] rounded font-bold cursor-pointer transition shadow-xs"
                            title="Verify and Approve Segment"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectPurchaseRequest(pr.id)}
                            className="bg-rose-500 hover:bg-rose-650 text-white p-1 text-[10px] rounded font-bold cursor-pointer transition shadow-xs"
                            title="Decline requisition"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                          {pr.amount > 5000000 && pr.status !== 'Executive Approval' && (
                            <button
                              onClick={() => escalatePurchaseRequest(pr.id)}
                              className="bg-slate-100 hover:bg-slate-205 text-slate-700 py-1 px-1.5 text-[10px] border border-slate-200 rounded font-bold cursor-pointer transition"
                              title="Escalate direct to CEO Desk"
                            >
                              Escalate
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">Order Log Settled</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      
    </div>
  );
};
export default Procurement;
