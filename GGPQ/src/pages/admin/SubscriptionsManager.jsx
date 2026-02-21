import React, { useState, useEffect } from 'react';
import { fetchAnalytics, fetchAllUsers } from '../../services/mockData';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, Users, DollarSign, Calendar, Search } from 'lucide-react';

const SubscriptionsManager = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([fetchAnalytics(), fetchAllUsers()]).then(([a, u]) => {
      setStats(a);
      setUsers(u.filter(user => user.type === 'Premium'));
    });
  }, []);

  if (!stats) return <div className="p-8 text-primary animate-pulse font-black uppercase tracking-widest">Loading Records...</div>;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Revenue <span className="text-primary italic">Vertical</span></h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Manage recurring billing and plans</p>
        </div>
        <div className="flex bg-surface p-2 rounded-2xl border border-gray-800">
           <div className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-primary border-r border-gray-800">MRR: ${stats.revenue.toLocaleString()}</div>
           <div className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white">Churn: 1.2%</div>
        </div>
      </div>

      <div className="bg-surface border border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl shadow-black/40">
        <div className="p-8 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-xl font-black uppercase tracking-tight">Active Subscriptions</h3>
          <div className="bg-black/40 flex items-center px-6 py-3 rounded-2xl border border-gray-800 min-w-[300px]">
            <Search className="w-4 h-4 text-gray-500 mr-4" />
            <input type="text" placeholder="Search by subscriber..." className="bg-transparent border-none outline-none text-white font-bold text-xs w-full" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-gray-800">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Subscriber</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Plan</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Next Billing</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-background rounded-xl p-1">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`} className="w-full h-full" alt="" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{u.username}</p>
                      <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {u.plan}
                  </span>
                </td>
                <td className="px-8 py-6 font-bold text-white">$9.99</td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Feb 19, 2026</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionsManager;
