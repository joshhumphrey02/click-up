import React, { useState } from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { UserRole } from '../types';
import { 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Mail, 
  Eye, 
  EyeOff, 
  UserCheck,
  ShieldCheck,
  Sparkle
} from 'lucide-react';
import { toast } from 'sonner';

interface Persona {
  role: UserRole;
  name: string;
  title: string;
  email: string;
  pass: string;
  color: string;
  bg: string;
}

export const Login: React.FC = () => {
  const { login } = useCommandCenter();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const personas: Persona[] = [
    {
      role: 'Executive Management',
      name: 'Daniel Eze',
      title: 'CEO',
      email: 'daniel.eze@atma-ops.com',
      pass: 'ceo_secure_2026',
      color: 'text-[#7C3AED]',
      bg: 'bg-purple-50'
    },
    {
      role: 'Department Manager',
      name: 'Ada Okafor',
      title: 'Operations & HR Lead',
      email: 'ada.okafor@atma-ops.com',
      pass: 'manager_operations',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      role: 'End User',
      name: 'Chinedu Nwosu',
      title: 'Operational Specialist',
      email: 'chinedu.nwosu@atma-ops.com',
      pass: 'ops_specialist_99',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      role: 'Vendor Guest',
      name: 'Silas Thorne',
      title: 'Third-Party Contractor',
      email: 'silas.thorne@contractor.com',
      pass: 'guest_vendor_77',
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      role: 'System Administrator',
      name: 'Alex Mercer',
      title: 'Workspace Admin',
      email: 'alex.mercer@atma-ops.com',
      pass: 'sysadmin_secure_pass',
      color: 'text-slate-600',
      bg: 'bg-slate-100'
    }
  ];

  const handleAutofill = (p: Persona) => {
    setEmailInput(p.email);
    setPasswordInput(p.pass);
    setErrorText(null);
    toast.success(`Loaded credentials for ${p.name}`);
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText(null);

    if (!emailInput.trim()) {
      setErrorText('Please enter your workspace email address.');
      return;
    }
    if (!passwordInput) {
      setErrorText('Please enter your password.');
      return;
    }

    const match = personas.find(
      (p) => p.email.toLowerCase() === emailInput.trim().toLowerCase()
    );

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      if (match) {
        if (passwordInput === match.pass) {
          login(match.role);
          toast.success(`Signed in as ${match.name}`);
        } else {
          setErrorText('Invalid Password. Please check selected profile password.');
        }
      } else {
        if (emailInput.includes('@') && passwordInput.length >= 4) {
          login('End User');
          toast.info('Signed in with Standard End-User permissions.');
        } else {
          setErrorText('Workspace account not found. Select a profile below to auto-fill.');
        }
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-center relative font-sans select-none antialiased py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle, soft ambient background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none" />

      <div className="w-full max-w-md mx-auto relative z-10">
        
        {/* Simple Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-slate-200 shadow-xs mb-4">
            <Sparkle className="h-3.5 w-3.5 text-blue-600 fill-blue-600/10" />
            <span>ATMA Corporate Network</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            ATMA <span className="text-blue-600 block sm:inline uppercase text-xl sm:text-2xl">GLOBAL RESOURCES</span>
          </h2>
          <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">OPERATIONS HUB</p>
        </div>

        {/* Real credentials Form */}
        <div className="bg-slate-50/70 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleFormLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Work Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (errorText) setErrorText(null);
                  }}
                  placeholder="e.g. daniel.eze@atma-ops.com"
                  className="w-full bg-white border border-slate-200 hover:border-slate-355 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/10 rounded-xl py-2.5 pl-9 pr-4 text-xs font-semibold text-slate-900 placeholder-slate-400 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorText) setErrorText(null);
                  }}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 hover:border-slate-355 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/10 rounded-xl py-2.5 pl-9 pr-10 text-xs font-mono font-semibold text-slate-900 placeholder-slate-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-650"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorText && (
              <p className="text-[10px] text-rose-600 font-semibold leading-normal bg-rose-50 border border-rose-100 p-2.5 rounded-lg">
                * {errorText}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl shadow-xs transition duration-150 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Quick presentation profile quick selectors */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            Presentation Quick-Fill Profiles
          </p>
          
          <div className="space-y-2">
            {personas.map((p) => {
              const isActive = emailInput.trim().toLowerCase() === p.email.toLowerCase();
              return (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => handleAutofill(p)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                    isActive 
                      ? 'bg-slate-50 border-[#7C3AED] shadow-xs' 
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      p.role === 'Executive Management' ? 'bg-purple-500' :
                      p.role === 'Department Manager' ? 'bg-emerald-500' :
                      p.role === 'End User' ? 'bg-blue-500' :
                      p.role === 'Vendor Guest' ? 'bg-amber-500' : 'bg-slate-500'
                    }`} />
                    <div>
                      <span className="text-xs font-black text-slate-800 block leading-tight">{p.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{p.title} ({p.role})</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[9px] text-[#7C3AED] font-bold block bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full uppercase leading-none">
                      Autofill
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
export default Login;
