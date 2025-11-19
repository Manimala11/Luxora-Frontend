import { createContext, useState } from 'react';
import api from '../api/api';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState();
  const [loadingOrders, setLoadingOrders] = useState(false);

  const getMyOrders = async () => {
    try {
      setLoadingOrders(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view orders');
        return;
      }
      const { data } = await api.get('/order/getOrder', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoadingOrders(false);
    }
  };

  return (
    <OrderContext.Provider value={{orders, loadingOrders, getMyOrders}}>
        {children}
    </OrderContext.Provider>
  )
};

export { OrderContext, OrderProvider}
