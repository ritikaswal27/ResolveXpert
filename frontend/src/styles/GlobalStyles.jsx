// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import '@fontsource/poppins';

const GlobalStyles = createGlobalStyle`
  /* Set box-sizing and font */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }

  /* Body styling */
  body {
    line-height: 1.6;
    background-color: #f5f5f5; 
    color: #333;
    padding: 0 20px; 
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    body {
      padding: 0 10px; 
    }
  }
`;

export default GlobalStyles;
