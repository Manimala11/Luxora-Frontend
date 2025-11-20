import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { scrollToTop } from '../../utils/scrollUtils';
import { useEffect, useState, useContext, useRef } from 'react';
import handWave from '../../assets/hand-wave-icon.svg';
import Profile from '../../assets/images.png';
import { LayoutDashboard } from 'lucide-react';
import { Popconfirm } from 'antd';

const AdminPopup = () => {
  const { handleLogout, deleteUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <img
        src={Profile}
        alt='Admin'
        width={40}
        height={40}
        className='rounded-circle'
        style={{ cursor: 'pointer' }}
      />

      {open && (
        <div
          className='shadow rounded'
          style={{
            position: 'absolute',
            top: '110%',
            right: '0',
            background: 'white',
            width: '200px',
            zIndex: 10,
            padding: '10px',
          }}>
          <h6 className='mt-3'>
            Hello, {user?.name}!{' '}
            <img
              src={handWave}
              className='mb-2'
              alt='handwave'
              height={32}
              width={32}
            />
            
          </h6>

          <button
            className='dropdown-item mt-3 mx-3'
            onClick={() => {
              navigate('/admin/dashboard');
              scrollToTop();
              setOpen(false);
            }}>
            <LayoutDashboard size={24} color='#0d6efd'className='me-1'/>
            Dashboard
          </button>

          <button
            className='dropdown-item mt-3 mx-3 '
            onClick={() => {
              navigate('/changePassword');
              scrollToTop();
              setOpen(false);
            }}>
            <i className='fa-solid fa-right-left'></i> Change Password
          </button>

          {/* <button
            className='dropdown-item text-danger mt-3 mx-3'
            onClick={() => {
              deleteUser();
              setOpen(false);
            }}>
            <i className='fa-solid fa-trash'></i> Delete Account
          </button> */}

          <Popconfirm
            title='Are you sure to delete this user?'
            onConfirm={() => {
              deleteUser();
              setOpen(false);
            }}
            okText='Yes'
            cancelText='No'>
            <button className='dropdown-item text-danger mt-3 mx-3'>
              <i className='fa-solid fa-trash me-2'></i> Delete Account
            </button>
          </Popconfirm>

          <button
            className='dropdown-item mt-3 mx-3'
            onClick={() => {
              handleLogout();
              navigate('/');
              setOpen(false);
            }}>
            <i className='fa-solid fa-right-from-bracket'></i> Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default AdminPopup;
