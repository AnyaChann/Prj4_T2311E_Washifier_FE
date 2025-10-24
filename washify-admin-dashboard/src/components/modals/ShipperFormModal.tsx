import React, { useState, useEffect } from 'react';
import { X, Plus, Save, AlertTriangle, User, Phone, Car } from 'lucide-react';
import { ShipperResponse } from '../../types/api';
import { AdminApiService } from '../../services/adminApiService';

interface ShipperFormModalProps {
  shipperId?: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ShipperForm {
  name: string;
  phone: string;
  vehicleNumber: string;
  isActive: boolean;
}

const ShipperFormModal: React.FC<ShipperFormModalProps> = ({
  shipperId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [form, setForm] = useState<ShipperForm>({
    name: '',
    phone: '',
    vehicleNumber: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = Boolean(shipperId);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && shipperId) {
        fetchShipperDetail();
      } else {
        resetForm();
      }
    }
  }, [isOpen, shipperId, isEdit]);

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      vehicleNumber: '',
      isActive: true
    });
    setErrors({});
    setError(null);
  };

  const fetchShipperDetail = async () => {
    if (!shipperId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚚 ShipperForm: Fetching shipper for edit, ID:', shipperId);
      
      // Try to fetch real data from API
      const response = await AdminApiService.getShipperById(shipperId);
      console.log('🚚 ShipperForm: API Response:', response);
      
      let shipperData: ShipperResponse | null = null;
      if (response?.data) {
        shipperData = response.data;
      } else if (response && !response.data) {
        // Sometimes API returns shipper directly
        shipperData = response;
      }

      if (shipperData) {
        setForm({
          name: shipperData.name || '',
          phone: shipperData.phone || '',
          vehicleNumber: shipperData.vehicleNumber || '',
          isActive: shipperData.isActive ?? true
        });
        console.log('✅ ShipperForm: Loaded real shipper data:', shipperData);
      }
      
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu shipper');
      console.error('❌ ShipperForm: Error fetching shipper:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Họ tên không được để trống';
    } else if (form.name.length < 2) {
      newErrors.name = 'Họ tên phải có ít nhất 2 ký tự';
    } else if (form.name.length > 50) {
      newErrors.name = 'Họ tên không được vượt quá 50 ký tự';
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(form.name)) {
      newErrors.name = 'Họ tên chỉ được chứa chữ cái và khoảng trắng';
    }

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else {
      const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
      if (!phoneRegex.test(form.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Số điện thoại không đúng định dạng (VD: 0912345678)';
      }
    }

    // Vehicle number validation
    if (!form.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Biển số xe không được để trống';
    } else {
      // Vietnamese license plate format: 12A1-12345 or 12AB-12345
      const vehicleRegex = /^\d{2}[A-Z]{1,2}[1-9]-\d{4,5}$/;
      const cleanVehicleNumber = form.vehicleNumber.replace(/\s/g, '').toUpperCase();
      if (!vehicleRegex.test(cleanVehicleNumber)) {
        newErrors.vehicleNumber = 'Biển số xe không đúng định dạng (VD: 29H1-12345)';
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
      
      // Clean and format data before submission
      const submitData = {
        fullName: form.name.trim(),
        phoneNumber: form.phone.replace(/\s/g, ''),
        vehicleNumber: form.vehicleNumber.replace(/\s/g, '').toUpperCase(),
        isActive: form.isActive
      };
      
      console.log(`🚚 ShipperForm: ${isEdit ? 'Updating' : 'Creating'} shipper:`, submitData);
      
      let response;
      if (isEdit && shipperId) {
        response = await AdminApiService.updateShipper(shipperId, submitData);
      } else {
        response = await AdminApiService.createShipper(submitData);
      }
      
      console.log(`✅ ShipperForm: Successfully ${isEdit ? 'updated' : 'created'} shipper:`, response);
      
      onSuccess();
      onClose();
      
    } catch (err) {
      setError(`Có lỗi xảy ra khi ${isEdit ? 'cập nhật' : 'tạo'} shipper`);
      console.error(`❌ ShipperForm: Error ${isEdit ? 'updating' : 'creating'} shipper:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    
    // Format phone number as user types
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 10) {
        if (cleaned.length >= 6) {
          processedValue = cleaned.replace(/(\d{4})(\d{3})(\d{0,3})/, '$1 $2 $3').trim();
        } else if (cleaned.length >= 4) {
          processedValue = cleaned.replace(/(\d{4})(\d{0,3})/, '$1 $2').trim();
        } else {
          processedValue = cleaned;
        }
      } else {
        return; // Don't allow more than 10 digits
      }
    }
    
    // Format vehicle number as user types
    if (name === 'vehicleNumber') {
      const cleaned = value.replace(/[^0-9A-Za-z-]/g, '').toUpperCase();
      processedValue = cleaned;
    }
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatPhoneDisplay = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
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
              {isEdit ? 'Chỉnh sửa shipper' : 'Thêm shipper mới'}
            </h2>
            <p className="modal-subtitle">
              {isEdit ? 'Cập nhật thông tin shipper' : 'Điền thông tin cho shipper mới'}
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
                {/* Shipper Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <User size={16} />
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Nhập họ và tên shipper..."
                    maxLength={50}
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <Phone size={16} />
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="Nhập số điện thoại..."
                    maxLength={12}
                  />
                  {form.phone && !errors.phone && (
                    <div className="form-help">
                      Định dạng: {formatPhoneDisplay(form.phone)}
                    </div>
                  )}
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>

                {/* Vehicle Number */}
                <div className="form-group">
                  <label htmlFor="vehicleNumber" className="form-label">
                    <Car size={16} />
                    Biển số xe *
                  </label>
                  <input
                    type="text"
                    id="vehicleNumber"
                    name="vehicleNumber"
                    value={form.vehicleNumber}
                    onChange={handleInputChange}
                    className={`form-input ${errors.vehicleNumber ? 'error' : ''}`}
                    placeholder="Nhập biển số xe (VD: 29H1-12345)..."
                    maxLength={10}
                    style={{ fontFamily: 'monospace' }}
                  />
                  <div className="form-help">
                    Định dạng: 12AB-12345 (VD: 29H1-12345, 51G2-67890)
                  </div>
                  {errors.vehicleNumber && (
                    <span className="error-text">{errors.vehicleNumber}</span>
                  )}
                </div>

                {/* Status */}
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
                      Kích hoạt shipper
                    </span>
                  </label>
                  <div className="form-help">
                    Shipper sẽ {form.isActive ? 'có thể nhận' : 'không thể nhận'} đơn hàng mới
                  </div>
                </div>

                {/* Additional Info */}
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
                    Lưu ý quan trọng
                  </h4>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: '1.25rem', 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    lineHeight: '1.5'
                  }}>
                    <li>Số điện thoại phải là số Việt Nam hợp lệ (bắt đầu bằng 03, 05, 07, 08, 09)</li>
                    <li>Biển số xe phải đúng định dạng của Việt Nam</li>
                    <li>Thông tin sẽ được sử dụng để liên hệ và theo dõi giao hàng</li>
                    <li>Shipper không hoạt động sẽ không nhận được đơn hàng mới</li>
                  </ul>
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

export default ShipperFormModal;