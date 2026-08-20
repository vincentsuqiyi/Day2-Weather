import React, { useState } from 'react';
import { GolfCourse, IncidentReport } from '../types';

interface ReportWeatherModalProps {
  isOpen: boolean;
  selectedCourse: GolfCourse;
  onClose: () => void;
  onSubmitReport: (report: IncidentReport) => void;
}

export const ReportWeatherModal: React.FC<ReportWeatherModalProps> = ({
  isOpen,
  selectedCourse,
  onClose,
  onSubmitReport
}) => {
  const [reportType, setReportType] = useState<IncidentReport['type']>('Lightning Visible');
  const [severity, setSeverity] = useState<IncidentReport['severity']>('Critical');
  const [sector, setSector] = useState('Hole 7 Fairway Turn');
  const [notes, setNotes] = useState('Visual lightning discharge spotted towards southern coastline with sudden gusting winds.');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: IncidentReport = {
      id: `rep-${Date.now()}`,
      courseId: selectedCourse.id,
      courseName: selectedCourse.name,
      type: reportType,
      severity,
      sector,
      notes,
      timestamp: new Date().toLocaleTimeString(),
      reporterName: 'On-Course Golfer / Marshall',
      status: severity === 'Critical' ? 'MARSHALL_DISPATCHED' : 'PENDING_REVIEW'
    };

    onSubmitReport(newReport);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400">campaign</span>
            <h2 className="font-headline text-lg text-slate-100 font-bold">Log Meteorological Incident</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-xl">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.3)]">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="font-headline text-xl text-emerald-400 font-bold">Report Dispatched</h3>
            <p className="text-xs text-slate-400">
              Golf Marshall command and telemetry logs updated for {selectedCourse.shortName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="font-label-caps text-[10px] text-slate-400 block mb-1 uppercase tracking-wider font-bold">
                COURSE LOCATION
              </label>
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-xs font-label-caps text-sky-400 font-bold">
                ⛳ {selectedCourse.name} ({selectedCourse.sector} Sector)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-label-caps text-[10px] text-slate-400 block mb-1 uppercase tracking-wider font-bold">
                  INCIDENT TYPE
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as any)}
                  className="w-full bg-slate-900/80 border border-slate-800 text-xs font-label-caps text-slate-200 p-2.5 rounded-2xl focus:border-sky-400 focus:outline-none"
                >
                  <option value="Lightning Visible">⚡ Lightning Visible</option>
                  <option value="Heavy Downpour">🌧️ Heavy Downpour</option>
                  <option value="High Wind">💨 High Wind Gust</option>
                  <option value="Flooded Green">🌊 Flooded Green / Trap</option>
                  <option value="Tree Hazard">🌲 Tree / Debris Hazard</option>
                </select>
              </div>

              <div>
                <label className="font-label-caps text-[10px] text-slate-400 block mb-1 uppercase tracking-wider font-bold">
                  SEVERITY
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full bg-slate-900/80 border border-slate-800 text-xs font-label-caps text-slate-200 p-2.5 rounded-2xl focus:border-sky-400 focus:outline-none"
                >
                  <option value="Critical">🔴 Critical (Immediate Hazard)</option>
                  <option value="Medium">🟡 Medium (Caution)</option>
                  <option value="Low">🟢 Low (Advisory)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-label-caps text-[10px] text-slate-400 block mb-1 uppercase tracking-wider font-bold">
                FAIRWAY / HOLE SECTOR
              </label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="e.g., Hole 7 Tee, Back 9 Pavilion"
                className="w-full bg-slate-900/80 border border-slate-800 text-xs text-slate-100 p-2.5 rounded-2xl focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[10px] text-slate-400 block mb-1 uppercase tracking-wider font-bold">
                FIELD OBSERVATIONS
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 text-xs text-slate-100 p-2.5 rounded-2xl focus:border-sky-400 focus:outline-none leading-relaxed"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-label-caps text-slate-400 hover:text-slate-200 font-bold"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-sky-400 text-slate-950 font-label-caps text-xs rounded-2xl font-bold hover:bg-sky-300 transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)] uppercase tracking-wider"
              >
                DISPATCH TO MARSHALL
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
