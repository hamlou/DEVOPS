import React, { createContext, useContext, useState, useEffect } from 'react';
import { simulatePayment, simulateRedeemReward } from '../services/mockData';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tfc_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

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

  const login = async (email, password) => {
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

    // Send user data to Flask API backend
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.username,
          email: userData.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ User registered successfully in backend:', data);
        
        // Show success notification
        if (data.email_sent) {
          setNotification({ type: 'success', message: '🎉 Welcome! Check your email for a welcome message.' });
          setTimeout(() => setNotification(null), 5000);
        } else {
          setNotification({ type: 'success', message: '✅ Registration successful!' });
          setTimeout(() => setNotification(null), 3000);
        }
      } else if (response.status === 409) {
        // User already exists - this is fine for login
        console.log('ℹ️ User already exists in database');
        setNotification({ type: 'info', message: 'Welcome back! 👋' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        console.error('❌ Error registering user:', data.error);
        setNotification({ type: 'error', message: 'Registration failed. Please try again.' });
        setTimeout(() => setNotification(null), 4000);
      }
    } catch (error) {
      console.error('❌ Network error while registering user:', error);
      setNotification({ type: 'warning', message: 'Could not connect to server. Using local session.' });
      setTimeout(() => setNotification(null), 4000);
      // Continue with login even if backend registration fails
      // This ensures the user can still use the app
    }
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
      redeemReward,
      notification,
      setNotification
    }}>
      {children}
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <div className={`
            px-6 py-4 rounded-xl shadow-2xl backdrop-blur-lg border
            ${
              notification.type === 'success' ? 'bg-green-500/90 border-green-400 text-white' :
              notification.type === 'error' ? 'bg-red-500/90 border-red-400 text-white' :
              notification.type === 'warning' ? 'bg-yellow-500/90 border-yellow-400 text-white' :
              'bg-blue-500/90 border-blue-400 text-white'
            }
            max-w-md flex items-center gap-3
          `}>
            <span className="text-lg">
              {notification.type === 'success' ? '✅' :
               notification.type === 'error' ? '❌' :
               notification.type === 'warning' ? '⚠️' : 'ℹ️'}
            </span>
            <p className="font-semibold">{notification.message}</p>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
