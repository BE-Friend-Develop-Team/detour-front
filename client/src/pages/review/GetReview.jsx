import React, { useState } from 'react';
import S from './style';
// import SearchButton from '../../components/button/SearchButton'; // 필요 없는 경우 제거

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
