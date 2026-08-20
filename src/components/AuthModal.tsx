import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (operatorName: string, role: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | '2fa'>('login');
  const [email, setEmail] = useState('marshall.sentosa@sgpgolfshield.gov.sg');
  const [password, setPassword] = useState('••••••••••••');
  const [twoFaDigits, setTwoFaDigits] = useState(['5', '9', '2', '8', '1', '4']);
  const [step, setStep] = useState<'credentials' | 'pin'>('credentials');

  if (!isOpen) return null;

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('pin');
  };

  const handlePinChange = (index: number, val: string) => {
    const next = [...twoFaDigits];
    next[index] = val.slice(-1);
    setTwoFaDigits(next);
  };

  const handleCompleteLogin = () => {
    onLoginSuccess('Chief Marshall Tan', 'Event Organizer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <main className="w-full max-w-md flex flex-col gap-6 relative z-10 my-auto">
        {/* Header */}
        <header className="text-center flex flex-col items-center gap-3">
          <div className="h-16 w-16 bg-sky-500/10 rounded-3xl flex items-center justify-center border border-sky-500/30 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            <span
              className="material-symbols-outlined text-sky-400 text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
          </div>
          <h1 className="font-headline text-2xl md:text-3xl text-slate-100 tracking-tight font-bold uppercase">
            SGP GOLF SHIELD
          </h1>
          <p className="text-slate-400 font-sans text-xs">Professional Course Monitor &amp; Marshall Portal</p>
        </header>

        {/* Form Card */}
        <div className="bg-slate-950/90 rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl">
          {/* Tab Indicator */}
          <div className="flex border-b border-slate-800 mb-6">
            <button
              onClick={() => {
                setActiveTab('login');
                setStep('credentials');
              }}
              className={`w-1/2 pb-3 text-center font-label-caps text-xs transition-all font-bold tracking-wider ${
                activeTab === 'login'
                  ? 'border-b-2 border-sky-400 text-sky-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => {
                setActiveTab('2fa');
                setStep('pin');
              }}
              className={`w-1/2 pb-3 text-center font-label-caps text-xs transition-all font-bold tracking-wider ${
                activeTab === '2fa'
                  ? 'border-b-2 border-sky-400 text-sky-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2FA VERIFY
            </button>
          </div>

          {step === 'credentials' ? (
            /* Login Form */
            <form onSubmit={handleAuthenticate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[10px] text-slate-400 uppercase tracking-wider font-bold" htmlFor="operator-email">
                  OPERATOR ID
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                    person
                  </span>
                  <input
                    id="operator-email"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter ID or Email"
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-sky-400 text-slate-100 pl-11 pr-4 py-2.5 rounded-2xl transition-colors outline-none font-sans text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-[10px] text-slate-400 uppercase tracking-wider font-bold" htmlFor="operator-passcode">
                  PASSCODE
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                    key
                  </span>
                  <input
                    id="operator-passcode"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Passcode"
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-sky-400 text-slate-100 pl-11 pr-4 py-2.5 rounded-2xl transition-colors outline-none font-sans text-xs"
                  />
                </div>
              </div>

              <button
                id="btn-authenticate-operator"
                type="submit"
                className="mt-3 w-full h-12 bg-sky-400 text-slate-950 font-label-caps text-xs rounded-2xl flex items-center justify-center gap-2 hover:bg-sky-300 transition-all active:scale-95 font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)] uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-lg">login</span>
                AUTHENTICATE
              </button>
            </form>
          ) : (
            /* 2FA Form */
            <div className="flex flex-col gap-5">
              <div className="text-center mb-1">
                <span className="material-symbols-outlined text-sky-400 text-4xl mb-1">
                  phonelink_ring
                </span>
                <h2 className="font-headline text-lg text-slate-100 font-bold">Verification Required</h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  A secure code has been dispatched to terminal ending in ***89
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-[10px] text-center text-slate-400 uppercase tracking-wider font-bold">
                  ENTER 6-DIGIT PIN
                </label>
                <div className="flex justify-between gap-1.5 px-2">
                  {twoFaDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handlePinChange(idx, e.target.value)}
                      className="w-10 h-12 text-center bg-slate-900/90 border border-slate-800 focus:border-sky-400 text-slate-100 rounded-2xl text-xl font-bold outline-none shadow-sm"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCompleteLogin}
                className="mt-2 w-full h-12 bg-sky-400 text-slate-950 font-label-caps text-xs rounded-2xl flex items-center justify-center gap-2 hover:bg-sky-300 transition-all active:scale-95 shadow-[0_0_20px_rgba(56,189,248,0.4)] font-bold uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-lg">verified_user</span>
                VERIFY &amp; ACCESS
              </button>

              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-full text-center text-slate-400 font-label-caps text-xs hover:text-slate-200 py-1 flex items-center justify-center gap-1.5 uppercase font-bold"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                BACK
              </button>
            </div>
          )}
        </div>

        {/* Footer / Support Info */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="font-label-caps text-xs text-slate-400 flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-sm text-sky-400">lock</span>
            END-TO-END ENCRYPTED
          </span>
          <p className="text-[11px] text-slate-500 max-w-xs">
            Authorized Personnel Only. Logouts are enforced after 15 mins of inactivity.
          </p>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200 underline font-label-caps mt-1 font-bold"
          >
            Close Dialog
          </button>
        </div>
      </main>
    </div>
  );
};
