// clearSlices.js
import { clearUserSlice } from '../../slices/userSlice';
import { clearFriendsSlice } from '../../slices/friendsSlice';
import { clearRequests } from '../../slices/friendRequestsSlice';
import { resetChatroom } from '../../slices/chatroomSlice';
import { resetAllGroupChatrooms, resetActiveGroupChatroom } from '../../slices/groupChatroomSlice';
import { clearArticles, clearMyArticles, clearFavouriteArticles } from '../../slices/articlesSlice';

const clearSlices = (dispatch) => {
    dispatch(clearUserSlice());
    dispatch(clearFriendsSlice());
    dispatch(clearRequests());
    dispatch(resetChatroom());
    dispatch(resetAllGroupChatrooms());
    dispatch(resetActiveGroupChatroom());
    dispatch(clearArticles());
    dispatch(clearMyArticles());
    dispatch(clearFavouriteArticles());
};

export default clearSlices;