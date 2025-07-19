import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;