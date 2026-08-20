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
    <div className="relative w-full h-[calc(100vh-64px)] md:pl-24 overflow-hidden select-none bg-[#121412]">
      {/* Top Safety Banner */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 px-4 md:px-6 py-3 flex items-center justify-between border-b shadow-lg transition-colors ${
          isCritical
            ? 'bg-[#93000a] text-[#ffdad6] border-[#ffb4ab]/50 shadow-[0_4px_24px_rgba(147,0,10,0.6)]'
            : 'bg-[#ffbf00] text-[#6d5000] border-[#ffe2ab]/50 shadow-[0_4px_24px_rgba(255,191,0,0.3)]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="material-symbols-outlined text-2xl pulse-danger-ring"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            warning
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <span className="font-headline text-sm sm:text-base uppercase tracking-tight font-extrabold">
              {isCritical ? 'LIGHTNING DETECTED — EVACUATE OUTDOOR GREENS' : 'WEATHER ADVISORY ACTIVE'}
            </span>
            <span className="text-xs font-label-caps opacity-90">
              Sector: {selectedCourse.sector} ({selectedCourse.shortName})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-label-caps block opacity-80 uppercase">NEAREST STRIKE</span>
            <span className="font-headline text-lg sm:text-xl font-black">{nearestStrike.distanceKm}km</span>
          </div>
          <button
            id="btn-alert-evacuation-siren"
            onClick={onOpenSiren}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-[#121412] text-[#ffdad6] border border-[#ffb4ab]/40 rounded font-label-caps text-xs hover:bg-[#292a28] transition-colors"
          >
            <span className="material-symbols-outlined text-sm text-[#ffb4ab]">emergency</span>
            SIREN
          </button>
        </div>
      </div>

      {/* Map Filter & Course Quick Select Bar */}
      <div className="absolute top-16 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 bg-[#1e201e]/90 backdrop-blur-md border border-[#3f4945] p-1 rounded-lg">
          <span className="font-label-caps text-[11px] text-[#bfc9c4] px-2">COURSE:</span>
          <select
            id="select-course-radar"
            value={selectedCourse.id}
            onChange={(e) => {
              const c = courses.find((x) => x.id === e.target.value);
              if (c) onSelectCourse(c);
            }}
            className="bg-[#121412] border border-[#3f4945] text-[#e2e3df] text-xs font-label-caps rounded px-2.5 py-1.5 focus:border-[#00daf3] focus:outline-none"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.shortName} ({c.sector})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 bg-[#1e201e]/90 backdrop-blur-md border border-[#3f4945] p-1 rounded-lg">
          <button
            onClick={() => setFilterRadius('all')}
            className={`px-2.5 py-1 rounded text-[11px] font-label-caps transition-colors ${
              filterRadius === 'all' ? 'bg-[#004d40] text-[#94d3c1] font-bold' : 'text-[#bfc9c4] hover:text-white'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilterRadius('5km')}
            className={`px-2.5 py-1 rounded text-[11px] font-label-caps transition-colors ${
              filterRadius === '5km' ? 'bg-[#ffbf00] text-[#6d5000] font-bold' : 'text-[#bfc9c4] hover:text-white'
            }`}
          >
            &lt;5KM
          </button>
          <button
            onClick={() => setFilterRadius('2km')}
            className={`px-2.5 py-1 rounded text-[11px] font-label-caps transition-colors ${
              filterRadius === '2km' ? 'bg-[#93000a] text-[#ffdad6] font-bold' : 'text-[#bfc9c4] hover:text-white'
            }`}
          >
            &lt;2KM DANGER
          </button>
        </div>
      </div>

      {/* Radar Map Canvas Area */}
      <div className="absolute inset-0 w-full h-full bg-[#0d0f0d] map-grid overflow-hidden flex items-center justify-center">
        {/* Dark Mode Satellite Map Image Background */}
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity pointer-events-none scale-105 transition-transform duration-500"
          style={{ transform: `scale(${radarZoom})` }}
          alt="Singapore Golf Shield Satellite Map Overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbELxAUJ7kCVedINyY0aZa7cl1q4VDwoluEZh10QepYTS3AUzuvhROq8VbW15S44KExHYmT4dwyWUe_l6VAwmWBybNLGGLBIJyAS0yi9NF2fTfydS8r4PQh2j4vDSXX8QtaaIaNBQxmXd9K2H8hDvVWqfTm8aGSl78WjBLcellMHwGsbL0tNBRuZVsoB_6M2yrJP90cj1eMnRZfqM9ZrEPANNuSESFW0_cfTECxqsa1-q-Pc4Vw3xTBQ"
        />

        {/* Dynamic Sweep Line Simulation */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <div className="w-[800px] h-[800px] rounded-full border border-[#00daf3]/20 relative">
            <div className="absolute top-1/2 left-1/2 w-[400px] h-0.5 bg-gradient-to-r from-transparent via-[#00daf3] to-transparent origin-left animate-spin duration-1000"></div>
          </div>
        </div>

        {/* Center Target & Danger / Caution Rings */}
        <div className="relative flex items-center justify-center pointer-events-auto">
          {/* Danger Ring (<2km) */}
          <div className="absolute w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full border-2 border-[#ffb4ab] bg-[#93000a]/15 pulse-danger-ring pointer-events-none flex items-center justify-center">
            <span className="absolute top-2 text-[10px] font-label-caps text-[#ffb4ab] bg-[#93000a]/80 px-2 py-0.5 rounded">
              DANGER ZONE &lt; 2KM
            </span>
          </div>

          {/* Caution Ring (2-5km) */}
          <div className="absolute w-[460px] sm:w-[580px] h-[460px] sm:h-[580px] rounded-full border border-[#ffbf00] bg-[#ffbf00]/5 pointer-events-none border-dashed flex items-center justify-center">
            <span className="absolute top-4 text-[10px] font-label-caps text-[#ffdfa0] bg-[#1e201e]/80 px-2 py-0.5 rounded">
              CAUTION ZONE 5KM
            </span>
          </div>

          {/* User / Course Center Marker */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="w-5 h-5 bg-[#e2e3df] rounded-full shadow-[0_0_16px_rgba(226,227,223,0.9)] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#121412] rounded-full"></div>
            </div>
            <div className="mt-1 bg-[#121412]/90 border border-[#94d3c1] px-2 py-0.5 rounded text-[10px] font-label-caps text-[#94d3c1] shadow-md whitespace-nowrap">
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
                        ? 'text-[#00daf3] shadow-[0_0_24px_rgba(0,218,243,0.9)]'
                        : 'text-[#00daf3]/80'
                    }`}
                  >
                    bolt
                  </span>
                  <div className="absolute w-8 h-8 rounded-full bg-[#00daf3]/25 animate-ping"></div>

                  {/* Strike Tooltip */}
                  <div
                    className={`absolute bottom-full mb-2 bg-[#121412] border ${
                      s.isDangerZone ? 'border-[#00daf3] shadow-[0_0_12px_rgba(0,218,243,0.4)]' : 'border-[#3f4945]'
                    } px-3 py-1.5 rounded shadow-xl whitespace-nowrap z-30 transition-all ${
                      activeStrikeTooltip === s.id ? 'opacity-100 scale-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <div className="font-label-caps text-[11px] text-[#00daf3] font-bold">
                      ⚡ STRIKE: {s.distanceKm}km / {s.timeAgoMins}m ago
                    </div>
                    <div className="text-[10px] text-[#bfc9c4]">{s.sector}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Zoom Controls */}
        <div className="absolute right-4 top-32 z-20 flex flex-col gap-2 bg-[#1e201e]/90 backdrop-blur border border-[#3f4945] p-1 rounded-lg">
          <button
            onClick={() => setRadarZoom((z) => Math.min(z + 0.2, 1.8))}
            className="w-8 h-8 flex items-center justify-center text-[#e2e3df] hover:bg-[#292a28] rounded font-bold"
            title="Zoom In"
          >
            +
          </button>
          <div className="h-px bg-[#3f4945] w-full"></div>
          <button
            onClick={() => setRadarZoom((z) => Math.max(z - 0.2, 0.8))}
            className="w-8 h-8 flex items-center justify-center text-[#e2e3df] hover:bg-[#292a28] rounded font-bold"
            title="Zoom Out"
          >
            -
          </button>
          <div className="h-px bg-[#3f4945] w-full"></div>
          <button
            onClick={() => setRadarZoom(1)}
            className="w-8 h-8 flex items-center justify-center text-[#bfc9c4] hover:bg-[#292a28] rounded text-xs"
            title="Reset Zoom"
          >
            1x
          </button>
        </div>
      </div>

      {/* Contextual Overlay Card (Bottom Left - As in Mockup) */}
      <div className="absolute bottom-24 md:bottom-6 left-4 right-4 md:right-auto md:w-88 bg-[#121412]/95 backdrop-blur-md border border-[#3f4945] rounded-xl shadow-2xl p-4 z-30">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-headline text-lg md:text-xl text-[#e2e3df] tracking-tight">
            {selectedCourse.name}
          </h2>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label-caps bg-[#93000a] text-[#ffdad6]">
            ALERT 1
          </span>
        </div>

        <p className="text-xs text-[#bfc9c4] line-clamp-1 mb-3">
          {selectedCourse.description}
        </p>

        <div className="grid grid-cols-2 gap-4 border-t border-[#3f4945] pt-3">
          <div>
            <span className="font-label-caps text-[10px] text-[#bfc9c4] block mb-0.5">
              NEAREST STRIKE
            </span>
            <span className="font-headline text-2xl font-bold text-[#ffb4ab]">
              {nearestStrike.distanceKm} km
            </span>
            <span className="text-[10px] text-[#ffb4ab]/80 block">
              {nearestStrike.timeAgoMins} mins ago ({nearestStrike.sector})
            </span>
          </div>

          <div className="text-right">
            <span className="font-label-caps text-[10px] text-[#bfc9c4] block mb-0.5">
              RAIN FORECAST
            </span>
            <span className="font-headline text-2xl font-bold text-[#94d3c1]">
              85%
            </span>
            <span className="text-[10px] text-[#94d3c1]/80 block">
              {weatherData?.temperature ? `${weatherData.temperature}°C` : '30°C'} ·{' '}
              {weatherData?.windSpeed ? `${weatherData.windSpeed} km/h` : '24 km/h'}
            </span>
          </div>
        </div>

        {/* Rain Trend Sparkline Bars */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[9px] font-label-caps text-[#89938f] mb-1">
            <span>2-HR PRECIPITATION TRAJECTORY</span>
            <span className="text-[#00daf3]">HIGH RISK</span>
          </div>
          <div className="h-7 w-full flex items-end gap-1.5 bg-[#1a1c1a] p-1 rounded border border-[#3f4945]/40">
            <div className="w-1/6 bg-[#94d3c1]/30 hover:bg-[#94d3c1] h-[25%] rounded-xs transition-all" title="00-20m: 25%"></div>
            <div className="w-1/6 bg-[#94d3c1]/50 hover:bg-[#94d3c1] h-[45%] rounded-xs transition-all" title="20-40m: 45%"></div>
            <div className="w-1/6 bg-[#94d3c1]/70 hover:bg-[#94d3c1] h-[75%] rounded-xs transition-all" title="40-60m: 75%"></div>
            <div className="w-1/6 bg-[#94d3c1]/90 hover:bg-[#94d3c1] h-[95%] rounded-xs transition-all" title="60-80m: 95%"></div>
            <div className="w-1/6 bg-[#00daf3] h-[100%] rounded-xs transition-all shadow-[0_0_8px_rgba(0,218,243,0.5)]" title="80-100m: Peak Downpour"></div>
            <div className="w-1/6 bg-[#00daf3]/85 h-[90%] rounded-xs transition-all" title="100-120m: 90%"></div>
          </div>
        </div>
      </div>

      {/* Utility FAB (Report Weather) */}
      <button
        id="btn-fab-report-weather"
        onClick={onOpenReport}
        className="absolute bottom-24 md:bottom-6 right-4 z-30 bg-[#ffbf00] text-[#6d5000] h-14 px-6 rounded-full flex items-center gap-2 shadow-[0_4px_16px_rgba(255,191,0,0.35)] hover:opacity-95 active:scale-95 transition-all cursor-pointer font-label-caps text-xs"
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          campaign
        </span>
        <span className="tracking-wider uppercase font-bold">REPORT</span>
      </button>
    </div>
  );
};
