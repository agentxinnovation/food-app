// app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Set navigation as ready after a small delay
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      {isNavigationReady && (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="order/checkout" />
          <Stack.Screen name="order/confirmation" />
          <Stack.Screen name="order/tracking" />
          <Stack.Screen name="order/[id]" />
          <Stack.Screen name="profile/address" />
        </Stack>
      )}
    </Provider>
  );
}