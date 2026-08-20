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
          <div className="inline-flex items-center space-x-2 bg-[#1e201e] px-3 py-1 rounded-full border border-[#3f4945] mb-2">
            <span className="material-symbols-outlined text-[#ffbf00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              golf_course
            </span>
            <span className="font-label-caps text-xs text-[#e2e3df]">SINGAPORE GOLF COURSE NETWORK</span>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl text-[#94d3c1] tracking-tight">
            Active Course Status
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSiren}
            className="px-4 py-2 bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40 rounded-lg text-xs font-label-caps hover:bg-[#93000a]/80 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">emergency_home</span>
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-label-caps transition-colors uppercase whitespace-nowrap ${
                selectedSector === s
                  ? 'bg-[#94d3c1] text-[#00382e] font-bold shadow-md'
                  : 'bg-[#1e201e] text-[#bfc9c4] hover:bg-[#292a28] border border-[#3f4945]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#89938f] text-sm">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Golf Clubs..."
            className="w-full bg-[#1e201e] border border-[#3f4945] text-[#e2e3df] text-xs font-label-caps rounded-lg py-2 pl-9 pr-3 focus:border-[#00daf3] focus:outline-none"
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
              className={`bg-[#1e201e] rounded-xl p-5 border transition-all cursor-pointer flex flex-col justify-between hover:shadow-xl ${
                isSelected
                  ? 'border-[#94d3c1] shadow-[0_0_20px_rgba(148,211,193,0.2)] bg-[#1e201e]/90'
                  : 'border-[#3f4945] hover:border-[#89938f]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-label-caps text-[#94d3c1] uppercase block">
                      {course.sector} Sector · {course.holes} Holes
                    </span>
                    <h3 className="font-headline text-xl text-[#e2e3df] leading-tight">
                      {course.name}
                    </h3>
                  </div>

                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label-caps uppercase ${
                      isDanger
                        ? 'bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40 animate-pulse'
                        : 'bg-[#004d40] text-[#94d3c1] border border-[#94d3c1]/30'
                    }`}
                  >
                    {isDanger ? '⚡ DANGER' : '✓ CLEAR'}
                  </span>
                </div>

                <p className="text-xs text-[#bfc9c4] line-clamp-2 mb-4">
                  {course.description}
                </p>

                {/* 4 Stats Grid */}
                <div className="grid grid-cols-4 gap-2 bg-[#121412] p-2.5 rounded-lg border border-[#3f4945]/50 mb-3">
                  <div className="text-center">
                    <span className="text-[9px] font-label-caps text-[#89938f] block">WIND</span>
                    <span className="font-headline text-xs text-[#ffe2ab]">
                      {weatherData?.windSpeed ? `${Math.round(weatherData.windSpeed)}k` : '24k'}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-label-caps text-[#89938f] block">RAIN %</span>
                    <span className="font-headline text-xs text-[#94d3c1]">
                      {isDanger ? '85%' : '20%'}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-label-caps text-[#89938f] block">PROX</span>
                    <span className="font-headline text-xs text-[#ffb4ab]">
                      {isDanger ? '1.8km' : '8.4km'}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-label-caps text-[#89938f] block">SHELTER</span>
                    <span className="font-headline text-xs text-[#00daf3]">
                      {course.shelters}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[#3f4945]/40 text-xs">
                <span className="text-[11px] font-label-caps text-[#bfc9c4]">
                  FORECAST: <strong className="text-[#94d3c1]">{areaForecast}</strong>
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCourse(course);
                    onSwitchToMap();
                  }}
                  className="text-[#ffbf00] hover:text-[#ffdfa0] font-label-caps text-xs flex items-center gap-1 font-bold"
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
