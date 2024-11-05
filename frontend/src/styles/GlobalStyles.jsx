// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import '@fontsource/poppins';

const GlobalStyles = createGlobalStyle`
 
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }

  /* Body Styling */
  body {
    font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    background-color: #f5f5f5;
    color: #333;
    // padding: 0 20px; 
  }

  
  /* Responsive styles */
 @media (max-width: 768px) {
    body {      
    padding: 0 10px; 
    }
  }


  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    color: #222;
    margin-bottom: 0.5em;
  }

  /* Links */
  a {
    text-decoration: none;
    color: #0073e6;
    transition: color 0.3s ease;

    &:hover {
      color: #005bb5;
    }
  }

  /* Form Inputs */
  input, button {
    font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  }
`;

 

export default GlobalStyles;
