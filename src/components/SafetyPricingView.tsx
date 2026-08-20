import React from 'react';

interface SafetyPricingViewProps {
  onOpenCheckout: () => void;
  onOpenSirenTest: () => void;
}

export const SafetyPricingView: React.FC<SafetyPricingViewProps> = ({
  onOpenCheckout,
  onOpenSirenTest
}) => {
  return (
    <div className="min-h-screen pt-4 pb-28 md:pb-12 md:pl-28 px-4 md:px-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Section */}
      <section className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center space-x-2 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800 mb-2">
          <span
            className="material-symbols-outlined text-amber-400 text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            workspace_premium
          </span>
          <span className="font-label-caps text-xs text-slate-300 font-bold tracking-wider">
            FOR GOLF EVENT ORGANIZERS &amp; CLUBS
          </span>
        </div>

        <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-slate-100 tracking-tight">
          Event <span className="text-sky-400 font-light">Pro Shield</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Secure your tournament with elite-tier meteorological intelligence. Predict rain,
          monitor multi-course lightning risks, and automate participant safety alerts in real-time.
        </p>
      </section>

      {/* Pricing Card Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* Main Pricing Card (8 Cols) */}
        <div className="col-span-1 md:col-span-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl transition-all">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <span className="material-symbols-outlined text-[160px] text-sky-400">
              security
            </span>
          </div>

          <div className="z-10 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-full text-xs font-label-caps font-bold mb-3 uppercase tracking-wider">
                ⚡ COMPLETE TOURNAMENT DEFENSE
              </div>
              <h2 className="font-headline text-2xl md:text-3xl text-slate-100 font-bold mb-2">
                Tournament Shield Package
              </h2>
              <div className="flex items-baseline space-x-2">
                <span className="font-headline text-5xl md:text-6xl font-extrabold text-slate-100 tracking-tight">
                  $499
                </span>
                <span className="font-sans text-base text-slate-400">/ event</span>
              </div>
              <p className="font-sans text-sm text-slate-400 mt-2">
                Full coverage for multi-day events across up to 3 affiliated courses in Singapore.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-sky-400">bolt</span>
                <span className="font-sans text-sm text-slate-300">
                  Real-time Lightning SMS Alerts for all participants
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-sky-400">
                  dashboard_customize
                </span>
                <span className="font-sans text-sm text-slate-300">
                  Dedicated Weather Marshall dashboard
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-sky-400">timer</span>
                <span className="font-sans text-sm text-slate-300">
                  Predictive rain start/stop timers
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-sky-400">map</span>
                <span className="font-sans text-sm text-slate-300">
                  Multi-course monitoring &amp; tracking
                </span>
              </div>
            </div>
          </div>

          <div className="z-10 mt-8 space-y-3">
            <button
              id="btn-contact-sales-checkout"
              onClick={onOpenCheckout}
              className="w-full bg-sky-400 text-slate-950 font-label-caps text-xs sm:text-sm py-4 rounded-2xl hover:bg-sky-300 active:scale-95 transition-all uppercase tracking-widest font-bold shadow-[0_0_25px_rgba(56,189,248,0.4)]"
            >
              Contact Sales to Get Started
            </button>

            <div className="flex items-center justify-between text-xs font-label-caps text-slate-500 px-1 font-bold">
              <span>✓ INSTANT MARSHALL PROVISIONING</span>
              <span>🔒 256-BIT ENCRYPTED</span>
            </div>
          </div>
        </div>

        {/* Side Bento Features (4 Cols) */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
          {/* Liability Feature */}
          <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 border border-slate-800 flex-1 flex flex-col justify-center shadow-xl hover:border-slate-700 transition-colors">
            <span className="material-symbols-outlined text-amber-400 mb-3 text-[36px]">
              gavel
            </span>
            <h3 className="font-headline text-xl text-slate-100 font-bold mb-2">
              Reduce Liability
            </h3>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Automated, logged SMS alerts provide a verifiable audit trail of safety warnings sent
              to every golfer on the course.
            </p>
          </div>

          {/* Planning Tool Feature */}
          <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 border border-slate-800 flex-1 flex flex-col justify-center shadow-xl hover:border-slate-700 transition-colors">
            <span className="material-symbols-outlined text-sky-400 mb-3 text-[36px]">
              calendar_clock
            </span>
            <h3 className="font-headline text-xl text-slate-100 font-bold mb-2">
              Wet-Weather Planning
            </h3>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Integrated alternative planning tool uses historical micro-climate data from Singapore
              meteorological radar to suggest optimal rain-delay schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Drill Action Simulator */}
      <section className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="font-headline text-lg text-slate-100 font-bold">
            Course Marshall Safety Broadcast Drill
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Test the tournament evacuation siren and verify multi-channel SMS alert dispatch.
          </p>
        </div>
        <button
          onClick={onOpenSirenTest}
          className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 border border-rose-800/80 text-rose-300 rounded-2xl font-label-caps text-xs flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all shadow-[0_0_15px_rgba(244,63,94,0.2)] font-bold uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-base text-rose-400">campaign</span>
          RUN SIREN DRILL
        </button>
      </section>
    </div>
  );
};
