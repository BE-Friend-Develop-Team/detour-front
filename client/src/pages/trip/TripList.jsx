// src/components/TripList/TripList.js
import React, { useEffect, useState } from 'react';
import S from './style'; // 스타일 파일 import
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal'; // 상대 경로
import { ModalInput, ModalButton } from './style'; // 새로운 스타일 import

const TripList = ({ search }) => {
    const [trips, setTrips] = useState(null);
    const [sortBy, setSortBy] = useState('최신');
    const [error, setError] = useState(null);
    const [editingImage, setEditingImage] = useState(null);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips();
    }, [sortBy, search]);

    const fetchTrips = async () => {
        console.log('fetchTrips called with search:', search);
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/schedules?page=1&sortBy=${sortBy}&search=${encodeURIComponent(search)}`, {
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
            console.log("data:", JSON.stringify(result, null, 2));
            setTrips(result.data);
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
                const response2 = await fetch(`http://localhost:8081/api/schedules/likes/${scheduleId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                });

                const result = await response2.json();
                likeId = result.data.likeId;
            }

            const url = liked
                ? `http://localhost:8081/api/schedules/likes/${likeId}`
                : `http://localhost:8081/api/schedules/${scheduleId}/likes`;
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
        setNewImageUrl('');
        setModalOpen(true); // 모달 열기
    };

    const submitNewImage = async () => {
        const accessToken = localStorage.getItem('token')?.substring(7);
        if (!accessToken) {
            setError("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        if (!editingImage || !newImageUrl) {
            console.error('Missing image data');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/schedules/${editingImage}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mainImage: newImageUrl }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Network response was not ok');
            }

            // Update trips with new image URL
            setTrips(prevTrips =>
                prevTrips.map(trip =>
                    trip.scheduleId === editingImage
                        ? { ...trip, mainImage: newImageUrl }
                        : trip
                )
            );

            setEditingImage(null);
            setModalOpen(false); // 모달 닫기
        } catch (error) {
            console.error('Error updating image:', error);
            alert(error.message);
        }
    };

    return (
        <div>
            <S.SortSection>
                <label htmlFor="sortBy"></label>
                <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                    <option value="최신">최신순</option>
                    <option value="좋아요">좋아요순</option>
                </select>
            </S.SortSection>
            <S.TripSection>
                {trips ? (
                    trips.map((trip) => (
                        <S.TripCard key={trip.scheduleId || `trip-${Math.random()}`}>
                            <S.TripHeader>
                                <h3>{trip.title}</h3>
                                <h5>
                                    <S.Nickname>{trip.nickname}</S.Nickname>
                                    <S.ScheduleText>님의 일정</S.ScheduleText>
                                </h5>
                                <h4>{trip.departureDate}</h4>
                            </S.TripHeader>
                            <S.TripImageWrapper>
                                <S.TripImage src={trip.mainImage} alt={trip.title} />
                                <S.EditImageButton onClick={() => handleImageEdit(trip.scheduleId)}>
                                    <img src="/images/modal/edit-icon.png" alt="Edit" />
                                </S.EditImageButton>
                            </S.TripImageWrapper>
                            <S.TripFooter>
                                <S.LikeButton
                                    onClick={() => {
                                        if (trip.scheduleId) {
                                            toggleLike(trip.scheduleId, trip.liked, trip.likeId);
                                        } else {
                                            console.error('Trip ID is missing');
                                        }
                                    }}
                                >
                                    <img
                                        src={trip.liked ? '/images/trip/heart.png' : '/images/trip/noheart.png'}
                                        alt="Like"
                                        style={{ width: '24px', height: '24px' }}
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

            {/* 모달 컴포넌트 추가 */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2></h2>
                <ModalInput
                    type="text"
                    placeholder="새 이미지 URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                />
                <ModalButton onClick={submitNewImage}>제출</ModalButton>
            </Modal>
        </div>
    );
};

export default TripList;
