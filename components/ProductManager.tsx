import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProductInput from './ProductInput';
import ListProduct from './ListProduct';
import { useProductsReducer, Product } from '../context/products';
import { RootStackParamList } from '../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function calculateTotal(products: Product[]) {
  return products.reduce((acc, item) => acc + item.quantity * item.price, 0);
}

export default function ProductManager({ navigation }: { navigation: NavigationProp }) {
  const { products, addProduct, removeProduct } = useProductsReducer();

  return (
    <View style={styles.container}>
      <Text style={styles.total}>
        Tổng giá trị: ${calculateTotal(products).toLocaleString()}
      </Text>
      <ProductInput addProduct={(item: Omit<Product, 'id'>) => addProduct({ ...item, id: Date.now() })} />
      <ListProduct
        products={products}
        deleteProduct={(id: number) => removeProduct(id)}
        viewProduct={(item: Product) => navigation.navigate('Product Detail', { item })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f1de',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e63946',
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#f1faee',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});