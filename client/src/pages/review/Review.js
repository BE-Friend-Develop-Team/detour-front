import React, { useState } from 'react';
import S from './style';
import GetReview from './GetReview';
import MyReviewList from './MyReviewList';
import StarRating from './StarRating';
import ThankYouAnimation from './ThankYouAnimation';
import ConfirmModal from '../../components/modal/ConfirmModal';

const Review = () => {
    const [search, setSearch] = useState('');
    const [content, setContent] = useState('');
    const [star, setStar] = useState(0);
    const [username, setUsername] = useState('');
    const [refetch, setRefetch] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = (keyword) => {
        setSearch(keyword);
    };

    const handleSubmit = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await fetch('https://detourofficial.shop/api/review', {
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

            setShowThankYou(true);

            setTimeout(() => {
                setShowThankYou(false);
            }, 3000);

            setRefetch(prev => !prev);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        handleSubmit();
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <S.Main>
            <S.FormContainer>
                <S.ImageTitle src="/images/review/리뷰.png" />
                <form onSubmit={handleFormSubmit}>
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
                            <div className="hint">우측 하단 댓글 칸의 사이즈를 직접 조정해 보세요</div>
                            <label>별점</label>
                            <StarRating rating={star} setRating={setStar}/>
                        </S.InputField>
                        <S.SubmitButton type="submit">리뷰 제출</S.SubmitButton>
                    </S.CenteredFields>
                </form>
            </S.FormContainer>
            {showThankYou && <ThankYouAnimation />}
            {showModal && <ConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />}
            <GetReview onSearch={handleSearch} />
            <MyReviewList search={search} refetch={refetch} />
        </S.Main>
    );
};

export default Review;
