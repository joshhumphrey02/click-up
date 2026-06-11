import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  description?: string;
  trend?: {
    text: string;
    isPositive: boolean;
  };
  variant?: 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'fuchsia';
  id?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  description,
  trend,
  variant = 'blue',
  id
}) => {
  const highlightStyles = {
    blue: 'border-l-4 border-l-sky-500 text-sky-600 bg-sky-50/40',
    emerald: 'border-l-4 border-l-emerald-500 text-emerald-600 bg-emerald-50/40',
    amber: 'border-l-4 border-l-amber-500 text-amber-600 bg-amber-50/40',
    rose: 'border-l-4 border-l-rose-500 text-rose-600 bg-rose-50/40',
    indigo: 'border-l-4 border-l-indigo-800 text-indigo-800 bg-indigo-50/40',
    fuchsia: 'border-l-4 border-l-fuchsia-500 text-fuchsia-600 bg-fuchsia-50/40'
  };

  return (
    <div id={id} className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-start gap-4 transition-transform hover:translate-y-[-1px]`}>
      <div className={`p-3 rounded-lg ${highlightStyles[variant]}`}>
        <Icon className="h-5 w-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        <h4 className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">{value}</h4>
        
        {description && (
          <p className="mt-1 text-xs text-slate-500 truncate">{description}</p>
        )}

        {trend && (
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className={`text-xs font-medium ${
                trend.isPositive ? 'text-emerald-600' : 'text-rose-650'
              }`}
            >
              {trend.text}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
