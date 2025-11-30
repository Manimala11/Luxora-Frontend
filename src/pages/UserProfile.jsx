import { useEffect, useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Profile from '../assets/images.png'
import Loader from '../components/Loader';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get('/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load user');
    }
  };

  if (!user) return <Loader/>

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div
        className='card shadow-lg p-4'
        style={{ maxWidth: '480px', width: '100%' }}>
        <h3 className='text-center text-primary mb-3'>User Profile</h3>
        
        <div className="text-center mb-4">
          <img
            src={Profile}
            alt="User"
            className="rounded-circle shadow avatar-img"
            width={90}
            height={90}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-0">{user.name}</h5>
            <small className="text-muted">{user.email}</small>
          </div>
          <span className="badge bg-primary">{user.role}</span>
        </div>

        <hr className='my-3'/>

        <div className="bg-light p-3 rounded mb-4">
          <p className="mb-2">
            <strong>Joined: </strong>
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <button
          className="btn btn-outline-secondary w-100 mb-3"
          onClick={() => navigate("/myOrders")}
        >
          View my orders
        </button>
        <button
          className="btn btn-outline-success w-100 mb-3"
          onClick={() => navigate("/addToCart")}
        >
          View Cart
        </button>
        <button
          className="btn btn-primary w-100"
          onClick={() => navigate("/changePassword")}
        >
          Change Password
        </button>
      
      </div>
      <style>
        {`
          .avatar-img {
          transition: transform 0.5s ease;
          cursor: pointer;
          }
          .avatar-img:hover {
            transform: scale(1.10);
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;
