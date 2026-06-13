import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  Search,
  ExternalLink,
  PlusCircle,
  FileText,
  Star,
  Settings,
  HelpCircle,
  TrendingDown,
  Building,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Sparkles,
  RefreshCw,
  MoreVertical,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

interface VendorRegisterInfo {
  id: string; // Registration Code
  name: string;
  category: string;
  cacStatus: 'Verified' | 'Pending' | 'Rejected';
  slaScore: number;
  expiryDate: string;
  disputeCount: number;
  contactEmail: string;
  notes: string;
}

export const Vendors: React.FC = () => {
  const [portalView, setPortalView] = useState<'Internal' | 'External'>('Internal');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeDialogVendor, setActiveDialogVendor] = useState<VendorRegisterInfo | null>(null);

  // New Vendor Form
  const [newVendorModal, setNewVendorModal] = useState(false);
  const [vName, setVName] = useState('');
  const [vCat, setVCat] = useState('Equipment & Materials');
  const [vEmail, setVEmail] = useState('');

  // External Portal states (simulating Silas Thorne uploading CAC)
  const [extUploadedCac, setExtUploadedCac] = useState(false);
  const [extUploadedInvoice, setExtUploadedInvoice] = useState(false);
  const [extDisputeSubject, setExtDisputeSubject] = useState('');
  const [extDisputeNotes, setExtDisputeNotes] = useState('');

  // Primary data containing specified columns
  const [vendorList, setVendorList] = useState<VendorRegisterInfo[]>([
    {
      id: 'VEN-201',
      name: 'Silas Thorne Engineering Solutions',
      category: 'Pipeline Fabrication & Heavy Rigging',
      cacStatus: 'Verified',
      slaScore: 94,
      expiryDate: '2026-11-30',
      disputeCount: 0,
      contactEmail: 's.thorne@thornerigging.com',
      notes: 'Our primary high-performance contractor for South-East pipeline operations.'
    },
    {
      id: 'VEN-202',
      name: 'Kaduna Dredging & Sands Ltd',
      category: 'Marine Logistical Support',
      cacStatus: 'Pending',
      slaScore: 78,
      expiryDate: '2026-07-15',
      disputeCount: 2,
      contactEmail: 'info@kadunadredging.com',
      notes: 'Recent marine logistic dispute pending legal investigation.'
    },
    {
      id: 'VEN-203',
      name: 'Alao Logistics & Transport Corp',
      category: 'Ancillary Heavy Haulage Transport',
      cacStatus: 'Verified',
      slaScore: 88,
      expiryDate: '2026-06-20',
      disputeCount: 1,
      contactEmail: 'dispatch@alaologistics.com',
      notes: 'SLA score affected by vehicle downtime in Lagos metropolitan grid, renewal pending.'
    },
    {
      id: 'VEN-204',
      name: 'Wari Pipeline Protection Partners',
      category: 'Security Systems Installation',
      cacStatus: 'Rejected',
      slaScore: 55,
      expiryDate: '2025-12-05',
      disputeCount: 4,
      contactEmail: 'contact@warippp.com',
      notes: 'Failed annual CAC document compliance audit verification. Blocked from bidding.'
    }
  ]);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName.trim()) return;

    const code = `VEN-${Math.floor(205 + Math.random() * 90)}`;
    const newVendor: VendorRegisterInfo = {
      id: code,
      name: vName,
      category: vCat,
      cacStatus: 'Pending',
      slaScore: 100,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1050).toISOString().split('T')[0],
      disputeCount: 0,
      contactEmail: vEmail || 'contact@newvendor.com',
      notes: 'Pre-onboarding status active.'
    };

    setVendorList(prev => [...prev, newVendor]);
    showToast(`Vendor ${vName} successfully onboarded in pre-qualification status!`);
    setVName('');
    setVEmail('');
    setNewVendorModal(false);
  };

  const updateCacStatus = (id: string, newStatus: VendorRegisterInfo['cacStatus']) => {
    setVendorList(prev => prev.map(v => v.id === id ? { ...v, cacStatus: newStatus } : v));
    showToast(`Supplier ${id} CAC Verification state adjusted to ${newStatus}.`);
  };

  const handleResolveDispute = (id: string) => {
    setVendorList(prev => prev.map(v => v.id === id ? { ...v, disputeCount: Math.max(0, v.disputeCount - 1) } : v));
    showToast(`Dispute cleared for supplier ${id}.`);
  };

  const activeDisputes = vendorList.reduce((sum, v) => sum + v.disputeCount, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Toast */}
      {feedback && (
        <div className="fixed top-4 right-4 bg-slate-900 border border-purple-500 text-white p-4 rounded-xl shadow-2xl z-50 animate-fade-in text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Top Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-205 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-purple-100 text-purple-750 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            ATMA Space: VENDOR-PORTAL
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">Vendor Management Portal</h2>
          <p className="text-xs text-slate-505 mt-1 font-semibold">
            Track qualified supplier portfolios, compliance, SLA scores, and client-vendor communications.
          </p>
        </div>

        {/* Guest Portal Toggle Switch */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-fit shrink-0 select-none">
          <button
            onClick={() => setPortalView('Internal')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer ${
              portalView === 'Internal' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-slate-505 hover:text-slate-900'
            }`}
          >
            Internal ATMA Space
          </button>
          <button
            onClick={() => setPortalView('External')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer ${
              portalView === 'External' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-slate-550 hover:text-slate-900'
            }`}
          >
            External Vendor View
          </button>
        </div>
      </div>

      {portalView === 'Internal' ? (
        /* ==================== INTERNAL INTERNAL INTERNAL ==================== */
        <div className="space-y-6 animate-fade-in">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Truck}
              value={`${vendorList.length} Partners`}
              label="Onboarded Supplier Ledger"
              description="Awaiting statutory CAC reviews"
              variant="indigo"
            />
            <StatCard
              icon={ShieldCheck}
              value="84% Compliant"
              label="CAC Verification Success"
              description="Passing commercial board audits"
              variant="emerald"
            />
            <StatCard
              icon={Star}
              value="81% SLA Avg"
              label="Weighted Partner Rating"
              description="SLA score compliance threshold"
              variant="amber"
            />
            <StatCard
              icon={HelpCircle}
              value={`${activeDisputes} Open`}
              label="Active Dispute Mappings"
              description="Requires mediation settlement"
              variant="rose"
            />
          </div>

          {/* Action Header */}
          <div className="flex justify-between items-center bg-white border border-slate-200/80 p-4 rounded-xl shadow-xs">
            <div>
              <h3 className="text-xs font-extrabold text-slate-805 uppercase tracking-wide">Qualified Vendor Matrix</h3>
              <p className="text-[11px] text-slate-500 font-semibold leading-normal">Compliance managers supervise pre-qualifications and update document validation states.</p>
            </div>
            <Button variant="primary" size="sm" className="gap-1.5 font-bold" onClick={() => setNewVendorModal(true)}>
              <PlusCircle className="h-4 w-4" /> Onboard New Vendor
            </Button>
          </div>

          {/* Internal table */}
          <Card className="bg-white border border-slate-200 overflow-hidden">
            <CardHeader className="border-b border-slate-100 p-4 bg-slate-50 flex items-center justify-between flex-row">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Internal Supplier Checklist</CardTitle>
              <div className="flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-slate-400" />
                <span className="text-[10px] text-slate-400 font-extrabold">Filter: Live Track Columns</span>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-bold border-collapse select-none">
                <thead>
                  <tr className="bg-slate-100/60 text-slate-400 uppercase tracking-widest text-[9px] border-b border-slate-200">
                    <th className="p-3.5">Reg Code</th>
                    <th className="p-3.5">Vendor Name</th>
                    <th className="p-3.5">Business Category</th>
                    <th className="p-3.5 text-center">CAC Audit Status</th>
                    <th className="p-3.5 text-center">SLA Score</th>
                    <th className="p-3.5">Contract Expiry</th>
                    <th className="p-3.5 text-center">Dispute Count</th>
                    <th className="p-3.5 text-right">Action Block</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-705">
                  {vendorList.map(vendor => (
                    <tr key={vendor.id} className="hover:bg-slate-50/60 transition">
                      <td className="p-3.5 text-slate-400 font-bold">{vendor.id}</td>
                      <td className="p-3.5">
                        <p className="font-extrabold text-slate-900 leading-tight">{vendor.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold lowercase mt-0.5">{vendor.contactEmail}</p>
                      </td>
                      <td className="p-3.5 text-slate-500 font-semibold">{vendor.category}</td>
                      <td className="p-3.5 text-center">
                        <select
                          value={vendor.cacStatus}
                          onChange={(e) => updateCacStatus(vendor.id, e.target.value as any)}
                          className={`font-semibold text-[10px] px-2 py-0.5 rounded border focus:outline-none ${
                            vendor.cacStatus === 'Verified' ? 'bg-emerald-50 text-emerald-800 border-emerald-250 font-bold' :
                            vendor.cacStatus === 'Pending' ? 'bg-amber-50 text-amber-800 border-amber-250 font-bold' :
                            'bg-rose-50 text-rose-805 border-rose-250 font-bold'
                          }`}
                        >
                          <option value="Verified">Verified</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-[10px] font-extrabold ${vendor.slaScore >= 90 ? 'text-emerald-700' : vendor.slaScore >= 75 ? 'text-amber-700' : 'text-rose-700'}`}>
                            {vendor.slaScore}%
                          </span>
                          <div className="w-12 bg-slate-100 h-1 rounded-full overflow-hidden mt-1">
                            <div className={`h-full ${vendor.slaScore >= 90 ? 'bg-emerald-500' : vendor.slaScore >= 75 ? 'bg-amber-400' : 'bg-rose-500'}`} style={{ width: `${vendor.slaScore}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-405 font-bold">{vendor.expiryDate}</td>
                      <td className="p-3.5 text-center text-slate-800">
                        {vendor.disputeCount > 0 ? (
                          <Badge variant="red">{vendor.disputeCount} Open</Badge>
                        ) : (
                          <span className="text-slate-400 font-bold">-</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => setActiveDialogVendor(vendor)}
                            className="p-1 px-2 border border-slate-200 rounded text-slate-500 hover:bg-slate-100 cursor-pointer text-[10px]"
                          >
                            Details
                          </button>
                          {vendor.disputeCount > 0 && (
                            <button
                              onClick={() => handleResolveDispute(vendor.id)}
                              className="p-1 px-2 border border-emerald-205 text-emerald-700 hover:bg-emerald-50 rounded cursor-pointer text-[10px]"
                            >
                              Resolve Dispute
                            </button>
                          )}
                          <button
                            onClick={() => showToast(`Initiated contract renewal proposal workflow for supplier ${vendor.id}.`)}
                            className="p-1 px-2 bg-purple-50 text-[#7C3AED] hover:bg-purple-100 font-bold rounded cursor-pointer text-[10px]"
                          >
                            Renew
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      ) : (
        /* ==================== EXTERNAL VENDOR GUESTS view ==================== */
        <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
          
          {/* Vendor Guest Console Panel (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-white border border-slate-200">
              <CardHeader className="border-b border-indigo-50">
                <CardTitle className="text-xs uppercase font-extrabold text-[#7C3AED] flex items-center gap-2">
                  <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-400" />
                  Silas Thorne Engineering
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4 text-xs font-bold">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400 text-[10px] uppercase">Compliance State</span>
                  <Badge variant="green">CAC Verified & Active</Badge>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400 text-[10px] uppercase">My Guest Access Level</span>
                  <span className="text-indigo-700">Vendor Guest</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400 text-[10px] uppercase">SLA Score Performance</span>
                  <span className="text-emerald-700">94% Compliance</span>
                </div>
                
                <div className="bg-slate-50 border border-slate-150 p-3 rounded-lg font-semibold text-slate-505 leading-snug">
                  You are logged into the operations workspace with external guest clearances. You may only view and upload compliance documents related to Silas Thorne Engineering.
                </div>
              </CardContent>
            </Card>

            {/* Document Upload Simulation */}
            <Card className="bg-white border border-slate-200 p-5 space-y-4">
              <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Upload Renewal Documents</h4>
              
              <div className="space-y-3">
                <div className="border border-dashed border-slate-250 p-4 rounded-xl text-center flex flex-col items-center justify-center bg-slate-50/50">
                  <UploadCloud className="h-6 w-6 text-slate-400 mb-1" />
                  <p className="text-[11px] text-slate-900 font-extrabold">Upload CAC Certificate (PDF)</p>
                  <p className="text-[9px] text-slate-404">Drag & drop or Click to browse</p>
                  
                  {extUploadedCac ? (
                    <Badge variant="green" className="mt-2 text-[9px]">✓ CAC_Certificate_2026.pdf uploaded</Badge>
                  ) : (
                    <button 
                      onClick={() => { setExtUploadedCac(true); showToast("CAC Certificate uploaded successfully. Forwarded to HR Compliance!"); }}
                      className="mt-2.5 px-3 py-1 bg-[#7C3AED] hover:bg-purple-700 text-white text-[10px] font-extrabold uppercase rounded-lg"
                    >
                      Browse CAC File
                    </button>
                  )}
                </div>

                <div className="border border-dashed border-slate-250 p-4 rounded-xl text-center flex flex-col items-center justify-center bg-slate-50/50">
                  <UploadCloud className="h-6 w-6 text-slate-400 mb-1" />
                  <p className="text-[11px] text-slate-900 font-extrabold">Upload Billing Invoice</p>
                  <p className="text-[9px] text-slate-404">Drag & drop or Click to browse</p>
                  
                  {extUploadedInvoice ? (
                    <Badge variant="green" className="mt-2 text-[9px]">✓ Billing_Invoice_REF403.pdf uploaded</Badge>
                  ) : (
                    <button 
                      onClick={() => { setExtUploadedInvoice(true); showToast("Invoice uploaded. Dispatched to Procurement Approbations!"); }}
                      className="mt-2.5 px-3 py-1 bg-[#7C3AED] hover:bg-purple-700 text-white text-[10px] font-extrabold uppercase rounded-lg"
                    >
                      Browse Invoice File
                    </button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Core Vendor List of Bid/Projects (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-white border border-slate-205">
              <CardHeader className="border-b border-slate-100 flex justify-between items-center bg-slate-50/40">
                <CardTitle className="text-xs uppercase font-extrabold text-slate-400">My Active Site Works / Tenders</CardTitle>
                <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-extrabold">Silas Thorne Ledger</span>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                
                <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 flex justify-between items-center text-xs font-semibold">
                  <div>
                    <strong className="text-slate-850 block">South Substation Cable Routing Tender</strong>
                    <span className="text-[10px] text-indigo-705 font-bold block mt-0.5 uppercase">Reference: BID-EXE-601</span>
                    <span className="text-[10px] text-slate-400">Submission Date: 2026-05-15</span>
                  </div>
                  <Badge variant="indigo">SLA Review Active</Badge>
                </div>

                <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 flex justify-between items-center text-xs font-semibold">
                  <div>
                    <strong className="text-slate-850 block">High-Scale Safety Audits Civil Survey Installation</strong>
                    <span className="text-[10px] text-indigo-705 font-bold block mt-0.5 uppercase">Reference: PRJ-501 Base Bases</span>
                    <span className="text-[10px] text-slate-400">Handover Date: 2026-06-30</span>
                  </div>
                  <Badge variant="green">Contract Assigned</Badge>
                </div>

              </CardContent>
            </Card>

            {/* Logging Dispute simulations */}
            <Card className="bg-white border border-slate-250 p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Log Contract Reconcile / Dispute</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast(`Dispute logged. Reference DIS-${Math.floor(10 + Math.random() * 85)} routed to legal team.`);
                  setExtDisputeSubject('');
                  setExtDisputeNotes('');
                }}
                className="space-y-4 font-bold text-xs"
              >
                <div>
                  <label className="block text-slate-600 mb-1 uppercase text-[10px]">Title of Dispute / Issue</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Unreconciled Invoice #409 withholding tax" 
                    value={extDisputeSubject}
                    onChange={(e) => setExtDisputeSubject(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-600 focus:outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 uppercase text-[10px]">Detailed description of disagreement</label>
                  <textarea 
                    required 
                    rows={3} 
                    placeholder="Provide details of dates, payments, and invoice reference codes..." 
                    value={extDisputeNotes}
                    onChange={(e) => setExtDisputeNotes(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none resize-none" 
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" size="sm" type="submit">
                    Files Dispute Register
                  </Button>
                </div>
              </form>
            </Card>
          </div>

        </div>
      )}

      {/* MODAL: DETAIL OVERLAY internal view */}
      {activeDialogVendor && (
        <Modal isOpen={true} onClose={() => setActiveDialogVendor(null)} title={`${activeDialogVendor.id}: Vendor pre-qual records`}>
          <div className="space-y-4 font-bold text-xs text-slate-700">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-slate-400 text-[10px]">CAC Audit:</span>
              <Badge variant={activeDialogVendor.cacStatus === 'Verified' ? 'green' : 'amber'}>{activeDialogVendor.cacStatus}</Badge>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 uppercase">Vendor Corporate Name</p>
              <h3 className="text-sm font-black text-slate-900">{activeDialogVendor.name}</h3>
              <p className="text-[11px] text-slate-500 leading-normal font-semibold mt-1">{activeDialogVendor.notes}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px] font-semibold">
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Class/Classification</p>
                <p className="text-slate-800 font-bold mt-1">{activeDialogVendor.category}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Direct Contact Email</p>
                <p className="text-indigo-700 font-semibold mt-1">{activeDialogVendor.contactEmail}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">SLA Rating Score</p>
                <p className="text-slate-800 font-bold mt-1">{activeDialogVendor.slaScore}% Standard Achievement</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Contract Expiry</p>
                <p className="text-rose-700 font-bold mt-1">{activeDialogVendor.expiryDate}</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-medium italic border-t border-slate-100 pt-3">
              This partner is monitored under the Q2 Audit Frame. CAC status verified under Corporate Affairs Commission ledger references.
            </p>

            <div className="flex justify-end pt-3">
              <Button variant="primary" size="sm" onClick={() => setActiveDialogVendor(null)}>
                Close Record
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* INTERNAL FORM ONBOARD NEW SUPPLIER */}
      <Modal isOpen={newVendorModal} onClose={() => setNewVendorModal(false)} title="Simulate Internal Vendor Onboarding Form">
        <form onSubmit={handleCreateVendor} className="space-y-4 font-bold text-xs">
          <div>
            <label className="block text-slate-600 mb-1 uppercase text-[10px]">Vendor Registration / Business Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Niger Delta Piping Supply Ltd"
              value={vName}
              onChange={(e) => setVName(e.target.value)}
              className="w-full p-2 border border-slate-205 rounded-lg focus:ring-1 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-605 mb-1 uppercase text-[10px]">Business Email</label>
            <input
              type="email"
              required
              placeholder="e.g. tender@nigerpipegroups.com"
              value={vEmail}
              onChange={(e) => setVEmail(e.target.value)}
              className="w-full p-2 border border-slate-205 rounded-lg focus:ring-1 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-605 mb-1 uppercase text-[10px]">Supplier Category</label>
            <select
              value={vCat}
              onChange={(e) => setVCat(e.target.value)}
              className="w-full p-2 border border-slate-205 rounded-lg focus:outline-none"
            >
              <option value="Mechanical Fabrication">Mechanical Fabrication</option>
              <option value="Equipment & Supply">Equipment & Supply</option>
              <option value="Safety & Audit Compliance">Safety & Audit Compliance</option>
              <option value="Logistics Solutions">Logistics Solutions</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" type="button" onClick={() => setNewVendorModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Submit Intake Form
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default Vendors;
