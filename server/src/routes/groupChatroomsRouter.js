const express = require('express');
const router = express.Router();

const groupChatroomsController = require('../controllers/groupChatroomsController');

/*
TASKS 
/api/group_chatrooms
*/

// CRUD functionality
router.get('/:userId', groupChatroomsController.getAllUsersGroupChatrooms);
router.post('/', groupChatroomsController.createGroupChatrooms);

module.exports = router;
