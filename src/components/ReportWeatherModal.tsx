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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e201e] border border-[#3f4945] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-5 py-4 bg-[#292a28] border-b border-[#3f4945] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffbf00]">report</span>
            <h2 className="font-headline text-lg text-[#e2e3df]">Log Meteorological Incident</h2>
          </div>
          <button onClick={onClose} className="text-[#bfc9c4] hover:text-white p-1">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#004d40] text-[#94d3c1] rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="font-headline text-xl text-[#94d3c1]">Report Dispatched</h3>
            <p className="text-xs text-[#bfc9c4]">
              Golf Marshall command and telemetry logs updated for {selectedCourse.shortName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="font-label-caps text-[11px] text-[#bfc9c4] block mb-1">
                COURSE LOCATION
              </label>
              <div className="bg-[#121412] p-2.5 rounded border border-[#3f4945] text-xs font-label-caps text-[#94d3c1]">
                ⛳ {selectedCourse.name} ({selectedCourse.sector} Sector)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-label-caps text-[11px] text-[#bfc9c4] block mb-1">
                  INCIDENT TYPE
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as any)}
                  className="w-full bg-[#121412] border border-[#3f4945] text-xs font-label-caps text-[#e2e3df] p-2 rounded focus:border-[#00daf3]"
                >
                  <option value="Lightning Visible">⚡ Lightning Visible</option>
                  <option value="Heavy Downpour">🌧️ Heavy Downpour</option>
                  <option value="High Wind">💨 High Wind Gust</option>
                  <option value="Flooded Green">🌊 Flooded Green / Trap</option>
                  <option value="Tree Hazard">🌲 Tree / Debris Hazard</option>
                </select>
              </div>

              <div>
                <label className="font-label-caps text-[11px] text-[#bfc9c4] block mb-1">
                  SEVERITY
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full bg-[#121412] border border-[#3f4945] text-xs font-label-caps text-[#e2e3df] p-2 rounded focus:border-[#00daf3]"
                >
                  <option value="Critical">🔴 Critical (Immediate Hazard)</option>
                  <option value="Medium">🟡 Medium (Caution)</option>
                  <option value="Low">🟢 Low (Advisory)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-label-caps text-[11px] text-[#bfc9c4] block mb-1">
                FAIRWAY / HOLE SECTOR
              </label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="e.g., Hole 7 Tee, Back 9 Pavilion"
                className="w-full bg-[#121412] border border-[#3f4945] text-xs font-body text-[#e2e3df] p-2 rounded focus:border-[#00daf3]"
              />
            </div>

            <div>
              <label className="font-label-caps text-[11px] text-[#bfc9c4] block mb-1">
                FIELD OBSERVATIONS
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#121412] border border-[#3f4945] text-xs font-body text-[#e2e3df] p-2 rounded focus:border-[#00daf3]"
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-label-caps text-[#bfc9c4] hover:text-white"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#ffe2ab] text-[#402d00] font-label-caps text-xs rounded-lg font-bold hover:bg-[#ffdfa0] transition-colors"
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
