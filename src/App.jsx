import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { HelmetProvider } from 'react-helmet-async';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import History from './pages/History';
import MyList from './pages/MyList';
import Rewards from './pages/Rewards';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Browse from './pages/Browse';
import Subscription from './pages/Subscription';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import VideosManager from './pages/admin/VideosManager';
import CategoriesManager from './pages/admin/CategoriesManager';
import UsersManager from './pages/admin/UsersManager';
import SubscriptionsManager from './pages/admin/SubscriptionsManager';
import RewardsManager from './pages/admin/RewardsManager';
import Analytics from './pages/admin/Analytics';

import LogoutModal from './components/LogoutModal';
import MmaLanding from './pages/MmaLanding';
import VerifyEmail from './pages/VerifyEmail';

const AppRoutes = () => {

  const { user, isLogoutModalOpen, setIsLogoutModalOpen, logout } = useUser();
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    // Brief delay to allow modal exit animation to start or provide smooth transition
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 100);
  };

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="mylist" element={<MyList />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="videos" element={<VideosManager />} />
            <Route path="categories" element={<CategoriesManager />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="subscriptions" element={<SubscriptionsManager />} />
            <Route path="rewards" element={<RewardsManager />} />

            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/mma" element={<MmaLanding />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}

      {/* Logout modal should be available for both authenticated and non-authenticated users */}
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => {
          console.log("🔄 APP.JSX: onClose called");
          console.log("Setting isLogoutModalOpen to false");
          setIsLogoutModalOpen(false);
        }}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};


function App() {
  return (
    <HelmetProvider>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;