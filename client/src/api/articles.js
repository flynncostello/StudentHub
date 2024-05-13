import axios from './index';
import { API_ENDPOINT } from './index';

const articlesAPI = {
    getAllArticles: async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/articles/normal`);
            return response.data;
        } catch (error) {
            console.error('Error getting all articles:', error);
            throw error;
        }
    },
    getUsersArticles: async (user_id) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/articles/normal/${user_id}`);
            return response.data;
        } catch (error) {
            console.error('Error getting users articles:', error);
            throw error;
        }
    },
    createArticle: async (user, article_info) => {
        const article_data = {
            author_id: user.id,
            author_username: user.username,
            title: article_info.title,
            content: article_info.content
        }
        //console.log("ARTICLE DATA: ", article_data)
        try {
            const response = await axios.post(`${API_ENDPOINT}/articles/normal`, article_data);
            return response.data;
        } catch (error) {
            console.error('Error creating article:', error);
            throw error;
        }
    },
    updateArticle: async (article_id, updated_data) => {
        const updated_article_data = {
            title: updated_data.title,
            content: updated_data.content,
        }
        try {
            const response = await axios.put(`${API_ENDPOINT}/articles/normal/${article_id}`, updated_article_data);
            return response;
        } catch (error) {
            console.error('Error updating article:', error);
            throw error;
        }
    },
    deleteArticle: async (article_id) => {
        try {
            const response = await axios.delete(`${API_ENDPOINT}/articles/normal/${article_id}`);
            return response;
        } catch (error) {
            console.error('Error deleting article:', error);
            throw error;
        }
    },



    getUsersFavouritedArticles: async (user_id) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/articles/favourited/${user_id}`);
            return response.data;
        } catch (error) {
            console.error('Error getting users favourite articles:', error);
            throw error;
        }
    },
    favouriteArticle: async (user_id, article_id) => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/articles/favourite/${user_id}/${article_id}`);
            return response.data;
        } catch (error) {
            console.error('Error favouriting article:', error);
            throw error;
        }
    },
    unfavouriteArticle: async (user_id, article_id) => {
        try {
            const response = await axios.delete(`${API_ENDPOINT}/articles/favourited/${user_id}/${article_id}`);
            return response;
        } catch (error) {
            console.error('Error unfavouriting article:', error);
            throw error;
        }
    },
};

export default articlesAPI;
