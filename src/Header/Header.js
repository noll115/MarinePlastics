import React from 'react';
import { Link } from 'react-router-dom';

// the authentication object is passed through props from App.js
// which is used to check if the user is currently logged in
// and to sign in (links in header depend on status)

const Header = (props) => (
    <nav className="uk-navbar uk-navbar-container uk-navbar-transparent uk-margin-bottom-small">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-logo">
            <Link to="/home" >
              <h1 className="uk-text-large uk-margin-remove-bottom">
                Marine Plastics Monitor
              </h1>
            </Link>
          </li>
          { props.auth.isAuthenticated()
            ? <li><Link to='/chooseform'>Survey</Link></li>
            : null
          }
          <li><Link to="/map">Map</Link></li>
          <li><Link to="/protocol">Protocol</Link></li>
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          { props.auth.isAuthenticated() 
            ? <Link className="uk-button" to="/profile">Profile</Link>
            : null
          }
          { props.auth.isAuthenticated()
            ? <a onClick={ props.auth.logout } className="uk-button uk-button-primary">Log Out</a>
            : <a onClick={ props.auth.login } className="uk-button uk-button-primary">Log In</a>
          }
        </ul>
      </div>
    </nav>
)

export default Header