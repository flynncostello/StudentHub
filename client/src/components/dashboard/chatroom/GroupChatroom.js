import React, { useState } from 'react';
import './GroupChatroom.css';
import { selectFriends } from '../../../slices/friendsSlice';
import { useSelector } from 'react-redux';

const GroupChatroom = () => {
    const [groupChatrooms, setGroupChatrooms] = useState([]);
    const [creatingNewGroupChatroom, setCreatingNewGroupChatroom] = useState(false);
    const [participants, setParticipants] = useState({});
    const friends = useSelector(selectFriends);

    return (
        <div className='group-chatroom-container'>
            <h1>Group Chatrooms</h1>

            <div className='group-chatrooms-box'>
                <button className='create-new-group-chatroom-button' onClick={() => setCreatingNewGroupChatroom(true)}>+</button>

                {groupChatrooms.length > 0 ? (
                    groupChatrooms.map((group_chatroom) => (
                        <GroupChatroom id={group_chatroom.id} />
                    ))
                ) : (
                    <p className='group-chatrooms-empty-text'>No group chatrooms. Tap the plus to create one</p>
                )}
            </div>

            {creatingNewGroupChatroom && (
                <form className='create-new-group-chatroom-form'>
                    <button onClick={() => setCreatingNewGroupChatroom(false)}>X</button>
                    <input type='text' placeholder='Enter group chatroom name' />
                    <button>Submit</button>
                </form>
            )}

        </div>
    );
};

export default GroupChatroom;