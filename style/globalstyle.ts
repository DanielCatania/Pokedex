import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    box-sizing: border-box;
  }
  
  html {
    display: flex;
    min-height: 100%;
    flex-direction: column;
  }
  body, main {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  #__next {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    flex-shrink: 0;
    position: relative;
  }
  ol, ul {
	  list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    background-color: inherit;
  }
`;

export default GlobalStyle;
