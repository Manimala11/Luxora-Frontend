import { useParams } from 'react-router-dom';
import Products from '../components/Products';
import useFetch from '../hooks/useFetch';
import { Spin } from 'antd';
import CategoryList from '../components/CategoryList';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const products = useFetch('/product');
  const category = useFetch('/categories');

  if (products.loading)
    return (
      <div
        className='d-flex justify-content-center align-items-center text-primary'
        style={{ height: '100vh' }}>
        <Spin size='large' />
      </div>
    );

  if (products.error)
    return <p className='text-center text-danger'>Error Loading data</p>;

  const filteredProducts = products?.data?.products?.filter(
    (item) =>
      (item?.category.toLowerCase() || '') ===
      (categoryName.toLowerCase() || '')
  );

  return (
    <div className='container'>
      <div className='row mt-2'>
        <div className='col-md-3'>
          <CategoryList preloadedData={category.data} />
        </div>
        <div className='col-md-9 col-12'>
          <h2 className='text-center text-primary mb-4 text-capitalize'>
            {categoryName}
          </h2>

          {filteredProducts.length > 0 ? (
            <Products products={filteredProducts} />
          ) : (
            <p className='text-center text-muted'>
              No products found in this category
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
