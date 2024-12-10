import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f4f4f4;
  }

  h1, h2, h3 {
    font-family: 'Helvetica', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
