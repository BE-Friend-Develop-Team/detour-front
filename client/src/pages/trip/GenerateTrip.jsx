import React, { useState } from 'react';
import S from './style';
import SearchButton from '../../components/button/SearchButton';

const GenerateTrip = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        onSearch(search);
    };

    return (
        <S.SearchSection>
            <h2>👒 다른 사람들은 어떤 경로로?</h2>
            <p>최근 등록 경로 순으로 요즘 핫한 곳을 한눈에!</p>
            <S.SearchBar>
                <input
                    type="text"
                    placeholder="키워드를 입력하세요"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <SearchButton onClick={handleSearch} />
            </S.SearchBar>
        </S.SearchSection>
    );
};

export default GenerateTrip;
