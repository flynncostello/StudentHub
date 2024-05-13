import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as regularUserIcon } from '@fortawesome/free-regular-svg-icons';
import { faUser as solidUserIcon, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';

import { useDispatch } from 'react-redux';
import clearSlices from './clearSlices';

import userAPI from '../../api/user';
import ROUTES from '../../routes';

import { API_ENDPOINT } from '../../api/index'

import './User.css';

/*
Process:
- Allows users to access their account setting or logout
- When logging out it changes the user's is_active status to false in the database, clears the user slice, and redirects to the home page
*/

const User = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await userAPI.updateUser(user.id, { is_active: false }) // Update user's is_active status in database

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
    
    const handleAccountSettings = () => {
        navigate(ROUTES.userAccount(user.id))
    }

    return (
        <div className='user'>
            <div className={`user-icon ${isOpen ? 'active' : ''}`} onClick={handleClick}>
                <FontAwesomeIcon icon={isOpen ? solidUserIcon : regularUserIcon} />
            </div>
            {isOpen && (
                <div className="dropdown">
                    <button onClick={handleAccountSettings}>Account Settings</button>
                    <button onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default User;
