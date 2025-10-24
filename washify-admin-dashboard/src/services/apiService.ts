import { apiClient } from './apiClient';
import { AdminApiService } from './adminApiService';
import {
  ApiResponse,
  OrderResponse,
  UserResponse,
  BranchResponse,
  ServiceResponse,
  ShipperResponse,
  ShipperRequest,
  ShipperStatistics,
  PromotionResponse,
  NotificationResponse,
  NotificationRequest,
  PageResponse,
  DashboardStats
} from '../types/api';

export class OrderService {
  static async getAllOrders(): Promise<ApiResponse<OrderResponse[]>> {
    console.log('📦 OrderService.getAllOrders called - fetching real data...');
    try {
      const result = await AdminApiService.getOrders();
      console.log('✅ Orders fetched successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ OrderService.getAllOrders error:', error);
      // Return fallback structure if API fails
      return {
        success: false,
        message: 'Orders API not available',
        data: []
      };
    }
  }

  static async getOrderById(id: number): Promise<ApiResponse<OrderResponse>> {
    try {
      const response = await apiClient.get(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      throw error;
    }
  }

  static async updateOrderStatus(id: number, status: string): Promise<ApiResponse<OrderResponse>> {
    try {
      const response = await apiClient.patch(`/api/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
}

export class UserService {
  static async getAllUsers(): Promise<ApiResponse<UserResponse[]>> {
    console.log('👤 UserService.getAllUsers called - fetching real data...');
    try {
      const result = await AdminApiService.getUsers();
      console.log('✅ Users fetched successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ UserService.getAllUsers error:', error);
      return {
        success: false,
        message: 'Users API not available',
        data: []
      };
    }
  }

  static async getUserById(id: number): Promise<ApiResponse<UserResponse>> {
    try {
      const response = await apiClient.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  static async deactivateUser(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.patch(`/api/users/${id}/deactivate`);
      return response.data;
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw error;
    }
  }

  static async activateUser(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.patch(`/api/users/${id}/activate`);
      return response.data;
    } catch (error) {
      console.error('Error activating user:', error);
      throw error;
    }
  }
}

export class BranchService {
  static async getAllBranches(): Promise<ApiResponse<BranchResponse[]>> {
    console.log('🏢 BranchService.getAllBranches called - fetching real data...');
    try {
      const result = await AdminApiService.getBranches();
      console.log('✅ Branches fetched successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ BranchService.getAllBranches error:', error);
      return {
        success: false,
        message: 'Branches API not available',
        data: []
      };
    }
  }

  static async getBranchById(id: number): Promise<ApiResponse<BranchResponse>> {
    try {
      const response = await apiClient.get(`/api/branches/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching branch by ID:', error);
      throw error;
    }
  }

  static async getActiveBranches(): Promise<ApiResponse<BranchResponse[]>> {
    try {
      const response = await apiClient.get('/api/branches/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active branches:', error);
      throw error;
    }
  }
}

export class ServiceService {
  static async getAllServices(): Promise<ApiResponse<ServiceResponse[]>> {
    console.log('🧺 ServiceService.getAllServices called - fetching real data...');
    try {
      const result = await AdminApiService.getServices();
      console.log('✅ Services fetched successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ ServiceService.getAllServices error:', error);
      return {
        success: false,
        message: 'Services API not available',
        data: []
      };
    }
  }

  static async getServiceById(id: number): Promise<ApiResponse<ServiceResponse>> {
    try {
      const response = await apiClient.get(`/api/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw error;
    }
  }

  static async getActiveServices(): Promise<ApiResponse<ServiceResponse[]>> {
    try {
      const response = await apiClient.get('/api/services/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active services:', error);
      throw error;
    }
  }
}

export class ShipperService {
  static async getAllShippers(): Promise<ApiResponse<ShipperResponse[]>> {
    console.log('ShipperService.getAllShippers called');
    try {
      const result = await AdminApiService.getShippers();
      console.log('Shippers service result:', result);
      return result;
    } catch (error) {
      console.error('ShipperService.getAllShippers error:', error);
      // Return fallback structure if API fails
      return {
        success: false,
        message: 'Failed to fetch shippers',
        data: []
      };
    }
  }

  static async getShipperById(id: number): Promise<ApiResponse<ShipperResponse>> {
    const response = await apiClient.get(`/api/shippers/${id}`);
    return response.data;
  }

  static async createShipper(data: ShipperRequest): Promise<ApiResponse<ShipperResponse>> {
    const response = await apiClient.post('/api/shippers', data);
    return response.data;
  }

  static async updateShipper(id: number, data: ShipperRequest): Promise<ApiResponse<ShipperResponse>> {
    const response = await apiClient.put(`/api/shippers/${id}`, data);
    return response.data;
  }

  static async activateShipper(id: number): Promise<ApiResponse<ShipperResponse>> {
    const response = await apiClient.patch(`/api/shippers/${id}/activate`);
    return response.data;
  }

  static async deactivateShipper(id: number): Promise<ApiResponse<ShipperResponse>> {
    const response = await apiClient.patch(`/api/shippers/${id}/deactivate`);
    return response.data;
  }

  static async deleteShipper(id: number): Promise<void> {
    await apiClient.delete(`/api/shippers/${id}`);
  }

  static async getShipperStatistics(id: number): Promise<ApiResponse<ShipperStatistics>> {
    const response = await apiClient.get(`/api/shippers/${id}/statistics`);
    return response.data;
  }

  static async getActiveShippers(): Promise<ApiResponse<ShipperResponse[]>> {
    console.log('ShipperService.getActiveShippers called');
    try {
      const result = await AdminApiService.getActiveShippers();
      console.log('Active shippers service result:', result);
      return result;
    } catch (error) {
      console.error('ShipperService.getActiveShippers error:', error);
      // Return fallback structure if API fails
      return {
        success: false,
        message: 'Failed to fetch active shippers',
        data: []
      };
    }
  }
}

export class PromotionService {
  static async getAllPromotions(): Promise<ApiResponse<PromotionResponse[]>> {
    const response = await apiClient.get('/api/promotions');
    return response.data;
  }

  static async getPromotionById(id: number): Promise<ApiResponse<PromotionResponse>> {
    const response = await apiClient.get(`/api/promotions/${id}`);
    return response.data;
  }

  static async getActivePromotions(): Promise<ApiResponse<PromotionResponse[]>> {
    const response = await apiClient.get('/api/promotions/active');
    return response.data;
  }
}

export class NotificationService {
  static async getAllNotifications(page = 0, size = 20): Promise<ApiResponse<PageResponse<NotificationResponse>>> {
    const response = await apiClient.get(`/api/notifications?page=${page}&size=${size}`);
    return response.data;
  }

  static async getMyNotifications(page = 0, size = 20): Promise<ApiResponse<PageResponse<NotificationResponse>>> {
    const response = await apiClient.get(`/api/notifications/my?page=${page}&size=${size}`);
    return response.data;
  }

  static async createNotification(data: NotificationRequest): Promise<ApiResponse<NotificationResponse>> {
    const response = await apiClient.post('/api/notifications', data);
    return response.data;
  }

  static async markAsRead(id: number): Promise<ApiResponse<NotificationResponse>> {
    const response = await apiClient.patch(`/api/notifications/${id}/read`);
    return response.data;
  }

  static async markAllAsRead(): Promise<ApiResponse<void>> {
    const response = await apiClient.patch('/api/notifications/read-all');
    return response.data;
  }

  static async countUnread(): Promise<ApiResponse<number>> {
    const response = await apiClient.get('/api/notifications/unread/count');
    return response.data;
  }

  static async deleteNotification(id: number): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/api/notifications/${id}`);
    return response.data;
  }
}

export class DashboardService {
  static async getDashboardStats(): Promise<DashboardStats> {
    console.log('🔄 Fetching REAL dashboard stats from backend...');
    
    // Khởi tạo với giá trị mặc định
    const stats: DashboardStats = {
      totalOrders: 0,
      totalRevenue: 0,
      activeShippers: 0,
      pendingOrders: 0,
      completedOrders: 0,
      todayOrders: 0,
      totalUsers: 0,
      activeUsers: 0,
      totalBranches: 0,
      activeBranches: 0,
      totalServices: 0,
      activeServices: 0
    };

    // Test backend connection first
    console.log('🔗 Testing backend connection...');
    const connectionOk = await AdminApiService.testConnection();
    console.log('Backend connection status:', connectionOk);

    if (!connectionOk) {
      console.warn('⚠️ Backend not available, using mock data');
      return this.getMockStats();
    }

    // Fetch real data from all available endpoints
    const promises = [
      this.fetchShipperStats(stats),
      this.fetchOrderStats(stats),
      this.fetchUserStats(stats),
      this.fetchBranchStats(stats),
      this.fetchServiceStats(stats),
      this.fetchNotificationStats(stats)
    ];

    // Execute all API calls in parallel
    await Promise.allSettled(promises);
    
    console.log('✅ Final dashboard stats:', stats);
    return stats;
  }

  private static async fetchShipperStats(stats: DashboardStats): Promise<void> {
    try {
      console.log('👥 Fetching shipper data...');
      const shippersRes = await AdminApiService.getShippers();
      const shippers = shippersRes.data || [];
      
      stats.activeShippers = shippers.filter((shipper: any) => shipper.isActive).length;
      console.log(`✅ Shippers: ${stats.activeShippers} active out of ${shippers.length} total`);
    } catch (error) {
      console.warn('⚠️ Shipper API failed:', error);
      stats.activeShippers = 12; // Fallback
    }
  }

  private static async fetchOrderStats(stats: DashboardStats): Promise<void> {
    try {
      console.log('📦 Fetching order data...');
      const ordersRes = await AdminApiService.getOrders();
      const orders = ordersRes.data || [];
      
      stats.totalOrders = orders.length;
      
      const today = new Date().toISOString().split('T')[0];
      stats.todayOrders = orders.filter((order: any) => 
        order.orderDate?.startsWith(today)
      ).length;

      stats.completedOrders = orders.filter((order: any) => 
        order.status === 'COMPLETED'
      ).length;

      stats.pendingOrders = orders.filter((order: any) => 
        ['PENDING', 'CONFIRMED', 'PROCESSING', 'READY', 'DELIVERING'].includes(order.status)
      ).length;

      stats.totalRevenue = orders
        .filter((order: any) => order.status === 'COMPLETED')
        .reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);

      console.log(`✅ Orders: ${stats.totalOrders} total, ${stats.completedOrders} completed, ${stats.pendingOrders} pending`);
      console.log(`💰 Revenue: ${stats.totalRevenue.toLocaleString('vi-VN')} VND`);
    } catch (error) {
      console.warn('⚠️ Order API failed:', error);
      // Use mock data for orders
      stats.totalOrders = 1250;
      stats.completedOrders = 980;
      stats.pendingOrders = 85;
      stats.todayOrders = 24;
      stats.totalRevenue = 125000000;
    }
  }

  private static async fetchUserStats(stats: DashboardStats): Promise<void> {
    try {
      console.log('👤 Fetching user data...');
      const usersRes = await AdminApiService.getUsers();
      const users = usersRes.data || [];
      
      stats.totalUsers = users.length;
      stats.activeUsers = users.filter((user: any) => user.isActive).length;
      
      console.log(`✅ Users: ${stats.activeUsers} active out of ${stats.totalUsers} total`);
    } catch (error) {
      console.warn('⚠️ User API failed:', error);
      stats.totalUsers = 150;
      stats.activeUsers = 120;
    }
  }

  private static async fetchBranchStats(stats: DashboardStats): Promise<void> {
    try {
      console.log('🏢 Fetching branch data...');
      const branchesRes = await AdminApiService.getBranches();
      const branches = branchesRes.data || [];
      
      stats.totalBranches = branches.length;
      stats.activeBranches = branches.filter((branch: any) => branch.isActive).length;
      
      console.log(`✅ Branches: ${stats.activeBranches} active out of ${stats.totalBranches} total`);
    } catch (error) {
      console.warn('⚠️ Branch API failed:', error);
      stats.totalBranches = 5;
      stats.activeBranches = 5;
    }
  }

  private static async fetchServiceStats(stats: DashboardStats): Promise<void> {
    try {
      console.log('🧺 Fetching service data...');
      const servicesRes = await AdminApiService.getServices();
      const services = servicesRes.data || [];
      
      stats.totalServices = services.length;
      stats.activeServices = services.filter((service: any) => service.isActive).length;
      
      console.log(`✅ Services: ${stats.activeServices} active out of ${stats.totalServices} total`);
    } catch (error) {
      console.warn('⚠️ Service API failed:', error);
      stats.totalServices = 8;
      stats.activeServices = 8;
    }
  }

  private static async fetchNotificationStats(stats: DashboardStats): Promise<void> {
    try {
      console.log('🔔 Fetching notification data...');
      const notifCount = await AdminApiService.getNotificationCount();
      console.log(`✅ Unread notifications: ${notifCount.data}`);
    } catch (error) {
      console.warn('⚠️ Notification API failed:', error);
    }
  }

  private static getMockStats(): DashboardStats {
    console.log('📊 Using mock dashboard data');
    return {
      totalOrders: 1250,
      totalRevenue: 125000000,
      activeShippers: 12,
      pendingOrders: 85,
      completedOrders: 980,
      todayOrders: 24,
      totalUsers: 150,
      activeUsers: 120,
      totalBranches: 5,
      activeBranches: 5,
      totalServices: 8,
      activeServices: 8
    };
  }
}