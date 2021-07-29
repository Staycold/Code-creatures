import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AppNavBar = () => {
    const [showModal, setShowModal] = useState(false)
    const [modalLogin, setModalLogin] = useState(true)

    return (
        <>
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
                    {/* REFACTOR INTO MODAL */}
                    {/* <Link to="/login">
                    <li>LOGIN</li>
                </Link> */}
                </ul>
                <button onClick={() => setShowModal(true)}>LOGIN/SIGNUP</button>
            </nav>
            {showModal ?
                <div id="myModal" className="modal">
                    <nav>
                        <ul>
                            <li onClick={() => setModalLogin(true)}>LOGIN</li>
                            <li onClick={() => setModalLogin(false)}>SIGNUP</li>
                        </ul>
                    </nav>
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
                            </form>
                        }
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>
                : null}

        </>
    )
}

export default AppNavBar;
