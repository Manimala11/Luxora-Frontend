import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { scrollToProducts, scrollToTop } from '../utils/scrollUtils';

const CategoryList = ({ preloadedData }) => {
  const { categoryName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(categoryName);

  return (
    <div className='d-none d-md-block border-end h-100 overflow-auto'>
      <h5 className='text-center mb-3 mt-2 text-primary'>Choose Category</h5>
      <ul>
        <li style={{ listStyleType: 'none' }} className='mb-2'>
          <Link className='text-decoration-none text-dark' to={'/'}>
            <button
              className={`btn btn-sm w-75 text-start btn-light`}
              onClick={scrollToProducts}>
              All
            </button>
          </Link>
        </li>

        {preloadedData?.categories?.map((category, index) => {
          const isActive =
            selectedCategory?.toLowerCase() === category?.toLowerCase();

          return (
            <li style={{ listStyleType: 'none' }} key={index} className='mb-2'>
              <Link
                className='text-decoration-none text-dark'
                to={`/category/${category}`}>
                <button
                  className={`btn btn-sm w-75 text-start ${
                    isActive ? 'btn-primary text-white' : 'btn-light'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    scrollToTop();
                  }}>
                  {category}
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
