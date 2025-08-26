// services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';
import { CartItem } from '../types/product';

const KEYS = {
  TOKEN: '@food_app_token',
  USER: '@food_app_user',
  CART: '@food_app_cart',
  ONBOARDING: '@food_app_onboarding',
} as const;

class StorageService {
  // Token management
  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.TOKEN, token);
    } catch (error) {
      console.error('Error storing token:', error);
      throw error;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(KEYS.TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(KEYS.TOKEN);
    } catch (error) {
      console.error('Error removing token:', error);
      throw error;
    }
  }

  // User data management
  async setUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user:', error);
      throw error;
    }
  }

  async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(KEYS.USER);
    } catch (error) {
      console.error('Error removing user:', error);
      throw error;
    }
  }

  // Cart management
  async setCart(cartItems: CartItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.CART, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error storing cart:', error);
      throw error;
    }
  }

  async getCart(): Promise<CartItem[]> {
    try {
      const cartData = await AsyncStorage.getItem(KEYS.CART);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  }

  async clearCart(): Promise<void> {
    try {
      await AsyncStorage.removeItem(KEYS.CART);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  // Onboarding status
  async setOnboardingComplete(): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.ONBOARDING, 'true');
    } catch (error) {
      console.error('Error setting onboarding status:', error);
      throw error;
    }
  }

  async isOnboardingComplete(): Promise<boolean> {
    try {
      const status = await AsyncStorage.getItem(KEYS.ONBOARDING);
      return status === 'true';
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  }

  // Generic storage methods
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

export const storage = new StorageService();