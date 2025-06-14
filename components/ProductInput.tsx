import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Product } from '../context/products';

interface ProductInputProps {
  addProduct: (item: Product) => void;
}

export default function ProductInput({ addProduct }: ProductInputProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Tên sản phẩm không được để trống.');
      return;
    }
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Lỗi', 'Giá phải là số lớn hơn 0.');
      return;
    }
    const quantityNum = Number(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      Alert.alert('Lỗi', 'Số lượng phải là số lớn hơn 0.');
      return;
    }

    addProduct({
      id: Date.now(),
      name,
      price: priceNum,
      quantity: quantityNum,
    });

    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm sản phẩm</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Tên sản phẩm"
      />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Giá"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Số lượng"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1faee',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
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
  input: {
    backgroundColor: '#fff',
    borderColor: '#264653',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});