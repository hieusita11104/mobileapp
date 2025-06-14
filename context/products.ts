import { useReducer } from 'react';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Action {
  type: string;
  payload: Product | number;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 1000, quantity: 5 },
  { id: 2, name: 'Phone', price: 500, quantity: 10 },
  { id: 3, name: 'Tablet', price: 300, quantity: 7 },
  { id: 4, name: 'Mouse', price: 20, quantity: 50 },
  { id: 5, name: 'Keyboard', price: 30, quantity: 30 },
];

function productsReducer(state: Product[], action: Action): Product[] {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload as Product];
    case REMOVE_PRODUCT:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

export function useProductsReducer() {
  const [products, dispatch] = useReducer(productsReducer, initialProducts);

  const addProduct = (item: Product) => dispatch({ type: ADD_PRODUCT, payload: item });
  const removeProduct = (id: number) => dispatch({ type: REMOVE_PRODUCT, payload: id });

  return { products, addProduct, removeProduct };
}