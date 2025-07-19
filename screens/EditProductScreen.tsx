import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ProductContext } from '../context/ProductContext';
import InputField from '../components/InputField';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProduct'>;

export default function EditProductScreen({ route, navigation }: Props) {
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const { updateProduct } = useContext(ProductContext);

  const handleUpdate = () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Lỗi', 'Tên và mô tả không được để trống.');
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

    updateProduct({
      id: product.id,
      name,
      description,
      price: priceNum,
      quantity: quantityNum,
      image: product.image,
    });
    Alert.alert('Thành công', 'Cập nhật sản phẩm thành công.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sửa sản phẩm</Text>
      <InputField
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={setName}
      />
      <InputField
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
      />
      <InputField
        placeholder="Giá"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <InputField
        placeholder="Số lượng"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật sản phẩm</Text>
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
  button: {
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});