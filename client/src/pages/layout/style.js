import styled from "styled-components";
import theme from "../../global/theme";

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
    background-color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid gray;

    .header-top {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }
`;

S.MainLogo = styled.div`
    height: 50px;
    width: 180px;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

S.SearchBarTop = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: auto;

    & input {
        padding: 5px;
        font-size: 0.9em;
        border: 1px solid #ddd;
        border-radius: 15px;
        height: 25px;
        width: 220px;
    }
`;

S.UserContainer = styled.div`
    display: flex;
    align-items: center;

    & a {
        margin-left: 40px;
        text-decoration: none;
        color: #333;
    }

    .welcome-name {
        color: blue;
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
