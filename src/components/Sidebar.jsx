import React, { useState } from 'react';
import { User, History, List, Trophy, CreditCard, Settings, LogOut, LayoutDashboard, LayoutGrid, Crown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import LogoutModal from './LogoutModal';


const SidebarItem = ({ icon: Icon, label, active = false, onClick, isSubscription = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full p-4 space-x-4 transition-all duration-300 hover:bg-surface-light group relative ${isSubscription ? 'bg-yellow-500 text-white' : active ? 'text-primary' : 'text-gray-400'}`}
  >
    {active && <div className="absolute left-0 top-0 h-full w-1 bg-primary shadow-[0_0_10px_#FF3131]" />}
    {isSubscription && <div className="absolute left-0 top-0 h-full w-1 bg-yellow-600" />}
    <div className="relative">
      <Icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${isSubscription ? 'text-white' : active ? 'text-primary' : ''}`} />
    </div>
    <span className={`hidden lg:block font-bold uppercase text-xs tracking-widest ${isSubscription ? 'text-white' : 'group-hover:text-white'}`}>{label}</span>
  </button>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setIsLogoutModalOpen } = useUser();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: LayoutGrid, label: 'Browse', path: '/browse' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: History, label: 'History', path: '/history' },
    { icon: CreditCard, label: 'Subscription', path: '/subscription' },
    { icon: List, label: 'My List', path: '/mylist' },
    { icon: Trophy, label: 'Rewards', path: '/rewards' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];


  if (!user) return null;

  return (
    <aside className="fixed left-0 top-0 h-full bg-surface/80 backdrop-blur-xl w-20 lg:w-64 border-r border-gray-800/50 z-50 hidden md:flex flex-col">
      <div className="p-8 cursor-pointer group" onClick={() => navigate('/')}>
        <h1 className="text-4xl font-black text-primary tracking-tighter hidden lg:block italic transition-transform group-hover:scale-105">TFC</h1>
        <h1 className="text-2xl font-black text-primary lg:hidden italic transition-transform group-hover:scale-110">T</h1>
      </div>

      <div className="px-6 py-4 hidden lg:block">
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 shadow-xl shadow-black/20">
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Status</p>
          <div className="flex items-center justify-between">
            <p className={`text-xs font-black uppercase tracking-tight ${user.type === 'Premium' ? 'text-primary' : 'text-white'}`}>
              {user.plan} {user.type === 'Premium' ? 'PRO' : 'MEMBER'}
            </p>
            {user.type === 'Premium' && <Crown className="w-3 h-3 text-primary animate-pulse fill-primary" />}
          </div>
          <div className="mt-2 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: user.type === 'Premium' ? '100%' : '20%' }}
              className="h-full bg-gradient-to-r from-primary to-red-800"
            />
          </div>
        </div>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto no-scrollbar space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            isSubscription={item.label === 'Subscription'}
            onClick={() => navigate(item.path)}
          />
        ))}
        {user.role === 'admin' && (
          <SidebarItem
            icon={LayoutDashboard}
            label="TFC Console"
            active={location.pathname === '/admin'}
            onClick={() => navigate('/admin')}
          />
        )}
      </nav>


      <div className="p-4 border-t border-gray-800/50">
        <SidebarItem
          icon={LogOut}
          label="Log Out"
          onClick={() => setIsLogoutModalOpen(true)}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
