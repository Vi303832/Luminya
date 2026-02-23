import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = useCallback((service, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === service.id);
      if (existing) {
        return prev.map((i) =>
          i.id === service.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...service, quantity }];
    });
  }, []);

  const removeItem = useCallback((serviceId) => {
    setItems((prev) => prev.filter((i) => i.id !== serviceId));
  }, []);

  const updateQuantity = useCallback((serviceId, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== serviceId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === serviceId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
