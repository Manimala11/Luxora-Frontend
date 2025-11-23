import { useContext, useState, useEffect, useMemo } from 'react';
import SearchContext from '../context/SearchContext';
import Products from '../components/Products';
import Banner from '../components/Banner';
import useFetch from '../hooks/useFetch';
import { Spin } from 'antd';
import CategoryList from '../components/CategoryList';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { searchQuery } = useContext(SearchContext);
  const location = useLocation();

  const category = useFetch('/categories');
  const products = useFetch('/product');
  const [selectedCategory, setSelectedCategory] = useState('All');
   
  const filteredProducts = useMemo(() => {
    return products.data?.products?.filter((item) => {
      const matchesSearch = searchQuery
        ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ))
        : true;

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products.data, searchQuery, selectedCategory]);

  useEffect(() => {
    if (!products.loading && location.state?.scrollToProduct) {
      const timeoutId = setTimeout(() => {
        const productsSection = document.querySelector('.productscroll');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.replaceState({}, document.title);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [products.loading, location.state]);

  if (category.loading || products.loading)
    return (
      <div
        className='d-flex justify-content-center align-items-center text-primary'
        style={{ height: '100vh' }}
      >
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
         

          <div className='col-md-3'>
            <CategoryList
              preloadedData={category.data}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className='col-md-9'>
             <h2 className='text-center text-primary mb-4'>Our Products</h2>
            {filteredProducts?.length > 0 ? (
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

