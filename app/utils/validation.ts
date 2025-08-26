// utils/validation.ts
import { ERROR_MESSAGES } from './constants';
import { isValidEmail, isValidPhone, isValidPassword } from './helpers';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AddressFormData {
  type: 'HOME' | 'WORK' | 'OTHER';
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

// Login validation
export const validateLogin = (data: LoginFormData): ValidationResult => {
  const errors: string[] = [];

  // Email validation
  if (!data.email.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push(ERROR_MESSAGES.INVALID_EMAIL);
  }

  // Password validation
  if (!data.password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Registration validation
export const validateRegister = (data: RegisterFormData): ValidationResult => {
  const errors: string[] = [];

  // Name validation
  if (!data.name.trim()) {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  // Email validation
  if (!data.email.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push(ERROR_MESSAGES.INVALID_EMAIL);
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.push('Phone number is required');
  } else if (!isValidPhone(data.phone)) {
    errors.push('Please enter a valid 10-digit phone number');
  }

  // Password validation
  if (!data.password) {
    errors.push('Password is required');
  } else if (!isValidPassword(data.password)) {
    errors.push(ERROR_MESSAGES.WEAK_PASSWORD);
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.push('Please confirm your password');
  } else if (data.password !== data.confirmPassword) {
    errors.push(ERROR_MESSAGES.PASSWORDS_DONT_MATCH);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Address validation
export const validateAddress = (data: AddressFormData): ValidationResult => {
  const errors: string[] = [];

  // Type validation
  if (!data.type) {
    errors.push('Address type is required');
  }

  // Address line 1 validation
  if (!data.addressLine1.trim()) {
    errors.push('Address line 1 is required');
  } else if (data.addressLine1.trim().length < 5) {
    errors.push('Address must be at least 5 characters');
  }

  // City validation
  if (!data.city.trim()) {
    errors.push('City is required');
  } else if (data.city.trim().length < 2) {
    errors.push('City must be at least 2 characters');
  }

  // State validation
  if (!data.state.trim()) {
    errors.push('State is required');
  } else if (data.state.trim().length < 2) {
    errors.push('State must be at least 2 characters');
  }

  // Pincode validation
  if (!data.pincode.trim()) {
    errors.push('Pincode is required');
  } else if (!/^\d{6}$/.test(data.pincode)) {
    errors.push('Pincode must be 6 digits');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Profile validation
export const validateProfile = (data: {
  name: string;
  email: string;
  phone: string;
}): ValidationResult => {
  const errors: string[] = [];

  // Name validation
  if (!data.name.trim()) {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  // Email validation
  if (!data.email.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push(ERROR_MESSAGES.INVALID_EMAIL);
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.push('Phone number is required');
  } else if (!isValidPhone(data.phone)) {
    errors.push('Please enter a valid 10-digit phone number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Checkout validation
export const validateCheckout = (data: {
  deliveryAddress?: string;
  pickupTime?: string;
  paymentMethod: string;
}): ValidationResult => {
  const errors: string[] = [];

  // Payment method validation
  if (!data.paymentMethod) {
    errors.push('Payment method is required');
  }

  // Pickup time validation (if provided)
  if (data.pickupTime) {
    const pickupDate = new Date(data.pickupTime);
    const now = new Date();
    
    if (pickupDate <= now) {
      errors.push('Pickup time must be in the future');
    }
    
    // Check if pickup time is within business hours (example: 9 AM - 10 PM)
    const hours = pickupDate.getHours();
    if (hours < 9 || hours > 22) {
      errors.push('Pickup time must be between 9:00 AM and 10:00 PM');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Search validation
export const validateSearch = (query: string): ValidationResult => {
  const errors: string[] = [];
  const trimmedQuery = query.trim();

  if (trimmedQuery.length > 0 && trimmedQuery.length < 2) {
    errors.push('Search query must be at least 2 characters');
  }

  if (trimmedQuery.length > 100) {
    errors.push('Search query is too long');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Quantity validation
export const validateQuantity = (quantity: number, maxQuantity: number = 10): ValidationResult => {
  const errors: string[] = [];

  if (quantity < 1) {
    errors.push('Quantity must be at least 1');
  }

  if (quantity > maxQuantity) {
    errors.push(`Maximum quantity is ${maxQuantity}`);
  }

  if (!Number.isInteger(quantity)) {
    errors.push('Quantity must be a whole number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Generic field validation
export const validateRequired = (value: any, fieldName: string): ValidationResult => {
  const errors: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push(`${fieldName} is required`);
  }

  if (typeof value === 'string' && !value.trim()) {
    errors.push(`${fieldName} is required`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Combine multiple validations
export const combineValidations = (...validations: ValidationResult[]): ValidationResult => {
  const allErrors = validations.flatMap(v => v.errors);
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
};