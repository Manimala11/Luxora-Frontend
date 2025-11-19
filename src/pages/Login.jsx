import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { scrollToTop } from '../utils/scrollUtils';
import { useState } from 'react';
import api from '../api/api';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { triggerAuthUpdate } from '../utils/authUtils';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);

      if (res?.data?.token) {
        const user = res?.data?.user;
        localStorage.setItem('token', res?.data?.token);
        localStorage.setItem('user', JSON.stringify(res?.data?.user));
        triggerAuthUpdate();
        toast.success('Login Successful!');
        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        console.error('No token found in response:', res.data);
        toast.warning('Login failed: No token received');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(
        err.response?.data?.message
          ? `Login failed: ${err?.response?.data?.message}`
          : 'Login Failed'
      );
    }
  };

  return (
    <div className='container'>
      <div className='row m-3'>
        <div className='col-md-3'></div>
        <div className='col-12 col-md-6 d-flex justify-content-center'>
          <div className='card h-100 w-100 p-4 pt-2 mt-3 bg-light'>
            <h2 className='card-title text-center text-primary'>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3 mt-3'>
                <Input
                  type='email'
                  className='p-2'
                  id='email'
                  value={form.email}
                  placeholder='Enter your email'
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className='mb-3'>
                <Input.Password
                  placeholder='Enter password'
                  className='p-2'
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  value={form.password}
                />
              </div>
              <div className='text-center mb-3'>
                <button type='submit' className='btn btn-primary w-75 '>
                  Login
                </button>
              </div>
              <div className='mb-3'>
                <Link to={'forget-password'}>Forget Password?</Link>
              </div>
              <div>
                <p>
                  New User:{' '}
                  <Link to={'/register'} onClick={scrollToTop}>
                    Register Now
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className='col-md-3'></div>
      </div>
    </div>
  );
};

export default Login;