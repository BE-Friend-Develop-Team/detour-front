// TripCard.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
    border: 4px solid #fdf5de;
    border-radius: 20px;
    overflow: hidden;
    width: 300px;
    min-height: 350px;
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 16px 32px rgba(0, 0, 0, 0.2);
    }
`;

const Header = styled.div`
    padding: 15px;
    text-align: center;
    flex-shrink: 0;

    h3 {
        margin: 0;
        font-size: 1.1em;
    }

    h4 {
        margin: 5px 0;
        font-size: 0.9em;
        color: gray;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const Footer = styled.div`
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const TripCard = ({ scheduleId, title, subtitle, img, liked, likeCount, onLike }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/schedules/${scheduleId}`);
    };

    return (
        <Card onClick={handleCardClick}>
            <Header>
                <h3>{title}</h3>
                <h4>{subtitle}</h4>
            </Header>
            <Image src={img} alt={title} />
            <Footer>
                <LikeButton onClick={(e) => { e.stopPropagation(); onLike(); }}>
                    <img src={liked ? '/images/trip/heart.png' : '/images/trip/noheart.png'} alt="Like" />
                </LikeButton>
                <span>{likeCount}</span>
            </Footer>
        </Card>
    );
};

export default TripCard;
