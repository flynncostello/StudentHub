import React, { useState, useEffect } from 'react';
import articlesAPI from '../../api/articles';
import './MyArticles.css';

const MyArticles = ({ user_id }) => {
    const [articles, setArticles] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newArticle, setNewArticle] = useState({ title: '', content: '' });

    useEffect(() => {
        // Fetch the user's articles when the component mounts
        const fetchArticles = async () => {
            try {
                const articles = await articlesAPI.getMyArticles(user_id);
                setArticles(articles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, [user_id]);

    const handleCreateArticle = async (e) => {
        e.preventDefault();

        try {
            await articlesAPI.createArticle(user_id, newArticle);
            // Refresh the articles list after creating a new article
            const updatedArticles = await articlesAPI.getMyArticles(user_id);
            setArticles(updatedArticles);
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

            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.date}</p>
                        <p>{article.text}</p>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyArticles;