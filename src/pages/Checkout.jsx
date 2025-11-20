import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/api';
import { CartContext } from '../context/cartContext';
import { scrollToTop } from '../utils/scrollUtils';

import ShippingForm from '../components/Checkout/ShippingForm';
import ProductSummary from '../components/Checkout/ProductSummary';
import OrderSuccessModal from '../components/Checkout/OrderSuccessModal';
import ProgressForOrder from './ProgressForOrder';

const Checkout = () => {
  const { cartItem, clearCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const buyNowProduct = location.state?.product;
  const buyNowQuantity = location.state?.quantity || 1;
  const buyNowSize = location.state?.selectedSize;

  const productList = buyNowProduct
    ? [{ ...buyNowProduct, quantity: buyNowQuantity, selectedSize: buyNowSize }]
    : cartItem.map((item) => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
      }));

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    state: '',
    country: 'India',
    pincode: '',
  });

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      address: '',
      state: '',
      pincode: '',
    });
  };

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    let error = '';

    if (field === 'name') {
      value = value.replace(/\d/g, '');
      error = !value ? 'Name is required' : '';
    }

    if (field === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
      error = value.length < 10 ? 'Phone number must be 10 digits' : '';
    }

    if (field === 'pincode') {
      value = value.replace(/\D/g, '').slice(0, 6);
      error = value.length < 6 ? 'Pincode must be 6 digits' : '';
    }

    if (field === 'email') {
      const emailRegex = /^\S+@\S+\.\S+$/;
      error = value && !emailRegex.test(value) ? 'Enter a valid email' : '';
    }

    if (field === 'state') {
      error = !value ? 'Please select a state' : '';
    }

    if (field === 'address') {
      error = !value ? 'Address is required' : '';
    }

    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: error });
  };

  const handlePlaceOrder = async () => {
    try {
      if (
        !form.name ||
        !form.phone ||
        !form.email ||
        !form.address ||
        !form.state ||
        !form.pincode
      ) {
        toast.error('Please fill in all required fields');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login before placing an order');
        return;
      }

      const orderData = {
        shippingInfo: {
          name: form.name,
          phoneNo: form.phone,
          email: form.email,
          address: form.address,
          state: form.state,
          country: form.country || 'India',
          pincode: form.pincode,
        },
        orderItems: productList.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          selectedSize: item.selectedSize || null,
        })),
        paymentMethod: 'COD',
      };

      const { data } = await api.post('/order/createOrder', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setOrderDetails(data.order);
        setIsModalOpen(true);

        if (!buyNowProduct) clearCart();

        setTimeout(() => {
          setIsModalOpen(false);
          navigate('/');
          scrollToTop();
        }, 3000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const totalPrice = productList.reduce(
    (total, p) => total + p.price * p.quantity,
    0
  );

  return (
    <>
      <OrderSuccessModal
        open={isModalOpen}
        orderDetails={orderDetails}
        onClose={() => setIsModalOpen(false)}
      />

      <ProgressForOrder />

      <div className='container-fluid my-4'>
        <div className='row mx-0 mx-md-3'>
          <div className='col-md-6 mt-2'>
            <ShippingForm
              form={form}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handlePlaceOrder}
              resetForm={resetForm}
            />
          </div>

          <div className='col-md-6 mt-5 mt-md-2'>
            <ProductSummary productList={productList} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
