import React, { useState } from 'react';
import { GolfCourse } from '../types';

interface SirenModalProps {
  isOpen: boolean;
  selectedCourse: GolfCourse;
  onClose: () => void;
  onToggleSiren: (active: boolean) => void;
  isSirenActive: boolean;
}

export const SirenModal: React.FC<SirenModalProps> = ({
  isOpen,
  selectedCourse,
  onClose,
  onToggleSiren,
  isSirenActive
}) => {
  const [broadcastMessage, setBroadcastMessage] = useState(
    `[CRITICAL ALERT - SGP GOLF SHIELD] Severe lightning detected within 2km of ${selectedCourse.shortName}. Play suspended immediately. Seek nearest lightning shelter.`
  );
  const [sentCount, setSentCount] = useState(148);
  const [smsSent, setSmsSent] = useState(false);

  if (!isOpen) return null;

  const handleTrigger = () => {
    onToggleSiren(!isSirenActive);
    if (!isSirenActive) {
      setSentCount((c) => c + 12);
    }
  };

  const handlePushSMS = () => {
    setSmsSent(true);
    setTimeout(() => {
      setSmsSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-950/90 backdrop-blur-xl border border-rose-800/80 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-rose-950/80 border-b border-rose-800/80 text-rose-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-2xl text-rose-400 animate-pulse">campaign</span>
            <h2 className="font-headline text-base font-bold tracking-wider uppercase text-rose-100">COURSE SAFETY COMMAND CENTER</h2>
          </div>
          <button onClick={onClose} className="text-rose-300 hover:text-white p-1 rounded-xl">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-5">
          {smsSent ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <span className="material-symbols-outlined text-2xl">send</span>
              </div>
              <h3 className="font-headline text-lg text-emerald-400 font-bold">SMS Dispatched</h3>
              <p className="text-xs text-slate-400">
                Safety SMS bulletin broadcasted to {sentCount} marshalls, clubhouse terminals, and golfers.
              </p>
            </div>
          ) : (
            <>
              {/* Siren Status Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isSirenActive
                    ? 'bg-rose-950/50 border-rose-800/80 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <span className="font-label-caps text-[10px] block uppercase text-slate-400 tracking-wider font-bold">ACOUSTIC SIREN STATUS</span>
                  <span className="font-headline text-lg font-bold text-slate-100">
                    {isSirenActive ? '🔊 ACTIVE — BROADCASTING' : '🔇 STANDBY / ARMED'}
                  </span>
                </div>

                <button
                  onClick={handleTrigger}
                  className={`px-4 py-2.5 rounded-2xl font-label-caps text-xs font-bold transition-all active:scale-95 uppercase tracking-wider ${
                    isSirenActive
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                      : 'bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                  }`}
                >
                  {isSirenActive ? 'CANCEL SIREN' : 'SOUND SIREN'}
                </button>
              </div>

              {/* SMS Broadcast Configuration */}
              <div className="space-y-2">
                <label className="font-label-caps text-xs text-slate-400 flex justify-between font-bold">
                  <span>AUTOMATED PARTICIPANT SMS DISPATCH</span>
                  <span className="text-sky-400">{sentCount} GOLFERS LINKED</span>
                </label>
                <textarea
                  rows={3}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-xs text-slate-100 font-sans focus:border-sky-400 focus:outline-none leading-relaxed"
                ></textarea>
              </div>

              {/* Course Shelters Overview */}
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-label-caps text-amber-400 font-bold">
                  <span>ACTIVE SHELTER BUNKERS:</span>
                  <span>{selectedCourse.shelters} OPEN</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Buggy geofencing lock engaged for {selectedCourse.shortName}.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-label-caps text-slate-400 hover:text-slate-200 font-bold"
                >
                  CLOSE
                </button>
                <button
                  onClick={handlePushSMS}
                  className="px-5 py-2.5 bg-sky-400 text-slate-950 font-label-caps text-xs rounded-2xl font-bold hover:bg-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.4)] uppercase tracking-wider"
                >
                  PUSH SMS TO ALL PLAYERS
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
