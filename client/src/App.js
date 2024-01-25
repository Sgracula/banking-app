// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from './styles';
import Register from './Register';
import Login from './Login';
import Transaction from './Transaction';

function App() {
    return (
        <Router>
            <GlobalStyle />
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/transaction">Transaction</Link>
                        </li>
                    </ul>
                </nav>

                <hr />

                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/transaction" element={<Transaction />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
