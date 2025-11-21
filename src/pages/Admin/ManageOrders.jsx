import useFetch from '../../hooks/useFetch';
import { Spin, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ManageOrders = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { data, loading, error } = useFetch('/order/getOrder', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (loading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center text-primary'
        style={{ height: '100vh' }}>
        <Spin size='large' />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className='d-flex justify-content-center align-items-center text-primary'
        style={{ height: '100vh' }}>
        <h5>Errod loading details</h5>
      </div>
    );
  }

  return (
    <div
      className='text-center table-responsive'
      style={{ fontSize: ' 0.85rem' }}>
      <h4 className='mt-3 mb-3'>Order History</h4>
      <table className='table w-100 table-hover text-center'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Created Date</th>
            <th>Customer Name</th>
            <th>Product</th>
            <th>₹</th>
            <th>Order Status</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {data?.orders?.length > 0 ? (
            data.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td  style={{ color: order.userId ? 'inherit' : 'red' }}>{order.userId?.name || "Deleted user"}</td>
                <td>
                  {order.orderItems
                    ?.map((item) => item?.product?.title || 'Deleted Product')
                    .join(',')}
                </td>
                <td>{order.totalPrice}</td>
                <td  style={{ color: order.orderStatus==='Cancelled' ? 'red':  order.orderStatus === 'Delivered' ? 'green': order.orderStatus === 'Shipped' ? 'blue': 'inherit' }}>{order.orderStatus}</td>
                <td>
                  <Button
                    type='primary'
                    size='small'
                    onClick={() =>
                      navigate(`/admin/orders/${order._id}`, {
                        state: { order },
                      })
                    }>
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
