import { Navigate } from 'react-router-dom';
import Home from '../pages/Home';

const HomeRedirect = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user?.role === 'admin') {
    return <Navigate to='/admin/dashboard' replace />;
  }
  return <Home />;
};

export default HomeRedirect;
