import React, { useState } from 'react';
import S from './style';

const GetReview = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        onSearch(search);
    };

    return (
        <S.SearchSection>

        </S.SearchSection>
    );
};

export default GetReview;
