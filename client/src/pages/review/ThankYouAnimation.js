import React from 'react';
import Lottie from 'react-lottie';
import animationData from './thank.json'; // thank.json 파일 경로

const ThankYouAnimation = () => {
    const defaultOptions = {
        loop: false, // 애니메이션이 반복되지 않도록 설정
        autoplay: true, // 애니메이션이 자동으로 재생되도록 설정
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '40%', // 중앙보다 위로 이동
            left: '50%',
            transform: 'translate(-50%, -50%)', // 중앙 정렬
            zIndex: 1000, // 다른 컴포넌트 위에 표시되도록 설정
            width: '400px',
            height: 'auto'
        }}>
            <Lottie options={defaultOptions} height={400} width={400} />
        </div>
    );
};

export default ThankYouAnimation;
