import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';

const HubNavbar = () => {
    const { userId } = useParams();
    const user = useSelector(selectUser);
    const is_staff = user.role === 'academic_staff' || user.role === 'administrative_staff' || user.role === 'admin_user';

    return (
        <nav className="hub-navbar">
            {/* Logo */}
            <Link className="navbar-logo" to="/">
                <FontAwesomeIcon className='graduation-cap' icon={faGraduationCap} />
                <span className="logo">StudentHub</span>
            </Link>

            {/* Buttons */}
            <ul className='links-to-hubs'>
                <li><Link to={ROUTES.hub(userId)}>Home</Link></li>
                <li><Link style={{cursor: 'default'}} to="">Knowledge Hub</Link>
                    <ul>
                        <li><Link to={ROUTES.articles(userId)}>Articles</Link></li>
                        <li><Link to={ROUTES.favouriteArticles(userId)}>Favourite Articles</Link></li>
                    </ul>
                </li>
                <li><Link to={ROUTES.dashboard(userId)}>Social Hub</Link></li>
                <li><Link to={ROUTES.userAccount(userId)}>My Account</Link></li>
                {is_staff && <li><Link to={ROUTES.staffActions(userId)}>Staff Actions</Link></li>}
            </ul>
        </nav>
    );
};

export default HubNavbar;