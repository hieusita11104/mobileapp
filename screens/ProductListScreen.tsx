import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ProductContext } from '../context/ProductContext';
import SearchBar from '../components/SearchBar';
import ProductItem from '../components/ProductItem';
import { sortProducts } from '../utils/helpers';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const { products, deleteProduct } = useContext(ProductContext);
  const navigation = useNavigation<NavigationProp>();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedProducts = sortOrder ? sortProducts(filteredProducts, sortOrder) : filteredProducts;

  const handleDelete = (id: number) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này?', [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        onPress: () => {
          deleteProduct(id);
          Alert.alert('Thành công', 'Xóa sản phẩm thành công.');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortOrder === 'asc' && styles.activeSortButton]}
          onPress={() => setSortOrder('asc')}
        >
          <Text style={styles.sortButtonText}>Giá tăng dần</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortOrder === 'desc' && styles.activeSortButton]}
          onPress={() => setSortOrder('desc')}
        >
          <Text style={styles.sortButtonText}>Giá giảm dần</Text>
        </TouchableOpacity>
      </View>
      <ProductItem
        products={sortedProducts}
        onSelect={(product) => navigation.navigate('ProductDetail', { product })}
        onDelete={handleDelete}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f1de',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 16,
    textAlign: 'center',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sortButton: {
    backgroundColor: '#2a9d8f',
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeSortButton: {
    backgroundColor: '#1d6f66',
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#2a9d8f',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});