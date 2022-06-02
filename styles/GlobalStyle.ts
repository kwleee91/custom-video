import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    }
  body {
    font-family: 'SpoqaHanSansNeo';
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  input, textarea, select, button {
    font-size: inherit;
    font-family: inherit;
    outline: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ul, li {
    list-style: none;
  }
  textarea {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    resize: none;
  }

`;

export default GlobalStyle;
