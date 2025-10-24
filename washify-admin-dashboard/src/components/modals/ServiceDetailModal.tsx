import React, { useState, useEffect } from 'react';
import { X, Settings, DollarSign, Clock, FileText, Calendar, Activity } from 'lucide-react';
import { ServiceResponse } from '../../types/api';

interface ServiceDetailModalProps {
  serviceId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  serviceId,
  isOpen,
  onClose
}) => {
  const [service, setService] = useState<ServiceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && serviceId) {
      fetchServiceDetail();
    }
  }, [isOpen, serviceId]);

  const fetchServiceDetail = async () => {
    if (!serviceId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('🛍️ ServiceDetail: Fetching service detail for ID:', serviceId);
      
      // Mock service detail (replace with actual API call)
      const mockService: ServiceResponse = {
        id: serviceId,
        name: `Dịch vụ ${serviceId}`,
        description: `Mô tả chi tiết cho dịch vụ ${serviceId}. Đây là dịch vụ chất lượng cao với quy trình xử lý chuyên nghiệp.`,
        price: Math.floor(Math.random() * 100000) + 20000,
        estimatedTime: Math.floor(Math.random() * 240) + 30,
        isActive: Math.random() > 0.3,
        deletedAt: Math.random() > 0.9 ? new Date().toISOString() : undefined
      };
      
      setService(mockService);
      console.log('✅ ServiceDetail: Got service data:', mockService);
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải chi tiết dịch vụ');
      console.error('❌ ServiceDetail: Error fetching service detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount?: number): string => {
    if (!amount) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatTime = (minutes?: number): string => {
    if (!minutes) return '0 phút';
    if (minutes < 60) {
      return `${minutes} phút`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours} giờ`;
  };

  const getStatusColor = (isActive?: boolean): string => {
    return isActive ? '#10b981' : '#ef4444';
  };

  const getStatusText = (isActive?: boolean): string => {
    return isActive ? 'Đang hoạt động' : 'Tạm dừng';
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px', width: '90%' }}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Chi tiết dịch vụ</h2>
            {service && (
              <p className="modal-subtitle">{service.name}</p>
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
              Đang tải chi tiết dịch vụ...
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {service && (
            <div>
              {/* Basic Info */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Settings size={20} />
                  Thông tin cơ bản
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{service.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tên dịch vụ:</span>
                    <span className="detail-value">{service.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Trạng thái:</span>
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusColor(service.isActive),
                        color: 'white'
                      }}
                    >
                      {getStatusText(service.isActive)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & Time */}
              <div className="detail-section">
                <h3 className="section-title">
                  <DollarSign size={20} />
                  Giá cả & Thời gian
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Giá dịch vụ:</span>
                    <span className="detail-value" style={{ fontWeight: '600', color: '#10b981' }}>
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Thời gian ước tính:</span>
                    <span className="detail-value" style={{ fontWeight: '500', color: '#3b82f6' }}>
                      {formatTime(service.estimatedTime)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="detail-section">
                <h3 className="section-title">
                  <FileText size={20} />
                  Mô tả dịch vụ
                </h3>
                <div className="detail-grid">
                  <div className="detail-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span className="detail-label">Mô tả chi tiết:</span>
                    <div 
                      className="detail-value" 
                      style={{ 
                        marginTop: '0.5rem', 
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                        textAlign: 'left',
                        padding: '1rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.375rem',
                        width: '100%'
                      }}
                    >
                      {service.description || 'Chưa có mô tả chi tiết cho dịch vụ này.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Activity size={20} />
                  Thống kê sử dụng
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '0.5rem',
                    border: '1px solid #e0f2fe',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0369a1' }}>
                      {Math.floor(Math.random() * 500) + 50}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Lượt sử dụng
                    </div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '0.5rem',
                    border: '1px solid #dcfce7',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#15803d' }}>
                      {formatCurrency((service.price || 0) * (Math.floor(Math.random() * 500) + 50))}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Doanh thu
                    </div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#fefce8',
                    borderRadius: '0.5rem',
                    border: '1px solid #fef3c7',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ca8a04' }}>
                      {(Math.random() * 2 + 3).toFixed(1)}★
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Đánh giá TB
                    </div>
                  </div>
                </div>
              </div>

              {/* Deleted Info */}
              {service.deletedAt && (
                <div className="detail-section">
                  <h3 className="section-title" style={{ color: '#ef4444' }}>
                    <Calendar size={20} />
                    Thông tin xóa
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Ngày xóa:</span>
                      <span className="detail-value" style={{ color: '#ef4444' }}>
                        {new Date(service.deletedAt).toLocaleDateString('vi-VN', {
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

export default ServiceDetailModal;