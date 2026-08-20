import React, { useState } from 'react';
import { GolfCourse, LiveWeatherData } from '../types';

interface CoursesViewProps {
  courses: GolfCourse[];
  selectedCourse: GolfCourse;
  weatherData: LiveWeatherData | null;
  onSelectCourse: (course: GolfCourse) => void;
  onSwitchToMap: () => void;
  onOpenSiren: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  selectedCourse,
  weatherData,
  onSelectCourse,
  onSwitchToMap,
  onOpenSiren
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const sectors = ['ALL', 'South', 'East', 'Central', 'North', 'West'];

  const filtered = courses.filter((c) => {
    const matchesSector = selectedSector === 'ALL' || c.sector === selectedSector;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.areaName.toLowerCase().includes(search.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-4 pb-28 md:pb-12 md:pl-28 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 px-3.5 py-1 rounded-full border border-slate-800 mb-2">
            <span className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              golf_course
            </span>
            <span className="font-label-caps text-xs text-slate-300 font-bold tracking-wider">SINGAPORE GOLF COURSE NETWORK</span>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl text-slate-100 tracking-tight font-bold">
            Active Course Status
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSiren}
            className="px-4 py-2.5 bg-rose-950/80 text-rose-300 border border-rose-800/80 rounded-2xl text-xs font-label-caps hover:bg-rose-900 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.3)] font-bold tracking-wider"
          >
            <span className="material-symbols-outlined text-sm text-rose-400">emergency_home</span>
            EMERGENCY BROADCAST
          </button>
        </div>
      </div>

      {/* Filter Chips & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSector(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-label-caps transition-all uppercase whitespace-nowrap ${
                selectedSector === s
                  ? 'bg-sky-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Golf Clubs..."
            className="w-full bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs font-label-caps rounded-2xl py-2.5 pl-10 pr-3 focus:border-sky-400 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course) => {
          const isSelected = course.id === selectedCourse.id;
          const isDanger = course.sector === 'South' || course.sector === 'East';
          const areaForecast = weatherData?.twoHrForecasts.find(
            (f) =>
              f.area.toLowerCase().includes(course.areaName.toLowerCase()) ||
              course.areaName.toLowerCase().includes(f.area.toLowerCase())
          )?.forecast || 'Thundery Showers';

          return (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className={`bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between hover:shadow-2xl ${
                isSelected
                  ? 'border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.25)] bg-slate-900/80'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-label-caps text-sky-400 uppercase tracking-wider block font-bold">
                      {course.sector} Sector · {course.holes} Holes
                    </span>
                    <h3 className="font-headline text-xl text-slate-100 leading-tight font-bold mt-0.5">
                      {course.name}
                    </h3>
                  </div>

                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-label-caps uppercase ${
                      isDanger
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80 animate-pulse'
                        : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                    }`}
                  >
                    {isDanger ? '⚡ DANGER' : '✓ CLEAR'}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* 4 Stats Grid */}
                <div className="grid grid-cols-4 gap-2 bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 mb-4">
                  <div className="text-center">
                    <span className="text-[9px] font-label-caps text-slate-500 block uppercase tracking-wider">WIND</span>
                    <span className="font-headline text-xs text-amber-400 font-bold">
                      {weatherData?.windSpeed ? `${Math.round(weatherData.windSpeed)}k` : '24k'}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-label-caps text-slate-500 block uppercase tracking-wider">RAIN %</span>
                    <span className="font-headline text-xs text-sky-400 font-bold">
                      {isDanger ? '85%' : '20%'}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-label-caps text-slate-500 block uppercase tracking-wider">PROX</span>
                    <span className="font-headline text-xs text-rose-400 font-bold">
                      {isDanger ? '1.8km' : '8.4km'}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-label-caps text-slate-500 block uppercase tracking-wider">SHELTER</span>
                    <span className="font-headline text-xs text-emerald-400 font-bold">
                      {course.shelters}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-[11px] font-label-caps text-slate-400">
                  FEED: <strong className="text-slate-200">{areaForecast}</strong>
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCourse(course);
                    onSwitchToMap();
                  }}
                  className="text-sky-400 hover:text-sky-300 font-label-caps text-xs flex items-center gap-1 font-bold tracking-wider"
                >
                  TRACK ON RADAR ›
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
