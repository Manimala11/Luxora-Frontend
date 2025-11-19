import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminHeaderFooterLayout = () => {
  return (
    <>
     <AdminHeader />
      <div className='container-fluid p-0 bg-light'>
         
        <div className='row g-0'>
          <div className='col-md-3 px-0'>
            <AdminSidebar/>
          </div>

          <div className='col-md-9 px-4'>
            
            <Outlet />
            <AdminFooter/>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default AdminHeaderFooterLayout;
