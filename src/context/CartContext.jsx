import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from './UserContext';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    if (!user || !user._id) {
      setCartItem([]);
      return;
    }
    try {
      const savedCart = localStorage.getItem(`cart_${user._id}`);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItem(parsedCart);
        }
      }
    } catch {
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
    const exist = cartItem.find(
      (cart) => cart._id === product._id && cart.selectedSize === selectedSize
    );

    if (exist) {
      toast.warning('This product with selected size already in cart!');
      return;
    }
    if (selectedSize) {
      const sizeObj = product.sizeStock?.find((s) => s.size === selectedSize);
      if (!sizeObj || sizeObj.stock <= 0) {
        toast.error(`Size ${selectedSize} is out of stock!`);
        return;
      }
    } else {
      if (product.stock <= 0) {
        toast.error('Product is out of stock!');
        return;
      }
    }

    const newCart = [...cartItem, { ...product, quantity: 1, selectedSize }];
    setCartItem(newCart);
    toast.success('Product added to cart!');
  };

  const updateQuantity = (productId, selectedSize, action) => {
    const updatedCart = cartItem.map((item) => {
      if (item._id === productId && item.selectedSize === selectedSize) {
        let maxStock = item.stock;
        if (selectedSize) {
          const sizeObj = item.sizeStock?.find((s) => s.size === selectedSize);
          maxStock = sizeObj?.stock || 0;
        }
        let newQty = item.quantity;

        if (action === 'increment') {
          if (newQty < maxStock) newQty += 1;
          else toast.error('No more stock available!');
        } else {
          newQty = Math.max(1, newQty - 1);
        }

        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItem(updatedCart);
  };

  const removeFromCart = (productId, selectedSize) => {
    const updatedCart = cartItem.filter(
      (item) => !(item._id === productId && item.selectedSize === selectedSize)
    );
    setCartItem(updatedCart);
  };

  const clearCart = () => {
    setCartItem([]);
    if (user && user._id) localStorage.removeItem(`cart_${user._id}`);
  };
  const count = cartItem.length;

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
