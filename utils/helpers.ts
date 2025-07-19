import { Product } from '../context/ProductContext';

export const sortProducts = (products: Product[], order: 'asc' | 'desc'): Product[] => {
  return [...products].sort((a, b) => {
    if (order === 'asc') {
      return a.price - b.price;
    }
    return b.price - a.price;
  });
};