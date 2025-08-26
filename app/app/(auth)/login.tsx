// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store';
import { validateLogin } from '../../utils/validation';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
      dispatch(clearError());
    }
  };

  const handleLogin = async () => {
    const validation = validateLogin(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await dispatch(loginUser(formData)).unwrap();
      router.replace('/(tabs)/home');
      // Navigation is handled by the index file based on auth state
    } catch (error) {
      // Error is handled by the slice
      console.error('Login failed:', error);
    }
  };

  const navigateToRegister = () => {
    router.push('/(auth)/register');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 justify-center">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              Sign in to continue your food journey
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {error && (
              <View className="bg-red-50 p-3 rounded-lg border border-red-200">
                <Text className="text-red-600 text-sm">{error}</Text>
              </View>
            )}
            
            {errors.map((errorMsg, index) => (
              <View key={index} className="bg-red-50 p-3 rounded-lg border border-red-200">
                <Text className="text-red-600 text-sm">{errorMsg}</Text>
              </View>
            ))}

            <Input
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              className="bg-gray-50"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
              autoComplete="password"
              className="bg-gray-50"
            />

            <Button
              title={isLoading ? "Signing in..." : "Sign In"}
              onPress={handleLogin}
              disabled={isLoading}
              loading={isLoading}
              
            />
          </View>

          {/* Footer */}
          <View className="mt-8 items-center">
            <Text className="text-gray-600">
              Don't have an account?{' '}
              <TouchableOpacity onPress={navigateToRegister}>
                <Text className="text-blue-600 font-semibold">Sign up</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}