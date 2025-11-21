import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/scrollUtils';
import AdminPopup from './AdminPopup';

const AdminHeader = () => {
  return (
    <nav className='navbar navbar-expand-md navbar-light bg-light d-flex justify-content-between px-4' style={{zIndex: 20}}>
      <div className='container-fluid'>
          <Link
            className='navbar-brand text-primary fw-bold'
            to={'/'}
            onClick={scrollToTop}>
            Luxora
          </Link>

          <ul className='navbar-nav'>
            <li className='nav-item '>
              <AdminPopup />
            </li>
          </ul>      
       </div>
    </nav>
  );
};

export default AdminHeader;
