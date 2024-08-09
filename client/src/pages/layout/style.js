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
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(to right, #fdf9f3, #fa9704);
        border-radius: 0 0 10px 10px;
    }

    .header-top {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
`;

S.MainLogo = styled.div`
    height: 60px;
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
        border: none;
        outline: none;
        border-radius: 20px;
        height: 35px;
        width: 200px;
        transition: border-color 0.3s;

        &:focus {
            border-color: #f57c00;
        }
    }
`;

S.UserContainer = styled.div`
    display: flex;
    align-items: center;

    & a {
        margin-left: 20px;
        text-decoration: none;
        color: #000000;
        transition: color 0.1s;

        &:hover {
            color: #7e7e7e;
        }
    }

    .welcome-name {
        color: #009688;
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
