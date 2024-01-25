// client/src/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, FormLabel, FormInput, FormButton, ErrorMessage } from './styles';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleRegister = async () => {
        try {
            // Send a request to the server to authenticate the user
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Successful login (store the token)
                const data = await response.json();
                console.log('Login successful:', data);
                navigate('/transaction');
            } else {
                // Failed login (handle the error)
                const data = await response.json();
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Clear the error when the user tries to register again
            setError('');
            // Form validation logic
            if (!username || !password) {
                setError('Please fill in all fields');
                return;
            }
        }
    };

    return (
        <FormContainer>
            <h2>Login</h2>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <FormInput
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <FormLabel htmlFor="password">Password:</FormLabel>
            <FormInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <FormButton type="button" onClick={handleRegister}>
                Login
            </FormButton>

            {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormContainer>
    );
}

export default Login;
