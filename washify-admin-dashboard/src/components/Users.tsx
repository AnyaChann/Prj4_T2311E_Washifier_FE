import React, { useEffect, useState } from 'react';
import { User, Plus, Eye, Edit, Trash2, Lock, Unlock } from 'lucide-react';
import { UserResponse } from '../types/api';
import { AdminApiService } from '../services/adminApiService';
import AdvancedFilter from './filters/AdvancedFilter';
import ExportButton from './ExportButton';
import UserDetailModal from './modals/UserDetailModal';
import UserFormModal from './modals/UserFormModal';

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });
  
  // Modal states
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📋 Users: Fetching users data...');
      const response = await AdminApiService.getUsers();
      
      if (response?.data) {
        console.log('✅ Users: Got users data:', response.data.length, 'users');
        setUsers(response.data);
      } else {
        console.warn('⚠️ Users: No users data received');
        setUsers([]);
      }
    } catch (err) {
      setError('Không thể tải danh sách người dùng');
      console.error('❌ Users: Error fetching users:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (userId?: number) => {
    if (userId) {
      setSelectedUserId(userId);
      setIsDetailModalOpen(true);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };

  const handleEditUser = (user: UserResponse) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const handleDeleteUser = async (userId?: number) => {
    if (!userId) return;
    
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        console.log('🗑️ Users: Deleting user:', userId);
        // TODO: Implement delete user API call
        // await AdminApiService.deleteUser(userId);
        
        // For now, just remove from local state
        setUsers(prev => prev.filter(user => user.id !== userId));
        alert('Đã xóa người dùng thành công!');
      } catch (err) {
        console.error('❌ Users: Error deleting user:', err);
        alert('Có lỗi xảy ra khi xóa người dùng');
      }
    }
  };

  const handleToggleUserStatus = async (userId?: number, currentStatus?: boolean) => {
    if (!userId) return;
    
    const action = currentStatus ? 'khóa' : 'mở khóa';
    if (window.confirm(`Bạn có chắc chắn muốn ${action} tài khoản này?`)) {
      try {
        console.log(`🔐 Users: ${action} user:`, userId);
        // TODO: Implement toggle user status API call
        // await AdminApiService.toggleUserStatus(userId, !currentStatus);
        
        // For now, just update local state
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, isActive: !currentStatus } : user
        ));
        alert(`Đã ${action} tài khoản thành công!`);
      } catch (err) {
        console.error(`❌ Users: Error ${action} user:`, err);
        alert(`Có lỗi xảy ra khi ${action} tài khoản`);
      }
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedUserId(null);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingUser(null);
  };

  const handleUserSave = (savedUser: UserResponse) => {
    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === savedUser.id ? savedUser : user
      ));
    } else {
      // Add new user
      setUsers(prev => [savedUser, ...prev]);
    }
    handleCloseFormModal();
  };

  const getUserStatusClass = (isActive?: boolean): string => {
    return isActive ? 'status-active' : 'status-inactive';
  };

  const getUserStatusText = (isActive?: boolean): string => {
    return isActive ? 'Hoạt động' : 'Bị khóa';
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

  const filteredUsers = users.filter(user => {
    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        user.username?.toLowerCase().includes(searchLower) ||
        user.fullName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.phone?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Filter by status
    if (filters.status && filters.status !== '') {
      const isActive = filters.status === 'active';
      if (user.isActive !== isActive) return false;
    }

    // Filter by date range
    if (filters.dateFrom) {
      const userDate = new Date(user.createdAt || '');
      const fromDate = new Date(filters.dateFrom);
      if (userDate < fromDate) return false;
    }

    if (filters.dateTo) {
      const userDate = new Date(user.createdAt || '');
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      if (userDate > toDate) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Đang tải danh sách người dùng...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
        <button className="btn btn-primary" onClick={fetchUsers}>
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
            <User className="page-icon" />
            Quản lý người dùng
          </h1>
          <p className="page-subtitle">Quản lý thông tin và tài khoản người dùng</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddUser}>
          <Plus size={20} />
          Thêm người dùng
        </button>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div>
            <h2 className="table-title">Danh sách người dùng</h2>
            <p className="table-subtitle">
              Tổng cộng {filteredUsers.length} người dùng
              {users.filter(u => u.isActive).length > 0 && (
                <span className="ml-2">
                  • {users.filter(u => u.isActive).length} hoạt động
                </span>
              )}
            </p>
          </div>
          <ExportButton
            data={filteredUsers}
            filename="users"
            title="Danh sách người dùng"
            buttonText="📥 Xuất dữ liệu"
          />
        </div>

        <div style={{ padding: '1.5rem' }}>
          <AdvancedFilter
            onFilterChange={setFilters}
            statusOptions={[
              { value: 'active', label: 'Hoạt động' },
              { value: 'inactive', label: 'Bị khóa' }
            ]}
            showDateRange={true}
            showStatus={true}
            placeholder="Tìm kiếm theo tên đăng nhập, họ tên, email hoặc số điện thoại..."
          />
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Thông tin cơ bản</th>
                <th>Liên hệ</th>
                <th>Chi nhánh</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>
                        {user.fullName || user.username}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                        @{user.username}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        ID: {user.id}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <div style={{ fontSize: '0.875rem' }}>
                        {user.email || '-'}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                        {user.phone || '-'}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.875rem' }}>
                      {user.branchName || '-'}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {user.roles && user.roles.size > 0 ? (
                        Array.from(user.roles).map((role) => (
                          <span key={role} className="role-badge">
                            {role}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          Chưa có vai trò
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getUserStatusClass(user.isActive)}`}>
                      {getUserStatusText(user.isActive)}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.875rem' }}>
                    {formatDate(user.createdAt)}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleViewUser(user.id)}
                        title="Xem chi tiết"
                      >
                        <Eye style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEditUser(user)}
                        title="Chỉnh sửa"
                      >
                        <Edit style={{ width: '14px', height: '14px' }} />
                      </button>
                      <button 
                        className={`btn btn-sm ${user.isActive ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                        title={user.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                      >
                        {user.isActive ? (
                          <Lock style={{ width: '14px', height: '14px' }} />
                        ) : (
                          <Unlock style={{ width: '14px', height: '14px' }} />
                        )}
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Xóa người dùng"
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
        
        {filteredUsers.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            Không có người dùng nào phù hợp với bộ lọc
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      <UserDetailModal
        userId={selectedUserId}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />

      {/* User Form Modal */}
      <UserFormModal
        user={editingUser}
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleUserSave}
      />
    </div>
  );
};

export default Users;