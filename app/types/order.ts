// types/order.ts
export interface Order {
    id: string;
    orderNumber: string;
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    totalAmount: number;
    deliveryFee: number;
    discountAmount: number;
    finalAmount: number;
    paymentMethod: 'COD' | 'UPI' | 'CREDIT_CARD';
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
    deliveryAddress?: string;
    pickupTime?: string;
    specialInstructions?: string;
    estimatedPreparationTime: number; // in minutes
    createdAt: string;
    updatedAt: string;
    statusHistory: OrderStatusHistory[];
  }
  
  export interface OrderItem {
    id: string;
    menuItemId: string;
    menuItemName: string;
    menuItemImage: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    customizations?: {
      spiceLevel?: 'MILD' | 'MEDIUM' | 'HOT';
      extras?: string[];
    };
  }
  
  export type OrderStatus = 
    | 'PENDING'     // Order placed, waiting for restaurant acceptance
    | 'ACCEPTED'    // Restaurant accepted the order
    | 'PREPARING'   // Food is being prepared
    | 'READY'       // Food is ready for pickup
    | 'COMPLETED'   // Order completed/picked up
    | 'CANCELLED'   // Order cancelled
    | 'REJECTED';   // Restaurant rejected the order
  
  export interface OrderStatusHistory {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }
  
  export interface OrdersState {
    orders: Order[];
    activeOrders: Order[];
    completedOrders: Order[];
    isLoading: boolean;
    error: string | null;
    currentOrder?: Order;
  }