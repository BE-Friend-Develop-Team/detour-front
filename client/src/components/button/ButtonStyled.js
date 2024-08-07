import styled from 'styled-components';

// 버튼 스타일
const Button = styled.button`
    background: none;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0; /* 버튼 내부 여백 제거 */
`;

const StyledImg = styled.img`
    width: 40px;  /* 원하는 크기로 조정 */
    height: 40px; /* 원하는 크기로 조정 */
    border: none; /* 테두리 제거 */
    background-color: transparent; /* 배경 색상 제거 */
    padding: 0; /* 패딩 제거 */
`;

const ButtonText = styled.button`
    background: #e08383; /* 버튼 배경 색상 */
    border: 1px solid #e08383; /* 버튼 테두리 색상 */
    color: white; /* 텍스트 색상 */
    font-size: 1rem;
    text-align: center;
    padding: 10px 20px; /* 버튼 내부 여백 */
    border-radius: 4px; /* 버튼 모서리 둥글기 */
    cursor: pointer;
    margin: 8px; /* 버튼 간 간격 */
    text-decoration: none; /* 하이퍼링크 밑줄 제거 */

    &:hover {
        background: #efc3c3; /* 호버 시 배경 색상 */
        border-color: #efc3c3; /* 호버 시 테두리 색상 */
    }
`;

const InputField = styled.input`
    width: 80%; /* 부모 컨테이너에 맞게 입력 칸의 너비를 조정 */
    padding: 10px; /* 입력 칸 내부 여백 */
    border: 1px solid #ced4da; /* 입력 칸 테두리 색상 */
    border-radius: 4px; /* 입력 칸 모서리 둥글기 */
    font-size: 1rem; /* 폰트 크기 */
    margin-bottom: 10px; /* 입력 칸과 버튼 간 간격 */
    box-sizing: border-box; /* 패딩과 테두리를 포함한 전체 너비 계산 */
    outline: none; /* 포커스 시 기본 테두리 제거 */

    &:focus {
        border-color: #80bdff; /* 포커스 시 테두리 색상 */
        box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25); /* 포커스 시 그림자 효과 */
    }
`;

// 모달 내용의 스타일을 조정합니다.
const ModalContent1 = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center; /* 중앙 정렬 */
    max-width: 400px;
    width: 100%; /* 전체 너비 사용 */
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 수평 중앙 정렬 */
    gap: 10px; /* 요소 간 간격 */
`;

export { Button, StyledImg, ButtonText, InputField, ModalContent1 };
