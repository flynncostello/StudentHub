const supabase = require('../services/supabaseDatabaseService');

const groupChatroomsModel = {
    m_getAllUsersGroupChatrooms: async (user_id) => {
        try {
            const { data: chatrooms, error } = await supabase
                .rpc('get_chatrooms', { user_id: user_id });

            if (error) {
                console.error('Error fetching users group chatrooms:', error);
                return [];
            }

            return chatrooms;
        } catch (error) {
            console.error('Error fetching users group chatrooms:', error);
            throw error;
        }
    },


    m_createGroupChatrooms: async (group_chatroom_info) => {
        const { host_id, participants, name } = group_chatroom_info;
        try {
            const { data, error } = await supabase
                .from("group_chatrooms")
                .insert([{ host_id, participants, name }])
                .select();
            
            if (error) {
                console.error('Error creating new group chatroom:', error);
                throw new Error('Error creating new group chatroom');
            }

            const created_group_chatroom = data[0];
            return created_group_chatroom;

        } catch (error) {
            console.error('Error creating new group chatroom:', error);
            throw error;
        }
    },

    m_getGroupChatroomMessages: async (chatroom_id) => {
        try {
            const { data: messages, error } = await supabase
                .from('group_chatroom_messages')
                .select('*')
                .eq('chatroom_id', chatroom_id)
                .order('chatroom_index', { ascending: true });

            if (error) {
                console.error('Error fetching group chatroom messages:', error);
                return [];
            }

            return messages;
        } catch (error) {
            console.error('Error fetching chatroom messages:', error);
            throw error;
        }
    },

    m_createGroupChatroomMessage: async (chatroom_id, message_info) => {
        const { sender_id, chatroom_index, content } = message_info;
        try {
            const { data, error } = await supabase
                .from("group_chatroom_messages")
                .insert([{ sender_id, chatroom_id, chatroom_index, content }])
                .select();
            
            if (error) {
                console.error('Error creating new group chatroom message:', error);
                throw new Error('Error creating new group chatroom message');
            }

            const created_message = data[0];
            return created_message;

        } catch (error) {
            console.error('Error creating new group chatroom message:', error);
            throw error;
        }
    }
};

module.exports = groupChatroomsModel;
