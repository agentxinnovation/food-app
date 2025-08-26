// components/cart/CartSummary.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../../utils/helpers';
import Button from '../ui/Button';

interface CartSummaryProps {
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  onCheckout: () => void;
  isLoading?: boolean;
  isCheckoutDisabled?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  deliveryFee,
  discountAmount,
  totalAmount,
  onCheckout,
  isLoading = false,
  isCheckoutDisabled = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>
          {deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}
        </Text>
      </View>
      
      {discountAmount > 0 && (
        <View style={styles.summaryRow}>
          <Text style={[styles.label, styles.discountText]}>Discount</Text>
          <Text style={[styles.value, styles.discountText]}>
            -{formatCurrency(discountAmount)}
          </Text>
        </View>
      )}
      
      <View style={styles.divider} />
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
      </View>
      
      <Button
        title="Proceed to Checkout"
        onPress={onCheckout}
        loading={isLoading}
        disabled={isCheckoutDisabled || isLoading}
        style={styles.checkoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#8E8E93',
  },
  value: {
    fontSize: 16,
    color: '#1D1D1F',
    fontWeight: '500',
  },
  discountText: {
    color: '#34C759',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E7',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  checkoutButton: {
    marginTop: 8,
  },
});

export default CartSummary;