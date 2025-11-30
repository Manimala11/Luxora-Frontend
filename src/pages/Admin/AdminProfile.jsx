import { useEffect, useState } from 'react';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Profile from '../../assets/images.png'
import Loader from '../../components/Loader';

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
    try {
      const res = await api.get('/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmin(res.data.user);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load Admin');
    }
  };

  if (!admin) return <Loader/>

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div
        className='card shadow-lg p-4'
        style={{ maxWidth: '480px', width: '100%' }}>
        <h3 className='text-center text-primary mb-2'>Admin Profile</h3>
        
        <div className="text-center mb-2">
          <img
            src={Profile}
            alt="Admin"
            className="rounded-circle shadow avatar-img"
            width={90}
            height={90}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h5 className="mb-0">{admin.name}</h5>
            <small className="text-muted">{admin.email}</small>
          </div>
          <span className="badge bg-primary">{admin.role}</span>
        </div>

        <hr className='my-3'/>

        <div className="bg-light p-3 rounded mb-4">
          <p className="mb-2">
            <strong>Joined: </strong>
            {admin.createdAt
              ? new Date(admin.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <button
          className="btn btn-outline-primary w-100 mb-3"
          onClick={() => navigate("/admin/products")}
        >
          Manage Products
        </button>
        <button
          className="btn btn-outline-warning w-100 mb-3"
          onClick={() => navigate("/admin/users")}
        >
          Manage Users
        </button>
        <button
          className="btn btn-outline-success w-100 mb-3"
          onClick={() => navigate("/admin/orders")}
        >
         Manage Orders
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

export default AdminProfile;
