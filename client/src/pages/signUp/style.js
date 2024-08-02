import styled from "styled-components";
import theme from "../../global/theme";
import { flexCenter, flexCenterColumn } from "../../global/common";

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
    ${flexCenterColumn}
    position: absolute;
`;

S.SignUpLogoWrapper = styled.div`
    height: 8rem;
    & img {
        height: 100%;
    }
    margin-left: 4.5rem;
`;

S.CatchphraseWrapper = styled.div`
    height: 10rem;
    & img {
        height: 100%;
    }
    /* margin-top: -2rem; */
`;

S.SignUpFormContainer = styled.div`
    width: 28rem;
    position: relative;
    background-color: transparent;
    ${flexCenterColumn}/* margin-top: -2rem; */
`;

S.SignUpForm = styled.form`
    & input {
        margin-bottom: 0.25rem;
    }
`;

S.SignUpLabel = styled.label``;

S.ErrorMessageWrapper = styled.div`
    width: 20rem;
    height: 2rem;
    margin-bottom: 0.25rem;
    padding: 0 1rem;
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

S.ForAdminLabel = styled.label`
    width: 3.5rem;
    height: 1rem;
    position: absolute;
    ${flexCenter}
    left: 0rem;
    bottom: 6rem;
    & input {
        margin: 0;
        margin-right: 4px;
    }
    & span {
        font-size: 12px;
    }
`;

S.AdminInputDiv = styled.div`
    width: 20rem;
    height: 4.5rem;
`;

S.SignUpButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    & button {
        margin: 0.5rem 1.5rem;
    }
`;

export default S;
