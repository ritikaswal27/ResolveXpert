// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import '@fontsource/poppins';

const GlobalStyles = createGlobalStyle`
  /* Set box-sizing and font */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Gloria Hallelujah', sans-serif; /* Updated to Poppins */
  }

  /* Body styling */
  body {
    line-height: 1.6;
    background-color: #f5f5f5; /* Light background for contrast */
    color: #333;
    padding: 0 20px; /* Padding for consistent spacing */
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    body {
      padding: 0 10px; /* Reduce padding on mobile */
    }
  }
`;

export default GlobalStyles;
