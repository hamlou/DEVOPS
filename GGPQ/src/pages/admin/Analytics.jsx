import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../../services/mockData';
import { motion } from 'framer-motion';
import { BarChart, LineChart, PieChart, Activity, Globe, Zap, ArrowUpRight } from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics().then(setData);
  }, []);

  if (!data) return <div className="p-8 text-primary animate-pulse font-black uppercase tracking-widest">Loading Analytics...</div>;

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-black uppercase tracking-tighter">Growth <span className="text-primary italic">Intelligence</span></h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Deep dive into platform engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface border border-gray-800 rounded-[3rem] p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h4 className="text-xl font-black uppercase tracking-tight">Revenue Stream</h4>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Last 30 Days</p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-2xl text-green-500">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-end space-x-2">
              <span className="text-5xl font-black text-white">${data.revenue.toLocaleString()}</span>
              <span className="text-green-500 font-bold text-sm mb-2 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" /> 12.4%
              </span>
            </div>
            <div className="h-40 flex items-end gap-1">
              {[60, 45, 80, 55, 90, 70, 100, 85, 95, 75, 110].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="flex-1 bg-primary/20 hover:bg-primary transition-colors rounded-t-lg"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-surface border border-gray-800 rounded-[3rem] p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h4 className="text-xl font-black uppercase tracking-tight">Active Reach</h4>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Live Audience</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
              <Globe className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-6">
            {[
              { label: 'North America', val: 45, color: 'bg-blue-500' },
              { label: 'Europe', val: 30, color: 'bg-primary' },
              { label: 'Asia Pacific', val: 15, color: 'bg-purple-500' },
              { label: 'Others', val: 10, color: 'bg-gray-700' },
            ].map((reg, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-gray-400">{reg.label}</span>
                  <span className="text-white">{reg.val}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${reg.val}%` }}
                    transition={{ delay: i * 0.1 }}
                    className={`h-full ${reg.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-gray-800 rounded-[3rem] p-12">
        <div className="flex items-center justify-between mb-12">
          <h4 className="text-2xl font-black uppercase tracking-tight">Performance Overview</h4>
          <Activity className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Retention', val: '84.2%' },
            { label: 'Avg Watch Time', val: '42m' },
            { label: 'Conversion', val: '3.8%' },
            { label: 'Churn Rate', val: '1.2%' },
          ].map((s, i) => (
            <div key={i} className="space-y-2">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{s.label}</p>
              <p className="text-3xl font-black text-white">{s.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
