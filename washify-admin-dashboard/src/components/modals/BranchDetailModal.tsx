import React, { useState, useEffect } from 'react';
import { X, MapPin, Building2, Phone, User, Calendar, Activity, TrendingUp } from 'lucide-react';
import { BranchResponse } from '../../types/api';

interface BranchDetailModalProps {
  branchId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const BranchDetailModal: React.FC<BranchDetailModalProps> = ({
  branchId,
  isOpen,
  onClose
}) => {
  const [branch, setBranch] = useState<BranchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && branchId) {
      fetchBranchDetail();
    }
  }, [isOpen, branchId]);

  const fetchBranchDetail = async () => {
    if (!branchId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('🏢 BranchDetail: Fetching branch detail for ID:', branchId);
      
      // Mock branch detail (replace with actual API call)
      const mockBranch: BranchResponse = {
        id: branchId,
        name: `Chi nhánh ${branchId === 1 ? 'Quận 1' : branchId === 2 ? 'Quận 7' : `Số ${branchId}`}`,
        address: branchId === 1 ? '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM' :
                 branchId === 2 ? '456 Huỳnh Tấn Phát, Phường Tân Thuận Đông, Quận 7, TP.HCM' :
                 `Địa chỉ chi nhánh ${branchId}`,
        phone: `028 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
        managerName: ['Nguyễn Văn Nam', 'Trần Thị Lan', 'Lê Minh Tuấn'][branchId % 3] || `Quản lý ${branchId}`,
        isActive: Math.random() > 0.2,
        createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
        deletedAt: Math.random() > 0.9 ? new Date().toISOString() : undefined
      };
      
      setBranch(mockBranch);
      console.log('✅ BranchDetail: Got branch data:', mockBranch);
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải chi tiết chi nhánh');
      console.error('❌ BranchDetail: Error fetching branch detail:', err);
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

  const getStatusColor = (isActive?: boolean): string => {
    return isActive ? '#10b981' : '#ef4444';
  };

  const getStatusText = (isActive?: boolean): string => {
    return isActive ? 'Đang hoạt động' : 'Tạm đóng cửa';
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '700px', width: '90%' }}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Chi tiết chi nhánh</h2>
            {branch && (
              <p className="modal-subtitle">{branch.name}</p>
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
              Đang tải chi tiết chi nhánh...
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {branch && (
            <div>
              {/* Basic Info */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Building2 size={20} />
                  Thông tin cơ bản
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{branch.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tên chi nhánh:</span>
                    <span className="detail-value">{branch.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Trạng thái:</span>
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: getStatusColor(branch.isActive),
                        color: 'white'
                      }}
                    >
                      {getStatusText(branch.isActive)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="detail-section">
                <h3 className="section-title">
                  <MapPin size={20} />
                  Thông tin liên hệ
                </h3>
                <div className="detail-grid">
                  <div className="detail-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span className="detail-label">Địa chỉ:</span>
                    <div 
                      className="detail-value" 
                      style={{ 
                        marginTop: '0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        padding: '0.75rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.375rem',
                        width: '100%'
                      }}
                    >
                      {branch.address || 'Chưa có địa chỉ'}
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Số điện thoại:</span>
                    <span className="detail-value" style={{ fontWeight: '500', color: '#3b82f6' }}>
                      {formatPhoneNumber(branch.phone)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Management Info */}
              <div className="detail-section">
                <h3 className="section-title">
                  <User size={20} />
                  Thông tin quản lý
                </h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Người quản lý:</span>
                    <span className="detail-value" style={{ fontWeight: '500' }}>
                      {branch.managerName || 'Chưa có thông tin'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Ngày thành lập:</span>
                    <span className="detail-value">
                      {branch.createdAt ? new Date(branch.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Không có thông tin'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="detail-section">
                <h3 className="section-title">
                  <Activity size={20} />
                  Thống kê hoạt động
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
                      {Math.floor(Math.random() * 200) + 50}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Đơn hàng/tháng
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
                      {(Math.random() * 50 + 10).toFixed(1)}M
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Doanh thu/tháng
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
                      {Math.floor(Math.random() * 20) + 5}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Nhân viên
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
                      {(Math.random() * 2 + 3).toFixed(1)}★
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      Đánh giá TB
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="detail-section">
                <h3 className="section-title">
                  <TrendingUp size={20} />
                  Chỉ số hiệu suất
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      Thời gian xử lý TB
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                      {Math.floor(Math.random() * 60) + 30} phút
                    </div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                      Tỷ lệ hoàn thành
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                      {(Math.random() * 20 + 80).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Deleted Info */}
              {branch.deletedAt && (
                <div className="detail-section">
                  <h3 className="section-title" style={{ color: '#ef4444' }}>
                    <Calendar size={20} />
                    Thông tin xóa
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Ngày đóng cửa:</span>
                      <span className="detail-value" style={{ color: '#ef4444' }}>
                        {new Date(branch.deletedAt).toLocaleDateString('vi-VN', {
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

export default BranchDetailModal;