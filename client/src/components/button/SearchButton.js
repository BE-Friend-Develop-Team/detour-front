import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    height: 2.4rem;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 20px;

    img {
        width: 100%;
        height: 100%;
    }
`;

const SearchButton = ({ children }) => {
    return <Button>{children}</Button>;
};

export default SearchButton;
