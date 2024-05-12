import { createSlice } from '@reduxjs/toolkit';

const groupChatroomSlice = createSlice({
  name: 'groupChatroom',
  initialState: {
    allGroupChatrooms: {},
    activeGroupChatroom: {},
  },
  /*
  Example state:

  allGroupChatrooms = {
    'd123sdf424fwg': {
      id: 'd123sdf424fwg'
      host_id: '324gsid9fnw',
      name: 'Group Chatroom 1',
      participants: {
        'a234t123f': 'Flynn',
        '1243gergw': 'Dan'
      }
    },
    ...
  }

  activeGroupChatroom = {
    id: '132fgrtwfeg', <-- Chatroom id
    host_id: '233rgtr12f3rsfe',
    name: 'Group Chatroom 1',
    participants: {
      'a234t123f': 'Flynn',
      '1243gergw': 'Dan'
    },
    messages: [
      {id: '23fesfg', chatroom_id: '13fegsdsf', chatroom_index: '1', sender_id: '13f2rse', content: 'Hello'},
      ...
    ]
  }
  */

  reducers: {
    setAllGroupChatrooms: (state, action) => {
      state.allGroupChatrooms = action.payload;
    },
    resetAllGroupChatrooms: (state) => {
      state.allGroupChatrooms = {};
    },
    addGroupChatroomToAll: (state, action) => {
      const groupChatroom = action.payload;
      // Check if state.allGroupChatrooms is not null or undefined
      if (state.allGroupChatrooms) {
        state.allGroupChatrooms[groupChatroom.id] = groupChatroom;
      } else {
        // Initialize state.allGroupChatrooms as an object if it's null or undefined
        state.allGroupChatrooms = { [groupChatroom.id]: groupChatroom };
      }
    },

    setActiveGroupChatroom: (state, action) => {
      state.activeGroupChatroom = action.payload;
    },
    resetActiveGroupChatroom: (state) => {
      state.activeGroupChatroom = {};
    },
    addMessageToActiveGroupChatroom: (state, action) => {
      const message = action.payload;
      state.activeGroupChatroom.messages.push(message);
    },
  },
});

export const { setAllGroupChatrooms, resetAllGroupChatrooms, addGroupChatroomToAll, setActiveGroupChatroom, resetActiveGroupChatroom, addMessageToActiveGroupChatroom } = groupChatroomSlice.actions;
export const selectAllGroupChatrooms = (state) => state.groupChatrooms.allGroupChatrooms || {};
export const selectActiveGroupChatroom = (state) => state.groupChatrooms.activeGroupChatroom || {};
export default groupChatroomSlice.reducer;
