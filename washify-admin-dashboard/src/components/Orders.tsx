import React, { useEffect, useState } from 'react';
import { Eye, Edit, Filter } from 'lucide-react';
import { OrderService } from '../services/apiService';
import { OrderResponse } from '../types/api';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await OrderService.getAllOrders();
      if (response.success && response.data) {
        setOrders(response.data);
      }
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách đơn hàng');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string): string => {
    const statusMap: Record<string, string> = {
      'PENDING': 'status-pending',
      'CONFIRMED': 'status-confirmed',
      'PROCESSING': 'status-processing',
      'READY': 'status-ready',
      'DELIVERING': 'status-delivering',
      'COMPLETED': 'status-completed',
      'CANCELLED': 'status-cancelled'
    };
    return statusMap[status] || 'status-pending';
  };

  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'PENDING': 'Chờ xử lý',
      'CONFIRMED': 'Đã xác nhận',
      'PROCESSING': 'Đang xử lý',
      'READY': 'Sẵn sàng',
      'DELIVERING': 'Đang giao',
      'COMPLETED': 'Hoàn thành',
      'CANCELLED': 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const statusOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'PENDING', label: 'Chờ xử lý' },
    { value: 'CONFIRMED', label: 'Đã xác nhận' },
    { value: 'PROCESSING', label: 'Đang xử lý' },
    { value: 'READY', label: 'Sẵn sàng' },
    { value: 'DELIVERING', label: 'Đang giao' },
    { value: 'COMPLETED', label: 'Hoàn thành' },
    { value: 'CANCELLED', label: 'Đã hủy' }
  ];

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Đang tải danh sách đơn hàng...
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
        <h1 className="page-title">Quản lý đơn hàng</h1>
        <p className="page-subtitle">Theo dõi và xử lý đơn hàng giặt là</p>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div>
            <h2 className="table-title">Danh sách đơn hàng</h2>
            <p className="table-subtitle">Tổng cộng {filteredOrders.length} đơn hàng</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter style={{ width: '16px', height: '16px' }} />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto', minWidth: '150px' }}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Chi nhánh</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div style={{ fontWeight: '600', color: '#3b82f6' }}>
                      {order.orderCode}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      ID: {order.id}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '500' }}>
                      {order.userName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      ID: {order.userId}
                    </div>
                  </td>
                  <td>{order.branchName}</td>
                  <td>{order.orderDate ? formatDate(order.orderDate) : '-'}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status || '')}`}>
                      {getStatusText(order.status || '')}
                    </span>
                  </td>
                  <td style={{ fontWeight: '600' }}>
                    {order.totalAmount ? formatCurrency(order.totalAmount) : '-'}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => console.log('View order:', order.id)}
                      >
                        <Eye style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => console.log('Edit order:', order.id)}
                      >
                        <Edit style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            {filter === 'all' ? 'Chưa có đơn hàng nào' : `Không có đơn hàng với trạng thái "${getStatusText(filter)}"`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;