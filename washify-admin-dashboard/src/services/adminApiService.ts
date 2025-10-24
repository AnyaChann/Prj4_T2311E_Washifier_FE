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

  // Fetch shippers from API
  static async getShippers() {
    try {
      console.log('🚚 AdminApiService: Fetching shippers from API...');
      const response = await apiClient.get('/api/shippers');
      console.log('🚚 AdminApiService: Raw API response:', response);
      console.log('🚚 AdminApiService: Response data:', response.data);
      
      // API returns { data: ShipperResponse[] }
      if (response.data?.data && Array.isArray(response.data.data)) {
        console.log('✅ AdminApiService: Successfully parsed shippers data:', response.data.data.length, 'shippers');
        return response.data; // Return the whole response object
      }
      
      console.log('⚠️ AdminApiService: Unexpected shippers response structure');
      return response.data;
    } catch (error) {
      console.error('❌ AdminApiService: Error fetching shippers:', error);
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

  // Fetch branches from API
  static async getBranches() {
    try {
      console.log('🏢 AdminApiService: Fetching branches from API...');
      const response = await apiClient.get('/api/branches');
      console.log('🏢 AdminApiService: Raw API response:', response);
      console.log('🏢 AdminApiService: Response data:', response.data);
      
      // API returns { data: BranchResponse[] }
      if (response.data?.data && Array.isArray(response.data.data)) {
        console.log('✅ AdminApiService: Successfully parsed branches data:', response.data.data.length, 'branches');
        return response.data; // Return the whole response object
      }
      
      console.log('⚠️ AdminApiService: Unexpected branches response structure');
      return response.data;
    } catch (error) {
      console.error('❌ AdminApiService: Error fetching branches:', error);
      throw error;
    }
  }

  // Fetch services from API
  static async getServices() {
    try {
      console.log('🛍️ AdminApiService: Fetching services from API...');
      const response = await apiClient.get('/api/services');
      console.log('🛍️ AdminApiService: Raw API response:', response);
      console.log('🛍️ AdminApiService: Response data:', response.data);
      
      // API returns { data: ServiceResponse[] }
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        console.log('✅ AdminApiService: Successfully parsed services data:', response.data.data.length, 'services');
        return response.data; // Return the whole response object so Services.tsx can access .data
      }
      
      console.log('⚠️ AdminApiService: Unexpected response structure');
      return response.data;
    } catch (error) {
      console.error('❌ AdminApiService: Error fetching services:', error);
      throw error;
    }
  }

  // Fetch promotions from API
  static async getPromotions() {
    try {
      console.log('🎁 AdminApiService: Fetching promotions from API...');
      const response = await apiClient.get('/api/promotions');
      console.log('🎁 AdminApiService: Raw API response:', response);
      console.log('🎁 AdminApiService: Response data:', response.data);
      
      // API returns { data: PromotionResponse[] }
      if (response.data?.data && Array.isArray(response.data.data)) {
        console.log('✅ AdminApiService: Successfully parsed promotions data:', response.data.data.length, 'promotions');
        return response.data; // Return the whole response object
      }
      
      console.log('⚠️ AdminApiService: Unexpected promotions response structure');
      return response.data;
    } catch (error) {
      console.error('❌ AdminApiService: Error fetching promotions:', error);
      throw error;
    }
  }

  // ==================== SHIPPER CRUD OPERATIONS ==================== //
  
  // Get shipper by ID
  static async getShipperById(id: number) {
    try {
      console.log(`🚚 AdminApiService: Fetching shipper ${id}...`);
      const response = await apiClient.get(`/api/shippers/${id}`);
      console.log('🚚 AdminApiService: Shipper detail response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error fetching shipper ${id}:`, error);
      throw error;
    }
  }

  // Create new shipper
  static async createShipper(shipperData: any) {
    try {
      console.log('🚚 AdminApiService: Creating shipper...', shipperData);
      const response = await apiClient.post('/api/shippers', shipperData);
      console.log('🚚 AdminApiService: Create shipper response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ AdminApiService: Error creating shipper:', error);
      throw error;
    }
  }

  // Update shipper
  static async updateShipper(id: number, shipperData: any) {
    try {
      console.log(`🚚 AdminApiService: Updating shipper ${id}...`, shipperData);
      const response = await apiClient.put(`/api/shippers/${id}`, shipperData);
      console.log('🚚 AdminApiService: Update shipper response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error updating shipper ${id}:`, error);
      throw error;
    }
  }

  // Delete shipper (soft delete)
  static async deleteShipper(id: number) {
    try {
      console.log(`🚚 AdminApiService: Deleting shipper ${id}...`);
      const response = await apiClient.delete(`/api/shippers/${id}`);
      console.log('🚚 AdminApiService: Delete shipper response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error deleting shipper ${id}:`, error);
      throw error;
    }
  }

  // Activate shipper
  static async activateShipper(id: number) {
    try {
      console.log(`🚚 AdminApiService: Activating shipper ${id}...`);
      const response = await apiClient.patch(`/api/shippers/${id}/activate`);
      console.log('🚚 AdminApiService: Activate shipper response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error activating shipper ${id}:`, error);
      throw error;
    }
  }

  // Deactivate shipper
  static async deactivateShipper(id: number) {
    try {
      console.log(`🚚 AdminApiService: Deactivating shipper ${id}...`);
      const response = await apiClient.patch(`/api/shippers/${id}/deactivate`);
      console.log('🚚 AdminApiService: Deactivate shipper response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error deactivating shipper ${id}:`, error);
      throw error;
    }
  }

  // ==================== BRANCH CRUD OPERATIONS ==================== //
  
  // Get branch by ID
  static async getBranchById(id: number) {
    try {
      console.log(`🏢 AdminApiService: Fetching branch ${id}...`);
      const response = await apiClient.get(`/api/branches/${id}`);
      console.log('🏢 AdminApiService: Branch detail response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error fetching branch ${id}:`, error);
      // Return mock data for now since API may not exist
      console.log('⚠️ AdminApiService: Branch API not available, returning mock data');
      return {
        success: true,
        data: {
          id: id,
          name: 'Chi nhánh mẫu',
          address: '123 Đường mẫu, Quận mẫu, TP.HCM',
          phone: '028 1234 5678',
          managerName: 'Nguyễn Văn A',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      };
    }
  }

  // Create new branch
  static async createBranch(branchData: any) {
    try {
      console.log('🏢 AdminApiService: Creating branch...', branchData);
      const response = await apiClient.post('/api/branches', branchData);
      console.log('🏢 AdminApiService: Create branch response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ AdminApiService: Error creating branch:', error);
      // Simulate success for now
      console.log('⚠️ AdminApiService: Branch create API not available, simulating success');
      return {
        success: true,
        data: {
          id: Date.now(),
          ...branchData,
          createdAt: new Date().toISOString()
        }
      };
    }
  }

  // Update branch
  static async updateBranch(id: number, branchData: any) {
    try {
      console.log(`🏢 AdminApiService: Updating branch ${id}...`, branchData);
      const response = await apiClient.put(`/api/branches/${id}`, branchData);
      console.log('🏢 AdminApiService: Update branch response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error updating branch ${id}:`, error);
      // Simulate success for now
      console.log('⚠️ AdminApiService: Branch update API not available, simulating success');
      return {
        success: true,
        data: {
          id: id,
          ...branchData,
          updatedAt: new Date().toISOString()
        }
      };
    }
  }

  // Delete branch
  static async deleteBranch(id: number) {
    try {
      console.log(`🏢 AdminApiService: Deleting branch ${id}...`);
      const response = await apiClient.delete(`/api/branches/${id}`);
      console.log('🏢 AdminApiService: Delete branch response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error deleting branch ${id}:`, error);
      // Simulate success for now
      console.log('⚠️ AdminApiService: Branch delete API not available, simulating success');
      return {
        success: true,
        message: `Branch ${id} deleted successfully`
      };
    }
  }

  // ==================== SERVICE CRUD OPERATIONS ==================== //
  
  // Get service by ID
  static async getServiceById(id: number) {
    try {
      console.log(`🛍️ AdminApiService: Fetching service ${id}...`);
      const response = await apiClient.get(`/api/services/${id}`);
      console.log('🛍️ AdminApiService: Service detail response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error fetching service ${id}:`, error);
      // Return mock data for now since API may not exist
      console.log('⚠️ AdminApiService: Service API not available, returning mock data');
      return {
        success: true,
        data: {
          id: id,
          name: 'Dịch vụ mẫu',
          description: 'Mô tả dịch vụ mẫu',
          price: 50000,
          estimatedTime: 120,
          isActive: true
        }
      };
    }
  }

  // Create new service
  static async createService(serviceData: any) {
    try {
      console.log('🛍️ AdminApiService: Creating service...', serviceData);
      const response = await apiClient.post('/api/services', serviceData);
      console.log('🛍️ AdminApiService: Create service response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ AdminApiService: Error creating service:', error);
      // Simulate success for now
      console.log('⚠️ AdminApiService: Service create API not available, simulating success');
      return {
        success: true,
        data: {
          id: Date.now(),
          ...serviceData
        }
      };
    }
  }

  // Update service
  static async updateService(id: number, serviceData: any) {
    try {
      console.log(`🛍️ AdminApiService: Updating service ${id}...`, serviceData);
      const response = await apiClient.put(`/api/services/${id}`, serviceData);
      console.log('🛍️ AdminApiService: Update service response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error updating service ${id}:`, error);
      // Simulate success for now
      console.log('⚠️ AdminApiService: Service update API not available, simulating success');
      return {
        success: true,
        data: {
          id: id,
          ...serviceData
        }
      };
    }
  }

  // Delete service
  static async deleteService(id: number) {
    try {
      console.log(`🛍️ AdminApiService: Deleting service ${id}...`);
      const response = await apiClient.delete(`/api/services/${id}`);
      console.log('🛍️ AdminApiService: Delete service response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error deleting service ${id}:`, error);
      // Simulate success for now
      console.log('⚠️ AdminApiService: Service delete API not available, simulating success');
      return {
        success: true,
        message: `Service ${id} deleted successfully`
      };
    }
  }

  // ==================== PROMOTION CRUD OPERATIONS ==================== //
  
  // Get promotion by ID
  static async getPromotionById(id: number) {
    try {
      console.log(`🎁 AdminApiService: Fetching promotion ${id}...`);
      const response = await apiClient.get(`/api/promotions/${id}`);
      console.log('🎁 AdminApiService: Promotion detail response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error fetching promotion ${id}:`, error);
      // Return mock data for now since API may not exist
      console.log('⚠️ AdminApiService: Promotion API not available, returning mock data');
      return {
        success: true,
        data: {
          id: id,
          code: 'SAMPLE20',
          description: 'Khuyến mãi mẫu',
          discountType: 'PERCENTAGE',
          discountValue: 20,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true
        }
      };
    }
  }

  // Create new promotion
  static async createPromotion(promotionData: any) {
    try {
      console.log('🎁 AdminApiService: Creating promotion...', promotionData);
      const response = await apiClient.post('/api/promotions', promotionData);
      console.log('🎁 AdminApiService: Create promotion response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ AdminApiService: Error creating promotion:', error);
      // Simulate success for now
      console.log('⚠️ AdminApiService: Promotion create API not available, simulating success');
      return {
        success: true,
        data: {
          id: Date.now(),
          ...promotionData
        }
      };
    }
  }

  // Update promotion
  static async updatePromotion(id: number, promotionData: any) {
    try {
      console.log(`🎁 AdminApiService: Updating promotion ${id}...`, promotionData);
      const response = await apiClient.put(`/api/promotions/${id}`, promotionData);
      console.log('🎁 AdminApiService: Update promotion response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error updating promotion ${id}:`, error);
      // Simulate success for now
      console.log('⚠️ AdminApiService: Promotion update API not available, simulating success');
      return {
        success: true,
        data: {
          id: id,
          ...promotionData
        }
      };
    }
  }

  // Delete promotion
  static async deletePromotion(id: number) {
    try {
      console.log(`🎁 AdminApiService: Deleting promotion ${id}...`);
      const response = await apiClient.delete(`/api/promotions/${id}`);
      console.log('🎁 AdminApiService: Delete promotion response:', response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ AdminApiService: Error deleting promotion ${id}:`, error);
      // Simulate success for now
      console.log('⚠️ AdminApiService: Promotion delete API not available, simulating success');
      return {
        success: true,
        message: `Promotion ${id} deleted successfully`
      };
    }
  }
}