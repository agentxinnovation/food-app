import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MenuItem } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: MenuItem[];
  onProductPress: (product: MenuItem) => void;
  onAddToCart: (product: MenuItem) => void;
  cartQuantityMap: Record<string, number>;
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductPress,
  onAddToCart,
  cartQuantityMap,
  loading = false,
}) => {
  const keyExtractor = (item: MenuItem, index: number) => {
    return `${item.itemId}-${index}`;
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      <ProductCard
        item={item}
        onPress={() => onProductPress(item)}
        onAddToCart={() => onAddToCart(item)}
        cartQuantity={cartQuantityMap[item.itemId] || 0}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
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
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemContainer: {
    flex: 1,
    maxWidth: '48%',
    marginHorizontal: 4,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default ProductGrid;