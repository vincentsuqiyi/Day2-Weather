import React from 'react';
import { DangerLevel } from '../types';

interface TopAppBarProps {
  dangerLevel: DangerLevel;
  nearestStrikeKm: number;
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
  onOpenSiren: () => void;
  isLoggedIn: boolean;
  userRole: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  dangerLevel,
  nearestStrikeKm,
  onOpenAuth,
  onOpenNotifications,
  onOpenSiren,
  isLoggedIn,
  userRole
}) => {
  return (
    <header className="bg-[#121412] border-b border-[#3f4945] fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 transition-colors">
      {/* Left Action: Weather / Siren status */}
      <button
        id="btn-weather-hazard-trigger"
        onClick={onOpenSiren}
        title="Emergency Weather Advisory & Siren"
        className={`p-2 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
          dangerLevel === 'DANGER'
            ? 'bg-[#93000a] text-[#ffdad6] animate-pulse hover:bg-[#93000a]/90'
            : 'text-[#94d3c1] hover:bg-[#292a28]'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          thunderstorm
        </span>
      </button>

      {/* Center Brand Title */}
      <div className="flex flex-col items-center">
        <h1 className="font-headline text-[22px] md:text-[26px] font-extrabold text-[#94d3c1] tracking-tighter uppercase select-none">
          SGP GOLF SHIELD
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-label-caps text-[#89938f] tracking-widest uppercase">
            LIVE METEOROLOGICAL DEFENSE
          </span>
          {dangerLevel === 'DANGER' && (
            <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-label-caps rounded bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40 animate-pulse">
              ⚡ {nearestStrikeKm}KM PROX
            </span>
          )}
        </div>
      </div>

      {/* Right Actions: Notifications & Auth */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          id="btn-notifications-toggle"
          onClick={onOpenNotifications}
          title="Safety Notifications & Audit Logs"
          className="relative text-[#94d3c1] hover:bg-[#292a28] active:scale-95 transition-transform p-2 rounded-full flex items-center justify-center"
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            notifications_active
          </span>
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ffbf00] rounded-full border-2 border-[#121412]"></span>
        </button>

        <button
          id="btn-auth-profile"
          onClick={onOpenAuth}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-label-caps ${
            isLoggedIn
              ? 'bg-[#004d40] border-[#94d3c1] text-[#afefdd]'
              : 'bg-[#1e201e] border-[#3f4945] text-[#bfc9c4] hover:border-[#94d3c1]'
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {isLoggedIn ? 'verified_user' : 'account_circle'}
          </span>
          <span className="hidden sm:inline">
            {isLoggedIn ? userRole.toUpperCase() : 'OPERATOR'}
          </span>
        </button>
      </div>
    </header>
  );
};
