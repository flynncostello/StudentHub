import { combineReducers } from 'redux';

import userSlice from '../slices/userSlice';
import friendsSlice from '../slices/friendsSlice';
import chatroomSlice from '../slices/chatroomSlice';
import groupChatroomsSlice from '../slices/groupChatroomSlice';
import friendRequestsSlice from '../slices/friendRequestsSlice';

const rootReducer = combineReducers({
    user: userSlice,
    friends: friendsSlice,
    chatroom: chatroomSlice,
    groupChatrooms: groupChatroomsSlice,
    friendRequests: friendRequestsSlice,
});

export default rootReducer;