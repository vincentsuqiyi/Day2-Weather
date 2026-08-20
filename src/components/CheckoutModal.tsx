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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121412] text-[#e2e3df] rounded-2xl border border-[#3f4945] w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Top Header */}
        <header className="flex justify-between items-center px-4 md:px-6 h-16 border-b border-[#3f4945] bg-[#1e201e]">
          <button
            id="btn-checkout-back"
            onClick={onClose}
            className="text-[#94d3c1] hover:bg-[#292a28] p-2 rounded-full flex items-center justify-center transition-colors active:opacity-80"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline text-lg md:text-xl font-bold text-[#94d3c1] tracking-tight uppercase">
            CHECKOUT
          </h1>
          <div className="w-10"></div>
        </header>

        {isPaid ? (
          /* Payment Success State */
          <div className="p-6 md:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#004d40] text-[#94d3c1] rounded-full flex items-center justify-center mx-auto border border-[#94d3c1]">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div>
              <h2 className="font-headline text-2xl text-[#94d3c1]">License Activated!</h2>
              <p className="text-sm text-[#bfc9c4] mt-1">
                Event Pro Shield single-event license has been provisioned.
              </p>
            </div>

            <div className="bg-[#1e201e] border border-[#3f4945] rounded-xl p-4 text-left font-label-caps text-xs space-y-2">
              <div className="flex justify-between text-[#89938f]">
                <span>ORDER ID</span>
                <span className="text-[#e2e3df]">SGP-SHIELD-2026-9942</span>
              </div>
              <div className="flex justify-between text-[#89938f]">
                <span>AMOUNT PAID</span>
                <span className="text-[#ffe2ab] font-bold">$499.00 SGD</span>
              </div>
              <div className="flex justify-between text-[#89938f]">
                <span>MARSHALL DISPATCH KEY</span>
                <span className="text-[#00daf3]">EP-KEY-SENTOSA-4X9</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#94d3c1] text-[#00382e] font-label-caps text-xs py-3.5 rounded-xl font-bold hover:bg-[#afefdd] transition-colors"
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-4 md:p-6 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
            {/* Order Summary Bento */}
            <section className="bg-[#1e201e] rounded-xl border border-[#3f4945] overflow-hidden">
              <div className="p-3.5 border-b border-[#3f4945] bg-[#292a28] flex justify-between items-center">
                <h2 className="font-label-caps text-xs uppercase text-[#bfc9c4]">Order Summary</h2>
                <span className="material-symbols-outlined text-[#bfc9c4] text-lg">
                  shopping_cart
                </span>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline text-lg md:text-xl text-[#e2e3df] font-bold tracking-tight">
                      Event Pro Shield
                    </h3>
                    <p className="text-xs text-[#bfc9c4] mt-0.5">Single Event License</p>
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-xl md:text-2xl text-[#ffe2ab] font-bold">
                      $499.00
                    </span>
                  </div>
                </div>

                <div className="h-px w-full bg-[#3f4945]"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start">
                    <span
                      className="material-symbols-outlined text-[#94d3c1] mr-2 text-base fill-icon"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <div>
                      <span className="font-label-caps uppercase block text-[#e2e3df]">
                        Real-Time Alerts
                      </span>
                      <span className="text-[#bfc9c4]">
                        Unlimited SMS warnings for marshalls and players.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span
                      className="material-symbols-outlined text-[#94d3c1] mr-2 text-base fill-icon"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <div>
                      <span className="font-label-caps uppercase block text-[#e2e3df]">
                        Marshall Dashboard
                      </span>
                      <span className="text-[#bfc9c4]">
                        Command center access for up to 5 devices.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span
                      className="material-symbols-outlined text-[#94d3c1] mr-2 text-base fill-icon"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <div>
                      <span className="font-label-caps uppercase block text-[#e2e3df]">
                        Evacuation Routing
                      </span>
                      <span className="text-[#bfc9c4]">
                        Automated safe-zone pathing on course maps.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span
                      className="material-symbols-outlined text-[#94d3c1] mr-2 text-base fill-icon"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <div>
                      <span className="font-label-caps uppercase block text-[#e2e3df]">
                        Post-Event Report
                      </span>
                      <span className="text-[#bfc9c4]">
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
              <div className="bg-[#1e201e] rounded-xl border border-[#3f4945] p-1 flex">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-label-caps text-xs uppercase flex items-center justify-center transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-[#292a28] border border-[#89938f] text-[#e2e3df]'
                      : 'text-[#bfc9c4] hover:bg-[#292a28]/50'
                  }`}
                >
                  <span className="material-symbols-outlined mr-2 text-sm text-[#94d3c1]">
                    credit_card
                  </span>
                  Card
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-label-caps text-xs uppercase flex items-center justify-center transition-colors ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-[#292a28] border border-[#89938f] text-[#e2e3df]'
                      : 'text-[#bfc9c4] hover:bg-[#292a28]/50'
                  }`}
                >
                  <span className="material-symbols-outlined mr-2 text-sm">phone_iphone</span>
                  Apple Pay
                </button>
              </div>

              {/* Billing Form */}
              <form
                onSubmit={handlePay}
                className="space-y-4 bg-[#1e201e] p-4 md:p-5 rounded-xl border border-[#3f4945]"
              >
                <h2 className="font-label-caps text-xs uppercase text-[#bfc9c4] mb-2 flex items-center">
                  <span className="material-symbols-outlined mr-1.5 text-sm">lock</span>
                  Secure Checkout
                </h2>

                <div>
                  <label className="font-label-caps text-[11px] text-[#bfc9c4] block mb-1 uppercase">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-[#121412] border-0 border-b-2 border-[#3f4945] text-[#e2e3df] focus:ring-0 focus:border-[#00daf3] transition-colors px-2 py-2 uppercase font-body text-sm rounded-t"
                  />
                </div>

                <div>
                  <label className="font-label-caps text-[11px] text-[#bfc9c4] block mb-1 uppercase">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#121412] border-0 border-b-2 border-[#3f4945] text-[#e2e3df] focus:ring-0 focus:border-[#00daf3] transition-colors px-2 py-2 font-label-caps text-xs rounded-t"
                    />
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#bfc9c4] text-sm">
                      credit_score
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-[11px] text-[#bfc9c4] block mb-1 uppercase">
                      Expiry
                    </label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-[#121412] border-0 border-b-2 border-[#3f4945] text-[#e2e3df] focus:ring-0 focus:border-[#00daf3] transition-colors px-2 py-2 font-label-caps text-xs rounded-t"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-[11px] text-[#bfc9c4] block mb-1 uppercase">
                      CVC
                    </label>
                    <input
                      type="password"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full bg-[#121412] border-0 border-b-2 border-[#3f4945] text-[#e2e3df] focus:ring-0 focus:border-[#00daf3] transition-colors px-2 py-2 font-label-caps text-xs rounded-t"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-label-caps text-xs uppercase text-[#e2e3df]">
                      Total Amount
                    </span>
                    <span className="font-headline text-2xl text-[#ffe2ab] font-bold">
                      $499.00
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#ffe2ab] text-[#402d00] font-label-caps text-xs uppercase py-3.5 rounded-full flex items-center justify-center hover:bg-[#ffdfa0] transition-colors active:scale-95 duration-150 font-bold shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span> PROCESSING SECURE PAYMENT...
                      </span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined mr-2 text-sm">lock</span>
                        Confirm &amp; Pay
                      </>
                    )}
                  </button>
                </div>
              </form>

              <p className="text-center text-[10px] text-[#bfc9c4]/70 font-label-caps uppercase tracking-wider">
                BY CONFIRMING, YOU AGREE TO THE EVENT TERMS OF SERVICE.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
