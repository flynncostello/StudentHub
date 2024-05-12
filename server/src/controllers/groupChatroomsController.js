const groupChatroomsModel = require('../models/groupChatroomsModel');

exports.getAllUsersGroupChatrooms = async (req, res) => {
    const user_id = req.params.userId;

    try {
        const users_group_chatrooms = await groupChatroomsModel.m_getAllUsersGroupChatrooms(user_id);
        res.json(users_group_chatrooms);
    } catch (error) {
        res.status(404).json({ error: 'Users group chatrooms not found' });
    }
};

exports.createGroupChatrooms = async (req, res) => {
    const group_chatroom_info = req.body;
    try {
        //console.log(group_chatroom_info, 'XXX')
        const new_group_chatrooms = await groupChatroomsModel.m_createGroupChatrooms(group_chatroom_info);
        res.status(201).json(new_group_chatrooms);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports. getGroupChatroomMessages = async (req, res) => {
    const chatroom_id = req.params.chatroomId;

    try {
        const chatroom_messages = await groupChatroomsModel.m_getGroupChatroomMessages(chatroom_id);
        res.json(chatroom_messages);
    } catch (error) {
        res.status(404).json({ error: 'Chatroom messages not found' });
    }
}

exports.createGroupChatroomMessage = async (req, res) => {
    const chatroom_id = req.params.chatroomId;
    const message_info = req.body;

    try {
        const new_message = await groupChatroomsModel.m_createGroupChatroomMessage(chatroom_id, message_info);
        res.status(201).json(new_message);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
