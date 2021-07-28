import React from 'react';
import { Link } from 'react-router-dom';

const AppNavBar = () => {

    return (
        <nav>
            <div>
                <Link to="/">
                    APP NAME
                </Link>
            </div>
            <ul>
                <Link to="/">
                    <li>HOMEPAGE</li>
                </Link>
                <Link to="/profile">
                    <li>PROFILE</li>
                </Link>
                <Link to="/challenges">
                    <li>CHALLENGES</li>
                </Link>
                <Link to="/login">
                    <li>LOGIN</li>
                </Link>
            </ul>
        </nav>
    )
}

export default AppNavBar;