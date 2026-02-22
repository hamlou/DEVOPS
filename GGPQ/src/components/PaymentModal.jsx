import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ShieldCheck, X, Loader2, CheckCircle2 } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, plan, onPixelatedSuccess }) => {
  const [step, setStep] = useState('form'); // form, processing, success

  if (!isOpen) return null;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onPixelatedSuccess();
        onClose();
        setStep('form');
      }, 2000);
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-[#1a1a1a] border border-white/10 p-10 rounded-[3rem] max-w-md w-full relative shadow-2xl shadow-primary/10"
        >
          {step === 'form' && (
            <>
              <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X /></button>

              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Secure Checkout</h3>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Powered by Stripe Simulation</p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Plan Selected</p>
                  <p className="text-lg font-black text-white">{plan?.name} Member</p>
                  <p className="text-primary font-black">{plan?.price}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">Card Details</label>
                    <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 flex items-center">
                      <input type="text" placeholder="4242 4242 4242 4242" className="bg-transparent border-none outline-none text-white font-mono w-full" disabled />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-3">
                      <input type="text" placeholder="MM/YY" className="bg-transparent border-none outline-none text-white font-mono w-full" disabled />
                    </div>
                    <div className="bg-black/40 border border-white/5 rounded-xl px-4 py-3">
                      <input type="text" placeholder="CVC" className="bg-transparent border-none outline-none text-white font-mono w-full" disabled />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePay}
                className="w-full bg-primary hover:bg-red-600 text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/20"
              >
                Pay & Unlock Now
              </button>

              <div className="mt-6 flex items-center justify-center space-x-2 text-gray-500">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="py-20 flex flex-col items-center text-center space-y-6">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Processing</h3>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-2">Authenticating with your bank...</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-20 flex flex-col items-center text-center space-y-6">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-green-500">Payment Secured</h3>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-2">Unlocking TFC Pro access...</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
