import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../context/products';

interface ListProductProps {
  products: Product[];
  deleteProduct: (id: number) => void;
  viewProduct: (item: Product) => void;
}

export default function ListProduct({ products, deleteProduct, viewProduct }: ListProductProps) {
  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => b.price * b.quantity - a.price * a.quantity),
    [products]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => viewProduct(item)} style={styles.cardContent}>
              <Text style={styles.text}>Tên: {item.name}</Text>
              <Text style={styles.text}>Giá: ${item.price.toLocaleString()}</Text>
              <Text style={styles.text}>Số lượng: {item.quantity}</Text>
              <Text style={styles.text}>
                Tổng giá trị: ${(item.quantity * item.price).toLocaleString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteProduct(item.id)}
            >
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1faee',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  text: {
    color: '#264653',
    fontSize: 16,
    marginBottom: 4,
  },
  deleteButton: {
    backgroundColor: '#e63946',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});