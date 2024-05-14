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
import { selectUser } from '../../slices/userSlice';
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
        console.log("ARTICLE IS FAVOURITED: ", articleFavourited)
    }, []);


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                // Getting article from state based on article type
                if (articleType === 'mine') { // My Articles
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
            if (user.id === article.author_id) {
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

    return (
        article && Object.keys(article).length > 0 && (
            <div>
                <HubNavbar />
                <button 
                    onClick={favouriteArticleClicked} 
                    style={{ backgroundColor: articleFavourited ? 'red' : 'grey' }}
                >
                    Favourite
                </button>
                <h1>{article.title}</h1>
                <h3>{article.created_at}</h3>
                <h4>Author: {article.author_username}</h4>
                <p>Role: {getRoleText(article.author_role)}</p>
                <p>{article.content}</p>

                {canEditArticle && (
                    <button onClick={() => setEditArticleMode(true)}>Edit</button>
                )}
                {canDeleteArticle && (
                    <button onClick={handleDeleteArticle}>Delete</button>
                )}

                {editArticleMode && (
                    <div>
                        <input
                            placeholder='Title'
                            type="text"
                            value={newArticleTitle}
                            onChange={(e) => setNewArticleTitle(e.target.value)}
                        />
                        <textarea
                            placeholder='Content'
                            value={newArticleContent}
                            onChange={(e) => setNewArticleContent(e.target.value)}
                        />
                        <button onClick={handleEditArticle}>Submit</button>
                    </div>
                )}


                <h3>Comments</h3>
                <div className='article-comments-container'>
                    {article.comments && Object.values(article.comments).map(comment => (
                        <div key={comment.id}>
                            <p>{comment.content} ({comment.writer_username}) - {comment.created_at}</p>
                            {canDeleteComments && (
                                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            )}
                        </div>
                    ))}
                </div>
                
                <button onClick={() => setCreateCommentMode(true)}>Add Comment</button>
                {createCommentMode && (
                    <div>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button onClick={handleAddComment}>Submit</button>
                    </div>
                )}

            </div>
        )
    );
};

export default Article;