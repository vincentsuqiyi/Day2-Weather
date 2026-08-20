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

  if (!isOpen) return null;

  const handleTrigger = () => {
    onToggleSiren(!isSirenActive);
    if (!isSirenActive) {
      setSentCount((c) => c + 12);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1a1c1a] border border-[#ffb4ab] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-5 py-4 bg-[#93000a] text-[#ffdad6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl animate-pulse">campaign</span>
            <h2 className="font-headline text-lg tracking-tight">COURSE SAFETY COMMAND CENTER</h2>
          </div>
          <button onClick={onClose} className="text-[#ffdad6] hover:text-white p-1">
            ✕
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Siren Status Banner */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              isSirenActive
                ? 'bg-[#93000a]/20 border-[#ffb4ab] text-[#ffdad6]'
                : 'bg-[#121412] border-[#3f4945] text-[#bfc9c4]'
            }`}
          >
            <div>
              <span className="font-label-caps text-xs block uppercase">ACOUSTIC SIREN STATUS</span>
              <span className="font-headline text-xl font-bold">
                {isSirenActive ? '🔊 ACTIVE — BROADCASTING SIREN' : '🔇 STANDBY / ARMED'}
              </span>
            </div>

            <button
              onClick={handleTrigger}
              className={`px-4 py-2.5 rounded-xl font-label-caps text-xs font-bold transition-transform active:scale-95 ${
                isSirenActive
                  ? 'bg-[#ffe2ab] text-[#402d00] hover:bg-[#ffdfa0]'
                  : 'bg-[#93000a] text-[#ffdad6] hover:bg-[#93000a]/80 shadow-[0_0_15px_rgba(147,0,10,0.6)]'
              }`}
            >
              {isSirenActive ? 'CANCEL SIREN' : 'SOUND SIREN'}
            </button>
          </div>

          {/* SMS Broadcast Configuration */}
          <div className="space-y-2">
            <label className="font-label-caps text-xs text-[#bfc9c4] flex justify-between">
              <span>AUTOMATED PARTICIPANT SMS DISPATCH</span>
              <span className="text-[#94d3c1]">{sentCount} GOLFERS LINKED</span>
            </label>
            <textarea
              rows={3}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              className="w-full bg-[#121412] border border-[#3f4945] rounded-lg p-3 text-xs text-[#e2e3df] font-body focus:border-[#00daf3]"
            ></textarea>
          </div>

          {/* Course Shelters Overview */}
          <div className="bg-[#121412] p-3 rounded-lg border border-[#3f4945] text-xs space-y-1">
            <div className="flex justify-between font-label-caps text-[#ffbf00]">
              <span>ACTIVE SHELTER BUNKERS:</span>
              <span>{selectedCourse.shelters} OPEN</span>
            </div>
            <p className="text-[11px] text-[#bfc9c4]">
              Buggy geofencing lock engaged for {selectedCourse.shortName}.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-label-caps text-[#bfc9c4] hover:text-white"
            >
              CLOSE
            </button>
            <button
              onClick={() => {
                alert('Broadcasted safety SMS bulletin to all marshalls, clubhouse, and players!');
                onClose();
              }}
              className="px-5 py-2.5 bg-[#94d3c1] text-[#00382e] font-label-caps text-xs rounded-lg font-bold hover:bg-[#afefdd]"
            >
              PUSH SMS TO ALL PLAYERS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
