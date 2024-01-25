// client/src/styles.js

import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #555;
    color: #fff; /* Set text color to white */
  }
`;

export const FormContainer = styled.div`
    background-color: ${(props) => props.backgroundColor || '#333'};
    color: #fff;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

export const FormLabel = styled.label`
    display: block;
    margin-bottom: 8px;
`;

export const FormInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

export const FormButton = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

export const ErrorMessage = styled.div`
    color: #ff0000;
    margin-top: 8px;
`;
