import React, {useEffect, useState} from 'react';
import S from './style';
import {useNavigate} from 'react-router-dom';
import Modal from '../../components/modal/Modal';
import {ModalButton} from './style';

const MyLikeTripList = ({search}) => {
    const [trips, setTrips] = useState(null);
    const [sortBy, setSortBy] = useState('최신');
    const [error, setError] = useState(null);
    const [editingImage, setEditingImage] = useState(null);
    const [newImageFile, setNewImageFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips();
    }, [sortBy, search, currentPage]);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchTrips = async () => {
        console.log('fetchTrips called with search:', search);
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`https://detourofficial.shop/api/schedules/users/likes?page=${currentPage}&sortBy=${sortBy}&search=${encodeURIComponent(search)}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Network response was not ok');
            }

            const result = await response.json();
            setTrips(result.data.content);
            setTotalPages(result.data.totalPages)
        } catch (error) {
            console.error('Error fetching trips:', error);
            setError(error.message);
        }
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const toggleLike = async (scheduleId, liked, likeId) => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        if (!scheduleId) {
            console.error('Schedule ID is undefined or null');
            return;
        }

        console.log(`scheduleId: ${scheduleId}, current isLiked: ${liked}`);

        try {
            if (liked && !likeId) {
                const response2 = await fetch(`https://detourofficial.shop/api/schedules/likes/${scheduleId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                });

                const result = await response2.json();
                likeId = result.data.likeId;
            }

            const url = liked
                ? `https://detourofficial.shop/api/schedules/likes/${likeId}`
                : `https://detourofficial.shop/api/schedules/${scheduleId}/likes`;
            const method = liked ? 'DELETE' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 404 && !liked) {
                alert('좋아요 상태가 올바르지 않습니다.');
                return;
            }

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Network response was not ok');
            }

            const responseData = await response.json();
            setTrips(prevTrips =>
                prevTrips.map(trip =>
                    trip.scheduleId === scheduleId
                        ? {
                            ...trip,
                            liked: !liked,
                            likeId: !liked ? responseData.data?.likeId : null,
                            likeCount: trip.likeCount + (liked ? -1 : 1)
                        }
                        : trip
                )
            );
        } catch (error) {
            console.error('Error toggling like:', error);
            alert(error.message);
        }
    };

    const handleImageEdit = (scheduleId) => {
        setEditingImage(scheduleId);
        setNewImageFile(null);
        setModalOpen(true);
    };

    const submitNewImage = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        if (!editingImage || !newImageFile) {
            console.error('Missing image data');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', newImageFile);

            const response = await fetch(`https://detourofficial.shop/schedules/${editingImage}/files`, { // URL 수정
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Network response was not ok';

                if (errorMessage.includes('해당 일정에 존재하지 않는 일행입니다')) {
                    alert('해당 게시글 작성자만 수정할 수 있습니다.');
                } else {
                    alert('이미지 업로드 중 오류가 발생했습니다.');
                }
                return;
            }

            const responseData = await response.json();
            setTrips(prevTrips =>
                prevTrips.map(trip =>
                    trip.scheduleId === editingImage
                        ? {...trip, imageUrl: responseData.data.imageUrl}
                        : trip
                )
            );

            setEditingImage(null);
            setModalOpen(false);
        } catch (error) {
            console.error('Error updating image:', error);
            alert(error.message);
        }
    };

    const handleCardClick = (scheduleId) => {
        navigate(`/schedules/${scheduleId}`);
    };

    return (
        <div>
            <S.TripSection>
                {trips ? (
                    trips.map((trip) => (
                        <S.TripCard
                            key={trip.scheduleId || `trip-${Math.random()}`}
                            onClick={() => handleCardClick(trip.scheduleId)}
                        >
                            <S.TripHeader>
                                <h3>{trip.title}</h3>
                                <h5>
                                    <S.Nickname>{trip.nickname}</S.Nickname>
                                    <S.ScheduleText>님의 일정</S.ScheduleText>
                                </h5>
                                <h4>{new Date(trip.createdAt).toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}</h4>
                            </S.TripHeader>
                            <S.TripImageWrapper>
                                <S.TripImage src={trip.imageUrl} alt={trip.title}/>
                                <S.EditImageButton onClick={(e) => {
                                    e.stopPropagation();
                                    handleImageEdit(trip.scheduleId);
                                }}>
                                    <img src="/images/modal/사진수정4.png" alt="Edit"/>
                                </S.EditImageButton>
                            </S.TripImageWrapper>
                            <S.TripFooter>
                                <S.LikeButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLike(trip.scheduleId, trip.liked, trip.likeId);
                                    }}
                                >
                                    <img
                                        src={trip.liked ? '/images/trip/heart.png' : '/images/trip/noheart.png'}
                                        alt="Like"
                                        style={{width: '24px', height: '24px'}}
                                    />
                                    <S.LikeCount>{trip.likeCount || 0}</S.LikeCount>
                                </S.LikeButton>
                                <S.ViewCount>조회수 {trip.hits || 0}</S.ViewCount>
                            </S.TripFooter>
                        </S.TripCard>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </S.TripSection>

            <S.Pagination>
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={index + 1 === currentPage}
                    >
                        {index + 1}
                    </button>
                ))}
            </S.Pagination>

            {/* 모달 컴포넌트 추가 */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>이미지 업로드</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImageFile(e.target.files[0])}
                />
                <ModalButton onClick={submitNewImage}>제출</ModalButton>
            </Modal>
        </div>
    );
};

export default MyLikeTripList;
