import React, { useState, useEffect } from 'react';
import { X, Plus, Save, AlertTriangle } from 'lucide-react';
import { BranchResponse } from '../../types/api';

interface BranchFormModalProps {
  branchId?: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface BranchForm {
  name: string;
  address: string;
  phone: string;
  managerName: string;
  isActive: boolean;
}

const BranchFormModal: React.FC<BranchFormModalProps> = ({
  branchId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [form, setForm] = useState<BranchForm>({
    name: '',
    address: '',
    phone: '',
    managerName: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = Boolean(branchId);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && branchId) {
        fetchBranchDetail();
      } else {
        resetForm();
      }
    }
  }, [isOpen, branchId, isEdit]);

  const resetForm = () => {
    setForm({
      name: '',
      address: '',
      phone: '',
      managerName: '',
      isActive: true
    });
    setErrors({});
    setError(null);
  };

  const fetchBranchDetail = async () => {
    if (!branchId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('🏢 BranchForm: Fetching branch for edit, ID:', branchId);
      
      // Mock branch data (replace with actual API call)
      const mockBranch: BranchResponse = {
        id: branchId,
        name: `Chi nhánh ${branchId}`,
        address: `Địa chỉ chi nhánh ${branchId}`,
        phone: `028 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
        managerName: `Quản lý ${branchId}`,
        isActive: Math.random() > 0.3
      };
      
      setForm({
        name: mockBranch.name || '',
        address: mockBranch.address || '',
        phone: mockBranch.phone || '',
        managerName: mockBranch.managerName || '',
        isActive: mockBranch.isActive ?? true
      });
      
      console.log('✅ BranchForm: Loaded branch data:', mockBranch);
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu chi nhánh');
      console.error('❌ BranchForm: Error fetching branch:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Branch name validation
    if (!form.name.trim()) {
      newErrors.name = 'Tên chi nhánh không được để trống';
    } else if (form.name.length < 3) {
      newErrors.name = 'Tên chi nhánh phải có ít nhất 3 ký tự';
    } else if (form.name.length > 100) {
      newErrors.name = 'Tên chi nhánh không được vượt quá 100 ký tự';
    }

    // Address validation
    if (!form.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống';
    } else if (form.address.length < 10) {
      newErrors.address = 'Địa chỉ phải có ít nhất 10 ký tự';
    } else if (form.address.length > 200) {
      newErrors.address = 'Địa chỉ không được vượt quá 200 ký tự';
    }

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else {
      const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
      const cleanPhone = form.phone.replace(/\s/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phone = 'Số điện thoại không hợp lệ (VD: 0123456789 hoặc +84123456789)';
      }
    }

    // Manager name validation
    if (!form.managerName.trim()) {
      newErrors.managerName = 'Tên người quản lý không được để trống';
    } else if (form.managerName.length < 2) {
      newErrors.managerName = 'Tên người quản lý phải có ít nhất 2 ký tự';
    } else if (form.managerName.length > 50) {
      newErrors.managerName = 'Tên người quản lý không được vượt quá 50 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`🏢 BranchForm: ${isEdit ? 'Updating' : 'Creating'} branch:`, form);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`✅ BranchForm: Successfully ${isEdit ? 'updated' : 'created'} branch`);
      
      onSuccess();
      onClose();
      
    } catch (err) {
      setError(`Có lỗi xảy ra khi ${isEdit ? 'cập nhật' : 'tạo'} chi nhánh`);
      console.error(`❌ BranchForm: Error ${isEdit ? 'updating' : 'creating'} branch:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let newValue: string | boolean;
    if (type === 'checkbox') {
      newValue = checked;
    } else {
      newValue = value;
    }
    
    setForm(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    } else if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
    }
    return phone;
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
              {isEdit ? 'Chỉnh sửa chi nhánh' : 'Thêm chi nhánh mới'}
            </h2>
            <p className="modal-subtitle">
              {isEdit ? 'Cập nhật thông tin chi nhánh' : 'Điền thông tin cho chi nhánh mới'}
            </p>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {loading && (
              <div className="loading">
                <div className="loading-spinner"></div>
                {isEdit ? 'Đang tải dữ liệu...' : 'Đang xử lý...'}
              </div>
            )}

            {error && (
              <div className="error-message">
                <AlertTriangle size={20} />
                {error}
              </div>
            )}

            {!loading && (
              <div className="form-grid">
                {/* Branch Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Tên chi nhánh *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Nhập tên chi nhánh..."
                    maxLength={100}
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>

                {/* Address */}
                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Địa chỉ *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    placeholder="Nhập địa chỉ chi tiết của chi nhánh..."
                    rows={3}
                    maxLength={200}
                  />
                  <div className="form-help">
                    {form.address.length}/200 ký tự
                  </div>
                  {errors.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                </div>

                {/* Phone and Manager Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Phone Number */}
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="0123456789"
                    />
                    {form.phone && (
                      <div className="form-help">
                        {formatPhoneNumber(form.phone)}
                      </div>
                    )}
                    {errors.phone && (
                      <span className="error-text">{errors.phone}</span>
                    )}
                  </div>

                  {/* Manager Name */}
                  <div className="form-group">
                    <label htmlFor="managerName" className="form-label">
                      Người quản lý *
                    </label>
                    <input
                      type="text"
                      id="managerName"
                      name="managerName"
                      value={form.managerName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.managerName ? 'error' : ''}`}
                      placeholder="Họ và tên người quản lý"
                      maxLength={50}
                    />
                    {errors.managerName && (
                      <span className="error-text">{errors.managerName}</span>
                    )}
                  </div>
                </div>

                {/* Branch Status */}
                <div className="form-group">
                  <label className="checkbox-group">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={form.isActive}
                      onChange={handleInputChange}
                      className="form-checkbox"
                    />
                    <span className="checkbox-label">
                      Kích hoạt chi nhánh
                    </span>
                  </label>
                  <div className="form-help">
                    Chi nhánh sẽ {form.isActive ? 'có thể tiếp nhận' : 'không tiếp nhận'} đơn hàng mới
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner small"></div>
                  {isEdit ? 'Đang cập nhật...' : 'Đang tạo...'}
                </>
              ) : (
                <>
                  {isEdit ? <Save size={20} /> : <Plus size={20} />}
                  {isEdit ? 'Cập nhật' : 'Tạo mới'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchFormModal;