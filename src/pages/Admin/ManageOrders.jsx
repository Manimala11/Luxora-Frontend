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

  return (
    <div className='text-center px-3 px-md-0' style={{ fontSize: '0.85rem' }}>
      <h4 className='mt-3 mb-3 text-primary'>Order History</h4>
      <div className='table-responsive'>
        <table className='table table-striped w-100 table-hover text-center'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Created Date</th>
              <th>Customer Name</th>
              <th>Products</th>
              <th>₹</th>
              <th>Order Status</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan='7' className='text-center text-primary fw-bold'>
                  Loading...
                </td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan='7' className='text-center text-danger fw-bold'>
                  Failed to load orders
                </td>
              </tr>
            )}
            {!loading && !error && data?.orders?.length === 0 && (
              <tr>
                <td colSpan='7' className='text-danger text-center fw-bold'>
                  No orders found
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              data?.orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ color: order.userId ? 'inherit' : 'red' }}>
                    {order.userId?.name || 'Deleted user'}
                  </td>
                  <td>
                    {order.orderItems
                      ?.map((item) => item?.product?.title || 'Deleted Product')
                      .join(',')}
                  </td>
                  <td>{order.totalPrice}</td>
                  <td
                    style={{
                      color:
                        order.orderStatus === 'Cancelled'
                          ? 'red'
                          : order.orderStatus === 'Delivered'
                          ? 'green'
                          : order.orderStatus === 'Shipped'
                          ? 'blue'
                          : 'inherit',
                    }}>
                    {order.orderStatus}
                  </td>
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
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
