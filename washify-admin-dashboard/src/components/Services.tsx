import React, { useEffect, useState } from 'react';
import { Settings, Plus, Eye, Edit, Trash2, Clock, DollarSign, Currency } from 'lucide-react';
import { ServiceResponse } from '../types/api';
import { AdminApiService } from '../services/adminApiService';
import AdvancedFilter from './filters/AdvancedFilter';
import ExportButton from './ExportButton';
import ServiceDetailModal from './modals/ServiceDetailModal';
import ServiceFormModal from './modals/ServiceFormModal';

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });
  
  // Modal states
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceResponse | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🛍️ Services: Fetching services data...');
      
      // Try to fetch real data from API
      try {
        const response = await AdminApiService.getServices();
        console.log('🔍 Services: API Response:', response);
        
        // Check if response has data array
        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
          console.log('✅ Services: Successfully loaded real data:', response.data.length, 'services');
          setServices(response.data);
          return;
        } else if (Array.isArray(response) && response.length > 0) {
          // Sometimes API returns array directly
          console.log('✅ Services: Successfully loaded real data (direct array):', response.length, 'services');
          setServices(response);
          return;
        } else {
          console.log('⚠️ Services: API returned empty or invalid data, using fallback');
        }
      } catch (err) {
        console.log('⚠️ Services: Real API failed, using fallback. Error:', err);
      }
      
      // Fallback: Show empty state message
      console.log('📭 Services: No data available from API, showing empty state');
      setServices([]);
      setError('Không có dữ liệu dịch vụ hoặc API chưa sẵn sàng');
      
    } catch (err) {
      setError('Không thể tải danh sách dịch vụ');
      console.error('❌ Services: Error fetching services:', err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewService = (serviceId?: number) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
      setIsDetailModalOpen(true);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setIsFormModalOpen(true);
  };

  const handleEditService = (service: ServiceResponse) => {
    setEditingService(service);
    setIsFormModalOpen(true);
  };

  const handleDeleteService = async (serviceId?: number) => {
    if (!serviceId) return;
    
    if (globalThis.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      try {
        console.log('🗑️ Services: Deleting service:', serviceId);
        // TODO: Implement delete service API call
        // await AdminApiService.deleteService(serviceId);
        
        // For now, just remove from local state
        setServices(prev => prev.filter(service => service.id !== serviceId));
        alert('Đã xóa dịch vụ thành công!');
      } catch (err) {
        console.error('❌ Services: Error deleting service:', err);
        alert('Có lỗi xảy ra khi xóa dịch vụ');
      }
    }
  };

  const handleToggleServiceStatus = async (serviceId?: number, currentStatus?: boolean) => {
    if (!serviceId) return;
    
    const action = currentStatus ? 'tắt' : 'bật';
    if (globalThis.confirm(`Bạn có chắc chắn muốn ${action} dịch vụ này?`)) {
      try {
        console.log(`🔄 Services: ${action} service:`, serviceId);
        // TODO: Implement toggle service status API call
        // await AdminApiService.toggleServiceStatus(serviceId, !currentStatus);
        
        // For now, just update local state
        setServices(prev => prev.map(service => 
          service.id === serviceId ? { ...service, isActive: !currentStatus } : service
        ));
        alert(`Đã ${action} dịch vụ thành công!`);
      } catch (err) {
        console.error(`❌ Services: Error ${action} service:`, err);
        alert(`Có lỗi xảy ra khi ${action} dịch vụ`);
      }
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedServiceId(null);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingService(null);
  };



  const getServiceStatusClass = (isActive?: boolean): string => {
    return isActive ? 'status-active' : 'status-inactive';
  };

  const getServiceStatusText = (isActive?: boolean): string => {
    return isActive ? 'Đang hoạt động' : 'Tạm dừng';
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

  const filteredServices = services.filter(service => {
    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        service.name?.toLowerCase().includes(searchLower) ||
        service.description?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Filter by status
    if (filters.status && filters.status !== '') {
      const isActive = filters.status === 'active';
      if (service.isActive !== isActive) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Đang tải danh sách dịch vụ...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <button className="btn btn-primary" onClick={fetchServices}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Settings className="page-icon" />
            Quản lý dịch vụ
          </h1>
          <p className="page-subtitle">Quản lý các dịch vụ giặt là và định giá</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddService}>
          <Plus size={20} />
          Thêm dịch vụ
        </button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div>
            <h2 className="table-title">Danh sách dịch vụ</h2>
            <p className="table-subtitle">
              Tổng cộng {filteredServices.length} dịch vụ
              {services.filter(s => s.isActive).length > 0 && (
                <span className="ml-2">
                  • {services.filter(s => s.isActive).length} đang hoạt động
                </span>
              )}
            </p>
          </div>
          <ExportButton
            data={filteredServices}
            filename="services"
            title="Danh sách dịch vụ"
            buttonText="📥 Xuất dữ liệu"
          />
        </div>

        <div style={{ padding: '1.5rem' }}>
          <AdvancedFilter
            onFilterChange={setFilters}
            statusOptions={[
              { value: 'active', label: 'Đang hoạt động' },
              { value: 'inactive', label: 'Tạm dừng' }
            ]}
            showDateRange={false}
            showStatus={true}
            placeholder="Tìm kiếm theo tên dịch vụ hoặc mô tả..."
          />
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Thông tin dịch vụ</th>
                <th>Giá tiền</th>
                <th>Thời gian ước tính</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>
                        {service.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.4' }}>
                        {service.description || 'Chưa có mô tả'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        ID: {service.id}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {/* <Currency size={16} style={{ color: '#10b981' }} /> */}
                      <span style={{ fontWeight: '600', color: '#10b981', fontSize: '1rem' }}>
                        {formatCurrency(service.price)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} style={{ color: '#3b82f6' }} />
                      <span style={{ fontWeight: '500', color: '#3b82f6' }}>
                        {formatTime(service.estimatedTime)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getServiceStatusClass(service.isActive)}`}>
                      {getServiceStatusText(service.isActive)}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleViewService(service.id)}
                        title="Xem chi tiết"
                      >
                        <Eye style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEditService(service)}
                        title="Chỉnh sửa"
                      >
                        <Edit style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button 
                        className={`btn btn-sm ${service.isActive ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => handleToggleServiceStatus(service.id, service.isActive)}
                        title={service.isActive ? 'Tạm dừng dịch vụ' : 'Kích hoạt dịch vụ'}
                      >
                        {service.isActive ? '⏸️' : '▶️'}
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteService(service.id)}
                        title="Xóa dịch vụ"
                      >
                        <Trash2 style={{ width: '14px', height: '14px' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredServices.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            Không có dịch vụ nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        serviceId={selectedServiceId}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />

      {/* Service Form Modal */}
      <ServiceFormModal
        serviceId={editingService?.id}
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSuccess={() => {
          fetchServices();
          handleCloseFormModal();
        }}
      />
    </div>
  );
};

export default Services;