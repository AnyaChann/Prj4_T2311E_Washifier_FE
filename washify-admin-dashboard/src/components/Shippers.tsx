import React, { useEffect, useState } from 'react';
import { Truck, Plus, Eye, Edit, Trash2, Phone, Car } from 'lucide-react';
import { ShipperResponse } from '../types/api';
import { AdminApiService } from '../services/adminApiService';
import AdvancedFilter from './filters/AdvancedFilter';
import ExportButton from './ExportButton';
import ShipperDetailModal from './modals/ShipperDetailModal';
import ShipperFormModal from './modals/ShipperFormModal';

const Shippers: React.FC = () => {
  const [shippers, setShippers] = useState<ShipperResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });
  
  // Modal states
  const [selectedShipperId, setSelectedShipperId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingShipper, setEditingShipper] = useState<ShipperResponse | null>(null);

  useEffect(() => {
    fetchShippers();
  }, []);

  const fetchShippers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚚 Shippers: Fetching shippers data...');
      
      // Try to fetch real data from API
      try {
        const response = await AdminApiService.getShippers();
        console.log('🔍 Shippers: API Response:', response);
        
        // Check if response has data array
        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
          console.log('✅ Shippers: Successfully loaded real data:', response.data.length, 'shippers');
          setShippers(response.data);
          return;
        } else if (Array.isArray(response) && response.length > 0) {
          // Sometimes API returns array directly
          console.log('✅ Shippers: Successfully loaded real data (direct array):', response.length, 'shippers');
          setShippers(response);
          return;
        } else {
          console.log('⚠️ Shippers: API returned empty or invalid data');
        }
      } catch (err) {
        console.log('⚠️ Shippers: Real API failed. Error:', err);
      }
      
      // Fallback to mock data
      const mockShippers: ShipperResponse[] = [
        {
          id: 1,
          name: 'Nguyễn Văn An',
          phone: '0912345678',
          vehicleNumber: '29H1-12345',
          isActive: true,
          createdAt: '2024-01-15T08:00:00Z',
          updatedAt: '2024-11-01T10:30:00Z'
        },
        {
          id: 2,
          name: 'Trần Thị Bình',
          phone: '0923456789',
          vehicleNumber: '51G1-67890',
          isActive: true,
          createdAt: '2024-02-20T09:30:00Z',
          updatedAt: '2024-10-28T14:20:00Z'
        },
        {
          id: 3,
          name: 'Lê Minh Cường',
          phone: '0934567890',
          vehicleNumber: '30F1-11223',
          isActive: false,
          createdAt: '2024-03-10T10:15:00Z',
          updatedAt: '2024-11-10T16:45:00Z'
        },
        {
          id: 4,
          name: 'Phạm Thị Dung',
          phone: '0945678901',
          vehicleNumber: '77S1-33445',
          isActive: true,
          createdAt: '2024-01-25T14:20:00Z',
          updatedAt: '2024-11-05T11:10:00Z'
        },
        {
          id: 5,
          name: 'Hoàng Văn Em',
          phone: '0956789012',
          vehicleNumber: '43T1-55667',
          isActive: true,
          createdAt: '2024-04-05T11:45:00Z',
          updatedAt: '2024-11-08T09:25:00Z'
        },
        {
          id: 6,
          name: 'Đặng Thị Phương',
          phone: '0967890123',
          vehicleNumber: '60H2-77889',
          isActive: false,
          createdAt: '2024-02-14T16:30:00Z',
          updatedAt: '2024-11-12T13:15:00Z',
          deletedAt: '2024-11-15T10:00:00Z'
        },
        {
          id: 7,
          name: 'Vũ Minh Quang',
          phone: '0978901234',
          vehicleNumber: '92B1-99001',
          isActive: true,
          createdAt: '2024-05-18T07:20:00Z',
          updatedAt: '2024-11-13T15:30:00Z'
        },
        {
          id: 8,
          name: 'Ngô Thị Hà',
          phone: '0989012345',
          vehicleNumber: '84C1-12334',
          isActive: true,
          createdAt: '2024-06-22T12:00:00Z',
          updatedAt: '2024-11-14T08:45:00Z'
        }
      ];
      
      // Show empty state instead of mock data
      console.log('📭 Shippers: No data available from API, showing empty state');
      setShippers([]);
      setError('Không có dữ liệu shipper hoặc API chưa sẵn sàng');
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải danh sách shipper');
      console.error('❌ Shippers: Error fetching shippers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewShipper = (shipperId?: number) => {
    if (shipperId) {
      setSelectedShipperId(shipperId);
      setIsDetailModalOpen(true);
    }
  };

  const handleAddShipper = () => {
    setEditingShipper(null);
    setIsFormModalOpen(true);
  };

  const handleEditShipper = (shipper: ShipperResponse) => {
    setEditingShipper(shipper);
    setIsFormModalOpen(true);
  };

  const handleDeleteShipper = async (shipperId?: number) => {
    if (!shipperId) return;
    
    if (globalThis.confirm('Bạn có chắc chắn muốn xóa shipper này?')) {
      try {
        console.log('🗑️ Shippers: Deleting shipper:', shipperId);
        // TODO: Implement delete shipper API call
        // await AdminApiService.deleteShipper(shipperId);
        
        // For now, just remove from local state
        setShippers(prev => prev.filter(shipper => shipper.id !== shipperId));
        alert('Đã xóa shipper thành công!');
        
      } catch (err) {
        alert('Có lỗi xảy ra khi xóa shipper');
        console.error('❌ Shippers: Error deleting shipper:', err);
      }
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedShipperId(null);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingShipper(null);
  };

  const getShipperStatusClass = (isActive?: boolean): string => {
    return isActive ? 'status-active' : 'status-inactive';
  };

  const getShipperStatusText = (isActive?: boolean): string => {
    return isActive ? 'Đang hoạt động' : 'Tạm nghỉ';
  };

  const formatPhoneNumber = (phone?: string): string => {
    if (!phone) return '';
    // Format Vietnamese phone number
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

  // Filter shippers based on search criteria
  const filteredShippers = shippers.filter(shipper => {
    const matchesSearch = !filters.searchTerm || 
      shipper.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      shipper.phone?.includes(filters.searchTerm) ||
      shipper.vehicleNumber?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesStatus = !filters.status || 
      (filters.status === 'active' && shipper.isActive) ||
      (filters.status === 'inactive' && !shipper.isActive);

    const matchesDateRange = (!filters.dateFrom && !filters.dateTo) ||
      (shipper.createdAt && new Date(shipper.createdAt) >= new Date(filters.dateFrom || '1900-01-01') &&
       new Date(shipper.createdAt) <= new Date(filters.dateTo || '2100-12-31'));

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Export data formatting
  const exportData = filteredShippers.map(shipper => ({
    ID: shipper.id,
    'Họ Tên': shipper.name,
    'Số Điện Thoại': shipper.phone,
    'Biển Số Xe': shipper.vehicleNumber,
    'Trạng Thái': getShipperStatusText(shipper.isActive),
    'Ngày Gia Nhập': shipper.createdAt ? new Date(shipper.createdAt).toLocaleDateString('vi-VN') : '',
    'Cập Nhật Cuối': shipper.updatedAt ? new Date(shipper.updatedAt).toLocaleDateString('vi-VN') : '',
    'Ngày Xóa': shipper.deletedAt ? new Date(shipper.deletedAt).toLocaleDateString('vi-VN') : ''
  }));

  const filterOptions = [
    {
      key: 'status',
      label: 'Trạng thái',
      type: 'select' as const,
      options: [
        { value: '', label: 'Tất cả' },
        { value: 'active', label: 'Đang hoạt động' },
        { value: 'inactive', label: 'Tạm nghỉ' }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Đang tải danh sách shipper...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={fetchShippers} className="btn btn-primary" style={{ marginTop: '1rem' }}>
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
            <Truck size={28} />
            Quản lý Shipper
          </h1>
          <p className="page-subtitle">
            Quản lý {shippers.length} shipper • {shippers.some(s => s.isActive) && (
              <span style={{ color: '#10b981' }}>
                {shippers.filter(s => s.isActive).length} đang hoạt động
              </span>
            )}
          </p>
        </div>
        <div className="page-actions">
          <ExportButton
            data={exportData}
            filename="shippers"
            title="Xuất danh sách shipper"
          />
          <button className="btn btn-primary" onClick={handleAddShipper}>
            <Plus size={20} />
            Thêm shipper
          </button>
        </div>
      </div>

      <div className="filters-section">
        <AdvancedFilter
          {...({
            filters,
            onFiltersChange: setFilters,
            searchPlaceholder: "Tìm kiếm theo tên, số điện thoại, biển số xe...",
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
                <th>Họ tên</th>
                <th>Liên hệ</th>
                <th>Phương tiện</th>
                {/* <th>Hiệu suất</th> */}
                <th>Trạng thái</th>
                <th>Ngày gia nhập</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredShippers.map((shipper) => {
                // Performance metrics - commented out as not needed yet
                // const rating = getPerformanceRating();
                // const deliveryCount = getDeliveryCount();
                
                return (
                  <tr key={shipper.id} className={shipper.deletedAt ? 'deleted-row' : ''}>
                    <td>
                      <span className="id-badge">{shipper.id}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Truck size={16} style={{ color: '#6b7280' }} />
                        <span style={{ fontWeight: '500' }}>{shipper.name}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={14} style={{ color: '#6b7280' }} />
                        <span>{formatPhoneNumber(shipper.phone)}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Car size={14} style={{ color: '#6b7280' }} />
                        <span style={{ fontFamily: 'monospace', fontWeight: '500' }}>
                          {formatVehicleNumber(shipper.vehicleNumber)}
                        </span>
                      </div>
                    </td>
                    {/* Performance column - commented out as not needed yet
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Star size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                          <span style={{ fontWeight: '500', color: '#1f2937' }}>{rating}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <TrendingUp size={14} style={{ color: '#3b82f6' }} />
                          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                            {deliveryCount} giao hàng
                          </span>
                        </div>
                      </div>
                    </td>
                    */}
                    <td>
                      <span className={`status-badge ${getShipperStatusClass(shipper.isActive)}`}>
                        {getShipperStatusText(shipper.isActive)}
                      </span>
                    </td>
                    <td>
                      {shipper.createdAt ? new Date(shipper.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }) : ''}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-view"
                          onClick={() => handleViewShipper(shipper.id)}
                          title="Xem chi tiết"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-action btn-edit"
                          onClick={() => handleEditShipper(shipper)}
                          title="Chỉnh sửa"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDeleteShipper(shipper.id)}
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredShippers.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            Không có shipper nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* Shipper Detail Modal */}
      <ShipperDetailModal
        shipperId={selectedShipperId}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />

      {/* Shipper Form Modal */}
      <ShipperFormModal
        shipperId={editingShipper?.id}
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSuccess={() => {
          fetchShippers();
          handleCloseFormModal();
        }}
      />
    </div>
  );
};

export default Shippers;