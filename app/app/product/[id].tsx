import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../store/cartSlice';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/helpers';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'MILD' | 'MEDIUM' | 'HOT'>('MEDIUM');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Dummy product data - replace with your actual product structure
  const product = {
    itemId: id as string,
    name: 'Gujarati Thali',
    description: 'Traditional Gujarati thali with dal, kadhi, sabji, rotli, rice, and sweets. A complete meal that offers a perfect balance of flavors and nutrition.',
    price: 280,
    category: 'Gujarati',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop',
    isAvailable: true,
    preparationTime: 25,
    isVegetarian: true,
    rating: 4.5,
    reviewCount: 124,
    ingredients: ['Dal', 'Kadhi', '2 Sabjis', 'Rotli', 'Rice', 'Papad', 'Salad', 'Sweet'],
    nutritionInfo: {
      calories: 650,
      protein: 22,
      carbs: 95,
      fat: 18
    }
  };

  // Dummy extras options
  const extrasOptions = [
    { id: 'extra1', name: 'Extra Papad', price: 15 },
    { id: 'extra2', name: 'Extra Sweet', price: 25 },
    { id: 'extra3', name: 'Extra Buttermilk', price: 20 },
    { id: 'extra4', name: 'Extra Pickle', price: 10 }
  ];

  const handleAddToCart = () => {
    dispatch(addToCart({
      menuItem: product,
      quantity: quantity,
      customizations: {
        spiceLevel: spiceLevel,
        extras: selectedExtras
      }
    }));
    
    router.push('/(tabs)/cart');
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const getExtraPrice = (extraId: string) => {
    const extra = extrasOptions.find(e => e.id === extraId);
    return extra ? extra.price : 0;
  };

  const calculateTotalPrice = () => {
    const basePrice = product.price * quantity;
    const extrasPrice = selectedExtras.reduce((total, extraId) => 
      total + (getExtraPrice(extraId) * quantity), 0
    );
    return basePrice + extrasPrice;
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Product Details" showBackButton />
      
      <ScrollView className="flex-1">
        {/* Product Image */}
        <Image
          source={{ uri: product.imageUrl }}
          className="w-full h-64"
          resizeMode="cover"
        />
        
        {/* Product Info */}
        <View className="p-4 bg-white">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-bold text-gray-900 flex-1 mr-2">
              {product.name}
            </Text>
            <Text className="text-2xl font-bold text-blue-600">
              {formatCurrency(product.price)}
            </Text>
          </View>
          
          <Text className="text-gray-600 text-base mb-3">
            {product.description}
          </Text>
          
          <View className="flex-row items-center mb-4">
            <View className="flex-row items-center mr-4">
              <Text className="text-yellow-500 text-lg">⭐</Text>
              <Text className="text-gray-600 ml-1">
                {product.rating} ({product.reviewCount} reviews)
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-400">🕒</Text>
              <Text className="text-gray-600 ml-1">
                {product.preparationTime} mins
              </Text>
            </View>
          </View>
          
          {product.isVegetarian && (
            <View className="bg-green-100 px-3 py-1 rounded-full self-start mb-4">
              <Text className="text-green-800 text-sm">🟢 Vegetarian</Text>
            </View>
          )}
        </View>

        {/* Customization Section */}
        <View className="p-4 bg-white mt-2">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Customize your order
          </Text>

          {/* Spice Level */}
          <View className="mb-6">
            <Text className="text-lg font-medium text-gray-800 mb-3">
              Spice Level 🌶️
            </Text>
            <View className="flex-row space-x-3">
              {(['MILD', 'MEDIUM', 'HOT'] as const).map((level) => (
                <TouchableOpacity
                  key={level}
                  className={`px-4 py-2 rounded-full border ${
                    spiceLevel === level
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-gray-100 border-gray-300'
                  }`}
                  onPress={() => setSpiceLevel(level)}
                >
                  <Text className={
                    spiceLevel === level 
                      ? 'text-blue-700 font-medium' 
                      : 'text-gray-600'
                  }>
                    {level.charAt(0) + level.slice(1).toLowerCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Extras */}
          <View className="mb-6">
            <Text className="text-lg font-medium text-gray-800 mb-3">
              Add Extras (+)
            </Text>
            <View className="space-y-2">
              {extrasOptions.map((extra) => (
                <TouchableOpacity
                  key={extra.id}
                  className={`flex-row justify-between items-center p-3 rounded-lg border ${
                    selectedExtras.includes(extra.id)
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  onPress={() => toggleExtra(extra.id)}
                >
                  <Text className="text-gray-800">{extra.name}</Text>
                  <Text className="text-blue-600 font-medium">
                    +{formatCurrency(extra.price)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selector */}
          <View className="mb-6">
            <Text className="text-lg font-medium text-gray-800 mb-3">
              Quantity
            </Text>
            <View className="flex-row items-center justify-between bg-gray-100 rounded-lg p-3">
              <TouchableOpacity
                className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-300"
                onPress={handleDecrement}
                disabled={quantity <= 1}
              >
                <Text className="text-xl text-gray-600">−</Text>
              </TouchableOpacity>
              
              <Text className="text-xl font-bold text-gray-900 mx-4">
                {quantity}
              </Text>
              
              <TouchableOpacity
                className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-300"
                onPress={handleIncrement}
                disabled={quantity >= 10}
              >
                <Text className="text-xl text-gray-600">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Nutrition Info */}
        <View className="p-4 bg-white mt-2">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Nutrition Information
          </Text>
          <View className="grid grid-cols-2 gap-3">
            <View className="bg-blue-50 p-3 rounded-lg">
              <Text className="text-blue-800 font-medium">Calories</Text>
              <Text className="text-2xl font-bold text-blue-900">{product.nutritionInfo.calories}</Text>
            </View>
            <View className="bg-green-50 p-3 rounded-lg">
              <Text className="text-green-800 font-medium">Protein</Text>
              <Text className="text-2xl font-bold text-green-900">{product.nutritionInfo.protein}g</Text>
            </View>
            <View className="bg-yellow-50 p-3 rounded-lg">
              <Text className="text-yellow-800 font-medium">Carbs</Text>
              <Text className="text-2xl font-bold text-yellow-900">{product.nutritionInfo.carbs}g</Text>
            </View>
            <View className="bg-red-50 p-3 rounded-lg">
              <Text className="text-red-800 font-medium">Fat</Text>
              <Text className="text-2xl font-bold text-red-900">{product.nutritionInfo.fat}g</Text>
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <View className="p-4 bg-white mt-2 mb-4">
          <Text className="text-xl font-semibold text-gray-900 mb-3">
            What's Included
          </Text>
          <View className="flex-row flex-wrap">
            {product.ingredients.map((ingredient, index) => (
              <View key={index} className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-gray-700 text-sm">{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-gray-900">Total</Text>
          <Text className="text-2xl font-bold text-blue-600">
            {formatCurrency(calculateTotalPrice())}
          </Text>
        </View>
        
        <Button
          title={`Add to Cart • ${formatCurrency(calculateTotalPrice())}`}
          onPress={handleAddToCart}
          size="large"
          disabled={!product.isAvailable}
        />
        
        {!product.isAvailable && (
          <Text className="text-red-500 text-center mt-2">
            Currently unavailable
          </Text>
        )}
      </View>
    </View>
  );
}