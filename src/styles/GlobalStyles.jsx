// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }

  body {
    line-height: 1.6;
  }
  
  // Responsive breakpoints
  @media (max-width: 768px) {
    /* Mobile styles */
  }
`;

export default GlobalStyles;
