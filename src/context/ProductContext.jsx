import { createContext, useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [loadingProduct, setLoadingProduct] = useState(false);
  const submitReview = async (productId, rating, comment) => {
    try {
      setLoadingProduct(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        return;
      }
      const { data } = await api.patch(
        `/product/${productId}/review`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.product;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoadingProduct(false);
    }
  };

  return(
    <ProductContext.Provider
      value={{
        loadingProduct,
        submitReview
      }}
    >
      {children}
    </ProductContext.Provider>
  )
};

export { ProductContext, ProductProvider }