// app/index.tsx - Simple version that always goes to home after 2 seconds
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Index() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Set a timer for splash screen (2 seconds)
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      // Always redirect to home after splash
      router.replace('/(tabs)/home');
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, [router]);

  // Show splash screen for 2 seconds
  if (showSplash) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-600">
        <LoadingSpinner 
          size="large" 
          color="#FFFFFF" 
          message="Food App" 
          fullScreen 
        />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <LoadingSpinner size="large" message="Redirecting..." />
    </View>
  );
}