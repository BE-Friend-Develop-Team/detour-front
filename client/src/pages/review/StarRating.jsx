import React, { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
    const [hoveredStar, setHoveredStar] = useState(null);
    const starImg = '/images/review/star.png';
    const noStarImg = '/images/review/nostar.png';

    const handleMouseEnter = (index) => setHoveredStar(index);
    const handleMouseLeave = () => setHoveredStar(null);
    const handleClick = (index) => setRating(index + 1);

    const renderStars = (currentRating) => {
        return [...Array(5)].map((_, index) => {
            const starType = index < currentRating ? starImg : noStarImg;
            return (
                <img
                    key={index}
                    src={starType}
                    alt={`star-${index}`}
                    style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                />
            );
        });
    };

    return (
        <div>
            {renderStars(hoveredStar !== null ? hoveredStar + 1 : rating)}
        </div>
    );
};

export default StarRating;
