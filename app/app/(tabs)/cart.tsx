// app/(tabs)/cart.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../hooks/redux';
import { selectCartItems, selectCartTotal, selectCartFinalAmount } from '../../store/cartSlice';
import Header from '../../components/common/Header';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/ui/Button';

export default function CartScreen() {
  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal);
  const totalAmount = useAppSelector(selectCartFinalAmount);
  const deliveryFee = 30; // Fixed delivery fee for demo

  const handleCheckout = () => {
    router.push('/order/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/(tabs)/home');
  };

  if (cartItems.length === 0) {
    return (
      <View className="flex-1 bg-white">
        <Header title="Cart" showBackButton />
        <EmptyState
          title="Your cart is empty"
          description="Add some delicious food to get started!"
          actionLabel="Browse Menu"
          onAction={handleContinueShopping}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Cart" showBackButton />
      
      <ScrollView className="flex-1">
        <View className="p-4">
          {cartItems.map((item, index) => (
            <CartItem
              key={`${item.menuItem.id}-${index}`} // Use unique key
              item={item}
            />
          ))}
        </View>
      </ScrollView>

      <CartSummary
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discountAmount={0}
        totalAmount={totalAmount}
        onCheckout={handleCheckout}
        isCheckoutDisabled={cartItems.length === 0}
      />
    </View>
  );
}