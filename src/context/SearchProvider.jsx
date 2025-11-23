import { useState } from 'react';
import SearchContext from './SearchContext';
import { navigateToProducts } from '../utils/scrollUtils';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value) => {
    const query = value !== undefined ? value : searchInput;
    if (!query.trim()) {
      setSearchQuery('');
      navigateToProducts(navigate, location);
      return;
    }
    setSearchQuery(searchInput);
    navigateToProducts(navigate, location);
  };

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
        searchQuery,
        setSearchQuery,
        handleSearch,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
