import React, { useState } from 'react';
import { GolfCourse, LiveWeatherData } from '../types';

interface ForecastViewProps {
  selectedCourse: GolfCourse;
  courses: GolfCourse[];
  weatherData: LiveWeatherData | null;
  userRole: string;
  onSelectCourse: (course: GolfCourse) => void;
  onOpenReport: () => void;
  onOpenCallMarshall: () => void;
  onOpenSiren: () => void;
}

export const ForecastView: React.FC<ForecastViewProps> = ({
  selectedCourse,
  courses,
  weatherData,
  userRole,
  onSelectCourse,
  onOpenReport,
  onOpenCallMarshall,
  onOpenSiren
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Find 2-hr forecast matching selected course's area
  const matchedAreaForecast = weatherData?.twoHrForecasts.find(
    (f) =>
      f.area.toLowerCase().includes(selectedCourse.areaName.toLowerCase()) ||
      selectedCourse.areaName.toLowerCase().includes(f.area.toLowerCase())
  );

  const currentForecastText = matchedAreaForecast?.forecast || 'Thundery Showers';

  const isStormRisk =
    currentForecastText.toLowerCase().includes('thunder') ||
    currentForecastText.toLowerCase().includes('heavy') ||
    currentForecastText.toLowerCase().includes('shower');

  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.areaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-4 pb-28 md:pb-12 md:pl-28 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Status Bar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <span className="font-label-caps text-xs text-[#bfc9c4]">
          Logged in as {userRole.toUpperCase()}
        </span>
        <div
          onClick={onOpenSiren}
          className={`cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label-caps transition-all ${
            isStormRisk
              ? 'bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40 animate-pulse shadow-[0_0_12px_rgba(147,0,10,0.5)]'
              : 'bg-[#004d40] text-[#94d3c1] border border-[#94d3c1]/30'
          }`}
        >
          <span
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isStormRisk ? 'warning' : 'check_circle'}
          </span>
          <span>{isStormRisk ? 'DANGER LEVEL ACTIVE' : 'WEATHER STATUS CLEAR'}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#bfc9c4]">
          search
        </span>
        <input
          id="input-location-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter Location (e.g., Marina Bay, Sentosa, Laguna, SICC)"
          className="w-full bg-[#292a28] border-b-2 border-[#89938f] focus:border-[#00daf3] focus:ring-0 text-[#e2e3df] font-body text-base py-3.5 pl-12 pr-10 transition-colors outline-none rounded-t"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89938f] hover:text-white"
          >
            ✕
          </button>
        )}

        {/* Search dropdown results if typing */}
        {searchQuery && filteredCourses.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-30 bg-[#1e201e] border border-[#3f4945] rounded-b-lg shadow-2xl overflow-hidden mt-0.5">
            {filteredCourses.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCourse(c);
                  setSearchQuery('');
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-[#292a28] border-b border-[#3f4945]/50 flex items-center justify-between text-xs font-label-caps"
              >
                <span className="text-[#e2e3df]">{c.name}</span>
                <span className="text-[#94d3c1]">{c.sector} Sector · {c.holes} Holes</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* Left Column: Risks & Actions & Outlook (8 Cols) */}
        <div className="md:col-span-8 flex flex-col gap-4">
          {/* Current Location Risks Card (Deep Teal #002D26) */}
          <div className="bg-[#002D26] border border-[#3f4945] p-5 sm:p-6 rounded-xl relative overflow-hidden shadow-[0_0_20px_rgba(255,180,171,0.15)]">
            <div className="absolute inset-0 bg-[#ffb4ab]/5 mix-blend-overlay pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div>
                <h2 className="font-headline text-2xl sm:text-3xl text-[#e2e3df] tracking-tight">
                  Current Location Risks
                </h2>
                <p className="text-xs font-label-caps text-[#94d3c1] mt-0.5">
                  TARGET: {selectedCourse.name.toUpperCase()} ({selectedCourse.sector.toUpperCase()} REGION)
                </p>
              </div>
              <span className="text-xs font-label-caps text-[#bfc9c4]">
                NEA LIVE FEED: {currentForecastText.toUpperCase()}
              </span>
            </div>

            {/* 3 Risk Metric Blocks */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 relative z-10">
              {/* Rain Risk */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-[#1e201e] rounded-lg border border-[#3f4945] hover:border-[#94d3c1] transition-colors">
                <span
                  className="material-symbols-outlined text-[#94d3c1] mb-1 sm:mb-2 text-3xl sm:text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  water_drop
                </span>
                <span className="font-headline text-xl sm:text-2xl font-bold text-[#e2e3df]">
                  85%
                </span>
                <span className="font-label-caps text-[10px] sm:text-xs text-[#bfc9c4] mt-1 text-center">
                  Rain Risk
                </span>
              </div>

              {/* Wind Speed */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-[#1e201e] rounded-lg border border-[#3f4945] hover:border-[#ffe2ab] transition-colors">
                <span className="material-symbols-outlined text-[#ffe2ab] mb-1 sm:mb-2 text-3xl sm:text-4xl">
                  air
                </span>
                <span className="font-headline text-xl sm:text-2xl font-bold text-[#e2e3df]">
                  {weatherData?.windSpeed ? `${Math.round(weatherData.windSpeed)}` : '24'}
                  <span className="text-xs font-normal text-[#bfc9c4]">km/h</span>
                </span>
                <span className="font-label-caps text-[10px] sm:text-xs text-[#bfc9c4] mt-1 text-center">
                  Wind Speed
                </span>
              </div>

              {/* Lightning Proximity (Critical Red) */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-[#93000a] rounded-lg border border-[#ffb4ab] pulse-danger-ring">
                <span
                  className="material-symbols-outlined text-[#ffdad6] mb-1 sm:mb-2 text-3xl sm:text-4xl fill-icon"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  thunderstorm
                </span>
                <span className="font-headline text-xl sm:text-2xl font-bold text-[#ffdad6]">
                  1.2<span className="text-xs font-normal">km</span>
                </span>
                <span className="font-label-caps text-[10px] sm:text-xs text-[#ffdad6] mt-1 text-center uppercase font-bold">
                  Lightning Prox
                </span>
              </div>
            </div>
          </div>

          {/* Utility Actions (Report Weather & Call Marshall) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              id="btn-report-weather-forecast"
              onClick={onOpenReport}
              className="bg-[#ffe2ab] text-[#402d00] font-label-caps text-xs sm:text-sm py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#ffdfa0] active:scale-95 transition-all shadow-md font-bold"
            >
              <span className="material-symbols-outlined text-lg">report</span>
              Report Weather
            </button>

            <button
              id="btn-call-marshall-forecast"
              onClick={onOpenCallMarshall}
              className="bg-[#292a28] border border-[#89938f] text-[#e2e3df] font-label-caps text-xs sm:text-sm py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#333533] active:scale-95 transition-all font-bold"
            >
              <span className="material-symbols-outlined text-lg text-[#94d3c1]">call</span>
              Call Marshall
            </button>
          </div>

          {/* Live Environmental Station Telemetry Strip */}
          <div className="bg-[#1e201e] border border-[#3f4945] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-caps text-xs text-[#94d3c1]">
                REAL-TIME ATMOSPHERIC SENSORS (NEA KEYLESS API)
              </span>
              <span className="text-[10px] font-label-caps text-[#89938f]">
                UPDATED: {weatherData?.lastUpdated || 'LIVE'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#121412] p-3 rounded border border-[#3f4945]/60">
                <span className="text-[10px] font-label-caps text-[#bfc9c4] block">AIR TEMP</span>
                <span className="font-headline text-lg text-[#94d3c1]">
                  {weatherData?.temperature ?? 30.5}°C
                </span>
              </div>
              <div className="bg-[#121412] p-3 rounded border border-[#3f4945]/60">
                <span className="text-[10px] font-label-caps text-[#bfc9c4] block">HUMIDITY</span>
                <span className="font-headline text-lg text-[#00daf3]">
                  {weatherData?.humidity ?? 82}%
                </span>
              </div>
              <div className="bg-[#121412] p-3 rounded border border-[#3f4945]/60">
                <span className="text-[10px] font-label-caps text-[#bfc9c4] block">PM2.5 / PSI</span>
                <span className="font-headline text-lg text-[#ffe2ab]">
                  {weatherData?.pm25 ?? 14} µg / {weatherData?.psi ?? 45}
                </span>
              </div>
              <div className="bg-[#121412] p-3 rounded border border-[#3f4945]/60">
                <span className="text-[10px] font-label-caps text-[#bfc9c4] block">UV INDEX</span>
                <span className="font-headline text-lg text-[#ffb4ab]">
                  {weatherData?.uvIndex ?? 7.2} (MODERATE)
                </span>
              </div>
            </div>
          </div>

          {/* 4-Day Extended Meteorological Outlook */}
          <div className="bg-[#1e201e] border border-[#3f4945] rounded-xl p-4">
            <h3 className="font-headline text-lg text-[#e2e3df] mb-3 flex items-center justify-between">
              <span>4-Day Tournament Outlook</span>
              <span className="text-xs font-label-caps text-[#89938f]">SINGAPORE BROADCAST</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(weatherData?.fourDayOutlook || [
                { day: 'Thu', forecast: 'Thundery Showers', temperature: { low: 25, high: 32 }, humidity: { low: 65, high: 95 } },
                { day: 'Fri', forecast: 'Thundery Showers', temperature: { low: 24, high: 31 }, humidity: { low: 70, high: 95 } },
                { day: 'Sat', forecast: 'Passing Showers', temperature: { low: 25, high: 33 }, humidity: { low: 60, high: 90 } },
                { day: 'Sun', forecast: 'Fair & Warm', temperature: { low: 26, high: 34 }, humidity: { low: 55, high: 85 } }
              ]).map((day, i) => (
                <div key={i} className="bg-[#121412] p-3 rounded-lg border border-[#3f4945]/60 flex flex-col justify-between">
                  <div>
                    <span className="font-label-caps text-xs text-[#94d3c1] font-bold block">{day.day}</span>
                    <span className="text-xs text-[#e2e3df] line-clamp-2 mt-1 font-medium">{day.forecast}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#3f4945]/40 flex justify-between items-baseline text-xs">
                    <span className="font-label-caps text-[#94d3c1] font-bold">{day.temperature.high}°C</span>
                    <span className="font-label-caps text-[#89938f]">{day.temperature.low}°C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Map Snippet Side Panel (4 Cols) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="bg-[#121412] border border-[#3f4945] rounded-xl p-3 flex flex-col relative overflow-hidden min-h-[380px] shadow-lg">
            <div className="absolute top-4 left-4 z-10 bg-[#1e201e]/90 backdrop-blur px-3 py-1 rounded font-label-caps text-xs border border-[#3f4945] text-[#94d3c1]">
              {selectedCourse.sector} Sector Radar
            </div>

            {/* Simulated Satellite Map image with overlay */}
            <div className="w-full h-72 sm:h-80 rounded-lg bg-[#0d0f0d] border border-[#3f4945] relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfXGh3gVYZAkp5cuMOcuvCUeHpZJKjiKFVZ5_iYqxlMrlBW7ufzRPgv0-kK3nhnx7UwYb4ddJZ9M83aig_yfUHqmHz38ajfN-AF2COuFCBnMOpjxgWeAExVlr0sJ56htHZpOR9n6rrfSz8BuoJitIqyBFdiUYEcVUbv_bUzZm4aPfV_xrqiRtP0KE3FLRikrrtSgFlb9Y4vEZZ6HptfvzFJVqxw3i-q9WcymUezYDNQctK0UCK9uTimg"
                alt="Map snippet"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />

              {/* Pulsing Danger Radius */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-[#ffb4ab] bg-[#93000a]/25 flex items-center justify-center animate-pulse">
                <div className="w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_12px_#fff]"></div>
              </div>

              {/* Electric blue strike crosshairs */}
              <span
                className="material-symbols-outlined absolute top-1/3 left-1/3 text-[#00daf3] text-2xl"
                style={{ textShadow: '0 0 12px #00daf3' }}
              >
                close
              </span>
              <span
                className="material-symbols-outlined absolute bottom-1/3 right-1/4 text-[#00daf3] text-2xl"
                style={{ textShadow: '0 0 12px #00daf3' }}
              >
                close
              </span>
            </div>

            {/* Evacuation Protocol Summary */}
            <div className="mt-4 p-3 bg-[#1e201e] rounded-lg border border-[#3f4945]/80 space-y-2">
              <span className="font-label-caps text-xs text-[#ffbf00] block uppercase font-bold">
                ⚠️ Evacuation Protocol ({selectedCourse.shelters} Shelters Active)
              </span>
              <ul className="text-xs text-[#bfc9c4] space-y-1">
                {selectedCourse.evacuationRoutes.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#94d3c1] font-bold">›</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
