import React, { useState } from 'react';

const CartContext = React.createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
