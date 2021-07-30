import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import auth from '../../utils/auth';


const SignupForm = () => {
    // state to hold variables
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

    const [addUser] = useMutation(ADD_USER);


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser ({
                variables: { ...userFormData }
            })
            auth.login(data.addUser.token)
        } catch (err) {
            console.error(err)
        }

        setUserFormData({ username: '', email: '', password: '' })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUserFormData({ ...userFormData, [name]: value })
    }

    return (
        <form>
            <div>
                <label htmlFor="signup-username"> USERNAME </label>
                <input
                    value={userFormData.username}
                    name="username"
                    onChange={handleInputChange} id="signup-username" required />
            </div>
            <div>
                <label htmlFor="signup-email"> EMAIL </label>
                <input
                    value={userFormData.email}
                    name="email"
                    onChange={handleInputChange}
                    id="signup-email" required />
            </div>
            <div>
                <label htmlFor="signup-password"> PASSWORD </label>
                <input
                    value={userFormData.password}
                    name="password"
                    onChange={handleInputChange}
                    id="signup-password" required />
            </div>
            <button onClick={handleFormSubmit}>SUBMIT</button>
        </form>
    )
}

export default SignupForm