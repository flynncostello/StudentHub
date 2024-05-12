import React, { useState, useEffect } from 'react';

import groupChatroomsAPI from '../../../api/groupChatrooms';

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import { selectActiveGroupChatroom, resetActiveGroupChatroom, addMessageToActiveGroupChatroom } from "../../../slices/groupChatroomSlice";

import './GroupChatroomChatbox';

import { socket } from '../../login/Login';


// Group Chatroom Component (As many people as you want)
const GroupChatroomChatbox = () => {
    const [message, setMessage] = useState('');

    const user_id = useSelector(selectUser).id;
    const chatroom_info = useSelector(selectActiveGroupChatroom);

    const dispatch = useDispatch();


    // Handles sending message to database //
    const sendMessageToDatabase = async (chatroom_id, chatroom_index, sender_id, content) => {
        try {
            const created_message = await groupChatroomsAPI.createGroupChatroomMessage(chatroom_id, { sender_id, chatroom_index, content });
        } catch (error) {
            console.error("Error saving message to database:", error);
        }
    }

    ///////////////////////////////////////
    // SETTING UP CONNECTION TO CHATROOM //
    ///////////////////////////////////////
    // Including protocol for receiving messages and joining room
    useEffect(() => {
        const chatroom_id = chatroom_info.id;
        if (chatroom_id !== null) {
            console.log("MOVING TO NEW CHATROOM")
            // Join the chat room socket
            socket.emit('join-room', chatroom_id);
            // Listen for incoming messages
            socket.on('receive-message-groupchat', (data) => {
                const { message, senderId, chatroom_index } = data;
                console.log("Received message over socket from friend: ", message, ', with senderId: ', senderId, ', and chatroom_index: ', chatroom_index);
                dispatch(addMessageToActiveGroupChatroom({ chatroom_id: chatroom_id,  chatroom_index, sender_id: senderId, content: message }));
            });
        }
        // Clean up event listeners when the component unmounts or when the chatroom changes
        return () => {
            socket.off('receive-message');
            socket.off('receive-message-groupchat'); // Add this line
            socket.emit('leave-room', chatroom_id);
        };
    
    }, [chatroom_info.id]);

  

    //////////////////////////
    // SUBMITTING A MESSAGE //
    //////////////////////////
    const handleSubmitMessage = async (event) => {
        event.preventDefault();
        // Next check if message is empty
        if (message.trim() === '') {
            alert('Please enter a message');
            return;
        };
        // Now send message
        console.log("Sending message now...")

        const message_index = Object.keys(chatroom_info.messages).length;
        console.log("New message index: ", message_index)

        // ADDING MESSAGE PLAINTEXT TO SLICE //
        dispatch(addMessageToActiveGroupChatroom({ chatroom_id: chatroom_info.id,  chatroom_index: message_index, sender_id: user_id, content: message }));
        console.log("Message added to local slice")

        // SENDING MESSAGE ACCROSS SOCKET
        socket.emit('send-message-groupchat', { roomId: chatroom_info.id, message, senderId: user_id, chatroom_index: message_index });

        // SENDING MESSAGE TO DATABASE
        await sendMessageToDatabase(chatroom_info.id, message_index, user_id, message);

        setMessage('');
    };

    // LEAVING CHAT //
    const handleLeaveChat = () => {
      dispatch(resetActiveGroupChatroom());
    }
  

  return (
    <div className='chatroom-container'>
        {/* Chatroom */}
        <button className='leave-chat-button' onClick={handleLeaveChat}>Leave Chat</button>
        <div className='chats-container'>
        {chatroom_info.messages.length > 0 && chatroom_info.messages.map((obj, index) => (
                <div key={index} className='chat-bubble'>
                    <p className={obj.sender_id === user_id ? 'user-message' : 'friend-message'}>{obj.content} (Sent by, {obj.sender_id})</p>
                </div>
            ))}
        </div>
        <form className='input-chat-form' onSubmit={handleSubmitMessage}>
        <input
            type='text'
            className='chat-input'
            placeholder='Type a message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button className='chat-input-submit-button' type='submit'>Send</button>
        </form>
    </div>
  );
}

export default GroupChatroomChatbox;