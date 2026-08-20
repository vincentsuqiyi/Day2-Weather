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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e201e] border border-[#3f4945] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-5 py-4 bg-[#292a28] border-b border-[#3f4945] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#94d3c1]">notifications_active</span>
            <h2 className="font-headline text-lg text-[#e2e3df]">Safety Audit Trail &amp; Logs</h2>
          </div>
          <button onClick={onClose} className="text-[#bfc9c4] hover:text-white p-1">
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
          {/* Active Status Badge */}
          {isSirenActive && (
            <div className="p-3 bg-[#93000a] text-[#ffdad6] rounded-xl text-xs font-label-caps flex items-center gap-2 border border-[#ffb4ab]">
              <span className="material-symbols-outlined text-base">emergency</span>
              <span>ACTIVE COURSE SIREN BROADCAST IN PROGRESS</span>
            </div>
          )}

          {/* User Submitted Reports */}
          {reports.length > 0 && (
            <div className="space-y-2">
              <span className="font-label-caps text-xs text-[#ffbf00] block">
                FIELD INCIDENT DISPATCHES ({reports.length})
              </span>
              {reports.map((r) => (
                <div key={r.id} className="bg-[#121412] p-3 rounded-lg border border-[#3f4945] text-xs">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-headline text-[#ffdad6] font-bold">
                      ⚠️ {r.type} ({r.severity})
                    </span>
                    <span className="font-label-caps text-[10px] text-[#89938f]">{r.timestamp}</span>
                  </div>
                  <p className="text-[#bfc9c4]">{r.notes}</p>
                  <div className="mt-2 text-[10px] font-label-caps text-[#94d3c1]">
                    LOCATION: {r.courseName} · {r.sector} · STATUS: {r.status}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Automated System Audits */}
          <div className="space-y-2">
            <span className="font-label-caps text-xs text-[#94d3c1] block">
              VERIFIABLE METEOROLOGICAL AUDIT TRAIL
            </span>
            {defaultAudits.map((a, i) => (
              <div key={i} className="bg-[#121412] p-3 rounded-lg border border-[#3f4945] text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-headline text-[#e2e3df] font-bold">{a.title}</span>
                  <span className="text-[9px] font-label-caps bg-[#004d40] text-[#94d3c1] px-1.5 py-0.5 rounded">
                    {a.badge}
                  </span>
                </div>
                <p className="text-[#bfc9c4] text-[11px]">{a.desc}</p>
                <div className="text-[10px] font-label-caps text-[#89938f]">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#292a28] border-t border-[#3f4945] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#94d3c1] text-[#00382e] font-label-caps text-xs rounded-lg font-bold hover:bg-[#afefdd]"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
