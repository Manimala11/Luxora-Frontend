import { useState } from 'react';
import { Input, Select } from 'antd';
import { scrollToTop } from '../utils/scrollUtils';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import { triggerAuthUpdate } from '../utils/authUtils';

const { Option } = Select;

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    role: 'user',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmpassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const res = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success('Registered successful!');
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res?.data?.user));
          triggerAuthUpdate();

          if (res?.data?.user?.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }
      } else {
        toast.error('Unexpected response from server.');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className='container'>
      <div className='row m-3'>
        <div className='col-md-3'></div>
        <div className='col-12 col-md-6'>
          <div className='card h-100  p-5 pt-2 mt-3 bg-light align-items-center'>
            <h2 className='card-title text-center text-primary'>Register</h2>
            <form className='w-100' onSubmit={handleSubmit}>
              <div className='mb-3 mt-3'>
                <Input
                  type='text'
                  className='p-2'
                  placeholder='Enter username'
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  value={form.name}
                />
              </div>
              <div className='mb-3'>
                <Input
                  type='email'
                  className='p-2'
                  placeholder='Enter email'
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  value={form.email}
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
              <div className='mb-3'>
                <Input.Password
                  className='p-2'
                  placeholder='Confirm password'
                  value={form.confirmpassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmpassword: e.target.value })
                  }
                />
              </div>
              {/* <div className='mb-3'>
                <Select
                  value={form.role}
                  style={{ width: '100%' }}
                  onChange={(value) => setForm({ ...form, role: value })}>
                  <Option value='user'>User</Option>
                  <Option value='admin'>Admin</Option>
                </Select>
              </div> */}

              <div className='text-center mb-3'>
                <button type='submit' className='btn btn-primary w-75 '>
                  Register
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{' '}
                  <Link to={'/login'} onClick={scrollToTop}>
                    Login
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

export default Register;
