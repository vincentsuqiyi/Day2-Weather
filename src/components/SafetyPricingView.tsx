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
    <div className="min-h-screen pt-4 pb-28 md:pb-12 md:pl-28 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center space-x-2 bg-[#1e201e] px-4 py-2 rounded-full border border-[#3f4945] mb-2">
          <span
            className="material-symbols-outlined text-[#ffbf00]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            workspace_premium
          </span>
          <span className="font-label-caps text-xs text-[#e2e3df]">
            FOR GOLF EVENT ORGANIZERS
          </span>
        </div>

        <h1 className="font-display-weather text-5xl md:text-7xl lg:text-[80px] text-[#94d3c1] tracking-tight">
          Event Pro
        </h1>

        <p className="font-body text-base md:text-lg text-[#bfc9c4] max-w-2xl mx-auto leading-relaxed">
          Secure your tournament with elite-tier meteorological intelligence. Predict rain,
          monitor multi-course lightning risks, and automate participant safety alerts in real-time.
        </p>
      </section>

      {/* Pricing Card Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* Main Pricing Card (8 Cols) */}
        <div className="col-span-1 md:col-span-8 bg-[#1a1c1a] border border-[#94d3c1] rounded-2xl p-6 md:p-8 glow-cyan relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[140px] text-[#94d3c1]">
              security
            </span>
          </div>

          <div className="z-10 space-y-6">
            <div>
              <h2 className="font-headline text-2xl md:text-3xl text-[#94d3c1] mb-2">
                Tournament Shield Package
              </h2>
              <div className="flex items-baseline space-x-2">
                <span className="font-display-weather text-5xl md:text-6xl text-[#e2e3df]">
                  $499
                </span>
                <span className="font-body text-base text-[#bfc9c4]">/ event</span>
              </div>
              <p className="font-body text-sm text-[#bfc9c4] mt-2">
                Full coverage for multi-day events across up to 3 affiliated courses in Singapore.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-[#00daf3]">bolt</span>
                <span className="font-body text-sm text-[#e2e3df]">
                  Real-time Lightning SMS Alerts for all participants
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-[#00daf3]">
                  dashboard_customize
                </span>
                <span className="font-body text-sm text-[#e2e3df]">
                  Dedicated Weather Marshall dashboard
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-[#00daf3]">timer</span>
                <span className="font-body text-sm text-[#e2e3df]">
                  Predictive rain start/stop timers
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-[#00daf3]">map</span>
                <span className="font-body text-sm text-[#e2e3df]">
                  Multi-course monitoring &amp; tracking
                </span>
              </div>
            </div>
          </div>

          <div className="z-10 mt-8 space-y-3">
            <button
              id="btn-contact-sales-checkout"
              onClick={onOpenCheckout}
              className="w-full bg-[#ffbf00] text-[#6d5000] font-label-caps text-xs sm:text-sm py-4 rounded-xl hover:bg-[#ffe2ab] active:scale-95 transition-all uppercase tracking-widest font-bold shadow-lg shadow-[#ffbf00]/20"
            >
              Contact Sales to Get Started
            </button>

            <div className="flex items-center justify-between text-xs font-label-caps text-[#89938f] px-1">
              <span>✓ INSTANT MARSHALL PROVISIONING</span>
              <span>🔒 256-BIT ENCRYPTED</span>
            </div>
          </div>
        </div>

        {/* Side Bento Features (4 Cols) */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
          {/* Liability Feature */}
          <div className="bg-[#1e201e] rounded-2xl p-6 border border-[#3f4945] flex-1 flex flex-col justify-center">
            <span className="material-symbols-outlined text-[#ffbf00] mb-3 text-[36px]">
              gavel
            </span>
            <h3 className="font-headline text-xl text-[#e2e3df] mb-2">
              Reduce Liability
            </h3>
            <p className="font-body text-xs text-[#bfc9c4] leading-relaxed">
              Automated, logged SMS alerts provide a verifiable audit trail of safety warnings sent
              to every golfer on the course.
            </p>
          </div>

          {/* Planning Tool Feature */}
          <div className="bg-[#1e201e] rounded-2xl p-6 border border-[#3f4945] flex-1 flex flex-col justify-center">
            <span className="material-symbols-outlined text-[#94d3c1] mb-3 text-[36px]">
              calendar_clock
            </span>
            <h3 className="font-headline text-xl text-[#e2e3df] mb-2">
              Wet-Weather Planning
            </h3>
            <p className="font-body text-xs text-[#bfc9c4] leading-relaxed">
              Integrated alternative planning tool uses historical micro-climate data from Singapore
              meteorological radar to suggest optimal rain-delay schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Drill Action Simulator */}
      <section className="bg-[#1a1c1a] border border-[#3f4945] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-headline text-lg text-[#e2e3df]">
            Course Marshall Safety Broadcast Drill
          </h4>
          <p className="text-xs text-[#bfc9c4] mt-0.5">
            Test the tournament evacuation siren and verify multi-channel SMS alert dispatch.
          </p>
        </div>
        <button
          onClick={onOpenSirenTest}
          className="px-5 py-3 bg-[#292a28] hover:bg-[#333533] border border-[#ffb4ab]/50 text-[#ffdad6] rounded-xl font-label-caps text-xs flex items-center gap-2 whitespace-nowrap active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-sm text-[#ffb4ab]">campaign</span>
          RUN SIREN DRILL
        </button>
      </section>
    </div>
  );
};
