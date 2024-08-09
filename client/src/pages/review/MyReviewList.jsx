import React, { useEffect, useState } from 'react';
import S from './style';
import { useNavigate } from 'react-router-dom';

const MyReviewList = ({ search, refetch }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const starImg = '/images/review/star.png';
    const noStarImg = '/images/review/nostar.png';

    useEffect(() => {
        fetchReviews();
        fetchAverageRating();
    }, [search, refetch, currentPage, pageSize]);

    const fetchReviews = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`https://detourofficial.shop/api/review?page=${currentPage}&size=${pageSize}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) throw new Error('네트워크 오류');
            const data = await response.json();
            setReviews(data.data.content || []); // 안전하게 기본값을 설정
            setReviewCount(data.data.totalElements || 0); // 리뷰 개수 설정
            setTotalPages(data.data.totalPages || 0); // 전체 페이지 수 설정
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchAverageRating = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('https://detourofficial.shop/api/review/average', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error('평균 별점 조회 실패');
            }

            const data = await response.json();
            setAverageRating(data.data || 0);
        } catch (error) {
            console.error('Error fetching average rating:', error);
            setError(error.message);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - Math.ceil(rating);
        const halfStar = rating % 1 > 0 ? 1 : 0;

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <img key={`full-${index}`} src={starImg} alt="star" style={{ width: '20px', height: '20px' }} />
                ))}
                {halfStar > 0 && (
                    <img src={starImg} alt="half-star" style={{ width: '20px', height: '20px', clipPath: 'inset(0 50% 0 0)' }} />
                )}
                {[...Array(emptyStars)].map((_, index) => (
                    <img key={`empty-${index}`} src={noStarImg} alt="no-star" style={{ width: '20px', height: '20px' }} />
                ))}
            </>
        );
    };

    return (
        <S.ReviewSection>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <S.AverageRating>
                {renderStars(averageRating)} {averageRating.toFixed(1)}
            </S.AverageRating>
            <S.ReviewCount>
                총 {reviewCount}개의 리뷰
            </S.ReviewCount>
            <S.ReviewList>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <S.ReviewItem key={review.reviewId}>
                            <S.ReviewContent>
                                <S.UserName>{review.username}</S.UserName>
                                <S.ReviewDate>{new Date(review.createdDate).toLocaleDateString()}</S.ReviewDate>
                                <S.ReviewStars>
                                    {renderStars(review.star)}
                                </S.ReviewStars>
                                <S.ReviewText>
                                    {review.content ? review.content.substring(0, 47) + '...' : review.content}
                                </S.ReviewText>
                            </S.ReviewContent>
                        </S.ReviewItem>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </S.ReviewList>
            <S.Pagination>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    이전
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        style={{ fontWeight: currentPage === index ? 'bold' : 'normal' }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    다음
                </button>
            </S.Pagination>
        </S.ReviewSection>
    );
};

export default MyReviewList;
