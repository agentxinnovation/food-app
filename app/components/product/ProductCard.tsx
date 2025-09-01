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
        
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          
          {/* Price and Preparation Time */}
          <View style={styles.details}>
            <Text style={styles.price}>{formatCurrency(item.price)}</Text>
            <Text style={styles.prepTime}>🕒 {item.preparationTime} mins</Text>
          </View>
          
          {/* Add to Cart Button */}
          <View style={styles.buttonContainer}>
            {cartQuantity > 0 ? (
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{cartQuantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={(e:any) => {
                    e.stopPropagation(); // Prevent card press
                    onAddToCart();
                  }}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Button
                title="Add to Cart"
                onPress={(e:any) => {
                  e.stopPropagation(); // Prevent card press
                  onAddToCart();
                }}
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
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  prepTime: {
    fontSize: 12,
    color: '#8E8E93',
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