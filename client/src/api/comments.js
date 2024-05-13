import axios from './index';
import { API_ENDPOINT } from './index';

const commentsAPI = {
    getArticlesComments: async (article_id) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/comments/${article_id}`);
            return response.data;
        } catch (error) {
            console.error('Error getting articles comments:', error);
            throw error;
        }
    },
    createComment: async (article_id, user_id, user_username, comment_content) => {
        const comment_data = {
            article_id: article_id,
            writer_id: user_id,
            writer_username: user_username,
            content: comment_content
        }
        try {
            const response = await axios.post(`${API_ENDPOINT}/comments`, comment_data);
            return response.data;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    },
    deleteComment: async (comment_id) => {
        try {
            const response = await axios.delete(`${API_ENDPOINT}/comments/${comment_id}`);
            return response;
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    },
};

export default commentsAPI;
