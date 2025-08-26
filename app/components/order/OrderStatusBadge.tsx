// components/order/OrderStatusBadge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OrderStatus } from '../../types/order';
import { getOrderStatusLabel } from '../../utils/helpers';
import { ORDER_STATUS_COLORS } from '../../utils/constants';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'small' | 'medium' | 'large';
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  size = 'medium',
}) => {
  return (
    <View style={[styles.container, styles[size]]}>
      <View 
        style={[
          styles.statusDot,
          { backgroundColor: ORDER_STATUS_COLORS[status] }
        ]} 
      />
      <Text style={[styles.statusText, styles[`${size}Text`]]}>
        {getOrderStatusLabel(status)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontWeight: '500',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});

export default OrderStatusBadge;