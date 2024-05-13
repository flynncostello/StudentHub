import React, { useState, useEffect } from 'react';
import articlesAPI from '../../api/articles';
import commentsAPI from '../../api/comments';
import './MyArticles.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    setMyArticles,
    clearMyArticles,
    addMyArticle,
    updateMyArticle,
    deleteMyArticle,
    setMyArticleComments,
    addMyArticleComment,
    deleteMyArticleComment,

    selectMyArticles
} from '../../slices/articlesSlice';
import { selectUser } from '../../slices/userSlice';
import { formatDate } from '../../utils';


const MyArticles = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newArticle, setNewArticle] = useState({ title: '', content: '' });
    const [fetchingUsersArticles, setFetchingUsersArticles] = useState(false);

    const dispatch = useDispatch();

    const usersArticles = useSelector(selectMyArticles);
    const user = useSelector(selectUser);

    useEffect(() => {
        setFetchingUsersArticles(true);
        const fetchMyArticles = async () => {
            try {
                console.log("LOADING USERS ARTICLES")
                const usersFetchedArticles = await articlesAPI.getUsersArticles(user.id);
                usersFetchedArticles.forEach(async (article) => {
                    const articles_comments = await commentsAPI.getArticlesComments(article.id);
                    const users_article_obj = {
                        ...article,
                        date: formatDate(article.date),
                        comments: articles_comments
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

    
    const handleCreateArticle = async (e) => {
        e.preventDefault();
        try {
            console.log("BEFORE SUBMITTING TO DB: ", newArticle, ", ", user);
            const usersNewArticle = await articlesAPI.createArticle(user, newArticle);
            console.log("NEW ARTICLE CREATED BY USER: ", usersNewArticle)
            dispatch(addMyArticle(usersNewArticle))
            
            setNewArticle({ title: '', content: '' });
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };
    

    return (
        <div>
            <h1>My Articles</h1>
            <button onClick={() => setShowCreateForm(true)}>+</button>

            {showCreateForm && (
                <form onSubmit={handleCreateArticle}>
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
            <ul>
                {Object.values(usersArticles).map((article) => (
                    <li key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.author_id}</p>
                        <p>{article.author_username}</p>
                        <p>{article.created_at}</p>
                        <p>{article.content}</p>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyArticles;