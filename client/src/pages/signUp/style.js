import styled from "styled-components";
import theme from "../../global/theme";
import { flexCenter, flexCenterColumn } from "../../global/common";

const S = {};

// 전체 배경
S.Background = styled.div`
    width: 100vw;
    height: 100vh;
    ${flexCenterColumn};
    position: relative;
    overflow: hidden;
`;

// 노란색 배경
S.YellowBackground = styled.div`
    width: 100%;
    height: 52%;
    background-color: ${theme.PALETTE.background.yellow};
    position: absolute;
    top: 0;
    left: 0;
`;

// 흰색 배경
S.WhiteBackground = styled.div`
    width: 100%;
    height: 48%;
    background-color: ${theme.PALETTE.background.white};
    position: absolute;
    bottom: 0;
    left: 0;
`;

// 전체 래퍼
S.Wrapper = styled.div`
    ${flexCenterColumn}
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
`;

// 로고 래퍼
S.SignUpLogoWrapper = styled.div`
    height: 8rem;
    margin-bottom: 1rem;
    & img {
        height: 100%;
    }
`;

// 캐치프레이즈 래퍼
S.CatchphraseWrapper = styled.div`
    height: 10rem;
    margin-bottom: 2rem;
    & img {
        height: 100%;
    }
`;

// 회원가입 폼 컨테이너
S.SignUpFormContainer = styled.div`
    width: 28rem;
    background-color: transparent;
    ${flexCenterColumn}
`;

// 회원가입 폼
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

// 레이블
S.SignUpLabel = styled.label`
    width: 100%;
    margin-bottom: 1rem;
`;

// 이메일 입력 필드와 인증 버튼 래퍼
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

// 아이디 중복 확인과 닉네임 중복 확인 버튼 래퍼
S.CheckInputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    & button {
        margin-left: 1rem;
    }
`;

// 인증번호 입력 필드와 타이머 래퍼
S.AuthCodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`;

// 인증번호 입력 필드
S.AuthCodeInputWrapper = styled.div`
    margin-bottom: 1rem;
`;

// 타이머 래퍼
S.TimerWrapper = styled.div`
    width: 20rem;
    height: 2rem;
    margin-top: 0.5rem;
`;

// 타이머 텍스트
S.TimerText = styled.span`
    font-size: 0.75rem;
    color: ${theme.PALETTE.text};
`;

// 오류 메시지 래퍼
S.ErrorMessageWrapper = styled.div`
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
    padding: 0 1rem;
`;

// 오류 메시지
S.ErrorMessage = styled.span`
    font-size: 0.75rem;
    color: ${theme.PALETTE.error};
`;

// 관리자 체크박스와 텍스트
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

// 관리자 키 입력 필드 래퍼
S.AdminInputDiv = styled.div`
    width: 100%;
    margin-bottom: 1rem;
`;

// 회원가입 버튼 래퍼
S.SignUpButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

// 회원가입 버튼 스타일
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

// 인증 성공 메시지 스타일
S.SuccessMessage = styled.span`
    font-size: 0.875rem;
    color: ${theme.PALETTE.success};
    margin-top: 1rem;
    text-align: center;
`;

export default S;
