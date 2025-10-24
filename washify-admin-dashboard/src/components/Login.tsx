import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!credentials.username || !credentials.password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      await login(credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error khi user bắt đầu nhập lại
    if (error) setError(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '0.5rem'
          }}>
            🧺
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            Washify Admin
          </h1>
          <p style={{
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            Đăng nhập vào trang quản trị
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="username"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}
            >
              Email / Tên đăng nhập / Số điện thoại
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="admin@washify.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                transition: 'border-color 0.2s',
                background: isLoading ? '#f9fafb' : 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}
            >
              Mật khẩu
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  paddingRight: '2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  transition: 'border-color 0.2s',
                  background: isLoading ? '#f9fafb' : 'white'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  color: '#6b7280',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  padding: '0.25rem',
                  borderRadius: '0.25rem'
                }}
              >
                {showPassword ? (
                  <EyeOff style={{ width: '16px', height: '16px' }} />
                ) : (
                  <Eye style={{ width: '16px', height: '16px' }} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: isLoading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = '#2563eb';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = '#3b82f6';
              }
            }}
          >
            {isLoading ? (
              <Loader style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
            ) : (
              <LogIn style={{ width: '16px', height: '16px' }} />
            )}
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Demo Accounts */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Lưu ý:
          </h3>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', lineHeight: '1.5' }}>
            <div>• Sử dụng tài khoản có sẵn trong hệ thống</div>
            <div>• Chỉ tài khoản có role <strong>ADMIN</strong>, <strong>MANAGER</strong>, hoặc <strong>STAFF</strong> mới có thể truy cập</div>
            <div>• Liên hệ quản trị viên nếu chưa có tài khoản</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '0.75rem',
          color: '#9ca3af'
        }}>
          © 2025 Washify. Hệ thống quản lý giặt là thông minh.
        </div>
      </div>
    </div>
  );
};

export default Login;