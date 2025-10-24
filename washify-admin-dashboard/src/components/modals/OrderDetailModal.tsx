import React, { useState, useEffect } from 'react';
import { X, Package, User, MapPin, CreditCard, Truck, Clock } from 'lucide-react';
import { OrderResponse } from '../../types/api';
import { OrderService } from '../../services/apiService';

interface OrderDetailModalProps {
  orderId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdate?: (updatedOrder: OrderResponse) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  orderId,
  isOpen,
  onClose,
  onOrderUpdate
}) => {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (isOpen && orderId) {
      fetchOrderDetail();
    }
  }, [isOpen, orderId]);

  const fetchOrderDetail = async () => {
    if (!orderId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await OrderService.getOrderById(orderId);
      if (response.success && response.data) {
        setOrder(response.data);
      } else {
        setError('Không thể tải chi tiết đơn hàng');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tải chi tiết đơn hàng');
      console.error('Error fetching order detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order || !orderId) return;
    
    try {
      setUpdating(true);
      const response = await OrderService.updateOrderStatus(orderId, newStatus);
      if (response.success && response.data) {
        const updatedOrder = { ...order, status: newStatus };
        setOrder(updatedOrder);
        onOrderUpdate?.(updatedOrder);
        // Show success message
        alert('Cập nhật trạng thái thành công!');
      } else {
        alert('Không thể cập nhật trạng thái đơn hàng');
      }
    } catch (err) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái');
      console.error('Error updating order status:', err);
    } finally {
      setUpdating(false);
    }
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

  const getStatusColor = (status: string): string => {
    const statusColors: Record<string, string> = {
      'PENDING': '#f59e0b',
      'CONFIRMED': '#3b82f6',
      'PROCESSING': '#8b5cf6',
      'READY': '#06d6a0',
      'DELIVERING': '#f97316',
      'COMPLETED': '#10b981',
      'CANCELLED': '#ef4444'
    };
    return statusColors[status] || '#64748b';
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

  const getNextStatusOptions = (currentStatus: string): Array<{ value: string; label: string }> => {
    const statusFlow: Record<string, string[]> = {
      'PENDING': ['CONFIRMED', 'CANCELLED'],
      'CONFIRMED': ['PROCESSING', 'CANCELLED'],
      'PROCESSING': ['READY', 'CANCELLED'],
      'READY': ['DELIVERING'],
      'DELIVERING': ['COMPLETED', 'CANCELLED'],
      'COMPLETED': [],
      'CANCELLED': []
    };

    const nextStatuses = statusFlow[currentStatus] || [];
    return nextStatuses.map(status => ({
      value: status,
      label: getStatusText(status)
    }));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        style={{ maxWidth: '800px', width: '90%' }}
        role="document"
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Chi tiết đơn hàng</h2>
            {order && (
              <p className="modal-subtitle">Mã đơn: {order.orderCode}</p>
            )}
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="loading">
              <div className="loading-spinner"></div>
              Đang tải chi tiết đơn hàng...
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {order && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Left Column */}
              <div>
                {/* Order Info */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <Package size={20} />
                    Thông tin đơn hàng
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Mã đơn:</span>
                      <span className="detail-value">{order.orderCode}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Ngày đặt:</span>
                      <span className="detail-value">
                        {order.orderDate ? formatDate(order.orderDate) : '-'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Tổng tiền:</span>
                      <span className="detail-value" style={{ fontWeight: '600', color: '#10b981' }}>
                        {order.totalAmount ? formatCurrency(order.totalAmount) : '-'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Trạng thái:</span>
                      <span 
                        className="status-badge"
                        style={{ 
                          backgroundColor: getStatusColor(order.status || ''),
                          color: 'white'
                        }}
                      >
                        {getStatusText(order.status || '')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <User size={20} />
                    Thông tin khách hàng
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Tên khách hàng:</span>
                      <span className="detail-value">{order.userName || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">ID khách hàng:</span>
                      <span className="detail-value">{order.userId || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Điện thoại:</span>
                      <span className="detail-value">{order.shipment?.shipperPhone || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Địa chỉ giao:</span>
                      <span className="detail-value">{order.shipment?.address || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Branch Info */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <MapPin size={20} />
                    Thông tin chi nhánh
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Chi nhánh:</span>
                      <span className="detail-value">{order.branchName || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Ghi chú:</span>
                      <span className="detail-value">{order.notes || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Payment Info */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <CreditCard size={20} />
                    Thông tin thanh toán
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Phương thức:</span>
                      <span className="detail-value">{order.payment?.paymentMethod || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Trạng thái TT:</span>
                      <span className="detail-value">{order.payment?.paymentStatus || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Shipper Info */}
                {order.shipment?.shipperId && (
                  <div className="detail-section">
                    <h3 className="section-title">
                      <Truck size={20} />
                      Thông tin giao hàng
                    </h3>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span className="detail-label">Shipper:</span>
                        <span className="detail-value">{order.shipment?.shipperName || '-'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">ID Shipper:</span>
                        <span className="detail-value">{order.shipment?.shipperId}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <Clock size={20} />
                    Lịch sử trạng thái
                  </h3>
                  <div className="timeline">
                    {/* This would be populated from order history if available */}
                    <div className="timeline-item">
                      <div className="timeline-dot active"></div>
                      <div className="timeline-content">
                        <div className="timeline-title">{getStatusText(order.status || '')}</div>
                        <div className="timeline-time">
                          {order.orderDate ? formatDate(order.orderDate) : '-'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                {order.items && order.items.length > 0 && (
                  <div className="detail-section">
                    <h3 className="section-title">
                      <Package size={20} />
                      Chi tiết dịch vụ
                    </h3>
                    <div className="order-items">
                      {order.items.map((item) => (
                        <div key={`${item.serviceId}-${item.serviceName}`} className="order-item">
                          <div className="item-info">
                            <span className="item-name">{item.serviceName}</span>
                            <span className="item-quantity">x{item.quantity}</span>
                          </div>
                          <span className="item-price">
                            {item.price && item.quantity ? formatCurrency(item.price * item.quantity) : '-'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Update Actions */}
        {order && getNextStatusOptions(order.status || '').length > 0 && (
          <div className="modal-footer">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Cập nhật trạng thái:
              </span>
              {getNextStatusOptions(order.status || '').map((statusOption) => (
                <button
                  key={statusOption.value}
                  className="btn btn-primary"
                  onClick={() => handleStatusUpdate(statusOption.value)}
                  disabled={updating}
                  style={{ 
                    backgroundColor: getStatusColor(statusOption.value),
                    borderColor: getStatusColor(statusOption.value)
                  }}
                >
                  {updating ? 'Đang cập nhật...' : statusOption.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailModal;