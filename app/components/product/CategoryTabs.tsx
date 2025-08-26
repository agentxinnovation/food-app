// components/product/CategoryTabs.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FOOD_CATEGORIES } from '../../utils/constants';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* All Items Tab */}
        <TouchableOpacity
          style={[
            styles.tab,
            selectedCategory === 'all' && styles.selectedTab,
          ]}
          onPress={() => onCategorySelect('all')}
        >
          <Text style={styles.tabEmoji}>🍽️</Text>
          <Text style={[
            styles.tabText,
            selectedCategory === 'all' && styles.selectedTabText,
          ]}>
            All
          </Text>
        </TouchableOpacity>

        {/* Category Tabs */}
        {FOOD_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.tab,
              selectedCategory === category.id && styles.selectedTab,
            ]}
            onPress={() => onCategorySelect(category.id)}
          >
            <Text style={styles.tabEmoji}>{category.emoji}</Text>
            <Text style={[
              styles.tabText,
              selectedCategory === category.id && styles.selectedTabText,
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    minWidth: 80,
  },
  selectedTab: {
    backgroundColor: '#007AFF',
  },
  tabEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
  },
  selectedTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CategoryTabs;