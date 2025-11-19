import { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import Products from '../components/Products';
import Banner from '../components/Banner';
import useFetch from '../hooks/useFetch';
import { Spin } from 'antd';
import CategoryList from '../components/CategoryList';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const { searchQuery } = useContext(SearchContext);
  const location = useLocation();
  const category = useFetch('/categories');
  const products = useFetch('/product');

  const filteredProducts = searchQuery
    ? products.data.products?.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.tags &&
            item.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      )
    : products.data.products;

  useEffect(() => {
    if (!products.loading && location.state?.scrollToProduct) {
      const scrollAfterRender = setTimeout(() => {
        const productsSection = document.querySelector('.productscroll');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.replaceState({}, document.title);
      }, 100);
      return () => clearTimeout(scrollAfterRender);
    }
  }, [products.loading, location.state]);

  if (category.loading || products.loading)
    return (
      <div
        className='d-flex justify-content-center align-items-center text-primary'
        style={{ height: '100vh' }}>
        <Spin size='large' />
      </div>
    );

  if (category.error || products.error)
    return <p className='text-center text-danger'>Error Loading data</p>;

  return (
    <>
      <Banner />

      <div className='container-fluid productscroll'>
        <div className='row mt-4'>
          <h2 className='text-center text-primary mb-4 '>Our Products</h2>

          <div className='col-md-3'>
            <CategoryList preloadedData={category.data} />
          </div>

          <div className='col-md-9'>
            {filteredProducts && filteredProducts.length > 0 ? (
              <Products products={filteredProducts} />
            ) : (
              <p className='text-center text-danger'>No products found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
