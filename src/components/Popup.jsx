import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { scrollToTop } from '../utils/scrollUtils';
import { useEffect, useState, useContext, useRef } from 'react';
import handWave from '../assets/hand-wave-icon.svg';
import Profile from '../assets/images.png';
import DeleteModal from './DeleteModal';

const Popup = () => {
  const { handleLogout, deleteUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const handleNavigate = (path) => {
    navigate(path);
    scrollToTop();
    setOpen(false);
  };
  const handleDelete = () => {
    deleteUser();
    setShowDeleteModal(false);
    setOpen(false);
  };
  return (
    <>
      <div
        ref={dropdownRef}
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}>
        <img
          src={Profile}
          alt='User'
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
                handleNavigate('/profile');
              }}>
              <i className='fa-solid fa-user me-2'></i> My Profile
            </button>

            <button
              className='dropdown-item mt-3 mx-3'
              onClick={() => {
                handleNavigate('/myOrders');
              }}>
              <i className='fa-solid fa-bag-shopping me-2'></i> My orders
            </button>
            <button
              className='dropdown-item mt-3 mx-3'
              onClick={() => {
                handleNavigate('/changePassword');
              }}>
              <i className='fa-solid fa-right-left'></i> Change Password
            </button>
            <button
              className='dropdown-item text-danger mt-3 mx-3'
              onClick={() => {
                setShowDeleteModal(true);
                setOpen(false);
              }}>
              <i className='fa-solid fa-trash me-2'></i> Delete Account
            </button>
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
      <DeleteModal
        open={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        message='Are you sure you want to delete your account?'
      />
    </>
  );
};

export default Popup;
