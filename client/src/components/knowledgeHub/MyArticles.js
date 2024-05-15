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
import { selectUser, setUserMutedState } from '../../slices/userSlice';
import userAPI from '../../api/user';
import { formatToJustDate, formatDate } from '../../utils';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';
import { getRoleText } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


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
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await articlesAPI.deleteArticle(article_id); // Deleting article
                // Don't need to specifically delete comments as cascade effect does it for us automatically
                dispatch(deleteMyArticle({id: article_id}));
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    const check_user_muted_state = async () => {
        const user_data = await userAPI.getUser(user.id);
        const user_muted_state = user_data.is_muted;
        console.log("Users muted state: ", user_muted_state)
        dispatch(setUserMutedState(user_muted_state));
        return user_muted_state;
    };

    const checkIfUserCanCreateArticle = async (e) => {
        e.preventDefault();
        const user_muted = await check_user_muted_state();
        if (user_muted) {
            alert("You are muted and cannot create articles");
        } else {
            setShowCreateForm(true);
        }
    }


    return (
        <div className='my-articles-container'>
            <div className='top-section-of-my-articles'>
                <h1>My Articles</h1>
                <button className='create-new-article-user-button' onClick={checkIfUserCanCreateArticle}>+</button>
            </div>
            

            {showCreateForm && (
                <form className="my-form" onSubmit={handleCreateMyArticle}>
                    <FontAwesomeIcon icon={faTimesCircle} className="close-button-create-new-article" onClick={() => setShowCreateForm(false)} />
                    <input
                        className="form-input-title"
                        type="text"
                        placeholder="Title"
                        value={newArticle.title}
                        onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    />
                    <textarea
                        className="form-input-content"
                        placeholder="Content"
                        value={newArticle.content}
                        onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    />
                    <button className="submit-button" type="submit">Submit</button>
                </form>
            )}


            {fetchingUsersArticles && <p className='loading-text-my-articles'>Loading...</p>}
            <ul className='my-articles-list-container'>
                {Object.values(usersArticles).map((article) => (
                    <div className='my-article-container'>
                        <Link className='my-article-link' to={ROUTES.article(article.id, 'mine')}>
                            <li key={article.id}>
                                <p className='article-badge-article-title'>{article.title}</p>
                                <p className='article-badge-author-role'>{article.author_username} ({getRoleText(article.author_role)})</p>
                                <p className='article-badge-created-at'>{article.created_at}</p>                
                            </li>
                        </Link>
                        <FontAwesomeIcon icon={faTimesCircle} className="delete-my-article-button" onClick={() => handleDeleteMyArticle(article.id)} />
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default MyArticles;