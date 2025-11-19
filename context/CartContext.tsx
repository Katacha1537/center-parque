import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from './DataContext';

export interface CartItem {
  product: Product;
  quantity: number;
  date?: string;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Product, quantity: number, date?: string) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product: Product, quantity: number, date?: string) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, date }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      isCartOpen, 
      toggleCart, 
      addToCart, 
      removeFromCart, 
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};