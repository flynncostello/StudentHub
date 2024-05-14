import React from 'react';
import './Hub.css';
import HubNavbar from './HubNavbar';

const Hub = () => {
    return (
        <div className='main-page'>
            <HubNavbar />
            
            {/* Main Content */}
            <div className="home-page-main-text">
                <h2>Welcome to THE HUB</h2>
                <p>
                    Here you can move between the SocialHub and the KnowledgeHub. The SocialHub is a place where students and staff alike can come and chat with each other whilst also sharing articles and commenting on fellow peers work.
                </p>
            </div>

            {/* Footer */}
            <footer className="home-page-footer">
                <p>&copy; 2024 StudentHub. All rights reserved.</p>
            </footer>

        </div>
    );
};

export default Hub;