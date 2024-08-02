import React from 'react';
import S from './style';
import GenerateTrip from './GenerateTrip';
import TripList from './TripList';

const Trip = () => {
    return (
        <S.Main>
            <GenerateTrip />
            <TripList />
        </S.Main>
    );
};

export default Trip;