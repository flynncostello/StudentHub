import React, { useState, useEffect } from 'react';
import articlesAPI from '../../api/articles';
import commentsAPI from '../../api/comments';
import './MyArticles.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    addMyArticle,
    deleteMyArticle,
    selectMyArticles,
    clearMyArticles
} from '../../slices/articlesSlice';
import { selectUser } from '../../slices/userSlice';
import { formatToJustDate, formatDate } from '../../utils';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';
import { getRoleText } from '../../utils';


const MyArticles = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newArticle, setNewArticle] = useState({ title: '', content: '' });

    const [fetchingUsersArticles, setFetchingUsersArticles] = useState(false);

    const dispatch = useDispatch();

    const usersArticles = useSelector(selectMyArticles);
    const user = useSelector(selectUser);

    useEffect(() => {
        setFetchingUsersArticles(true);
        // Clear current state of my articles
        dispatch(clearMyArticles());

        const fetchMyArticles = async () => {
            try {
                console.log("LOADING USERS ARTICLES")
                const usersFetchedArticles = await articlesAPI.getUsersArticles(user.id);
                usersFetchedArticles.forEach(async (article) => {
                    const articles_comments = await commentsAPI.getArticlesComments(article.id);
                    const commentsObject = articles_comments.reduce((obj, comment) => {
                        return {
                            ...obj,
                            [comment.id]: {
                                ...comment,
                                created_at: formatDate(comment.created_at)
                            }
                        };
                    }, {});

                    const users_article_obj = {
                        ...article,
                        created_at: formatToJustDate(article.created_at),
                        comments: commentsObject
                    }
                    dispatch(addMyArticle(users_article_obj));
                });
            } catch (error) {
                console.error('Error fetching users articles:', error);
            }
            setFetchingUsersArticles(false);
            
        };
        fetchMyArticles();
    }, []);

    
    const handleCreateMyArticle = async (e) => {
        e.preventDefault();
        try {
            //console.log("BEFORE SUBMITTING TO DB: ", newArticle, ", ", user);
            const usersNewArticle = await articlesAPI.createArticle(user, newArticle);
            usersNewArticle.created_at = formatToJustDate(usersNewArticle.created_at);
            usersNewArticle.comments = {};
            dispatch(addMyArticle(usersNewArticle))
            
            setNewArticle({ title: '', content: '' });
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    const handleDeleteMyArticle = async (article_id) => {
        try {
            await articlesAPI.deleteArticle(article_id); // Deleting article
            // Don't need to specifically delete comments as cascade effect does it for us automatically
            dispatch(deleteMyArticle({id: article_id}));
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    return (
        <div className='my-articles-container'>
            <h1>My Articles</h1>
            <button onClick={() => setShowCreateForm(true)}>+</button>

            {showCreateForm && (
                <form onSubmit={handleCreateMyArticle}>
                    <button onClick={() => setShowCreateForm(false)}>X</button>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newArticle.title}
                        onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Content"
                        value={newArticle.content}
                        onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}


            {fetchingUsersArticles && <p>Loading...</p>}
            <ul className='my-articles-list-container'>
                {Object.values(usersArticles).map((article) => (
                    <div className='my-article-container'>
                        <Link to={ROUTES.article(article.id, 'mine')}>
                            <li key={article.id}>
                                <h2>{article.title}</h2>
                                <p>{article.author_username} ({getRoleText(article.author_role)})</p>
                                <p>{article.created_at}</p>                
                            </li>
                        </Link>
                        <button onClick={() => handleDeleteMyArticle(article.id)}>Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default MyArticles;