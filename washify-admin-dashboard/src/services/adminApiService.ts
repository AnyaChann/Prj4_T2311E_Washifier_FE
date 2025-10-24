// Service wrapper for admin-api
import { apiClient } from './apiClient';

// Simple wrapper for admin API calls
export class AdminApiService {
  // Test connection to admin API
  static async testConnection(): Promise<boolean> {
    try {
      // Try to call any endpoint to test connection
      const response = await apiClient.get('/api/notifications/unread/count');
      console.log('Admin API connection test:', response.data);
      return true;
    } catch (error) {
      console.error('Admin API connection failed:', error);
      return false;
    }
  }

  // Fetch shippers using direct API call
  static async getShippers() {
    try {
      console.log('Fetching shippers via direct API call...');
      const response = await apiClient.get('/api/shippers');
      console.log('Shippers response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching shippers:', error);
      throw error;
    }
  }

  // Fetch active shippers
  static async getActiveShippers() {
    try {
      console.log('Fetching active shippers...');
      const response = await apiClient.get('/api/shippers/active');
      console.log('Active shippers response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching active shippers:', error);
      throw error;
    }
  }

  // Test other endpoints
  static async getNotificationCount() {
    try {
      console.log('Getting notification count...');
      const response = await apiClient.get('/api/notifications/unread/count');
      console.log('Notification count:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching notification count:', error);
      throw error;
    }
  }

  // Fetch all notifications (for admin)
  static async getAllNotifications() {
    try {
      console.log('Fetching all notifications...');
      const response = await apiClient.get('/api/notifications');
      console.log('All notifications response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all notifications:', error);
      throw error;
    }
  }

  // Try to fetch orders (may not exist but let's test)
  static async getOrders() {
    try {
      console.log('Fetching orders...');
      const response = await apiClient.get('/api/orders');
      console.log('Orders response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Try to fetch users (may not exist but let's test)
  static async getUsers() {
    try {
      console.log('Fetching users...');
      const response = await apiClient.get('/api/users');
      console.log('Users response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Try to fetch branches (may not exist but let's test)
  static async getBranches() {
    try {
      console.log('Fetching branches...');
      const response = await apiClient.get('/api/branches');
      console.log('Branches response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }
  }

  // Try to fetch services (may not exist but let's test)
  static async getServices() {
    try {
      console.log('Fetching services...');
      const response = await apiClient.get('/api/services');
      console.log('Services response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  // Try to fetch promotions (may not exist but let's test)
  static async getPromotions() {
    try {
      console.log('Fetching promotions...');
      const response = await apiClient.get('/api/promotions');
      console.log('Promotions response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching promotions:', error);
      throw error;
    }
  }
}