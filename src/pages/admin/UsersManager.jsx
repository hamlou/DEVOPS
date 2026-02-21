import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from '../../services/mockData';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, CreditCard, Award, MoreVertical, Search, Filter } from 'lucide-react';

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAllUsers().then(setUsers);
  }, []);

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">User <span className="text-primary italic">Directory</span></h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Manage permissions and view activity</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-3 bg-white/5 border border-gray-800 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-surface border border-gray-800 p-6 rounded-3xl">
        <div className="bg-black/40 flex items-center px-6 py-3 rounded-2xl border border-gray-800 focus-within:border-primary transition-all">
          <Search className="w-5 h-5 text-gray-500 mr-4" />
          <input 
            type="text" 
            placeholder="Filter by username or email..." 
            className="bg-transparent border-none outline-none text-white font-bold w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUsers.map((u, i) => (
          <motion.div 
            key={u.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-gray-800 rounded-[2.5rem] p-8 hover:border-primary transition-all group relative"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-background rounded-2xl border border-gray-800 p-1 group-hover:border-primary/50 transition-colors">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`} className="w-full h-full rounded-xl" alt="" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white group-hover:text-primary transition-colors">{u.username}</h4>
                  <div className="flex items-center space-x-2 text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">
                    <Mail className="w-3 h-3" />
                    <span>{u.email}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-600 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-800/50">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Subscription</p>
                <div className="flex items-center space-x-2">
                  <CreditCard className={`w-3 h-3 ${u.type === 'Premium' ? 'text-primary' : 'text-gray-600'}`} />
                  <span className={`text-xs font-black uppercase ${u.type === 'Premium' ? 'text-primary' : 'text-white'}`}>{u.plan}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Balance</p>
                <div className="flex items-center space-x-2">
                  <Award className="w-3 h-3 text-purple-500" />
                  <span className="text-xs font-black uppercase text-white">{u.points} Pts</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Permissions</p>
                <div className="flex items-center space-x-2">
                  <Shield className={`w-3 h-3 ${u.role === 'admin' ? 'text-red-500' : 'text-blue-500'}`} />
                  <span className="text-xs font-black uppercase text-white">{u.role}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Join Date</p>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3 h-3 text-gray-600" />
                  <span className="text-xs font-black uppercase text-white">Jan 2026</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex space-x-3">
              <button className="flex-1 bg-white/5 border border-gray-800 hover:border-primary text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all">
                Edit User
              </button>
              <button className="px-6 bg-white/5 border border-gray-800 hover:bg-red-500/10 hover:border-red-500/50 text-gray-500 hover:text-red-500 py-3 rounded-xl transition-all">
                Suspend
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UsersManager;
