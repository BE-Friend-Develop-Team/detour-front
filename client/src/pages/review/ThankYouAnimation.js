import React from 'react';
import Lottie from 'react-lottie';
import animationData from './thank.json';

const ThankYouAnimation = () => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            width: '400px',
            height: 'auto'
        }}>
            <Lottie options={defaultOptions} height={400} width={400} />
        </div>
    );
};

export default ThankYouAnimation;
