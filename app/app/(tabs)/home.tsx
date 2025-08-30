// app/(tabs)/home.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { api } from '../../services/api';
import { MenuItem } from '../../types/product';
import { addToCart } from '../../store/cartSlice';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import CategoryTabs from '../../components/product/CategoryTabs';
import ProductGrid from '../../components/product/ProductGrid';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
  
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchQuery]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await api.getMenu();
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        // Handle both string category and MenuCategory object
        const category = typeof product.category === 'string' 
          ? product.category 
          : product.category.name;
        return category.toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => {
        const category = typeof product.category === 'string' 
          ? product.category 
          : product.category.name;
        
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          category.toLowerCase().includes(query)
        );
      });
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleProductPress = (product: MenuItem) => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (product: MenuItem) => {
    // Actually add to cart instead of redirecting
    dispatch(addToCart({
      menuItem: product,
      quantity: 1,
      customizations: {
        spiceLevel: 'MEDIUM',
        extras: []
      }
    }));
    
    // Optional: Show a toast or confirmation message
    console.log('Added to cart:', product.name);
  };

  const getCartQuantity = (product: MenuItem) => {
    const cartItem = cartItems.find(item => 
      item.menuItem.id === product.id
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white">
        <Header title="Food App" />
        <LoadingSpinner message="Loading menu..." />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header title={`Hello, ${user?.name || 'Guest'}`} />
      
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Search Bar */}
        <SearchBar
          placeholder="Search for food..."
          onSearch={handleSearch}
          onClear={() => setSearchQuery('')}
        />

        {/* Category Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* Results Count */}
        <View className="px-4 py-2">
          <Text className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </Text>
        </View>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onProductPress={handleProductPress}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
          loading={isLoading}
        />

        {/* Empty State */}
        {filteredProducts.length === 0 && !isLoading && (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-500 text-lg">No products found</Text>
            <Text className="text-gray-400 mt-2">
              Try a different search or category
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}