import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

let toastShown = false;

const ProtectedRoute = ({ children, adminOnly = false, redirectIfAdminHome = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!token) {
    if (!toastShown) {
      toast.info('Please login first');
      toastShown = true;
    }
    return <Navigate to='/login' replace />;
  }
  if (adminOnly && user?.role !== 'admin') {
    if (!toastShown) {
      toast.error('Unauthorized access');
      toastShown = true;
    }
    return <Navigate to='/' replace />;
  }
  if (redirectIfAdminHome && user?.role === "admin") {   
    return <Navigate to="/admin/dashboard" replace />;
  }


  toastShown = false;

  return children;
};
export default ProtectedRoute;
