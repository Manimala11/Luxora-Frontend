import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from './UserContext';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    if (!user || !user._id) {
      setCartItem([]);
      setCount(0);
      return;
    }
    try {
      const savedCart = localStorage.getItem(`cart_${user._id}`);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItem(parsedCart);
          setCount(parsedCart.length);
        }
      }
    } catch (error) {
      localStorage.removeItem(`cart_${user._id}`);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !user._id) return;
    if (cartItem.length > 0) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(cartItem));
    } else {
      localStorage.removeItem(`cart_${user._id}`);
    }
  }, [cartItem, user]);

  const addToCart = (product, selectedSize) => {
    if (!user || !user._id) {
      toast.warning('Please login to add products to cart!');
      return;
    }
    const exist = cartItem.find((cart) => cart._id === product._id && cart.selectedSize === selectedSize);

    if (!exist) {
     const newCart = [...cartItem, { ...product, quantity: 1, selectedSize }];
      setCartItem(newCart);
      setCount(newCart.length);
      toast.success('Product added to cart!');
    } else {
      toast.warning('Product with this size already in cart!');
    }
  };

  const updateQuantity = (productId,selectedSize, action) => {
    const updatedCart = cartItem.map((item) => {
      if (item._id === productId  && item.selectedSize === selectedSize) {
        const newQty =
          action === 'increment'
            ? (item.quantity || 1) + 1
            : (item.quantity || 1) - 1;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCartItem(updatedCart);
  };

  const removeFromCart = (productId, selectedSize) => {
    const updatedCart = cartItem.filter((item) => !(item._id === productId && item.selectedSize === selectedSize));
    setCartItem(updatedCart);
    setCount(updatedCart.length);
  };

  const clearCart = () => {
    setCartItem([]);
    setCount(0);
    if (user && user._id) localStorage.removeItem(`cart_${user._id}`);
  };

  return (
    <CartContext.Provider
      value={{
        count,
        addToCart,
        cartItem,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
