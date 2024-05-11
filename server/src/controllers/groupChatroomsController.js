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

