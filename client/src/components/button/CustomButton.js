import React from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`
    background-color: ${props => props.bgColor || '#ffd7cf'};
    color: ${props => props.textColor || 'black'};
    border: none;
    border-radius: 4px;
    padding: ${props => props.padding || '10px 20px'};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    font-size: ${props => props.fontSize || '16px'};
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.hoverColor || '#ffd7cf'};
    }

    &:disabled {
        background-color: ${props => props.disabledColor || '#F0F0F0'};
        color: ${props => props.disabledTextColor || '#A0A0A0'};
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
