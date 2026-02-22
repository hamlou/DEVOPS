import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Star, Clock, ChevronRight, Trophy, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { mockRewards } from '../services/mockData';
import SEO from '../components/SEO';

const Rewards = () => {
  const { user, redeemReward } = useUser();
  const [selectedReward, setSelectedReward] = useState(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const handleRedeem = async () => {
    setIsRedeeming(true);
    const success = await redeemReward(selectedReward);
    setIsRedeeming(false);
    if (success) {
      setRedeemSuccess(true);
      setTimeout(() => {
        setRedeemSuccess(false);
        setSelectedReward(null);
      }, 2000);
    }
  };

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto min-h-screen">
      <SEO
        title="Rewards"
        description="Earn points and redeem exclusive TFC rewards."
      />

      {/* Header Section */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
            TFC <span className="text-primary italic">Vault</span>
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">Redeem your points for elite rewards</p>
        </div>

        <div className="bg-surface border border-primary/20 p-8 rounded-[2.5rem] flex items-center space-x-6 shadow-2xl shadow-primary/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Total Balance</p>
            <p className="text-4xl font-black text-white leading-none">
              {user?.points} <span className="text-primary text-sm uppercase tracking-widest ml-1">Pts</span>
            </p>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {mockRewards.map((reward, i) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-surface border border-gray-800 rounded-[2.5rem] p-8 hover:border-primary transition-all overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{reward.title}</h3>
              <p className="text-primary font-black text-lg mb-8">{reward.cost} Pts</p>
              <button
                onClick={() => setSelectedReward(reward)}
                disabled={user?.points < reward.cost}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${user?.points >= reward.cost
                    ? 'bg-white/5 hover:bg-primary hover:text-black border border-white/10'
                    : 'bg-white/5 text-gray-600 cursor-not-allowed opacity-50'
                  }`}
              >
                {user?.points >= reward.cost ? 'Redeem Now' : 'Insufficient Points'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Redemption Popup */}
      <AnimatePresence>
        {selectedReward && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border border-primary/30 p-8 md:p-12 rounded-[3rem] max-w-md w-full text-center relative shadow-2xl shadow-primary/10"
            >
              {!redeemSuccess ? (
                <>
                  <button
                    onClick={() => setSelectedReward(null)}
                    className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-2">Confirm Redemption</h3>
                  <p className="text-gray-400 mb-8">You are about to redeem <span className="text-primary font-bold">{selectedReward.title}</span> for <span className="text-white font-bold">{selectedReward.cost} Pts</span>.</p>

                  <div className="space-y-4">
                    <button
                      onClick={handleRedeem}
                      disabled={isRedeeming}
                      className="w-full bg-primary hover:bg-red-600 text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] transition-all disabled:opacity-50"
                    >
                      {isRedeeming ? 'Processing...' : 'Confirm'}
                    </button>
                    <button
                      onClick={() => setSelectedReward(null)}
                      className="w-full text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-8">
                  <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-2 text-green-500">Success!</h3>
                  <p className="text-gray-400">Your reward has been added to your account.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Rewards;
