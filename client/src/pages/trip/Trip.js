import React, { useState } from 'react';
import S from './style';
import GenerateTrip from './GenerateTrip';
import TripList from './TripList';

const Trip = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (keyword) => {
        setSearch(keyword);
    };

    return (
        <S.Main>
            <GenerateTrip onSearch={handleSearch} />
            <TripList search={search} />
        </S.Main>
    );
};

export default Trip;
