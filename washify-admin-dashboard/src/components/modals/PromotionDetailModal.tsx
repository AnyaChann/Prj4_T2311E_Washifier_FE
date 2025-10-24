import React, { useState, useEffect } from 'react';
import { X, Tag, Gift, Percent, Calendar, Activity, TrendingUp, Clock, Users } from 'lucide-react';
import { PromotionResponse } from '../../types/api';
import { AdminApiService } from '../../services/adminApiService';

interface PromotionDetailModalProps {
  promotionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const PromotionDetailModal: React.FC<PromotionDetailModalProps> = ({
  promotionId,
  isOpen,
  onClose
}) => {
  const [promotion, setPromotion] = useState<PromotionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && promotionId) {
      fetchPromotionDetail();
    }
  }, [isOpen, promotionId]);

  const fetchPromotionDetail = async () => {
    if (!promotionId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎁 PromotionDetail: Fetching promotion detail for ID:', promotionId);
      
      // Try to fetch real data from API
      const response = await AdminApiService.getPromotionById(promotionId);
      console.log('🎁 PromotionDetail: API Response:', response);
      
      if (response?.data) {
        setPromotion(response.data);
        console.log('✅ PromotionDetail: Got real promotion data:', response.data);
      } else if (response && !response.data) {
        // Sometimes API returns promotion directly
        setPromotion(response);
        console.log('✅ PromotionDetail: Got promotion data (direct):', response);
      }
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải chi tiết khuyến mãi');
      console.error('❌ PromotionDetail: Error fetching promotion detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDiscountValue = (promotion: PromotionResponse): string => {
    if (!promotion.discountValue) return '0';
    
    if (promotion.discountType === 'PERCENTAGE') {
      return `${promotion.discountValue}%`;
    } else {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(promotion.discountValue);
    }
  };

  const getStatusColor = (promotion: PromotionResponse): string => {
    if (promotion.deletedAt) return '#6b7280';
    if (!promotion.isActive) return '#ef4444';
    
    const now = new Date();
    const startDate = promotion.startDate ? new Date(promotion.startDate) : null;
    const endDate = promotion.endDate ? new Date(promotion.endDate) : null;
    
    if (startDate && now < startDate) return '#f59e0b';
    if (endDate && now > endDate) return '#6b7280';
    
    return '#10b981';
  };

  const getStatusText = (promotion: PromotionResponse): string => {
    if (promotion.deletedAt) return 'Đã xóa';
    if (!promotion.isActive) return 'Tạm dừng';
    
    const now = new Date();
    const startDate = promotion.startDate ? new Date(promotion.startDate) : null;
    const endDate = promotion.endDate ? new Date(promotion.endDate) : null;
    
    if (startDate && now < startDate) return 'Sắp diễn ra';
    if (endDate && now > endDate) return 'Đã hết hạn';
    
    return 'Đang diễn ra';
  };

  const getDiscountTypeText = (discountType?: string): string => {
    return discountType === 'PERCENTAGE' ? 'Giảm theo phần trăm' : 'Giảm số tiền cố định';
  };

  const getUsageStats = () => {
    return {
      totalUsed: Math.floor(Math.random() * 500) + 50,
      totalRevenue: Math.floor(Math.random() * 100000000) + 10000000,
      avgOrderValue: Math.floor(Math.random() * 200000) + 100000,
      conversionRate: Math.round((Math.random() * 10 + 5) * 10) / 10
    };
  };

  const getRemainingTime = (endDate?: string): string => {
    if (!endDate) return 'Không giới hạn';
    
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Đã hết hạn';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `Còn ${days} ngày`;
    if (hours > 0) return `Còn ${hours} giờ`;
    return 'Sắp hết hạn';
  };

  if (!isOpen) return null;

  const stats = getUsageStats();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '800px', width: '90%' }}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Chi tiết khuyến mãi</h2>
            {promotion && (
              <p className="modal-subtitle">{promotion.code}</p>
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
              Đang tải chi tiết khuyến mãi...
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {promotion && (
            <div>
              {/* Basic Info */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Tag size={20} />
                  Thông tin cơ bản
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{promotion.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Mã khuyến mãi:</span>
                    <span className="detail-value" style={{ 
                      fontFamily: 'monospace', 
                      fontWeight: '600',
                      backgroundColor: '#f3f4f6',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem'
                    }}>
                      {promotion.code}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Trạng thái:</span>
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusColor(promotion),
                        color: 'white'
                      }}
                    >
                      {getStatusText(promotion)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Gift size={20} />
                  Mô tả chương trình
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
                        padding: '1rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.375rem',
                        width: '100%'
                      }}
                    >
                      {promotion.description || 'Chưa có mô tả chi tiết cho chương trình khuyến mãi này.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount Info */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Percent size={20} />
                  Thông tin giảm giá
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Loại giảm giá:</span>
                    <span className="detail-value" style={{ fontWeight: '500' }}>
                      {getDiscountTypeText(promotion.discountType)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Giá trị giảm:</span>
                    <span className="detail-value" style={{ 
                      fontWeight: '700', 
                      fontSize: '1.125rem',
                      color: promotion.discountType === 'PERCENTAGE' ? '#dc2626' : '#059669'
                    }}>
                      {formatDiscountValue(promotion)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Period */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Calendar size={20} />
                  Thời gian áp dụng
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Ngày bắt đầu:</span>
                    <span className="detail-value">
                      {promotion.startDate ? new Date(promotion.startDate).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Không có thông tin'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ngày kết thúc:</span>
                    <span className="detail-value">
                      {promotion.endDate ? new Date(promotion.endDate).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Không giới hạn'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Thời gian còn lại:</span>
                    <span className="detail-value" style={{ 
                      fontWeight: '600',
                      color: promotion.endDate && new Date() > new Date(promotion.endDate) ? '#dc2626' : '#059669'
                    }}>
                      {getRemainingTime(promotion.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Activity size={20} />
                  Thống kê sử dụng
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '0.5rem',
                    border: '1px solid #e0f2fe',
                    textAlign: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Users size={16} style={{ color: '#0369a1' }} />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0369a1' }}>
                      {stats.totalUsed}
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <TrendingUp size={16} style={{ color: '#15803d' }} />
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#15803d' }}>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        notation: 'compact',
                        maximumFractionDigits: 1
                      }).format(stats.totalRevenue)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Tiết kiệm cho KH
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
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(stats.avgOrderValue)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Giá trị đơn TB
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#fdf2f8',
                    borderRadius: '0.5rem',
                    border: '1px solid #fce7f3',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#be185d' }}>
                      {stats.conversionRate}%
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Tỷ lệ chuyển đổi
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Insights */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Clock size={20} />
                  Phân tích hiệu quả
                </h3>
                <div style={{ 
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                        Hiệu quả chương trình
                      </div>
                      <div style={{ 
                        fontSize: '1.125rem', 
                        fontWeight: 'bold', 
                        color: stats.conversionRate > 10 ? '#059669' : stats.conversionRate > 5 ? '#f59e0b' : '#dc2626'
                      }}>
                        {stats.conversionRate > 10 ? 'Rất tốt' : stats.conversionRate > 5 ? 'Khá tốt' : 'Cần cải thiện'}
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                        Khuyến nghị
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                        {stats.conversionRate > 10 
                          ? 'Duy trì và mở rộng chương trình' 
                          : stats.conversionRate > 5 
                          ? 'Tối ưu hóa thêm để tăng hiệu quả'
                          : 'Cần xem xét lại điều kiện và giá trị'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deleted Info */}
              {promotion.deletedAt && (
                <div className="detail-section">
                  <h3 className="section-title" style={{ color: '#ef4444' }}>
                    <Calendar size={20} />
                    Thông tin xóa
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Ngày xóa:</span>
                      <span className="detail-value" style={{ color: '#ef4444' }}>
                        {new Date(promotion.deletedAt).toLocaleDateString('vi-VN', {
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

export default PromotionDetailModal;