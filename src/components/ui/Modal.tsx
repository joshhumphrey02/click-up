import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className={`relative w-full rounded-xl bg-white shadow-xl border border-slate-100 transition-all ${sizeClasses[size]}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[75vh] overflow-y-auto text-slate-650 text-sm">
            {children}
          </div>

          {/* Footer */}
          {footer !== null && (
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4 bg-slate-50 rounded-b-xl">
              {footer || (
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
