import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  MapPin, 
  Truck, 
  Settings,
  Bell,
  Package,
  Gift,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Tổng quan', icon: <LayoutDashboard className="nav-icon" /> },
  { id: 'analytics', label: 'Phân tích', icon: <BarChart3 className="nav-icon" /> },
  { id: 'orders', label: 'Đơn hàng', icon: <ShoppingBag className="nav-icon" /> },
  { id: 'users', label: 'Khách hàng', icon: <Users className="nav-icon" /> },
  { id: 'services', label: 'Dịch vụ', icon: <Package className="nav-icon" /> },
  { id: 'branches', label: 'Chi nhánh', icon: <MapPin className="nav-icon" /> },
  { id: 'shippers', label: 'Shipper', icon: <Truck className="nav-icon" /> },
  { id: 'promotions', label: 'Khuyến mãi', icon: <Gift className="nav-icon" /> },
  { id: 'notifications', label: 'Thông báo', icon: <Bell className="nav-icon" /> },
  { id: 'settings', label: 'Cài đặt', icon: <Settings className="nav-icon" /> },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const handleNavClick = (tabId: string) => {
    navigate(`/${tabId}`);
    onTabChange(tabId);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">🧺 Washify</div>
        <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.5rem' }}>
          Admin Dashboard
        </div>
      </div>
      
      <nav className="nav-menu">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;