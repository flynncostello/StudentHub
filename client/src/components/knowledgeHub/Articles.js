import React from 'react';
import MyArticles from './MyArticles';
import './Articles.css'; // Import the CSS file

const Articles = () => {
    return (
        <div>
            <h1>Articles</h1>
            <div className="articles-container">
                <div className="articles-section">
                    <h2>Articles from others</h2>
                    {/* Add content for articles from others */}
                </div>
                <div className="articles-section">
                    <MyArticles />
                </div>
            </div>
        </div>
    );
};

export default Articles;