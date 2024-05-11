import React, { useState } from 'react';
import './GroupChatroom.css';
import { selectFriends } from '../../../slices/friendsSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import groupChatroomsAPI from '../../../api/groupChatrooms';

const GroupChatroom = () => {
    const [groupChatrooms, setGroupChatrooms] = useState([]);
    const [creatingNewGroupChatroom, setCreatingNewGroupChatroom] = useState(false);
    const [newChatroomParticipants, setNewChatroomParticipants] = useState({});
    const [newChatroomName, setNewChatroomName] = useState('');
    const [clickedButtons, setClickedButtons] = useState({});
    const friends = useSelector(selectFriends);
    const user = useSelector(selectUser);

    const handleSubmitGroupchatForm = async (e) => {
        e.preventDefault();
        const host_id = user.id;
        await groupChatroomsAPI.createGroupChatroom(host_id, newChatroomParticipants, newChatroomName);
        setCreatingNewGroupChatroom(false);
        setNewChatroomName('');
        setNewChatroomParticipants({});
        setClickedButtons({});
    }

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
                <form className='create-new-group-chatroom-form' onSubmit={handleSubmitGroupchatForm}>
                    <button onClick={() => setCreatingNewGroupChatroom(false)}>X</button>
                    <h2>Create New Groupchat</h2>
                    <div className='new-groupchat-inputs'>
                        <label>Name: </label>
                        <input type='text' required placeholder='' onChange={(e) => setNewChatroomName(e.target.value)}/>
                        <label>Participants: </label>
                        {Object.keys(friends).map((friendshipId) => {
                            const friend = friends[friendshipId];
                            return (
                                <div key={friendshipId}>
                                    <span>{friend.username}</span>
                                    <button type="button" disabled={clickedButtons[friend.id]} onClick={() => {setNewChatroomParticipants({...newChatroomParticipants, [friend.id]: friend.username}); setClickedButtons({...clickedButtons, [friend.id]: true});}}>Add</button>
                                </div>
                            );
                        })}
                    </div>                    
                    <button className='create-group-chatroom-submit-button' type='submit'>Confirm</button>
                </form>
            )}

        </div>
    );
};

export default GroupChatroom;