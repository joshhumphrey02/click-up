import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  id,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50',
    secondary: 'bg-blue-50 text-blue-900 hover:bg-blue-100 focus:ring-blue-200 disabled:opacity-50',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 disabled:opacity-50',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 disabled:opacity-50',
    outline: 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:ring-slate-400 disabled:opacity-50',
    purple: 'bg-fuchsia-700 text-white hover:bg-fuchsia-800 focus:ring-fuchsia-700 disabled:opacity-50'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  return (
    <button
      id={id}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
