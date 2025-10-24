import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { AdminApiService } from '../../services/adminApiService';

interface OrderStatusData {
  name: string;
  value: number;
  color: string;
  [key: string]: any;
}

interface OrderStatusChartProps {
  title?: string;
  subtitle?: string;
}

const OrderStatusChart: React.FC<OrderStatusChartProps> = ({
  title = 'Phân bổ trạng thái đơn hàng',
  subtitle = 'Số lượng đơn hàng theo từng trạng thái'
}) => {
  const [data, setData] = useState<OrderStatusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatusData = async () => {
      try {
        console.log('📊 OrderStatusChart: Fetching real order status data...');
        
        // Fetch orders from backend
        const ordersResponse = await AdminApiService.getOrders();
        
        if (ordersResponse?.data) {
          const orders = ordersResponse.data;
          console.log('✅ OrderStatusChart: Got orders data:', orders.length, 'orders');
          
          // Process order status distribution
          const statusData = processOrderStatusData(orders);
          setData(statusData);
        } else {
          console.warn('⚠️ OrderStatusChart: No orders data, using fallback');
          setData(getFallbackStatusData());
        }
        
      } catch (error) {
        console.error('❌ OrderStatusChart: API failed, using fallback data:', error);
        setData(getFallbackStatusData());
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatusData();
  }, []);

  const processOrderStatusData = (orders: any[]): OrderStatusData[] => {
    const statusCounts = new Map<string, number>();
    
    // Status mapping with colors and Vietnamese names
    const statusConfig = {
      'PENDING': { name: 'Chờ xử lý', color: '#3b82f6' },
      'PROCESSING': { name: 'Đang xử lý', color: '#8b5cf6' },
      'SHIPPING': { name: 'Đang giao', color: '#f59e0b' },
      'DELIVERED': { name: 'Đã giao', color: '#06d6a0' },
      'COMPLETED': { name: 'Hoàn thành', color: '#10b981' },
      'CANCELLED': { name: 'Hủy', color: '#ef4444' },
      'RETURNED': { name: 'Trả lại', color: '#dc2626' }
    };
    
    // Count orders by status
    for (const order of orders) {
      const status = order.status || 'PENDING';
      statusCounts.set(status, (statusCounts.get(status) || 0) + 1);
    }
    
    // Convert to chart data format
    return Array.from(statusCounts.entries()).map(([status, count]) => ({
      name: statusConfig[status as keyof typeof statusConfig]?.name || status,
      value: count,
      color: statusConfig[status as keyof typeof statusConfig]?.color || '#6b7280'
    }));
  };

  const getFallbackStatusData = (): OrderStatusData[] => {
    console.log('📊 OrderStatusChart: Generating fallback data');
    return [
      { name: 'Hoàn thành', value: 450, color: '#10b981' },
      { name: 'Đang giao', value: 120, color: '#f59e0b' },
      { name: 'Chờ xử lý', value: 85, color: '#3b82f6' },
      { name: 'Hủy', value: 30, color: '#ef4444' },
      { name: 'Trả lại', value: 15, color: '#8b5cf6' }
    ];
  };

  if (loading) {
    return (
      <div className="chart-container loading">
        <div className="loading-spinner"></div>
        <p>Đang tải biểu đồ...</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <p className="chart-subtitle">{subtitle}</p>
      </div>
      
      <div className="chart-body">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data as any}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }: any) => `${name}: ${((value / total) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => [value, 'Số lượng']}
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #3b82f6',
                borderRadius: '0.5rem',
                color: '#fff'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '1rem' }} />
          </PieChart>
        </ResponsiveContainer>

        {/* Stats below chart */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          {data.map((item) => (
            <div key={item.name} style={{
              padding: '0.75rem',
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem',
              border: `2px solid ${item.color}`
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b',
                marginBottom: '0.25rem'
              }}>
                {item.name}
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: item.color
              }}>
                {item.value}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#94a3b8',
                marginTop: '0.25rem'
              }}>
                {((item.value / total) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusChart;
