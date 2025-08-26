// components/order/OrderCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Order } from '../../types/order';
import { formatCurrency, formatDate, getOrderStatusLabel } from '../../utils/helpers';
import { ORDER_STATUS_COLORS } from '../../utils/constants';
import Card from '../ui/Card';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  return (
    <Card variant="elevated" padding="medium" onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
          <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusBadge,
                { backgroundColor: ORDER_STATUS_COLORS[order.status] }
              ]}
            />
            <Text style={styles.statusText}>
              {getOrderStatusLabel(order.status)}
            </Text>
          </View>
          
          <Text style={styles.itemsText}>
            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.totalAmount}>
            {formatCurrency(order.finalAmount)}
          </Text>
          
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.viewDetails}>View Details →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  date: {
    fontSize: 14,
    color: '#8E8E93',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemsText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
    paddingTop: 12,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  viewDetails: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default OrderCard;