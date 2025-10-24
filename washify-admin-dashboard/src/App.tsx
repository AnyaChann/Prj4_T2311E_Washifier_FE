import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Users from './components/Users';
import Services from './components/Services';
import Branches from './components/Branches';
import Shippers from './components/Shippers';
import Promotions from './components/Promotions';
import Analytics from './components/Analytics';
import Login from './components/Login';
import './index.css';

const Notifications: React.FC = () => (
  <div>
    <div className="page-header">
      <h1 className="page-title">Quản lý thông báo</h1>
      <p className="page-subtitle">Thông báo hệ thống và khách hàng</p>
    </div>
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">Danh sách thông báo</h2>
        <p className="table-subtitle">Tính năng đang được phát triển</p>
      </div>
      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
        Tính năng quản lý thông báo sẽ sớm được cập nhật
      </div>
    </div>
  </div>
);

const Settings: React.FC = () => (
  <div>
    <div className="page-header">
      <h1 className="page-title">Cài đặt hệ thống</h1>
      <p className="page-subtitle">Cấu hình và tùy chỉnh hệ thống</p>
    </div>
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">Cài đặt</h2>
        <p className="table-subtitle">Tính năng đang được phát triển</p>
      </div>
      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
        Tính năng cài đặt hệ thống sẽ sớm được cập nhật
      </div>
    </div>
  </div>
);

// Main Dashboard Layout
const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.slice(1) || 'dashboard'; // Remove leading slash

  const handleTabChange = (tab: string) => {
    window.history.pushState({}, '', `/${tab}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={currentPath} onTabChange={handleTabChange} />
      <main className="main-content">
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            <Route path="/services" element={<Services />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/shippers" element={<Shippers />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// App component với authentication integration
const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;