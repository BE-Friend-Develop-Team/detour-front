import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
        width: 24px;
        height: 24px;
    }
`;

const SearchButton = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            <img src="/images/trip/search.png" alt="Search" />
        </Button>
    );
};

export default SearchButton;