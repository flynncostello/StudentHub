import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllGroupChatrooms, setActiveGroupChatroom} from '../../../slices/groupChatroomSlice';
import groupChatroomsAPI from '../../../api/groupChatrooms';
import { resetChatroom } from '../../../slices/chatroomSlice';
import { setGroupChatroomLoading } from '../../../slices/loadingSlice';
import './GroupChatroomBox.css';

const GroupChatroomBox = ({ id }) => {
    const [chatroomInfo, setChatroomInfo] = useState({}); 

    const dispatch = useDispatch();
    const groupChatrooms = useSelector(selectAllGroupChatrooms);

    useEffect(() => {
        const chatroom = groupChatrooms[id];
        setChatroomInfo(chatroom);
    }, [id]);

    const retrieveGroupChatroomMessages = async () => {
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