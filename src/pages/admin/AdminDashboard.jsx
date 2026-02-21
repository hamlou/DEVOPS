import React, { useState, useEffect } from 'react';
import { fetchAnalytics, fetchAllUsers, fetchVideos } from '../../services/mockData';

import { motion } from 'framer-motion';
import { Users, Play, Crown, Trophy, TrendingUp, BarChart3, PieChart } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    Promise.all([fetchAnalytics(), fetchAllUsers(), fetchVideos()]).then(([a, u, v]) => {
      setStats(a);
      setUsers(u);
      setVideos(v);
    });
  }, []);

  if (!stats) return <div className="p-8 text-primary animate-pulse font-black uppercase tracking-widest">Loading Console...</div>;

  const quickStats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-500' },
    { label: 'Premium Subs', value: stats.subscribers, icon: Crown, color: 'text-primary' },
    { label: 'Content Views', value: stats.totalViews.toLocaleString(), icon: Play, color: 'text-green-500' },
    { label: 'Points Issued', value: users.reduce((acc, curr) => acc + curr.points, 0), icon: Trophy, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Command <span className="text-primary italic">Center</span></h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Real-time Platform Performance</p>
        </div>
        <div className="flex items-center space-x-2 bg-surface p-2 rounded-2xl border border-gray-800">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Live Server</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-gray-800 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-primary transition-all shadow-xl shadow-black/20"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-3xl font-black text-white">{stat.value}</h4>
              </div>
              <div className={`p-4 bg-white/5 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Main Charts Mock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface border border-gray-800 rounded-[3rem] p-10">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-black uppercase tracking-tight flex items-center">
              <BarChart3 className="w-5 h-5 mr-3 text-primary" />
              Traffic Analytics
            </h4>
            <div className="flex space-x-2">
              {['7D', '1M', '1Y'].map(t => (
                <button key={t} className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${t === '7D' ? 'bg-primary text-black' : 'bg-white/5 text-gray-500 hover:text-white'}`}>{t}</button>
              ))}
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {stats.viewsByDay.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(v / 1400) * 100}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-xl group relative"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {v}k
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <span key={d} className="text-[10px] font-black uppercase text-gray-600 tracking-widest">{d}</span>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-gray-800 rounded-[3rem] p-10 flex flex-col">
          <h4 className="text-xl font-black uppercase tracking-tight flex items-center mb-8">
            <PieChart className="w-5 h-5 mr-3 text-primary" />
            Sources
          </h4>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {Object.entries(stats.trafficSource).map(([label, val], i) => (
              <div key={label} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-white">{val}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`h-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-blue-500' : 'bg-purple-500'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
