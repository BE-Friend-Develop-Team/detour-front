import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    * {
        box-sizing: border-box;
        font-family: 'Pretendard-Regular';
        font-weight: 400;
        text-decoration: none;
        color: #1E1E1E;
    }
    
    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }

    input:focus {
        outline: none;
        
    }

    input:focus::placeholder {
        color: transparent
    }
`;

export default GlobalStyle;
