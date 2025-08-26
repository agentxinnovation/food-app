// components/product/ProductCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
      <View style={styles.container}>
        {/* Product Image */}
        <Image
          source={{ 
            uri: item.image || 'https://via.placeholder.com/200x150/E5E5E5/999999?text=Food+Image'
          }}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Availability Badge */}
        {!item.isAvailable && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>Out of Stock</Text>
          </View>
        )}
        
        {/* Vegetarian Badge */}
        <View style={[styles.vegBadge, item.isVegetarian ? styles.vegBadgeGreen : styles.vegBadgeRed]}>
          <Text style={styles.vegIcon}>{item.isVegetarian ? '●' : '●'}</Text>
        </View>
        
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          
          {/* Price and Rating */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(item.price)}</Text>
            {item.rating && (
              <View style={styles.rating}>
                <Text style={styles.ratingText}>⭐ {item.rating.toFixed(1)}</Text>
              </View>
            )}
          </View>
          
          {/* Preparation Time */}
          <Text style={styles.prepTime}>🕒 {item.preparationTime} mins</Text>
          
          {/* Add to Cart Button */}
          <View style={styles.buttonContainer}>
            {cartQuantity > 0 ? (
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{cartQuantity}</Text>
                <TouchableOpacity style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Button
                title="Add to Cart"
                onPress={onAddToCart}
                size="small"
                disabled={!item.isAvailable}
                style={styles.addButton}
              />
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  unavailableBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  unavailableText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  vegBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  vegBadgeGreen: {
    borderWidth: 1,
    borderColor: '#34C759',
  },
  vegBadgeRed: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  vegIcon: {
    fontSize: 12,
    color: '#34C759',
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  prepTime: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 12,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  addButton: {
    width: '100%',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 20,
    textAlign: 'center',
  },
});

export default ProductCard;