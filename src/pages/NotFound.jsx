import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import notFoundImg from '../assets/404.png';


const NotFound = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100 text-center p-3'>
      <motion.img
        src={notFoundImg}
        alt='404 Not Found'
        width={300}
        height={200}
        className='img-fluid mb-3 mt-3'
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <h2 className='mb-3 text-danger'>Page Not Found</h2>
      <p className='mb-4'>Oops! The page you are looking for doesn’t exist.</p>
      <Link to='/' className='btn btn-primary'>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
