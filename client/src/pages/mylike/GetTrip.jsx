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
            <h2>❤️ 내가 좋아요 한 일정 모음</h2>
            <p> </p>
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
