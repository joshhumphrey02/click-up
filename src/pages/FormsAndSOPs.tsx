import React, { useState } from 'react';
import {
  FileText,
  BookOpen,
  ArrowRight,
  Eye,
  CheckCircle,
  HelpCircle,
  Bookmark
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const FormsAndSOPs: React.FC = () => {
  const { digitizedForms, sops } = useCommandCenter();

  // Selected state for inspects
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [activeSopId, setActiveSopId] = useState<string | null>(null);

  const selectedForm = digitizedForms.find(f => f.id === activeFormId);
  const selectedSop = sops.find(s => s.id === activeSopId);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-slate-700 select-none">
      
      {/* Sub titles metadata details */}
      <div className="bg-white border border-slate-205 p-6 rounded-xl shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">SOP & Form Digitization Registry</h2>
        <p className="text-xs text-slate-500 mt-1">
          Bridge manual paper friction into active ClickUp workflow triggers. Submitting a digital form instantly checks policy SOP alignment, routes through authorization queues, and dispatches automated C-Suite alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Forms Digitization Grid (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase text-slate-405 text-slate-400 tracking-wider">Digitized Forms Catalog</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {digitizedForms.map((form) => (
              <Card key={form.id} className="hover:border-indigo-400 hover:shadow-md transition">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 mb-1.5">
                      <span>{form.id}</span>
                      <span>{form.department}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-normal">{form.name}</h4>
                    
                    <div className="space-y-1 mt-3.5 text-[10px] text-slate-500 font-semibold leading-normal">
                      <p><strong>Route:</strong> {form.approvalRoute}</p>
                      <p className="text-indigo-705"><strong>Automation Trigger:</strong> {form.triggeredWorkflow}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-5 border-t border-slate-50 pt-3">
                    <Badge variant="green">Active Workflow</Badge>
                    <Button
                      variant="primary"
                      size="sm"
                      className="gap-1.5 text-[10.5px] cursor-pointer"
                      onClick={() => setActiveFormId(form.id)}
                    >
                      <Eye className="h-3.5 w-3.5" /> Preview Form
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SOP Knowledge base section (1/3) */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold uppercase text-slate-405 text-slate-400 tracking-wider">SOP Document Policy Library</h3>
          
          <Card>
            <CardHeader className="bg-slate-50/50">
              <div className="flex items-center gap-2 text-indigo-905 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="h-4 w-4 shrink-0" />
                <span>Regulatory Audit SOPs</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3.5">
              {sops.map((sop) => (
                <div
                  key={sop.id}
                  onClick={() => setActiveSopId(sop.id)}
                  className="p-3 border border-slate-100 rounded-lg hover:border-indigo-400 hover:bg-slate-50/40 cursor-pointer transition flex justify-between items-center"
                >
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{sop.docCode}</p>
                    <p className="text-xs font-bold text-slate-805 mt-0.5" title={sop.name}>{sop.name}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Form Preview Modal */}
      <Modal
        isOpen={activeFormId !== null}
        onClose={() => setActiveFormId(null)}
        title={selectedForm ? `Form Registry Preview: ${selectedForm.name}` : 'Form Preview'}
        footer={(
          <div className="flex justify-between items-center w-full">
            <span className="text-[9px] text-slate-400 italic">This is an active ClickUp form integration mockup. No data is stored outside the demo session.</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setActiveFormId(null)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={() => { alert('Form submitted! Routed to designated department head queue.'); setActiveFormId(null); }}>
                Submit Form entry
              </Button>
            </div>
          </div>
        )}
      >
        {selectedForm ? (
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 border border-indigo-200 text-[10px] leading-relaxed font-bold rounded-lg text-indigo-950">
              ⚡ Automated Trigger: {selectedForm.triggeredWorkflow}
            </div>

            <div className="space-y-4">
              {selectedForm.fields.map((f, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <label className="block font-bold text-slate-600 uppercase tracking-wide">
                    {f.label} {f.required && <span className="text-rose-500">*</span>}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea rows={3} placeholder={f.label} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600" />
                  ) : f.type === 'select' ? (
                    <select className="w-full bg-white border border-slate-210 border-slate-200 rounded-lg p-2 text-xs focus:outline-none">
                      {f.options?.map((opt, oIdx) => <option key={oIdx} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} placeholder={f.label} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500">Document registry loading error.</p>
        )}
      </Modal>

      {/* SOP Detail Inspect Modal */}
      <Modal
        isOpen={activeSopId !== null}
        onClose={() => setActiveSopId(null)}
        title={selectedSop ? `${selectedSop.docCode}: ${selectedSop.name}` : 'SOP Document inspection'}
      >
        {selectedSop ? (
          <div className="space-y-4 text-xs font-semibold">
            <div className="p-3 bg-slate-105 bg-slate-100 border border-slate-200 rounded-lg">
              <strong>Owner Department Unit:</strong> {selectedSop.department}
            </div>
            
            <div className="p-4 bg-indigo-50/20 border border-indigo-50 text-slate-700 rounded-lg leading-relaxed whitespace-pre-line font-medium text-[11px]">
              {selectedSop.content}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500">SOP loading error.</p>
        )}
      </Modal>

    </div>
  );
};
export default FormsAndSOPs;
