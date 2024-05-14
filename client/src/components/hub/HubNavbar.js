import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const HubNavbar = () => {
    const { userId } = useParams();
    return (
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
                        <li><Link to={ROUTES.favouriteArticles(userId)}>Favourite Articles</Link></li>
                    </ul>
                </li>
                <li><Link to={ROUTES.dashboard(userId)}>SocialHub</Link></li>
                <li><Link to={ROUTES.userAccount(userId)}>My Account</Link></li>
            </ul>
        </nav>
    );
};

export default HubNavbar;