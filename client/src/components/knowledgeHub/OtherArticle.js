import React, { useState, useEffect } from 'react';
import articlesAPI from '../../api/articles';
import commentsAPI from '../../api/comments';
import './OtherArticle.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    addArticle,
    selectArticles,
    clearArticles
} from '../../slices/articlesSlice';
import { selectUser } from '../../slices/userSlice';
import { formatToJustDate, formatDate } from '../../utils';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';
import { getRoleText } from '../../utils';


const OtherArticles = () => {
    const [fetchingAllArticles, setFetchingAllArticles] = useState(false);

    const dispatch = useDispatch();

    const allArticles = useSelector(selectArticles);
    const user = useSelector(selectUser);

    useEffect(() => {
        setFetchingAllArticles(true);
        // Clear current state of all articles
        dispatch(clearArticles());
        const fetchAllArticles = async () => {
            try {
                console.log("LOADING ALL ARTICLES")
                const allFetchedArticles = await articlesAPI.getAllArticles();
                allFetchedArticles.forEach(async (article) => {
                    const articles_comments = await commentsAPI.getArticlesComments(article.id);
                    const commentsObject = articles_comments.reduce((obj, comment) => {
                        return {
                            ...obj,
                            [comment.id]: {
                                ...comment,
                                created_at: formatToJustDate(comment.created_at)
                            }
                        };
                    }, {});

                    const article_obj = {
                        ...article,
                        created_at: formatToJustDate(article.created_at),
                        comments: commentsObject
                    }
                    dispatch(addArticle(article_obj));
                });
            } catch (error) {
                console.error('Error fetching all articles:', error);
            }
            setFetchingAllArticles(false);
            
        };
        fetchAllArticles();
    }, []);


    return (
        <div className='all-articles-page-container'>
            <h1>All Articles</h1>

            {fetchingAllArticles && <p>Loading...</p>}
            <ul className='other-articles-list-container'>
                {Object.values(allArticles).map((article) => (
                    <div className='all-articles-container'>
                        <Link className='article-link' to={ROUTES.article(article.id, 'other')}>
                            <li key={article.id}>
                                <p>{article.title}</p>
                                <p>{article.author_username} ({getRoleText(article.author_role)})</p>
                                <p>({article.created_at})</p>                
                            </li>
                        </Link>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default OtherArticles;