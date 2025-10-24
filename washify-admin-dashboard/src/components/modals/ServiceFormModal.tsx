import React, { useState, useEffect } from 'react';
import { X, Plus, Save, AlertTriangle } from 'lucide-react';
import { ServiceResponse } from '../../types/api';

interface ServiceFormModalProps {
  serviceId?: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ServiceForm {
  name: string;
  description: string;
  price: number;
  estimatedTime: number;
  isActive: boolean;
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  serviceId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [form, setForm] = useState<ServiceForm>({
    name: '',
    description: '',
    price: 0,
    estimatedTime: 30,
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = Boolean(serviceId);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && serviceId) {
        fetchServiceDetail();
      } else {
        resetForm();
      }
    }
  }, [isOpen, serviceId, isEdit]);

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      price: 0,
      estimatedTime: 30,
      isActive: true
    });
    setErrors({});
    setError(null);
  };

  const fetchServiceDetail = async () => {
    if (!serviceId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('🛍️ ServiceForm: Fetching service for edit, ID:', serviceId);
      
      // Mock service data (replace with actual API call)
      const mockService: ServiceResponse = {
        id: serviceId,
        name: `Dịch vụ ${serviceId}`,
        description: `Mô tả chi tiết cho dịch vụ ${serviceId}. Đây là dịch vụ chất lượng cao với quy trình xử lý chuyên nghiệp.`,
        price: Math.floor(Math.random() * 100000) + 20000,
        estimatedTime: Math.floor(Math.random() * 240) + 30,
        isActive: Math.random() > 0.3
      };
      
      setForm({
        name: mockService.name || '',
        description: mockService.description || '',
        price: mockService.price || 0,
        estimatedTime: mockService.estimatedTime || 30,
        isActive: mockService.isActive ?? true
      });
      
      console.log('✅ ServiceForm: Loaded service data:', mockService);
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu dịch vụ');
      console.error('❌ ServiceForm: Error fetching service:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = 'Tên dịch vụ không được để trống';
    } else if (form.name.length < 3) {
      newErrors.name = 'Tên dịch vụ phải có ít nhất 3 ký tự';
    } else if (form.name.length > 100) {
      newErrors.name = 'Tên dịch vụ không được vượt quá 100 ký tự';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Mô tả không được để trống';
    } else if (form.description.length < 10) {
      newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
    } else if (form.description.length > 500) {
      newErrors.description = 'Mô tả không được vượt quá 500 ký tự';
    }

    if (!form.price || form.price <= 0) {
      newErrors.price = 'Giá dịch vụ phải lớn hơn 0';
    } else if (form.price > 10000000) {
      newErrors.price = 'Giá dịch vụ không được vượt quá 10.000.000 VND';
    }

    if (!form.estimatedTime || form.estimatedTime <= 0) {
      newErrors.estimatedTime = 'Thời gian ước tính phải lớn hơn 0';
    } else if (form.estimatedTime > 1440) { // 24 hours
      newErrors.estimatedTime = 'Thời gian ước tính không được vượt quá 1440 phút (24 giờ)';
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
      
      console.log(`🛍️ ServiceForm: ${isEdit ? 'Updating' : 'Creating'} service:`, form);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`✅ ServiceForm: Successfully ${isEdit ? 'updated' : 'created'} service`);
      
      onSuccess();
      onClose();
      
    } catch (err) {
      setError(`Có lỗi xảy ra khi ${isEdit ? 'cập nhật' : 'tạo'} dịch vụ`);
      console.error(`❌ ServiceForm: Error ${isEdit ? 'updating' : 'creating'} service:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
              type === 'number' ? parseFloat(value) || 0 :
              value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} phút`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours} giờ`;
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
              {isEdit ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
            </h2>
            <p className="modal-subtitle">
              {isEdit ? 'Cập nhật thông tin dịch vụ' : 'Điền thông tin cho dịch vụ mới'}
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
                {/* Service Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Tên dịch vụ *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Nhập tên dịch vụ..."
                    maxLength={100}
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>

                {/* Service Description */}
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Mô tả dịch vụ *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    className={`form-input ${errors.description ? 'error' : ''}`}
                    placeholder="Nhập mô tả chi tiết về dịch vụ..."
                    rows={4}
                    maxLength={500}
                  />
                  <div className="form-help">
                    {form.description.length}/500 ký tự
                  </div>
                  {errors.description && (
                    <span className="error-text">{errors.description}</span>
                  )}
                </div>

                {/* Price and Time Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Service Price */}
                  <div className="form-group">
                    <label htmlFor="price" className="form-label">
                      Giá dịch vụ (VND) *
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={form.price}
                      onChange={handleInputChange}
                      className={`form-input ${errors.price ? 'error' : ''}`}
                      placeholder="0"
                      min="0"
                      max="10000000"
                      step="1000"
                    />
                    {form.price > 0 && (
                      <div className="form-help">
                        {formatCurrency(form.price)}
                      </div>
                    )}
                    {errors.price && (
                      <span className="error-text">{errors.price}</span>
                    )}
                  </div>

                  {/* Estimated Time */}
                  <div className="form-group">
                    <label htmlFor="estimatedTime" className="form-label">
                      Thời gian ước tính (phút) *
                    </label>
                    <input
                      type="number"
                      id="estimatedTime"
                      name="estimatedTime"
                      value={form.estimatedTime}
                      onChange={handleInputChange}
                      className={`form-input ${errors.estimatedTime ? 'error' : ''}`}
                      placeholder="30"
                      min="1"
                      max="1440"
                      step="15"
                    />
                    {form.estimatedTime > 0 && (
                      <div className="form-help">
                        {formatTime(form.estimatedTime)}
                      </div>
                    )}
                    {errors.estimatedTime && (
                      <span className="error-text">{errors.estimatedTime}</span>
                    )}
                  </div>
                </div>

                {/* Service Status */}
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
                      Kích hoạt dịch vụ
                    </span>
                  </label>
                  <div className="form-help">
                    Dịch vụ sẽ {form.isActive ? 'có sẵn' : 'không có sẵn'} cho khách hàng
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

export default ServiceFormModal;