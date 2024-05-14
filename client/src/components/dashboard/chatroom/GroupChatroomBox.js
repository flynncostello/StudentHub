import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllGroupChatrooms, setActiveGroupChatroom} from '../../../slices/groupChatroomSlice';
import groupChatroomsAPI from '../../../api/groupChatrooms';
import { resetChatroom } from '../../../slices/chatroomSlice';
import { setGroupChatroomLoading } from '../../../slices/loadingSlice';
import { selectUser, setUserMutedState } from '../../../slices/userSlice';
import userAPI from '../../../api/user';
import './GroupChatroomBox.css';

const GroupChatroomBox = ({ id }) => {
    const [chatroomInfo, setChatroomInfo] = useState({}); 

    const dispatch = useDispatch();
    const groupChatrooms = useSelector(selectAllGroupChatrooms);
    const user = useSelector(selectUser);


    useEffect(() => {
        const chatroom = groupChatrooms[id];
        setChatroomInfo(chatroom);
    }, [id]);


    const check_user_muted_state = async () => {
        const user_data = await userAPI.getUser(user.id);
        const user_muted_state = user_data.is_muted;
        console.log("Users muted state: ", user_muted_state)
        dispatch(setUserMutedState(user_muted_state));
        return user_muted_state;
    };
    

    const retrieveGroupChatroomMessages = async () => {
        const user_muted = await check_user_muted_state();
        if (user_muted) {
            alert('You are muted and cannot open a group chatroom');
            return;
        };
        dispatch(setGroupChatroomLoading(true));
        // First we close any chat which might be open in private 2 person chat
        dispatch(resetChatroom());

        const groupChatroomMessages = await groupChatroomsAPI.getGroupChatroomMessages(id);
        const active_chatroom = {
            id: id,
            host_id: chatroomInfo.host_id,
            name: chatroomInfo.name,
            participants: chatroomInfo.participants,
            messages: groupChatroomMessages,
        }
        console.log("NEW ACTIVE CHATROOM INFO: ", active_chatroom);
        dispatch(setActiveGroupChatroom(active_chatroom));
        dispatch(setGroupChatroomLoading(false));
    }

    return (
        <div className='individual-group-chatroom-container'>
            <p>{chatroomInfo.name}</p>
            <button onClick={retrieveGroupChatroomMessages}>Open</button>
        </div>
    );
};

export default GroupChatroomBox;