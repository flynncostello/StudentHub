import React from 'react';
import User from '../user/User';
import Friends from './friendsList/Friends';
import NewFriend from './addNewFriend/NewFriend';
import Chatroom from './chatroom/Chatroom';
import GroupChatroomChatbox from './chatroom/GroupChatroomChatbox';
import FriendRequests from './friendRequests/FriendRequests';
import GroupChatrooms from './chatroom/GroupChatrooms';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectChatroom } from '../../slices/chatroomSlice';
import { selectActiveGroupChatroom } from '../../slices/groupChatroomSlice';
import { selectLoadings } from '../../slices/loadingSlice';

import './Dashboard.css';

const Dashboard = () => {
    const chatroom = useSelector(selectChatroom);
    const activeGroupChatroom = useSelector(selectActiveGroupChatroom);
    const privateChatroomLoading = useSelector(selectLoadings).privateChatroomLoading;
    const groupChatroomLoading = useSelector(selectLoadings).groupChatroomLoading;

    return (
        <div className='dashboard'>
            {/* Left Column */}
            <div className='left-column'>
                {/* Top Icons */}
                <div className='top-icons'>
                    <User />
                    <NewFriend />
                </div>
                {/* Search Bar */}
                <div className='search-bar'>

                </div>
                {/* Friends List */}
                <Friends />
            </div>

            {/* Middle Column */}
            <div className='middle-column'>
                {privateChatroomLoading || groupChatroomLoading ? (
                    <svg class="loading-spinner" viewBox="25 25 50 50">
                        <circle class="loading-circle" r="20" cy="50" cx="50"></circle>
                    </svg>
                ) : chatroom.id !== null ? (
                    <Chatroom />
                ) : Object.keys(activeGroupChatroom).length !== 0 ? (
                    <GroupChatroomChatbox />
                ) : (
                    <div className='empty-chatroom-container'>
                        <FontAwesomeIcon icon={faComments} className='empty-chatroom-icon' />
                        <p className='empty-chatroom-instruction-text'>Click on a friend to start a chat</p>
                    </div>
                )}
            </div>

            {/* Right Column */}
            <div className='right-column'>
                {/* Friend Requests */}
                <FriendRequests />
                <GroupChatrooms />
            </div>

        </div>
    );
};

export default Dashboard;


