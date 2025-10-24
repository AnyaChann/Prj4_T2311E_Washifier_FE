import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, Shield, Building } from 'lucide-react';
import { UserResponse } from '../../types/api';
import { AdminApiService } from '../../services/adminApiService';

interface UserDetailModalProps {
  userId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  userId,
  isOpen,
  onClose
}) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserDetail();
    }
  }, [isOpen, userId]);

  const fetchUserDetail = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('👤 UserDetail: Fetching user detail for ID:', userId);
      // For now, find user from the context or mock data
      // In real implementation, you would call API
      // const response = await AdminApiService.getUserById(userId);
      
      // Mock user detail (replace with actual API call)
      const mockUser: UserResponse = {
        id: userId,
        username: `user${userId}`,
        fullName: `Nguyễn Văn User ${userId}`,
        email: `user${userId}@washify.com`,
        phone: `098${userId.toString().padStart(7, '0')}`,
        address: `${userId} Đường ABC, Quận XYZ, TP.HCM`,
        isActive: Math.random() > 0.3,
        requireEmailVerificationForPasswordChange: false,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        branchId: Math.floor(Math.random() * 5) + 1,
        branchName: `Chi nhánh ${Math.floor(Math.random() * 5) + 1}`,
        roles: new Set(['USER', ...(Math.random() > 0.7 ? ['ADMIN'] : [])])
      };
      
      setUser(mockUser);
      console.log('✅ UserDetail: Got user data:', mockUser);
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải chi tiết người dùng');
      console.error('❌ UserDetail: Error fetching user detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (isActive?: boolean): string => {
    return isActive ? '#10b981' : '#ef4444';
  };

  const getStatusText = (isActive?: boolean): string => {
    return isActive ? 'Hoạt động' : 'Bị khóa';
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
        style={{ maxWidth: '700px', width: '90%' }}
        role="document"
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Chi tiết người dùng</h2>
            {user && (
              <p className="modal-subtitle">@{user.username}</p>
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
              Đang tải chi tiết người dùng...
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {user && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Left Column */}
              <div>
                {/* Basic Info */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <User size={20} />
                    Thông tin cơ bản
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">ID:</span>
                      <span className="detail-value">{user.id}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Tên đăng nhập:</span>
                      <span className="detail-value">{user.username}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Họ và tên:</span>
                      <span className="detail-value">{user.fullName || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Trạng thái:</span>
                      <span 
                        className="status-badge"
                        style={{ 
                          backgroundColor: getStatusColor(user.isActive),
                          color: 'white'
                        }}
                      >
                        {getStatusText(user.isActive)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <Mail size={20} />
                    Thông tin liên hệ
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{user.email || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Số điện thoại:</span>
                      <span className="detail-value">{user.phone || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Địa chỉ:</span>
                      <span className="detail-value">{user.address || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Branch Info */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <Building size={20} />
                    Thông tin chi nhánh
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Chi nhánh:</span>
                      <span className="detail-value">{user.branchName || '-'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">ID Chi nhánh:</span>
                      <span className="detail-value">{user.branchId || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Roles & Permissions */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <Shield size={20} />
                    Vai trò & Quyền hạn
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Vai trò:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {user.roles && user.roles.size > 0 ? (
                          Array.from(user.roles).map((role) => (
                            <span key={role} className="role-badge">
                              {role}
                            </span>
                          ))
                        ) : (
                          <span className="detail-value" style={{ color: '#64748b' }}>
                            Chưa có vai trò
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Yêu cầu xác thực email:</span>
                      <span className="detail-value">
                        {user.requireEmailVerificationForPasswordChange ? 'Có' : 'Không'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <Calendar size={20} />
                    Thông tin thời gian
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Ngày tạo:</span>
                      <span className="detail-value">{formatDate(user.createdAt)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Cập nhật cuối:</span>
                      <span className="detail-value">{formatDate(user.updatedAt)}</span>
                    </div>
                    {user.deletedAt && (
                      <div className="detail-item">
                        <span className="detail-label">Ngày xóa:</span>
                        <span className="detail-value" style={{ color: '#ef4444' }}>
                          {formatDate(user.deletedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="detail-section">
                  <h3 className="section-title">
                    <MapPin size={20} />
                    Thông tin bổ sung
                  </h3>
                  <div className="detail-grid">
                    <div className="detail-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span className="detail-label">Ghi chú:</span>
                      <span className="detail-value" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                        Người dùng được tạo tự động từ hệ thống. 
                        Các quyền hạn được phân quyền theo vai trò và chi nhánh.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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

export default UserDetailModal;