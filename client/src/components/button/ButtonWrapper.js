import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 20px;
`;

const ButtonContainer = ({ children }) => {
    return (
        <ButtonWrapper>
            {children}
        </ButtonWrapper>
    );
};

export default ButtonContainer;
