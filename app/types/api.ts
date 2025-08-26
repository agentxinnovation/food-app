// types/api.ts
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
  }
  
  export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
  }
  
  export interface CreateOrderRequest {
    items: OrderItemRequest[];
    deliveryAddress?: string;
    pickupTime?: string;
    paymentMethod: 'COD' | 'UPI' | 'CREDIT_CARD';
    specialInstructions?: string;
  }
  
  export interface OrderItemRequest {
    menuItemId: string;
    quantity: number;
    customizations?: {
      spiceLevel?: 'MILD' | 'MEDIUM' | 'HOT';
      extras?: string[];
    };
  }