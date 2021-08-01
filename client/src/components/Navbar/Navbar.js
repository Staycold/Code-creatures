import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Auth from '../../utils/auth';
import './navbar.css'

const AppNavBar = () => {
    const [showModal, setShowModal] = useState(false)
    const [modalLogin, setModalLogin] = useState(true)
    // if logged in replace login button with log out button
    return (
        <>
            <div className="header-container">
                <div className="brand">
                    <Link to="/">
                        <h1>APP NAME</h1>
                    </Link>
                </div>
                <nav className='navbar'>
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
                        {Auth.loggedIn() ? (
                            <li onClick={Auth.logout} >LOGOUT</li>
                        ) : (
                            <li onClick={() => setShowModal(true)}>LOGIN/SIGNUP</li>

                        )}

                    </ul>
                </nav>
            </div>

            {showModal ?
                <div id="myModal" className="loginModal">
                    <div className="tab-container">
                        <div className="tab" onClick={() => setModalLogin(true)}>LOGIN</div>
                        <div className="tab" onClick={() => setModalLogin(false)}>SIGNUP</div>
                    </div>
                    {modalLogin ?
                        <LoginForm />
                        :
                        <SignupForm />

                    }
                    <button className="exit-btn" onClick={() => setShowModal(false)}>X</button>
                </div>
                : null}

        </>
    )
}

export default AppNavBar;
