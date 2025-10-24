import React, { useEffect, useState } from 'react';
import { Eye, Edit } from 'lucide-react';
import { OrderService } from '../services/apiService';
import { OrderResponse } from '../types/api';
import AdvancedFilter from './filters/AdvancedFilter';
import ExportButton from './ExportButton';
import OrderDetailModal from './modals/OrderDetailModal';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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

  const handleViewOrder = (orderId?: number) => {
    if (orderId) {
      setSelectedOrderId(orderId);
      setIsDetailModalOpen(true);
    }
  };

  const handleEditOrder = (orderId?: number) => {
    if (orderId) {
      // TODO: Implement edit order functionality
      console.log('Edit order:', orderId);
    }
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleOrderUpdate = (updatedOrder: OrderResponse) => {
    // Update the order in the list
    setOrders(prev => prev.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        order.orderCode?.toLowerCase().includes(searchLower) ||
        order.userName?.toLowerCase().includes(searchLower) ||
        order.branchName?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Filter by status
    if (filters.status && filters.status !== '') {
      if (order.status !== filters.status) return false;
    }

    // Filter by date range
    if (filters.dateFrom) {
      const orderDate = new Date(order.orderDate || '');
      const fromDate = new Date(filters.dateFrom);
      if (orderDate < fromDate) return false;
    }

    if (filters.dateTo) {
      const orderDate = new Date(order.orderDate || '');
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      if (orderDate > toDate) return false;
    }

    return true;
  });

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
          <ExportButton
            data={filteredOrders}
            filename="orders"
            title="Danh sách đơn hàng"
            buttonText="📥 Xuất dữ liệu"
          />
        </div>

        <div style={{ padding: '1.5rem' }}>
          <AdvancedFilter
            onFilterChange={setFilters}
            statusOptions={[
              { value: 'PENDING', label: 'Chờ xử lý' },
              { value: 'CONFIRMED', label: 'Đã xác nhận' },
              { value: 'PROCESSING', label: 'Đang xử lý' },
              { value: 'READY', label: 'Sẵn sàng' },
              { value: 'DELIVERING', label: 'Đang giao' },
              { value: 'COMPLETED', label: 'Hoàn thành' },
              { value: 'CANCELLED', label: 'Đã hủy' }
            ]}
            showDateRange={true}
            showStatus={true}
            placeholder="Tìm kiếm theo mã đơn, tên khách hàng hoặc chi nhánh..."
          />
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
                        onClick={() => handleViewOrder(order.id)}
                        title="Xem chi tiết"
                      >
                        <Eye style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEditOrder(order.id)}
                        title="Chỉnh sửa"
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
            Không có đơn hàng nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        orderId={selectedOrderId}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        onOrderUpdate={handleOrderUpdate}
      />
    </div>
  );
};

export default Orders;