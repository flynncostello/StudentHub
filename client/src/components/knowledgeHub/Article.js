import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectArticles,
    selectMyArticles,
    selectFavouriteArticles,

    updateArticle,
    deleteArticle,
    addArticleComment,
    deleteArticleComment,

    updateMyArticle,
    deleteMyArticle,
    addMyArticleComment,
    deleteMyArticleComment,

    addFavouriteArticle,
    deleteFavouriteArticle,
    addFavouriteArticleComment,
    deleteFavouriteArticleComment,
} from '../../slices/articlesSlice';
import articlesAPI from '../../api/articles';
import commentsAPI from '../../api/comments';
import userAPI from '../../api/user';
import { selectUser, setUserMutedState } from '../../slices/userSlice';
import { useParams, useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';
import './Article.css';
import { formatDate, getRoleText } from '../../utils';
import HubNavbar from '../hub/HubNavbar';



const Article = () => { // Article type can be 'mine', 'other', or 'favourite'
    const { articleId, articleType } = useParams();
    
    const [article, setArticle] = useState({});

    const [articleFavourited, setArticleFavourited] = useState(false);

    const [canEditArticle, setCanEditArticle] = useState(false);
    const [canDeleteArticle, setCanDeleteArticle] = useState(false);
    const [canDeleteComments, setCanDeleteComments] = useState(false);

    const [editArticleMode, setEditArticleMode] = useState(false);
    const [newArticleTitle, setNewArticleTitle] = useState('');
    const [newArticleContent, setNewArticleContent] = useState('');

    //const [deletingArticle, setDeletingArticle] = useState(false);

    const [createCommentMode, setCreateCommentMode] = useState(false);
    const [newComment, setNewComment] = useState('');

    const articles = useSelector(selectArticles);
    const myArticles = useSelector(selectMyArticles);
    const favouriteArticles = useSelector(selectFavouriteArticles);
    const user = useSelector(selectUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        // Setting favourite article based on state
        if (favouriteArticles[articleId]) {
            setArticleFavourited(true);
        };

        const check_user_muted_state = async () => {
            const user_data = await userAPI.getUser(user.id);
            const user_muted_state = user_data.is_muted;
            console.log("Users muted state: ", user_muted_state)
            dispatch(setUserMutedState(user_muted_state));
        };
        check_user_muted_state();        
    }, []);


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                // Getting article from state based on article type
                if (articleType === 'mine' && !user.is_muted) { // My Articles
                    const fetchedArticle = myArticles[articleId];
                    setArticle(fetchedArticle);
                    setCanEditArticle(true);
                    setCanDeleteArticle(true);
                    setCanDeleteComments(true);
                } else if (articleType === 'favourite') { // Favourite Articles
                    const fetchedArticle = favouriteArticles[articleId];
                    setArticle(fetchedArticle);
                } else { // Others Articles
                    const fetchedArticle = articles[articleId];
                    setArticle(fetchedArticle);
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };
        fetchArticle();
    }, [articleId, articleType, myArticles, favouriteArticles, articles]);
    
    useEffect(() => {
        if (article) {
            console.log("USER ID: ", user.id);
            console.log("ARTICLE AUTHOR ID: ", article.author_id);
            if (user.id === article.author_id && !user.is_muted) {
                setCanEditArticle(true);
                setCanDeleteArticle(true);
                setCanDeleteComments(true);
            }
    
            // Setting permissions for teacher
            if (user.role !== 'student') {
                setCanEditArticle(true);
                setCanDeleteArticle(true);
                setCanDeleteComments(true);
            }
        }
    }, [article, user]);



    const handleEditArticle = async (e) => {
        e.preventDefault();
        setEditArticleMode(false);
        try {
            await articlesAPI.updateArticle(article.id, {title: newArticleTitle, content: newArticleContent});
            if (articleType === 'mine') {
                dispatch(updateMyArticle({id: article.id, title: newArticleTitle, content: newArticleContent}));
                console.log(newArticleContent, newArticleTitle)
                setArticle({...article, title: newArticleTitle, content: newArticleContent});
            }
            if (articleType === 'other') {
                dispatch(updateArticle({id: article.id, title: newArticleTitle, content: newArticleContent}));
                setArticle({...article, title: newArticleTitle, content: newArticleContent});
            }
            setEditArticleMode(false);
        } catch (error) {
            setEditArticleMode(false);
            console.error('Error updating article:', error);
        }
    };

    const handleDeleteArticle = async () => {
        const article_id = article.id;
        //setDeletingArticle(true);
        try {
            await articlesAPI.deleteArticle(article_id); // Deleting article
            // Don't need to specifically delete comments as cascade effect does it for us automatically
            console.log("ARTICLE TYPE: ", articleType)
            if (articleType === 'favourite') { // favourite
                navigate(ROUTES.favouriteArticles(user.id))
                dispatch(deleteFavouriteArticle({id: article_id}));
            } else if (articleType === 'mine') { // mine
                navigate(ROUTES.articles(user.id))
                console.log("REMOVING ARTICLE FROM STATE")
                dispatch(deleteMyArticle({id: article_id}));
            } else { // other
                navigate(ROUTES.articles(user.id))
                dispatch(deleteArticle({id: article_id}));
            }


        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const handleAddComment = async () => {
        setCreateCommentMode(false);
        try {
            const new_comment = await commentsAPI.createComment(article.id, user.id, user.username, user.role, newComment);
            console.log("NEW COMMENT RESPONSE FROM API: ", new_comment)
            const formatted_date = formatDate(new_comment.created_at);
            const new_comment_obj = {id: new_comment.id, article_id: article.id, writer_id: user.id, writer_username: user.username, writer_role: user.role, content: newComment, created_at: formatted_date};
            if (articleType === 'favourite') {
                dispatch(addFavouriteArticleComment(new_comment_obj));
            } else if (articleType === 'mine') {
                dispatch(addMyArticleComment(new_comment_obj));
            } else {
                dispatch(addArticleComment(new_comment_obj));
            }
            setArticle({...article, comments: {...article.comments, [new_comment_obj.id]: new_comment_obj}});
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await commentsAPI.deleteComment(commentId);
            const obj_for_slice_to_delete = {
                id: commentId,
                article_id: article.id
            }
            if (articleType === 'favourite') {
                dispatch(deleteFavouriteArticleComment(obj_for_slice_to_delete));
            } else if (articleType === 'mine') {
                dispatch(deleteMyArticleComment(obj_for_slice_to_delete));
            } else {
                dispatch(deleteArticleComment(obj_for_slice_to_delete));
            }

            const newComments = {...article.comments};
            delete newComments[commentId];
            setArticle({...article, comments: newComments});

        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const favouriteArticleClicked = async () => {
        const favourited = articleFavourited
        const new_state = !favourited;
        setArticleFavourited(new_state);

        if (new_state) {
            try {
                await articlesAPI.favouriteArticle(user.id, article.id);
                dispatch(addFavouriteArticle(article));
            } catch (error) {
                console.error('Error favouriting article:', error);
            }
        } else {
            try {
                await articlesAPI.unfavouriteArticle(user.id, article.id);
                dispatch(deleteFavouriteArticle(article));
            } catch (error) {
                console.error('Error unfavouriting article:', error);
            }
        }
    }

    const check_user_muted_state = async () => {
        const user_data = await userAPI.getUser(user.id);
        const user_muted_state = user_data.is_muted;
        console.log("Users muted state: ", user_muted_state)
        dispatch(setUserMutedState(user_muted_state));
        return user_muted_state;
    };

    const checkIfCanComment = async (e) => {
        e.preventDefault();
        const user_muted = await check_user_muted_state();
        if (user_muted) {
            alert("You are muted and cannot comment");
        } else {
            setCreateCommentMode(true);
        }
    }

    return (
        article && Object.keys(article).length > 0 && (
            <div>
                <HubNavbar />
                <div className="article-container">
                    <div className="article-actions">
                        {canEditArticle && (
                            <button className="edit-btn" onClick={() => {
                                setEditArticleMode(true);
                                setNewArticleTitle(article.title);
                                setNewArticleContent(article.content);
                            }}>
                            Edit
                            </button>
                        )}
                        {canDeleteArticle && (
                            <button className="delete-btn" onClick={handleDeleteArticle}>
                            Delete
                            </button>
                        )}
                        <div class="con-like" onClick={favouriteArticleClicked}>
                            <input class="like" type="checkbox" title="like" checked={articleFavourited} />
                            <div class="checkmark">
                                <svg xmlns="http://www.w3.org/2000/svg" class="outline" viewBox="0 0 24 24">
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="filled" viewBox="0 0 24 24">
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="celebrate">
                                <polygon class="poly" points="10,10 20,20"></polygon>
                                <polygon class="poly" points="10,50 20,50"></polygon>
                                <polygon class="poly" points="20,80 30,70"></polygon>
                                <polygon class="poly" points="90,10 80,20"></polygon>
                                <polygon class="poly" points="90,50 80,50"></polygon>
                                <polygon class="poly" points="80,80 70,70"></polygon>
                                </svg>
                            </div>
                        </div>

                    </div>

                    <div className="article-header">
                        <h1 className="article-title">{article.title}</h1>

                        <div className="article-meta">
                            <h3 className="article-date">{article.created_at}</h3>
                            <h4 className="article-author">Author: {article.author_username}</h4>
                            <p className="article-role">Role: {getRoleText(article.author_role)}</p>
                        </div>

                    </div>

                    <div className="article-content">
                        <p>{article.content}</p>
                    </div>



                    {editArticleMode && (
                        <div className="article-edit-form">
                            <input
                                className="article-edit-title"
                                placeholder="Title"
                                type="text"
                                value={newArticleTitle}
                                onChange={(e) => setNewArticleTitle(e.target.value)}
                            />
                            <textarea
                                className="article-edit-content"
                                placeholder="Content"
                                value={newArticleContent}
                                onChange={(e) => setNewArticleContent(e.target.value)}
                            />
                            <button className="submit-btn" onClick={handleEditArticle}>
                                Submit
                            </button>
                        </div>
                    )}

                    <h3 className="comments-heading">Comments</h3>
                    <div className="comments-container">
                        {article.comments && Object.values(article.comments).map((comment) => (
                            <div key={comment.id} className="comment-item">
                                <div className='comment-content'>
                                    <p><strong>{comment.writer_username}</strong> ({comment.created_at})</p>
                                    <p>{comment.content}</p>
                                </div>
                                {canDeleteComments && (
                                    <button
                                        className="delete-comment-btn"
                                        onClick={() => handleDeleteComment(comment.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <button className="add-comment-btn" onClick={checkIfCanComment}>
                        Add Comment
                    </button>

                    {createCommentMode && (
                        <div className="comment-form">
                            <textarea
                                className="comment-textarea"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            <button className="submit-btn" onClick={handleAddComment}>
                                Submit
                            </button>
                        </div>
                    )}

                </div>
            </div>
        )
    );
};

export default Article;