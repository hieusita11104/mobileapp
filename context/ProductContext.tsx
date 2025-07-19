import React, { createContext, useReducer, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface ProductState {
  products: Product[];
}

interface ProductAction {
  type: 'ADD_PRODUCT' | 'UPDATE_PRODUCT' | 'DELETE_PRODUCT';
  payload: Product | number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
});

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Laptop',
    description: 'Laptop cao cấp cho công việc',
    price: 1000,
    quantity: 5,
    image: '',
  },
  {
    id: 2,
    name: 'Phone',
    description: 'Smartphone hiện đại',
    price: 500,
    quantity: 10,
    image: '',
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Tai nghe không dây chất lượng cao',
    price: 100,
    quantity: 20,
    image: '',
  },
  {
    id: 4,
    name: 'Mouse',
    description: 'Chuột quang không dây',
    price: 20,
    quantity: 50,
    image: '',
  },
  {
    id: 5,
    name: 'Keyboard',
    description: 'Bàn phím cơ RGB',
    price: 80,
    quantity: 15,
    image: '',
  },
];

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { products: [...state.products, action.payload as Product] };
    case 'UPDATE_PRODUCT':
      return {
        products: state.products.map((p) =>
          p.id === (action.payload as Product).id ? (action.payload as Product) : p
        ),
      };
    case 'DELETE_PRODUCT':
      return { products: state.products.filter((p) => p.id !== action.payload) };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: initialProducts });

  const addProduct = async (product: Product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
    try {
      await AsyncStorage.setItem('products', JSON.stringify([...state.products, product]));
    } catch (error) {
      console.error('Add product error:', error);
    }
  };

  const updateProduct = async (product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
    try {
      const updatedProducts = state.products.map((p) =>
        p.id === product.id ? product : p
      );
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Update product error:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
    try {
      const updatedProducts = state.products.filter((p) => p.id !== id);
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Delete product error:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products: state.products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};