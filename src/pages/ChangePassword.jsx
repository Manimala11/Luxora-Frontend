import { useState } from 'react';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmNewPassword
    ) {
      toast.error('please fill all the fields');
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      toast.error('new password do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await api.put(
        '/auth/passwordUpdate',
        {
          newPassword: form.newPassword,
          currentPassword: form.currentPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Password updated');
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'something went wrong');
    }
  };
  return (
    <div className='container'>
      <div className='row m-3'>
        <div className='col-md-3'></div>
        <div className='col-12 col-md-6 d-flex justify-content-center'>
          <div className='card h-100 w-100 p-4 pt-2 mt-3 bg-light'>
            <h2 className='card-title text-center text-primary'>
              Change Password
            </h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3 mt-3'>
                <Input.Password
                  className='p-2'
                  id='currentPassword'
                  value={form.currentPassword}
                  placeholder='Enter your current password'
                  onChange={(e) =>
                    setForm({ ...form, currentPassword: e.target.value })
                  }
                />
              </div>
              <div className='mb-3'>
                <Input.Password
                  placeholder='Enter your new password'
                  className='p-2'
                  id='newPassword'
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                />
              </div>
              <div className='mb-3'>
                <Input.Password
                  placeholder='Confirm password'
                  className='p-2'
                  id='confirmPassword'
                  value={form.confirmNewPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmNewPassword: e.target.value })
                  }
                />
              </div>
              <div className='text-center mb-3'>
                <button type='submit' className='btn btn-primary w-75 '>
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='col-md-3'></div>
      </div>
    </div>
  );
};

export default ChangePassword;
