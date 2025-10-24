import React, { useEffect, useState } from 'react';
import { MapPin, Plus, Eye, Edit, Trash2, Phone, User, Building2 } from 'lucide-react';
import { BranchResponse } from '../types/api';
import { AdminApiService } from '../services/adminApiService';
import AdvancedFilter from './filters/AdvancedFilter';
import ExportButton from './ExportButton';
import BranchDetailModal from './modals/BranchDetailModal';
import BranchFormModal from './modals/BranchFormModal';

const Branches: React.FC = () => {
  const [branches, setBranches] = useState<BranchResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });
  
  // Modal states
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchResponse | null>(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🏢 Branches: Fetching branches data...');
      
      // Try to fetch real data from API
      try {
        const response = await AdminApiService.getBranches();
        console.log('🔍 Branches: API Response:', response);
        
        // Check if response has data array
        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
          console.log('✅ Branches: Successfully loaded real data:', response.data.length, 'branches');
          setBranches(response.data);
          return;
        } else if (Array.isArray(response) && response.length > 0) {
          // Sometimes API returns array directly
          console.log('✅ Branches: Successfully loaded real data (direct array):', response.length, 'branches');
          setBranches(response);
          return;
        } else {
          console.log('⚠️ Branches: API returned empty or invalid data');
        }
      } catch (err) {
        console.log('⚠️ Branches: Real API failed. Error:', err);
      }
      
      // Fallback to mock data
      const mockBranches: BranchResponse[] = [
        {
          id: 1,
          name: 'Chi nhánh Quận 1',
          address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',
          phone: '028 3829 1234',
          managerName: 'Nguyễn Văn Nam',
          isActive: true,
          createdAt: '2024-01-15T08:00:00Z'
        },
        {
          id: 2,
          name: 'Chi nhánh Quận 7',
          address: '456 Huỳnh Tấn Phát, Phường Tân Thuận Đông, Quận 7, TP.HCM',
          phone: '028 5412 5678',
          managerName: 'Trần Thị Lan',
          isActive: true,
          createdAt: '2024-02-20T09:30:00Z'
        },
        {
          id: 3,
          name: 'Chi nhánh Thủ Đức',
          address: '789 Võ Văn Ngân, Phường Linh Chiểu, TP. Thủ Đức, TP.HCM',
          phone: '028 3715 9012',
          managerName: 'Lê Minh Tuấn',
          isActive: true,
          createdAt: '2024-03-10T10:15:00Z'
        },
        {
          id: 4,
          name: 'Chi nhánh Bình Thạnh',
          address: '321 Xô Viết Nghệ Tĩnh, Phường 17, Quận Bình Thạnh, TP.HCM',
          phone: '028 3899 3456',
          managerName: 'Phạm Văn Hùng',
          isActive: false,
          createdAt: '2024-01-25T14:20:00Z'
        },
        {
          id: 5,
          name: 'Chi nhánh Gò Vấp',
          address: '654 Quang Trung, Phường 10, Quận Gò Vấp, TP.HCM',
          phone: '028 3984 7890',
          managerName: 'Hoàng Thị Mai',
          isActive: true,
          createdAt: '2024-04-05T11:45:00Z'
        },
        {
          id: 6,
          name: 'Chi nhánh Tân Bình',
          address: '987 Cộng Hòa, Phường 4, Quận Tân Bình, TP.HCM',
          phone: '028 3844 2468',
          managerName: 'Đặng Văn Thành',
          isActive: false,
          createdAt: '2024-02-14T16:30:00Z',
          deletedAt: '2024-11-15T10:00:00Z'
        }
      ];
      
      // Show empty state instead of mock data
      console.log('📭 Branches: No data available from API, showing empty state');
      setBranches([]);
      setError('Không có dữ liệu chi nhánh hoặc API chưa sẵn sàng');
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải danh sách chi nhánh');
      console.error('❌ Branches: Error fetching branches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewBranch = (branchId?: number) => {
    if (branchId) {
      setSelectedBranchId(branchId);
      setIsDetailModalOpen(true);
    }
  };

  const handleAddBranch = () => {
    setEditingBranch(null);
    setIsFormModalOpen(true);
  };

  const handleEditBranch = (branch: BranchResponse) => {
    setEditingBranch(branch);
    setIsFormModalOpen(true);
  };

  const handleDeleteBranch = async (branchId?: number) => {
    if (!branchId) return;
    
    if (globalThis.confirm('Bạn có chắc chắn muốn xóa chi nhánh này?')) {
      try {
        console.log('🗑️ Branches: Deleting branch:', branchId);
        // TODO: Implement delete branch API call
        // await AdminApiService.deleteBranch(branchId);
        
        // For now, just remove from local state
        setBranches(prev => prev.filter(branch => branch.id !== branchId));
        alert('Đã xóa chi nhánh thành công!');
        
      } catch (err) {
        alert('Có lỗi xảy ra khi xóa chi nhánh');
        console.error('❌ Branches: Error deleting branch:', err);
      }
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBranchId(null);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingBranch(null);
  };

  const getBranchStatusClass = (isActive?: boolean): string => {
    return isActive ? 'status-active' : 'status-inactive';
  };

  const getBranchStatusText = (isActive?: boolean): string => {
    return isActive ? 'Đang hoạt động' : 'Tạm đóng cửa';
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

  const truncateAddress = (address?: string, maxLength: number = 50): string => {
    if (!address) return '';
    return address.length > maxLength ? address.substring(0, maxLength) + '...' : address;
  };

  // Filter branches based on search criteria
  const filteredBranches = branches.filter(branch => {
    const matchesSearch = !filters.searchTerm || 
      branch.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      branch.address?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      branch.managerName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      branch.phone?.includes(filters.searchTerm);

    const matchesStatus = !filters.status || 
      (filters.status === 'active' && branch.isActive) ||
      (filters.status === 'inactive' && !branch.isActive);

    const matchesDateRange = (!filters.dateFrom && !filters.dateTo) ||
      (branch.createdAt && new Date(branch.createdAt) >= new Date(filters.dateFrom || '1900-01-01') &&
       new Date(branch.createdAt) <= new Date(filters.dateTo || '2100-12-31'));

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Export data formatting
  const exportData = filteredBranches.map(branch => ({
    ID: branch.id,
    'Tên Chi Nhánh': branch.name,
    'Địa Chỉ': branch.address,
    'Số Điện Thoại': branch.phone,
    'Người Quản Lý': branch.managerName,
    'Trạng Thái': getBranchStatusText(branch.isActive),
    'Ngày Tạo': branch.createdAt ? new Date(branch.createdAt).toLocaleDateString('vi-VN') : '',
    'Ngày Xóa': branch.deletedAt ? new Date(branch.deletedAt).toLocaleDateString('vi-VN') : ''
  }));

  const filterOptions = [
    {
      key: 'status',
      label: 'Trạng thái',
      type: 'select' as const,
      options: [
        { value: '', label: 'Tất cả' },
        { value: 'active', label: 'Đang hoạt động' },
        { value: 'inactive', label: 'Tạm đóng cửa' }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Đang tải danh sách chi nhánh...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={fetchBranches} className="btn btn-primary" style={{ marginTop: '1rem' }}>
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
            <MapPin size={28} />
            Quản lý Chi nhánh
          </h1>
          <p className="page-subtitle">
            Quản lý {branches.length} chi nhánh • {branches.filter(s => s.isActive).length > 0 && (
              <span style={{ color: '#10b981' }}>
                {branches.filter(s => s.isActive).length} đang hoạt động
              </span>
            )}
          </p>
        </div>
        <div className="page-actions">
          <ExportButton
            data={exportData}
            filename="branches"
            title="Xuất danh sách chi nhánh"
          />
          <button className="btn btn-primary" onClick={handleAddBranch}>
            <Plus size={20} />
            Thêm chi nhánh
          </button>
        </div>
      </div>

      <div className="filters-section">
        {/* AdvancedFilter props typed as any to avoid mismatched prop type error until component prop types are aligned */}
        <AdvancedFilter
          {...({
            filters,
            onFiltersChange: setFilters,
            searchPlaceholder: "Tìm kiếm theo tên, địa chỉ, người quản lý...",
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
                <th>Tên Chi nhánh</th>
                <th>Địa chỉ</th>
                <th>Liên hệ</th>
                <th>Người quản lý</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch) => (
                <tr key={branch.id} className={branch.deletedAt ? 'deleted-row' : ''}>
                  <td>
                    <span className="id-badge">{branch.id}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Building2 size={16} style={{ color: '#6b7280' }} />
                      <span style={{ fontWeight: '500' }}>{branch.name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={14} style={{ color: '#6b7280' }} />
                      <span title={branch.address}>
                        {truncateAddress(branch.address)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={14} style={{ color: '#6b7280' }} />
                      <span>{formatPhoneNumber(branch.phone)}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={14} style={{ color: '#6b7280' }} />
                      <span>{branch.managerName}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getBranchStatusClass(branch.isActive)}`}>
                      {getBranchStatusText(branch.isActive)}
                    </span>
                  </td>
                  <td>
                    {branch.createdAt ? new Date(branch.createdAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }) : ''}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-view"
                        onClick={() => handleViewBranch(branch.id)}
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-action btn-edit"
                        onClick={() => handleEditBranch(branch)}
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDeleteBranch(branch.id)}
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
        
        {filteredBranches.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            Không có chi nhánh nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* Branch Detail Modal */}
      <BranchDetailModal
        branchId={selectedBranchId}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />

      {/* Branch Form Modal */}
      <BranchFormModal
        branchId={editingBranch?.id}
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSuccess={() => {
          fetchBranches();
          handleCloseFormModal();
        }}
      />
    </div>
  );
};

export default Branches;