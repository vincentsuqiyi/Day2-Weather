import React, { useState } from 'react';
import { GolfCourse, LightningStrike, LiveWeatherData } from '../types';

interface MapTrackerViewProps {
  selectedCourse: GolfCourse;
  courses: GolfCourse[];
  strikes: LightningStrike[];
  weatherData: LiveWeatherData | null;
  onSelectCourse: (course: GolfCourse) => void;
  onOpenReport: () => void;
  onOpenSiren: () => void;
}

export const MapTrackerView: React.FC<MapTrackerViewProps> = ({
  selectedCourse,
  courses,
  strikes,
  weatherData,
  onSelectCourse,
  onOpenReport,
  onOpenSiren
}) => {
  const [activeStrikeTooltip, setActiveStrikeTooltip] = useState<string | null>(null);
  const [filterRadius, setFilterRadius] = useState<'all' | '2km' | '5km'>('all');
  const [radarZoom, setRadarZoom] = useState<number>(1);

  const nearestStrike = strikes.reduce(
    (min, s) => (s.distanceKm < min.distanceKm ? s : min),
    strikes[0] || { distanceKm: 1.8 }
  );

  const isCritical = nearestStrike.distanceKm < 2.0;

  const filteredStrikes = strikes.filter(s => {
    if (filterRadius === '2km') return s.distanceKm <= 2.0;
    if (filterRadius === '5km') return s.distanceKm <= 5.0;
    return true;
  });

  return (
    <div className="relative w-full h-[calc(100vh-64px)] md:pl-24 overflow-hidden select-none bg-slate-950">
      {/* Top Safety Banner */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 px-4 md:px-6 py-3 flex items-center justify-between border-b shadow-lg transition-colors backdrop-blur-md ${
          isCritical
            ? 'bg-rose-950/85 text-rose-200 border-rose-800/80 shadow-[0_4px_24px_rgba(244,63,94,0.35)]'
            : 'bg-slate-900/85 text-amber-300 border-slate-800 shadow-[0_4px_24px_rgba(15,23,42,0.6)]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`material-symbols-outlined text-2xl ${isCritical ? 'text-rose-400 pulse-danger-ring' : 'text-amber-400'}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            warning
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <span className="font-headline text-sm sm:text-base uppercase tracking-tight font-extrabold">
              {isCritical ? 'LIGHTNING DETECTED — EVACUATE OUTDOOR GREENS' : 'METEOROLOGICAL CAUTION ACTIVE'}
            </span>
            <span className="text-xs font-label-caps text-slate-400">
              Sector: {selectedCourse.sector} ({selectedCourse.shortName})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-label-caps block text-slate-400 uppercase tracking-widest">NEAREST STRIKE</span>
            <span className={`font-headline text-lg sm:text-xl font-bold ${isCritical ? 'text-rose-400' : 'text-amber-400'}`}>
              {nearestStrike.distanceKm}km
            </span>
          </div>
          <button
            id="btn-alert-evacuation-siren"
            onClick={onOpenSiren}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-950/80 text-rose-300 border border-rose-800/60 rounded-full font-label-caps text-xs hover:bg-rose-900 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm text-rose-400">emergency</span>
            SIREN
          </button>
        </div>
      </div>

      {/* Map Filter & Course Quick Select Bar */}
      <div className="absolute top-16 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-800 p-1.5 rounded-2xl shadow-xl">
          <span className="font-label-caps text-[10px] text-slate-400 uppercase tracking-wider px-2">COURSE:</span>
          <select
            id="select-course-radar"
            value={selectedCourse.id}
            onChange={(e) => {
              const c = courses.find((x) => x.id === e.target.value);
              if (c) onSelectCourse(c);
            }}
            className="bg-slate-950 border border-slate-800 text-slate-100 text-xs font-label-caps rounded-xl px-3 py-1.5 focus:border-sky-400 focus:outline-none"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.shortName} ({c.sector})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md border border-slate-800 p-1 rounded-2xl shadow-xl">
          <button
            onClick={() => setFilterRadius('all')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-label-caps transition-all ${
              filterRadius === 'all' ? 'bg-sky-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)]' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilterRadius('5km')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-label-caps transition-all ${
              filterRadius === '5km' ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.4)]' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            &lt;5KM
          </button>
          <button
            onClick={() => setFilterRadius('2km')}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-label-caps transition-all ${
              filterRadius === '2km' ? 'bg-rose-500 text-white font-bold shadow-[0_0_12px_rgba(244,63,94,0.5)]' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            &lt;2KM DANGER
          </button>
        </div>
      </div>

      {/* Radar Map Canvas Area */}
      <div className="absolute inset-0 w-full h-full bg-slate-950 map-grid overflow-hidden flex items-center justify-center">
        {/* Dark Mode Satellite Map Image Background */}
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity pointer-events-none scale-105 transition-transform duration-500"
          style={{ transform: `scale(${radarZoom})` }}
          alt="Singapore Golf Shield Satellite Map Overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbELxAUJ7kCVedINyY0aZa7cl1q4VDwoluEZh10QepYTS3AUzuvhROq8VbW15S44KExHYmT4dwyWUe_l6VAwmWBybNLGGLBIJyAS0yi9NF2fTfydS8r4PQh2j4vDSXX8QtaaIaNBQxmXd9K2H8hDvVWqfTm8aGSl78WjBLcellMHwGsbL0tNBRuZVsoB_6M2yrJP90cj1eMnRZfqM9ZrEPANNuSESFW0_cfTECxqsa1-q-Pc4Vw3xTBQ"
        />

        {/* Dynamic Sweep Line Simulation */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <div className="w-[800px] h-[800px] rounded-full border border-sky-500/20 relative">
            <div className="absolute top-1/2 left-1/2 w-[400px] h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent origin-left animate-spin duration-1000"></div>
          </div>
        </div>

        {/* Center Target & Danger / Caution Rings */}
        <div className="relative flex items-center justify-center pointer-events-auto">
          {/* Danger Ring (<2km) */}
          <div className="absolute w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full border-2 border-rose-500/80 bg-rose-500/10 pulse-danger-ring pointer-events-none flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.2)]">
            <span className="absolute top-2 text-[10px] font-label-caps text-rose-300 bg-rose-950/90 border border-rose-800/80 px-2.5 py-0.5 rounded-full">
              DANGER ZONE &lt; 2KM
            </span>
          </div>

          {/* Caution Ring (2-5km) */}
          <div className="absolute w-[460px] sm:w-[580px] h-[460px] sm:h-[580px] rounded-full border border-amber-400/40 bg-amber-400/5 pointer-events-none border-dashed flex items-center justify-center">
            <span className="absolute top-4 text-[10px] font-label-caps text-amber-300 bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 rounded-full">
              CAUTION ZONE 5KM
            </span>
          </div>

          {/* User / Course Center Marker */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="w-5 h-5 bg-sky-400 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.9)] flex items-center justify-center">
              <div className="w-2 h-2 bg-slate-950 rounded-full"></div>
            </div>
            <div className="mt-1.5 bg-slate-900/90 backdrop-blur-md border border-sky-500/40 px-3 py-1 rounded-full text-[10px] font-label-caps text-sky-300 shadow-xl whitespace-nowrap">
              ⛳ {selectedCourse.shortName}
            </div>
          </div>

          {/* Render Active Strikes */}
          {filteredStrikes.map((s, idx) => {
            // Position relative to center
            const offsets = [
              { top: '-90px', left: '70px' },
              { top: '140px', left: '160px' },
              { top: '-130px', left: '-120px' },
              { top: '190px', left: '-80px' }
            ];
            const pos = offsets[idx % offsets.length];

            return (
              <div
                key={s.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute pointer-events-auto cursor-pointer group z-20"
                onClick={() => setActiveStrikeTooltip(activeStrikeTooltip === s.id ? null : s.id)}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className={`material-symbols-outlined text-3xl transition-transform group-hover:scale-125 ${
                      s.isDangerZone
                        ? 'text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]'
                        : 'text-sky-400/80'
                    }`}
                  >
                    bolt
                  </span>
                  <div className="absolute w-8 h-8 rounded-full bg-sky-400/25 animate-ping"></div>

                  {/* Strike Tooltip */}
                  <div
                    className={`absolute bottom-full mb-2 bg-slate-900/95 backdrop-blur-md border ${
                      s.isDangerZone ? 'border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]' : 'border-slate-800'
                    } px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap z-30 transition-all ${
                      activeStrikeTooltip === s.id ? 'opacity-100 scale-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <div className="font-label-caps text-[11px] text-sky-400 font-bold">
                      ⚡ STRIKE: {s.distanceKm}km / {s.timeAgoMins}m ago
                    </div>
                    <div className="text-[10px] text-slate-400">{s.sector}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Zoom Controls */}
        <div className="absolute right-4 top-32 z-20 flex flex-col gap-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-800 p-1 rounded-2xl shadow-xl">
          <button
            onClick={() => setRadarZoom((z) => Math.min(z + 0.2, 1.8))}
            className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl font-bold transition-colors"
            title="Zoom In"
          >
            +
          </button>
          <div className="h-px bg-slate-800 w-full"></div>
          <button
            onClick={() => setRadarZoom((z) => Math.max(z - 0.2, 0.8))}
            className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl font-bold transition-colors"
            title="Zoom Out"
          >
            -
          </button>
          <div className="h-px bg-slate-800 w-full"></div>
          <button
            onClick={() => setRadarZoom(1)}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl text-xs font-label-caps transition-colors"
            title="Reset Zoom"
          >
            1x
          </button>
        </div>
      </div>

      {/* Contextual Overlay Card (Bottom Left - Sleek Bento Card) */}
      <div className="absolute bottom-24 md:bottom-6 left-4 right-4 md:right-auto md:w-92 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-5 z-30">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-headline text-lg md:text-xl text-slate-100 tracking-tight">
            {selectedCourse.name}
          </h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-label-caps bg-rose-950/80 text-rose-300 border border-rose-800/60">
            ALERT 1
          </span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-1 mb-4">
          {selectedCourse.description}
        </p>

        <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-3">
          <div>
            <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-widest block mb-0.5">
              NEAREST STRIKE
            </span>
            <span className="font-headline text-2xl font-bold text-rose-400">
              {nearestStrike.distanceKm} km
            </span>
            <span className="text-[10px] text-rose-400/70 block mt-0.5">
              {nearestStrike.timeAgoMins} mins ago ({nearestStrike.sector})
            </span>
          </div>

          <div className="text-right">
            <span className="font-label-caps text-[10px] text-slate-500 uppercase tracking-widest block mb-0.5">
              RAIN RISK
            </span>
            <span className="font-headline text-2xl font-bold text-sky-400">
              85%
            </span>
            <span className="text-[10px] text-sky-400/70 block mt-0.5">
              {weatherData?.temperature ? `${weatherData.temperature}°C` : '30°C'} ·{' '}
              {weatherData?.windSpeed ? `${weatherData.windSpeed} km/h` : '24 km/h'}
            </span>
          </div>
        </div>

        {/* Rain Trend Sparkline Bars */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] font-label-caps text-slate-500 uppercase tracking-wider mb-1.5">
            <span>2-HR PRECIPITATION TRAJECTORY</span>
            <span className="text-sky-400 font-bold">PEAK 80M</span>
          </div>
          <div className="h-9 w-full flex items-end gap-1.5 bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800/80">
            <div className="w-1/6 bg-sky-500/20 hover:bg-sky-400 h-[25%] rounded-full transition-all" title="00-20m: 25%"></div>
            <div className="w-1/6 bg-sky-500/35 hover:bg-sky-400 h-[45%] rounded-full transition-all" title="20-40m: 45%"></div>
            <div className="w-1/6 bg-sky-500/50 hover:bg-sky-400 h-[75%] rounded-full transition-all" title="40-60m: 75%"></div>
            <div className="w-1/6 bg-sky-500/70 hover:bg-sky-400 h-[95%] rounded-full transition-all" title="60-80m: 95%"></div>
            <div className="w-1/6 bg-sky-400 h-[100%] rounded-full transition-all shadow-[0_0_12px_rgba(56,189,248,0.7)]" title="80-100m: Peak Downpour"></div>
            <div className="w-1/6 bg-sky-500/80 h-[90%] rounded-full transition-all" title="100-120m: 90%"></div>
          </div>
        </div>
      </div>

      {/* Utility FAB (Report Weather) */}
      <button
        id="btn-fab-report-weather"
        onClick={onOpenReport}
        className="absolute bottom-24 md:bottom-6 right-4 z-30 bg-amber-400 text-slate-950 h-14 px-6 rounded-full flex items-center gap-2 shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:bg-amber-300 active:scale-95 transition-all cursor-pointer font-label-caps text-xs"
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          campaign
        </span>
        <span className="tracking-widest uppercase font-bold">REPORT</span>
      </button>
    </div>
  );
};
