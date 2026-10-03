import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isAlert = toast.type === 'alert';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short">
      <div className={`p-4 rounded-xl shadow-xl border backdrop-blur-md flex items-start space-x-3 ${
        isSuccess 
          ? 'bg-white/95 border-emerald-300 text-slate-800 shadow-emerald-900/10' 
          : isAlert 
            ? 'bg-white/95 border-amber-300 text-slate-800 shadow-amber-900/10'
            : 'bg-white/95 border-slate-300 text-slate-800 shadow-slate-900/10'
      }`}>
        <div className="mt-0.5 shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isAlert && <AlertTriangle className="w-5 h-5 text-amber-600" />}
          {!isSuccess && !isAlert && <Info className="w-5 h-5 text-[#1E3F20]" />}
        </div>
        <div className="flex-1 pr-2">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            {toast.title || 'System Notification'}
          </h5>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            {toast.message}
          </p>
          {toast.metric && (
            <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#E8F0EC] text-[#1E3F20]">
              {toast.metric}
            </div>
          )}
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
