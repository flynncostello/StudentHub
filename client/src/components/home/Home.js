import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'


const Home = () => {
  return (
    <div className='main-page'>
      {/* Navigation Bar */}
      <nav className="navbar">
        {/* Logo */}
        <Link className="navbar-logo" to="/">
          <FontAwesomeIcon className='graduation-cap' icon={faGraduationCap} />
          <span className="logo">StudentHub</span>
        </Link>

        {/* Buttons */}
        <div className="navbar-buttons">
          <Link className="login-button" to={ROUTES.login()}>
            Login
          </Link>
          <Link className="signup-button" to={ROUTES.signup()}>
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-page-main-text">
        <h2>Welcome to StudentHub</h2>
        <p>
          StudentHub is a place where students and staff alike can come and chat with each other whilst also sharing articles and commenting on fellow peers work.
          Once creating an account you can chat with others through the SocialHub or read, write, and comment on articles in the KnowledgeHub.
        </p>
        
        <h5 className="card-title">Features</h5>
        <ul className="list-unstyled">
          <li>
            <i className="fas fa-check text-success"></i> Secure end-to-end encryption for private messaging
          </li>
          <li>
            <i className="fas fa-check text-success"></i> Read, edit, create, favourite, and comment on articles
          </li>
          <li>
            <i className="fas fa-check text-success"></i> Conversations with others are automatically saved and stored for later.
          </li>
          <li>
            <i className="fas fa-check text-success"></i> Group chats with two or more individuals.
          </li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="home-page-footer">
        <p>&copy; 2024 StudentHub. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;