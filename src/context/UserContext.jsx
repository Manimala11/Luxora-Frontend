import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { listenToAuthChanges, triggerAuthUpdate } from '../utils/authUtils';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await api.get('/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res?.data?.user);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const getUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await api.get('/auth/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data?.users || []);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    const cleanup = listenToAuthChanges(setIsLoggedIn);

    const handleTokenExpired = () => {
      toast.info('Session expired. Please log in again.');
      handleLogout(false);
      navigate('/');
    };
    window.addEventListener('tokenExpired', handleTokenExpired);

    return () => {
      cleanup();
      window.removeEventListener('tokenExpired', handleTokenExpired);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);

  const deleteUser = async (userId = null) => {
    try {
      const token = localStorage.getItem('token');
      const idToDelete = userId || user?._id;
      if (!idToDelete) return;
      await api.delete(`/auth/delete/${idToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!userId) {
        handleLogout(false);
        toast.info('Your account has been deleted');
        navigate('/');
      } else {
        toast.info('user deleted successfully');
        getUsers();
      }
    } catch (error) {
      console.error('Failed to delete user');
      toast.error('Failed to delete user');
    }
  };

  const handleLogout = async (showToast = true) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setIsLoggedIn(false);
    triggerAuthUpdate();
    if (showToast) toast.info('Logged Out successfully');
  };

  const blockUser = async (userId) => {
    if (!userId) return;
    if (userId === user?._id) {
      toast.error('You cannot block yourself!');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!userId) return;
      const res = await api.patch(
        `/auth/block/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.info(res.data.message);
      getUsers();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update user status');
    }
  };

  const makeAdmin = async (userId) => {
    if (!userId) return;
    if (userId === user?._id) {
      toast.error('You are already admin!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await api.patch(
        `/auth/make-admin/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);

      setUsers(prevUsers=>
        prevUsers.map(u =>
          u._id === userId ? {...u, role:'admin'} : u
        )
      )
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to update user role');
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        handleLogout,
        deleteUser,
        users,
        getUsers,
        blockUser,
        makeAdmin
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
