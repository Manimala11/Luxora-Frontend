import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

let Toast = false;

const ProtectedRoute = ({ children, adminOnly = false, redirectIfAdminHome = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    if (!Toast) {
      toast.info('Please login first');
      Toast = true;
    }
    return <Navigate to='/login' replace />;
  }
  if (adminOnly && user?.role !== 'admin') {
    if (!Toast) {
      toast.error('Unauthorized access');
      Toast = true;
    }
    return <Navigate to='/' replace />;
  }
  if (redirectIfAdminHome && user?.role === "admin") {   
    return <Navigate to="/admin/dashboard" replace />;
  }


  Toast = false;

  return children;
};
export default ProtectedRoute;
