import { createContext, useReducer } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return { ...state, shippingAddress: action.payload };
    case 'SAVE_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
  paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'PayPal',
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product, qty) => {
    const item = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: Number(qty),
    };
    const existItem = state.cartItems.find((x) => x.product === item.product);
    const updatedCartItems = existItem ? state.cartItems.map(x => x.product === existItem.product ? item : x) : [...state.cartItems, item];
    dispatch({ type: 'ADD_TO_CART', payload: item });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    const cartItems = state.cartItems.filter((x) => x.product !== id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const saveShippingAddress = (data) => {
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  const savePaymentMethod = (data) => {
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: data });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, shippingAddress: state.shippingAddress, paymentMethod: state.paymentMethod, addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
