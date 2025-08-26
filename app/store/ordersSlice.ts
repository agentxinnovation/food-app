// store/ordersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrdersState, Order } from '../types/order';
import { CreateOrderRequest } from '../types/api';
import { api } from '../services/api';

const initialState: OrdersState = {
  orders: [],
  activeOrders: [],
  completedOrders: [],
  isLoading: false,
  error: null,
  currentOrder: undefined,
};

// Async thunks
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: CreateOrderRequest, { rejectWithValue }) => {
    try {
      const response = await api.createOrder(orderData);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Order creation failed');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Order creation failed');
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getMyOrders();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch orders');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch orders');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await api.getOrder(orderId);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch order');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch order');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const orderIndex = state.orders.findIndex(order => order.id === orderId);
      
      if (orderIndex >= 0) {
        state.orders[orderIndex].status = status;
        state.orders[orderIndex].updatedAt = new Date().toISOString();
        
        // Add to status history
        state.orders[orderIndex].statusHistory.push({
          status,
          timestamp: new Date().toISOString(),
        });
      }

      // Update current order if it matches
      const currentOrder = state.currentOrder;

      if (currentOrder && currentOrder.id === orderId) {
        currentOrder.status = status;
        currentOrder.updatedAt = new Date().toISOString();
      }

      

      // Recalculate active and completed orders
      state.activeOrders = state.orders.filter(order => 
        !['COMPLETED', 'CANCELLED', 'REJECTED'].includes(order.status)
      );
      state.completedOrders = state.orders.filter(order => 
        ['COMPLETED', 'CANCELLED', 'REJECTED'].includes(order.status)
      );
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = undefined;
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
      state.orders.unshift(action.payload);
      
      // Update active orders
      state.activeOrders = state.orders.filter(order => 
        !['COMPLETED', 'CANCELLED', 'REJECTED'].includes(order.status)
      );
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch My Orders
    builder.addCase(fetchMyOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      
      // Split into active and completed orders
      state.activeOrders = action.payload.filter(order => 
        !['COMPLETED', 'CANCELLED', 'REJECTED'].includes(order.status)
      );
      state.completedOrders = action.payload.filter(order => 
        ['COMPLETED', 'CANCELLED', 'REJECTED'].includes(order.status)
      );
    });
    builder.addCase(fetchMyOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch Order by ID
    builder.addCase(fetchOrderById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
      
      // Update the order in the orders array if it exists
      const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
      if (orderIndex >= 0) {
        state.orders[orderIndex] = action.payload;
      }
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  clearError,
  setCurrentOrder,
  updateOrderStatus,
  clearCurrentOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;