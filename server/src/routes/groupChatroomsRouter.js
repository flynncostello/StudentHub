const express = require('express');
const router = express.Router();

const groupChatroomsController = require('../controllers/groupChatroomsController');

/*
TASKS 
/api/group_chatrooms
*/

// CRUD functionality
// Group Chatroom
router.get('/:userId', groupChatroomsController.getAllUsersGroupChatrooms);
router.post('/', groupChatroomsController.createGroupChatrooms);

// Group Chatroom Messages
router.get('/:chatroomId/messages', groupChatroomsController.getGroupChatroomMessages);
router.post('/:chatroomId/messages', groupChatroomsController.createGroupChatroomMessage);


module.exports = router;
