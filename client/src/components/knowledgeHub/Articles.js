import React from 'react';
import MyArticles from './MyArticles';
import OtherArticles from './OtherArticle';
import './Articles.css'; // Import the CSS file
import HubNavbar from '../hub/HubNavbar';

const Articles = () => {
    return (
        <div>
            <HubNavbar />
            <div className="articles-container">
                <div className="articles-section">
                    <OtherArticles />
                </div>
                <div className="articles-section">
                    <MyArticles />
                </div>
            </div>
        </div>
    );
};

export default Articles;