import React, { useState, useEffect } from 'react';
import './GroupChatrooms.css';
import { selectFriends } from '../../../slices/friendsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import groupChatroomsAPI from '../../../api/groupChatrooms';
import GroupChatroomBox from './GroupChatroomBox';
import { selectAllGroupChatrooms, addGroupChatroomToAll } from '../../../slices/groupChatroomSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const GroupChatrooms = () => {
    //const [groupChatrooms, setGroupChatrooms] = useState([]);
    const [creatingNewGroupChatroom, setCreatingNewGroupChatroom] = useState(false);
    const [newChatroomName, setNewChatroomName] = useState('');
    const [clickedButtons, setClickedButtons] = useState({});

    const friends = useSelector(selectFriends);
    const user = useSelector(selectUser);
    const [newChatroomParticipants, setNewChatroomParticipants] = useState({ [user.id]: [user.username] });

    const groupChatrooms = useSelector(selectAllGroupChatrooms);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsersExistingGroupChatrooms = async () => {
            const groupChatrooms = await groupChatroomsAPI.getAllUsersGroupChatrooms(user.id);
            groupChatrooms.forEach(groupChatroom => {
                console.log("GROUP CHATROOM: ", groupChatroom);
                dispatch(addGroupChatroomToAll(groupChatroom));
            });
            //console.log("EXISTING USERS GROUP CHATROOMS IN COMPONENT: ", groupChatrooms);
            //setGroupChatrooms(groupChatrooms);
        }
        fetchUsersExistingGroupChatrooms();

        console.log("CURRENT GROUP CHATROOMS DISPATCHED THING: ", groupChatrooms)
    }, [user.id]);

    const handleSubmitGroupchatForm = async (e) => {
        e.preventDefault();
        const host_id = user.id;
        // Send new group chatroom to database
        const new_group_chatroom = await groupChatroomsAPI.createGroupChatroom(host_id, newChatroomParticipants, newChatroomName);
        setCreatingNewGroupChatroom(false);
        setNewChatroomName('');
        setNewChatroomParticipants({});
        setClickedButtons({});
        // Add new group chatroom to state
        dispatch(addGroupChatroomToAll(new_group_chatroom))
    }

    return (
        <div className='group-chatroom-container'>
            <h1>Group Chatrooms</h1>

            <div className='group-chatrooms-box'>
                <button className='create-new-group-chatroom-button' onClick={() => setCreatingNewGroupChatroom(true)}>+</button>

                <div className='group-chats-components-container'>
                    {Object.keys(groupChatrooms).length > 0 ? (
                        Object.values(groupChatrooms).map((group_chatroom) => (
                            <div key={group_chatroom.id}>
                                <GroupChatroomBox id={group_chatroom.id} />
                            </div>
                        ))
                    ) : (
                        <p className='group-chatrooms-empty-text'>No group chatrooms. Tap the plus to create one</p>
                    )}
                </div>

            </div>

            {creatingNewGroupChatroom && (
                <form className='create-new-group-chatroom-form' onSubmit={handleSubmitGroupchatForm}>
                    <FontAwesomeIcon icon={faTimesCircle} className="exit-create-new-groupchat-form-button" onClick={() => setCreatingNewGroupChatroom(false)} />
                    <h2>Create New Groupchat</h2>
                    <div className='new-groupchat-inputs'>
                        <label>Name: </label>
                        <input type='text' className='groupchat-name-input-box' required placeholder='' onChange={(e) => setNewChatroomName(e.target.value)}/>
                        <div className='participants-container'>
                            <label>Participants: </label>
                            <div className='actual-participants'>
                                {Object.keys(friends).map((friendshipId) => {
                                    const friend = friends[friendshipId];
                                    return (
                                        <div className='participant-choice' key={friendshipId}>
                                            <span>{friend.username}</span>
                                            <button type="button" disabled={clickedButtons[friend.id]} onClick={() => {setNewChatroomParticipants({...newChatroomParticipants, [friend.id]: friend.username}); setClickedButtons({...clickedButtons, [friend.id]: true});}}>Add</button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>                    
                    <button className='create-group-chatroom-submit-button' type='submit'>Confirm</button>
                </form>
            )}

        </div>
    );
};

export default GroupChatrooms;