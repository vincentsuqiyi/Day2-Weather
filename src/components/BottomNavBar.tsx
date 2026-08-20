import React from 'react';

interface BottomNavBarProps {
  activeTab: 'map' | 'courses' | 'forecast' | 'safety';
  onTabChange: (tab: 'map' | 'courses' | 'forecast' | 'safety') => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="bg-[#0d0f0d] border-t border-[#3f4945] fixed bottom-0 w-full z-50 h-20 flex justify-around items-center px-2 md:hidden">
        {/* MAP TAB */}
        <button
          id="nav-tab-map-mobile"
          onClick={() => onTabChange('map')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'map'
              ? 'bg-[#ffbf00] text-[#6d5000] rounded-full px-4 py-1.5 shadow-lg'
              : 'text-[#bfc9c4] hover:text-[#94d3c1] w-16'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px] mb-0.5"
            style={{ fontVariationSettings: activeTab === 'map' ? "'FILL' 1" : "'FILL' 0" }}
          >
            explore
          </span>
          <span className="font-label-caps text-[11px] uppercase tracking-wider">MAP</span>
        </button>

        {/* COURSES TAB */}
        <button
          id="nav-tab-courses-mobile"
          onClick={() => onTabChange('courses')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'courses'
              ? 'bg-[#ffbf00] text-[#6d5000] rounded-full px-4 py-1.5 shadow-lg'
              : 'text-[#bfc9c4] hover:text-[#94d3c1] w-16'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px] mb-0.5"
            style={{ fontVariationSettings: activeTab === 'courses' ? "'FILL' 1" : "'FILL' 0" }}
          >
            golf_course
          </span>
          <span className="font-label-caps text-[11px] uppercase tracking-wider">COURSES</span>
        </button>

        {/* FORECAST TAB */}
        <button
          id="nav-tab-forecast-mobile"
          onClick={() => onTabChange('forecast')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'forecast'
              ? 'bg-[#ffbf00] text-[#6d5000] rounded-full px-4 py-1.5 shadow-lg'
              : 'text-[#bfc9c4] hover:text-[#94d3c1] w-16'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px] mb-0.5"
            style={{ fontVariationSettings: activeTab === 'forecast' ? "'FILL' 1" : "'FILL' 0" }}
          >
            thunderstorm
          </span>
          <span className="font-label-caps text-[11px] uppercase tracking-wider">FORECAST</span>
        </button>

        {/* SAFETY TAB */}
        <button
          id="nav-tab-safety-mobile"
          onClick={() => onTabChange('safety')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'safety'
              ? 'bg-[#ffbf00] text-[#6d5000] rounded-full px-4 py-1.5 shadow-lg'
              : 'text-[#bfc9c4] hover:text-[#94d3c1] w-16'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px] mb-0.5"
            style={{ fontVariationSettings: activeTab === 'safety' ? "'FILL' 1" : "'FILL' 0" }}
          >
            security
          </span>
          <span className="font-label-caps text-[11px] uppercase tracking-wider">SAFETY</span>
        </button>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex fixed left-0 top-16 bottom-0 w-24 bg-[#0d0f0d] border-r border-[#3f4945] flex-col items-center py-8 gap-8 z-40">
        <button
          id="nav-tab-map-desktop"
          onClick={() => onTabChange('map')}
          className={`flex flex-col items-center justify-center group transition-all ${
            activeTab === 'map' ? 'text-[#ffbf00]' : 'text-[#bfc9c4] hover:text-[#94d3c1]'
          }`}
        >
          <div
            className={`p-3 rounded-full mb-1 transition-colors ${
              activeTab === 'map' ? 'bg-[#ffbf00] text-[#6d5000]' : 'group-hover:bg-[#292a28]'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: activeTab === 'map' ? "'FILL' 1" : "'FILL' 0" }}
            >
              explore
            </span>
          </div>
          <span className="font-label-caps text-xs">MAP</span>
        </button>

        <button
          id="nav-tab-courses-desktop"
          onClick={() => onTabChange('courses')}
          className={`flex flex-col items-center justify-center group transition-all ${
            activeTab === 'courses' ? 'text-[#ffbf00]' : 'text-[#bfc9c4] hover:text-[#94d3c1]'
          }`}
        >
          <div
            className={`p-3 rounded-full mb-1 transition-colors ${
              activeTab === 'courses' ? 'bg-[#ffbf00] text-[#6d5000]' : 'group-hover:bg-[#292a28]'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: activeTab === 'courses' ? "'FILL' 1" : "'FILL' 0" }}
            >
              golf_course
            </span>
          </div>
          <span className="font-label-caps text-xs">COURSES</span>
        </button>

        <button
          id="nav-tab-forecast-desktop"
          onClick={() => onTabChange('forecast')}
          className={`flex flex-col items-center justify-center group transition-all ${
            activeTab === 'forecast' ? 'text-[#ffbf00]' : 'text-[#bfc9c4] hover:text-[#94d3c1]'
          }`}
        >
          <div
            className={`p-3 rounded-full mb-1 transition-colors ${
              activeTab === 'forecast' ? 'bg-[#ffbf00] text-[#6d5000]' : 'group-hover:bg-[#292a28]'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: activeTab === 'forecast' ? "'FILL' 1" : "'FILL' 0" }}
            >
              thunderstorm
            </span>
          </div>
          <span className="font-label-caps text-xs">FORECAST</span>
        </button>

        <button
          id="nav-tab-safety-desktop"
          onClick={() => onTabChange('safety')}
          className={`flex flex-col items-center justify-center group transition-all ${
            activeTab === 'safety' ? 'text-[#ffbf00]' : 'text-[#bfc9c4] hover:text-[#94d3c1]'
          }`}
        >
          <div
            className={`p-3 rounded-full mb-1 transition-colors ${
              activeTab === 'safety' ? 'bg-[#ffbf00] text-[#6d5000]' : 'group-hover:bg-[#292a28]'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: activeTab === 'safety' ? "'FILL' 1" : "'FILL' 0" }}
            >
              security
            </span>
          </div>
          <span className="font-label-caps text-xs">SAFETY</span>
        </button>
      </nav>
    </>
  );
};
