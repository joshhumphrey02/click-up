import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  id?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  size = 'md',
  variant = 'blue',
  id
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const bgColors = {
    blue: 'bg-sky-600',
    green: 'bg-emerald-600',
    amber: 'bg-amber-500',
    red: 'bg-rose-600',
    purple: 'bg-fuchsia-700'
  };

  return (
    <div id={id} className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-slate-700">
          <span>{label}</span>
          <span>{clampedProgress}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClasses[size]}`}>
        <div
          className={`h-full transition-all duration-500 rounded-full ${bgColors[variant]}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;
