import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from '../../services/mockData';
import { motion } from 'framer-motion';
import { Trophy, Gift, ArrowUpRight, ArrowDownRight, Search, Zap } from 'lucide-react';

const RewardsManager = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAllUsers().then(setUsers);
  }, []);

  const history = [
    { id: 1, user: 'John_Doe', item: '1 Month Premium', cost: 500, date: '20 Jan 2026' },
    { id: 2, user: 'Sarah_Pro', item: 'VIP Pass', cost: 1000, date: '19 Jan 2026' },
    { id: 3, user: 'Gamer_X', item: 'Avatar Frame', cost: 200, date: '18 Jan 2026' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Loyalty <span className="text-primary italic">Ledger</span></h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Monitor and adjust reward distributions</p>
        </div>
        <button className="flex items-center space-x-3 bg-primary text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform">
          <Zap className="w-5 h-5" />
          <span>Global Bonus</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Adjustment Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-surface border border-gray-800 rounded-[3rem] p-10">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Adjust Balances</h3>
            <div className="bg-black/40 flex items-center px-6 py-3 rounded-2xl border border-gray-800 focus-within:border-primary transition-all mb-8">
              <Search className="w-5 h-5 text-gray-500 mr-4" />
              <input 
                type="text" 
                placeholder="Find user to adjust points..." 
                className="bg-transparent border-none outline-none text-white font-bold w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="space-y-4">
              {users.slice(0, 4).map(u => (
                <div key={u.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-transparent hover:border-primary/30 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-background rounded-lg p-1">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`} className="w-full h-full" alt="" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{u.username}</p>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{u.points} Pts</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center hover:bg-green-500 hover:text-black transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-black transition-all">
                      <ArrowDownRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Redemption History */}
        <div className="bg-surface border border-gray-800 rounded-[3rem] p-10 flex flex-col">
          <h3 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center">
            <Gift className="w-5 h-5 mr-3 text-primary" />
            Recent Claims
          </h3>
          <div className="space-y-6">
            {history.map((h, i) => (
              <motion.div 
                key={h.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-6 border-l border-gray-800"
              >
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_#FFD700]" />
                <p className="text-xs font-black uppercase tracking-tight text-white">{h.user} <span className="text-gray-500 font-bold">redeemed</span></p>
                <p className="text-primary font-black text-sm">{h.item}</p>
                <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest mt-1">{h.date} • {h.cost} Pts</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsManager;
