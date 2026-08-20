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
        <span className="font-label-caps text-xs text-slate-400">
          OPERATOR SESSION: <strong className="text-slate-200">{userRole.toUpperCase()}</strong>
        </span>
        <div
          onClick={onOpenSiren}
          className={`cursor-pointer flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-label-caps transition-all ${
            isStormRisk
              ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]'
              : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
          }`}
        >
          <span
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isStormRisk ? 'warning' : 'check_circle'}
          </span>
          <span className="font-bold">{isStormRisk ? 'DANGER LEVEL ACTIVE' : 'WEATHER STATUS CLEAR'}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
        <input
          id="input-location-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search golf club or area (e.g. Marina Bay, Sentosa, Laguna, Tanah Merah)..."
          className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-800 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-slate-100 placeholder-slate-500 font-sans text-sm py-3.5 pl-12 pr-10 transition-all outline-none rounded-2xl shadow-xl"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        )}

        {/* Search dropdown results */}
        {searchQuery && filteredCourses.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mt-1.5 divide-y divide-slate-800">
            {filteredCourses.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCourse(c);
                  setSearchQuery('');
                }}
                className="w-full text-left px-5 py-3 hover:bg-slate-800/80 flex items-center justify-between text-xs font-label-caps transition-colors"
              >
                <span className="text-slate-100 font-bold">{c.name}</span>
                <span className="text-sky-400 font-bold">{c.sector} Sector · {c.holes} Holes</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* Left Column: Risks & Actions & Outlook (8 Cols) */}
        <div className="md:col-span-8 flex flex-col gap-4">
          {/* Current Location Risks Card */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-5 relative z-10 flex-wrap gap-2">
              <div>
                <h2 className="font-headline text-2xl sm:text-3xl text-slate-100 tracking-tight font-bold">
                  Current Location Risks
                </h2>
                <p className="text-xs font-label-caps text-sky-400 mt-1 font-bold">
                  TARGET: {selectedCourse.name.toUpperCase()} ({selectedCourse.sector.toUpperCase()} REGION)
                </p>
              </div>
              <span className="text-[11px] font-label-caps text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                NEA LIVE FEED: {currentForecastText.toUpperCase()}
              </span>
            </div>

            {/* 3 Risk Metric Blocks */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 relative z-10">
              {/* Rain Risk */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-sky-400/50 transition-colors shadow-inner">
                <span
                  className="material-symbols-outlined text-sky-400 mb-1.5 text-3xl sm:text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  water_drop
                </span>
                <span className="font-headline text-xl sm:text-2xl font-bold text-slate-100">
                  85%
                </span>
                <span className="font-label-caps text-[10px] sm:text-xs text-slate-400 mt-1 text-center uppercase tracking-wider font-bold">
                  Rain Risk
                </span>
              </div>

              {/* Wind Speed */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-amber-400/50 transition-colors shadow-inner">
                <span className="material-symbols-outlined text-amber-400 mb-1.5 text-3xl sm:text-4xl">
                  air
                </span>
                <span className="font-headline text-xl sm:text-2xl font-bold text-slate-100">
                  {weatherData?.windSpeed ? `${Math.round(weatherData.windSpeed)}` : '24'}
                  <span className="text-xs font-normal text-slate-400 ml-0.5">km/h</span>
                </span>
                <span className="font-label-caps text-[10px] sm:text-xs text-slate-400 mt-1 text-center uppercase tracking-wider font-bold">
                  Wind Speed
                </span>
              </div>

              {/* Lightning Proximity */}
              <div className="flex flex-col items-center justify-center p-4 bg-rose-950/70 rounded-2xl border border-rose-800/80 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                <span
                  className="material-symbols-outlined text-rose-400 mb-1.5 text-3xl sm:text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  thunderstorm
                </span>
                <span className="font-headline text-xl sm:text-2xl font-bold text-rose-200">
                  1.2<span className="text-xs font-normal text-rose-300">km</span>
                </span>
                <span className="font-label-caps text-[10px] sm:text-xs text-rose-300 mt-1 text-center uppercase font-bold tracking-wider">
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
              className="bg-amber-400 text-slate-950 font-label-caps text-xs sm:text-sm py-4 px-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] font-bold uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-lg">campaign</span>
              Report Weather
            </button>

            <button
              id="btn-call-marshall-forecast"
              onClick={onOpenCallMarshall}
              className="bg-slate-900/80 border border-slate-700 text-slate-200 font-label-caps text-xs sm:text-sm py-4 px-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-95 transition-all font-bold uppercase tracking-wider"
            >
              <span className="material-symbols-outlined text-lg text-sky-400">call</span>
              Call Marshall
            </button>
          </div>

          {/* Live Environmental Station Telemetry Strip */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-caps text-xs text-sky-400 font-bold uppercase tracking-wider">
                REAL-TIME ATMOSPHERIC SENSORS (NEA KEYLESS API)
              </span>
              <span className="text-[10px] font-label-caps text-slate-400">
                UPDATED: {weatherData?.lastUpdated || 'LIVE'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-label-caps text-slate-400 block mb-0.5 uppercase tracking-wider">AIR TEMP</span>
                <span className="font-headline text-lg text-emerald-400 font-bold">
                  {weatherData?.temperature ?? 30.5}°C
                </span>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-label-caps text-slate-400 block mb-0.5 uppercase tracking-wider">HUMIDITY</span>
                <span className="font-headline text-lg text-sky-400 font-bold">
                  {weatherData?.humidity ?? 82}%
                </span>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-label-caps text-slate-400 block mb-0.5 uppercase tracking-wider">PM2.5 / PSI</span>
                <span className="font-headline text-lg text-amber-400 font-bold">
                  {weatherData?.pm25 ?? 14} µg / {weatherData?.psi ?? 45}
                </span>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-label-caps text-slate-400 block mb-0.5 uppercase tracking-wider">UV INDEX</span>
                <span className="font-headline text-lg text-rose-400 font-bold">
                  {weatherData?.uvIndex ?? 7.2} (MOD)
                </span>
              </div>
            </div>
          </div>

          {/* 4-Day Extended Meteorological Outlook */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="font-headline text-lg text-slate-100 mb-4 flex items-center justify-between font-bold">
              <span>4-Day Tournament Outlook</span>
              <span className="text-xs font-label-caps text-slate-400 tracking-wider">SINGAPORE BROADCAST</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(weatherData?.fourDayOutlook || [
                { day: 'Thu', forecast: 'Thundery Showers', temperature: { low: 25, high: 32 }, humidity: { low: 65, high: 95 } },
                { day: 'Fri', forecast: 'Thundery Showers', temperature: { low: 24, high: 31 }, humidity: { low: 70, high: 95 } },
                { day: 'Sat', forecast: 'Passing Showers', temperature: { low: 25, high: 33 }, humidity: { low: 60, high: 90 } },
                { day: 'Sun', forecast: 'Fair & Warm', temperature: { low: 26, high: 34 }, humidity: { low: 55, high: 85 } }
              ]).map((day, i) => (
                <div key={i} className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <span className="font-label-caps text-xs text-sky-400 font-bold block uppercase tracking-wider">{day.day}</span>
                    <span className="text-xs text-slate-200 line-clamp-2 mt-1.5 font-medium">{day.forecast}</span>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-slate-800 flex justify-between items-baseline text-xs">
                    <span className="font-label-caps text-emerald-400 font-bold">{day.temperature.high}°C</span>
                    <span className="font-label-caps text-slate-400">{day.temperature.low}°C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Map Snippet Side Panel (4 Cols) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-4 flex flex-col relative overflow-hidden min-h-[380px] shadow-2xl">
            <div className="absolute top-6 left-6 z-10 bg-slate-900/90 backdrop-blur-md px-3.5 py-1 rounded-full font-label-caps text-xs border border-slate-800 text-sky-400 font-bold">
              {selectedCourse.sector} Sector Radar
            </div>

            {/* Satellite Map image with overlay */}
            <div className="w-full h-72 sm:h-80 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfXGh3gVYZAkp5cuMOcuvCUeHpZJKjiKFVZ5_iYqxlMrlBW7ufzRPgv0-kK3nhnx7UwYb4ddJZ9M83aig_yfUHqmHz38ajfN-AF2COuFCBnMOpjxgWeAExVlr0sJ56htHZpOR9n6rrfSz8BuoJitIqyBFdiUYEcVUbv_bUzZm4aPfV_xrqiRtP0KE3FLRikrrtSgFlb9Y4vEZZ6HptfvzFJVqxw3i-q9WcymUezYDNQctK0UCK9uTimg"
                alt="Map snippet"
                className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity"
              />

              {/* Pulsing Danger Radius */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-rose-400 bg-rose-500/20 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                <div className="w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_12px_#fff]"></div>
              </div>

              {/* Electric blue strike crosshairs */}
              <span
                className="material-symbols-outlined absolute top-1/3 left-1/3 text-sky-400 text-2xl"
                style={{ textShadow: '0 0 12px rgba(56,189,248,0.9)' }}
              >
                close
              </span>
              <span
                className="material-symbols-outlined absolute bottom-1/3 right-1/4 text-sky-400 text-2xl"
                style={{ textShadow: '0 0 12px rgba(56,189,248,0.9)' }}
              >
                close
              </span>
            </div>

            {/* Evacuation Protocol Summary */}
            <div className="mt-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
              <span className="font-label-caps text-xs text-amber-400 block uppercase font-bold tracking-wider">
                ⚠️ Evacuation Protocol ({selectedCourse.shelters} Shelters Active)
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {selectedCourse.evacuationRoutes.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">›</span>
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
