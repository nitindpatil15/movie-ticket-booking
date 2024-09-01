// ViewAllUsers.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ViewAllUsers.css';
import { deleteUser, fetchAllUsers } from '../../Redux/User/userSlice';
import UserUpdatePopup from './UserUpdatePopup';

const ViewAllUsers = () => {
  const dispatch = useDispatch();
  const { users, userstatus, usererror } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user for updating

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleUpdate = (user) => {
    setSelectedUser(user); // Set the selected user to open the popup
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleClosePopup = () => {
    setSelectedUser(null); // Close the popup
  };

  if (userstatus === 'loading') return <div>Loading...</div>;
  if (userstatus === 'failed') return <div>Error: {usererror}</div>;

  return (
    <>
      <div className="container">
        <div className="mb-2"> 
          <div className="text" >View All User Data</div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn-1"
                    onClick={() => handleUpdate(user)}
                  >
                    <i className="fa fa-pencil-square-o"></i> Update
                  </button>
                  <button
                    className="btn-2"
                    onClick={() => handleDelete(user._id)}
                  >
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <UserUpdatePopup user={selectedUser} onClose={handleClosePopup} />
      )}
    </>
  );
};

export default ViewAllUsers;
