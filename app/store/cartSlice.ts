// store/cartSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CartState, CartItem, MenuItem } from '../types/product';
import { storage } from '../services/storage';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  deliveryFee: 0,
  discountAmount: 0,
  promoCode: undefined,
};

// Async thunk to load cart from storage
export const loadCart = createAsyncThunk(
  'cart/loadCart',
  async () => {
    const cartItems = await storage.getCart();
    return cartItems;
  }
);

// Helper function to calculate cart totals
const calculateCartTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
  return { totalItems, totalAmount };
};

// Helper function to find matching cart item
const findCartItem = (items: CartItem[], menuItemId: string, customizations?: any) => {
  return items.findIndex(
    item => 
      item.menuItem.id === menuItemId &&
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
  );
};

// Helper function to create cart item
const createCartItem = (
  menuItem: MenuItem, 
  quantity: number, 
  customizations?: any
): CartItem => {
  let additionalPrice = 0;
  
  // Calculate additional price for customizations
  if (customizations?.extras && Array.isArray(customizations.extras)) {
    // This would need to be implemented based on your menu item structure
    // For now, assuming each extra adds ₹20
    additionalPrice = customizations.extras.length * 20;
  }

  const unitPrice = menuItem.price + additionalPrice;
  const totalPrice = unitPrice * quantity;

  return {
    menuItem,
    quantity,
    customizations,
    totalPrice,
  };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{
      menuItem: MenuItem;
      quantity: number;
      customizations?: {
        spiceLevel?: 'MILD' | 'MEDIUM' | 'HOT';
        extras?: string[];
        notes?: string;
      };
    }>) => {
      const { menuItem, quantity, customizations } = action.payload;
      
      // Find existing item with same customizations
      const existingItemIndex = findCartItem(state.items, menuItem.id, customizations);

      if (existingItemIndex >= 0) {
        // Update existing item
        const existingItem = state.items[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        const newCartItem = createCartItem(menuItem, newQuantity, customizations);
        
        state.items[existingItemIndex] = newCartItem;
      } else {
        // Add new item
        const newCartItem = createCartItem(menuItem, quantity, customizations);
        state.items.push(newCartItem);
      }

      // Recalculate totals
      const totals = calculateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;

      // Save to storage (async operation, but we don't await in reducer)
      storage.setCart(state.items);
    },

    updateQuantity: (state, action: PayloadAction<{
      menuItemId: string;
      customizations?: any;
      quantity: number;
    }>) => {
      const { menuItemId, customizations, quantity } = action.payload;
      
      const itemIndex = findCartItem(state.items, menuItemId, customizations);

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items.splice(itemIndex, 1);
        } else {
          // Update quantity and recalculate price
          const item = state.items[itemIndex];
          const updatedItem = createCartItem(item.menuItem, quantity, item.customizations);
          state.items[itemIndex] = updatedItem;
        }

        // Recalculate totals
        const totals = calculateCartTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;

        // Save to storage
        storage.setCart(state.items);
      }
    },

    removeFromCart: (state, action: PayloadAction<{
      menuItemId: string;
      customizations?: any;
    }>) => {
      const { menuItemId, customizations } = action.payload;
      
      const itemIndex = findCartItem(state.items, menuItemId, customizations);
      
      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);

        // Recalculate totals
        const totals = calculateCartTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;

        // Save to storage
        storage.setCart(state.items);
      }
    },

    incrementQuantity: (state, action: PayloadAction<{
      menuItemId: string;
      customizations?: any;
    }>) => {
      const { menuItemId, customizations } = action.payload;
      const itemIndex = findCartItem(state.items, menuItemId, customizations);
      
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        const newQuantity = item.quantity + 1;
        
        // Check max quantity limit (e.g., 10)
        if (newQuantity <= 10) {
          const updatedItem = createCartItem(item.menuItem, newQuantity, item.customizations);
          state.items[itemIndex] = updatedItem;

          // Recalculate totals
          const totals = calculateCartTotals(state.items);
          state.totalItems = totals.totalItems;
          state.totalAmount = totals.totalAmount;

          // Save to storage
          storage.setCart(state.items);
        }
      }
    },

    decrementQuantity: (state, action: PayloadAction<{
      menuItemId: string;
      customizations?: any;
    }>) => {
      const { menuItemId, customizations } = action.payload;
      const itemIndex = findCartItem(state.items, menuItemId, customizations);
      
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        const newQuantity = item.quantity - 1;
        
        if (newQuantity <= 0) {
          // Remove item if quantity becomes 0
          state.items.splice(itemIndex, 1);
        } else {
          const updatedItem = createCartItem(item.menuItem, newQuantity, item.customizations);
          state.items[itemIndex] = updatedItem;
        }

        // Recalculate totals
        const totals = calculateCartTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;

        // Save to storage
        storage.setCart(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      state.discountAmount = 0;
      state.promoCode = undefined;
      
      // Clear from storage
      storage.clearCart();
    },

    applyPromoCode: (state, action: PayloadAction<{
      code: string;
      discountAmount: number;
      discountPercentage?: number;
    }>) => {
      const { code, discountAmount, discountPercentage } = action.payload;
      
      state.promoCode = code;
      
      if (discountPercentage && discountPercentage > 0) {
        // Calculate percentage discount
        state.discountAmount = Math.min(
          (state.totalAmount * discountPercentage) / 100,
          discountAmount // Max discount cap
        );
      } else {
        // Fixed discount amount
        state.discountAmount = Math.min(discountAmount, state.totalAmount);
      }
    },

    removePromoCode: (state) => {
      state.promoCode = undefined;
      state.discountAmount = 0;
    },

    setDeliveryFee: (state, action: PayloadAction<number>) => {
      state.deliveryFee = action.payload;
    },

    updateCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = calculateCartTotals(action.payload);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },

    // Bulk operations
    addMultipleItems: (state, action: PayloadAction<{
      items: Array<{
        menuItem: MenuItem;
        quantity: number;
        customizations?: any;
      }>;
    }>) => {
      const { items } = action.payload;
      
      items.forEach(({ menuItem, quantity, customizations }) => {
        const existingItemIndex = findCartItem(state.items, menuItem.id, customizations);

        if (existingItemIndex >= 0) {
          // Update existing item
          const existingItem = state.items[existingItemIndex];
          const newQuantity = existingItem.quantity + quantity;
          const newCartItem = createCartItem(menuItem, newQuantity, customizations);
          state.items[existingItemIndex] = newCartItem;
        } else {
          // Add new item
          const newCartItem = createCartItem(menuItem, quantity, customizations);
          state.items.push(newCartItem);
        }
      });

      // Recalculate totals
      const totals = calculateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;

      // Save to storage
      storage.setCart(state.items);
    },

    // Reorder functionality
    reorderItems: (state, action: PayloadAction<CartItem[]>) => {
      // Clear current cart and add reorder items
      state.items = [...action.payload];
      
      // Recalculate totals
      const totals = calculateCartTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
      
      // Reset promo code when reordering
      state.promoCode = undefined;
      state.discountAmount = 0;

      // Save to storage
      storage.setCart(state.items);
    },
  },

  extraReducers: (builder) => {
    // Load cart from storage
    builder.addCase(loadCart.pending, (state) => {
      // Could add loading state if needed
    });
    
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.items = action.payload;
      const totals = calculateCartTotals(action.payload);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    });
    
    builder.addCase(loadCart.rejected, (state) => {
      // Handle error loading cart - keep current state or reset
      console.error('Failed to load cart from storage');
    });
  },
});

// Export actions
export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  applyPromoCode,
  removePromoCode,
  setDeliveryFee,
  updateCartFromStorage,
  addMultipleItems,
  reorderItems,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.totalAmount;
export const selectCartItemsCount = (state: { cart: CartState }) => state.cart.totalItems;
export const selectCartIsEmpty = (state: { cart: CartState }) => state.cart.items.length === 0;
export const selectCartFinalAmount = (state: { cart: CartState }) => 
  state.cart.totalAmount + state.cart.deliveryFee - state.cart.discountAmount;

// Get quantity of specific item in cart
export const selectItemQuantityInCart = (
  state: { cart: CartState }, 
  menuItemId: string, 
  customizations?: any
) => {
  const item = state.cart.items.find(
    item => 
      item.menuItem.id === menuItemId &&
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
  );
  return item ? item.quantity : 0;
};

export default cartSlice.reducer;