import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { UserResponse } from '../../types/api';

interface UserFormModalProps {
  user: UserResponse | null; // null for new user, UserResponse for editing
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: UserResponse) => void;
}

interface UserFormData {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  branchId: number | '';
  isActive: boolean;
  roles: string[];
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    branchId: '',
    isActive: true,
    roles: ['USER']
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const availableRoles = [
    { value: 'USER', label: 'Người dùng' },
    { value: 'ADMIN', label: 'Quản trị viên' },
    { value: 'STAFF', label: 'Nhân viên' },
    { value: 'MANAGER', label: 'Quản lý' }
  ];

  const branches = [
    { id: 1, name: 'Chi nhánh 1' },
    { id: 2, name: 'Chi nhánh 2' },
    { id: 3, name: 'Chi nhánh 3' },
    { id: 4, name: 'Chi nhánh 4' },
    { id: 5, name: 'Chi nhánh 5' }
  ];

  useEffect(() => {
    if (isOpen) {
      if (user) {
        // Editing existing user
        setFormData({
          username: user.username || '',
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          branchId: user.branchId || '',
          isActive: user.isActive ?? true,
          roles: user.roles ? Array.from(user.roles) : ['USER']
        });
      } else {
        // Adding new user
        setFormData({
          username: '',
          fullName: '',
          email: '',
          phone: '',
          address: '',
          branchId: '',
          isActive: true,
          roles: ['USER']
        });
      }
      setErrors({});
    }
  }, [isOpen, user]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Tên đăng nhập là bắt buộc';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    } else if (!/^\w+$/.test(formData.username)) {
      newErrors.username = 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên là bắt buộc';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (formData.branchId === '') {
      newErrors.branchId = 'Vui lòng chọn chi nhánh';
    }

    if (formData.roles.length === 0) {
      newErrors.roles = 'Vui lòng chọn ít nhất một vai trò';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const savedUser: UserResponse = {
        id: user?.id || Math.floor(Math.random() * 1000000),
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        branchId: formData.branchId as number,
        branchName: branches.find(b => b.id === formData.branchId)?.name,
        isActive: formData.isActive,
        roles: new Set(formData.roles),
        createdAt: user?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      onSave(savedUser);
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Có lỗi xảy ra khi lưu thông tin người dùng');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRoleChange = (role: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      roles: checked 
        ? [...prev.roles, role]
        : prev.roles.filter(r => r !== role)
    }));
    // Clear role errors
    if (errors.roles) {
      setErrors(prev => ({ ...prev, roles: '' }));
    }
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
            <h2 className="modal-title">
              {user ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
            </h2>
            <p className="modal-subtitle">
              {user ? `Cập nhật thông tin cho @${user.username}` : 'Tạo tài khoản người dùng mới'}
            </p>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Left Column */}
              <div>
                {/* Username */}
                <div className="form-group">
                  <label htmlFor="username" className="form-label required">
                    Tên đăng nhập
                  </label>
                  <input
                    id="username"
                    type="text"
                    className={`form-input ${errors.username ? 'error' : ''}`}
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    disabled={!!user} // Disable when editing
                  />
                  {errors.username && (
                    <span className="form-error">{errors.username}</span>
                  )}
                </div>

                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label required">
                    Họ và tên
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Nhập họ và tên đầy đủ"
                  />
                  {errors.fullName && (
                    <span className="form-error">{errors.fullName}</span>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Nhập địa chỉ email"
                  />
                  {errors.email && (
                    <span className="form-error">{errors.email}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.phone && (
                    <span className="form-error">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Address */}
                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Địa chỉ
                  </label>
                  <textarea
                    id="address"
                    className="form-input"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Nhập địa chỉ"
                    rows={3}
                  />
                </div>

                {/* Branch */}
                <div className="form-group">
                  <label htmlFor="branchId" className="form-label required">
                    Chi nhánh
                  </label>
                  <select
                    id="branchId"
                    className={`form-input ${errors.branchId ? 'error' : ''}`}
                    value={formData.branchId}
                    onChange={(e) => handleInputChange('branchId', Number(e.target.value))}
                  >
                    <option value="">Chọn chi nhánh</option>
                    {branches.map(branch => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                  {errors.branchId && (
                    <span className="form-error">{errors.branchId}</span>
                  )}
                </div>

                {/* Roles */}
                <div className="form-group">
                  <span className="form-label required">Vai trò</span>
                  <div className="checkbox-group">
                    {availableRoles.map(role => (
                      <label key={role.value} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.roles.includes(role.value)}
                          onChange={(e) => handleRoleChange(role.value, e.target.checked)}
                        />
                        <span className="checkbox-label">{role.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.roles && (
                    <span className="form-error">{errors.roles}</span>
                  )}
                </div>

                {/* Status */}
                <div className="form-group">
                  <label className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    />
                    <span className="checkbox-label">Tài khoản hoạt động</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={16} />
              {saving ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;