import React, { useState } from 'react';
import {
  Truck,
  Verified,
  Search,
  ExternalLink,
  PlusCircle,
  FilePlus,
  Star,
  Settings,
  HelpCircle,
  TrendingDown,
  Building
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const Vendors: React.FC = () => {
  const { vendors } = useCommandCenter();

  // Selected View: Internal vs Guest External
  const [vendorPortalView, setVendorPortalView] = useState<'Internal' | 'External'>('Internal');
  const [selectedUploadDoc, setSelectedUploadDoc] = useState('CAC Certificate');
  
  // External Guest Form states
  const [disputeVendor, setDisputeVendor] = useState('Prime Digital Systems');
  const [disputeAmount, setDisputeAmount] = useState('');
  const [disputeNotes, setDisputeNotes] = useState('');

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Dispute Log submitted for ${disputeVendor}. Dispatched to Legal & Procurement Unit (Tunde Balogun). SLA: 48h Response.`);
    setDisputeAmount(''); setDisputeNotes('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* View Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-205 p-6 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Vendor Management Systems & Portal</h2>
          <p className="text-xs text-slate-500 mt-1">Pre-qualification scoring, CAC audit tracks, dispute registries, and self-service external portals.</p>
        </div>

        {/* Dynamic portal toggle */}
        <div className="flex bg-slate-100 p-1.5 rounded-lg border border-slate-200 w-fit shrink-0">
          <button
            onClick={() => setVendorPortalView('Internal')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md cursor-pointer transition ${
              vendorPortalView === 'Internal'
                ? 'bg-indigo-900 text-white shadow-xs'
                : 'text-slate-650 hover:text-slate-900'
            }`}
          >
            Internal Manager View
          </button>
          <button
            onClick={() => setVendorPortalView('External')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md cursor-pointer transition ${
              vendorPortalView === 'External'
                ? 'bg-indigo-900 text-white shadow-xs'
                : 'text-slate-650 hover:text-slate-900'
            }`}
          >
            External Vendor View
          </button>
        </div>
      </div>

      {vendorPortalView === 'Internal' ? (
        /* ==================== INTERNAL MANAGER VIEW ==================== */
        <div className="space-y-6 animate-fade-in">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              icon={Truck}
              value={vendors.length}
              label="Onboarded Suppliers"
              description="Registered partners in ledger"
              variant="indigo"
            />
            <StatCard
              icon={Building}
              value="87% Avg Score"
              label="Group Compliance Rating"
              description="Standard Audit Score"
              variant="emerald"
            />
            <StatCard
              icon={Star}
              value="4.35 Stars"
              label="Average Rating Metric"
              description="Combined supplier score"
              variant="amber"
            />
            <StatCard
              icon={HelpCircle}
              value={vendors.filter(v => v.disputeStatus !== 'None').length}
              label="Active Payment Disputes"
              description="Requires procurement legal audit"
              variant="rose"
            />
          </div>

          {/* Vendors detailed Table */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Vendor Registry</CardTitle>
              <Badge variant="indigo">Compliance Checked</Badge>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="p-4">Vendor Name</th>
                    <th className="p-4">Business Classification</th>
                    <th className="p-4">Rating Index</th>
                    <th className="p-4 text-center">Scorecard</th>
                    <th className="p-4">SLA Compliance</th>
                    <th className="p-4">regulatory status</th>
                    <th className="p-4">Dispute state</th>
                    <th className="p-4">Contract Expiry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">{vendor.name}</p>
                          {vendor.docStatus === 'Verified' && (
                            <Verified className="h-4.5 w-4.5 text-sky-500 shrink-0" title="CAC Verified" />
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">{vendor.email}</p>
                      </td>
                      <td className="p-4 text-slate-655 font-semibold">{vendor.category}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="h-4 w-4 fill-amber-500" />
                          <span>{vendor.rating}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-xs font-black px-2 py-1 rounded ${
                          vendor.score >= 90 ? 'bg-emerald-50 text-emerald-700' : vendor.score >= 75 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {vendor.score}/100
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="w-24">
                          <div className="flex justify-between items-center text-[9px] text-slate-400 mb-1">
                            <span>SLA Target</span>
                            <span>{vendor.slaCompliance}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full ${vendor.slaCompliance >= 90 ? 'bg-emerald-500' : 'bg-amber-505 bg-amber-500'}`} style={{ width: `${vendor.slaCompliance}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={vendor.docStatus === 'Verified' ? 'green' : 'yellow'}>
                          {vendor.docStatus}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={vendor.disputeStatus === 'None' ? 'gray' : 'red'}>
                          {vendor.disputeStatus}
                        </Badge>
                      </td>
                      <td className="p-4 font-semibold text-slate-600">{vendor.contractEnd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : (
        /* ==================== EXTERNAL GUEST VIEW ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in text-slate-700">
          
          {/* Supplier Dashboard and limited actions (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-r from-sky-900 to-indigo-950 text-white border-0">
              <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <Badge variant="blue" className="bg-sky-400/20 text-sky-200 border-sky-400">External Vendor Tenant</Badge>
                  <h3 className="text-xl font-bold mt-2 text-white">Prime Digital Systems - Partner Portal</h3>
                  <p className="text-xs text-sky-100 mt-1">Status: Active Contract partner • Vendor Code: VND-003</p>
                </div>
                
                <div className="bg-sky-400/10 p-3 rounded-lg border border-sky-300/20 text-center">
                  <p className="text-[10px] uppercase font-bold text-sky-200">Pre-qualification Score</p>
                  <p className="text-2xl font-black text-sky-400 mt-1">65/100</p>
                </div>
              </CardContent>
            </Card>

            {/* Document Upload section */}
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Compliance Document Center</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your profile currently lists <strong>Missing Documents</strong>. To prevent purchase orders and invoice routing payments from freezing, please upload valid CAC corporate clearance forms now.
                </p>

                <div className="border border-dashed border-slate-205 rounded-xl p-8 bg-slate-50/50 flex flex-col items-center justify-center text-center gap-2">
                  <FilePlus className="h-10 w-10 text-slate-400" />
                  <p className="text-xs font-bold text-slate-800">Drag or click to choose local compliance files</p>
                  <p className="text-[10px] text-slate-400">PDF, PNG or JPG files supported (Max 10MB)</p>
                  
                  <div className="flex gap-2 mt-4 max-w-sm w-full">
                    <select
                      value={selectedUploadDoc}
                      onChange={(e) => setSelectedUploadDoc(e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs flex-grow focus:outline-none"
                    >
                      <option value="CAC Certificate">CAC Certificate</option>
                      <option value="FIRS Tax Clearance">FIRS Tax Clearance</option>
                      <option value="VAT Registration Form">VAT Registration Form</option>
                    </select>

                    <Button variant="primary" size="sm" className="font-bold flex-shrink-0 cursor-pointer" onClick={() => alert(`Enqueued "${selectedUploadDoc}" for validation. HOD notified!`)}>
                      Upload file
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dispute Invoice / SLA Feedback form (1/3) */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Payment Invoice Dispute</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDisputeSubmit} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Company Entity</label>
                    <input
                      type="text"
                      disabled
                      value="Prime Digital Systems West Africa"
                      className="w-full rounded-lg bg-slate-100 border border-slate-200 p-2 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-505 uppercase mb-1">Impacted PO Value (₦)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1500000"
                      value={disputeAmount}
                      onChange={(e) => setDisputeAmount(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Detailed Dispute Narrative & References</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify PO Reference number, delay duration reason, invoice number..."
                      value={disputeNotes}
                      onChange={(e) => setDisputeNotes(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none"
                    />
                  </div>

                  <Button variant="danger" size="sm" type="submit" className="w-full cursor-pointer font-bold">
                    File Dispute Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      )}

    </div>
  );
};
export default Vendors;
