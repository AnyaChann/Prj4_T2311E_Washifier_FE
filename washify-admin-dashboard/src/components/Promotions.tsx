import React, { useEffect, useState } from 'react';
import { Tag, Plus, Eye, Edit, Trash2, Calendar, Percent, Gift, TrendingUp } from 'lucide-react';
import { PromotionResponse } from '../types/api';
import { AdminApiService } from '../services/adminApiService';
import AdvancedFilter from './filters/AdvancedFilter';
import ExportButton from './ExportButton';
import PromotionDetailModal from './modals/PromotionDetailModal';
import PromotionFormModal from './modals/PromotionFormModal';

const Promotions: React.FC = () => {
  const [promotions, setPromotions] = useState<PromotionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });
  
  // Modal states
  const [selectedPromotionId, setSelectedPromotionId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<PromotionResponse | null>(null);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎁 Promotions: Fetching promotions data...');
      
      // Try to fetch real data first, fallback to mock if fails
      try {
        const realData = await AdminApiService.getPromotions();
        if (realData && Array.isArray(realData)) {
          setPromotions(realData);
          console.log('✅ Promotions: Successfully loaded real data:', realData);
          return;
        }
      } catch (err) {
        console.log('⚠️ Promotions: Real API failed, using mock data. Error:', err);
      }
      
      // Fallback to mock data
      const mockPromotions: PromotionResponse[] = [
        {
          id: 1,
          code: 'WELCOME20',
          description: 'Giảm giá 20% cho khách hàng mới',
          discountType: 'PERCENTAGE',
          discountValue: 20,
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-12-31T23:59:59Z',
          isActive: true
        },
        {
          id: 2,
          code: 'SUMMER50K',
          description: 'Giảm 50,000đ cho đơn hàng từ 200,000đ',
          discountType: 'FIXED',
          discountValue: 50000,
          startDate: '2024-06-01T00:00:00Z',
          endDate: '2024-08-31T23:59:59Z',
          isActive: true
        },
        {
          id: 3,
          code: 'STUDENT15',
          description: 'Ưu đãi 15% dành cho sinh viên',
          discountType: 'PERCENTAGE',
          discountValue: 15,
          startDate: '2024-09-01T00:00:00Z',
          endDate: '2024-12-31T23:59:59Z',
          isActive: true
        },
        {
          id: 4,
          code: 'FLASH30',
          description: 'Flash sale giảm 30% trong 24h',
          discountType: 'PERCENTAGE',
          discountValue: 30,
          startDate: '2024-11-11T00:00:00Z',
          endDate: '2024-11-11T23:59:59Z',
          isActive: false
        },
        {
          id: 5,
          code: 'VIP100K',
          description: 'Giảm 100,000đ cho khách hàng VIP',
          discountType: 'FIXED',
          discountValue: 100000,
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-12-31T23:59:59Z',
          isActive: true
        },
        {
          id: 6,
          code: 'BLACKFRIDAY',
          description: 'Black Friday - Giảm đến 50%',
          discountType: 'PERCENTAGE',
          discountValue: 50,
          startDate: '2024-11-29T00:00:00Z',
          endDate: '2024-11-29T23:59:59Z',
          isActive: false,
          deletedAt: '2024-12-01T10:00:00Z'
        }
      ];
      
      setPromotions(mockPromotions);
      console.log('✅ Promotions: Got mock promotions data:', mockPromotions.length, 'promotions');
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải danh sách khuyến mãi');
      console.error('❌ Promotions: Error fetching promotions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPromotion = (promotionId?: number) => {
    if (promotionId) {
      setSelectedPromotionId(promotionId);
      setIsDetailModalOpen(true);
    }
  };

  const handleAddPromotion = () => {
    setEditingPromotion(null);
    setIsFormModalOpen(true);
  };

  const handleEditPromotion = (promotion: PromotionResponse) => {
    setEditingPromotion(promotion);
    setIsFormModalOpen(true);
  };

  const handleDeletePromotion = async (promotionId?: number) => {
    if (!promotionId) return;
    
    if (globalThis.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      try {
        console.log('🗑️ Promotions: Deleting promotion:', promotionId);
        // TODO: Implement delete promotion API call
        // await AdminApiService.deletePromotion(promotionId);
        
        // For now, just remove from local state
        setPromotions(prev => prev.filter(promotion => promotion.id !== promotionId));
        alert('Đã xóa khuyến mãi thành công!');
        
      } catch (err) {
        alert('Có lỗi xảy ra khi xóa khuyến mãi');
        console.error('❌ Promotions: Error deleting promotion:', err);
      }
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPromotionId(null);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingPromotion(null);
  };

  const getPromotionStatusClass = (promotion: PromotionResponse): string => {
    if (promotion.deletedAt) return 'status-deleted';
    if (!promotion.isActive) return 'status-inactive';
    
    const now = new Date();
    const startDate = promotion.startDate ? new Date(promotion.startDate) : null;
    const endDate = promotion.endDate ? new Date(promotion.endDate) : null;
    
    if (startDate && now < startDate) return 'status-pending';
    if (endDate && now > endDate) return 'status-expired';
    
    return 'status-active';
  };

  const getPromotionStatusText = (promotion: PromotionResponse): string => {
    if (promotion.deletedAt) return 'Đã xóa';
    if (!promotion.isActive) return 'Tạm dừng';
    
    const now = new Date();
    const startDate = promotion.startDate ? new Date(promotion.startDate) : null;
    const endDate = promotion.endDate ? new Date(promotion.endDate) : null;
    
    if (startDate && now < startDate) return 'Sắp diễn ra';
    if (endDate && now > endDate) return 'Đã hết hạn';
    
    return 'Đang diễn ra';
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

  const getDiscountIcon = (discountType?: string) => {
    return discountType === 'PERCENTAGE' ? <Percent size={14} /> : <Gift size={14} />;
  };

  const isPromotionActive = (promotion: PromotionResponse): boolean => {
    if (!promotion.isActive || promotion.deletedAt) return false;
    
    const now = new Date();
    const startDate = promotion.startDate ? new Date(promotion.startDate) : null;
    const endDate = promotion.endDate ? new Date(promotion.endDate) : null;
    
    if (startDate && now < startDate) return false;
    if (endDate && now > endDate) return false;
    
    return true;
  };

  // Filter promotions based on search criteria
  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = !filters.searchTerm || 
      promotion.code?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      promotion.description?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesStatus = !filters.status || 
      (filters.status === 'active' && isPromotionActive(promotion)) ||
      (filters.status === 'inactive' && !isPromotionActive(promotion)) ||
      (filters.status === 'expired' && promotion.endDate && new Date() > new Date(promotion.endDate)) ||
      (filters.status === 'pending' && promotion.startDate && new Date() < new Date(promotion.startDate));

    const matchesDateRange = (!filters.dateFrom && !filters.dateTo) ||
      (promotion.startDate && new Date(promotion.startDate) >= new Date(filters.dateFrom || '1900-01-01') &&
       new Date(promotion.startDate) <= new Date(filters.dateTo || '2100-12-31'));

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Export data formatting
  const exportData = filteredPromotions.map(promotion => ({
    ID: promotion.id,
    'Mã Khuyến Mãi': promotion.code,
    'Mô Tả': promotion.description,
    'Loại Giảm Giá': promotion.discountType === 'PERCENTAGE' ? 'Phần trăm' : 'Cố định',
    'Giá Trị': formatDiscountValue(promotion),
    'Ngày Bắt Đầu': promotion.startDate ? new Date(promotion.startDate).toLocaleDateString('vi-VN') : '',
    'Ngày Kết Thúc': promotion.endDate ? new Date(promotion.endDate).toLocaleDateString('vi-VN') : '',
    'Trạng Thái': getPromotionStatusText(promotion),
    'Ngày Xóa': promotion.deletedAt ? new Date(promotion.deletedAt).toLocaleDateString('vi-VN') : ''
  }));

  const filterOptions = [
    {
      key: 'status',
      label: 'Trạng thái',
      type: 'select' as const,
      options: [
        { value: '', label: 'Tất cả' },
        { value: 'active', label: 'Đang diễn ra' },
        { value: 'pending', label: 'Sắp diễn ra' },
        { value: 'expired', label: 'Đã hết hạn' },
        { value: 'inactive', label: 'Tạm dừng' }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Đang tải danh sách khuyến mãi...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={fetchPromotions} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Tag size={28} />
            Quản lý Khuyến mãi
          </h1>
          <p className="page-subtitle">
            Quản lý {promotions.length} khuyến mãi • {promotions.some(p => isPromotionActive(p)) && (
              <span style={{ color: '#10b981' }}>
                {promotions.filter(p => isPromotionActive(p)).length} đang diễn ra
              </span>
            )}
          </p>
        </div>
        <div className="page-actions">
          <ExportButton
            data={exportData}
            filename="promotions"
            title="Xuất danh sách khuyến mãi"
          />
          <button className="btn btn-primary" onClick={handleAddPromotion}>
            <Plus size={20} />
            Thêm khuyến mãi
          </button>
        </div>
      </div>

      <div className="filters-section">
        <AdvancedFilter
          {...({
            filters,
            onFiltersChange: setFilters,
            searchPlaceholder: "Tìm kiếm theo mã khuyến mãi, mô tả...",
            additionalFilters: filterOptions
          } as any)}
        />
      </div>

      <div className="content-section">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Mã khuyến mãi</th>
                <th>Mô tả</th>
                <th>Giảm giá</th>
                <th>Thời gian áp dụng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredPromotions.map((promotion) => (
                <tr key={promotion.id} className={promotion.deletedAt ? 'deleted-row' : ''}>
                  <td>
                    <span className="id-badge">{promotion.id}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Tag size={16} style={{ color: '#6b7280' }} />
                      <span style={{ 
                        fontFamily: 'monospace', 
                        fontWeight: '600',
                        fontSize: '0.875rem',
                        backgroundColor: '#f3f4f6',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem'
                      }}>
                        {promotion.code}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span title={promotion.description}>
                      {promotion.description && promotion.description.length > 50 
                        ? promotion.description.substring(0, 50) + '...' 
                        : promotion.description}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getDiscountIcon(promotion.discountType)}
                      <span style={{ 
                        fontWeight: '600',
                        color: promotion.discountType === 'PERCENTAGE' ? '#dc2626' : '#059669'
                      }}>
                        {formatDiscountValue(promotion)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={12} style={{ color: '#6b7280' }} />
                        <span>
                          {promotion.startDate ? 
                            new Date(promotion.startDate).toLocaleDateString('vi-VN', { 
                              day: '2-digit', month: '2-digit', year: 'numeric' 
                            }) : 'N/A'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                        <Calendar size={12} style={{ color: '#6b7280' }} />
                        <span>
                          {promotion.endDate ? 
                            new Date(promotion.endDate).toLocaleDateString('vi-VN', { 
                              day: '2-digit', month: '2-digit', year: 'numeric' 
                            }) : 'Không giới hạn'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getPromotionStatusClass(promotion)}`}>
                      {getPromotionStatusText(promotion)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-view"
                        onClick={() => handleViewPromotion(promotion.id)}
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleEditPromotion(promotion)}
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDeletePromotion(promotion.id)}
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPromotions.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            Không có khuyến mãi nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* Promotion Detail Modal */}
      <PromotionDetailModal
        promotionId={selectedPromotionId}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />

      {/* Promotion Form Modal */}
      <PromotionFormModal
        promotionId={editingPromotion?.id}
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSuccess={() => {
          fetchPromotions();
          handleCloseFormModal();
        }}
      />
    </div>
  );
};

export default Promotions;