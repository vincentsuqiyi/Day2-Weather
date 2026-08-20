import React, { useState } from 'react';
import { GolfCourse } from '../types';

interface CallMarshallModalProps {
  isOpen: boolean;
  selectedCourse: GolfCourse;
  onClose: () => void;
}

export const CallMarshallModal: React.FC<CallMarshallModalProps> = ({
  isOpen,
  selectedCourse,
  onClose
}) => {
  const [channel, setChannel] = useState('Ch 1 - Main Marshall Radio');
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');

  if (!isOpen) return null;

  const handleStartCall = () => {
    setCallState('calling');
    setTimeout(() => {
      setCallState('connected');
    }, 1200);
  };

  const handleEndCall = () => {
    setCallState('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-400">call</span>
            <h2 className="font-headline text-lg text-slate-100 font-bold">Course Marshall Hotline</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-xl">
            ✕
          </button>
        </div>

        <div className="p-6 text-center space-y-5">
          <div className="w-20 h-20 bg-sky-500/10 text-sky-400 rounded-3xl flex items-center justify-center mx-auto border border-sky-500/30 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            <span
              className={`material-symbols-outlined text-4xl ${
                callState === 'calling' ? 'animate-bounce' : ''
              }`}
            >
              {callState === 'connected' ? 'headset_mic' : 'support_agent'}
            </span>
          </div>

          <div>
            <h3 className="font-headline text-xl text-slate-100 font-bold">{selectedCourse.shortName}</h3>
            <p className="text-xs text-sky-400 font-label-caps mt-1 font-bold">
              DUTY MARSHALL: OFFICER ALAN TEO (TERMINAL #04)
            </p>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-left text-xs font-label-caps space-y-2.5">
            <div className="flex justify-between text-slate-400">
              <span className="font-bold">RADIO FREQUENCY:</span>
              <span className="text-sky-400 font-bold">462.5625 MHz (VHF)</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span className="font-bold">CHANNEL:</span>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="bg-slate-950 text-slate-200 rounded-xl px-2.5 py-1 border border-slate-800 focus:outline-none focus:border-sky-400"
              >
                <option>Ch 1 - Main Marshall Radio</option>
                <option>Ch 2 - Medical & Emergency</option>
                <option>Ch 3 - Clubhouse Desk</option>
              </select>
            </div>
          </div>

          {callState === 'connected' && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl text-xs text-emerald-300 font-label-caps flex items-center justify-center gap-2 font-bold shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              VOICE CHANNEL CONNECTED · 00:24
            </div>
          )}

          <div className="pt-2 flex items-center justify-center gap-3">
            {callState === 'idle' && (
              <button
                onClick={handleStartCall}
                className="w-full py-3.5 bg-sky-400 text-slate-950 font-label-caps text-xs rounded-2xl font-bold hover:bg-sky-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.35)] uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-base">call</span>
                CONNECT MARSHALL DISPATCH
              </button>
            )}

            {callState === 'calling' && (
              <div className="w-full py-3.5 bg-amber-400 text-slate-950 font-label-caps text-xs rounded-2xl font-bold animate-pulse flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.3)] uppercase tracking-wider">
                ESTABLISHING SECURE RADIO UPLINK...
              </div>
            )}

            {callState === 'connected' && (
              <button
                onClick={handleEndCall}
                className="w-full py-3.5 bg-rose-950 text-rose-300 border border-rose-800/80 font-label-caps text-xs rounded-2xl font-bold hover:bg-rose-900 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.3)] uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-base">call_end</span>
                END CALL
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
