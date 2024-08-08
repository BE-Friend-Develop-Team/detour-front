// Styled components for your layout

import styled from "styled-components";

const S = {};

S.Background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
`;

S.Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
`;

S.Header = styled.header`
    background-color: #fff; /* 배경색 */
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
    border-radius: 10px; /* 모서리 둥글게 */

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(to right, #fdf9f3, #fa9704); /* 그라디언트 색상 */
        border-radius: 0 0 10px 10px; /* 모서리 둥글게 */
    }

    .header-top {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px; /* 마진 조정 */
    }
`;

S.MainLogo = styled.div`
    height: 60px; /* 로고 크기 조정 */
    width: auto;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

S.SearchBarTop = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: auto;

    & input {
        padding: 8px;
        font-size: 1em;
        border: none; /* 테두리 색상 */
        outline: none;
        border-radius: 20px;
        height: 35px;
        width: 200px;
        transition: border-color 0.3s; /* 테두리 색상 변화 */

        &:focus {
            border-color: #f57c00; /* 포커스 시 테두리 색상 */
        }
    }
`;

S.UserContainer = styled.div`
    display: flex;
    align-items: center;

    & a {
        margin-left: 20px;
        text-decoration: none;
        color: #000000; /* 링크 색상 */
        transition: color 0.1s;

        &:hover {
            color: #7e7e7e; /* 링크 호버 색상 */
        }
    }

    .welcome-name {
        color: #009688; /* 환영 메시지 색상 */
        font-weight: bold;
    }
`;

S.Navbar = styled.nav`
    width: 100%;
    margin-top: 10px;

    & ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
        justify-content: left;
    }

    & ul li {
        display: inline;
    }

    & ul li a {
        text-decoration: none;
        color: #333;
        padding: 10px 15px;
        border-radius: 5px;
    }

    & ul li .current-page {
        background-color: #fdf5de;
        color: #000;
        padding: 5px 10px;
        border-radius: 10px;
    }
`;

S.Main = styled.main``;

S.Footer = styled.footer`
    background-color: #f0f0f0;
    text-align: center;
    padding: 10px 0;
    margin-top: 20px;
`;

export default S;
