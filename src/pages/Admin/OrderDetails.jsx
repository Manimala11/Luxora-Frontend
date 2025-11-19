import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { Popconfirm } from 'antd';

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;
  const navigate = useNavigate();
  const [status, setStatus] = useState(order?.orderStatus || '');
  const [updating, setUpdating] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!order) return <p className='text-center mt-5'>No order data found!</p>;

  const handleStatusChange =  (e) => {
    setPendingStatus(e.target.value);
    setShowConfirm(true);
  }
  const confirmStatusUpdate = async()=>{
    setShowConfirm(false);
    setStatus(pendingStatus);
    const token = localStorage.getItem('token');
     try {
      const { data } = await api.patch(
        `/order/updateOrder/${order._id}`,
        { orderStatus: pendingStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success('Order status updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update order status');
      }
    } catch (err) {
      toast.error('Something went wrong while updating order status.');
    }
    setUpdating(false);
  }
   const cancelStatusUpdate = () => {
    setShowConfirm(false);
    setPendingStatus(null);
  };

  return (
    <div className='container my-4 '>
      <div className='card shadow-sm p-4'>
        <div className='card-body'>
          <h3 className='card-title mb-4'>
            Order Details - <small>{order._id}</small>
          </h3>

          <h5 className='text-center'>Customer Info</h5>
          <p>
            <strong>Name: </strong> {order.userId?.name}
          </p>
          <p>
            <strong>Email:</strong> {order.userId?.email}
          </p>
          <hr />

          <h5 className='text-center'>Shipping Info</h5>
          <p>
            <strong>Name:</strong> {order.shippingInfo.name}
          </p>
          <p>
            <strong>Address:</strong> {order.shippingInfo.address},{' '}
            {order.shippingInfo.state}, {order.shippingInfo.country},{' '}
            {order.shippingInfo.pincode}
          </p>
          <p>
            <strong>Phone:</strong> {order.shippingInfo.phoneNo}
          </p>
          <p>
            <strong>Email:</strong> {order.shippingInfo.email}
          </p>
          <hr />

          <h5 className='text-center'>Order Items</h5>
          {order.orderItems.map((item) => (
            <div
              key={item.product?._id}
              className='d-flex align-items-center mb-3 border-bottom pb-2'>
              <img
                src={item.product?.images?.[0]}
                alt={item.product?.title}
                className='img-thumbnail me-3'
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <div>
                <p className='mb-1'>
                  <strong>{item.product?.title || item.name}</strong>
                </p>
                <p className='mb-0'>
                  Qty: {item.quantity} | ₹{item.price}
                </p>
              </div>
            </div>
          ))}
          <hr />
          <h5 className='text-center'>Order Summary</h5>
          <p>
            <strong>Total Price:</strong> ₹{order.totalPrice}
          </p>
          <p>
            <strong>Status:</strong> {'  '}
            <Popconfirm
              title='Are you sure you want to update status?'
              open={showConfirm}
              onConfirm={confirmStatusUpdate}
              onCancel={cancelStatusUpdate}
              okText='Yes'
              cancelText='No'>
              <select
                className='form-select d-inline-block w-auto'
                value={status}
                onChange={handleStatusChange}
                disabled={status === 'Delivered' || updating}>
                <option value='Processing'>Processing</option>
                <option value='Shipped'>Shipped</option>
                <option value='Delivered'>Delivered</option>
                <option value='Cancelled'>Cancelled</option>
              </select>
            </Popconfirm>
          </p>
          <p>
            <strong>Payment Info:</strong> {order.paymentInfo}
          </p>

          <button className='btn btn-primary mt-3' onClick={() => navigate(-1)}>
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
