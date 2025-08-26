// services/auth.ts
import { LoginRequest, RegisterRequest } from '../types/api';
import { User } from '../types/user';
import { storage } from './storage';

export class AuthService {
  async login(credentials: LoginRequest) {
    try {
      console.log('Attempting login with:', credentials.email);
      
      // Make raw fetch request to avoid API service issues
      const response = await fetch('https://food.loca.lt/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        // Handle successful login
        if (data.user && data.authToken) {
          const { user, authToken } = data;
          
          // Store token and user data
          await storage.setToken(authToken);
          await storage.setUser(user);
          
          console.log('Login successful, token stored');
          return { user, token: authToken };
        }
        
        // Handle different response format
        if (data.data?.user && data.data?.authToken) {
          const { user, authToken } = data.data;
          await storage.setToken(authToken);
          await storage.setUser(user);
          return { user, token: authToken };
        }
        
        // Handle case where token is named differently
        const token = data.token || data.authToken || data.accessToken;
        const user = data.user || data.data;
        
        if (user && token) {
          await storage.setToken(token);
          await storage.setUser(user);
          return { user, token };
        }
      }

      // If we get here, throw the error message
      throw new Error(data.message || 'Login failed');
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Special handling for success messages
      if (error.message?.toLowerCase().includes('success')) {
        console.log('Success message received as error, attempting recovery...');
        
        try {
          // Check if we have stored data from a previous successful login
          const token = await storage.getToken();
          const user = await storage.getUser();
          
          if (token && user) {
            console.log('Found stored credentials, login successful');
            return { user, token };
          }
          
          // If no stored data, try to parse the success message
          throw new Error('Login appeared successful but no credentials received');
        } catch (recoveryError) {
          console.error('Recovery failed:', recoveryError);
        }
      }
      
      throw error;
    }
  }

  async register(userData: RegisterRequest) {
    try {
      console.log('Attempting registration with:', userData.email);
      
      const response = await fetch('https://food.loca.lt/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Register response:', data);

      if (response.ok) {
        // Handle successful registration
        if (data.user && (data.token || data.authToken)) {
          const token = data.token || data.authToken;
          const { user } = data;
          
          await storage.setToken(token);
          await storage.setUser(user);
          return { user, token };
        }
        
        // Auto-login after successful registration
        if (data.message?.toLowerCase().includes('success')) {
          console.log('Registration successful, attempting auto-login...');
          return await this.login({
            email: userData.email,
            password: userData.password,
          });
        }
      }

      throw new Error(data.message || 'Registration failed');
      
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await storage.removeToken();
      await storage.removeUser();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = await storage.getToken();
      if (!token) {
        console.log('No token found for getCurrentUser');
        return null;
      }

      // Use raw fetch to avoid circular issues
      const response = await fetch('https://food.loca.lt/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          await storage.setUser(data.user);
          return data.user;
        }
      }
      
      // If profile fetch fails, check if we have stored user
      const storedUser = await storage.getUser();
      if (storedUser) {
        return storedUser;
      }
      
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await storage.getToken();
      if (!token) return false;
      
      // Quick validation by checking if token exists and user data is available
      const user = await storage.getUser();
      return !!user;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }

  async updateProfile(userData: Partial<User>) {
    try {
      const token = await storage.getToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch('https://food.loca.lt/auth/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (response.ok && data.user) {
        await storage.setUser(data.user);
        return data.user;
      }
      
      throw new Error(data.message || 'Profile update failed');
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();