import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { handleLogout } = useContext(UserContext);

  return (
    <div>
      <div className='d-md-none bg-light border-bottom py-2 d-flex justify-content-between align-items-center px-3'>
        <h6 className='m-0 fw-bold text-primary'>Luxora</h6>
        <button
          className='btn btn-outline-primary btn-sm'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#adminSidebar'
          aria-expanded='false'
          aria-controls='adminSidebar'>
          <i className='fa-solid fa-bars'></i>
        </button>
      </div>

      <div
        className='collapse d-md-block bg-light position-fixed'
        id='adminSidebar'
        style={{
          left: 0,
          zIndex: 10,
          height: '100vh',
          // width: '250px',

          borderRight: '1px solid #dee2e6',
          overflowY: 'auto',
        }}>
        <ul className='nav flex-column p-3'>
          <h4 className='mt-3 mb-3 fw-bold text-primary'>Admin Panel</h4>
          <li className='nav-item mb-2'>
            <Link
              to={'/admin/dashboard'}
              className={`nav-link text-dark d-flex align-items-center px-2 py-2 ${
                location.pathname === '/admin/dashboard'
                  ? 'bg-primary text-white rounded'
                  : ''
              }`}>
              <i className='fa-solid fa-gauge-high me-2'></i> Dashboard
            </Link>
          </li>
          <li className='nav-item mb-2'>
            <Link
              to={'/admin/products'}
              className={`nav-link text-dark d-flex align-items-center  px-2 py-2 ${
                location.pathname === '/admin/products'
                  ? 'bg-primary text-white rounded'
                  : ''
              }`}>
              <i className='fa-solid fa-box me-2'></i> Products
            </Link>
          </li>
          <li className='nav-item mb-2'>
            <Link
              to={'/admin/orders'}
              className={`nav-link text-dark d-flex align-items-center  px-2 py-2 ${
                location.pathname === '/admin/orders'
                  ? 'bg-primary text-white rounded'
                  : ''
              }`}>
              <i className='fa-solid fa-cart-shopping me-2'></i> Orders
            </Link>
          </li>
          <li className='nav-item mb-2'>
            <Link
              to={'/admin/users'}
              className={`nav-link text-dark d-flex align-items-center  px-2 py-2 ${
                location.pathname === '/admin/users'
                  ? 'bg-primary text-white rounded'
                  : ''
              }`}>
              <i className='fa-solid fa-users me-2'></i> Users
            </Link>
          </li>
        </ul>
        <div className='p-3 border-top border-secondary'>
          <button
            className='btn btn-danger w-100 d-flex align-items-center justify-content-center'
            onClick={handleLogout}>
            <i className='fa-solid fa-right-from-bracket me-2'></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
