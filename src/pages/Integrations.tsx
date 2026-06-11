import React, { useState, useRef } from 'react';
import {
  Link2,
  CheckCircle2,
  ArrowRight,
  Database,
  Workflow,
  Settings,
  FileSpreadsheet,
  Calendar,
  Send,
  Smartphone,
  CheckCheck,
  UploadCloud,
  FileText,
  Cloud,
  MessageSquare,
  Eye,
  Download,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { useCommandCenter } from '../context/CommandCenterContext';

interface SampleSheetPreset {
  id: string;
  name: string;
  space: 'HR-OPS' | 'HSE-COMPLIANCE' | 'PMO-TRACKER';
  headers: string[];
  rows: Record<string, string>[];
}

interface StorageFile {
  id: string;
  name: string;
  size: string;
  type: string;
  space: string;
  driveUrl: string;
  uploadedAt: string;
}

export const Integrations: React.FC = () => {
  const {
    meetings,
    hseIncidents,
    onboardingTasks,
    purchaseRequests,
    addMeeting,
    addHseIncident,
    addOnboardingTask,
    clearNotifications,
    notificationsList
  } = useCommandCenter();

  // Active Integration Navigation Tabs
  const [activeTab, setActiveTab] = useState<'sheets' | 'calendar_drive' | 'whatsapp'>('sheets');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Google Calendar Integration Mock States
  const [syncLogs, setSyncLogs] = useState<string[]>([
    'System init: Synchronized current operational workspace calendar.',
    'Synced board meeting schedule "Q2 Strategic Board Review" with Google Calendar api credentials.'
  ]);
  const [newCalendarEvent, setNewCalendarEvent] = useState({
    title: '',
    date: '',
    time: '',
    platform: 'Google Meet' as 'Zoom' | 'Google Meet' | 'Microsoft Teams',
    agenda: '',
    attendees: ''
  });

  // Google Drive Mock Files States
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [driveFiles, setDriveFiles] = useState<StorageFile[]>([
    { id: 'DRV-101', name: 'Safe_Field_Operations_Manual_v4.pdf', size: '4.8 MB', type: 'application/pdf', space: 'HSE-COMPLIANCE', driveUrl: 'https://drive.google.com/file/d/demo101', uploadedAt: '2 days ago' },
    { id: 'DRV-102', name: 'HOD_Talent_Acquisition_Framework.docx', size: '1.2 MB', type: 'application/vnd.openxmlformats-officedocument', space: 'HR-OPS', driveUrl: 'https://drive.google.com/file/d/demo102', uploadedAt: '1 day ago' },
    { id: 'DRV-103', name: 'Capex_Procurement_Invoices_Summary_2026.xlsx', size: '2.5 MB', type: 'spreadsheet', space: 'Procurement-PRs', driveUrl: 'https://drive.google.com/file/d/demo103', uploadedAt: '4 hours ago' }
  ]);
  const [fileFilterSpace, setFileFilterSpace] = useState<string>('All');

  // Spreadsheet Integration Presets
  const sheetPresets: SampleSheetPreset[] = [
    {
      id: 'hse_safety',
      name: 'HSE Safety Incident Register Template',
      space: 'HSE-COMPLIANCE',
      headers: ['Title', 'Incident Type', 'Risk Level', 'Location', 'Action Owner', 'Description'],
      rows: [
        {
          Title: 'Excessive scaffolding vibration observed',
          'Incident Type': 'Near Miss',
          'Risk Level': 'High',
          Location: 'Sector 4 Hydrocarbon Tower',
          'Action Owner': 'Maryam Bello',
          Description: 'Wind speeds reached 35kts causing severe platform shake. Anchoring cables require inspection.'
        },
        {
          Title: 'Chemical pipeline gauge pressure spike',
          'Incident Type': 'Environmental',
          'Risk Level': 'Critical',
          Location: 'De-sulfurization Control Station',
          'Action Owner': 'Daniel Eze',
          Description: 'Line 4.2 pressure spiked above 240 PSI. Emergency shutoff valve test checklist completed.'
        }
      ]
    },
    {
      id: 'hr_hires',
      name: 'Talent Acquisition & Onboarding Template',
      space: 'HR-OPS',
      headers: ['Full Name', 'Target Position', 'Department', 'Contract Type', 'Priority'],
      rows: [
        {
          'Full Name': 'Kelechi Nwosu',
          'Target Position': 'Lead Piping Engineer',
          Department: 'Engineering Operations',
          'Contract Type': 'Full-time',
          Priority: 'High'
        },
        {
          'Full Name': 'Amina Yusuf',
          'Target Position': 'Senior Quality Lead',
          Department: 'Compliance & Safety',
          'Contract Type': 'Contract',
          Priority: 'Medium'
        }
      ]
    }
  ];

  // Active Grid Data Editing States
  const [selectedPresetId, setSelectedPresetId] = useState<string>('hse_safety');
  const [gUrl, setGUrl] = useState<string>('https://docs.google.com/spreadsheets/d/1BxiM3rwyx76mO0_pCXRnR9yuv-demoLink123');
  const [gridData, setGridData] = useState<Record<string, string>[]>(sheetPresets[0].rows);
  const [gridHeaders, setGridHeaders] = useState<string[]>(sheetPresets[0].headers);
  const [processingSync, setProcessingSync] = useState<boolean>(false);

  // Load Preset Details onto Spreadsheet Input Fields
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = sheetPresets.find(p => p.id === presetId);
    if (preset) {
      setGridData(JSON.parse(JSON.stringify(preset.rows)));
      setGridHeaders(preset.headers);
    }
  };

  // Live editing cells inside spreadsheet grid
  const handleCellEdit = (rowIndex: number, column: string, newValue: string) => {
    setGridData(prev => {
      const copy = [...prev];
      copy[rowIndex] = { ...copy[rowIndex], [column]: newValue };
      return copy;
    });
  };

  // Simulate pushing parsed spreadsheet data directly into standard live space catalogs!
  const handleSyncToWorkspace = () => {
    if (gridData.length === 0) {
      showToast('Error: No spreadsheet data loaded to push.');
      return;
    }

    setProcessingSync(true);
    const activePreset = sheetPresets.find(p => p.id === selectedPresetId);
    const targetSpace = activePreset ? activePreset.space : 'HSE-COMPLIANCE';

    setTimeout(() => {
      let addedCount = 0;

      gridData.forEach(row => {
        if (targetSpace === 'HSE-COMPLIANCE') {
          addHseIncident({
            title: row['Title'] || 'Imported Hazard Log',
            type: (row['Incident Type'] as any) || 'Near Miss',
            riskLevel: (row['Risk Level'] as any) || 'Medium',
            location: row['Location'] || 'On-site Field',
            correctiveActionOwner: row['Action Owner'] || 'Maryam Bello',
            closeOutDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
            description: row['Description'] || 'Imported via active Google Spreadsheet Synchronization script.'
          });
          addedCount++;
        } else if (targetSpace === 'HR-OPS') {
          addOnboardingTask({
            name: row['Full Name'] || 'Unknown Candidate',
            position: row['Target Position'] || 'Assigned Officer',
            department: row['Department'] || 'Operations Desk',
            status: 'New Request',
            startDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
            contractType: (row['Contract Type'] as any) || 'Full-time',
            probationEnd: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
            owner: 'Ada Okafor',
            priority: (row['Priority'] as any) || 'Medium',
            approvalStatus: 'Pending'
          });
          addedCount++;
        }
      });

      setProcessingSync(false);
      showToast(`Success: Synced ${addedCount} records from Spreadsheet to ClickUp ${targetSpace}!`);
    }, 1500);
  };

  // Export actual client Workspace data as a downloadable formatted Spreadsheet (CSV)
  const handleDownloadWorkspaceCSV = (space: 'HSE' | 'PR' | 'ONB' | 'MEET') => {
    let sourceData: any[] = [];
    let filename = '';

    if (space === 'HSE') {
      sourceData = hseIncidents;
      filename = 'clickup_hse_compliance_log.csv';
    } else if (space === 'PR') {
      sourceData = purchaseRequests;
      filename = 'clickup_procurement_pr_register.csv';
    } else if (space === 'ONB') {
      sourceData = onboardingTasks;
      filename = 'clickup_hr_recruitment_registry.csv';
    } else if (space === 'MEET') {
      sourceData = meetings;
      filename = 'clickup_meetings_agendas_schedule.csv';
    }

    if (sourceData.length === 0) {
      showToast('No active records to download.');
      return;
    }

    // Transform json to formatted CSV string
    const headers = Object.keys(sourceData[0]).filter(k => k !== 'comments' && k !== 'thread').join(',');
    const rows = sourceData.map(item => {
      return Object.keys(item)
        .filter(k => k !== 'comments' && k !== 'thread')
        .map(key => {
          let val = item[key];
          if (typeof val === 'object' && val !== null) {
            val = JSON.stringify(val);
          }
          let str = String(val ?? '');
          if (str.includes(',') || str.includes('\n') || str.includes('"')) {
            str = `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        }).join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Spreadsheet exported: ${filename} downloaded!`);
  };

  // Google Calendar scheduling logic
  const handleScheduleGoogleEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCalendarEvent.title || !newCalendarEvent.date) {
      showToast('Please fill out Title and Date to schedule.');
      return;
    }

    // Update Workspace Meetings via context, which triggers global notification and saves to our list
    addMeeting({
      title: newCalendarEvent.title,
      department: 'Group Administration',
      date: newCalendarEvent.date,
      time: newCalendarEvent.time || '10:00',
      platform: newCalendarEvent.platform,
      agenda: newCalendarEvent.agenda || 'Regular synchronization of operational project parameters.',
      attendees: newCalendarEvent.attendees ? newCalendarEvent.attendees.split(',').map(s => s.trim()) : ['Daniel Eze', 'Ada Okafor']
    });

    // Add log entry directly to Google Calendar sync history
    const logMsg = `Google Calendar synchronization successful: "${newCalendarEvent.title}" scheduled, dynamic Zoom/Meet token auto-created.`;
    setSyncLogs(prev => [logMsg, ...prev]);

    // Clear event form fields
    setNewCalendarEvent({
      title: '',
      date: '',
      time: '',
      platform: 'Google Meet',
      agenda: '',
      attendees: ''
    });

    showToast('Success: Scheduled event synced with Google Calendar!');
  };

  // Google Drive Drag/Drop & Manual File Management Simulation
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFiles(e.dataTransfer.files);
    }
  };

  const handleManualFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFiles(e.target.files);
    }
  };

  const processUploadedFiles = (files: FileList) => {
    const file = files[0];
    setUploadProgress(10);
    
    // Animate fake progress increments rapidly
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const spaces = ['HSE-COMPLIANCE', 'HR-OPS', 'Procurement-PRs', 'PMO-TRACKER'];
            const randomSpace = spaces[Math.floor(Math.random() * spaces.length)];
            const newFile: StorageFile = {
              id: `DRV-${Math.floor(104 + Math.random() * 80)}`,
              name: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              type: file.type || 'application/octet-stream',
              space: randomSpace,
              driveUrl: `https://drive.google.com/file/d/demo${Math.floor(100 + Math.random() * 1000)}`,
              uploadedAt: 'Just now'
            };
            setDriveFiles(prev => [newFile, ...prev]);
            setUploadProgress(null);
            showToast(`Success: "${file.name}" synchronized to ClickUp folder on Google Drive!`);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  // Delete storage document mockup
  const handleDeleteFile = (id: string, name: string) => {
    setDriveFiles(prev => prev.filter(f => f.id !== id));
    showToast(`Removed archivals: ${name}`);
  };

  // WhatsApp Business API Message Mock Simulator States
  const [targetNumber, setTargetNumber] = useState<string>('+234 812 555 6666');
  const [targetRecipientName, setTargetRecipientName] = useState<string>('Maryam Bello');
  const [whatsAppTemplate, setWhatsAppTemplate] = useState<string>('hse_alert');
  const [customNotifyText, setCustomNotifyText] = useState<string>('');

  // Auto set phone numbers based on select contacts
  const handleSelectContact = (name: string, num: string) => {
    setTargetRecipientName(name);
    setTargetNumber(num);
  };

  const [whatsappChatHistory, setWhatsappChatHistory] = useState([
    {
      id: 'wa-1',
      sender: 'ClickUp Operations API',
      senderType: 'system',
      message: '🚨 CRITICAL SECURITY INCIDENT ESCALATION: "Electrical Fire near Sector 2 Switchgear" was logged at Main Turbine Sub-Deck. Priority level: Critical. Assigned to: Maryam Bello.',
      timestamp: '09:41 AM',
      status: 'Read'
    },
    {
      id: 'wa-2',
      sender: 'ClickUp Operations API',
      senderType: 'system',
      message: '💰 BUDGET NOTIFICATION LIMIT EXCEEDED: PR-8902 (Replacing Cisco Core Switches) of value ₦14,500,000 exceeds standard budget thresholds. Sent for Joint Board Executive Approval.',
      timestamp: '11:15 AM',
      status: 'Read'
    }
  ]);

  // Construct message preview or payload based on selected templates
  const getTemplatePreviewMessage = () => {
    switch (whatsAppTemplate) {
      case 'hse_alert':
        return `🚨 CRITICAL SAFETY BRIEFING: [Topic] hazard logged at [Location]. Emergency Escalation is active. Actions requested immediately!`;
      case 'procurement_warning':
        return `💰 APPROVAL BYPASS NOTICE: Procurement Docket [Ref] value exceeds limit threshold. Handed over to Executive Command Center.`;
      case 'meeting_brief':
        return `📅 CLICKUP AGENDA BRIEFING: Regular virtual [Title] scheduled at [Time] via [Platform]. All directors must join. Direct link dispatched on calendar.`;
      case 'custom':
        return customNotifyText || 'Enter custom notification payload details...';
      default:
        return '';
    }
  };

  // Dispatch live WhatsApp Simulator Notice
  const handleDispatchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMsg = getTemplatePreviewMessage()
      .replace('[Topic]', 'Pipeline Pressure Release Valve Spike')
      .replace('[Location]', 'Ikoyi Substation Block B')
      .replace('[Ref]', 'PR-8902')
      .replace('[Title]', 'Bi-Weekly HSE Audit Session')
      .replace('[Time]', '14:30 PM')
      .replace('[Platform]', 'Google Meet');

    if (!targetNumber.trim()) {
      showToast('Error: Recipient phone number or contact mandatory.');
      return;
    }

    const newWAMessage = {
      id: `wa-${Date.now()}`,
      sender: 'ClickUp Operations API',
      senderType: 'system',
      message: `${cleanMsg}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Delivered'
    };

    setWhatsappChatHistory(prev => [...prev, newWAMessage]);
    showToast(`WhatsApp Message Dispatched to ${targetRecipientName} (${targetNumber})!`);

    // Simulate "Read" status tick mark switch after 1.5 seconds!
    setTimeout(() => {
      setWhatsappChatHistory(curr => curr.map(m => {
        if (m.id === newWAMessage.id) return { ...m, status: 'Read' };
        return m;
      }));
    }, 1500);
  };

  const filteredDriveFiles = fileFilterSpace === 'All' 
    ? driveFiles 
    : driveFiles.filter(f => f.space === fileFilterSpace);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-slate-700 animate-fade-in">
      
      {/* Toast popup */}
      {toast && (
        <div className="fixed top-4 right-4 bg-slate-900 border border-indigo-500 text-white p-4.5 rounded-xl shadow-2xl z-50 animate-fade-in text-xs font-bold flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <span className="text-[10px] bg-indigo-100 text-[#7C3AED] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Connected API Ecosystem Hub
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">Unified Workspace Integrations</h2>
          <p className="text-xs text-slate-500 mt-1 font-semibold leading-relaxed">
            Configure real spreadsheet data uploads/exports, synchronize team agendas to Google Calendar, archive documents on Google Drive, and dispatch live WhatsApp bot notification threads.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <Badge variant="emerald">Enterprise Gateway Active</Badge>
        </div>
      </div>

      {/* Quick Integration KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 select-none shadow-3xs">
        <StatCard
          icon={FileSpreadsheet}
          value="4 Channels"
          label="Spreadsheet Exporters"
          description="Excel & CSV registers sync ready"
          variant="indigo"
        />
        <StatCard
          icon={Calendar}
          value={`${meetings.length} Scheduled`}
          label="Google Calendar Events"
          description="Agendas synced with Meet"
          variant="amber"
        />
        <StatCard
          icon={Cloud}
          value={`${driveFiles.length} Archives`}
          label="Google Drive Documents"
          description="Auto-backed up policy pdfs"
          variant="blue"
        />
        <StatCard
          icon={Smartphone}
          value="WhatsApp API"
          label="Active Webhook Triggers"
          description="Simulating Twilio routing"
          variant="emerald"
        />
      </div>

      {/* Tab Selector Header */}
      <div className="flex border-b border-slate-200 gap-1 bg-white p-1 rounded-xl border">
        <button
          onClick={() => setActiveTab('sheets')}
          className={`px-4.5 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'sheets'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="h-4 w-4" /> Spreadsheet & Google Sheets Sync
        </button>

        <button
          onClick={() => setActiveTab('calendar_drive')}
          className={`px-4.5 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'calendar_drive'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Calendar className="h-4 w-4" /> Google Calendar & Drive Backup
        </button>

        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`px-4.5 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'whatsapp'
              ? 'bg-[#7C3AED] text-white shadow-xs'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Smartphone className="h-4 w-4" /> WhatsApp Business Dispatcher
        </button>
      </div>

      {/* MAIN SCREEN GRID PANES */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Active Workspace Interactive Area (Housed inside 8 cols) */}
        <div className="lg:col-span-8 space-y-6">

          {/* TAB 1: SPREADSHEETS AND GOOGLE SHEETS */}
          {activeTab === 'sheets' && (
            <Card className="bg-white border border-slate-200">
              <CardHeader className="bg-slate-50/50 p-5 border-b border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-tight">
                      Google Sheets Live Synced Data Grid
                    </CardTitle>
                    <p className="text-[11px] text-slate-505 font-medium mt-0.5 leading-relaxed">
                      Sync direct spreadsheet records into operational directories. Select a template structure, edit cell grids, and ingest rows to real-time workspaces instantly.
                    </p>
                  </div>
                  <Badge variant="indigo">Bi-Directional Sync Ready</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-5">
                
                {/* Google Spreadsheet URL Integration Input */}
                <div className="grid md:grid-cols-2 gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 block">
                      Google Sheet Reference Shared Link
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={gUrl}
                        onChange={(e) => setGUrl(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-3 py-2 text-xs font-semibold rounded-lg pr-8 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                        placeholder="Paste shared drive file link..."
                      />
                      <Sparkles className="absolute right-2.5 top-2.5 h-4 w-4 text-purple-600 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 block">
                      Data Sheet Layout Structure Preset
                    </label>
                    <select
                      value={selectedPresetId}
                      onChange={(e) => handleSelectPreset(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 text-xs font-bold rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                    >
                      {sheetPresets.map(preset => (
                        <option key={preset.id} value={preset.id}>{preset.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* EDITABLE SPREADSHEET TABLE GRID CONTAINER */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="bg-slate-100/60 p-3.5 border-b border-slate-150 flex items-center justify-between text-xs font-black">
                    <span className="text-slate-700 flex items-center gap-1.5 font-black uppercase text-[10px] tracking-wide">
                      <FileSpreadsheet className="h-4 w-4 text-emerald-650" />
                      Live Spreadsheet Editor Sandbox
                    </span>
                    <Badge variant="emerald">Cells Fully Editable</Badge>
                  </div>

                  <div className="overflow-x-auto min-h-[160px]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] uppercase text-slate-500 border-b border-slate-200 tracking-wider">
                          <th className="p-3 text-center w-12 font-black">Row</th>
                          {gridHeaders.map((head, i) => (
                            <th key={i} className="p-3 font-black">{head}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150">
                        {gridData.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-indigo-50/15 transition">
                            <td className="p-3 text-center text-slate-400 font-bold bg-slate-50 border-r border-slate-200 text-[10px]">
                              {rowIdx + 1}
                            </td>
                            {gridHeaders.map((head, colIdx) => (
                              <td key={colIdx} className="p-2 min-w-[140px]">
                                <input
                                  type="text"
                                  value={row[head] || ''}
                                  onChange={(e) => handleCellEdit(rowIdx, head, e.target.value)}
                                  className="w-full bg-transparent px-2 py-1 rounded hover:bg-slate-50 focus:bg-white focus:ring-1 focus:ring-[#7C3AED] border-0 text-xs font-semibold text-slate-800"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Empty/Add actions detail info */}
                  <div className="bg-slate-50/60 p-3 border-t border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-500">
                    <span className="flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5 text-blue-500" />
                      Double-click values or select individual boxes to edit spreadsheet content inline.
                    </span>
                    <button
                      onClick={() => {
                        const emptyRow: Record<string, string> = {};
                        gridHeaders.forEach(h => { emptyRow[h] = ''; });
                        setGridData([...gridData, emptyRow]);
                        showToast('Added empty row to Google Sheets mock.');
                      }}
                      className="text-[#7C3AED] hover:underline cursor-pointer"
                    >
                      + Add New Row
                    </button>
                  </div>
                </div>

                {/* Action panel triggers */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3.5 border-t border-slate-100">
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={handleSyncToWorkspace}
                      disabled={processingSync}
                      className="px-4.5 py-2.5 bg-[#7C3AED] hover:bg-[#6D30D9] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-xs hover:shadow-sm transition duration-150 flex items-center gap-2 disabled:opacity-55 cursor-pointer"
                    >
                      {processingSync ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Ingesting Spreadsheet Data...
                        </>
                      ) : (
                        <>
                          <UploadCloud className="h-4 w-4" /> Sync to Workspace Tasks
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleSelectPreset(selectedPresetId)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase transition"
                    >
                      Reset Draft Changes
                    </button>
                  </div>

                  <div className="text-right text-[10.5px] text-slate-400 font-semibold italic">
                    Pushing spreadsheet rows updates corresponding HSE and HR workspaces instantaneously.
                  </div>
                </div>

                {/* EXPORT DIRECTORIES PANELS */}
                <div className="bg-indigo-50/15 border border-indigo-100 rounded-2xl p-5 mt-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                      <Download className="h-4.5 w-4.5 text-[#7C3AED]" /> Live ClickUp Spreadsheet Download Register
                    </h4>
                    <p className="text-[10.5px] text-slate-500 font-semibold leading-relaxed mt-1">
                      Export currently accumulated operational workspace datasets as fully tabular Excel legacy backup sheets. Data downloads as formatted .csv files which integrate directly into local ERP templates.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => handleDownloadWorkspaceCSV('HSE')}
                      className="p-3 bg-white hover:bg-[#7C3AED]/5 border border-slate-200 hover:border-[#7C3AED] rounded-xl text-left transition select-none cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase text-[8px] blocking">Tabular Sheets</span>
                        <h5 className="font-black text-slate-800 text-xs leading-snug mt-1">HSE Incident Log</h5>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-black mt-3 block flex items-center gap-1">
                        <Download className="h-3 w-3" /> {hseIncidents.length} rows .CSV
                      </span>
                    </button>

                    <button
                      onClick={() => handleDownloadWorkspaceCSV('PR')}
                      className="p-3 bg-white hover:bg-[#7C3AED]/5 border border-slate-200 hover:border-[#7C3AED] rounded-xl text-left transition select-none cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase text-[8px] blocking">Budget Sheets</span>
                        <h5 className="font-black text-slate-800 text-xs leading-snug mt-1">Procurement</h5>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-black mt-3 block flex items-center gap-1">
                        <Download className="h-3 w-3" /> {purchaseRequests.length} rows .CSV
                      </span>
                    </button>

                    <button
                      onClick={() => handleDownloadWorkspaceCSV('ONB')}
                      className="p-3 bg-white hover:bg-[#7C3AED]/5 border border-slate-200 hover:border-[#7C3AED] rounded-xl text-left transition select-none cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase text-[8px] blocking">Recruit Inventory</span>
                        <h5 className="font-black text-slate-800 text-xs leading-snug mt-1">HR Onboarding</h5>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-black mt-3 block flex items-center gap-1">
                        <Download className="h-3 w-3" /> {onboardingTasks.length} rows .CSV
                      </span>
                    </button>

                    <button
                      onClick={() => handleDownloadWorkspaceCSV('MEET')}
                      className="p-3 bg-white hover:bg-[#7C3AED]/5 border border-slate-200 hover:border-[#7C3AED] rounded-xl text-left transition select-none cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase text-[8px] blocking">Session List</span>
                        <h5 className="font-black text-slate-800 text-xs leading-snug mt-1">Virtual Meetings</h5>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-black mt-3 block flex items-center gap-1">
                        <Download className="h-3 w-3" /> {meetings.length} rows .CSV
                      </span>
                    </button>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          {/* TAB 2: GOOGLE CALENDAR & GOOGLE DRIVE INTEGRATIONS */}
          {activeTab === 'calendar_drive' && (
            <div className="space-y-6">
              
              {/* Grid split sub bento: Left Calendar, Right Drive */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Google Calendar Planner Widget */}
                <Card className="bg-white border border-slate-200">
                  <CardHeader className="bg-slate-50/50 p-4 border-b border-slate-200 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xs uppercase font-extrabold text-[#7C3AED]">Google Calendar Invites Dispatcher</CardTitle>
                      <p className="text-[10px] text-slate-450 font-semibold mt-0.5">Auto synchronizing operations agendas</p>
                    </div>
                    <Badge variant="blue">OAUTH CONNECTED</Badge>
                  </CardHeader>
                  <CardContent className="p-4.5 space-y-4">
                    
                    {/* Active list showing coming operational calendars */}
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">Sync Agenda to Google Account</span>
                      <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                        {meetings.slice(0, 3).map((meetObj, mIdx) => (
                          <div key={meetObj.id} className="p-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition border border-slate-200 text-[11px] font-bold flex justify-between items-start">
                            <div>
                              <h5 className="text-slate-900 font-extrabold truncate max-w-[150px]">{meetObj.title}</h5>
                              <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{meetObj.date} at {meetObj.time} via {meetObj.platform}</p>
                            </div>
                            <span className="text-[9px] px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 font-black rounded-full uppercase flex items-center gap-1">
                              <CheckCheck className="h-3 w-3" /> CAL-SYNC
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Simple schedule form */}
                    <form onSubmit={handleScheduleGoogleEvent} className="space-y-3 pt-3.5 border-t border-slate-200">
                      <span className="text-[9px] uppercase font-black text-[#7C3AED] block tracking-wider">Schedule New Google Calendar Meet</span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={newCalendarEvent.title}
                          onChange={(e) => setNewCalendarEvent({ ...newCalendarEvent, title: e.target.value })}
                          placeholder="Meeting Title..."
                          className="col-span-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-semibold text-xs focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
                        />
                        <input
                          type="date"
                          required
                          value={newCalendarEvent.date}
                          onChange={(e) => setNewCalendarEvent({ ...newCalendarEvent, date: e.target.value })}
                          className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-semibold text-xs focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
                        />
                        <input
                          type="time"
                          value={newCalendarEvent.time}
                          onChange={(e) => setNewCalendarEvent({ ...newCalendarEvent, time: e.target.value })}
                          placeholder="10:00"
                          className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-semibold text-xs focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
                        />
                        <select
                          value={newCalendarEvent.platform}
                          onChange={(e) => setNewCalendarEvent({ ...newCalendarEvent, platform: e.target.value as any })}
                          className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-bold text-xs focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
                        >
                          <option value="Google Meet">Google Meet</option>
                          <option value="Zoom">Zoom Link</option>
                          <option value="Microsoft Teams">MS Teams</option>
                        </select>
                        <input
                          type="text"
                          value={newCalendarEvent.attendees}
                          onChange={(e) => setNewCalendarEvent({ ...newCalendarEvent, attendees: e.target.value })}
                          placeholder="joshuahumphrey579@gmail.com, ceo@co.com"
                          className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-semibold text-xs focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-[#7C3AED] hover:bg-[#6D30D9] text-white rounded-lg text-xs font-black uppercase tracking-wider transition shadow-2xs cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Send className="h-3 w-3" /> Schedule & Sync Calendar
                      </button>
                    </form>

                  </CardContent>
                </Card>

                {/* Google Drive Archival Cloud Terminal */}
                <Card className="bg-white border border-slate-200">
                  <CardHeader className="bg-slate-50/50 p-4 border-b border-slate-200 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xs uppercase font-extrabold text-[#7C3AED]">Google Drive Live Backups</CardTitle>
                      <p className="text-[10px] text-slate-450 font-semibold mt-0.5">Archive files directly from ClickUp Tickets</p>
                    </div>
                    <Badge variant="blue">ACTIVE FOLDER</Badge>
                  </CardHeader>
                  <CardContent className="p-4.5 space-y-4">
                    
                    {/* Interactive drag & drop file uploader box */}
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-5 text-center transition duration-150 cursor-pointer flex flex-col items-center justify-center space-y-2 select-none ${
                        isDragging ? 'bg-indigo-50/30 border-[#7C3AED]' : 'bg-slate-50 hover:bg-slate-100/55 border-slate-250'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleManualFileSelect}
                        className="hidden"
                      />
                      
                      {uploadProgress !== null ? (
                        <div className="w-full space-y-2 text-xs font-black">
                          <p className="text-[#7C3AED] animate-pulse">Uploading file to Google Drive space...</p>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#7C3AED] h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                          </div>
                          <span className="text-[9px] text-slate-400">{uploadProgress}% concluded</span>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="h-7 w-7 text-indigo-500" />
                          <div>
                            <p className="text-xs font-extrabold text-slate-700">Drag & Drop files or click to upload</p>
                            <p className="text-[9.5px] text-slate-400 font-semibold mt-0.5">Supports PDF, DOCX, XLSX up to 50MB</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Synchronized Storage Files directory */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between items-center text-[9px] uppercase font-black text-slate-400">
                        <span>Synced Archivals Directory</span>
                        <div className="flex items-center gap-1">
                          <span>Filter:</span>
                          <select
                            value={fileFilterSpace}
                            onChange={(e) => setFileFilterSpace(e.target.value)}
                            className="bg-transparent font-bold cursor-pointer text-[#7C3AED] focus:outline-none"
                          >
                            <option value="All">All Spaces</option>
                            <option value="HSE-COMPLIANCE">HSE Space</option>
                            <option value="HR-OPS">HR Space</option>
                            <option value="Procurement-PRs">Procurement</option>
                            <option value="PMO-TRACKER">Project Tracker</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                        {filteredDriveFiles.map((fileObj) => (
                          <div key={fileObj.id} className="p-2 bg-slate-50 border border-slate-150 rounded-lg hover:bg-slate-100 transition flex items-center justify-between text-xs font-semibold">
                            <div className="flex items-center gap-2 max-w-[190px]">
                              <FileText className="h-4 w-4 text-indigo-700 shrink-0" />
                              <div className="truncate">
                                <h6 className="font-extrabold text-slate-800 text-[10.5px] truncate">{fileObj.name}</h6>
                                <p className="text-[9px] text-slate-400 font-semibold">
                                  {fileObj.size} · {fileObj.space}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <a
                                href={fileObj.driveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 text-slate-400 hover:text-[#7C3AED] hover:bg-indigo-50 rounded"
                                title="Open Drive Link"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </a>
                              <button
                                onClick={() => handleDeleteFile(fileObj.id, fileObj.name)}
                                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                                title="Delete Sync Account"
                              >
                                <span className="text-[10px]">&times;</span>
                              </button>
                            </div>
                          </div>
                        ))}
                        {filteredDriveFiles.length === 0 && (
                          <p className="text-center p-6 text-slate-400 text-[10px] italic">No archived documents found for selected space.</p>
                        )}
                      </div>
                    </div>

                  </CardContent>
                </Card>

              </div>

              {/* API SYNC EVENTS LIST */}
              <Card className="bg-white border border-slate-200">
                <CardHeader className="bg-slate-50/50 p-4 border-b border-slate-100 flex flex-row items-center justify-between">
                  <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Google Sync Log Records</CardTitle>
                  <button
                    onClick={() => { setSyncLogs([]); showToast('Sync log cleared.'); }}
                    className="text-[10px] font-black text-[#7C3AED] hover:underline cursor-pointer"
                  >
                    Clear Log History
                  </button>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="bg-slate-900 text-emerald-400 font-mono text-[9.5px] p-3 rounded-lg space-y-1.5 h-[100px] overflow-y-auto leading-relaxed scrollbar-thin">
                    {syncLogs.map((logLine, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-slate-500 select-none">[{new Date().toLocaleTimeString()}]</span>
                        <span className="text-slate-300">✔ {logLine}</span>
                      </div>
                    ))}
                    {syncLogs.length === 0 && (
                      <div className="text-slate-500 italic text-center py-4">Logs buffer empty. Synchronize calendars or documents above to populate logs.</div>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          )}

          {/* TAB 3: WHATSAPP BUSINESS DISPATCHER */}
          {activeTab === 'whatsapp' && (
            <Card className="bg-white border border-slate-200">
              <CardHeader className="bg-slate-50/50 p-5 border-b border-slate-200">
                <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-tight">WhatsApp / Twilio Webhook Dispatch Cockpit</CardTitle>
                <p className="text-[11px] text-slate-505 font-medium mt-0.5 leading-relaxed animate-fade-in">
                  Simulate dispatching urgent ClickUp automation alerts to HODs and executives on their mobile phones. Select templates, target numbers, and test messaging pathways.
                </p>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  
                  {/* Left Column Controls */}
                  <form onSubmit={handleDispatchWhatsApp} className="space-y-4">
                    
                    {/* Select active contact templates */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">Nigeria Workspace Hot-Contacts Directory</span>
                      <div className="grid grid-cols-2 gap-2 select-none">
                        <button
                          type="button"
                          onClick={() => handleSelectContact('Daniel Eze (CEO)', '+234 803 111 2222')}
                          className={`p-2.5 rounded-lg border text-left text-xs font-bold leading-none select-none cursor-pointer transition ${
                            targetNumber === '+234 803 111 2222' ? 'bg-indigo-50 border-[#7C3AED] text-[#7C3AED]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <h6 className="font-extrabold">Daniel Eze</h6>
                          <p className="text-[9px] text-slate-400 mt-1">CEO / Exec Director</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectContact('Maryam Bello (SOP)', '+234 812 555 6666')}
                          className={`p-2.5 rounded-lg border text-left text-xs font-bold leading-none select-none cursor-pointer transition ${
                            targetNumber === '+234 812 555 6666' ? 'bg-indigo-50 border-[#7C3AED] text-[#7C3AED]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <h6 className="font-extrabold">Maryam Bello</h6>
                          <p className="text-[9px] text-slate-400 mt-1">HSE Safety Lead</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectContact('Ada Okafor (HR)', '+234 809 333 4444')}
                          className={`p-2.5 rounded-lg border text-left text-xs font-bold leading-none select-none cursor-pointer transition ${
                            targetNumber === '+234 809 333 4444' ? 'bg-indigo-50 border-[#7C3AED] text-[#7C3AED]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <h6 className="font-extrabold">Ada Okafor</h6>
                          <p className="text-[9px] text-slate-400 mt-1">HR Operations HOD</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectContact('Silas Engineering', '+44 7911 888999')}
                          className={`p-2.5 rounded-lg border text-left text-xs font-bold leading-none select-none cursor-pointer transition ${
                            targetNumber === '+44 7911 888999' ? 'bg-indigo-50 border-[#7C3AED] text-[#7C3AED]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <h6 className="font-extrabold">Silas Thorne</h6>
                          <p className="text-[9px] text-slate-400 mt-1">External Vendor Guest</p>
                        </button>
                      </div>
                    </div>

                    {/* Form manual entries */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-500 block">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={targetRecipientName}
                          onChange={(e) => setTargetRecipientName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-bold rounded-lg focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-500 block">Phone Number</label>
                        <input
                          type="text"
                          required
                          value={targetNumber}
                          onChange={(e) => setTargetNumber(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-bold rounded-lg focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* WhatsApp notification template */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-slate-500 block">Select Integration Trigger Pattern</label>
                      <select
                        value={whatsAppTemplate}
                        onChange={(e) => setWhatsAppTemplate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-black rounded-lg focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
                      >
                        <option value="hse_alert">HSE Critical Incident Alert (Auto-Escalated)</option>
                        <option value="procurement_warning">₦10M High-Value Procurement Bypass Approval Warning</option>
                        <option value="meeting_brief">Board Agenda Virtual Briefing Invitation</option>
                        <option value="custom">Custom Notification Template (Type manual message below)</option>
                      </select>
                    </div>

                    {whatsAppTemplate === 'custom' && (
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-550 block">Custom Message Body Payload</label>
                        <textarea
                          rows={3}
                          value={customNotifyText}
                          onChange={(e) => setCustomNotifyText(e.target.value)}
                          placeholder="Type simulated SMS push or API message details..."
                          className="w-full bg-slate-50 border border-slate-200 p-3 text-xs font-semibold rounded-lg focus:ring-1 focus:ring-[#7C3AED] focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Preview box */}
                    <div className="p-3.5 bg-indigo-50/20 border border-indigo-100 rounded-xl text-xs space-y-1 font-semibold">
                      <span className="text-[9px] uppercase font-black text-indigo-750 block">Live Webhook Payload Outflow Preview:</span>
                      <p className="text-[11px] text-slate-650 leading-relaxed italic">{getTemplatePreviewMessage()}</p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-sm select-none cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" /> Dispatch WhatsApp Instant Push Notice
                    </button>

                  </form>

                  {/* Right Column: Physical Smartphone Rendering */}
                  <div className="flex justify-center select-none">
                    <div className="relative border-[8px] border-slate-800 bg-slate-200 rounded-[35px] w-[310px] h-[520px] overflow-hidden shadow-2xl">
                      
                      {/* Speaker grill and camera layout */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-800 h-4.5 w-24 rounded-full z-30 flex items-center justify-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                        <span className="w-12 h-1 bg-slate-900 rounded-full" />
                      </div>

                      {/* Screen content */}
                      <div className="h-full flex flex-col bg-[#E5DDD5]">
                        
                        {/* Status Bar */}
                        <div className="bg-emerald-800 text-white px-5 pt-7 pb-2 flex justify-between items-center text-[10px] font-black tracking-wide z-10 shrink-0">
                          <span>09:41</span>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="h-2 w-2 rounded-full bg-white block" />
                            <span className="h-2 w-3 rounded-xs border border-white block" />
                          </div>
                        </div>

                        {/* WhatsApp Header Group */}
                        <div className="bg-[#075E54] text-white p-3 shrink-0 flex items-center gap-2.5 z-10 shadow-xs">
                          <div className="h-9 w-9 bg-teal-50 default-avatar rounded-full flex items-center justify-center font-bold text-[#075E54] text-sm shrink-0 shadow-3xs">
                            🤖
                          </div>
                          <div className="truncate flex-grow leading-tight">
                            <h5 className="font-extrabold text-[11.5px] truncate flex items-center gap-1.5">
                              ClickUp API Dispatcher
                              <span className="text-[8px] bg-emerald-500/90 text-white px-1.5 py-0.5 rounded-full font-black uppercase text-center block leading-none">
                                Bot
                              </span>
                            </h5>
                            <p className="text-[9px] text-[#25D366] font-bold animate-pulse">● Connected Online</p>
                          </div>
                        </div>

                        {/* Active chat messages box */}
                        <div className="flex-grow overflow-y-auto p-3 space-y-3 flex flex-col scrollbar-none h-[300px]">
                          <span className="text-[8.5px] font-black text-slate-500 bg-slate-200/60 p-1 px-2.5 rounded justify-center flex self-center select-none uppercase mb-1">
                            Today
                          </span>

                          {whatsappChatHistory.map((chat) => (
                            <div
                              key={chat.id}
                              className="bg-[#DCF8C6] shadow-sm self-end rounded-xl rounded-tr-none p-2.5 max-w-[240px] text-[10.5px] font-semibold text-slate-900 leading-normal flex flex-col"
                            >
                              <p className="font-bold text-slate-850 break-words">{chat.message}</p>
                              <span className="text-[8px] text-slate-400 self-end mt-1 font-bold flex items-center gap-0.5 select-none">
                                {chat.timestamp}
                                {chat.status === 'Read' ? (
                                  <CheckCheck className="h-3 w-3 text-blue-500" />
                                ) : (
                                  <CheckCheck className="h-3 w-3 text-slate-400" />
                                )}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* WhatsApp Keyboard Bottom Frame */}
                        <div className="bg-slate-100 p-2 shrink-0 border-t border-slate-200 flex items-center gap-2 select-none">
                          <div className="flex-grow bg-white border border-slate-250 rounded-full px-3 py-1.5 text-[10px] text-slate-400 font-semibold select-none">
                            Type text details...
                          </div>
                          <div className="h-7 w-7 bg-[#128C7E] rounded-full flex items-center justify-center text-white shrink-0 font-black cursor-pointer shadow-3xs">
                            <Send className="h-3.5 w-3.5" />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Right Info pane (Bento sidebar styled at 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick instructions details */}
          <Card className="bg-white border border-slate-200">
            <CardHeader className="bg-slate-50/50 p-4 border-b border-slate-100">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Integration Configuration Checkpoints</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4 font-semibold text-xs leading-relaxed select-none">
              
              <div className="p-3 bg-indigo-50/30 text-indigo-900 border border-indigo-100 rounded-xl relative">
                <strong className="block text-indigo-950">1. OAuth Scopes Verified</strong>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">Google Workspace OAuth endpoints configured for joshuahumphrey579@gmail.com. Google Sheets reading parameters accepted.</p>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-805 hover:bg-emerald-100 transition rounded-xl border border-emerald-105 relative">
                <strong className="block text-emerald-850">2. WhatsApp Route Confirmed</strong>
                <p className="text-[10px] text-emerald-700 font-semibold mt-1">API dispatch points via registered Twilio WhatsApp numbers. Direct push signals verify instantly.</p>
              </div>

              <div className="p-3 bg-slate-50 text-slate-700 rounded-xl border border-slate-200">
                <strong className="block text-slate-900">3. Local File Ingestion Engine</strong>
                <p className="text-[10px] text-slate-505 font-semibold mt-1">CSV file parser converts spreadsheet structures and inputs them directly into standard clickup spaces.</p>
              </div>

            </CardContent>
          </Card>

          {/* Active Notifications Log */}
          <Card className="bg-white border border-slate-200">
            <CardHeader className="bg-slate-50/50 p-4 border-b border-slate-100 flex justify-between items-center">
              <CardTitle className="text-xs uppercase font-extrabold text-slate-400">Live Workspace Signals</CardTitle>
              <Badge variant="blue">ACTIVE TRACK</Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                {notificationsList.slice(0, 4).map((notif, idx) => (
                  <div key={notif.id || idx} className="p-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition border border-slate-150 text-[10.5px] font-semibold leading-snug text-slate-650 relative pl-7">
                    <span className="absolute left-2.5 top-3.5 w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                    <strong>System Signal:</strong> {notif.text}
                    <p className="text-[9px] text-slate-400 font-medium mt-1 leading-none">{notif.time}</p>
                  </div>
                ))}
                {notificationsList.length === 0 && (
                  <p className="text-center p-6 text-slate-400 text-[10px] italic">No active notifications in terminal.</p>
                )}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
};

export default Integrations;
