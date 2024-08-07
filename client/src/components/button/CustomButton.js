// CustomButton.js
import React from 'react';
import styled from 'styled-components';

// 버튼 스타일 정의
const StyledButton = styled.button`
    background-color: ${props => props.bgColor || '#ffd7cf'}; /* 연노랑 색상 */
    color: ${props => props.textColor || 'black'};
    border: none; /* 테두리 없애기 */
    border-radius: 4px;
    padding: ${props => props.padding || '10px 20px'};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    font-size: ${props => props.fontSize || '16px'};
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.hoverColor || '#ffd7cf'}; /* 연노랑의 밝은 색상 */
    }

    &:disabled {
        background-color: ${props => props.disabledColor || '#F0F0F0'}; /* 비활성화된 색상 */
        color: ${props => props.disabledTextColor || '#A0A0A0'}; /* 비활성화된 텍스트 색상 */
    }
`;

const CustomButton = ({ children, onClick, disabled, ...rest }) => {
    return (
        <StyledButton onClick={onClick} disabled={disabled} {...rest}>
            {children}
        </StyledButton>
    );
};

export default CustomButton;
