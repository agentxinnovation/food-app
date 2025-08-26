// app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutUser } from '../../store/authSlice';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      // Navigation will be handled by the index screen
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAddressManagement = () => {
    router.push('/profile/address');
  };

  const handleOrderHistory = () => {
    router.push('/(tabs)/orders');
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Profile" />
      
      <ScrollView className="flex-1">
        {/* User Info Card */}
        <View className="bg-white p-6 mx-4 mt-4 rounded-lg shadow-sm">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-3">
              <Ionicons name="person" size={32} color="#007AFF" />
            </View>
            <Text className="text-2xl font-bold text-gray-900">{user?.name}</Text>
            <Text className="text-gray-600">{user?.email}</Text>
            <Text className="text-gray-600">{user?.phone}</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View className="mx-4 mt-6">
          <TouchableOpacity
            className="bg-white p-4 rounded-lg mb-3 flex-row items-center justify-between"
            onPress={handleOrderHistory}
          >
            <View className="flex-row items-center">
              <Ionicons name="list" size={24} color="#007AFF" className="mr-3" />
              <Text className="text-lg text-gray-900">Order History</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-4 rounded-lg mb-3 flex-row items-center justify-between"
            onPress={handleAddressManagement}
          >
            <View className="flex-row items-center">
              <Ionicons name="location" size={24} color="#007AFF" className="mr-3" />
              <Text className="text-lg text-gray-900">Address Book</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-4 rounded-lg mb-3 flex-row items-center justify-between"
            onPress={() => console.log('Payment Methods')}
          >
            <View className="flex-row items-center">
              <Ionicons name="card" size={24} color="#007AFF" className="mr-3" />
              <Text className="text-lg text-gray-900">Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-4 rounded-lg mb-3 flex-row items-center justify-between"
            onPress={() => console.log('Settings')}
          >
            <View className="flex-row items-center">
              <Ionicons name="settings" size={24} color="#007AFF" className="mr-3" />
              <Text className="text-lg text-gray-900">Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View className="mx-4 mt-8 mb-8">
          <Button
            title="Logout"
            variant="danger"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </View>
  );
}