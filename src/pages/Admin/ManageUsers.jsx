import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Popconfirm } from 'antd';
import { toast } from 'react-toastify';

import {
  CrownOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  UserOutlined,
} from '@ant-design/icons';

const ManageUsers = () => {
  const {
    users,
    getUsers,
    deleteUser,
    blockUser,
    makeAdmin,
    user: currentUser,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      await getUsers();
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h4 className='text-center mb-3 mt-4 text-primary px-3 px-md-0'>Users Management</h4>
      <div className='table table-responsive w-100 text-center'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th className='text-start'>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan='6' className='text-center text-primary fw-bold'>
                  Loading...
                </td>
              </tr>
            )}
            {!loading && error && (
              <tr>
                <td colSpan='6' className='text-center text-danger fw-bold'>
                  Failed to load products
                </td>
              </tr>
            )}
            {!loading && !error && users.length === 0 && (
              <tr>
                <td colSpan='6' className='text-danger text-center fw-bold'>
                  No orders found
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td
                    style={{
                      color: u.role === 'admin' ? '#b58900' : '#6c757d',
                      fontSize: '20px',
                    }}>
                    {u.role === 'admin' ? <CrownOutlined /> : <UserOutlined />}
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    {u.isBlocked ? (
                      <span className='badge bg-danger'>Blocked</span>
                    ) : (
                      <span className='badge bg-success'>Active</span>
                    )}
                  </td>

                  <td className='text-start'>
                    {currentUser?.role === 'admin' && (
                      <div className='d-flex gap-2 '>
                        <Popconfirm
                          title={`Are you sure to ${
                            u.isBlocked ? 'unblock' : 'block'
                          } this user?`}
                          onConfirm={async () => {
                            try {
                              await blockUser(u._id);
                              fetchUsers();
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          okText='Yes'
                          cancelText='No'>
                          {u.isBlocked ? (
                            <span
                              className='text-warning me-2'
                              style={{ cursor: 'pointer', fontSize: '20px' }}>
                              <LockOutlined />
                            </span>
                          ) : (
                            <span
                              className='text-primary me-2'
                              style={{ cursor: 'pointer', fontSize: '20px' }}>
                              <UnlockOutlined />
                            </span>
                          )}
                        </Popconfirm>
                        <Popconfirm
                          title='Are you sure to delete this user?'
                          onConfirm={async () => {
                            if (u.role === 'admin') {
                              toast.error('You cannot block another admin!');
                              return;
                            }
                            try {
                              await deleteUser(u._id);
                              getUsers();
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          okText='Yes'
                          cancelText='No'>
                          <span
                            className='text-danger me-2'
                            style={{ cursor: 'pointer', fontSize: '20px' }}>
                            <DeleteOutlined />
                          </span>
                        </Popconfirm>
                        {u.role !== 'admin' && (
                          <Popconfirm
                            title='Are you sure to make this user an admin?'
                            onConfirm={async () => {
                              try {
                                await makeAdmin(u._id);
                                getUsers();
                              } catch (err) {
                                console.error(err);
                              }
                            }}>
                            <span
                              className=' me-2'
                              style={{
                                cursor: 'pointer',
                                fontSize: '20px',
                                color: '#6c757d',
                              }}>
                              <UserOutlined />
                            </span>
                          </Popconfirm>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
