import React, { useState } from 'react';
import S from './style';
import GetReview from './GetReview';
import MyReviewList from './MyReviewList';
import StarRating from './StarRating';
import ThankYouAnimation from './ThankYouAnimation'; // 새로 추가된 컴포넌트 import

const Review = () => {
    const [search, setSearch] = useState('');
    const [content, setContent] = useState('');
    const [star, setStar] = useState(0);
    const [username, setUsername] = useState('');
    const [refetch, setRefetch] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false); // 애니메이션 표시 상태 추가

    const handleSearch = (keyword) => {
        setSearch(keyword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ content, star, username }),
            });

            if (!response.ok) throw new Error('리뷰 저장 실패');
            alert('리뷰가 성공적으로 저장되었습니다!');
            setContent('');
            setStar(0);
            setUsername('');

            // 리뷰 저장 성공 후 애니메이션 표시
            setShowThankYou(true);

            setTimeout(() => {
                setShowThankYou(false);
            }, 3000);

            // 데이터 새로 고침 트리거
            setRefetch(prev => !prev);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <S.Main>
            <S.FormContainer>
                <S.ImageTitle src="/images/review/리뷰.png" />
                <form onSubmit={handleSubmit}>
                    <S.InputField>
                        <label>사용자 이름</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </S.InputField>
                    <S.InputField>
                        <label>리뷰 내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </S.InputField>
                    <S.CenteredFields>
                        <S.InputField>
                            <label>별점</label>
                            <StarRating rating={star} setRating={setStar} />
                        </S.InputField>
                        <S.SubmitButton type="submit">리뷰 제출</S.SubmitButton>
                    </S.CenteredFields>
                </form>
            </S.FormContainer>
            {showThankYou && <ThankYouAnimation />} {/* 애니메이션 컴포넌트 표시 */}
            <GetReview onSearch={handleSearch} />
            <MyReviewList search={search} refetch={refetch} />
        </S.Main>
    );
};

export default Review;
