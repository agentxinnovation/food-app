// types/user.ts
export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    profilePicture?: string;
    addresses: Address[];
    paymentMethods: PaymentMethod[];
    codEnabled: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Address {
    id: string;
    type: 'HOME' | 'WORK' | 'OTHER';
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    isDefault: boolean;
  }
  
  export interface PaymentMethod {
    id: string;
    type: 'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD';
    details: string; // UPI ID or Card last 4 digits
    isDefault: boolean;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
  }