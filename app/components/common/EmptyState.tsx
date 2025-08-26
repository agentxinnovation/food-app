// components/common/EmptyState.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  image?: any;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  image,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          style={styles.actionButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1D1F',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  actionButton: {
    minWidth: 200,
  },
});

export default EmptyState;