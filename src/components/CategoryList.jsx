import { scrollToProducts } from '../utils/scrollUtils';

const CategoryList = ({ preloadedData, selectedCategory, onSelectCategory }) => {
  return (
    <div
      className='d-none d-md-block border-end h-100 overflow-auto'
      style={{ position: 'sticky', top: '15%', height: '100vh', maxHeight: '100vh' }}
    >
      <h5 className='text-center mb-3 mt-2 text-primary'>Choose Category</h5>
      <ul>
        {/* All Button */}
        <li style={{ listStyleType: 'none' }} className='mb-2'>
          <button
            className={`btn btn-sm w-75 text-start ${
              selectedCategory === 'All' ? 'btn-primary text-white' : 'btn-light'
            }`}
            onClick={() => {
              onSelectCategory('All');
              scrollToProducts();
            }}
          >
            All
          </button>
        </li>

        {/* Dynamic categories */}
        {preloadedData?.categories?.map((category, index) => (
          <li style={{ listStyleType: 'none' }} key={index} className='mb-2'>
            <button
              className={`btn btn-sm w-75 text-start ${
                selectedCategory?.toLowerCase() === category?.toLowerCase()
                  ? 'btn-primary text-white'
                  : 'btn-light'
              }`}
              onClick={() => {
                onSelectCategory(category);
                scrollToProducts();
              }}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

