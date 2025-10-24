import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  roles: string[];
  branchId?: number;
  branchName?: string;
  isActive: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string; // có thể là email, phone, hoặc username
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    type: string;
    user: User;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra token trong localStorage khi khởi tạo
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080'}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('Login response:', { status: response.status, data }); // Debug log

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }

      // Handle different response structures
      let authToken: string;
      let userData: User;

      // Check if response has success field
      if (data.success !== undefined) {
        if (!data.success) {
          throw new Error(data.message || 'Đăng nhập thất bại');
        }
        
        // Backend structure: { success: true, data: { token, tokenType, userId, username, email, ... } }
        if (data.data?.token) {
          authToken = data.data.token;
          
          // Create user object from flattened data structure
          userData = {
            id: data.data.userId || data.data.id,
            username: data.data.username,
            fullName: data.data.fullName || data.data.name || data.data.username,
            email: data.data.email,
            phone: data.data.phone || '',
            roles: data.data.roles || ['USER'], // Default role if not provided
            branchId: data.data.branchId,
            branchName: data.data.branchName,
            isActive: data.data.isActive !== false // Default to true if not specified
          };
        } else if (data.data?.user && data.data?.token) {
          // Structure: { success: true, data: { token, user } }
          authToken = data.data.token;
          userData = data.data.user;
        } else {
          console.error('Token not found in response:', data);
          throw new Error('Token not found in response');
        }
      } else if (data.token && data.user) {
        // Structure: { token, user, message }
        authToken = data.token;
        userData = data.user;
      } else if (data.data && data.data.token && data.data.user) {
        // Structure: { data: { token, user } }
        authToken = data.data.token;
        userData = data.data.user;
      } else {
        console.error('Unknown response structure:', data);
        throw new Error('Invalid response structure from server');
      }

      // Kiểm tra quyền admin/manager/staff
      const userRoles = userData.roles || [];
      console.log('User roles:', userRoles); // Debug log
      
      // TODO: Enable role checking when backend provides proper roles
      // For now, allow all authenticated users to access dashboard

      // Lưu vào localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('authUser', JSON.stringify(userData));

      // Cập nhật state
      setToken(authToken);
      setUser(userData);

      console.log('Login successful:', { user: userData.username, roles: userData.roles }); // Debug log
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = !!token && !!user;

  const value: AuthContextType = useMemo(() => ({
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated,
  }), [user, token, login, logout, isLoading, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};