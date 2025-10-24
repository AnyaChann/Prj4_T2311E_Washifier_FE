import React, { useState } from 'react';
import { LogOut, User, Bell, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
    }
  };

  const getRoleDisplayName = (roles: string[]): string => {
    if (roles.includes('ADMIN')) return 'Quản trị viên';
    if (roles.includes('MANAGER')) return 'Quản lý';
    if (roles.includes('STAFF')) return 'Nhân viên';
    return 'Người dùng';
  };

  const getRoleBadgeColor = (roles: string[]): string => {
    if (roles.includes('ADMIN')) return '#dc2626';
    if (roles.includes('MANAGER')) return '#ea580c';
    if (roles.includes('STAFF')) return '#3b82f6';
    return '#6b7280';
  };

  return (
    <header style={{
    //   background: 'white',
    //   borderBottom: '1px solid #e2e8f0',
      padding: '0 2rem',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    //   boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      {/* Left side - Page title sẽ được cập nhật từ component con */}
      <div style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1e293b'
      }}>
        {/* Title sẽ được set từ các page components */}
      </div>

      {/* Right side - User menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Notifications */}
        <button style={{
          position: 'relative',
          padding: '0.5rem',
          border: 'none',
          background: 'transparent',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          color: '#6b7280',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#f1f5f9';
          e.currentTarget.style.color = '#3b82f6';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#6b7280';
        }}>
          <Bell style={{ width: '20px', height: '20px' }} />
          {/* Notification badge */}
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            background: '#ef4444',
            borderRadius: '50%'
          }}></span>
        </button>

        {/* Settings */}
        <button style={{
          padding: '0.5rem',
          border: 'none',
          background: 'transparent',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          color: '#6b7280',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#f1f5f9';
          e.currentTarget.style.color = '#3b82f6';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#6b7280';
        }}>
          <Settings style={{ width: '20px', height: '20px' }} />
        </button>

        {/* User menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 0.75rem',
              border: '1px solid #e2e8f0',
              background: 'white',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              {user?.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>

            {/* User info */}
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#1e293b'
              }}>
                {user?.fullName || 'Unknown User'}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: getRoleBadgeColor(user?.roles || []),
                fontWeight: '500'
              }}>
                {getRoleDisplayName(user?.roles || [])}
              </div>
            </div>

            <ChevronDown style={{
              width: '16px',
              height: '16px',
              color: '#6b7280',
              transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }} />
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              minWidth: '200px',
              zIndex: 50
            }}>
              {/* User info section */}
              <div style={{
                padding: '0.75rem',
                borderBottom: '1px solid #f1f5f9'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#1e293b',
                  marginBottom: '0.25rem'
                }}>
                  {user?.fullName}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  {user?.email}
                </div>
                {user?.branchName && (
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}>
                    📍 {user.branchName}
                  </div>
                )}
              </div>

              {/* Menu items */}
              <div style={{ padding: '0.5rem' }}>
                <button style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  border: 'none',
                  background: 'transparent',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#374151',
                  textAlign: 'left',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}>
                  <User style={{ width: '16px', height: '16px' }} />
                  Thông tin cá nhân
                </button>

                <button style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  border: 'none',
                  background: 'transparent',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#374151',
                  textAlign: 'left',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}>
                  <Settings style={{ width: '16px', height: '16px' }} />
                  Cài đặt
                </button>

                <hr style={{
                  margin: '0.5rem 0',
                  border: 'none',
                  borderTop: '1px solid #f1f5f9'
                }} />

                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    border: 'none',
                    background: 'transparent',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#dc2626',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#fef2f2';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <LogOut style={{ width: '16px', height: '16px' }} />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay để đóng menu khi click outside */}
      {showUserMenu && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;