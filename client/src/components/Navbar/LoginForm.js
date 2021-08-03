import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const LoginForm = () => {
    // state to track login
    const [userFormData, setUserFormData] = useState({ email: "", password: "" })

    const [loginUser] = useMutation(LOGIN_USER)

    // event handler for form submition
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // checks to see if theres existing token
        const existingToken = Auth.getToken();
        // if there is an existing token, remove
        if (existingToken) {
            localStorage.removeItem('id_token');
        }

        try {
            const { data } = await loginUser({
                variables: {...userFormData}
            })
            Auth.login(data.login.token);
        } catch (err) {
            console.error(err)
        }
        

        setUserFormData({ email: "", password: "" })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setUserFormData({ ...userFormData, [name]: value })
    }

    return (
        <form>
            <div>
                <label> EMAIL </label>
                <input
                    name="email"
                    value={userFormData.email}
                    onChange={handleInputChange} />
            </div>
            <div>
                <label> PASSWORD </label>
                <input
                    type="password"
                    name="password"
                    value={userFormData.password}
                    onChange={handleInputChange} />
            </div>
            <button onClick={handleFormSubmit}>SUBMIT</button>
        </form>
    );
}

export default LoginForm;