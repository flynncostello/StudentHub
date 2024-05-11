import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/userSlice';
import userAPI from '../../../api/user';
import friendsAPI from '../../../api/friends';
import Friend from './Friend';
import { addFriend, clearFriendsSlice, selectFriends } from '../../../slices/friendsSlice';
import { useDispatch } from 'react-redux';
import './Friends.css';

const Friends = () => {
  let fetchedFriendsData = false;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (!fetchedFriendsData && user.is_active) {
          dispatch(clearFriendsSlice());
          fetchedFriendsData = true
          const friendsData = await friendsAPI.getFriends(user.id);
          const friendsPromises = friendsData.map(async (friend) => {
              const friendData = await userAPI.getUser(friend.friend_id);
              return dispatch(addFriend({friendshipId: friend.id, friendDetails: friendData}));
          });
          await Promise.all(friendsPromises);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
  
    fetchFriends();
  }, [user.id]);

  const friendships = useSelector(selectFriends); // Makes it so that if friends slice changes then this componenet authomatically re-renders

  return (
    <div className='friends-column'>
      {Object.keys(friendships).length === 0 ? (
        <p className='no-friends-added-text'>Add New Friends</p>
      ) : (
        <ul className='friends-list'>
          {Object.entries(friendships).map(([friendshipId, friendDetails]) => (
            <li key={friendshipId}>
              <Friend friendDetails={friendDetails} friendshipId={friendshipId} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Friends;

