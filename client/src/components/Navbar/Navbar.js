import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                        {/* REFACTOR INTO MODAL */}
                        <li onClick={() => setShowModal(true)}>LOGIN/SIGNUP</li>
                    </ul>
                </nav>
            </div>

            {showModal ?
                <div id="myModal" className="modal">
                    <div className="tab-container">
                            <div className="tab" onClick={() => setModalLogin(true)}>LOGIN</div>
                            <div className="tab" onClick={() => setModalLogin(false)}>SIGNUP</div>
                    </div>
                    {modalLogin ?
                        <form>
                            <div>
                                <label> EMAIL </label>
                                <input />
                            </div>
                            <div>
                                <label> PASSWORD </label>
                                <input />
                            </div>
                            <button>SUBMIT</button>
                        </form>
                        :
                        <form>
                            <div>
                                <label> USERNAME </label>
                                <input />
                            </div>
                            <div>
                                <label> EMAIL </label>
                                <input />
                            </div>
                            <div>
                                <label> PASSWORD </label>
                                <input />
                            </div>
                            <button>SUBMIT</button>
                        </form>
                    }
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>
                : null}

        </>
    )
}

export default AppNavBar;
