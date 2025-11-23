import { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollUtils';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import Popup from './Popup';

const Header = () => {
  const { count } = useContext(CartContext);
  const { searchInput, setSearchInput, handleSearch } =
    useContext(SearchContext);
  const { isLoggedIn } = useContext(UserContext);

  return (
    <nav className='navbar navbar-expand-md navbar-light bg-light fixed-top topscroll'>
      <div className='container-fluid'>
        <div className='container d-flex align-items-center'>
          <Link
            className='navbar-brand text-primary fw-bold '
            to={'/'}
            onClick={scrollToTop}>
            Luxora
          </Link>

          <div className='flex-grow-1'>
            <div className='input-group'>
              <input
                type='search'
                className='form-control'
                placeholder='Search Products'
                value={searchInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchInput(value);
                  handleSearch(value);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleSearch}>
                <i className='fa-solid fa-magnifying-glass'></i>
              </button>
            </div>
          </div>

          <button
            className='navbar-toggler ms-2'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
        </div>

        <div
          className='collapse navbar-collapse justify-content-end mt-3 mt-md-0'
          id='navbarNav'>
          <ul className='navbar-nav d-flex flex-row  align-items-center justify-content-evenly'>
            <li className='nav-item me-3'>
              <Link className='nav-link' to={'/myOrders'} onClick={scrollToTop}>
                <i className='fa-solid fa-bag-shopping me-2 fa-xl text-primary'></i>
              </Link>
            </li>
            <li className='nav-item me-3'>
              <Link
                className='nav-link btnposition'
                to={'/addToCart'}
                onClick={scrollToTop}>
                <i className='bi bi-cart text-bold fs-4 text-primary'></i>
                <div className='countforcart text-dark'>{count}</div>
              </Link>
            </li>
            <li className='nav-item'>
              {isLoggedIn ? (
                <Popup />
              ) : (
                <Link
                  className='nav-link border border-2 border-primary rounded px-3'
                  onClick={scrollToTop}
                  to={'/login'}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
