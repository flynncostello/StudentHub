import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';
import './Hub.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const Hub = () => {
    const { userId } = useParams();

    return (
        <div className='main-page'>
            {/* Navigation Bar */}
            <nav className="hub-navbar">
            {/* Logo */}
            <Link className="navbar-logo" to="/">
                <FontAwesomeIcon icon={faGraduationCap} />
                <span className="logo">StudentHub</span>
            </Link>

            {/* Buttons */}
            <ul className='links-to-hubs'>
                <li><Link style={{cursor: 'default'}} to="">KnowledgeHub</Link>
                    <ul>
                        <li><Link to={ROUTES.articles(userId)}>Articles</Link></li>
                        <li><Link to={ROUTES.savedArticles(userId)}>Saved Articles</Link></li>
                    </ul>
                </li>
                <li><Link to={ROUTES.dashboard(userId)}>SocialHub</Link></li>
                <li><Link to={ROUTES.userAccount(userId)}>My Account</Link></li>
            </ul>
                
            </nav>

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