import React from 'react';
import { IncidentReport } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: IncidentReport[];
  isSirenActive: boolean;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  reports,
  isSirenActive
}) => {
  if (!isOpen) return null;

  const defaultAudits = [
    {
      time: '14:38 SGT',
      title: 'Automated Lightning Proximity Warning (<2km)',
      desc: 'Dispatched to 148 players & 6 golf marshalls via SMS gateway (Sentosa Golf Club).',
      badge: 'SMS SENT'
    },
    {
      time: '14:24 SGT',
      title: 'Rain Gauge Threshold Exceeded (38mm/hr)',
      desc: 'Recorded at Southern Islands NEA Automated Telemetry Station S117.',
      badge: 'METEOROLOGICAL'
    },
    {
      time: '13:55 SGT',
      title: 'Wet-Weather Delay Schedule Generated',
      desc: 'Projected resumption window calculated for 15:45 SGT based on Doppler rain radar trend.',
      badge: 'ALGORITHM'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400">notifications_active</span>
            <h2 className="font-headline text-lg text-slate-100 font-bold">Safety Audit Trail &amp; Logs</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-xl">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
          {/* Active Status Badge */}
          {isSirenActive && (
            <div className="p-3.5 bg-rose-950/80 text-rose-200 rounded-2xl text-xs font-label-caps flex items-center gap-2.5 border border-rose-800/80 shadow-[0_0_15px_rgba(244,63,94,0.3)] font-bold">
              <span className="material-symbols-outlined text-base text-rose-400 animate-pulse">emergency</span>
              <span>ACTIVE COURSE SIREN BROADCAST IN PROGRESS</span>
            </div>
          )}

          {/* User Submitted Reports */}
          {reports.length > 0 && (
            <div className="space-y-2">
              <span className="font-label-caps text-xs text-amber-400 block font-bold tracking-wider uppercase">
                FIELD INCIDENT DISPATCHES ({reports.length})
              </span>
              {reports.map((r) => (
                <div key={r.id} className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-xs">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-headline text-rose-300 font-bold">
                      ⚠️ {r.type} ({r.severity})
                    </span>
                    <span className="font-label-caps text-[10px] text-slate-500">{r.timestamp}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{r.notes}</p>
                  <div className="mt-2 text-[10px] font-label-caps text-sky-400 font-bold">
                    LOCATION: {r.courseName} · {r.sector} · STATUS: {r.status}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Automated System Audits */}
          <div className="space-y-2.5">
            <span className="font-label-caps text-xs text-sky-400 block font-bold tracking-wider uppercase">
              VERIFIABLE METEOROLOGICAL AUDIT TRAIL
            </span>
            {defaultAudits.map((a, i) => (
              <div key={i} className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-1.5 hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-headline text-slate-100 font-bold">{a.title}</span>
                  <span className="text-[9px] font-label-caps bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full font-bold">
                    {a.badge}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">{a.desc}</p>
                <div className="text-[10px] font-label-caps text-slate-500 font-bold">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-sky-400 text-slate-950 font-label-caps text-xs rounded-2xl font-bold hover:bg-sky-300 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] uppercase tracking-wider"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
