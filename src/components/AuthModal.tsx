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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <main className="w-full max-w-md flex flex-col gap-6 relative z-10 my-auto">
        {/* Header */}
        <header className="text-center flex flex-col items-center gap-3">
          <div className="h-16 w-16 bg-[#004d40] rounded-full flex items-center justify-center border border-[#3f4945] shadow-lg">
            <span
              className="material-symbols-outlined text-[#94d3c1] text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
          </div>
          <h1 className="font-headline text-2xl md:text-3xl text-[#94d3c1] tracking-tight uppercase">
            SGP GOLF SHIELD
          </h1>
          <p className="text-[#bfc9c4] font-body text-sm">Professional Course Monitor</p>
        </header>

        {/* Form Card */}
        <div className="bg-[#1e201e] rounded-xl border border-[#3f4945] p-6 shadow-2xl shadow-black/80">
          {/* Tab Indicator */}
          <div className="flex border-b border-[#3f4945] mb-6">
            <button
              onClick={() => {
                setActiveTab('login');
                setStep('credentials');
              }}
              className={`w-1/2 pb-3 text-center font-label-caps text-xs transition-colors ${
                activeTab === 'login'
                  ? 'border-b-2 border-[#94d3c1] text-[#94d3c1] font-bold'
                  : 'text-[#bfc9c4] hover:text-[#e2e3df]'
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => {
                setActiveTab('2fa');
                setStep('pin');
              }}
              className={`w-1/2 pb-3 text-center font-label-caps text-xs transition-colors ${
                activeTab === '2fa'
                  ? 'border-b-2 border-[#94d3c1] text-[#94d3c1] font-bold'
                  : 'text-[#bfc9c4] hover:text-[#e2e3df]'
              }`}
            >
              2FA SETUP
            </button>
          </div>

          {step === 'credentials' ? (
            /* Login Form */
            <form onSubmit={handleAuthenticate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-[11px] text-[#bfc9c4]" htmlFor="operator-email">
                  OPERATOR ID
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#89938f] text-lg">
                    person
                  </span>
                  <input
                    id="operator-email"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter ID or Email"
                    className="w-full bg-[#0d0f0d] border-b-2 border-[#89938f] focus:border-[#00daf3] focus:ring-0 text-[#e2e3df] pl-10 pr-4 py-2.5 rounded-t transition-colors outline-none font-body text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-[11px] text-[#bfc9c4]" htmlFor="operator-passcode">
                  PASSCODE
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#89938f] text-lg">
                    key
                  </span>
                  <input
                    id="operator-passcode"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Passcode"
                    className="w-full bg-[#0d0f0d] border-b-2 border-[#89938f] focus:border-[#00daf3] focus:ring-0 text-[#e2e3df] pl-10 pr-4 py-2.5 rounded-t transition-colors outline-none font-body text-sm"
                  />
                </div>
              </div>

              <button
                id="btn-authenticate-operator"
                type="submit"
                className="mt-3 w-full h-12 bg-[#ffe2ab] text-[#402d00] font-label-caps text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-[#ffdfa0] transition-colors active:scale-95 font-bold shadow-md uppercase"
              >
                <span className="material-symbols-outlined text-lg">login</span>
                AUTHENTICATE
              </button>
            </form>
          ) : (
            /* 2FA Form */
            <div className="flex flex-col gap-5">
              <div className="text-center mb-1">
                <span className="material-symbols-outlined text-[#00daf3] text-4xl mb-1">
                  phonelink_ring
                </span>
                <h2 className="font-headline text-lg text-[#e2e3df]">Verification Required</h2>
                <p className="text-[#bfc9c4] text-xs mt-0.5">
                  A secure code has been dispatched to terminal ending in ***89
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-[10px] text-center text-[#bfc9c4]">
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
                      className="w-10 h-12 text-center bg-[#0d0f0d] border-b-2 border-[#89938f] focus:border-[#00daf3] focus:ring-0 text-[#e2e3df] rounded-t text-xl font-bold outline-none"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCompleteLogin}
                className="mt-2 w-full h-12 bg-[#94d3c1] text-[#00382e] font-label-caps text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-[#afefdd] transition-colors active:scale-95 shadow-[0_0_16px_rgba(0,218,243,0.3)] font-bold uppercase"
              >
                <span className="material-symbols-outlined text-lg">verified_user</span>
                VERIFY &amp; ACCESS
              </button>

              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-full text-center text-[#bfc9c4] font-label-caps text-xs hover:text-[#94d3c1] py-1 flex items-center justify-center gap-1.5 uppercase"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                BACK
              </button>
            </div>
          )}
        </div>

        {/* Footer / Support Info */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="font-label-caps text-xs text-[#89938f] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">lock</span>
            END-TO-END ENCRYPTED
          </span>
          <p className="text-[11px] text-[#3f4945] max-w-xs">
            Authorized Personnel Only. Logouts are enforced after 15 mins of inactivity.
          </p>

          <button
            onClick={onClose}
            className="text-xs text-[#89938f] hover:text-[#e2e3df] underline font-label-caps mt-1"
          >
            Close Dialog
          </button>
        </div>
      </main>
    </div>
  );
};
