import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'orange' | 'blue' | 'red' | 'yellow' | 'gray' | 'purple';
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gray', id }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide';
  
  const colors = {
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-250',
    orange: 'bg-amber-50 text-amber-700 border border-amber-250',
    blue: 'bg-sky-50 text-sky-700 border border-sky-250',
    red: 'bg-rose-50 text-rose-700 border border-rose-250',
    yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-250',
    gray: 'bg-slate-100 text-slate-755 border border-slate-200',
    purple: 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-250'
  };

  return (
    <span id={id} className={`${baseClasses} ${colors[variant]}`}>
      {children}
    </span>
  );
};

export function getStatusVariant(status: string): 'green' | 'orange' | 'blue' | 'red' | 'yellow' | 'gray' | 'purple' {
  const normState = status.toLowerCase();
  
  if (['approved', 'completed', 'active', 'green', 'verified', 'resolved'].includes(normState)) {
    return 'green';
  }
  if (['pending', 'submitted', 'interview stage', 'new request', 'orange', 'amber'].includes(normState)) {
    return 'orange';
  }
  if (['under review', 'finance review', 'acknowledged', 'blue', 'onboarding', 'in progress', 'offer sent'].includes(normState)) {
    return 'blue';
  }
  if (['rejected', 'escalated', 'critical', 'red', 'overdue', 'high risk'].includes(normState)) {
    return 'red';
  }
  if (['medium', 'high', 'more information needed', 'waiting on sender', 'yellow'].includes(normState)) {
    return 'yellow';
  }
  if (['on hold', 'draft', 'gray', 'none', 'pilot'].includes(normState)) {
    return 'gray';
  }
  return 'purple';
}
