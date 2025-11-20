import { useParams,useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Spin, Carousel } from 'antd';
import { CartContext } from '../context/CartContext';
import { useContext , useState} from 'react';
import Profile from '../assets/images.png'
import { toast } from 'react-toastify';


const ProductDetails = () => {
  const {addToCart} = useContext(CartContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: item,
    loading: itemLoading,
    error: itemError,
  } = useFetch(`/product/${id}`);

  const [selectedSize, setSelectedSize] = useState('');

  if (itemLoading)
    return (
      <div
        className='d-flex justify-content-center align-items-center text-primary'
        style={{ height: '100vh' }}>
        <Spin size='large' />
      </div>
    );

  if (itemError)
    return <p className='text-center text-danger'>Error Loading item</p>;

  const handleview = () => {
    const reviewscroll = document.querySelector('#reviewview');
    if (reviewscroll) reviewscroll.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuyNow = ()=>{
    if (!selectedSize) return toast.info('Please select a size first!');
    navigate('/checkout', { state: { product: item?.product, quantity: 1, selectedSize } })
  }

  const handleAddToCart = () => {
    if (!selectedSize) return toast.info('Please select a size first!');
    addToCart(item?.product, selectedSize); 
  };

  return (
    <div className='container card'>
      <div className='row mt-3 mb-3 '>
        <div className='col-md-4 me-3'>
          <Carousel arrows infinite={false} autoplay>
            {item?.product?.images?.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={item?.product?.title}
                  height={300}
                  className='card-img'
                />
              </div>
            ))}
          </Carousel>
          
          
          <div className='row mt-3'>
            <div className='col-6'>
              <button className='btn rounded-2 btn-primary w-100'  onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>
            <div className='col-6'>
              <button className='btn rounded-2 btn-primary w-100' onClick={handleBuyNow}>
                BUY NOW
              </button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <h2 className='text-secondary text-center mt-3 mb-4'>
            {item?.product?.title}
          </h2>
          <p className='display-6 fw-bold text-primary'>
            ₹ {item?.product?.price}
          </p>
          <p>
            <span className='badge p-2 rounded-pill bg-primary me-2'>
              <i className='fa-solid fa-star text-white me-2'></i>
              {item?.product?.rating}
            </span>
            <button className='btn btn-white p-2' onClick={handleview}>
              view reviews...
            </button>
          </p>
          {/* {item?.product?.size?.length >0 && (
            <div className='mt-3'>
              <h6>Select Size: </h6>
              <div className='d-flex gap-2 flex-wrap'>
                {item.product.size.map((size)=>(
                  <button
                    key={size}
                    className={`btn btn-outline-primary ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}>{size}</button>
                ))}
              </div>
            </div>
          )} */}

           {item?.product?.sizeStock?.length > 0 && (
            <div className='mt-3'>
              <h6>Select Size: </h6>
              <div className='d-flex gap-2 flex-wrap'>
                {item.product.sizeStock.map((opt) => (
                  <button
                    key={opt.size}
                    disabled={opt.stock === 0}
                    className={`btn btn-outline-primary ${
                      selectedSize === opt.size ? 'active' : ''
                    }`}
                    onClick={() => setSelectedSize(opt.size)}
                  >
                    {opt.size} {opt.stock === 0 ? '(Out of Stock)' : `(${opt.stock})`}
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className='text-secondary'>{item?.product?.description}</p>
          <div id='reviewview'>
            <h4 className='text-center'>Customer reviews</h4>
            {item?.product?.reviews && item?.product?.reviews.length > 0 ? (
              item?.product?.reviews?.map((review, index) => (
                <div key={index}>
                  <p className='mb-2'> <img src={Profile} width={30} height={30} className='rounded-circle'/>{review?.name}</p>
                 <p className='ms-5 mb-1'>
                  Rating: <span className='badge rounded-pill bg-primary'>
                     {review?.rating}
                    </span>
                 </p>
                    
                     <p className='text-secondary ms-5'>
                    {review?.comment}
                  </p>
                  <hr />
                </div>
              ))
            ) : (
              <p className='text-center text-secondary mt-3'>No Reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
