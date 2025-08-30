// utils/helpers.ts
import { OrderStatus } from '../types/order';
import { APP_CONFIG, ORDER_STATUS_LABELS } from './constants';

// Format currency
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

// Format date and time
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateTime = (dateString: string): string => {
  return `${formatDate(dateString)} at ${formatTime(dateString)}`;
};

// Time calculations
export const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return formatDate(dateString);
};

export const getEstimatedTime = (preparationTime: number): string => {
  const totalTime = preparationTime + APP_CONFIG.PREPARATION_TIME_BUFFER;
  if (totalTime < 60) return `${totalTime} mins`;
  
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;
  
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} mins`;
};

// String utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD${timestamp}${random}`;
};

// Order status helpers
export const getOrderStatusLabel = (status: OrderStatus): string => {
  return ORDER_STATUS_LABELS[status] || status;
};

export const isActiveOrder = (status: OrderStatus): boolean => {
  return !['COMPLETED', 'CANCELLED', 'REJECTED'].includes(status);
};

export const getOrderProgress = (status: OrderStatus): number => {
  const statusOrder = ['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED'];
  const currentIndex = statusOrder.indexOf(status);
  return currentIndex >= 0 ? ((currentIndex + 1) / statusOrder.length) * 100 : 0;
};

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Cart calculations
export const calculateDeliveryFee = (subtotal: number): number => {
  return subtotal >= APP_CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : APP_CONFIG.DEFAULT_DELIVERY_FEE;
};

export const calculateTotalAmount = (
  subtotal: number,
  deliveryFee: number,
  discountAmount: number = 0
): number => {
  return subtotal + deliveryFee - discountAmount;
};

// Image helpers
export const getImageUri = (imagePath: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://131.153.22.191:8081/uploads/${imagePath}`;
};

export const getPlaceholderImage = (type: 'food' | 'user' | 'empty' = 'food'): string => {
  const placeholders = {
    food: 'https://via.placeholder.com/300x200/E5E5E5/999999?text=Food+Image',
    user: 'https://via.placeholder.com/100x100/E5E5E5/999999?text=User',
    empty: 'https://via.placeholder.com/200x200/E5E5E5/999999?text=No+Image',
  };
  return placeholders[type];
};

// Array helpers
export const groupBy = <T>(array: T[], key: keyof T): { [key: string]: T[] } => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as { [key: string]: T[] });
};

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Debounce helper
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
};

// Error handling
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return 'An unexpected error occurred';
};