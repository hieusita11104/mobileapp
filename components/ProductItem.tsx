import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../context/ProductContext';

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductItem({ products, onSelect, onDelete }: Props) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item: Product) => item.id.toString()}
      renderItem={({ item }: { item: Product }) => (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => onSelect(item)} style={styles.cardContent}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.price}>Giá: ${item.price.toLocaleString()}</Text>
            <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
            <Text style={styles.deleteButtonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#264653',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#264653',
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