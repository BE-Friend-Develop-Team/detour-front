import styled from "styled-components";
import theme from "../../global/theme";
import { flexCenter, flexCenterColumn } from "../../global/common";

const S = {};

S.Background = styled.div`
    width: 100vw;
    height: 100vh;
    ${flexCenterColumn};
    position: relative;
    overflow: hidden;
`;

S.YellowBackground = styled.div`
    width: 100%;
    height: 52%;
    background-color: ${theme.PALETTE.background.yellow};
    position: absolute;
    top: 0;
    left: 0;
`;

S.WhiteBackground = styled.div`
    width: 100%;
    height: 48%;
    background-color: ${theme.PALETTE.background.white};
    position: absolute;
    bottom: 0;
    left: 0;
`;

S.Wrapper = styled.div`
    ${flexCenterColumn}
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
`;

S.SignUpLogoWrapper = styled.div`
    height: 8rem;
    margin-bottom: 1rem;
    & img {
        height: 100%;
    }
`;

S.CatchphraseWrapper = styled.div`
    height: 10rem;
    margin-bottom: 2rem;
    & img {
        height: 100%;
    }
`;

S.SignUpFormContainer = styled.div`
    width: 28rem;
    background-color: transparent;
    ${flexCenterColumn}
`;

S.SignUpForm = styled.form`
    width: 100%;
    background-color: ${theme.PALETTE.white};
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    ${flexCenterColumn}

    & input {
        margin-bottom: 0.5rem;
    }
`;

S.SignUpLabel = styled.label`
    width: 100%;
    margin-bottom: 1rem;
`;

S.EmailInputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    & input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    & button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    & button {
        margin-left: 1rem;
    }
`;

S.CheckInputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    & button {
        margin-left: 1rem;
    }
`;

S.AuthCodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`;

S.AuthCodeInputWrapper = styled.div`
    margin-bottom: 1rem;
`;

S.TimerWrapper = styled.div`
    width: 20rem;
    height: 2rem;
    margin-top: 0.5rem;
`;

S.TimerText = styled.span`
    font-size: 0.75rem;
    color: ${theme.PALETTE.text};
`;

S.ErrorMessageWrapper = styled.div`
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
    padding: 0 1rem;
`;

S.ErrorMessage = styled.span`
    font-size: 0.75rem;
    color: ${theme.PALETTE.error};
`;

S.ForAdminLabel = styled.label`
    display: flex;
    align-items: center;
    margin: 1rem 0;

    & input {
        margin-right: 0.5rem;
    }

    & span {
        font-size: 0.875rem;
    }
`;

S.AdminInputDiv = styled.div`
    width: 100%;
    margin-bottom: 1rem;
`;

S.SignUpButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

S.SignUpButton = styled.button`
    background-color: ${theme.PALETTE.primary};
    color: ${theme.PALETTE.white};
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:disabled {
        background-color: ${theme.PALETTE.disabled};
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: ${theme.PALETTE.primaryHover};
    }
`;

S.SuccessMessage = styled.span`
    font-size: 0.875rem;
    color: ${theme.PALETTE.success};
    margin-top: 1rem;
    text-align: center;
`;

export default S;
