import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductManager from './components/ProductManager';
import ProductDetail from './components/ProductDetail';
import { Product } from './context/products';

export type RootStackParamList = {
  'Product Manager': undefined;
  'Product Detail': { item: Product };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2a9d8f',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerShadowVisible: true,
        }}
      >
        <Stack.Screen
          name="Product Manager"
          component={ProductManager}
          options={{ title: 'Quản lý sản phẩm' }}
        />
        <Stack.Screen
          name="Product Detail"
          component={ProductDetail}
          options={{ title: 'Chi tiết sản phẩm' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}