import { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Button, Popconfirm } from 'antd';
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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h4>Users Management</h4>
      <div className='table table-responsive w-100 text-center'>
        <table className='table'>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users && users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td
                    style={{ color: u.role === 'admin' ? '#b58900' : '#6c757d', fontSize: '20px' }}>
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

                  <td>
                    {currentUser?.role === 'admin' && (
                      <div className='d-flex gap-2 justify-content-center'>
                        <Popconfirm
                          title={`Are you sure to ${
                            u.isBlocked ? 'unblock' : 'block'
                          } this user?`}
                          onConfirm={async () => {
                            try {
                              await blockUser(u._id);
                              getUsers();
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
                        {u.role !== 'admin' &&
                          <Popconfirm
                            title='Are you sure to make this user an admin?'
                            onConfirm={async () => {
                              try {
                                await makeAdmin(u._id);
                                getUsers();
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            >
                            <span
                              className=' me-2'
                              style={{ cursor: 'pointer', fontSize: '20px', color: '#6c757d' }}>
                              <UserOutlined />
                            </span>
                          </Popconfirm>
                        }
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6'>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
