// ButtonWrapper.js
import React from 'react';
import styled from 'styled-components';

// 버튼을 우측으로 정렬할 컨테이너 스타일 정의
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end; /* 우측 정렬 */
    margin: 20px; /* 여백 조정 */
`;

const ButtonContainer = ({ children }) => {
    return (
        <ButtonWrapper>
            {children}
        </ButtonWrapper>
    );
};

export default ButtonContainer;
