import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import RevenueChart from './charts/RevenueChart';
import OrderStatusChart from './charts/OrderStatusChart';
import ShipperPerformanceChart from './charts/ShipperPerformanceChart';
import MonthlyComparisonChart from './charts/MonthlyComparisonChart';

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'comparison'>('overview');

  const tabs = [
    { id: 'overview', label: '📊 Tổng quan', icon: PieChart },
    { id: 'detailed', label: '📈 Chi tiết', icon: TrendingUp },
    { id: 'comparison', label: '📉 So sánh', icon: BarChart3 }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Phân tích & Thống kê</h1>
          <p className="page-subtitle">Xem chi tiết doanh thu, đơn hàng và hiệu suất</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '1rem'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === tab.id ? '#3b82f6' : 'white',
              color: activeTab === tab.id ? 'white' : '#64748b',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? '600' : '500',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ display: activeTab === 'overview' ? 'grid' : 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
        <div>
          <RevenueChart />
        </div>
        <div>
          <OrderStatusChart />
        </div>
      </div>

      <div style={{ display: activeTab === 'detailed' ? 'grid' : 'none', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <ShipperPerformanceChart />
      </div>

      <div style={{ display: activeTab === 'comparison' ? 'grid' : 'none', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <MonthlyComparisonChart />
      </div>
    </div>
  );
};

export default Analytics;
