// app/(auth)/register.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store';
import { validateRegister } from '../../utils/validation';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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

  const handleRegister = async () => {
    const validation = validateRegister(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await dispatch(registerUser(registerData)).unwrap();
      // Navigation is handled by the index file based on auth state
    } catch (error) {
      // Error is handled by the slice
      console.error('Registration failed:', error);
    }
  };

  const navigateToLogin = () => {
    router.push('/(auth)/login');
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
        <View className="flex-1 px-6 justify-center py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              Join us and start your food journey
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
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              autoCapitalize="words"
              className="bg-gray-50"
            />

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
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
              maxLength={10}
              className="bg-gray-50"
            />

            <Input
              label="Password"
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
              autoComplete="new-password"
              className="bg-gray-50"
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry
              autoComplete="new-password"
              className="bg-gray-50"
            />

            <Button
              title={isLoading ? "Creating Account..." : "Create Account"}
              onPress={handleRegister}
              disabled={isLoading}
              loading={isLoading}
              
            />
          </View>

          {/* Footer */}
          <View className="mt-8 items-center">
            <Text className="text-gray-600">
              Already have an account?{' '}
              <TouchableOpacity onPress={navigateToLogin}>
                <Text className="text-blue-600 font-semibold">Sign in</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}