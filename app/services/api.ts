// services/api.ts
import { ApiResponse, CreateOrderRequest, LoginRequest, RegisterRequest } from '../types/api';
import { Order } from '../types/order';
import { MenuItem } from '../types/product';
import { User } from '../types/user';
import { storage } from './storage';

const BASE_URL = 'https://food.loca.lt';

class ApiService {
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<any> {
    try {
      const token = await storage.getToken();
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      return data;
    } catch (error) {
      console.error('API Request failed for:', endpoint, error);
      throw error;
    }
  }

  // Universal response handler
  private handleResponse<T>(response: any, dataPath?: string): ApiResponse<T> {
    try {
      // If response is already in ApiResponse format
      if (response.success !== undefined) {
        return response;
      }

      // Extract data from nested properties
      let data: any = response;
      if (dataPath && response[dataPath] !== undefined) {
        data = response[dataPath];
      }

      // Handle common response formats
      if (response.data !== undefined) {
        data = response.data;
      }
      if (response.menu !== undefined) {
        data = response.menu;
      }
      if (response.categories !== undefined) {
        data = response.categories;
      }
      if (response.orders !== undefined) {
        data = response.orders;
      }
      if (response.users !== undefined) {
        data = response.users;
      }

      return {
        success: true,
        message: response.message || 'Request successful',
        data: data as T,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to parse response',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await this.makeRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      return this.handleResponse<{ user: User; token: string }>(response);
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Login failed',
        error: error.message,
      };
    }
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await this.makeRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return this.handleResponse<{ user: User; token: string }>(response);
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Registration failed',
        error: error.message,
      };
    }
  }

  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await this.makeRequest('/auth/profile');
      return this.handleResponse<User>(response, 'user');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to get profile',
        error: error.message,
      };
    }
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await this.makeRequest('/auth/update', {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
      return this.handleResponse<User>(response, 'user');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Profile update failed',
        error: error.message,
      };
    }
  }

  // Menu endpoints
  async getMenu(): Promise<ApiResponse<MenuItem[]>> {
    try {
      const response = await this.makeRequest('/menu');
      return this.handleResponse<MenuItem[]>(response, 'menu');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load menu',
        error: error.message,
      };
    }
  }

  async getMenuCategories(): Promise<ApiResponse<string[]>> {
    try {
      const response = await this.makeRequest('/menu/categories');
      return this.handleResponse<string[]>(response, 'categories');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load categories',
        error: error.message,
      };
    }
  }

  async getMenuItem(itemId: string): Promise<ApiResponse<MenuItem>> {
    try {
      const response = await this.makeRequest(`/menu/${itemId}`);
      return this.handleResponse<MenuItem>(response, 'item');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load menu item',
        error: error.message,
      };
    }
  }

  // Order endpoints
  async createOrder(orderData: CreateOrderRequest): Promise<ApiResponse<Order>> {
    try {
      const response = await this.makeRequest('/orders/create', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
      return this.handleResponse<Order>(response, 'order');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to create order',
        error: error.message,
      };
    }
  }

  async getMyOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await this.makeRequest('/orders/my');
      return this.handleResponse<Order[]>(response, 'orders');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load orders',
        error: error.message,
      };
    }
  }

  async getOrder(orderId: string): Promise<ApiResponse<Order>> {
    try {
      const response = await this.makeRequest(`/orders/${orderId}`);
      return this.handleResponse<Order>(response, 'order');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load order',
        error: error.message,
      };
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<ApiResponse<Order>> {
    try {
      const response = await this.makeRequest(`/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      return this.handleResponse<Order>(response, 'order');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to update order status',
        error: error.message,
      };
    }
  }

  // Kitchen endpoints
  async getKitchenOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await this.makeRequest('/kitchen/orders');
      return this.handleResponse<Order[]>(response, 'orders');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load kitchen orders',
        error: error.message,
      };
    }
  }

  async acceptOrder(orderId: string, estimatedPreparationTime: number): Promise<ApiResponse<Order>> {
    try {
      const response = await this.makeRequest(`/kitchen/order/${orderId}/accept`, {
        method: 'PUT',
        body: JSON.stringify({ estimatedPreparationTime }),
      });
      return this.handleResponse<Order>(response, 'order');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to accept order',
        error: error.message,
      };
    }
  }

  async rejectOrder(orderId: string, reason: string): Promise<ApiResponse<Order>> {
    try {
      const response = await this.makeRequest(`/kitchen/order/${orderId}/reject`, {
        method: 'PUT',
        body: JSON.stringify({ reason }),
      });
      return this.handleResponse<Order>(response, 'order');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to reject order',
        error: error.message,
      };
    }
  }

  // Admin endpoints
  async getAdminOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await this.makeRequest('/admin/orders');
      return this.handleResponse<Order[]>(response, 'orders');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load admin orders',
        error: error.message,
      };
    }
  }

  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await this.makeRequest('/admin/users');
      return this.handleResponse<User[]>(response, 'users');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to load users',
        error: error.message,
      };
    }
  }

  async toggleUserCOD(userId: string): Promise<ApiResponse<User>> {
    try {
      const response = await this.makeRequest(`/admin/users/${userId}/toggle-cod`, {
        method: 'PUT',
      });
      return this.handleResponse<User>(response, 'user');
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to toggle COD',
        error: error.message,
      };
    }
  }

  // Utility methods
  async healthCheck(): Promise<ApiResponse<{ msg: string }>> {
    try {
      const response = await this.makeRequest('/api/health');
      return this.handleResponse<{ msg: string }>(response);
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Health check failed',
        error: error.message,
      };
    }
  }

  async getApiInfo(): Promise<ApiResponse<{ msg: string }>> {
    try {
      const response = await this.makeRequest('/api');
      return this.handleResponse<{ msg: string }>(response);
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to get API info',
        error: error.message,
      };
    }
  }
}

export const api = new ApiService();