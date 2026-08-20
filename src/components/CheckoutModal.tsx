import React, { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay'>('card');
  const [cardName, setCardName] = useState('MARSHALL PRO');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8819');
  const [expiry, setExpiry] = useState('09/28');
  const [cvc, setCvc] = useState('883');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-950/90 text-slate-100 rounded-3xl border border-slate-800 w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Top Header */}
        <header className="flex justify-between items-center px-6 h-16 border-b border-slate-800 bg-slate-900/80">
          <button
            id="btn-checkout-back"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline text-lg md:text-xl font-bold text-slate-100 tracking-tight uppercase">
            EVENT PRO CHECKOUT
          </h1>
          <div className="w-10"></div>
        </header>

        {isPaid ? (
          /* Payment Success State */
          <div className="p-8 md:p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-950/80 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto border border-emerald-800/80 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div>
              <h2 className="font-headline text-2xl text-slate-100 font-bold">License Activated!</h2>
              <p className="text-sm text-slate-400 mt-1">
                Event Pro Shield single-event license has been provisioned.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 text-left font-label-caps text-xs space-y-2.5">
              <div className="flex justify-between text-slate-400 font-bold">
                <span>ORDER ID</span>
                <span className="text-slate-200">SGP-SHIELD-2026-9942</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold">
                <span>AMOUNT PAID</span>
                <span className="text-amber-400 font-bold text-sm">$499.00 SGD</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold">
                <span>MARSHALL DISPATCH KEY</span>
                <span className="text-sky-400 font-bold">EP-KEY-SENTOSA-4X9</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-sky-400 text-slate-950 font-label-caps text-xs py-4 rounded-2xl font-bold hover:bg-sky-300 transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] uppercase tracking-wider"
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
            {/* Order Summary Bento */}
            <section className="bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center">
                <h2 className="font-label-caps text-xs uppercase text-slate-400 font-bold tracking-wider">Order Summary</h2>
                <span className="material-symbols-outlined text-slate-400 text-lg">
                  shopping_cart
                </span>
              </div>

              <div className="p-5 md:p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline text-lg md:text-xl text-slate-100 font-bold tracking-tight">
                      Event Pro Shield
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Single Tournament License</p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-2xl text-slate-100 font-extrabold">
                      $499.00
                    </span>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-800"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-sky-400 mr-2 text-base">
                      check_circle
                    </span>
                    <div>
                      <span className="font-label-caps uppercase block text-slate-200 font-bold">
                        Real-Time Alerts
                      </span>
                      <span className="text-slate-400">
                        Unlimited SMS warnings for marshalls and players.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-sky-400 mr-2 text-base">
                      check_circle
                    </span>
                    <div>
                      <span className="font-label-caps uppercase block text-slate-200 font-bold">
                        Marshall Dashboard
                      </span>
                      <span className="text-slate-400">
                        Command center access for up to 5 devices.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-sky-400 mr-2 text-base">
                      check_circle
                    </span>
                    <div>
                      <span className="font-label-caps uppercase block text-slate-200 font-bold">
                        Evacuation Routing
                      </span>
                      <span className="text-slate-400">
                        Automated safe-zone pathing on course maps.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-sky-400 mr-2 text-base">
                      check_circle
                    </span>
                    <div>
                      <span className="font-label-caps uppercase block text-slate-200 font-bold">
                        Post-Event Report
                      </span>
                      <span className="text-slate-400">
                        Detailed meteorological log for liability coverage.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section className="space-y-4">
              {/* Payment Method Toggle */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-1 flex">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-label-caps text-xs uppercase flex items-center justify-center transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-sky-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="material-symbols-outlined mr-2 text-sm">
                    credit_card
                  </span>
                  Credit / Debit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-label-caps text-xs uppercase flex items-center justify-center transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-sky-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="material-symbols-outlined mr-2 text-sm">phone_iphone</span>
                  Apple Pay
                </button>
              </div>

              {/* Billing Form */}
              <form
                onSubmit={handlePay}
                className="space-y-4 bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl"
              >
                <h2 className="font-label-caps text-xs uppercase text-slate-300 font-bold mb-2 flex items-center">
                  <span className="material-symbols-outlined mr-1.5 text-sm text-sky-400">lock</span>
                  Secure Checkout
                </h2>

                <div>
                  <label className="font-label-caps text-[10px] text-slate-400 block mb-1 uppercase font-bold tracking-wider">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-800 text-slate-100 focus:border-sky-400 transition-colors px-3 py-2.5 uppercase font-sans text-xs rounded-2xl outline-none"
                  />
                </div>

                <div>
                  <label className="font-label-caps text-[10px] text-slate-400 block mb-1 uppercase font-bold tracking-wider">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-900/90 border border-slate-800 text-slate-100 focus:border-sky-400 transition-colors px-3 py-2.5 font-sans text-xs rounded-2xl outline-none"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                      credit_score
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-[10px] text-slate-400 block mb-1 uppercase font-bold tracking-wider">
                      Expiry
                    </label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-slate-900/90 border border-slate-800 text-slate-100 focus:border-sky-400 transition-colors px-3 py-2.5 font-sans text-xs rounded-2xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-[10px] text-slate-400 block mb-1 uppercase font-bold tracking-wider">
                      CVC
                    </label>
                    <input
                      type="password"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full bg-slate-900/90 border border-slate-800 text-slate-100 focus:border-sky-400 transition-colors px-3 py-2.5 font-sans text-xs rounded-2xl outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-label-caps text-xs uppercase text-slate-400 font-bold">
                      Total Amount
                    </span>
                    <span className="font-headline text-2xl text-slate-100 font-bold">
                      $499.00 SGD
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-sky-400 text-slate-950 font-label-caps text-xs uppercase py-4 rounded-2xl flex items-center justify-center hover:bg-sky-300 transition-all active:scale-95 duration-150 font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)] disabled:opacity-50 tracking-wider"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span> PROCESSING SECURE PAYMENT...
                      </span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined mr-2 text-sm">lock</span>
                        Confirm &amp; Pay $499.00
                      </>
                    )}
                  </button>
                </div>
              </form>

              <p className="text-center text-[10px] text-slate-500 font-label-caps uppercase tracking-wider">
                BY CONFIRMING, YOU AGREE TO THE EVENT TERMS OF SERVICE.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
