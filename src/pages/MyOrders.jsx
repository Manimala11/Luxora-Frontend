import { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import { ProductContext } from '../context/ProductContext';
import { toast } from 'react-toastify';
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollUtils';

const MyOrders = () => {
  const { orders, loadingOrders, getMyOrders } = useContext(OrderContext);
  const { submitReview } = useContext(ProductContext);

  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getMyOrders();
  }, []);

  const openModal = (productId) => {
    setSelectedItem(productId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setRating(0);
    setComment('');
    setIsModalVisible(false);
  };

  const handleSubmitReview = async () => {
    if (!rating) return toast.error('Please select rating!');

    const updatedProduct = await submitReview(selectedItem, rating, comment);

    if (updatedProduct) {
      toast.success('Review submitted successfully!');
      closeModal();
    }
  };

  if (loadingOrders) {
    return <h4 className='text-center mt-4'>Loading Orders...</h4>;
  }

  if (!orders || orders.length === 0) {
    return <h4 className='text-center mt-4 text-danger'>No Orders Found</h4>;
  }

  return (
    <div className='container mt-4'>
      <h3 className='text-primary text-center mb-4'>My Orders</h3>

      {orders.map((order) => (
        <div className='card mb-3 p-3 shadow-sm' key={order._id}>
          <h5>
            <b>Order ID: </b> {order._id}
          </h5>
          <p>
            <b>Status:</b>{' '}
            <span className='text-primary'>{order.orderStatus}</span>
          </p>
          <p>
            <b>Total Price:</b> ₹{order.totalPrice}
          </p>
          <h6>Items: </h6>
          {order?.orderItems?.map((item, id) => (
            <div key={id} className='border-bottom py-3'>
              <div className='d-flex align-item-center py-2'>
                <Link
                to={item?.product?._id ? `/product/${item.product._id}` : "#"} onClick={scrollToTop}
                  className='d-flex align-items-center text-decoration-none text-dark flex-grow-1'
                 >
                  <img
                    src={item?.image}
                    width={60}
                    height={60}
                    className='rounded me-3'
                    alt={item.title}
                  />
                  <div className='flex-grow-1'>
                    <p className='fw-bold mb-1'>{item.name}</p>
                    <p className='mb-0'>Qty: {item.quantity}</p>
                    <p className='mb-0'>Price: ₹{item.price}</p>
                  </div>
                </Link>
                <div>
                  {order.orderStatus === 'Delivered' && (
                    <Button
                      type='primary'
                      onClick={() => openModal(item.product._id)}>
                      Add Review
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <Modal
        title='Submit Review'
        open={isModalVisible}
        onOk={handleSubmitReview}
        onCancel={closeModal}
        okText='Submit'>
        <h6>Give Rating</h6>
        <div className='mb-2'>
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              className='fa-solid fa-star'
              key={star}
              style={{
                cursor: 'pointer',
                fontSize: '22px',
                color: rating >= star ? 'gold' : 'gray',
              }}
              onClick={() => setRating(star)}></i>
          ))}
        </div>

        <textarea
          className='form-control'
          placeholder='Write your review...'
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default MyOrders;
