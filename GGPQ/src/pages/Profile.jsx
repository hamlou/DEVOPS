import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, CreditCard, Shield, Bell, LogOut, ChevronRight, Camera, Check } from 'lucide-react';

import SEO from '../components/SEO';

const Profile = () => {
  const { user, logout, watchHistory, updateProfile, setIsLogoutModalOpen } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.username || '');
  const [tempSeed, setTempSeed] = useState(user?.email || '');

  if (!user) return null;

  const handleSave = () => {
    updateProfile({
      username: tempName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${tempSeed}`
    });
    setIsEditing(false);
  };

  const sections = [
    { icon: CreditCard, label: 'Subscription Plan', value: user.type, color: 'text-primary' },
    { icon: Shield, label: 'Privacy & Security', value: 'Managed' },
    { icon: Bell, label: 'Notifications', value: 'On' },
    { icon: Settings, label: 'Account Settings', value: '' },
  ];

  return (
    <div className="p-8 md:p-16 max-w-6xl mx-auto min-h-screen">
      <SEO 
        title="My Profile" 
        description="Manage your TFC account, subscription, and preferences." 
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-3xl p-8 border border-gray-800 text-center sticky top-8"
          >
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <img src={isEditing ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${tempSeed}` : user.avatar} alt="Avatar" className="w-full h-full rounded-full border-4 border-primary/20 bg-background shadow-2xl transition-transform group-hover:scale-105" />
              {isEditing ? (
                <div className="absolute bottom-0 right-0 bg-green-500 text-black p-2 rounded-full border-4 border-surface cursor-pointer" onClick={handleSave}>
                  <Check className="w-4 h-4" />
                </div>
              ) : (
                <div className="absolute bottom-0 right-0 bg-primary text-black p-2 rounded-full border-4 border-surface cursor-pointer" onClick={() => setIsEditing(true)}>
                  <Camera className="w-4 h-4" />
                </div>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-4 mb-6">
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2 text-center font-bold focus:border-primary focus:outline-none"
                  placeholder="Enter Name"
                />
                <input 
                  type="text" 
                  value={tempSeed} 
                  onChange={(e) => setTempSeed(e.target.value)}
                  className="w-full bg-background border border-gray-700 rounded-xl px-4 py-2 text-center text-xs focus:border-primary focus:outline-none"
                  placeholder="Avatar Seed"
                />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">{user.username}</h2>
                <p className="text-gray-500 text-sm mb-6">{user.email}</p>
              </>
            )}
            
            <div className="flex justify-center space-x-4 mb-8">
              <div className="text-center">
                <p className="text-xl font-black text-primary">{user.points}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Points</p>
              </div>
              <div className="w-px h-8 bg-gray-800" />
              <div className="text-center">
                <p className="text-xl font-black text-white">{watchHistory.length}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Watched</p>
              </div>
            </div>

            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="w-full bg-surface-light border border-gray-700 text-white font-bold py-3 rounded-xl uppercase text-xs tracking-widest hover:border-primary transition-all"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>

          </motion.div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Status Banner */}
          <div className="bg-gradient-to-r from-primary to-yellow-600 rounded-3xl p-8 text-black flex items-center justify-between shadow-xl shadow-primary/10">
            <div>
              <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-1">Current Membership</p>
              <h3 className="text-3xl font-black uppercase tracking-tighter">TFC {user.type} PRO</h3>
              <p className="font-bold opacity-80 mt-2">Your next billing date is Feb 19, 2026</p>
            </div>
            <button className="bg-black text-primary px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-lg">
              Manage
            </button>
          </div>

          {/* Settings Grid */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6 px-2">Account Details</h4>
            {sections.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-gray-800 p-6 rounded-2xl flex items-center justify-between hover:border-gray-700 cursor-pointer group transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-surface-light rounded-xl group-hover:text-primary transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    {item.value && <p className={`text-xs font-black uppercase ${item.color || 'text-gray-500'}`}>{item.value}</p>}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
              </motion.div>
            ))}
          </div>

          <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center space-x-3 text-red-500 font-bold uppercase text-xs tracking-widest hover:text-red-400 transition-colors p-4">
            <LogOut className="w-5 h-5" />
            <span>Log Out from all devices</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
