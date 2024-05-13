import React from 'react';
//import MyArticles from './MyArticles';

const Articles = () => {
    return (
        <div>
            <h1>Articles</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <h2>Articles from others</h2>
                    {/* Add content for articles from others */}
                </div>
                <div style={{ flex: 1 }}>
                    <h2>My articles</h2>
                    {/* Add content for my articles */}
                </div>
            </div>
        </div>
    );
};

export default Articles;