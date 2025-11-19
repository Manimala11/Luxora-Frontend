import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollUtils';
const { Meta } = Card;

const Products = ({ products }) => {
  
  return (
    <div className='container-fluid'>
      <div className='row'>
        {products?.length > 0 &&
          products.map((product) => (
            <div className='col-lg-3 col-md-4 col-6 mb-4' key={product?._id}>
              <Link
                className='text-decoration-none'
                onClick={scrollToTop}
                to={`/product/${product._id}`}>
                <Card
                  className='w-100 h-100 text-center'
                  hoverable
                  cover={
                    <img
                      className='card-img'
                      draggable={false}
                      alt={product?.title}
                      src={product?.images?.[0]}
                      height={200}
                    />
                  }>
                  <Meta
                    title={product?.title}
                    description={`₹ ${product?.price}`}
                  />
                  <p className='text-start'>
                    <span className='badge bg-primary'>{product?.rating}</span>
                    <sub> ratings</sub>
                  </p>
                </Card>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
