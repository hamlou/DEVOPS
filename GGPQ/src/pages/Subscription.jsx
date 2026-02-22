import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { mockSubscriptionPlans } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Shield, Crown } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

import SEO from '../components/SEO';

const Subscription = () => {
  const { user, upgradeSubscription } = useUser();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    upgradeSubscription(selectedPlan.name);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };


  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto min-h-screen">
      <SEO
        title="Subscription Plans"
        description="Choose the perfect TFC membership plan to unlock 4K HDR streaming and exclusive live events."
      />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <div className="bg-surface border border-primary/30 p-12 rounded-[3rem] max-w-lg text-center shadow-2xl shadow-primary/10">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <Crown className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Welcome to the Elite</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">Your subscription has been successfully activated. You now have unlimited access to all TFC premium content.</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-primary text-black font-black py-4 rounded-2xl uppercase tracking-[0.2em] hover:scale-105 transition-transform"
              >
                Start Watching
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Choose Your Plan</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Unlock the full TFC experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockSubscriptionPlans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -10 }}
            className={`relative bg-surface p-8 rounded-[2.5rem] border-2 transition-all ${user?.plan === plan.name ? 'border-primary shadow-2xl shadow-primary/20' : 'border-gray-800'}`}
          >
            {user?.plan === plan.name && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Current Plan
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-black uppercase mb-2 tracking-tight">{plan.name}</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-black text-white">{plan.price.split('/')[0]}</span>
                <span className="text-gray-500 font-bold text-sm uppercase">/{plan.price.split('/')[1] || 'Forever'}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center space-x-3 text-sm font-medium text-gray-400">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              disabled={user?.plan === plan.name}
              onClick={() => handleSelectPlan(plan)}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${user?.plan === plan.name ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-red-600 text-black shadow-lg shadow-primary/20 hover:scale-105'}`}
            >
              {user?.plan === plan.name ? 'Active' : 'Upgrade Now'}
            </button>

          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-50">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Secure Payments</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Instant Access</span>
        </div>
        <div className="flex items-center space-x-2">
          <Crown className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">TFC Quality</span>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        plan={selectedPlan}
        onPixelatedSuccess={handlePaymentSuccess}
      />
    </div>
  );
};


export default Subscription;
