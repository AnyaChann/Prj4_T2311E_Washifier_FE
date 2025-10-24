import React, { useState, useEffect } from 'react';
import { X, Truck, Phone, Car, Calendar, Activity, TrendingUp, Star, MapPin, Award } from 'lucide-react';
import { ShipperResponse } from '../../types/api';

interface ShipperDetailModalProps {
  shipperId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const ShipperDetailModal: React.FC<ShipperDetailModalProps> = ({
  shipperId,
  isOpen,
  onClose
}) => {
  const [shipper, setShipper] = useState<ShipperResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && shipperId) {
      fetchShipperDetail();
    }
  }, [isOpen, shipperId]);

  const fetchShipperDetail = async () => {
    if (!shipperId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚚 ShipperDetail: Fetching shipper detail for ID:', shipperId);
      
      // Mock shipper detail (replace with actual API call)
      const mockShipper: ShipperResponse = {
        id: shipperId,
        name: ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Minh Cường', 'Phạm Thị Dung', 'Hoàng Văn Em'][shipperId % 5] || `Shipper ${shipperId}`,
        phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
        vehicleNumber: `${Math.floor(Math.random() * 99) + 10}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 2) + 1}-${Math.floor(Math.random() * 90000) + 10000}`,
        isActive: Math.random() > 0.2,
        createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: Math.random() > 0.9 ? new Date().toISOString() : undefined
      };
      
      setShipper(mockShipper);
      console.log('✅ ShipperDetail: Got shipper data:', mockShipper);
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải chi tiết shipper');
      console.error('❌ ShipperDetail: Error fetching shipper detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (phone?: string): string => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    } else if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
    }
    return phone;
  };

  const formatVehicleNumber = (vehicleNumber?: string): string => {
    if (!vehicleNumber) return '';
    return vehicleNumber.toUpperCase();
  };

  const getStatusColor = (isActive?: boolean): string => {
    return isActive ? '#10b981' : '#ef4444';
  };

  const getStatusText = (isActive?: boolean): string => {
    return isActive ? 'Đang hoạt động' : 'Tạm nghỉ';
  };

  const getPerformanceStats = () => {
    return {
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0-5.0
      totalDeliveries: Math.floor(Math.random() * 500) + 100,
      successRate: Math.round((Math.random() * 15 + 85) * 10) / 10, // 85-100%
      avgDeliveryTime: Math.floor(Math.random() * 30) + 20, // 20-50 minutes
      monthlyDeliveries: Math.floor(Math.random() * 100) + 50,
      totalRevenue: Math.floor(Math.random() * 50000000) + 10000000 // 10M-60M VND
    };
  };

  if (!isOpen) return null;

  const stats = getPerformanceStats();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '800px', width: '90%' }}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Chi tiết Shipper</h2>
            {shipper && (
              <p className="modal-subtitle">{shipper.name}</p>
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
              Đang tải chi tiết shipper...
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {shipper && (
            <div>
              {/* Basic Info */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Truck size={20} />
                  Thông tin cơ bản
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{shipper.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Họ tên:</span>
                    <span className="detail-value">{shipper.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Trạng thái:</span>
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusColor(shipper.isActive),
                        color: 'white'
                      }}
                    >
                      {getStatusText(shipper.isActive)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Phone size={20} />
                  Thông tin liên hệ
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Số điện thoại:</span>
                    <span className="detail-value" style={{ fontWeight: '500', color: '#3b82f6' }}>
                      {formatPhoneNumber(shipper.phone)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Biển số xe:</span>
                    <span className="detail-value" style={{ fontFamily: 'monospace', fontWeight: '600' }}>
                      {formatVehicleNumber(shipper.vehicleNumber)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Activity size={20} />
                  Hiệu suất làm việc
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#fef3c7',
                    borderRadius: '0.5rem',
                    border: '1px solid #fde68a',
                    textAlign: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Star size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>
                        {stats.rating}★
                      </span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Đánh giá trung bình
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '0.5rem',
                    border: '1px solid #e0f2fe',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0369a1', marginBottom: '0.5rem' }}>
                      {stats.totalDeliveries}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Tổng giao hàng
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '0.5rem',
                    border: '1px solid #dcfce7',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#15803d', marginBottom: '0.5rem' }}>
                      {stats.successRate}%
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Tỷ lệ thành công
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Stats */}
              <div className="detail-section">
                <h3 className="section-title">
                  <TrendingUp size={20} />
                  Thống kê tháng này
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      Giao hàng tháng này
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                      {stats.monthlyDeliveries} đơn
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      Thời gian TB/đơn
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                      {stats.avgDeliveryTime} phút
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      Doanh thu tháng này
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        notation: 'compact',
                        maximumFractionDigits: 1
                      }).format(stats.totalRevenue)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Award size={20} />
                  Hoạt động gần đây
                </h3>
                <div style={{ 
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { time: '2 giờ trước', action: 'Hoàn thành giao hàng đơn #1234', status: 'success' },
                      { time: '5 giờ trước', action: 'Nhận đơn hàng mới #1235', status: 'info' },
                      { time: '1 ngày trước', action: 'Hoàn thành 8 đơn giao hàng', status: 'success' },
                      { time: '2 ngày trước', action: 'Cập nhật vị trí GPS', status: 'info' }
                    ].map((activity, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        padding: '0.5rem 0',
                        borderBottom: index < 3 ? '1px solid #e5e7eb' : 'none'
                      }}>
                        <div style={{ 
                          width: '8px', 
                          height: '8px', 
                          borderRadius: '50%', 
                          backgroundColor: activity.status === 'success' ? '#10b981' : '#3b82f6'
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                            {activity.action}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Work History */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Calendar size={20} />
                  Lịch sử làm việc
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Ngày gia nhập:</span>
                    <span className="detail-value">
                      {shipper.createdAt ? new Date(shipper.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Không có thông tin'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Cập nhật cuối:</span>
                    <span className="detail-value">
                      {shipper.updatedAt ? new Date(shipper.updatedAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Không có thông tin'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deleted Info */}
              {shipper.deletedAt && (
                <div className="detail-section">
                  <h3 className="section-title" style={{ color: '#ef4444' }}>
                    <Calendar size={20} />
                    Thông tin xóa
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Ngày ngừng làm việc:</span>
                      <span className="detail-value" style={{ color: '#ef4444' }}>
                        {new Date(shipper.deletedAt).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipperDetailModal;