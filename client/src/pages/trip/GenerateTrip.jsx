import React, { useState } from 'react';
import S from './style';
import SearchButton from '../../components/button/SearchButton';

const GenerateTrip = () => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        // 검색 로직을 여기에 구현합니다.
        // 예: 부모 컴포넌트로 검색어를 전달하거나 검색 결과를 가져오는 함수를 호출합니다.
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
                <SearchButton onClick={handleSearch}>
                    <img src="/images/trip/search.png" alt="Search" />
                </SearchButton>
            </S.SearchBar>
        </S.SearchSection>
    );
};

export default GenerateTrip;