import axios from './index';
import { API_ENDPOINT } from './index';

const groupChatroomsAPI = {
    getAllUsersGroupChatrooms: async (user_id) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/group_chatrooms/${user_id}`);
      console.log("IN GROUP CHATROOMS API FRONTEND, USERS GROUP CHATROOMS: ", response.data)
      return response.data;
    } catch (error) {
      console.error('Error getting users group chatrooms:', error);
      throw error;
    }
  },
  createGroupChatroom: async (host_id, participants, name) => {
    const new_group_chatroom_info = {
      host_id,
      participants,
      name
    }
    try {
      const response = await axios.post(`${API_ENDPOINT}/group_chatrooms`, new_group_chatroom_info);
      console.log("IN GROUP CHATROOM API FRONTEND, NEW GROUP CHATROOM INFO AFTER BEING CREATED: ", response.data)
      return response.data;
    } catch (error) {
      console.error('Error creating new group chatroom:', error);
      throw error;
    }
  }
};

export default groupChatroomsAPI;
