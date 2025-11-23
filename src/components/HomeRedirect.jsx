import { Navigate } from 'react-router-dom';
import Home from '../pages/Home';

const HomeRedirect = () => {
  let user = null;
  try{
     user = JSON.parse(localStorage.getItem('user'));
  } catch(err){}
  if (!user) return <Home />;
  if (user?.role === 'admin') return <Navigate to='/admin/dashboard' replace />;
  return <Home />;
};

export default HomeRedirect;
