import React, { useState, useEffect } from 'react';
import { X, Plus, Save, AlertTriangle, Tag, Gift, Percent, Calendar } from 'lucide-react';
import { PromotionResponse } from '../../types/api';

interface PromotionFormModalProps {
  promotionId?: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface PromotionForm {
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const PromotionFormModal: React.FC<PromotionFormModalProps> = ({
  promotionId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [form, setForm] = useState<PromotionForm>({
    code: '',
    description: '',
    discountType: 'PERCENTAGE',
    discountValue: 0,
    startDate: '',
    endDate: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = Boolean(promotionId);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && promotionId) {
        fetchPromotionDetail();
      } else {
        resetForm();
      }
    }
  }, [isOpen, promotionId, isEdit]);

  const resetForm = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    setForm({
      code: '',
      description: '',
      discountType: 'PERCENTAGE',
      discountValue: 0,
      startDate: tomorrow.toISOString().split('T')[0],
      endDate: nextMonth.toISOString().split('T')[0],
      isActive: true
    });
    setErrors({});
    setError(null);
  };

  const fetchPromotionDetail = async () => {
    if (!promotionId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎁 PromotionForm: Fetching promotion for edit, ID:', promotionId);
      
      // Mock promotion data (replace with actual API call)
      const mockPromotion: PromotionResponse = {
        id: promotionId,
        code: `PROMO${promotionId}`,
        description: `Mô tả chi tiết cho chương trình khuyến mãi ${promotionId}`,
        discountType: Math.random() > 0.5 ? 'PERCENTAGE' : 'FIXED',
        discountValue: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 10 : (Math.floor(Math.random() * 5) + 1) * 10000,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: Math.random() > 0.3
      };
      
      setForm({
        code: mockPromotion.code || '',
        description: mockPromotion.description || '',
        discountType: (mockPromotion.discountType as 'PERCENTAGE' | 'FIXED') || 'PERCENTAGE',
        discountValue: mockPromotion.discountValue || 0,
        startDate: mockPromotion.startDate ? mockPromotion.startDate.split('T')[0] : '',
        endDate: mockPromotion.endDate ? mockPromotion.endDate.split('T')[0] : '',
        isActive: mockPromotion.isActive ?? true
      });
      
      console.log('✅ PromotionForm: Loaded promotion data:', mockPromotion);
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu khuyến mãi');
      console.error('❌ PromotionForm: Error fetching promotion:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Code validation
    if (!form.code.trim()) {
      newErrors.code = 'Mã khuyến mãi không được để trống';
    } else if (form.code.length < 3) {
      newErrors.code = 'Mã khuyến mãi phải có ít nhất 3 ký tự';
    } else if (form.code.length > 20) {
      newErrors.code = 'Mã khuyến mãi không được vượt quá 20 ký tự';
    } else if (!/^[A-Z0-9]+$/.test(form.code)) {
      newErrors.code = 'Mã khuyến mãi chỉ được chứa chữ cái in hoa và số';
    }

    // Description validation
    if (!form.description.trim()) {
      newErrors.description = 'Mô tả không được để trống';
    } else if (form.description.length < 10) {
      newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
    } else if (form.description.length > 200) {
      newErrors.description = 'Mô tả không được vượt quá 200 ký tự';
    }

    // Discount value validation
    if (!form.discountValue || form.discountValue <= 0) {
      newErrors.discountValue = 'Giá trị giảm giá phải lớn hơn 0';
    } else if (form.discountType === 'PERCENTAGE') {
      if (form.discountValue > 100) {
        newErrors.discountValue = 'Phần trăm giảm giá không được vượt quá 100%';
      }
    } else if (form.discountType === 'FIXED') {
      if (form.discountValue > 10000000) {
        newErrors.discountValue = 'Số tiền giảm không được vượt quá 10.000.000 VND';
      }
    }

    // Date validation
    if (!form.startDate) {
      newErrors.startDate = 'Ngày bắt đầu không được để trống';
    }
    
    if (!form.endDate) {
      newErrors.endDate = 'Ngày kết thúc không được để trống';
    }

    if (form.startDate && form.endDate) {
      const startDate = new Date(form.startDate);
      const endDate = new Date(form.endDate);
      
      if (startDate >= endDate) {
        newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
      }

      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      if (!isEdit && startDate < now) {
        newErrors.startDate = 'Ngày bắt đầu không được trong quá khứ';
      }
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
      
      // Format data before submission
      const submitData = {
        ...form,
        code: form.code.trim().toUpperCase(),
        description: form.description.trim(),
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString()
      };
      
      console.log(`🎁 PromotionForm: ${isEdit ? 'Updating' : 'Creating'} promotion:`, submitData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`✅ PromotionForm: Successfully ${isEdit ? 'updated' : 'created'} promotion`);
      
      onSuccess();
      onClose();
      
    } catch (err) {
      setError(`Có lỗi xảy ra khi ${isEdit ? 'cập nhật' : 'tạo'} khuyến mãi`);
      console.error(`❌ PromotionForm: Error ${isEdit ? 'updating' : 'creating'} promotion:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue: any = value;
    
    // Process specific fields
    if (name === 'code') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    } else if (name === 'discountValue') {
      processedValue = parseFloat(value) || 0;
    } else if (type === 'checkbox') {
      processedValue = checked;
    }
    
    setForm(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatDiscountPreview = (): string => {
    if (!form.discountValue) return '';
    
    if (form.discountType === 'PERCENTAGE') {
      return `Giảm ${form.discountValue}%`;
    } else {
      return `Giảm ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(form.discountValue)}`;
    }
  };

  const getDurationText = (): string => {
    if (!form.startDate || !form.endDate) return '';
    
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 ngày';
    if (diffDays < 7) return `${diffDays} ngày`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần`;
    return `${Math.floor(diffDays / 30)} tháng`;
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
            <h2 className="modal-title">
              {isEdit ? 'Chỉnh sửa khuyến mãi' : 'Tạo khuyến mãi mới'}
            </h2>
            <p className="modal-subtitle">
              {isEdit ? 'Cập nhật thông tin khuyến mãi' : 'Điền thông tin cho chương trình khuyến mãi mới'}
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
                {/* Promotion Code */}
                <div className="form-group">
                  <label htmlFor="code" className="form-label">
                    <Tag size={16} />
                    Mã khuyến mãi *
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={form.code}
                    onChange={handleInputChange}
                    className={`form-input ${errors.code ? 'error' : ''}`}
                    placeholder="Nhập mã khuyến mãi (VD: WELCOME20)..."
                    maxLength={20}
                    style={{ fontFamily: 'monospace', fontWeight: '600' }}
                  />
                  <div className="form-help">
                    Chỉ chữ cái in hoa và số, 3-20 ký tự
                  </div>
                  {errors.code && (
                    <span className="error-text">{errors.code}</span>
                  )}
                </div>

                {/* Description */}
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    <Gift size={16} />
                    Mô tả chương trình *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    className={`form-input ${errors.description ? 'error' : ''}`}
                    placeholder="Nhập mô tả chi tiết về chương trình khuyến mãi..."
                    rows={3}
                    maxLength={200}
                  />
                  <div className="form-help">
                    {form.description.length}/200 ký tự
                  </div>
                  {errors.description && (
                    <span className="error-text">{errors.description}</span>
                  )}
                </div>

                {/* Discount Type and Value */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="discountType" className="form-label">
                      <Percent size={16} />
                      Loại giảm giá *
                    </label>
                    <select
                      id="discountType"
                      name="discountType"
                      value={form.discountType}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="PERCENTAGE">Phần trăm (%)</option>
                      <option value="FIXED">Cố định (VND)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="discountValue" className="form-label">
                      Giá trị giảm *
                    </label>
                    <input
                      type="number"
                      id="discountValue"
                      name="discountValue"
                      value={form.discountValue}
                      onChange={handleInputChange}
                      className={`form-input ${errors.discountValue ? 'error' : ''}`}
                      placeholder={form.discountType === 'PERCENTAGE' ? 'VD: 20' : 'VD: 50000'}
                      min="1"
                      max={form.discountType === 'PERCENTAGE' ? 100 : 10000000}
                      step={form.discountType === 'PERCENTAGE' ? 1 : 1000}
                    />
                    {form.discountValue > 0 && (
                      <div className="form-help" style={{ fontWeight: '600', color: '#059669' }}>
                        {formatDiscountPreview()}
                      </div>
                    )}
                    {errors.discountValue && (
                      <span className="error-text">{errors.discountValue}</span>
                    )}
                  </div>
                </div>

                {/* Start and End Date */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="startDate" className="form-label">
                      <Calendar size={16} />
                      Ngày bắt đầu *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleInputChange}
                      className={`form-input ${errors.startDate ? 'error' : ''}`}
                    />
                    {errors.startDate && (
                      <span className="error-text">{errors.startDate}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate" className="form-label">
                      <Calendar size={16} />
                      Ngày kết thúc *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleInputChange}
                      className={`form-input ${errors.endDate ? 'error' : ''}`}
                    />
                    {form.startDate && form.endDate && (
                      <div className="form-help">
                        Thời gian: {getDurationText()}
                      </div>
                    )}
                    {errors.endDate && (
                      <span className="error-text">{errors.endDate}</span>
                    )}
                  </div>
                </div>

                {/* Active Status */}
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
                      Kích hoạt khuyến mãi
                    </span>
                  </label>
                  <div className="form-help">
                    Khuyến mãi sẽ {form.isActive ? 'có thể được sử dụng' : 'tạm thời không khả dụng'}
                  </div>
                </div>

                {/* Preview */}
                {form.code && form.description && form.discountValue > 0 && (
                  <div style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginTop: '1rem'
                  }}>
                    <h4 style={{ 
                      margin: '0 0 0.75rem 0', 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151' 
                    }}>
                      Xem trước khuyến mãi
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      backgroundColor: 'white',
                      borderRadius: '0.375rem',
                      border: '1px solid #d1d5db'
                    }}>
                      <div style={{
                        fontFamily: 'monospace',
                        fontWeight: '700',
                        fontSize: '1rem',
                        color: '#059669',
                        backgroundColor: '#f0fdf4',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '0.25rem'
                      }}>
                        {form.code}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                          {formatDiscountPreview()}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {form.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

export default PromotionFormModal;