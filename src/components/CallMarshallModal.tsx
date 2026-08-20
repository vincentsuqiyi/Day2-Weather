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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e201e] border border-[#3f4945] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-5 py-4 bg-[#292a28] border-b border-[#3f4945] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#94d3c1]">call</span>
            <h2 className="font-headline text-lg text-[#e2e3df]">Course Marshall Hotline</h2>
          </div>
          <button onClick={onClose} className="text-[#bfc9c4] hover:text-white p-1">
            ✕
          </button>
        </div>

        <div className="p-6 text-center space-y-5">
          <div className="w-20 h-20 bg-[#004d40] text-[#94d3c1] rounded-full flex items-center justify-center mx-auto border-2 border-[#94d3c1] shadow-lg">
            <span
              className={`material-symbols-outlined text-4xl ${
                callState === 'calling' ? 'animate-bounce' : ''
              }`}
            >
              {callState === 'connected' ? 'headset_mic' : 'support_agent'}
            </span>
          </div>

          <div>
            <h3 className="font-headline text-xl text-[#e2e3df]">{selectedCourse.shortName}</h3>
            <p className="text-xs text-[#94d3c1] font-label-caps mt-0.5">
              DUTY MARSHALL: OFFICER ALAN TEO (TERMINAL #04)
            </p>
          </div>

          <div className="bg-[#121412] p-3 rounded-lg border border-[#3f4945] text-left text-xs font-label-caps space-y-2">
            <div className="flex justify-between text-[#89938f]">
              <span>RADIO FREQUENCY:</span>
              <span className="text-[#00daf3]">462.5625 MHz (VHF)</span>
            </div>
            <div className="flex justify-between text-[#89938f]">
              <span>CHANNEL:</span>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="bg-[#1e201e] text-[#e2e3df] rounded px-1.5 py-0.5 border border-[#3f4945]"
              >
                <option>Ch 1 - Main Marshall Radio</option>
                <option>Ch 2 - Medical & Emergency</option>
                <option>Ch 3 - Clubhouse Desk</option>
              </select>
            </div>
          </div>

          {callState === 'connected' && (
            <div className="p-3 bg-[#004d40]/40 border border-[#94d3c1] rounded-lg text-xs text-[#afefdd] font-label-caps flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00daf3] animate-ping"></span>
              VOICE CHANNEL CONNECTED · 00:24
            </div>
          )}

          <div className="pt-2 flex items-center justify-center gap-3">
            {callState === 'idle' && (
              <button
                onClick={handleStartCall}
                className="w-full py-3.5 bg-[#94d3c1] text-[#00382e] font-label-caps text-xs rounded-xl font-bold hover:bg-[#afefdd] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span className="material-symbols-outlined text-base">call</span>
                CONNECT MARSHALL DISPATCH
              </button>
            )}

            {callState === 'calling' && (
              <div className="w-full py-3 bg-[#ffbf00] text-[#6d5000] font-label-caps text-xs rounded-xl font-bold animate-pulse flex items-center justify-center gap-2">
                ESTABLISHING SECURE RADIO UPLINK...
              </div>
            )}

            {callState === 'connected' && (
              <button
                onClick={handleEndCall}
                className="w-full py-3.5 bg-[#93000a] text-[#ffdad6] font-label-caps text-xs rounded-xl font-bold hover:bg-[#93000a]/80 transition-colors flex items-center justify-center gap-2"
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
