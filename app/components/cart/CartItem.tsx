// components/cart/CartItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CartItem as CartItemType } from '../../types/product';
import { formatCurrency } from '../../utils/helpers';
import Button from '../ui/Button';

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ 
          uri: item.menuItem.image || 'https://via.placeholder.com/80x80/E5E5E5/999999?text=Food'
        }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{item.menuItem.name}</Text>
        <Text style={styles.price}>{formatCurrency(item.totalPrice)}</Text>
        
        {item.customizations && (
          <View style={styles.customizations}>
            {item.customizations.spiceLevel && (
              <Text style={styles.customizationText}>
                Spice: {item.customizations.spiceLevel.toLowerCase()}
              </Text>
            )}
            {item.customizations.extras && item.customizations.extras.length > 0 && (
              <Text style={styles.customizationText}>
                Extras: {item.customizations.extras.join(', ')}
              </Text>
            )}
          </View>
        )}
      </View>
      
      <View style={styles.actions}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={onDecrement}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={onIncrement}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <Button
          title="Remove"
          variant="danger"
          size="small"
          onPress={onRemove}
          style={styles.removeButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  customizations: {
    marginTop: 4,
  },
  customizationText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 2,
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    minWidth: 80,
  },
});

export default CartItem;