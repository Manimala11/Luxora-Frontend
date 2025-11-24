import { useEffect, useState } from 'react';
import api from '../../api/api';
import { Spin } from 'antd';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.get('/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setDashboardData({
          totalProducts: data.totalProducts,
          totalOrders: data.totalOrders,
          totalRevenue: data.totalRevenue,
          recentOrders: data.recentOrders,
        });
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data');
   }finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div
        className='d-flex justify-content-center align-items-center text-primary'
        style={{ height: '100vh' }}>
        <Spin size='large' />
      </div>
    );
  if (error)
    return <p className='text-center text-danger'>{error}</p>;


  return (
    <div className='mt-2'>
      <h4 className='text-center mb-4 text-primary'>Dashboard</h4>
      <div className='row d-flex justify-content-evenly text-center'>
        <div
          className='col-md-3 mb-3 mb-md-1 mx-lg-0 p-2 rounded-2 shadow-sm'
          style={{ background: '#FCE4EC', color: '#AD1457' }}>
          <h6 className='mt-3'>Total Products</h6>
          <h3>
            <i className='fa-solid fa-box me-2'></i>
          </h3>
          <p className='h3'>{dashboardData.totalProducts}</p>
        </div>
        <div
          className='col-md-3 mb-3 mb-md-1 mx-lg-0 p-2 rounded-2 '
          style={{ background: '#E3F2FD', color: '#1565C0' }}>
          <h6 className='mt-3'>Total orders</h6>
          <h3>
            <i className='fa-solid fa-cart-shopping me-2'></i>
          </h3>
          <p className='h3'>{dashboardData.totalOrders}</p>
        </div>
        <div
          className='col-md-3 mb-3 mb-md-1 mx-lg-0 p-2 rounded-2 '
          style={{ background: '#E8F5E9', color: '#2E7D32' }}>
          <h6 className='mt-3'>Total Revenue</h6>
          <h3>
            <i className='fa-solid fa-indian-rupee-sign me-2'></i>
          </h3>
          <p className='h3'>₹{dashboardData.totalRevenue}</p>
        </div>
      </div>

      <div className='text-center table-responsive'>
        <h4 className='mt-5 mb-3 text-primary'>Recent Orders</h4>
        <table className='table table-striped table-hover w-100 text-center'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Products</th>
              <th>₹</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentOrders.length === 0 ? (
              <tr>
                <td colSpan='6' className='text-danger text-center'>
                  No recent orders
                </td>
              </tr>
            ) : (
              dashboardData.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td
                    style={{
                      color:
                        order.customerName === 'Unknown' ? 'red' : 'inherit',
                    }}>
                    {order.customerName}
                  </td>
                  <td>{order.products.join(', ') || 'Deleted product'}</td>
                  <td>₹{order.totalPrice}</td>
                  <td
                    style={{
                      color:
                        order.orderStatus === 'Shipped' ? 'blue' : 'inherit',
                    }}>
                    {order.orderStatus}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
