import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  Users, 
  Truck, 
  DollarSign,
  RefreshCw
} from 'lucide-react';
import { DashboardService } from '../services/apiService';
import { DashboardStats } from '../types/api';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend = 'neutral' }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-title">{title}</div>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className="stat-change">
          {trend === 'up' && <TrendingUp style={{ width: '16px', height: '16px', display: 'inline', marginRight: '4px' }} />}
          {trend === 'down' && <TrendingDown style={{ width: '16px', height: '16px', display: 'inline', marginRight: '4px' }} />}
          {change}
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    activeShippers: 0,
    pendingOrders: 0,
    completedOrders: 0,
    todayOrders: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalBranches: 0,
    activeBranches: 0,
    totalServices: 0,
    activeServices: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'loading' | 'real' | 'mock' | 'mixed'>('loading');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      console.log('🔄 Dashboard: Starting to fetch stats...');
      
      const dashboardStats = await DashboardService.getDashboardStats();
      setStats(dashboardStats);
      setError(null);
      
      // Determine data source based on whether we have real API data
      // If activeShippers is exactly 12, it's likely fallback/mock data
      if (dashboardStats.activeShippers === 12 && 
          dashboardStats.totalOrders === 1250 && 
          dashboardStats.totalRevenue === 125000000) {
        setDataSource('mock');
        console.log('📊 Dashboard: Using mock data (backend not available or not authenticated)');
      } else {
        setDataSource('real');
        console.log('✅ Dashboard: Using real data from backend APIs');
      }
    } catch (err) {
      setError('Không thể tải dữ liệu dashboard');
      setDataSource('mock');
      console.error('❌ Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Tổng quan hệ thống Washify</p>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={fetchDashboardStats}
            disabled={loading}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              opacity: loading ? 0.6 : 1
            }}
          >
            <RefreshCw style={{ 
              width: '16px', 
              height: '16px',
              animation: loading ? 'spin 1s linear infinite' : 'none' 
            }} />
            {loading ? 'Đang tải...' : 'Làm mới'}
          </button>
        </div>
        
        {/* Data Source Status */}
        <div style={{ 
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          backgroundColor: dataSource === 'real' ? '#dcfce7' : '#fef3c7',
          color: dataSource === 'real' ? '#16a34a' : '#d97706',
          border: `1px solid ${dataSource === 'real' ? '#bbf7d0' : '#fed7aa'}`
        }}>
          {dataSource === 'real' && '✅ Sử dụng dữ liệu thật từ backend API'}
          {dataSource === 'mock' && '📊 Sử dụng dữ liệu mẫu (Backend không khả dụng hoặc chưa đăng nhập)'}
          {dataSource === 'mixed' && '🔄 Sử dụng dữ liệu hỗn hợp (một số API hoạt động)'}
          {dataSource === 'loading' && '⏳ Đang kiểm tra kết nối backend...'}
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Tổng đơn hàng"
          value={stats.totalOrders}
          change="Tất cả thời gian"
          icon={<ShoppingBag />}
          trend="neutral"
        />
        
        <StatCard
          title="Doanh thu"
          value={formatCurrency(stats.totalRevenue)}
          change="Đơn hàng hoàn thành"
          icon={<DollarSign />}
          trend="up"
        />
        
        <StatCard
          title="Người dùng"
          value={`${stats.activeUsers}/${stats.totalUsers}`}
          change="Hoạt động/Tổng số"
          icon={<Users />}
          trend="neutral"
        />
        
        <StatCard
          title="Shipper hoạt động"
          value={stats.activeShippers}
          change="Đang sẵn sàng"
          icon={<Truck />}
          trend="neutral"
        />
        
        <StatCard
          title="Đơn hàng hôm nay"
          value={stats.todayOrders}
          change="Trong ngày"
          icon={<ShoppingBag />}
          trend="up"
        />
        
        <StatCard
          title="Đơn chờ xử lý"
          value={stats.pendingOrders}
          change="Cần xử lý"
          icon={<ShoppingBag />}
          trend="neutral"
        />
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Thống kê nhanh</h2>
          <p className="table-subtitle">Dữ liệu được cập nhật theo thời gian thực</p>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {stats.completedOrders}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Đơn hoàn thành
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {stats.pendingOrders}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Đơn chờ xử lý
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                {stats.activeShippers}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Shipper hoạt động
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {stats.activeBranches}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Chi nhánh hoạt động
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                {stats.activeServices}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Dịch vụ có sẵn
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#059669' }}>
                {formatCurrency(stats.totalRevenue)}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Tổng doanh thu
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;