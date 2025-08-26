// app/(tabs)/orders.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchMyOrders } from '../../store/ordersSlice';
import Header from '../../components/common/Header';
import OrderCard from '../../components/order/OrderCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function OrdersScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders, isLoading, error } = useAppSelector((state) => state.orders);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      await dispatch(fetchMyOrders()).unwrap();
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadOrders();
  };

  const handleOrderPress = (orderId: string) => {
    router.push(`/order/${orderId}`);
  };

  const handleBrowseMenu = () => {
    router.push('/(tabs)/home');
  };

  if (isLoading && !refreshing) {
    return (
      <View className="flex-1 bg-white">
        <Header title="My Orders" />
        <LoadingSpinner message="Loading orders..." />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="My Orders" />
      
      {error && (
        <View className="bg-red-50 p-4 mx-4 mt-4 rounded-lg">
          <Text className="text-red-600">{error}</Text>
        </View>
      )}

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View className="p-4">
          {orders.length === 0 ? (
            <EmptyState
              title="No orders yet"
              description="Your orders will appear here once you place an order"
              actionLabel="Browse Menu"
              onAction={handleBrowseMenu}
            />
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onPress={() => handleOrderPress(order.id)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}