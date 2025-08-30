import React from 'react';
import { FlatList, View } from 'react-native';
import { MenuItem, CartItem } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: MenuItem[];
  onProductPress: (product: MenuItem) => void;
  onAddToCart: (product: MenuItem) => void;
  cartItems: CartItem[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductPress,
  onAddToCart,
  cartItems,
  loading = false,
}) => {
  // Create unique keys by combining itemId and index
  const keyExtractor = (item: MenuItem, index: number) => {
    return `${item.id}-${index}`;
  };

  // Get quantity for each product
  const getProductQuantity = (product: MenuItem) => {
    const cartItem = cartItems.find(item => 
      item.menuItem.id === product.id
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View className="flex-1 max-w-[48%] mx-1">
      <ProductCard
        item={item}
        onPress={() => onProductPress(item)}
        onAddToCart={() => onAddToCart(item)}
        cartQuantity={getProductQuantity(item)}
      />
    </View>
  );

  if (loading) {
    return (
      <View className="p-4 items-center">
        {/* Loading skeleton or spinner */}
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={{ padding: 8 }}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProductGrid;