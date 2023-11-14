import { createContext } from "react";

const CartContext = createContext({
  items: [],
  id: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default CartContext;
