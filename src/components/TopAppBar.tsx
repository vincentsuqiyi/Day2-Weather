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
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 transition-colors">
      {/* Left Action: Weather / Siren status */}
      <button
        id="btn-weather-hazard-trigger"
        onClick={onOpenSiren}
        title="Emergency Weather Advisory & Siren"
        className={`p-2 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
          dangerLevel === 'DANGER'
            ? 'bg-rose-950/70 text-rose-400 border border-rose-800/80 animate-pulse hover:bg-rose-900/80 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
            : 'bg-slate-900/80 text-sky-400 border border-slate-800 hover:bg-slate-800 hover:text-sky-300'
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
        <h1 className="font-headline text-[20px] md:text-[24px] font-bold text-slate-100 tracking-tight uppercase select-none flex items-center gap-2">
          <span>SINGAPORE</span>
          <span className="text-sky-400 font-extralight tracking-normal">GOLF SHIELD</span>
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-label-caps text-slate-400 tracking-widest uppercase">
            LIVE METEOROLOGICAL RADAR
          </span>
          {dangerLevel === 'DANGER' ? (
            <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-label-caps rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/80 animate-pulse">
              ⚡ {nearestStrikeKm}KM PROX
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-label-caps rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
              ● SECURE
            </span>
          )}
        </div>
      </div>

      {/* Right Actions: Notifications & Auth */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          id="btn-notifications-toggle"
          onClick={onOpenNotifications}
          title="Safety Notifications & Audit Logs"
          className="relative text-slate-300 hover:text-sky-400 hover:bg-slate-900/80 active:scale-95 transition-all p-2 rounded-xl border border-transparent hover:border-slate-800 flex items-center justify-center"
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            notifications_active
          </span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
        </button>

        <button
          id="btn-auth-profile"
          onClick={onOpenAuth}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all text-xs font-label-caps ${
            isLoggedIn
              ? 'bg-slate-900/80 border-slate-700 text-sky-300 hover:border-sky-400'
              : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <span className="material-symbols-outlined text-base text-sky-400">
            {isLoggedIn ? 'verified_user' : 'account_circle'}
          </span>
          <span className="hidden sm:inline font-bold tracking-wider">
            {isLoggedIn ? userRole.toUpperCase() : 'OPERATOR'}
          </span>
        </button>
      </div>
    </header>
  );
};
