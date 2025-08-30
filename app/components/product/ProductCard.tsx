import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MenuItem } from '../../types/product';
import { formatCurrency } from '../../utils/helpers';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ProductCardProps {
  item: MenuItem;
  onPress: () => void;
  onAddToCart: () => void;
  cartQuantity?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onPress,
  onAddToCart,
  cartQuantity = 0,
}) => {
  return (
    <Card variant="elevated" padding="none" onPress={onPress}>
      <View className="relative">
        {/* Product Image */}
        <Image
          source={{ 
            uri: item.image || 'https://via.placeholder.com/200x150/E5E5E5/999999?text=Food+Image'
          }}
          className="w-full h-[150px] rounded-t-xl"
          resizeMode="cover"
        />
        
        {/* Availability Badge */}
        {!item.isAvailable && (
          <View className="absolute top-2 left-2 bg-red-500/90 px-2 py-1 rounded">
            <Text className="text-white text-xs font-semibold">Out of Stock</Text>
          </View>
        )}
        
        {/* Vegetarian Badge */}
        <View className={`absolute top-2 right-2 w-6 h-6 rounded bg-white justify-center items-center border ${item.isVegetarian ? 'border-green-500' : 'border-red-500'}`}>
          <Text className={`text-xs ${item.isVegetarian ? 'text-green-500' : 'text-green-500'}`}>●</Text>
        </View>
        
        {/* Content */}
        <View className="p-3">
          <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={2}>{item.name}</Text>
          <Text className="text-sm text-gray-500 mb-2 leading-5" numberOfLines={2}>{item.description}</Text>
          
          {/* Price and Rating */}
          <View className="flex-row justify-between items-center mb-1.5">
            <Text className="text-lg font-bold text-blue-500">{formatCurrency(item.price)}</Text>
            {item.rating && (
              <View className="flex-row items-center">
                <Text className="text-xs text-gray-500">⭐ {item.rating.toFixed(1)}</Text>
              </View>
            )}
          </View>
          
          {/* Preparation Time */}
          <Text className="text-xs text-gray-500 mb-3">🕒 {item.preparationTime} mins</Text>
          
          {/* Add to Cart Button */}
          <View className="items-center">
            {cartQuantity > 0 ? (
              <View className="flex-row items-center bg-blue-500 rounded-md py-2 px-4">
                <TouchableOpacity 
                  className="w-[30px] h-[30px] rounded-full bg-white/20 justify-center items-center"
                  onPress={() => console.log('Decrement')}
                >
                  <Text className="text-white text-lg font-semibold">−</Text>
                </TouchableOpacity>
                <Text className="mx-4 text-base font-semibold text-white min-w-[20px] text-center">{cartQuantity}</Text>
                <TouchableOpacity 
                  className="w-[30px] h-[30px] rounded-full bg-white/20 justify-center items-center"
                  onPress={onAddToCart}
                >
                  <Text className="text-white text-lg font-semibold">+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Button
                title="Add to Cart"
                onPress={onAddToCart}
                size="small"
                disabled={!item.isAvailable}
              />
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ProductCard;