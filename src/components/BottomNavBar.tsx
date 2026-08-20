import React from 'react';

interface BottomNavBarProps {
  activeTab: 'map' | 'courses' | 'forecast' | 'safety';
  onTabChange: (tab: 'map' | 'courses' | 'forecast' | 'safety') => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="bg-slate-950/90 backdrop-blur-md border-t border-slate-800 fixed bottom-0 w-full z-50 h-20 flex justify-around items-center px-3 md:hidden">
        {/* MAP TAB */}
        <button
          id="nav-tab-map-mobile"
          onClick={() => onTabChange('map')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'map'
              ? 'bg-sky-400 text-slate-950 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] font-bold'
              : 'text-slate-400 hover:text-sky-400 w-16'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px] mb-0.5"
            style={{ fontVariationSettings: activeTab === 'map' ? "'FILL' 1" : "'FILL' 0" }}
          >
            explore
          </span>
          <span className="font-label-caps text-[10px] uppercase tracking-widest font-bold">MAP</span>
        </button>

        {/* COURSES TAB */}
        <button
          id="nav-tab-courses-mobile"
          onClick={() => onTabChange('courses')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'courses'
              ? 'bg-sky-400 text-slate-950 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] font-bold'
              : 'text-slate-400 hover:text-sky-400 w-16'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px] mb-0.5"
            style={{ fontVariationSettings: activeTab === 'courses' ? "'FILL' 1" : "'FILL' 0" }}
          >
            golf_course
          </span>
          <span className="font-label-caps text-[10px] uppercase tracking-widest font-bold">COURSES</span>
        </button>

        {/* FORECAST TAB */}
        <button
          id="nav-tab-forecast-mobile"
          onClick={() => onTabChange('forecast')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'forecast'
              ? 'bg-sky-400 text-slate-950 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] font-bold'
              : 'text-slate-400 hover:text-sky-400 w-16'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px] mb-0.5"
            style={{ fontVariationSettings: activeTab === 'forecast' ? "'FILL' 1" : "'FILL' 0" }}
          >
            thunderstorm
          </span>
          <span className="font-label-caps text-[10px] uppercase tracking-widest font-bold">FORECAST</span>
        </button>

        {/* SAFETY TAB */}
        <button
          id="nav-tab-safety-mobile"
          onClick={() => onTabChange('safety')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'safety'
              ? 'bg-sky-400 text-slate-950 rounded-full px-4 py-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] font-bold'
              : 'text-slate-400 hover:text-sky-400 w-16'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px] mb-0.5"
            style={{ fontVariationSettings: activeTab === 'safety' ? "'FILL' 1" : "'FILL' 0" }}
          >
            security
          </span>
          <span className="font-label-caps text-[10px] uppercase tracking-widest font-bold">SAFETY</span>
        </button>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex fixed left-0 top-16 bottom-0 w-24 bg-slate-950/90 backdrop-blur-md border-r border-slate-800 flex-col items-center py-8 gap-8 z-40">
        <button
          id="nav-tab-map-desktop"
          onClick={() => onTabChange('map')}
          className={`flex flex-col items-center justify-center group transition-all ${
            activeTab === 'map' ? 'text-sky-400' : 'text-slate-400 hover:text-sky-300'
          }`}
        >
          <div
            className={`p-3 rounded-2xl mb-1 transition-all ${
              activeTab === 'map'
                ? 'bg-sky-400 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                : 'group-hover:bg-slate-900 group-hover:text-slate-200'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: activeTab === 'map' ? "'FILL' 1" : "'FILL' 0" }}
            >
              explore
            </span>
          </div>
          <span className="font-label-caps text-[10px] uppercase tracking-wider font-bold">MAP</span>
        </button>

        <button
          id="nav-tab-courses-desktop"
          onClick={() => onTabChange('courses')}
          className={`flex flex-col items-center justify-center group transition-all ${
            activeTab === 'courses' ? 'text-sky-400' : 'text-slate-400 hover:text-sky-300'
          }`}
        >
          <div
            className={`p-3 rounded-2xl mb-1 transition-all ${
              activeTab === 'courses'
                ? 'bg-sky-400 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                : 'group-hover:bg-slate-900 group-hover:text-slate-200'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: activeTab === 'courses' ? "'FILL' 1" : "'FILL' 0" }}
            >
              golf_course
            </span>
          </div>
          <span className="font-label-caps text-[10px] uppercase tracking-wider font-bold">COURSES</span>
        </button>

        <button
          id="nav-tab-forecast-desktop"
          onClick={() => onTabChange('forecast')}
          className={`flex flex-col items-center justify-center group transition-all ${
            activeTab === 'forecast' ? 'text-sky-400' : 'text-slate-400 hover:text-sky-300'
          }`}
        >
          <div
            className={`p-3 rounded-2xl mb-1 transition-all ${
              activeTab === 'forecast'
                ? 'bg-sky-400 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                : 'group-hover:bg-slate-900 group-hover:text-slate-200'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: activeTab === 'forecast' ? "'FILL' 1" : "'FILL' 0" }}
            >
              thunderstorm
            </span>
          </div>
          <span className="font-label-caps text-[10px] uppercase tracking-wider font-bold">FORECAST</span>
        </button>

        <button
          id="nav-tab-safety-desktop"
          onClick={() => onTabChange('safety')}
          className={`flex flex-col items-center justify-center group transition-all ${
            activeTab === 'safety' ? 'text-sky-400' : 'text-slate-400 hover:text-sky-300'
          }`}
        >
          <div
            className={`p-3 rounded-2xl mb-1 transition-all ${
              activeTab === 'safety'
                ? 'bg-sky-400 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                : 'group-hover:bg-slate-900 group-hover:text-slate-200'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: activeTab === 'safety' ? "'FILL' 1" : "'FILL' 0" }}
            >
              security
            </span>
          </div>
          <span className="font-label-caps text-[10px] uppercase tracking-wider font-bold">SAFETY</span>
        </button>
      </nav>
    </>
  );
};
