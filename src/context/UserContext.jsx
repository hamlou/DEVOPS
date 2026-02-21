import React, { createContext, useContext, useState, useEffect } from 'react';
import { simulatePayment, simulateRedeemReward } from '../services/mockData';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tfc_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [watchHistory, setWatchHistory] = useState(() => {
    const saved = localStorage.getItem('tfc_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('tfc_list');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem('tfc_user', JSON.stringify(user));
    else localStorage.removeItem('tfc_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tfc_history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  useEffect(() => {
    localStorage.setItem('tfc_list', JSON.stringify(myList));
  }, [myList]);

  const login = (email, password) => {
    const userData = {
      id: 'u123',
      username: email.split('@')[0],
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      type: 'Free',
      plan: 'Basic',
      role: email.includes('admin') ? 'admin' : 'user',
      points: 100,
      joinedDate: new Date().toISOString()
    };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setWatchHistory([]);
    setMyList([]);
  };

  const updateProfile = (newData) => {
    setUser(prev => prev ? { ...prev, ...newData } : null);
  };

  const updatePoints = (amount) => {
    setUser(prev => prev ? { ...prev, points: Math.max(0, prev.points + amount) } : null);
  };

  const upgradeSubscription = async (plan) => {
    const result = await simulatePayment(plan);
    if (result.success) {
      setUser(prev => prev ? { ...prev, type: 'Premium', plan: plan } : null);
      return true;
    }
    return false;
  };


  const redeemReward = async (reward) => {
    if (user && user.points >= reward.cost) {
      const result = await simulateRedeemReward(reward.id);
      if (result.success) {
        updatePoints(-reward.cost);
        return true;
      }
    }
    return false;
  };

  const addToHistory = (item) => {
    setWatchHistory(prev => [
      { ...item, watchedAt: new Date().toISOString(), id: item.id || Math.random().toString() },
      ...prev.filter(i => i.id !== item.id)
    ].slice(0, 50));
    updatePoints(10);
  };

  const toggleMyList = (item) => {
    setMyList(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.filter(i => i.id !== item.id);
      return [{ ...item, id: item.id || Math.random().toString() }, ...prev];
    });
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
      isLogoutModalOpen,
      setIsLogoutModalOpen,
      updateProfile,
      watchHistory,
      addToHistory,
      myList,
      toggleMyList,
      updatePoints,
      upgradeSubscription,
      redeemReward
    }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
