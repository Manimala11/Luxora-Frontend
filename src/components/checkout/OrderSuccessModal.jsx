import { Modal } from 'antd';
import order from '../../assets/order.mp3';
import { useEffect } from 'react';

const OrderSuccessModal = ({ open, orderDetails, onClose }) => {
  const totalPrice = orderDetails
    ? orderDetails.orderItems.reduce(
        (total, item) =>
          total + Number(item.price) * Number(item.quantity || 1),
        0
      )
    : 0;

  useEffect(() => {
    if (open) {
      const audio = new Audio(order);
      audio.play();
    }
  }, [open]);
  return (
    <Modal open={open} footer={null} onCancel={onClose} centered>
      {orderDetails && (
        <div>
          <h4 className='mx-4 text-center'>
            <i
              className='fas fa-check-circle  animate__animated animate__bounceIn text-success'
              style={{ fontSize: '60px' }}></i>
          </h4>
          <h5 className='mx-4 text-center text-primary'>
            Order placed successfully{' '}
          </h5>
          <p>
            <b>Order ID: </b> {orderDetails._id}
          </p>
          <p>
            <b>Total Products:</b> {orderDetails.orderItems.length}
          </p>
          <p>
            <b>Total:</b> ₹{totalPrice}
          </p>
          <p className='h5 text-primary'>
            Your order has been placed successfully!
          </p>
        </div>
      )}
    </Modal>
  );
};

export default OrderSuccessModal;
