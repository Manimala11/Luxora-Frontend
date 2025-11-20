import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import emptyCart from '../assets/empty-cart.png';
import { useNavigate, Link } from 'react-router-dom';
import ProgressForOrder from './ProgressForOrder';

const AddToCart = () => {
  const { cartItem, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItem.reduce(
    (total, product) =>total +product.price * (product.quantity || 1), 0
  );

  if(cartItem.length === 0) {
    return (
      <div className='container text-center my-5'>
        <img src={emptyCart} alt="Empty Cart" width={250} height={200}/>
        <h4 className='my-3'>Your cart is empty</h4>
        <button className='btn btn-primary w-25 rounded-0' onClick={()=> navigate('/')}>SHOP NOW</button>
      </div>
    );
  };

  const handleCheckout = ()=>{
    const orderItems = cartItem.map(item=> ({
      product: item._id,
      quantity: item.quantity || 1,
      selectedSize: item.selectedSize
    }));
    console.log('Checkout payload:', { orderItems, totalPrice });
  };

  
  return (
    <div className='container'> 
      <div className='row'>
         <ProgressForOrder/>
        <div className='col-md-7'>
          <h4 className='text-primary text-center my-3'>Product Details</h4>
          <div className='table-responsive '>
            <table className='table table-bordered text-center align-middle'>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Action</th>
                </tr>
              </thead>
              {cartItem.map((product) => (
                <tbody key={`${product._id}-${product.selectedSize}`}>
                  <tr>
                    <td className='text-start'>
                      <img
                        src={product?.images?.[0]}
                        alt={product?.title}
                        height={70}
                        width={70}
                      />

                      <div>{product.title}</div>
                    </td>
                    <td>₹{product.price * (product.quantity || 1)}</td>
                    <td>{product?.selectedSize || '-'}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={()=> updateQuantity(product._id,product.selectedSize, 'decrement')}>
                          -
                        </button>
                        <span className="mx-2">{product.quantity || 1}</span>
                        <button className='btn btn-sm btn-outline-primary ms-2' onClick={()=>updateQuantity(product._id,product.selectedSize, 'increment')}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button className='btn btn-sm btn-danger' onClick={()=>removeFromCart(product._id, product.selectedSize)}> 
                            <i className='fa-solid fa-trash fa-sm text-dark'></i>
                       </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
        <div className='col-md-4 '>
          <h4 className='text-primary text-center my-3'>Price Details</h4>
          <table className='w-100 table'>
            <thead>
              <tr>
                <th>Details</th>
                <th>₹</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Product Price</td>
                <td>₹{totalPrice}</td>
              </tr>
              <tr>
                <td>Oder total</td>
                <td>₹{totalPrice}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Link className="btn btn-primary w-100" to={'/checkout'} onClick={handleCheckout}>
                    Continue
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
