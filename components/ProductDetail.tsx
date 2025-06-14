import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../App';
import { Product } from '../context/products';

type ProductDetailProps = StackScreenProps<RootStackParamList, 'Product Detail'>;

export default function ProductDetail({ route, navigation }: ProductDetailProps) {
  const { item } = route.params;

  return (
    <LinearGradient colors={['#f1faee', '#f4f1de']} style={styles.container}>
      <Text style={styles.title}>Chi tiết sản phẩm</Text>
      <View style={styles.card}>
        <Text style={styles.text}>Tên: {item.name}</Text>
        <Text style={styles.text}>Giá: ${item.price.toLocaleString()}</Text>
        <Text style={styles.text}>Số lượng: {item.quantity}</Text>
        <Text style={styles.text}>
          Tổng giá trị: ${(item.quantity * item.price).toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Đóng</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#264653',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#264653',
    fontSize: 18,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: '#2a9d8f',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});