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
        const { host_id, participants } = group_chatroom_info;
        try {
            const { data, error } = await supabase
                .from("group_chatrooms")
                .insert([{ host_id, participants }])
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
};

module.exports = groupChatroomsModel;
