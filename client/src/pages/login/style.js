import styled from "styled-components";
import theme from "../../global/theme";
import { flexCenter, flexCenterColumn, flexColumn } from "../../global/common";

const S = {};

// 1rem = 16px
S.Background = styled.div`
    width: 100vw;
    height: 100vh;
    ${flexCenterColumn};
    flex: 1;
    position: relative;
`;

S.YellowBackground = styled.div`
    width: 100%;
    height: 52%;
    background-color: ${theme.PALETTE.background.yellow};
`;

S.WhiteBackground = styled.div`
    width: 100%;
    height: 48%;
    background-color: ${theme.PALETTE.background.white};
`;

S.Wrapper = styled.div`
    width: 100%;
    ${flexCenterColumn};
    position: absolute;
`;

S.CharacterWrapper = styled.div`
    margin-top: 2rem;
    height: 16rem;
    & img {
        height: 100%;
    }
    margin-bottom: 4rem;
`;

S.LogoWrapper = styled.div`
    height: 8rem;
    & img {
        height: 100%;
    }
    position: absolute;
    top: 18rem;
    margin-left: 4.5rem;
`;

S.LoginFormWrapper = styled.div`
    width: 100%;
`;

S.LoginForm = styled.form`
    margin-top: 5rem;
    ${flexCenterColumn}
`;

S.LoginInputContainer = styled.div`
    ${flexCenterColumn}
    & input {
        margin-bottom: 0.25rem;
    }
`;

S.ErrorMessageWrapper = styled.div`
    width: 20rem;
    height: 1.5rem;
    margin-bottom: 0.25rem;
`;

S.ErrorMessage = styled.span`
    font-size: 0.75rem;
    color: ${theme.PALETTE.error};
    .icon {
        font-size: 0.75rem;
        margin-right: 0.25rem;
        path {
            color: ${theme.PALETTE.error};
        }
    }
`;

S.LoginButtonContainer = styled.div`
    ${flexCenter}
    & button {
        margin: 0.5rem 1.25rem;
    }
`;

S.KakaoLoginButtonWrapper = styled.div`
    margin-top: 1rem;
`;

export default S;
