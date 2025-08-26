// utils/constants.ts
export const API_CONFIG = {
    BASE_URL: 'https://food.loca.lt',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  } as const;
  
  export const STORAGE_KEYS = {
    TOKEN: '@food_app_token',
    USER: '@food_app_user',
    CART: '@food_app_cart',
    ONBOARDING: '@food_app_onboarding',
  } as const;
  
  export const FOOD_CATEGORIES = [
    { id: 'gujarati', name: 'Gujarati', emoji: '🍛' },
    { id: 'punjabi', name: 'Punjabi', emoji: '🍜' },
    { id: 'chinese', name: 'Chinese', emoji: '🥢' },
    { id: 'beverages', name: 'Beverages', emoji: '🧃' },
    { id: 'desserts', name: 'Desserts', emoji: '🍰' },
  ] as const;
  
  export const ORDER_STATUS = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED', 
    PREPARING: 'PREPARING',
    READY: 'READY',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    REJECTED: 'REJECTED',
  } as const;
  
  export const ORDER_STATUS_LABELS = {
    [ORDER_STATUS.PENDING]: 'Order Placed',
    [ORDER_STATUS.ACCEPTED]: 'Order Accepted',
    [ORDER_STATUS.PREPARING]: 'Preparing',
    [ORDER_STATUS.READY]: 'Ready for Pickup',
    [ORDER_STATUS.COMPLETED]: 'Completed',
    [ORDER_STATUS.CANCELLED]: 'Cancelled',
    [ORDER_STATUS.REJECTED]: 'Rejected',
  } as const;
  
  export const ORDER_STATUS_COLORS = {
    [ORDER_STATUS.PENDING]: '#FFA500',
    [ORDER_STATUS.ACCEPTED]: '#4169E1',
    [ORDER_STATUS.PREPARING]: '#FF6347',
    [ORDER_STATUS.READY]: '#32CD32',
    [ORDER_STATUS.COMPLETED]: '#228B22',
    [ORDER_STATUS.CANCELLED]: '#DC143C',
    [ORDER_STATUS.REJECTED]: '#DC143C',
  } as const;
  
  export const PAYMENT_METHODS = {
    COD: 'COD',
    UPI: 'UPI',
    CREDIT_CARD: 'CREDIT_CARD',
  } as const;
  
  export const PAYMENT_METHOD_LABELS = {
    [PAYMENT_METHODS.COD]: 'Cash on Delivery',
    [PAYMENT_METHODS.UPI]: 'UPI Payment',
    [PAYMENT_METHODS.CREDIT_CARD]: 'Credit Card',
  } as const;
  
  export const SPICE_LEVELS = {
    MILD: 'MILD',
    MEDIUM: 'MEDIUM',
    HOT: 'HOT',
  } as const;
  
  export const SPICE_LEVEL_LABELS = {
    [SPICE_LEVELS.MILD]: 'Mild 🌶️',
    [SPICE_LEVELS.MEDIUM]: 'Medium 🌶️🌶️',
    [SPICE_LEVELS.HOT]: 'Hot 🌶️🌶️🌶️',
  } as const;
  
  export const APP_CONFIG = {
    DEFAULT_DELIVERY_FEE: 30,
    FREE_DELIVERY_THRESHOLD: 299,
    MIN_ORDER_AMOUNT: 99,
    MAX_QUANTITY_PER_ITEM: 10,
    PREPARATION_TIME_BUFFER: 5, // minutes
  } as const;
  
  export const SCREEN_NAMES = {
    // Auth
    LOGIN: 'login',
    REGISTER: 'register',
    
    // Tabs
    HOME: 'home',
    CART: 'cart',
    ORDERS: 'orders',
    PROFILE: 'profile',
    
    // Other screens
    PRODUCT_DETAIL: 'product/[id]',
    CHECKOUT: 'order/checkout',
    ORDER_CONFIRMATION: 'order/confirmation',
    ORDER_TRACKING: 'order/tracking',
    ORDER_DETAIL: 'order/[id]',
    ADDRESS_MANAGEMENT: 'profile/address',
  } as const;
  
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    USER_EXISTS: 'User already exists with this email.',
    REQUIRED_FIELDS: 'Please fill all required fields.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    WEAK_PASSWORD: 'Password must be at least 6 characters.',
    PASSWORDS_DONT_MATCH: "Passwords don't match.",
    CART_EMPTY: 'Your cart is empty.',
    INSUFFICIENT_AMOUNT: `Minimum order amount is ₹${APP_CONFIG.MIN_ORDER_AMOUNT}.`,
  } as const;
  
  export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Welcome back!',
    REGISTER_SUCCESS: 'Account created successfully!',
    ORDER_PLACED: 'Order placed successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    ADDRESS_SAVED: 'Address saved successfully!',
  } as const;