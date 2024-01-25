// client/src/Transaction.js

import React, { useState, useEffect } from 'react';
//import { createGlobalStyle } from 'styled-components';
import { FormContainer, FormLabel, FormInput, FormButton, ErrorMessage } from './styles';

function Transaction() {
    const [error, setError] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        // Must implement logic to fetch transaction data from the server and update state
    }, []);

    const handleTransaction = async () => {
        try {
            // Send a request to the server to perform the transaction
            const token = localStorage.getItem('token'); // (if in local storage)
            const response = await fetch('http://localhost:3001/transaction', {
                method: 'POST',
                headers: {
                    //'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Update the balance after a successful transaction
                //const balance = await fetchBalance();
                const updatedBalance = await fetchBalance();
                setBalance(updatedBalance);
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            console.error('Error performing transaction:', error);
            setError('Internal Server Error');
        }
    };

    const fetchBalance = async () => {
        try {
            // Assuming the token is in localStorage
            const token = localStorage.getItem('token'); 
            if (!token) {
                setError('Missing token');
                return 0;
            }
            const response = await fetch('http://localhost:3001/balance', {
                headers: {
                    //'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Raw Response:', response);

            if (response.ok) {
                const data = await response.json();
                console.log('Balance:', data.balance);
                return data.balance;
            } else {
                const data = await response.json();
                setError(data.message);
                return 0;
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
            setError('Internal Server Error');
            return 0;
        }
    };

    useEffect(() => {
        // Fetch the initial balance when the component mounts
        fetchBalance().then((initialBalance) => setBalance(initialBalance));
    }, []);

    return (
        <FormContainer>
            <h2>Transaction</h2>
            <FormButton type="button" onClick={handleTransaction}>
                Perform Transaction
            </FormButton>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div>
                <h3>Balance: ${balance}</h3>
            </div>
        </FormContainer>
    );
}

export default Transaction;
