import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import userAPI from '../../api/user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { API_ENDPOINT } from '../../api/index'
import './UserAccount.css';
import clearSlices from './clearSlices';
import { getRoleText } from '../../utils';

import HubNavbar from '../hub/HubNavbar';


/*
Process:
- Starts by just showing id, username, and is_active state
- When user deletes their account it deletes from the database and clears all slices
- When user logs out it simply changes is_active state in database and clears all slices
*/

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        await userAPI.deleteUser(user.id);

        alert('Account deleted successfully!');
        clearSlices(dispatch);
        navigate('/');

        const response = await axios.get(`${API_ENDPOINT}/logout`);
  
        if (response.data.success) {
          alert('Account deleted successfully!');
          clearSlices(dispatch);
          navigate('/');
        } else {
          alert('Failed to logout after deleting account.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again later.');
      }
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      userAPI.updateUser(user.id, { is_active: false })

      alert('Logged out successfully!');                
      clearSlices(dispatch);
      navigate('/'); // Redirect to home page

      const response = await axios.get(`${API_ENDPOINT}/logout`);
      
      if (response.data.success) {
        alert('Logged out successfully!');                
        clearSlices(dispatch);
        navigate('/'); // Redirect to home page
      } else {
          alert('Logout failed:', response.data.message);
      }
    } catch (error) {
        alert('Error: ' + error);
    }
};

  return (
    <div>
      <HubNavbar />
      <div className='user-account-page'>
        <div className='user-info-container'>
          {/* User Information */}
          <h1>User Account</h1>
          <p><u>User ID:</u> {user.id}</p>
          <p><u>Username:</u> {user.username}</p>
          <p><u>Role:</u> {getRoleText(user.role)}</p>
          <p>Is Muted: {user.is_muted}</p>
        </div>
        <div className='user-account-buttons'>
          {/* Buttons */}
          <button onClick={handleDeleteAccount}>Delete Account</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>

  );
};

export default UserAccount;