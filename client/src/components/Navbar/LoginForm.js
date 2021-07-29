import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: "test1@email.com", password: "pass1234" })

    const [loginUser] = useMutation(LOGIN_USER)

    const handleFormSubmit = async (event) => {
        event.preventDefault();

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
                    name="password"
                    value={userFormData.password}
                    onChange={handleInputChange} />
            </div>
            <button onClick={handleFormSubmit}>SUBMIT</button>
        </form>
    );
}

export default LoginForm;